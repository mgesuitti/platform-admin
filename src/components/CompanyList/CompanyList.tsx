import classes from "./CompanyList.module.css";
import {AdminCompanyDTO} from "../../models/adminCompanyResponse.DTO"
import  APIADMCOMPANY from "../../utils/apiadmcompany";
import {useEffect, useState} from "react";
import{SERVER_URL} from "../../utils/api";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const CompanyList = () => { 
    const initialValue = new Array<AdminCompanyDTO>();
    const [companies, setCompanies] = useState(initialValue);
    useEffect(()=> {
      const fetchData = async() => 
      {
        try 
        {
          const response = await APIADMCOMPANY.companies();
          setCompanies(response.data.data);
        } catch(error) {
            console.error(error);
        }
      };  
      
      fetchData();   

    },[]);
    const companiesList = companies?.map((company: AdminCompanyDTO ) => { 
      
      const  imgUrl = company.image !== null || undefined ? `${SERVER_URL}/image${company?.image}.jpg?pixelsSize=96`: "";
      return (
        <ListItem
          alignItems="flex-start"
          key={company.id}
          className={classes.item}
        >
          <ListItemAvatar>
            <Avatar alt="Logo" src={imgUrl} />
          </ListItemAvatar>
          <ListItemText primary={company.name} secondary={company.pais.nombre}/>
        </ListItem>
      ); 
    });
  return (
    <section className={classes.container}>
      <Typography component="h1" variant="h5">
        Companies
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {companiesList}
      </List>
    </section>
  );
};
export default CompanyList;
