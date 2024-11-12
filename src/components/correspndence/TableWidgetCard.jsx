/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';


// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import { Flex, Progress, Tooltip } from 'antd';
import MultiSegmentLinearWithLabel from './MultiSegmentLinearWithLabel';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import MainCard from 'components/MainCard';


import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import {
    InfoCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import { borderRadius, width } from '@mui/system';

export function TableWidgetCard1({ color, title, count, percentage, isLoss, invoice, isActive }) {
    const { mode } = useConfig();

    return (
        <MainCard
            // {...(isActive && {
            //     sx: {
            //         bgcolor: mode === ThemeMode.DARK ? 'background.default' : 'secondary.lighter',
            //         borderColor: 'secondary.lighter',
            //         // borderRadius:'16px'
            //     }
            // })}
            sx={{ borderRadius: '16px', height: '202px' }}
        >
            <Grid container spacing={1.25} >
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                    <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Typography className='card-text'>{title}</Typography>

                        <Stack sx={{ ml: 1.25, pl: 1 }} direction="row" alignItems="center" spacing={1} >
                            <InfoCircleOutlined color="#879296" sx={{ width: '18px', height: '18px' }} />
                        </Stack>

                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={0.25}>
                        <Typography className='card-header'>{count}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">

                            {percentage && (
                                <Stack sx={{ ml: 1.25, pl: 1 }} direction="row" alignItems="center" spacing={1} style={{ marginTop: "5px", padding: "0px" }}>
                                    {!isLoss && <ArrowUpOutlined style={{ fontSize: '13px', color: color, }} />}
                                    {isLoss && <ArrowDownOutlined style={{ fontSize: '13px', color: color }} />}
                                    <Typography className='card-subline' variant="h5" sx={{ fontWeight: 500 }}>
                                        {invoice}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </MainCard>
    );
}



export function TableWidgetCard2({
    color,
    title,
    count,
    percentage,
    isLoss,
    invoice,
    status,
    statusValues = { processed: 0, inProgress: 0, needAttention: 0 },
    statusValuesWithoutPercentage = { processed: 0, inProgress: 0, needAttention: 0 },
}) {
    const [processedPercentage, setProcessedPercentage] = useState(0);
    const [inProgressPercentage, setInProgressPercentage] = useState(0);
    const [needAttentionPercentage, setNeedAttentionPercentage] = useState(0);

    const [processedWithoutPercentage, setProcessedWithoutPercentage] = useState(0);
    const [inProgressWithoutPercentage, setInProgressWithoutPercentage] = useState(0);
    const [needAttentionWithoutPercentage, setNeedAttentionWithoutPercentage] = useState(0);

    useEffect(() => {
        // Calculate the total
        const total = statusValues.processed + statusValues.inProgress + statusValues.needAttention;
        
        // Check if the total is non-zero to avoid division by zero
        if (total > 0) {
            setProcessedPercentage((statusValues.processed / total) * 100);
            setInProgressPercentage((statusValues.inProgress / total) * 100);
            setNeedAttentionPercentage((statusValues.needAttention / total) * 100);
        } else {
            // If total is zero, set all segments to 0
            setProcessedPercentage(0);
            setInProgressPercentage(0);
            setNeedAttentionPercentage(0);
        }
    }, [statusValues]);

    useEffect(() => {
        // Calculate the total
        const total = statusValues.processed + statusValues.inProgress + statusValues.needAttention;
        
        // Check if the total is non-zero to avoid division by zero
        if (total > 0) {
            setProcessedWithoutPercentage((statusValues.processed ));
            setInProgressWithoutPercentage((statusValues.inProgress));
            setNeedAttentionWithoutPercentage((statusValues.needAttention));
        } else {
            // If total is zero, set all segments to 0
            setProcessedWithoutPercentage(0);
            setInProgressWithoutPercentage(0);
            setNeedAttentionWithoutPercentage(0);
        }
    }, [statusValuesWithoutPercentage]);

    return (
        <MainCard sx={{ borderRadius: '16px', height: '202px' }}>
            <Grid container spacing={1.25}>
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                    <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Typography className="card-text">{title}</Typography>
                        <Stack sx={{ ml: 1.25, pl: 1 }} direction="row" alignItems="center" spacing={1}>
                            <InfoCircleOutlined color="#879296" sx={{ width: '18px', height: '18px' }} />
                        </Stack>
                    </Stack>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ display: "flex" }}>
                            <Typography className="card-header" style={{ marginLeft: "10px" }}>
                                {count}
                            </Typography>
                            {percentage && (
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    {!isLoss ? (
                                        <ArrowUpOutlined style={{ fontSize: '13px', color: color }} />
                                    ) : (
                                        <ArrowDownOutlined style={{ fontSize: '13px', color: color }} />
                                    )}
                                    <Typography className="card-subline">
                                        {invoice}
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
                        <MultiSegmentLinearWithLabel
                            processedWidth={processedPercentage}
                            inProgressWidth={inProgressPercentage}
                            needAttentionWidth={needAttentionPercentage}
                            processedWithoutPercentage = {processedWithoutPercentage}
                            inProgressWithoutPercentage = {inProgressWithoutPercentage}
                            needAttentionWithoutPercentage = {needAttentionWithoutPercentage}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}