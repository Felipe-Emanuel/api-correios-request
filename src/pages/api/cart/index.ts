import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import url from "url";
import { productMocked } from "../../../productMocked";
import { corsMiddleware } from "@middleware/Cors";

const { cors } = corsMiddleware();

cors(["GET"]);

export default async function handler(
  req: NextRequest & NextApiRequest,
  res: NextApiResponse
) {

  const { query } = url.parse(req.url, true);

  if (query && typeof query.limit === "string") {
    const limit = parseInt(query.limit);
    if (!isNaN(limit) && limit >= 3) {
      res.status(200).json(productMocked);
      return;
    }
  }

  if (query?.mock === "true") {
    res.status(200).json(productMocked);
  } else {
    res
      .status(400)
      .json({ error: 'A query "mock" com valor "true" é necessária' });
  }
}
