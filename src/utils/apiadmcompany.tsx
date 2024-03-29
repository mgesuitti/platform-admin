import axios from "axios";
import { IAdminCompanyResponse} from "../models/IAdminCompanyResponse"
import { IFilesStaticAdminCompanyDTO } from "../models/IFilesStaticAdminCompany.DTO";
import { IUsersStaticAdminCompanyDTO } from "../models/IUsersStaticAdminCompany.DTO";
import { SERVER_URL } from "./api";

const companies = () => {
return axios.get<IAdminCompanyResponse>(
  `${SERVER_URL}/admin/companies`);
}

const teammates = () => {
  return axios.get<IUsersStaticAdminCompanyDTO>(
    `${SERVER_URL}/admin/companies/teammates`);
  }

const files = () => {
  return axios.get<IFilesStaticAdminCompanyDTO>(
    `${SERVER_URL}/admin/companies/files`);
  }

const APIADMCOMPANY = {
  companies,
  teammates,
  files
};

export default APIADMCOMPANY;
