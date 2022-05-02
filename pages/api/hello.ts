// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApiHelper } from "@/helpers/api-helper"
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const api = createApiHelper(req, res);
  api.get((_, response) => {
    response.status(200).json({ name: 'John Doe' })
  });
}
