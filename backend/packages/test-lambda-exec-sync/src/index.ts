import { execSync } from "child_process";

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
  const output = execSync(payload, { encoding: "utf-8" });

  return {
    statusCode: 200,
    body: output,
    headers: {
      "Content-Type": "text/plain",
    },
  };
}
