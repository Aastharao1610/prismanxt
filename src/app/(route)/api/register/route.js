import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const prisma  =new PrismaClient();


export async function POST(req){
 
    try {
       const {email,name,password} =req.json();

       const hashedPassword =await bcrypt.hash(password,10)

       const newUser =await prisma.user.create({
       data:{
        email,name,
        password:hashedPassword
       }
       })

       return NextResponse.json({message:"user created Sucessfully" ,user:newUser},{status:201})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal sever error"},{status:500})
    }
}