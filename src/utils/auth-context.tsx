import React, { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Result, Spin } from "antd";
import * as auth from "./auth-provider";
import { http } from "./http";
import { useMount } from "./common";
import { useAsync } from "./use-async";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: auth.User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser
  } = useAsync<auth.User | null>();
  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then((user) => {
      setUser(null);
      // 清除获取的缓存
      queryClient.clear();
    });

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <Result title={"error"} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth必须在AuthProvider中使用");
  }
  return context;
};
