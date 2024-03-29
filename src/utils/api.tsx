import axios, { AxiosResponse } from "axios";
import { AuthResponseDTO } from "../models/authResponse.DTO";
import { AuthTenantsResponseDTO } from "../models/authTenantsResponse.DTO";
import { TypeSocial } from "../models/typeSocial.ENUM";
export const SERVER_URL = "https://localhost:8881";

const login = (
  userName: string,
  password: string
): Promise<AxiosResponse<AuthTenantsResponseDTO>> => {
  const requestData = {
    userName,
    password,
  };

  return axios.post<AuthTenantsResponseDTO>(
    `${SERVER_URL}/auth/tenants`,
    requestData
  );
};

const tenantLogin = (token: string) => {
  const authData2 = {
    typeSocial: TypeSocial.Tenant,
    tokenId: token,
  };

  return axios.post<AuthResponseDTO>(`${SERVER_URL}/auth`, authData2);
};

const notificar = (formData: FormData) => {
  return axios.post<AuthResponseDTO>(
    `${SERVER_URL}/personalLegajos/notificar/`,
    formData
  );
};

const API = {
  tenantLogin,
  notificar,
  login,
};

export default API;
