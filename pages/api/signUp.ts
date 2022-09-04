// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserLogin from './schemas/userLogin'
import connectDb from '../../middleware/mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

type Data = {
  name: string
}

const jwtSecret = process.env.JWT_SECRET

const handler = async (req: NextApiRequest,
    res: NextApiResponse)=>{
        if(req.method==='POST'){
            let salt = await bcrypt.genSalt(10)
            let storePass = await bcrypt.hash(req.body.passWord,salt)
            let uid = randomUUID()

            let users = new UserLogin({
                userId: uid,
                userEmail: req.body.userEmail,
                passWord: storePass,
                isAdmin: req.body.isAdmin
            })
            await users.save()
            const data = {
                user: {
                    id: users.userId
                }
            }

            let authToken = jwt.sign(data,jwtSecret)

            return res.status(201).json({ message: "Success",authToken })
        }else{
            return res.status(400).json({ message: "ERROR: Bad Request" })
        }
       
}
export default connectDb(handler)
