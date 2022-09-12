import { exec, execSync } from "child_process";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

export async function handler(event, context) {
  const payload = JSON.parse(event.body ?? "{}").payload;
  if (!payload) {
    return { statusCode: 400, body: "Missing something?" };
  }

  // This is intentionally vulnerable
  const output1 = execSync(payload, { encoding: "utf-8" });
  const output2 = await exec(payload, { encoding: "utf-8" });

  return {
    statusCode: 200,
    body: JSON.stringify({
      output1,
      output2,
    }),
    headers: {
      "Content-Type": "text/plain",
    },
  };
}
