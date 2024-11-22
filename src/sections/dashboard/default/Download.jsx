
import * as React from 'react';
import { Grid, Switch, Typography } from '@mui/material';


export default function Download() {
  

  return (
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={0.5}>
            <Typography variant="h5">Chart</Typography>
          </Grid>
          <Grid item xs={0.5}>
            <Typography variant="h5"><Switch></Switch></Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5">Table</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ border: 1, borderColor: '#c5c5c5', borderStyle: 'solid', textAlign: 'center', padding: 5, marginRight: 10, borderRadius: 5, color: '#656565' }} variant="h5">Export</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ border: 1, borderColor: '#c5c5c5', borderStyle: 'solid', textAlign: 'center', padding: 5, borderRadius: 5, color: '#656565' }} variant="h5">Settings</Typography>
          </Grid>
        </Grid>
  );
}
