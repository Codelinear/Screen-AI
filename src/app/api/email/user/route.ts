import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  const { userDetails } = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: userDetails.email,
    subject: `Regarding the HR test application for ${userDetails.name}`,
    html: `<h1>You are not eligible for the position now. Best of luck for the furture.</h1>`,
  });

  return NextResponse.json({ success: true });
};
