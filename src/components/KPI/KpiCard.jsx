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
import { maxWidth } from '@mui/system';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function KpiCard({ color = 'primary', title, count, percentage, isLoss, extra }) {
  return (
    <MainCard contentSX={{ p: 2 }} sx={{maxWidth:"390px"}}>
      <Stack >
        <Typography mb={3} variant="h6" color="#656565">
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography mb={2} variant="h4" color="#252525">
              {count}
            </Typography>
          </Grid>
          
        </Grid>
      </Stack>
      {/* <Grid container columnSpacing={0} p={0.5} style={{border:1, borderColor:'#ececec',borderStyle:'solid', backgroundColor:'#fdfdfd', borderRadius:5}}>
            <Grid item xs={10}  >
            <Typography style={{fontWeight:'bold'}}>
            {percentage}
            </Typography>
            </Grid>
            <Grid item xs={1}  >
              <Typography style={{textAlign:'right', fontWeight:'bold'}}>
            {extra}
            </Typography>
            </Grid>
        
      </Grid> */}
    </MainCard>
  );
}

KpiCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string
};
