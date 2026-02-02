import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
});

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

  // TODO list s3 bucket
  const command = new ListBucketsCommand({});
  const response = await s3Client.send(command);

  const buckets = response.Buckets?.map(b => (
    b.Name
  )) ?? [];
  console.log(`### ${JSON.stringify(buckets)} ###`);

  return NextResponse.json(
    { status: 200, now, buckets }
  );
}
