'use server';

import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
});

export async function listS3Buckets(): Promise<string[]> {
  // list s3 bucket
  const command = new ListBucketsCommand({});
  const response = await s3Client.send(command);

  // const buckets = response.Buckets?.map(b => (
  //   b.Name
  // )) ?? [];

  const buckets = response.Buckets
    ?.map(b => b.Name)
    .filter((name): name is string => name !== undefined)
    ?? []

  console.log(`### ${JSON.stringify(buckets)} ###`);

  return buckets;
}
