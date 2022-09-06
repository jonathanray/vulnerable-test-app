import fetch from "node-fetch";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const payload = JSON.parse(event.body ?? "{}").payload;
  if (!payload) {
    return { statusCode: 400, body: "Missing something?" };
  }

  // This is intentionally vulnerable
  const response = await fetch("http://localhost:9999", {
    method: "POST",
    body: payload,
  });
  const output = await response.text();

  return {
    statusCode: 200,
    body: output,
    headers: {
      "Content-Type": "text/plain",
    },
  };
}
