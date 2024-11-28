
import * as React from 'react';
import { Grid, Switch, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateShowTable } from 'store/reducers/kpiSlice';
import { useSelector } from 'react-redux';
// import { Target } from 'assets/images/analytics/target.svg';


export default function Download() {
  const showTable = useSelector(state=>state.kpi.showTable);
  const dispatch = useDispatch();

  const handleChange = (event) =>{
    dispatch(updateShowTable(event.target.checked))
  }
  

  return (
        <Grid container alignItems="center" justifyContent="flex-start">
          <Grid item xs={0.5}>
            <Typography variant="h5">Chart</Typography>
          </Grid>
          <Grid item xs={0.5}>
            <Typography variant="h5">
            <Switch
            checked={showTable}
            onChange={handleChange}	
            />
           </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5">Table</Typography>
          </Grid>
          {/* <Grid item xs={1}>
            <Typography style={{ border: 1, borderColor: '#c5c5c5', borderStyle: 'solid', textAlign: 'center', padding: 5, marginRight: 10, borderRadius: 5, color: '#656565' }} variant="h5">Export</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ border: 1, borderColor: '#c5c5c5', borderStyle: 'solid', textAlign: 'center', padding: 5, borderRadius: 5, color: '#656565' }} variant="h5">Settings</Typography>
          </Grid> */}
        </Grid>
  );
}
