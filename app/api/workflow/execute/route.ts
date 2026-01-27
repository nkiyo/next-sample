import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { num } = body;
  console.log(`### ${num} ###`);
  return NextResponse.json(
    { status: 200 }
  );
}

export async function GET(request: NextRequest) {
  const now = new Date().toISOString();
  console.log(`### ${now} ###`);

  return NextResponse.json(
    { status: 200, now }
  );
}
