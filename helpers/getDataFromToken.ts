import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken =  (request: NextRequest) =>{
    try {
        const encodedToken = request.cookies.get('user@GEComm_token')?.value||'';
        // jwt.verify(token, process.env.JWT_SECRET_KEY)
        // const JWT_SECRET_KEY = 'secret-key-store-in-env';
        console.log(process.env.JWT_SECRET_KEY)
        const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET_KEY!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }

}