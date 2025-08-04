import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

import { AdminEntity } from '../../entities/admin.entity';

export const createApplicationSchema = z
  .object({
    type: z.enum(['vanilla', 'react', 'vue']).describe('应用类型'),
    name: z.string().describe('应用名称'),
    description: z.string().optional().describe('应用描述'),
  })
  .required();

export const updateApplicationSchema = z.object({
  appId: z.string().describe('应用 ID'),
  type: z.enum(['vanilla', 'react', 'vue']).describe('应用类型'),
  name: z.string().describe('应用名称'),
  description: z.string().optional().describe('应用描述'),
});

export const deleteApplicationSchema = z
  .object({
    appId: z.string().describe('应用 ID'),
  })
  .required();

export class CreateApplicationDto extends createZodDto(createApplicationSchema) {
  user: AdminEntity;
}
export class DeleteApplicationDto extends createZodDto(deleteApplicationSchema) {}
export class UpdateApplicationDto extends createZodDto(updateApplicationSchema) {
  user: AdminEntity;
}
