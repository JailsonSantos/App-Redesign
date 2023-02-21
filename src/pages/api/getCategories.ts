// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { groq } from 'next-sanity';
import { sanityClient } from '../../libs/sanity';
import type { NextApiRequest, NextApiResponse } from 'next';

const query = groq`*[_type == "category"] {
_id,
  ...
}`;

type Data = {
  categories: Category[],
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await sanityClient.fetch(query);
  console.log(categories);
  res.status(200).json({ categories })
}
