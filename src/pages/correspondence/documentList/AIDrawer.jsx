import React, { useState, useEffect } from 'react';
import { Drawer, Box, Typography, TextField, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';

import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';

const AIDrawer = ({ isDrawerOpen, toggleDrawer, onSetAIEobTableData, setIsDrawerOpen, docName, handleSetAIMedicalRequestTableData }) => {

    console.log('docname', docName)

    const [eobprompt, setEobPrompt] = useState('');
    const [medicalRequestPrompt, setMedicalRequestPrompt] = useState('')
    const [loading, setLoading] = useState(false);
    const [AIEobTableData, setAIEobTableData] = useState([])
    const eobSuggestions = [
        "Find EOBs from named_ with status_",
        "Show documents with cheque number_ and amount greater than_",
        "Search EOBs for files older than_days with status_",
        "Find all records with cheque amount between_ and__",
    ];
    const MedicalRequestSuggestions = [
        "Find MedicalRequests from named_ with status_",
        "Show documents with cheque number_ and amount greater than_",
        "Search MedicalRequests for files older than_days with status_",
        "Find all records with cheque amount between_ and__",
    ];





    const handleSubmit = async (e) => {
        console.log("submit")
        e.preventDefault();
        setLoading(true)
        try {
            const prompt = docName === 'EOB' ? eobprompt : '';
            const response = await axios.post(CORRESPONDENCE_ENDPOINTS.GET_EOB_DETAILS_WITH_AI, {
                userPrompt: prompt
            })

            console.log("AI payload", prompt)
            console.log("AI prompt response", response)
            let processedData = response.data.map((item, index) => {
                const { check_amount, check_number, deposit_date, document_age,
                    letter_name, payer_name, status_name } = item;
                const shortDocumentName = letter_name ? letter_name.split('_').pop() : '-';

                return {
                    id: `row-${index}`,
                    documentName: letter_name ? shortDocumentName : '-',
                    payerName: payer_name ? payer_name : '-',
                    chequeNumber: check_number ? check_number : '-',
                    chequeAmount: check_amount ? check_amount : '-',
                    depositDate: deposit_date ? deposit_date : '-',
                    openSince: document_age ? document_age : '-',
                    status: status_name ? status_name : '-'
                };
            });
            setAIEobTableData(processedData);
            onSetAIEobTableData(processedData);
            setIsDrawerOpen(false)
            setEobPrompt('')

        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }

    }

    const handleMedicalRequesSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const prompt = docName === 'EOB' ? eobprompt : medicalRequestPrompt;
            const response = await axios.post(CORRESPONDENCE_ENDPOINTS.GET_MEDICAL_DETAILS_WITH_AI, {
                userPrompt: prompt
            })
            console.log(response)
            console.log("AI payload", prompt)
            console.log("AI prompt response", response)
            let processedData = response.data.map((item, index) => {
                const { check_amount, check_number, deposit_date, document_age,
                    letter_name, payer_name, status_name } = item;
                const shortDocumentName = letter_name ? letter_name.split('_').pop() : '-';

                return {
                    id: `row-${index}`,
                    documentName: letter_name ? shortDocumentName : '-',
                    payerName: payer_name ? payer_name : '-',
                    chequeNumber: check_number ? check_number : '-',
                    chequeAmount: check_amount ? check_amount : '-',
                    depositDate: deposit_date ? deposit_date : '-',
                    openSince: document_age ? document_age : '-',
                    status: status_name ? status_name : '-'
                };
            });

            handleSetAIMedicalRequestTableData(processedData);
            setIsDrawerOpen(false)
            setMedicalRequestPrompt('')
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    const handleSuggestionClick = (suggestion) => {
        if (docName == 'EOB') {
            setEobPrompt(suggestion);
        } else {
            setMedicalRequestPrompt(suggestion)
        }

    };

    const handlePromptChange = (e) => {
        if (docName == 'EOB') {
            setEobPrompt(e.target.value)
        } else {
            setMedicalRequestPrompt(e.target.value)
        }

    }


    return (
        <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => toggleDrawer(false)}
            sx={{
                '& .MuiDrawer-paper': {
                    top: '20px',
                    width: '400px',
                    right: '20px',
                    borderRadius: "10px"
                },
            }}
        >
            <Box p={2} role="presentation">
                <Typography variant="h4">Generative AI</Typography>
                <Grid sx={{ marginTop: "20px" }}>
                    <Grid item xs={12}>
                        <Typography variant='h6' sx={{ fontWeight: "600" }}>Write a prompt</Typography>

                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={10}
                            maxRows={10}
                            placeholder="Enter the prompt..."
                            sx={{ marginBottom: 2 }}
                            value={docName == 'EOB' ? eobprompt : medicalRequestPrompt}
                            // onChange={(e) => setEobPrompt(e.target.value)}
                            onChange={handlePromptChange}
                        />
                        {docName == 'EOB' ?
                            <Button
                                variant="contained"
                                color="primary"
                                // fullWidth
                                sx={{ marginTop: 2, float: "right" }}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Processing...' : 'Submit Prompt EOD'}

                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="primary"
                                // fullWidth
                                sx={{ marginTop: 2, float: "right" }}
                                onClick={handleMedicalRequesSubmit}
                            >
                                {loading ? 'Processing...' : 'Submit Prompt '}

                            </Button>

                        }

                    </Grid>
                </Grid>
                <Typography variant="h6" sx={{ fontWeight: "600", marginTop: "40px" }}>Suggestions</Typography>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                    {docName == 'EOB' ?
                        eobSuggestions?.map((suggestion, index) => (
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <Card sx={{ backgroundColor: '#f5f5f5', cursor: 'pointer' }}>
                                    <CardContent onClick={() => handleSuggestionClick(suggestion)}>
                                        <Typography variant="body1">{suggestion}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        :
                        MedicalRequestSuggestions?.map((suggestion, index) => (
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <Card sx={{ backgroundColor: '#f5f5f5', cursor: 'pointer' }}>
                                    <CardContent onClick={() => handleSuggestionClick(suggestion)}>
                                        <Typography variant="body1">{suggestion}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Drawer>

    );
}

export default AIDrawer