// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserLogin from './schemas/userLogin'
import connectDb from '../../middleware/mongoose'

type Data = {
  name: string
}

const handler = async (req: NextApiRequest,
    res: NextApiResponse)=>{
        let users = await UserLogin.find()
        return res.status(200).json({ users })
}
export default connectDb(handler)
