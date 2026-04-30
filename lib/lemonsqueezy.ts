import crypto from "crypto";

/**
 * Lemon Squeezy integration — minimal, no SDK.
 *
 * Two responsibilities:
 *   1. createCheckoutUrl — POSTs to LS API to create a checkout session
 *      with our plan id as custom data.
 *   2. verifyWebhookSignature — validates the X-Signature header on
 *      incoming webhooks using HMAC-SHA256 and the signing secret.
 *
 * Required env:
 *   LEMON_SQUEEZY_API_KEY
 *   LEMON_SQUEEZY_STORE_ID
 *   LEMON_SQUEEZY_VARIANT_ID    (the trip plan product variant)
 *   LEMON_SQUEEZY_WEBHOOK_SECRET
 */

interface CreateCheckoutOptions {
  planId: string;
  email: string;
  destination: string;
  /** Optional LS discount code (created in LS dashboard) — auto-applies. */
  discountCode?: string;
}

export async function createCheckoutUrl(opts: CreateCheckoutOptions): Promise<string> {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
  const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;
  if (!apiKey || !storeId || !variantId) {
    throw new Error("Missing Lemon Squeezy env vars");
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://checkvisamap.com";

  const checkoutData: Record<string, unknown> = {
    email: opts.email,
    custom: { plan_id: opts.planId },
  };
  if (opts.discountCode) {
    // LS auto-applies the discount on the hosted checkout — buyer sees the
    // line item already reduced before they enter card details.
    checkoutData.discount_code = opts.discountCode;
  }

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: checkoutData,
        product_options: {
          redirect_url: `${baseUrl}/plan/${opts.planId}?paid=1`,
          receipt_thank_you_note: `Your detailed ${opts.destination} trip plan is being generated. We're putting real care into each one — you'll receive an email with the PDF within 5-10 minutes.`,
        },
        checkout_options: { embed: false, dark: false },
      },
      relationships: {
        store: { data: { type: "stores", id: storeId } },
        variant: { data: { type: "variants", id: variantId } },
      },
    },
  };

  const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lemon Squeezy checkout creation failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  const url = json?.data?.attributes?.url;
  if (typeof url !== "string") {
    throw new Error("Lemon Squeezy response missing checkout URL");
  }
  return url;
}

export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const sig = Buffer.from(signature, "utf8");

  if (digest.length !== sig.length) return false;
  return crypto.timingSafeEqual(digest, sig);
}
