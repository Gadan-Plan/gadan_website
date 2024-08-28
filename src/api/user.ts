import { stringify } from "@/utils/common/helper";
import request from "@/utils/request/request";
import { UserData, QuillContent, FileData } from "@/api/dataType";
export interface Data {
  current: number; //当前页数
  pages: string; //所有的页数
  records: UserData[];
  size: number; //传入的分页数量
  total: string; //所有的数量
}
export interface SearchParmas {
  current: number;
  searchName?: string; //查询值  输入猫猫名字或者用户名字  模糊匹配
  size: number;
}
//查找用户
export async function getUser<T>(params: SearchParmas) {
  const result = await request<Data>(`/website/users?${stringify(params)}`, {
    onlyData: true,
  });
  return result;
}
//根据用户id 查找详情
export async function getUserById<T>(params: { id: String }) {
  const result = await request<UserData>(
    `/website/userDetails?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}

//个人详情
export async function getPersonalDetails<T>() {
  const result = await request<UserData>(`/website/personalDetails`, {
    onlyData: true,
  });
  return result;
}
export interface AddPetParams {
  address?: string[]; //省份城市
  birthMonth: string; //预计出生日
  character?: string[]; //性格
  country: string; //所在国家
  gender: string; //性别
  name: string; //名称
  neuterTime: string; //绝育日期
  petHeader: FileData; //宠物头像
  quillContent?: QuillContent[]; //具体描述
  status: string; //猫猫状态
}
//新建猫猫信息
export async function addPet<T>(params: AddPetParams) {
  return request<T>(`/website/pet`, {
    method: "POST",
    loadingText: "正在申请...",
    body: params,
  });
}
export interface editUserParams {
  address?: string[]; //省份城市
  advertisement?: string; //我有话要讲：xxxxxxx
  country?: string; //所在国家  ’CN‘中国
  drawingImg?: FileData; //用户的手绘图id
  jobName?: string; //职业
  realName?: string; //名称
  phoneNumber?: string; //手机号码
  receivingAddress?: string; //收货地址
  userHeader: FileData; //头像
  walletAddres?: string; //钱包地址
}

//修改用户信息
export async function editUserDetails<T>(params: editUserParams) {
  return request<T>(`/website/userDetails`, {
    method: "PUT",
    loadingText: "正在提交...",
    body: params,
  });
}

export interface ReportParams {
  petsId?: string; //举报猫猫的id
  reportImgs?: FileData[]; //举报图片s
  reportText?: string; //举报明细
}
//举报猫猫
export async function reportPet<T>(params: ReportParams) {
  return request<T>(`/website/report`, {
    method: "POST",
    loadingText: "正在提交...",
    body: params,
  });
}
