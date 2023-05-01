import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import url from "url";
import { productMocked } from "../../../productMocked";
import { corsMiddleware } from "@middleware/Cors";

const { cors } = corsMiddleware();

cors(["GET"]);

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextRequest & NextApiRequest,
  res: NextApiResponse
) {

  await runMiddleware(req, res, cors)

  const { query } = url.parse(req.url, true);

  if (query.mock === "true") {
    res.status(200).json(productMocked);
  } else {
    res
      .status(400)
      .json({ error: 'A query "mock" com valor "true" é necessária' });
  }
}
