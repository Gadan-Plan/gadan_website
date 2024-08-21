import { stringify } from "@/utils/common/helper";
import request from "@/utils/request/request";

export namespace RankApi {
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
    blackFlag?: boolean;
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
    addCatsNumber: number; //时间范围内新增猫猫的数量
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
  }

  export interface searchParams {
    [property: string]: any;
    /**
     * 当前页
     */
    current?: number;
    /**
     * 排行起始日 2023-09-33
     */
    rankBeginDate?: string;
    /**
     * 排行结束日 2023-09-34
     */
    rankEndDate?: string;
    /**
     * 数量
     */
    size?: number;
  }

  export interface Request {
    [property: string]: any;
    code: number;
    data: Data;
    msg: string;
  }

  export interface awardsParams {
    /**
     * 激励起始时间
     */
    awardBeginDate?: string;
    /**
     * 激励结束时间
     */
    awardEndDate?: string;
    /**
     * 当前页
     */
    current: number;
    /**
     * 每页返回数量
     */
    size: number;
    /**
     * 激励用户名
     */
    username?: string;
  }
  export interface awardsData {
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
  }
}
export async function getRanking<T>(params: RankApi.searchParams) {
  const result = await request<RankApi.Data>(
    `/website/ranking-users?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}

export async function getAwards<T>(params: RankApi.awardsParams) {
  const result = await request<RankApi.awardsData>(
    `/website/ranking-users?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}
