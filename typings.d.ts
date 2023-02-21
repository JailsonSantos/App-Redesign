declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production"

    NEXT_PUBLIC_BASE_URL: string

    NEXT_PUBLIC_SANITY_DATASET: string
    NEXT_PUBLIC_SANITY_PROJECT_ID: string
    SANITY_API_TOKEN: string

    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
    STRIPE_SECRETE_KEY: string
    STRIPE_SIGNING_SECRET: string

    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string

    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string

    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
  }
}

interface Category {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "category";
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
}

interface Image {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
}

interface Product {
  total: number
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "product";
  title: string;
  price: number;
  slug: {
    _type: "slug";
    current: string;
  };
  description: string;
  category: {
    _type: "reference";
    _ref: string;
  };
  image: Image[];
  quantityOfProduct: number;
  quantity: number;
}

interface StripeProduct {
  id: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  object: string;
  quantity: number;
  price: {
    unit_amount: number;
  };
}

interface ClientConfig {
  projectId?: string
  dataset?: string
  useCdn?: boolean
  token?: string
  apiHost?: string
  apiVersion?: string
  proxy?: string
  requestTagPrefix?: string
  ignoreBrowserTokenWarning?: boolean
  withCredentials?: boolean
  timeout?: number
}

