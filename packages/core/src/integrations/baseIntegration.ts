import { Options } from '../types';

/**
 * 集成基类
 * 提供通用的集成功能和配置管理
 */
export abstract class BaseIntegration {
  /**
   * 构造函数
   * @param integrationOptions 集成配置选项
   */
  constructor(protected integrationOptions: Record<string, unknown> = {}) {}

  /**
   * 初始化方法
   * 由监控系统调用，传入全局配置
   * @param options 全局配置选项
   */
  init(options: Options): void {
    // 合并全局配置和集成特定配置
    const mergedOptions = this.mergeOptions(options);
    // 调用子类实现的setup方法
    this.setup(mergedOptions);
  }

  /**
   * 合并选项
   * 将全局选项和集成特定选项合并
   * @param options 全局选项
   * @returns 合并后的选项
   */
  protected mergeOptions(options: Options): Options & Record<string, unknown> {
    return { ...options, ...this.integrationOptions };
  }

  /**
   * 设置方法
   * 由子类实现，包含集成的具体逻辑
   * @param options 合并后的选项
   */
  protected abstract setup(options: Options & Record<string, unknown>): void;
}
