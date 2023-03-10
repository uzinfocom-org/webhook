/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Github Webhook
import { webhooks } from "./deps.ts";

// Middleware
import triggers from "./middleware/mod.ts";

// Webhook event trigger list
webhooks()(...triggers);
