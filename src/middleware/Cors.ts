import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

export const corsMiddleware = () => {

    const cors = (methods: string[]) => Cors({
        methods,
        origin: "http://localhost:3000"
    })
    
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

    return {
        cors,
        runMiddleware
    }
}