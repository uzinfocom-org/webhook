import {
  createJWT,
  encodeToString,
  hmac,
  WebhookEvent,
  WebhookEventMap,
  WebhookEventName,
} from "./deps.ts";

const GITHUB_URL = Deno.env.get("GITHUB_URL") || "https://api.github.com";

export type {
  WebhookEvent,
  WebhookEventMap,
  WebhookEventName,
} from "./deps.ts";

export type Config = {
  /* The GitHub App ID */
  readonly appId?: string;

  /* The webhook secret use to sign and verify requests */
  readonly secret?: string;

  /* The GitHub App Private Key used to create tokens */
  readonly privateKey?: string;
};

export type Context<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  /* A token to use on requests to GitHub API */
  readonly token?: string;

  /* The installation ID that triggered the event */
  readonly installationId?: number;
} & { [K in keyof T]: T[K] };

export type EventHandler<C extends Context = Context> = (
  /* The name of the event */
  event: WebhookEventName,
  /* The payload of the event */
  payload: WebhookEvent,
  /* Useful context information */
  context: C,
) => Promise<C | void> | C | void;

export function buildOn<C extends Context>() {
  return function <T extends WebhookEventName>(
    target: T,
    handler: (
      payload: WebhookEventMap[T],
      context: C,
    ) => ReturnType<EventHandler<C>>,
  ): EventHandler<C> {
    // @ts-ignore FIXME
    return async (event, payload, context) => {
      if (event === target) {
        // @ts-ignore FIXME
        return await handler(payload, context) || context;
      }
    };
  };
}

/* Creates an event handler */
export const on = buildOn<Context>();

export function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "user-agent": "github_webhooks",
      "content-type": "application/json",
    },
  });
}

export function parseHeaders(
  headers: Headers,
): { event: WebhookEventName; signature: string | null } {
  const event = headers.get("x-github-event");
  const signature = headers.get("x-hub-signature-256");

  if (!event) {
    throw new Error(`Header "x-github-event" not present`);
  }

  if (!signature) {
    console.warn(`Header "x-hub-signature-256" is not present`);
  }

  return { event: event as WebhookEventName, signature };
}

export async function fetchPayload(request: Request): Promise<WebhookEvent> {
  return (await request.json()) as WebhookEvent;
}
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export function verifySignature(
  payload: WebhookEvent,
  signature: string,
  secret: string,
) {
  const te = new TextEncoder();
  const encodedPayload = te.encode(toNormalizedJSONString(payload));
  const verificationSignature = `sha256=${
    encodeToString(hmac("sha256", te.encode(secret), encodedPayload))
  }`;

  if (signature.length !== verificationSignature.length) {
    return false;
  }

  return constantTimeCompare(signature, verificationSignature);
}

function toNormalizedJSONString(payload: WebhookEvent) {
  return JSON.stringify(payload).replace(/[^\\]\\u[\da-f]{4}/g, (s) => {
    return s.substr(0, 3) + s.substr(3).toUpperCase();
  });
}

export async function fetchToken(
  appId: string,
  installationId: number,
  privateKey: string,
): Promise<string> {
  const appToken = await createJWT({ alg: "RS256" }, {
    iat: parseInt(((Date.now() / 1000) - 60).toFixed()),
    exp: parseInt(((Date.now() / 1000) + (10 * 60)).toFixed()),
    iss: appId,
  }, privateKey);

  const resp = await fetch(
    `${GITHUB_URL}/app/installations/${installationId}/access_tokens`,
    {
      method: "POST",
      headers: {
        "authorization": `Bearer ${appToken}`,
        "accept": "application/vnd.github.v3+json",
        "content-type": "application/vnd.github.v3+json",
      },
    },
  );

  const { token } = await resp.json();

  return token;
}
