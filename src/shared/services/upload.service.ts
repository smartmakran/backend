import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path = require('path');
import toReadableStream from 'to-readable-stream';

@Injectable()
export class UploadService {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: 'default',
      endpoint: process.env.ARVAN_S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.ARVAN_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.ARVAN_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file) {
    const uploadParams = {
      Bucket: 'smartmakran', // bucket name
      Key: path.basename(file), // the name of the selected file
      ACL: 'public-read', // 'private' | 'public-read'
    };

    // BODY (the contents of the uploaded file - leave blank/remove to retain contents of original file.)
    // const file = 'file.png'; //FILE_NAME (the name of the file to upload (if you don't specify KEY))

    // call S3 to retrieve upload file to specified bucket
    // Configure the file stream and obtain the upload parameters
    const fileStream = fs.createReadStream(file);
    fileStream.on('error', function (err) {
      console.log('File Error', err);
    });

    // call S3 to upload file to specified bucket
    uploadParams['Body'] = fileStream;

    try {
      return await this.s3.send(new PutObjectCommand(uploadParams));
    } catch (err) {
      console.log('Error', err);
    }
  }

  async uploadBase64File(file: string): Promise<any> {
    const regex = /data:image\/(.*);base64,/m;
    const [match, extension] = regex.exec(file);

    file = file.replace(match, '');

    const fileBuffer = Buffer.from(file, 'base64');
    const fileStream = toReadableStream(fileBuffer);

    const time = new Date().getTime();
    const fileName = `${time}.${extension}`;

    const uploadParams = {
      Bucket: 'smartmakran', // bucket name
      Key: fileName, // the name of the selected file
      ACL: 'public-read', // 'private' | 'public-read'
    };

    // call S3 to upload file to specified bucket
    uploadParams['Body'] = fileStream;

    try {
      await this.s3.send(new PutObjectCommand(uploadParams));
      return { fileName };
    } catch (err) {
      console.log('Error', err);
    }
  }
}
