import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import path from 'path';

const allowedMimeTypes = ['image/png', 'image/jpeg'];

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const u = Date.now() + '-' + Math.round(Math.random() * 1000);
          cb(null, `${u}-${file.originalname}`);
        },
      }),
      limits: {
        fileSize: 1 * 1024 * 1024, // 1mb
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const savedFile = await this.uploadService.saveFileMetadata(file);

    return {
      message: 'File successfully uploaded',
      file: savedFile,
    };
  }

  @Post('/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const u = Date.now() + '-' + Math.round(Math.random() * 1000);

          cb(null, `${u}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
          cb(
            new BadRequestException(
              `only ${allowedMimeTypes.join(', ')} allowed`,
            ),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map((file) => ({
      originalFileName: file.originalname,
      filename: file.filename,
      size: file.size,
      path: file.path,
    }));
  }

  @Post('/process')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const u = Date.now() + '-' + Math.round(Math.random() * 1000);
          cb(null, `${u}-${file.originalname}`);
        },
      }),
      limits: {
        fileSize: 1 * 1024 * 1024, // 1mb
      },
    }),
  )
  async processFile(@UploadedFile() file: Express.Multer.File) {
    await this.uploadService.processInWorker(file.path);
    return {
      message: 'ФАЙЛ ПОЛУЧЕН',
    };
  }

  @Post('/export-csv')
  async exportCsv() {
    const testData = [
      { id: 0, name: 'Andrey' },
      { id: 1, name: 'Anton' },
      { id: 2, name: 'Ivan' },
    ];

    const filePath = await this.uploadService.exportCsv(testData);
    return {
      message: 'CSV файл создан',
      path: filePath,
    };
  }
}
