'use server';

import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
});

export async function listS3Buckets() {
  // list s3 bucket
  const command = new ListBucketsCommand({});
  const response = await s3Client.send(command);

  const buckets = response.Buckets?.map(b => (
    b.Name
  )) ?? [];
  console.log(`### ${JSON.stringify(buckets)} ###`);

  return buckets;
}
