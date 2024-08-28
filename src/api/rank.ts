import { stringify } from "@/utils/common/helper";
import request from "@/utils/request/request";
import { AwardsDetail, FileData } from "@/api/dataType";

export interface RankRecord {
  address?: string[]; //省份城市
  advertisement?: string; //我有话要讲：xxxxxxx
  country?: string; //所在国家
  id: number; //ID编号
  jobName?: string; //职业
  petsNum: number; //用户拥有的宠物总数
  rank: number; //排名
  realName?: string; //名称
  userHeader: FileData; //头像
  walletAddres?: string; //用户绑定的钱包地址
  addCatsNumber: number; //时间范围内新增猫猫的数量
}
export interface Data {
  current: number; //当前页数
  pages: number; //所有的页数
  records: RankRecord[];
  size: number; //传入的分页数量
  total: number; //所有的数量
}
export interface searchParams {
  current?: number; //当前页
  rankBeginDate?: string; //排行起始日
  rankEndDate?: string; //排行结束日
  size?: number; //数量
}
export interface Request {
  code: number;
  data: Data;
  msg: string;
}

export interface AwardsParams {
  awardBeginDate?: string; //激励起始时间
  awardEndDate?: string; //激励结束时间
  current: number; //当前页
  size: number; //每页返回数量
}

export interface AwardsData {
  current: number; //当前页数
  pages: number; //所有的页数
  records: AwardsDetail[];
  size: number; //传入的分页数量
  total: number; //所有的数量
}
export async function getRanking<T>(params: searchParams) {
  const result = await request<Data>(
    `/website/ranking-users?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}

export async function getAwards<T>(params: AwardsParams) {
  const result = await request<AwardsData>(
    `/website/getAwards?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}
