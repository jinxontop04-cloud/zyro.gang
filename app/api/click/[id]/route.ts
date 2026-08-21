import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const linkId = params.id;
    if (!linkId) {
      return NextResponse.json({ error: "Link ID inexistent" }, { status: 400 });
    }

    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.json({ success: true, clicks: updatedLink.clicks });
  } catch (error) {
    return NextResponse.json({ error: "Eroare de server" }, { status: 500 });
  }
}
