import { NextApiRequest, NextApiResponse } from "next";
import { user } from "../../../userMocked";
import { corsMiddleware } from "@middleware/Cors";

const { cors, runMiddleware } = corsMiddleware()

cors(['GET'])

export default async function handlerUser(req: NextApiRequest, res: NextApiResponse) {
  
  await runMiddleware(req, res, cors)

  if (req.method === 'GET') {
    res.status(200).json( user )
  } else {
    res.status(400).json({ error: 'Rejeitado! A rota só aceita metodos "GET"'})
  }
}
