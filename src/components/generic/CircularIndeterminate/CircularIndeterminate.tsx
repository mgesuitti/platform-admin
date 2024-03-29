import classes from "./CircularIndeterminate.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularIndeterminate = () => {
  return (
    <Box className={classes.container}>
      <CircularProgress />
    </Box>
  );
}

export default CircularIndeterminate;