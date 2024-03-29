import React, { useState } from "react";
import { TenantResponseDTO } from "../models/tenantResponse.DTO";
import axios from "axios";

export interface AuthContextData {
  token: string;
  isLoggedIn: boolean;
  tenants: TenantResponseDTO[],
  login: (token: string) => void,
  setTenants: (tenants: TenantResponseDTO[]) => void,
  logout: () => void,
}

const AuthContext = React.createContext<AuthContextData>({
  token: "",
  isLoggedIn: false,
  tenants: [],
  login: (token: string) => {},
  setTenants: (tenants: TenantResponseDTO[]) => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC = (props) => {
  const initialToken: string = localStorage.getItem("token") ?? '';
  const localStorageTenants = localStorage.getItem("tenants");

  const initialTenants: TenantResponseDTO[] = localStorageTenants ? JSON.parse(localStorageTenants) : [];
  const [token, setToken] = useState<string>(initialToken);
  axios.defaults.headers.common['Authorization'] = `${initialToken}`;
  const [tenants, setTenantsOnState] = useState<TenantResponseDTO[]>(initialTenants);

  const userIsLoggedIn = !!token;

  const setTenantsHandler = (tenants: TenantResponseDTO[]) => {
    localStorage.setItem("tenants", JSON.stringify(tenants));
    setTenantsOnState(tenants);
  };

  const loginHandler = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `${token}`;
  };

  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem("token");
    localStorage.removeItem("tenants");
    axios.defaults.headers.common['Authorization'] = '';
  };

  const contextValue: AuthContextData = {
    token,
    isLoggedIn: userIsLoggedIn,
    tenants: tenants,
    login: loginHandler,
    setTenants: setTenantsHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
