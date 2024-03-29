import Paper from '@mui/material/Paper';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import classes from './Dashboard.module.css';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);

  const companyListLength = authCtx.tenants?.length;

  return (
    <section className={classes.starting}>
      <Paper elevation={2} className={classes.paper}>
        <h3>Companies</h3>
        <div>{companyListLength}</div>
      </Paper>
    </section>
  );
};

export default Dashboard;
