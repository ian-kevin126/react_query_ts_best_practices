import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

class ApiClient {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://fakestoreapi.com",
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // handle request before sending
        return config as InternalAxiosRequestConfig<any>;
      },
      (error) => {
        // handle request error
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // handle response
        return response;
      },
      (error) => {
        // handle response error
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }
}

export default new ApiClient();
