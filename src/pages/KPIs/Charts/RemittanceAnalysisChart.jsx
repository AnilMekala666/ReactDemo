import React from "react";
import ReactApexChart from "react-apexcharts";

const GroupedBarChart = ({ data }) => {
    // Helper to format large numbers (K/M)
    const formatAmount = (value) => {
        if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
        if (value >= 1e3) return (value / 1e3).toFixed(2) + "K";
        return value.toFixed(2);
    };

    // Sort data by remittance amount and get the top 10
    const sortedData = data.sort((a, b) => b.totalRemittanceAmount - a.totalRemittanceAmount);
    const top10Data = sortedData.slice(0, 10);

    // Prepare chart data
    const categories = top10Data.map((item) => item.payer); // Full payer names for hover tooltip
    const totalRemittanceAmounts = top10Data.map((item) => parseFloat(item.totalRemittanceAmount.toFixed(2)));
    const processingTimes = top10Data.map((item) => Math.round(item.avgProcessingTime / 24)); // Convert hours to days

    // Chart options
    const options = {
        chart: {
            type: "bar",
            height: 400,
            toolbar: { show: true }
        },
        xaxis: {
            categories: categories.map((payer) =>
                payer.length > 15 ? `${payer.slice(0, 12)}...` : payer
            ), // Truncated names for X-axis
            labels: {
                rotate: -45,
                style: {
                    fontSize: "12px"
                },
                tooltip: { enabled: true } // Enable tooltip for truncated names
            },
            tooltip: {
                enabled: true
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                const payerName = categories[dataPointIndex]; // Get full payer name
                const remittanceAmount = series[0][dataPointIndex];
                const processingTime = series[1][dataPointIndex];
                return `
                    <div style="padding: 8px; font-size: 12px;">
                        <strong>Payer:</strong> ${payerName}<br/>
                        <strong>Total Remittance Amount:</strong> ${formatAmount(remittanceAmount)}<br/>
                        <strong>Processing Time:</strong> ${processingTime} days
                    </div>`;
            }
        },
        yaxis: [
            {
                title: { text: "Total Remittance Amount" },
                labels: {
                    formatter: (value) => formatAmount(value), // Format as K/M
                    style: { fontSize: "12px" }
                },
                min: 0,
                max: Math.max(...totalRemittanceAmounts),
                tickAmount: 10
            },
            {
                opposite: true,
                title: { text: "Processing Time (Days)" },
                labels: {
                    formatter: (value) => `${value}`, // No decimals for days
                    style: { fontSize: "12px" }
                },
                min: 0,
                max: Math.max(...processingTimes),
                tickAmount: 10
            }
        ],
        legend: {
            position: "top",
            horizontalAlign: "center"
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded"
            }
        },
        dataLabels: {
            enabled: false
        }
    };

    const series = [
        {
            name: "Total Remittance Amount",
            data: totalRemittanceAmounts
        },
        {
            name: "Processing Time (Days)",
            data: processingTimes
        }
    ];

    return (
        <div>
            <h3>Top 10 Payers by Total Remittance Amount</h3>
            <div style={{ overflowX: top10Data.length > 10 ? "scroll" : "hidden" }}>
                <ReactApexChart options={options} series={series} type="bar" height={400} />
            </div>
        </div>
    );
};

export default GroupedBarChart;