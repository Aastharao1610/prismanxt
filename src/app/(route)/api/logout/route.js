
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@/generated/prisma';
// const prisma=new PrismaClient()

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function GET(req) {
//   const token = req.headers.get('authorization')?.split(' ')[1];

//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

  
//   const userId = parseInt(token ,process.env.TOKEN); 


//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//     select: { id: true, email: true, name: true },
//     expiresAt: {
//       lt: new Date(), 
//     },
//   });

//   if (!user) {
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   }

//   return NextResponse.json(user);
// }


// import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "", 
        { 
          httpOnly: true,
           expires: new Date(0) ,
           path:'/'
        });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }
