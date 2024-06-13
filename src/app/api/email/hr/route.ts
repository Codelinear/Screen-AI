import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const POST = async (req: NextRequest) => {
  const { userDetails } = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "uzef@codelinear.com",
    subject: `${userDetails.name} passes the test.`,
    html: `<h1>here are the details of the candidate:</h1>
        <p>Name: ${userDetails.name}</p>
        <p>Email: ${userDetails.email}</p>
        <p>Phone: ${userDetails.phone}</p>
        <p>LinkedIn profile: ${userDetails?.linkedInProfile || "NA"}</p>
        `,
  });

  return NextResponse.json({ success: true });
};
