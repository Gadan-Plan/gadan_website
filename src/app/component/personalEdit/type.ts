import type { Dayjs } from "dayjs";
export interface selectType {
  value: string;
  label: string;
}

export interface applicationForm {
  name: string; //名字
  petHeaderId: string | undefined; //标识
  neuterTime: string; //噶蛋日
  gender: string; //性别
  birthMonth: string; //预计出生日
  country: string; //国家
  address: string[]; //噶蛋地
  status: string; //状态
  character: string[]; //性格
  quillContent: string | undefined; //猫猫描述
}
