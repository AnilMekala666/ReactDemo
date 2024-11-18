import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';

const DashboardContext = createContext();

// Define a provider component
const DashboardProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const [overViewData, setOverViewData] = useState(null);
    const [widgetData1, setWidgetData1] = useState([]);
    const [widgetData2, setWidgetData2] = useState([]);
    const [statusValues, setStatusValues] = useState({
      processed: 0,
      inProgress: 0,
      needAttention: 0,
    });
    const [overviewTableData, setOverviewTableData] = useState([]);
    const [error, setError] = useState(null);
  
    // Fetch data function
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(CORRESPONDENCE_ENDPOINTS.fetchConfScoreInfo);
        const data = response.data;
  
        console.log('API response:', data);
  
        if (data) {
          setOverViewData(data);
          setWidgetData1([
            {
              title: 'Total Document',
              count: data.totalDoc.toString(),
              percentage: 20.3,
              invoice: '',
            },
            {
              title: 'Processed Document',
              count: data.processedDoc.toString(),
              percentage: -8.73,
              invoice: '',
            }
          ]);
  
          if (data.documentMetrics) {
            setStatusValues({
              processed: data.documentMetrics.metricsProcessed || 0,
              inProgress: data.documentMetrics.metricsReadyToProcess || 0,
              needAttention: data.documentMetrics.metricsWaitingforUserValidation || 0,
            });
  
            setWidgetData2([
              {
                title: 'Document Metrics',
                count: data.totalDoc.toString(),
                percentage: 1.73,
                color: theme.palette.error,
                status: 'processed',
                value: data.documentMetrics.metricsProcessed || 0,
                statusValues: {
                  processed: data.documentMetrics.metricsProcessed || 0,
                  inProgress: data.documentMetrics.metricsReadyToProcess || 0,
                  needAttention: data.documentMetrics.metricsWaitingforUserValidation || 0,
                }
              }
            ]);
          }
  
          if (data.predictionDetails) {
            const tableViewdata = data.predictionDetails;
            const formattedData = tableViewdata.map((item, index) => ({
              index: index + 1,
              name: item.prediction,
              totalDocument: item.totalDoc,
              processed: item.processed,
              inProgress: item.waitingforUserValidation,
              needAttention: item.readyToProcess,
            }));
            setOverviewTableData(formattedData);
          }
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoader(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []); // Runs once when the component mounts
  
    // Context values to share
    const contextValue = {
      loader,
      overViewData,
      widgetData1,
      widgetData2,
      statusValues,
      overviewTableData,
      error,
      fetchData
    };
  
    return (
      <DashboardContext.Provider value={contextValue}>
        {children}
      </DashboardContext.Provider>
    );
  };
  
  export { DashboardContext, DashboardProvider };