// material-ul
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// third-party
import { enqueueSnackbar } from 'notistack';

// project import
import MainCard from 'components/MainCard';

// ==============================|| NOTISTACK - COLOR VARIANTS ||============================== //

export default function ColorVariants() {
  const NotiStackSnackbarCodeString = `<Button variant="contained" onClick={() => enqueueSnackbar('This is a default message.')}>
  Default
</Button>
<Button variant="contained" color="success" onClick={() => enqueueSnackbar('This is a success message', { variant: 'success' })}>
  success
</Button>
<Button variant="contained" color="warning" onClick={() => enqueueSnackbar('This is a warning message', { variant: 'warning' })}>
  Warning
</Button>
<Button variant="contained" color="info" onClick={() => enqueueSnackbar('This is an info message', { variant: 'info' })}>
  Info
</Button>
<Button variant="contained" color="error" onClick={() => enqueueSnackbar('This is an error message', { variant: 'error' })}>
  Error
</Button>
`;

  return (
    <MainCard title="Color Variants" codeString={NotiStackSnackbarCodeString}>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={() => enqueueSnackbar('This is a default message.')}>
            Default
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={() => enqueueSnackbar('This is a success message', { variant: 'success' })}>
            Success
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="warning" onClick={() => enqueueSnackbar('This is a warning message', { variant: 'warning' })}>
            Warning
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="info" onClick={() => enqueueSnackbar('This is an info message', { variant: 'info' })}>
            Info
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="error" onClick={() => enqueueSnackbar('This is an info message', { variant: 'error' })}>
            Error
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
