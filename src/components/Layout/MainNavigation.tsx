import { List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import BusinessIcon from "@mui/icons-material/Business";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableIcon from '@mui/icons-material/TableRows';

const MainNavigation: React.FC<{closeDrawer: () => void}> = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    props.closeDrawer();
  };

  return (
    <List>
      {!isLoggedIn && (
        <ListItem key={0} component={NavLink} to="/login">
          <ListItemIcon>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Log In" />
        </ListItem>
      )}

      {isLoggedIn && (
        <Fragment>
          <ListItem key={1} component={NavLink} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem key={2} component={NavLink} to="/companies">
            <ListItemIcon>
              <TableIcon />
            </ListItemIcon>
            <ListItemText primary="Companies" />
          </ListItem>

          <ListItem key={3} component={NavLink} to="/message">
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Communications" />
          </ListItem>

          <ListItem key={4} button onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Fragment>
      )}
    </List>
  );
};

export default MainNavigation;
