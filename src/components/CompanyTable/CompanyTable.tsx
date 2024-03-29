import * as React from 'react';
import { useEffect, useState} from "react";
import {
    Box,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Toolbar,
    Typography,
    Paper,
    Avatar,
    Grid} from '@mui/material';
import SearchToolbar from "./CompanySearchToolbar/SearchToolbar";
import CompanyTableHead from "./CompanyTableHead/CompanyTableHead";
import {SERVER_URL} from "../../utils/api";
import {AdminCompanyDTO} from "../../models/adminCompanyResponse.DTO";
import {UsersStaticAdminCompanyDTO}  from "../../models/usersStaticAdminCompanyResponse.DTO";
import {FilesStaticAdminCompanyDTO} from "../../models/filesStaticAdminCompanyResponse.DTO";
import  APIADMCOMPANY from "../../utils/apiadmcompany";
import classes from "./CompanyTable.module.css";
import IData from "./IData";  
import {Order} from "./orderColumns.ENUM";

  const buildRows = ( 
    name: string,  
    CUIT: string, 
    razonSocial: string, 
    teammates: number, 
    usedspace: string, 
    totalfiles: number,
    image : string,
    ) : IData =>  {
    return {
      name,
      CUIT,
      razonSocial,
      teammates, 
      usedspace, 
      totalfiles,
      image};
  };
  
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | undefined },
  b: { [key in Key]: number | string | undefined},
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const convertToGB = (bytes: number) => {
    return (bytes /Math.pow(1024,3)).toFixed(2);
}

const escapeRegExp = (value: string):string => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const filterData = (company : AdminCompanyDTO, 
  response: {files: FilesStaticAdminCompanyDTO[];
  teammates: UsersStaticAdminCompanyDTO[];} ) => {
  const filterTeammates = response.teammates?.filter((teammate: UsersStaticAdminCompanyDTO) => teammate.tenant === company.tenant);
  const totalTeamMatesByCompany = filterTeammates?.map((teammate => teammate.totalTeammates))?.shift();
  const filterFiles = response.files?.filter((file: FilesStaticAdminCompanyDTO) => file.tenant === company.tenant);  
  const totalSizeByCompany = filterFiles?.map((file => file.totalBytesSize ))?.shift();
  const totalFilesByCompany = filterFiles?.map((file => file.totalFiles ))?.shift();  
  return {totalTeamMatesByCompany, totalSizeByCompany , totalFilesByCompany};
  };

  const initialRows = (response: {
    companies: AdminCompanyDTO[];
    teammates: UsersStaticAdminCompanyDTO[];
    files: FilesStaticAdminCompanyDTO[];
}) => { 
    const rows = response.companies?.map((company: AdminCompanyDTO ) => { 
    const imgUrl = (`${SERVER_URL}/image${company?.image}.jpg?pixelsSize=96`); 
    const dataFiltered = filterData(company, response);
    const usedSpaceInGB = (dataFiltered.totalSizeByCompany!== (undefined)) ? convertToGB(dataFiltered.totalSizeByCompany).concat(' GB') : "";
      return (  
          buildRows(
          company.name, company.identificadorFiscal, company.razonSocial,
          dataFiltered.totalTeamMatesByCompany as number , usedSpaceInGB, 
          dataFiltered.totalFilesByCompany as number, imgUrl)
    );
  }
  );
  return rows;

};

const CompanyTable = () => {
  const [response, setResponse] = useState({companies: Array<AdminCompanyDTO>(), teammates: Array<UsersStaticAdminCompanyDTO>(), files: Array<FilesStaticAdminCompanyDTO>()});
  useEffect(()=> {
    const fetchData = async() => 
    {
      try 
      {
        const responseCompanies = await APIADMCOMPANY.companies();
        const respTeammates = await APIADMCOMPANY.teammates();
        const respFiles = await APIADMCOMPANY.files();
        setResponse({companies: responseCompanies.data.data, teammates: respTeammates.data.data, files: respFiles.data.data});
      } catch(error) {
          console.error(error);
      }
    };  
    
    fetchData();   

  },[]);

  const [rows, setRows] = useState<any[]>([]);
  const [order, setOrder] = useState<Order>(Order.ASC);
  const [orderBy, setOrderBy] = useState<keyof IData>('name');
  const [searchText, setSearchText] = useState('');

  useEffect(()=> { 
    setRows(initialRows(response));}, [response]);

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof IData,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? Order.DESC : Order.ASC);
      setOrderBy(property);
    };
  
  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = initialRows(response).filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field]?.toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{pl: { sm: 2 },pr: { xs: 1, sm: 1 },}}>
          <Typography sx={{ flex: '1 1 100%' }} variant="h5" id="tableTitle" component="div">
            Companies
          </Typography>
          <SearchToolbar
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            clearSearch={() => requestSearch("")}
          />
        </Toolbar>
        <TableContainer >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="Companies"
          >
            <CompanyTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.slice().sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        <Grid className={classes.grid}>
                          <Grid item lg={2}>
                            <Avatar alt="Logo" src= {row.image} className={classes.avatar}/>
                          </Grid>
                          <Grid item lg={10}>
                          <Typography className={classes.name}>{row.name}</Typography>  
                          </Grid>    
                        </Grid>  
                      </TableCell>
                      <TableCell align="center">{row.CUIT}</TableCell>
                      <TableCell align="center">{row.razonSocial}</TableCell>
                      <TableCell align="center">{row.teammates}</TableCell>
                      <TableCell align="center">{row.usedspace}</TableCell>
                      <TableCell align="center">{row.totalfiles}</TableCell> 
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default CompanyTable;