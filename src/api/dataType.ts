export interface Response {
  code: number;
  data: null;
  msg: string;
}
export interface Description {
  content?: string;
  fileList?: FileData[];
}

export interface AwardsDetail {
  awardMonth: string; //激励所属年月 ’2024-04‘
  awardsPNC: number; //本次获得的噶蛋coin
  awardsTockenType?: string; //本次获得的代币种类  比如ETH BTC LTC BNB
  awardsToken?: number; //浮点数6位小数  本次获得的代币值
  awardUserId: number; //激励用户id
  createTime: string; //创建时间
  donationLink: string; //捐赠组织链接 官网
  donationOwner: string; //捐赠组织
  id: string; //ID 编号
  rank: number; //排名
  realName: string; //激励用户名
  title: string; //激励名称
  updateTime?: string; //更新时间
  walletAddres: string; //钱包地址
  otherDonation?: string; //捐赠的其他形式
}
export interface FileData {
  createTime?: string;
  createUser?: string;
  fileSize?: string; //文件大小
  fineName?: string; //文件名
  id?: string;
  updateTime?: string;
  updateUser?: string;
  url: string; //文件url
}
export interface QuillContent {
  contentId?: number; //描述id
  contentImgs?: FileData[]; //描述图片files
  contentText?: string; //描述文字
  creatTime?: string; //创建描述的时间
}
export interface Pet {
  address?: string[]; //省份城市
  birthMonth?: string; //预计出生日
  character?: string[]; //性格
  country?: string; //所在国家
  createTime?: string; //创建时间
  createUser?: string; //创建人
  createUserId?: number; //创建人id
  id?: string; //宠物ID编号
  inQuestion?: boolean; //是否被举报中
  name?: string; //名称
  neuterTime?: string; //绝育日期
  parentId?: number; //所属用户id
  petHeader?: FileData; //宠物头像标识
  username?: string; //所属用户登录名
  valid?: boolean; //true:有效 false:无效    默认true
  quillContent?: QuillContent[]; //具体描述
}
//用户数据
export interface UserData {
  address?: string[]; //省份城市
  advertisement?: string; //我有话要讲：xxxxxxx
  allPNC?: number; //该用户所有的噶蛋币
  awardsDetails: AwardsDetail[]; //这部分获奖记录的增删改查 在后台管理页面
  country?: string; //所在国家  ’CN‘中国
  drawingImg?: FileData; //用户的手绘图
  id?: string; //ID编号
  pets: Pet[]; //猫猫详情
  jobName?: string; //职业
  petsNum?: number; //用户拥有的宠物总数
  realName?: string; //显示名称
  userHeader?: FileData; //头像
  username?: string; //用户登录的邮箱
  walletAddres?: string; //用户绑定的钱包地址
  receivingAddress?: string; //收获地址
  phoneNumber?: number; //手机号码
}
