import dotenv from 'dotenv';

dotenv.config();

import S3 from "aws-sdk/clients/s3";

const region = process.env.S3_AWS_REGION;
const bucketName = process.env.BUCKET;
const accessKeyId = process.env.S3_ACCESS_KEY_ID
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3BaseUrl = `https://${bucketName}.${region}.amazonaws.com\/`

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});


export async function generateUploadURL() {
  // Generate a timestamp
  const timestamp = new Date().toISOString().replace(/:/g, '-');

  // Rename the file with the timestamp
  const renamedFileName = `${timestamp}_model`;

  const params = {
    Bucket: bucketName,
    Key: renamedFileName,
    Expires: 90
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);

  
  if(uploadURL) {

    const response = {
      uploadUrl: uploadURL,
      location: s3BaseUrl + renamedFileName
    }

    return response;
  }
}

