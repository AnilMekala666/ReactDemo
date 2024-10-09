// material-ul
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// project import
import MainCard from 'components/MainCard';

// third-party
import { enqueueSnackbar } from 'notistack';

// ==============================|| NOTISTACK - POSTIONING ||============================== //

export default function PositioningSnackbar() {
  const theme = useTheme();
  const backgroundColor = theme.palette.primary.main;

  const NotiStackPositioningCodeString = `<Button
  variant="contained"
  onClick={() =>
    enqueueSnackbar('This is a top-left message.', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      style: { backgroundColor }
    })
  }
>
  Top-Left
</Button>
<Button
  variant="contained"
  onClick={() =>
    enqueueSnackbar('This is a top-center message', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      style: { backgroundColor }
    })
  }
>
  Top-Center
</Button>
<Button
  variant="contained"
  onClick={() =>
    enqueueSnackbar('This is a top-right message', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      style: { backgroundColor }
    })
  }
>
  Top-right
</Button>
<Button
  variant="contained"
  onClick={() =>
    enqueueSnackbar('This is a bottom-left message', {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left'
      },
      style: { backgroundColor }
    })
  }
>
  Bottom-left
</Button>
<Button
  variant="contained"
  onClick={() =>
    enqueueSnackbar('This is a bottom-center message', {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      },
      style: { backgroundColor }
    })
  }
>
  Bottom-center
</Button>
<Button
  variant="contained"
  onClick={() =>
    enqueueSnackbar('This is a bottom-right message', {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      style: { backgroundColor }
    })
  }
>
  Bottom-Right
</Button>`;

  return (
    <MainCard title="Positioning" codeString={NotiStackPositioningCodeString}>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a top-left message.', {
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'left'
                },
                style: { backgroundColor }
              })
            }
          >
            Top-Left
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a top-center message', {
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                },
                style: { backgroundColor }
              })
            }
          >
            Top-Center
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a top-right message', {
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                },
                style: { backgroundColor }
              })
            }
          >
            Top-right
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a bottom-left message', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left'
                },
                style: { backgroundColor }
              })
            }
          >
            Bottom-left
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a bottom-center message', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center'
                },
                style: { backgroundColor }
              })
            }
          >
            Bottom-center
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() =>
              enqueueSnackbar('This is a bottom-right message', {
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right'
                },
                style: { backgroundColor }
              })
            }
          >
            Bottom-Right
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
}
