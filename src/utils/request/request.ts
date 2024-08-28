import { message } from "antd";
// import { useEffect, useState } from 'react';
// import store from '../store';
const SERVICE_URL = "http://127.0.0.1:4523/m1/4939912-4597478-default";
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
};

interface CodeMessage {
  [code: string]: string;
}

export interface ResponseData<T = any> {
  code?: number;
  msg?: string;
  data?: T;
}

export interface ApiOptions {
  onlyData?: boolean;
  isAuth?: boolean;
  loadingText?: string;
}

export type ResultData<T> =
  | T
  | T[]
  | ResponseData<T[]>
  | ResponseData<T>
  | ResponseData;

export type Options = RequestInit & ApiOptions;

const codeMessage: CodeMessage = {
  "200": "操作成功",
  "400": "参数错误",
  "401": "用户没有权限",
  "403": "访问被禁止",
  "404": "资源不存在",
  "413": "上传的资源过大",
  "426": "用户名或密码错误",
  "428": "缺少请求参数",
  "500": "服务器发生错误",
  "502": "网关错误",
  "504": "网关超时",
  "999": "未知错误",
};

function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext: string =
    codeMessage[response.status ?? 999] || response.statusText;
  response.status != 401 &&
    response.status != 500 &&
    message.error(`${errortext}(${response.status ?? 999})`);
  throw response;
}

function parseData<T>(
  response: ResponseData,
  options?: ApiOptions
): ResultData<T> | null {
  if (!response) {
    return null;
  } else {
    if (!response.hasOwnProperty("data")) {
      return response;
    } else {
      if (response.code === 1) {
        const msg = response.msg || "请求错误";
        message.error(msg);
        return null;
      }
      return options?.onlyData ? response.data : response;
    }
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request<T>(
  url: string,
  options?: any
): Promise<T> {
  const token = await getToken();
  const newOptions: RequestInit = {
    credentials: "include",
    ...options,
  };
  if (newOptions.method === "POST" || newOptions.method === "PUT") {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers,
      };
    }
  }
  newOptions.headers = {
    ...newOptions.headers,
    Authorization: token ? `Bearer ${token}` : "Basic YXBwOmFwcA==",
  };
  // fetch(`${SERVICE_URL}${url}`, newOptions)
  return fetch(`${SERVICE_URL}${url}`, newOptions)
    .then(checkStatus)
    .then(async (response: Response): Promise<any> => {
      try {
        const _response = await response.json();
        return parseData<T>(_response, options);
      } catch (e) {
        return e;
      }
    })
    .catch(async (response: Response) => {
      const { status } = response;
      // const { dispatch } = store;
      try {
        const data = await response.json();
        if (status === 500 && data && data.code === 1) {
          return message.error(data.msg || "服务器发生错误");
        } else if (status === 401 || status === 403) {
          // dispatch.user.logout()
        }
      } catch (e) {
        console.log(e);
      }
    });
}
