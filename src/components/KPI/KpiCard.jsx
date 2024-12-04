import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import Tooltip from "@mui/material/Tooltip";

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';
import { borderRadius, fontWeight, maxWidth } from '@mui/system';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function KpiCard({ color = 'primary', title, count, percentage, isLoss, extra, payor }) {
  console.log("payor", count)
  return (
    <MainCard contentSX={{ p: 2 }} sx={{ maxWidth: "390px", borderRadius: "1.5rem" }}>
      <Stack >
        <Typography mb={3} variant="h6" color="#656565" sx={{ fontSize: "16px" }}>
          <Tooltip title={`Full Name: ${title}`} arrow>
          {title?.split(" ").slice(0, 3).join(" ")}
          </Tooltip>
          {/* {title} */}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            {/* <Typography mb={2} variant="h4" color="#252525">
            {payor && <span style={{fontWeight:"600"}}>{payor.toUpperCase()}-</span>} {count}{title?.toLowerCase().includes('rate') ? "%" : null}
            </Typography> */}
            <Typography mb={2} variant="h4" color="#252525">
              {payor && (
                <Tooltip title={`Full Name: ${payor}`} arrow>
                  <span style={{ fontWeight: "600" }}>
                    {payor.split(" ").slice(0, 3).join(" ").toUpperCase()}-
                  </span>
                </Tooltip>
              )}
              {count}
              {title?.toLowerCase().includes("rate") ? "%" : null}
            </Typography>
          </Grid>

        </Grid>
      </Stack>
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
