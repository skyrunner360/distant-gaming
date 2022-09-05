// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserLogin from './schemas/userLogin'
import connectDb from '../../middleware/mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authenticate from '../../middleware/authenticateToken'

type Data = {
  message?: string,
  users?: string
}
const jwtSecret = process.env.JWT_SECRET

const handler = async (req: NextApiRequest,
    res: NextApiResponse<Data>)=>{
        if(req.method==="POST"){
            try {
                authenticate(req,res)
                console.log(req.user["user"]['id'])
                let userId = req.user["user"]['id']
                let users = await UserLogin.findOne({userId}).select("-passWord")
                if(!users){
                    return res.status(400).json({ message: "Please enter Correct Credentials" })
                }
                const data = {
                    user: {
                        id: users.userId
                    }
                }
                let authToken = jwt.sign(data,jwtSecret)
                
                return res.status(200).json({ users })
                
            } catch (error) {
                return res.status(400).json({ message: "Please enter Correct Credentials" })
            }
        }else{
            return res.status(500).json({ message: "Internal Server Error!" })
        }
}
export default connectDb(handler)
