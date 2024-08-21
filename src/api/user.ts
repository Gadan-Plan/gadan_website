import { stringify } from "@/utils/common/helper";
import request from "@/utils/request/request";

interface getRankingPamas {
  /**
   * 当前页
   */
  current: number;
  /**
   * 排行起始日 2023-09-33
   */
  rankBeginDate: string;
  /**
   * 排行结束日 2023-09-34
   */
  rankEndDate: string;
  /**
   * 数量
   */
  size: number;
  [property: string]: any;
}
export interface Response {
  /**
   * 0：成功  1：错误
   */
  code: number;
  data: Data;
  /**
   * code为1时的报错
   */
  msg: string;
  [property: string]: any;
}

export interface Data {
  /**
   * 当前页数
   */
  current: number;
  /**
   * 所有的页数
   */
  pages: number;
  records: Record[];
  /**
   * 传入的分页数量
   */
  size: number;
  /**
   * 所有的数量
   */
  total: number;
  [property: string]: any;
}

export interface Record {
  /**
   * 省份城市
   */
  address?: string[];
  /**
   * 我有话要讲：xxxxxxx
   */
  advertisement?: string;
  /**
   * 该用户所有的噶蛋币
   */
  allPNC?: number;
  /**
   * 是否时黑名单用户  true:是 false:否
   */
  blackFlag: boolean;
  /**
   * 所在国家  ’CN‘中国
   */
  country?: string;
  /**
   * 用户的手绘图id
   */
  drawingImgId?: string;
  /**
   * 用户的手绘图url
   */
  drawingImgUrl?: string;
  /**
   * ID编号
   */
  id: number;
  /**
   * 职业
   */
  jobName?: string;
  /**
   * 用户拥有的宠物总数
   */
  petsNum: number;
  /**
   * 排名
   */
  rank: number;
  /**
   * 名称
   */
  realName?: string;
  /**
   * 用户有哪些权限 默认
   */
  roles: string[];
  /**
   * 头像id
   */
  userHeaderId?: string;
  /**
   * 头像url
   */
  userHeaderUrl?: string;
  /**
   * 用户登录的邮箱
   */
  username: string;
  /**
   * 用户绑定的钱包地址
   */
  walletAddres?: string;
  [property: string]: any;
}
export async function getRanking<T>(params: getRankingPamas) {
  const result = await request<Record>(
    `/website/ranking-users?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}

interface GetDirParams {
  customerType: string;
}

export async function queryDir<T>(params: GetDirParams) {
  return request<T>(`/rms/customer/list?${stringify(params)}`, {
    onlyData: true,
  });
}
export async function queryDictType<T>(params: any) {
  return request<T>(`/rms/dict/type/${params}`, { onlyData: true });
}

export async function queryDirForCtnSizeType<T>() {
  return request<T>("/rms/dict/type/ctn_size_type", { onlyData: true });
}
export async function uploadImage<T>(params: FormData) {
  return request<T>("/admin/file/upload", {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "multipart/form-data;",
    },
    onlyData: true,
  });
}
export async function downloadImage<T>(fileId: string) {
  return request<T>(`/admin/file/download-file-by-file-id?fileId=${fileId}`);
}
export async function deleteImage<T>(fileId: string) {
  return request<T>(`/admin/file/${fileId}`, {
    method: "DELETE",
  });
}
