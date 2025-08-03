import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

// 定义 Zod schemas
export const adminLoginSchema = z
  .object({
    username: z
      .string({
        required_error: '用户名不能为空',
        invalid_type_error: '用户名必须是字符串',
      })
      .min(3, '用户名至少3个字符')
      .max(20, '用户名最多20个字符')
      .describe('管理员用户名'),
    password: z
      .string({
        required_error: '密码不能为空',
        invalid_type_error: '密码必须是字符串',
      })
      .min(6, '密码至少6个字符')
      .max(50, '密码最多50个字符')
      .describe('管理员密码'),
  })
  .required();

export const adminJwtSchema = z
  .object({
    username: z.string().describe('JWT token 中的用户名'),
    password: z.string().describe('JWT token 中的密码'),
  })
  .required();

export const adminRegisterSchema = z
  .object({
    username: z
      .string({
        required_error: '用户名不能为空',
        invalid_type_error: '用户名必须是字符串',
      })
      .min(3, '用户名至少3个字符')
      .max(20, '用户名最多20个字符')
      // .regex(/^[a-zA-Z0-9_]+$/, '用户名只能包含字母、数字和下划线')
      .describe('管理员用户名'),
    password: z
      .string({
        required_error: '密码不能为空',
        invalid_type_error: '密码必须是字符串',
      })
      .min(6, '密码至少6个字符')
      .max(50, '密码最多50个字符')
      // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码必须包含大小写字母和数字')
      .describe('管理员密码'),
  })
  .required();

// 使用 nestjs-zod 创建 DTO 类，这些类会自动生成 Swagger 文档
export class AdminLoginDto extends createZodDto(adminLoginSchema) {}
export class AdminJwtDto extends createZodDto(adminJwtSchema) {}
export class AdminRegisterDto extends createZodDto(adminRegisterSchema) {}

// // 保留原有的类型导出，用于类型推断
// export type adminLoginDto = z.infer<typeof adminLoginSchema>;
// export type adminJwtDto = z.infer<typeof adminJwtSchema>;
// export type adminRegisterDto = z.infer<typeof adminRegisterSchema>;
