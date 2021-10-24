import { Children, createContext, FC, useEffect, useState } from "react";
import { api } from "../services/api";

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

interface AuthContextProps {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }`;

  async function signIn(code: string): Promise<void> {
    const res = await api.post<AuthResponse>("/authenticate", {
      code: code,
    });
    const { token, user } = res.data;

    setUser(user);
    localStorage.setItem("@dowhile:token", token);
  }

  function signOut(): void {
    setUser(null);
    localStorage.removeItem("@dowhile:token");
  }

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<User>("profile").then(res => {
        setUser(res.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      window.history.pushState({}, "", urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signOut, signInUrl, user }}>
      {children}
    </AuthContext.Provider>
  );
};
