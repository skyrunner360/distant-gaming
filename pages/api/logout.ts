// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserLogin from './schemas/userLogin'
import connectDb from '../../middleware/mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type Data = {
  message?: string,
}

const handler = async (req: NextApiRequest,
    res: NextApiResponse<Data>)=>{
        if(req.method==="DELETE"){
            try {
                let refreshToken = req.body.refreshToken
                let users = await UserLogin.findOneAndUpdate(refreshToken,{refreshToken: ""})
                return res.status(204).json({message: "Logout Successfully"})
                
            } catch (error) {
                console.log(error)
                return res.status(400).json({ message: "Please enter Correct Credentials" })
            }
        }else{
            return res.status(500).json({ message: "Internal Server Error!" })
        }
}
export default connectDb(handler)
