import { NextApiRequest, NextApiResponse } from "next";

export const handlerUser = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
      res.status(400).json({ message: "Metodo inválido. Por favor, use o metodo 'GET'" })
    } else {
    }
  };
  