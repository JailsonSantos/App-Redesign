import Stripe from 'stripe';
import { urlFor } from '../../libs/sanity';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15" // or 2020-08-01
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const items: Product[] = req.body.items;

    // This is the shape in which stripe expects the data to be
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: 'BRL',
        product_data: {
          name: item.title,
          images: [urlFor(item.image[0]).url()],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantityOfProduct,
    }));

    try {
      // Create Checkout Session from body params
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: transformedItems,
        payment_intent_data: {},
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          images: JSON.stringify(
            items.map((item) => item.image[0].asset.url)
          ),
        },
      };

      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');

  }
}
