import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class Request {
  private instance: AxiosInstance | undefined;

  constructor(requeseConfig: AxiosRequestConfig) {
    this.instance = axios.create(requeseConfig);

    // Global request interception
    this.instance.interceptors.request.use(
      (config) => {
        console.log("Global request intercepted", config);
        return config;
      },
      (error) => {
        console.log("Global request interception failed", error);
      }
    );

    // Global response interception
    this.instance.interceptors.response.use(
      (res) => {
        // res is of type AxiosResponse and contains conig\data\headers\request\status\statusText attribute
        console.log("Global response intercepted", res);
        return res.data;
        // just need to return data
      },
      (error) => {
        console.log("Global response failure interception");
        console.log(error.request);
        console.log(error.response);
        return error;
      }
    );
  }

  request<T>(config: AxiosRequestConfig<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.instance
        ?.request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      this.instance
        ?.get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }

  post(url: string, data = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        ?.post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }
}

const request: Request = new Request({
  baseURL: "https://fakestoreapi.com"
});

export default request;
