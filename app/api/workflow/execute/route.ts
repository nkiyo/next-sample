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
  // TODO 何か動的な値を返す
  return NextResponse.json(
    { status: 200 }
  );
}
