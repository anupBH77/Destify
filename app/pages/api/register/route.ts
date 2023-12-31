import bcrypt from 'bcryptjs'
// import prisma from '../../../lib/prismadb'
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';
export async function POST(request:Request) {
    const body= await request.json();
    const{ email,password,name} = body
    const hashedPassword= await bcrypt.hash(password,12);
    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    });
    return NextResponse.json(user);
}