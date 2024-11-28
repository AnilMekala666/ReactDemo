import { Box } from '@mui/material';
import React,{useMemo} from 'react';
import { useSelector } from 'react-redux';
import ReusableBarChart from '../KPIs/Charts/BarChart';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import Download from 'components/KPI/Download';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import HeatMap from '../KPIs/Charts/HeatMap';
import { remmitanceAnalysisColumns } from './kpiTableHeaderData';

const RemmitanceAnalysis = () => {
    const {showTable,payloadDate} = useSelector(state=>state.kpi);
    const remittanceConfig = useMemo(() => ({
        url: KPI_ENDPOINTS.GET_REMMITTANCE_KPI,
        method: "POST",
        data: payloadDate,
      }), [payloadDate])
    const { data:remittanceAnalysisData, loading:remittanceAnalysisLoading, error:remittanceAnalysisError } = useAxios(remittanceConfig, true); 
    console.log(remittanceAnalysisData,"inside the remmitance analysis")
    // {
    //     "totalRemittanceAmount": 21711.200073242188,
    //     "avgProcessingTime": 295,
    //     "payer": "aarp supplemental health plans from unitedhealthcare"
    // }
   const heatMapdata = remittanceAnalysisData?.slice(0,20);
   const heatMapdataTable=remittanceAnalysisData;
    // const heatMapdata = [
    //     { payer: 'Medicare', processingTime: 15, totalAmount: 2500000 },
    //     { payer: 'Blue Cross', processingTime: 10, totalAmount: 1800000 },
    //     { payer: 'Aetna', processingTime: 20, totalAmount: 1200000 },
    //     { payer: 'UnitedHealth', processingTime: 12, totalAmount: 2000000 },
    //     { payer: 'Cigna', processingTime: 18, totalAmount: 1500000 },
    //     { payer: 'Humana', processingTime: 14, totalAmount: 1700000 },
        
    //   ];

    //   const xCategories = heatMapdata?.map(item => item.processingTime);
    //   const yCategories = [...new Set(heatMapdata?.map(item => item.totalAmount))].sort((a, b) => a - b);
    
      const xCategories = heatMapdata?.map(item => item.avgProcessingTime);
      const yCategories = [...new Set(heatMapdata?.map(item => item.totalRemittanceAmount))].sort((a, b) => a - b);
    //onst remittanceSummaryBarChart = kpiWidgetsData?.kpiResponse?.monthlyData;

  return (
    <Box>
  <Download />
  {!showTable && heatMapdata ? <HeatMap data={heatMapdata} xCategories={xCategories} yCategories={yCategories} />: showTable && heatMapdata ?
  <ReUsableTable columns={remmitanceAnalysisColumns} rows={heatMapdataTable}/>: <h5>Loading....</h5>
  }
    </Box>
  );
};

export default RemmitanceAnalysis;
