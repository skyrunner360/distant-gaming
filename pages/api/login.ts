// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserLogin from './schemas/userLogin'
import connectDb from '../../middleware/mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type Data = {
  message?: string,
  authToken?: string,
  refreshToken?: string
}
const jwtSecret:String|undefined = process.env.JWT_SECRET

const handler = async (req: NextApiRequest,
    res: NextApiResponse<Data>)=>{
        if(req.method==="POST"){
            try {
                const {userEmail} = req.body
                let users = await UserLogin.findOne({userEmail}).clone()
                if(!users){
                    return res.status(400).json({ message: "Please enter Correct Credentials" })
                }
                let passCompare = await bcrypt.compare(req.body.passWord,users.passWord)
                if(!passCompare){
                    return res.status(400).json({ message: "Please enter Correct Credentials" })
                }
                const data = {
                    user: {
                        id: users.userId
                    }
                }
                // Generate Token on Login
                let authToken = genAccessToken(data)
                let refreshToken = jwt.sign(data,process.env.JWT_REFRESH_SECRET)
                await UserLogin.findOneAndUpdate({userId: users.userId},{refreshToken}).clone()
                
                return res.status(200).json({ authToken,refreshToken })
                
            } catch (error) {
                console.log(error)
                return res.status(400).json({ message: "Please enter Correct Credentials" })
            }
        }else{
            return res.status(500).json({ message: "Internal Server Error!" })
        }
}
const genAccessToken = (data:{user:{id: String}})=>{
    return jwt.sign(data,jwtSecret,{expiresIn: "2d"})
}
export default connectDb(handler)
