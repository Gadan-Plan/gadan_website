import { stringify } from "@/utils/common/helper";
import request from "@/utils/request/request";

export namespace UserApi {
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
    pages: string;
    records: Record[];
    /**
     * 传入的分页数量
     */
    size: number;
    /**
     * 所有的数量
     */
    total: string;
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
     * 这部分获奖记录的增删改查 在后台管理页面
     */
    awardsDetails: AwardsDetail[];
    /**
     * 是否时黑名单用户  true:是 false:否
     */
    blackFlag?: boolean;
    /**
     * 所在国家  ’CN‘中国
     */
    country?: Country;
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
     * 猫猫详情
     */
    pets: Pet[];
    /**
     * 职业
     */
    jobName?: string;
    /**
     * 用户拥有的宠物总数
     */
    petsNum?: number;
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

  export interface AwardsDetail {
    /**
     * 激励所属年月 ’2024-04‘
     */
    awardMonth: string;
    /**
     * 本次获得的噶蛋coin
     */
    awardsPNC: number;
    /**
     * 本次获得的代币种类  比如ETH BTC LTC BNB
     */
    awardsTockenType?: string;
    /**
     * 浮点数6位小数  本次获得的代币值
     */
    awardsToken?: number;
    /**
     * 激励用户id
     */
    awardUserId: number;
    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 捐赠组织链接 官网
     */
    donationLink: string;
    /**
     * 捐赠组织
     */
    donationOwner: string;
    /**
     * ID 编号
     */
    id: number;
    /**
     * 排名
     */
    rank: number;
    /**
     * 激励用户名
     */
    realName: string;
    /**
     * 激励名称
     */
    title: string;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 激励用户登录名
     */
    username: string;
    /**
     * 钱包地址
     */
    walletAddres: string;
    [property: string]: any;
  }

  export interface QuillContent {
    /**
     * 描述id
     */
    contentId: number;
    /**
     * 描述图片ids
     */
    contentImgIds?: string[];
    /**
     * 描述图片urls
     */
    contentImgUrls?: string[];
    /**
     * 描述文字
     */
    contentText?: string;
    /**
     * 创建描述的时间
     */
    creatTime: string;
    [property: string]: any;
  }
  export interface Pet {
    /**
     * 省份城市
     */
    address?: string[];
    /**
     * 预计出生日
     */
    birthMonth: string;
    /**
     * 性格
     */
    character?: string[];
    /**
     * 所在国家
     */
    country: string;
    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 创建人
     */
    createUser: string;
    /**
     * 创建人id
     */
    createUserId: number;
    /**
     * 宠物ID编号
     */
    id: number;
    /**
     * true:被举报中 false:没有被举报   默认false  系统自动判定规则：questionContent的所有数组数据中 的status都是false
     * 则该值为false（正常）  ,只要有一条处于打开状态，就是true(被举报中)
     */
    inQuestion: boolean;
    /**
     * 名称
     */
    name: string;
    /**
     * 绝育日期
     */
    neuterTime: string;
    /**
     * 所属用户id
     */
    parentId: number;
    /**
     * 宠物头像标识id
     */
    petHeaderId: string;
    /**
     * 宠物头像标识url
     */
    petHeaderUrl: string;

    /**
     * 更新时间
     */
    updateTime: string;
    /**
     * 更新人的登录名
     */
    updateUser: string;
    /**
     * 更新人id
     */
    updateUserId: number;
    /**
     * 所属用户登录名
     */
    username: string;
    /**
     * true:有效 false:无效    默认true
     */
    valid: boolean;
    /**
     * 具体描述  返回的地方根据时间排序  最近的改动放在最上面
     */
    quillContent?: QuillContent[];
    [property: string]: any;
  }

  /**
   * 所在国家  ’CN‘中国
   */
  export enum Country {
    AF = "AF",
    CN = "CN",
  }
  export interface SearchParmas {
    current: number;
    /**
     * 查询值  输入猫猫名字或者用户名字  模糊匹配
     */
    searchName: string;
    size: number;
    [property: string]: any;
  }
}
export async function getUser<T>(params: UserApi.SearchParmas) {
  const result = await request<UserApi.Data>(
    `/website/users?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}

export async function getUserById<T>(params: { id: String }) {
  const result = await request<UserApi.Data>(
    `/website/userDetails?${stringify(params)}`,
    {
      onlyData: true,
    }
  );
  return result;
}

//个人详情
export async function getPersonalDetails<T>() {
  const result = await request<UserApi.Data>(`/website/personalDetails`, {
    onlyData: true,
  });
  return result;
}

export async function queryDir<T>(params: any) {
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
