import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadMetadataEntity } from './entities/upload-metadata.entity';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UploadMetadataEntity])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
