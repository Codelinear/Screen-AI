import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { password } = await req.json();

    const correctPassword = process.env.UPLOAD_PASSWORD;

    if (password === correctPassword) {
      return NextResponse.json({ admin: true }, { status: 200 });
    }

    return NextResponse.json({ admin: false }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
