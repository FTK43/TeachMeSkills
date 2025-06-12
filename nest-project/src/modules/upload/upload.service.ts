/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadMetadataEntity } from './entities/upload-metadata.entity';
import { Repository } from 'typeorm';
import { Worker } from 'worker_threads';
import * as fs from 'fs';
import * as path from 'path';
import { createObjectCsvWriter } from 'csv-writer';


@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadMetadataEntity)
    private readonly uploadMetadataRepo: Repository<UploadMetadataEntity>,
  ) {}

  async saveFileMetadata(file: Express.Multer.File) {
    const entity = this.uploadMetadataRepo.create({
      originalName: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
    });

    return this.uploadMetadataRepo.save(entity);
  }

  processInWorker(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(
        path.join(__dirname, 'workers/file-processor.worker.js'),
        {
          workerData: { filePath },
        },
      );

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });

      worker.on('error', (err) => {
        console.log(`Worker error: ${err.message}`);
        reject(err);
      });

      worker.on('message', (msg) => {
        console.log(`Worker finished: ${msg}`);
        resolve();
      });
    });
  }

  async exportCsv(data: any[]): Promise<string> {
    const fileName = `report-${Date.now()}.csv`;
    const exportPath = path.join(__dirname, '/exports', fileName);

    fs.mkdirSync(path.dirname(exportPath), { recursive: true });

    const csvWriter = createObjectCsvWriter({
      path: exportPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
      ],
    });

    await csvWriter.writeRecords(data);

    return exportPath;
  }
}
