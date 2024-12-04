import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AvgRemICon from '../../assets/icons/Average Remittance Time.png'
import CleanClaimRate from '../../assets/icons/Clean claim rate.png';
import daysInAccountReceivable from '../../assets/icons/Days in Accounts Receivable (AR).png';
import denialRate from '../../assets/icons/Denial Rate.png';
import netCollectionRate from '../../assets/icons/Net collection rate.png';
import pendingClaims from '../../assets/icons/Pending claims.png';
import reconciliationRate from '../../assets/icons/Reconciliation Rate.png';
import topPayer from '../../assets/icons/Top Payer.png';
import totalClaimsSubmitted from '../../assets/icons/Total claims submitted.png';
import totalRemittanceAmount from '../../assets/icons/Total Remittance Amount.png';
import { formatAmount } from 'pages/KPIs/kpiHelpers';

// project import
import MainCard from 'components/MainCard';
import Tooltip from "@mui/material/Tooltip";

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';
import { borderRadius, fontWeight, maxWidth } from '@mui/system';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function KpiCard({ color = 'primary', title, count, percentage, isLoss, extra, payor, icon }) {
 console.log(title)
  return (
    <MainCard contentSX={{ p: 2 }} sx={{ maxWidth: "390px",height:"8rem", borderRadius: "1.5rem" }}>
      <Stack >
        <Typography mb={3} variant="h6" color="#656565" sx={{ fontSize: "16px" }}>
          <Tooltip title={`Full Name: ${title}`} arrow>
          {title?.split(" ").slice(0, 3).join(" ")}
          </Tooltip>
          {/* {title} */}
        </Typography>
        <Grid container alignItems="center">
          <Grid item sx={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
            <Typography  variant="h4" color="#252525">
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
            <Box><img 
            // src={AvgRemICon} 
            src={icon} 
            alt="icon" style={{width:"40px",height:'40px'}}/></Box>
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