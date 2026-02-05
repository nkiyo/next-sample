import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const s3Client = new S3Client({
  region: "us-east-1",
});


const verifier = CognitoJwtVerifier.create({
  userPoolId: 'us-east-1_1YTalfPTh',
  tokenUse: 'id', // または 'access'
  clientId: '3ris1jvmroe02so932g65o6eu3',
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

  const auth = request.headers.get('authorization');
  if (!auth) {
    return NextResponse.json(
      { status: 401 }
    );
  }
  console.log(`### auth : ${auth}`)
  const token = auth.replace('Bearer ', '');
  console.log(`### token : ${token}`)
  try {
    const payload = await verifier.verify(token);
  } catch {
    return NextResponse.json(
      { status: 402 }
    );
  }

  const now = new Date().toISOString();
  console.log(`### ${now} ###`);

  // list s3 bucket
  // const command = new ListBucketsCommand({});
  // const response = await s3Client.send(command);

  // const buckets = response.Buckets?.map(b => (
  //   b.Name
  // )) ?? [];
  const buckets = ["hoge"];
  // console.log(`### ${JSON.stringify(buckets)} ###`);

  return NextResponse.json(
    { status: 200, now, buckets }
  );
}
