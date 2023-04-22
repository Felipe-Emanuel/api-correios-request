import Cors from 'cors'

export const corsMiddleware = () => {

    const cors = (methods: string[]) => Cors({
        methods,
        origin: ["http://localhost:3000", "https://pablo-studio.vercel.app"]
    })

    return {
        cors,
    }
}