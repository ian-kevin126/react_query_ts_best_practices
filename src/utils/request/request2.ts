import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";

interface ApiConfig {
  baseUrl: string;
}

interface ApiResponse<T> {
  data: T;
}

interface ApiError {
  message: string;
}

interface ApiErrorResult {
  response?: {
    data: ApiError;
  };
  message?: string;
}

interface Api {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, data: any): Promise<T>;
  put<T>(path: string, data: any): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

const handleApiError = (error: ApiErrorResult) => {
  const message =
    error.response?.data.message ||
    error.message ||
    "An error occurred while making the API call.";
  return new Error(message);
};

const createApi = ({ baseUrl }: ApiConfig): Api => {
  const axiosInstance = axios.create({ baseURL: baseUrl });

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // 在发送请求之前做些什么，例如添加token
      return config as InternalAxiosRequestConfig<any>;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 对响应数据做些什么，例如根据返回状态码处理错误
      return response;
    },
    (error) => {
      // 对响应错误做些什么
      return Promise.reject(error);
    }
  );

  const api: Api = {
    async get<T>(path: string): Promise<T> {
      try {
        const response = await axiosInstance.get<ApiResponse<T>>(path);
        return response.data.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    async post<T>(path: string, data: any): Promise<T> {
      try {
        const response = await axiosInstance.post<ApiResponse<T>>(path, data);
        return response.data.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    async put<T>(path: string, data: any): Promise<T> {
      try {
        const response = await axiosInstance.put<ApiResponse<T>>(path, data);
        return response.data.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    async delete<T>(path: string): Promise<T> {
      try {
        const response = await axiosInstance.delete<ApiResponse<T>>(path);
        return response.data.data;
      } catch (error) {
        throw handleApiError(error);
      }
    }
  };

  return api;
};

export default createApi({
  baseUrl: "https://fakestoreapi.com"
});
