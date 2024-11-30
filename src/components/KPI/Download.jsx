
import * as React from 'react';
import { Grid, Switch, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateShowTable } from 'store/reducers/kpiSlice';
import { useSelector } from 'react-redux';
import CustomDialog from 'components/correspndence/CustomDialog';


export default function Download({hideSwitch=false}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const showTable = useSelector(state=>state.kpi.showTable);
  const dispatch = useDispatch();

  const handleChange = (event) =>{
    dispatch(updateShowTable(event.target.checked))
  }
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <Grid container>
      <Grid item md={6} alignItems="center" justifyContent="flex-start">
        {!hideSwitch&&<Grid display="flex" alignItems="center" justifyContent="flex-start">
          <Grid item >
            <Typography variant="h5">Chart</Typography>
          </Grid>
          <Grid item >
            <Typography variant="h5">
              <Switch
                checked={showTable}
                onChange={handleChange}
              />
            </Typography>
          </Grid>
          <Grid item >
            <Typography variant="h5">Table</Typography>
          </Grid>
        </Grid>}
      </Grid>
      <Grid item md={6} display="flex" justifyContent="flex-end" sx={{marginBottom:"1rem"}}>
        <Button onClick={handleClickOpen} variant='contained' style={{marginRight:"10px"}}>Actionable Insights</Button>
      </Grid>

      <CustomDialog
        open={dialogOpen}
        onClose={handleClose}
        title='Actionable Insights'
        maxWidth="sm" 
        fullWidth={false} 
      >
        <Typography>
          Increase focus on reducing eligibility denials, which represent 30% of total denials.
        </Typography>
      </CustomDialog>
    </Grid>

  );
}
