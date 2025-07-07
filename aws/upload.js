import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  },
});

async function uploadFile() {
  const fileStream = fs.createReadStream('./test.txt');

  const uploadParams = {
    Bucket: 'tms-practice-bucket',
    Key: 'test.txt',
    Body: fileStream,
    ContentType: 'text/plain',
  };

  try {
    const result = await s3.send(new PutObjectCommand(uploadParams));
    console.log('Файл загружен: ', result);
  } catch (err) {
    console.log("Error: ", err);
  }
}

uploadFile();