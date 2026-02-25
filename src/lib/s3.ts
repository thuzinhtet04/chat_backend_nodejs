import { S3Client } from "@aws-sdk/client-s3";

// Create an S3 client
//
// You must copy the endpoint from your B2 bucket details
// and set the region to match.
export const s3 = new S3Client({
  endpoint: process.env.S3_BUCKET_ENDPOINT!,
  region: process.env.S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: "005f7adafca8c520000000003",
    secretAccessKey: "K005BxvtRQ8zP8Sshcz9QSKpjiouqzE",
  },
});
