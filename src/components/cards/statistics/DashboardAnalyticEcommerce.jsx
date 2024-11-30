import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';
import { InfoCircleOutlined } from '@ant-design/icons';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function DashboardAnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra, border = true }) {
  return (
    <MainCard border={false} contentSX={{ p: 2 }} sx={{ padding: 1 }}>
      <MainCard border={false} contentSX={{ pt: 0, pb: "0px !important" }} sx={border ? { borderRight: "1px solid #C5C5C5", padding: 0, borderRadius: 0 } : {}}>
        <Stack >
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Typography mb={3} variant="h6" color="#656565">
              {title}
            </Typography>
            <InfoCircleOutlined style={{ marginBottom: 24, color:"#656565" }} />
          </Stack>
          <Grid container alignItems="center">
            <Grid item>
              <Typography mb={2} variant="h4" color="#252525">
                {count}
              </Typography>
            </Grid>

          </Grid>
        </Stack>
        <Grid container columnSpacing={0} p={0.5} style={{ border: 1, borderColor: '#ececec', borderStyle: 'solid', backgroundColor: '#fdfdfd', borderRadius: 5 }}>
          <Grid item xs={10}  >
            <Typography style={{ fontWeight: 'bold' }}>
              {percentage}
            </Typography>
          </Grid>
          <Grid item xs={1}  >
            <Typography style={{ textAlign: 'right', fontWeight: 'bold' }}>
              {extra}
            </Typography>
          </Grid>

        </Grid>
      </MainCard>
    </MainCard>
  );
}

DashboardAnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  border: PropTypes.bool
};
