import type { NextApiResponse,NextApiRequest } from "next";
import jwt from 'jsonwebtoken';
export default function authenticate(req:NextApiRequest,res: NextApiResponse){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader?.split(" ")[1]
    const accessTokenSecret = process.env.JWT_SECRET
    if(token===null) return res.status(401).json({message: "Unauthorized"})
    jwt.verify(token,accessTokenSecret,(err,val)=>{
        if(err) return res.status(403).json({message: "Unauthorized! Invalid Token"})
        req.user = val
    })
}