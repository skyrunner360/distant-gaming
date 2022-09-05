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
const jwtSecret = process.env.JWT_REFRESH_SECRET

const handler = async (req: NextApiRequest,
    res: NextApiResponse<Data>)=>{
        if(req.method==="POST"){
            try {
                let refreshToken = req.body.token
                let users = await UserLogin.findOne({refreshToken}).select("-passWord")
                if(refreshToken===null) return res.status(401)
                if(!users?.refreshToken) return res.status(403)
                jwt.verify(users.refreshToken,jwtSecret,(err,user)=>{
                    if (err) return res.status(403)
                    const data = {
                        user: {
                            id: user["user"].id
                        }
                    }
                    const accessToken = genAccessToken(data)
                    return res.status(200).json({ accessToken })
                })
                
            } catch (error) {
                return res.status(400).json({ message: "Please enter Correct Credentials" })
            }
        }else{
            return res.status(500).json({ message: "Internal Server Error!" })
        }
}
const genAccessToken = (data)=>{
    return jwt.sign(data,jwtSecret,{expiresIn: "2d"})
}
export default connectDb(handler)
