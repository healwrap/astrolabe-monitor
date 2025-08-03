/**
 * API 统一响应格式
 */
export interface ApiResponse<T = any> {
  /** 状态码 */
  code: number;
  /** 消息 */
  msg: string;
  /** 数据 */
  data: T;
}

/**
 * API 成功响应
 */
export interface ApiSuccessResponse<T = any> extends ApiResponse<T> {
  code: 200;
  msg: string;
  data: T;
}

/**
 * API 错误响应
 */
export interface ApiErrorResponse extends ApiResponse<null> {
  code: number;
  msg: string;
  data: null;
}

/**
 * 分页数据结构
 */
export interface PaginationData<T = any> {
  /** 数据列表 */
  list: T[];
  /** 总数 */
  total: number;
  /** 当前页 */
  page: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * 分页响应
 */
export type ApiPaginationResponse<T = any> = ApiSuccessResponse<PaginationData<T>>;
