import { PrismaClient } from "../../../../../prisma/src/generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();
  const emailTrimmed = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: emailTrimmed },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User not found. Please sign up before logging in." },
      { status: 404 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 404 }
    );
  }
  const tokenData = {
    id: user._id,
    email: emailTrimmed,
    role: user.role,
  };

  const token = jwt.sign(tokenData, process.env.TOKEN, {
    expiresIn: process.env.TOKEN_EXPIRY || "10s",
  });

  console.log(token, "tokennn");

  const response = NextResponse.json(
    {
      message: `${user.role} login successful`,
      redirect: `/${user.role}/dashboard`,
      token,
    },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    path: "/",
    maxAge: 10000, // 10 seconds
  });

  return response;
  // if (user.role === "admin") {
  //   return NextResponse.json(
  //     { message: "Admin login successful", redirect: "/admin/dashboard" },
  //     { status: 200 }
  //   );
  // } else {
  //   return NextResponse.json(
  //     { message: "User login successful", redirect: "/user/dashboard" },
  //     { status: 200 }
  //   );
  // }
}
