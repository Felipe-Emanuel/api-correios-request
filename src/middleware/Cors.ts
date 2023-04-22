import Cors from 'cors'

export const corsMiddleware = () => {

    const cors = (methods: string[]) => Cors({
        methods,
        origin: "https://pablo-studio.vercel.app"
    })

    return {
        cors,
    }
}