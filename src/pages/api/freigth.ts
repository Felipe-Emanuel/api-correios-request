import { NextApiRequest, NextApiResponse } from "next";
import { calcularPrecoPrazo, PrecoPrazoRequest } from "correios-brasil/dist";
import { addProductCart } from "../../components/database/clientCart";
import { corsMiddleware } from "@middleware/Cors";

const { cors } = corsMiddleware()

cors(['POST'])

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

export default async function handlerUser(req: NextApiRequest, res: NextApiResponse) {

  await runMiddleware(req, res, cors)

  if (req.method !== 'POST') {
    res.status(400).json({ message: "Metodo inválido. Por favor, use o metodo 'GET'" })
  } else {
    const product = req.body
    const dimensions: PrecoPrazoRequest = product.body.dimensions
    let resp

    await calcularPrecoPrazo(dimensions)
    .then(async response => {
      const index = product.body.choisedService.serviceCode === "04510" ? 0 : 1
      const updatedProduct = {
        ...product.body,
        dimensions: product.body = {
          ...product.body.dimensions,
          nCdServico: [ '04510', '04014' ],
        },
        choisedService: product.body.choisedService = {
          ...product.body.choisedService,
          deadline: response[index].PrazoEntrega,
          price: response[index].Valor
        },
        freight: product.body.freight = {
          PAC: {
            ...product.body.freight = response[0],
            obsFim: response[0].obsFim || '',
            MsgErro: response[0].MsgErro || ''
          },
          SEDEX: {
            ...product.body.freight = response[1],
            obsFim: response[1].obsFim || '',
            MsgErro: response[1].MsgErro || ''
          },
        }
      }

      await addProductCart(updatedProduct)

      resp = response;
      res.status(200).json({ resp });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: "Erro ao calcular o preço e prazo de entrega." });
    });
  }
}
