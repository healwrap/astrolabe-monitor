import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodIssue, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown /* , metadata: ArgumentMetadata */) {
    // 处理空值情况
    const parseValue = value ?? {};

    const result = this.schema.safeParse(parseValue);
    if (!result.success) {
      throw new BadRequestException(
        result.error.issues.map(issue => this.getCustomMessage(issue)).join(',')
      );
    }
    return result.data;
  }

  private getCustomMessage(issue: ZodIssue): string {
    const fieldName = issue.path.join('.') || '字段';

    switch (issue.code) {
      case 'invalid_type': {
        const invalidTypeIssue = issue as any;
        if (invalidTypeIssue.expected === 'string' && invalidTypeIssue.received === 'undefined') {
          return `${fieldName === 'root' ? '' : fieldName} 不能为空`;
        }
        return `${fieldName} 类型错误，期望 ${invalidTypeIssue.expected}，实际 ${invalidTypeIssue.received}`;
      }
      case 'too_small': {
        const tooSmallIssue = issue as any;
        return `${fieldName} 长度不能少于 ${tooSmallIssue.minimum} 个字符`;
      }
      case 'too_big': {
        const tooBigIssue = issue as any;
        return `${fieldName} 长度不能超过 ${tooBigIssue.maximum} 个字符`;
      }
      case 'invalid_string': {
        const invalidStringIssue = issue as any;
        if (invalidStringIssue.validation === 'email') {
          return `${fieldName} 邮箱格式不正确`;
        }
        return `${fieldName} 格式不正确`;
      }
      default:
        return issue.message;
    }
  }
}
