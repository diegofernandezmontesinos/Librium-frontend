import axiosInstance from "@/utils/axios/AxiosInstance";
import { ApiPaths } from "@/utils/ApiPath";

export const AuthService = {
  login: async (username: string, password: string, captchaToken?: string) => {
    const { data } = await axiosInstance.post(ApiPaths.auth.login, {
      username,
      password,
      captchaToken,
    });
    return data;
  },

  logout: async () => {
    await axiosInstance.post(ApiPaths.auth.logout);
  },

  register: async (username: string, password: string) => {
    const { data } = await axiosInstance.post(ApiPaths.auth.register, {
      username,
      password,
    });
    return data;
  },
};
