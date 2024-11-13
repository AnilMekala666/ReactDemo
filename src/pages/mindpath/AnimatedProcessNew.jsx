import { Box } from '@mui/system';
import react from 'react';
import "./AnimatedProcessNew.css";
import { Check } from '@mui/icons-material';

const AnimatedProcessNew = ({currentStep, countFiles, type}) => {
    if(currentStep == null) {
        return <></>;
    }
    return (
        <Box sx={{ ml: 'auto', mr: 'auto', width: "100%", display: "flex", flexDirection: 'row', mt: 5, }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} className={["step", currentStep > 1.2 ? "step-complete" : currentStep.startsWith("1") ? "step-active" : ""].join(" ")}>
                {/* <div>
                    <div className="circle">{currentStep > 1.2 ? <Check color='#000' sx={{ width: 10, height: 10 }} /> : "1"}</div>
                </div> */}
                <div>
                    <div className="main-title title">File Acquisition</div>
                    <div className="caption">
                        <div className={["sub-step", currentStep > 1.1 ? "step-complete" : currentStep == "1.1" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Verifying input in file location.
                                </div>
                            </div>
                        </div>
                        <div className={["sub-step", currentStep > 1.2 ? "step-complete" : currentStep == "1.2" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Validating the File Type.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} className={["step", currentStep > 2.3 ? "step-complete" : currentStep.startsWith("2") ? "step-active" : ""].join(" ")}>
                {/* <div>
                    <div className="circle">{currentStep > 2.3 ? <Check color='#000' sx={{ width: 10, height: 10 }} /> : "2"}</div>
                </div> */}
                <div>
                    <div className="main-title title">File Parsing and Validation</div>
                    <div className="caption">
                        <div className={["sub-step", currentStep > 2.1 ? "step-complete" : currentStep == "2.1" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Reading file
                                </div>
                            </div>
                        </div>
                        <div className={["sub-step", currentStep > 2.2 ? "step-complete" : currentStep == "2.2" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Validating Data
                                </div>
                            </div>
                        </div>
                        <div className={["sub-step", currentStep > 2.3 ? "step-complete" : currentStep == "2.3" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Transferring data to staging tables.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {type == "deposit" &&
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} className={["step", currentStep > 3.3 ? "step-complete" : currentStep.startsWith("3") ? "step-active" : ""].join(" ")}>
                    {/* <div>
                        <div className="circle">{currentStep > 3.3 ? <Check color='#000' sx={{ width: 10, height: 10 }} /> : "3"}</div>
                    </div> */}
                    <div>
                    <div className="main-title title">Applying Rules</div>
                        <div className="caption">
                            <div className={["sub-step", currentStep > 3.1 ? "step-complete" : currentStep == "3.1" ? "step-active" : ""].join(" ")}>
                                <div>
                                    <div className="title">
                                        Processing only transactions with BAI Code 115,142,165,168,175,295,475,631,699
                                    </div>
                                </div>
                            </div>
                            <div className={["sub-step", currentStep > 3.2 ? "step-complete" : currentStep == "3.2" ? "step-active" : ""].join(" ")}>
                                <div>
                                    <div className="title">
                                        Eliminating duplicate entries.
                                    </div>
                                </div>
                            </div>
                            <div className={["sub-step", currentStep > 3.3 ? "step-complete" : currentStep == "3.3" ? "step-active" : ""].join(" ")}>
                                <div>
                                    <div className="title">
                                        Excluding transactions that include Fees.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} className={["step", currentStep > 4.3 ? "step-complete" : currentStep.startsWith("4") ? "step-active" : ""].join(" ")}>
                {/* <div>
                    <div className="circle">{currentStep > 4.3 ? <Check color='#000' sx={{ width: 10, height: 10 }} /> : type == "deposit" ? "4" : "3"}</div>
                </div> */}
                <div>
                <div className="main-title title">Inserting Data</div>
                    <div className="caption">
                        <div className={["sub-step", currentStep > 4.1 ? "step-complete" : currentStep == "4.1" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Mapping data to Primary tables
                                </div>
                            </div>
                        </div>
                        <div className={["sub-step", currentStep > 4.2 ? "step-complete" : currentStep == "4.2" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Transforming Data
                                </div>
                            </div>
                        </div>
                        <div className={["sub-step", currentStep > 4.3 ? "step-complete" : currentStep == "4.3" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Updating Tables
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} className={["step", currentStep > 5.3 ? "step-complete" : currentStep.startsWith("5") ? "step-active" : ""].join(" ")}>
                {/* <div>
                    <div className="circle">{currentStep > 5.3 ? <Check color='#000' sx={{ width: 10, height: 10 }} /> : type == "deposit" ? "5" : "4"}</div>
                </div> */}
                <div>
                <div className="main-title title">Verifying Data</div>
                    <div className="caption">
                        <div className={["sub-step", currentStep > 5.1 ? "step-complete" : currentStep == "5.1" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Count of Raw File Data: {countFiles.length > 0 && countFiles[0]}
                                </div>
                            </div>
                        </div>
                        {type == "deposit" &&
                            <>
                                <div className={["sub-step", currentStep > 5.2 ? "step-complete" : currentStep == "5.2" ? "step-active" : ""].join(" ")}>
                                    <div>
                                        <div className="title">
                                            Count of Data After Applying Rules: {countFiles.length > 1 && countFiles[1]}
                                        </div>
                                    </div>
                                </div>
                                <div className={["sub-step", currentStep > 5.3 ? "step-complete" : currentStep == "5.3" ? "step-active" : ""].join(" ")}>
                                    <div>
                                        <div className="title">
                                            Amount of Transactions Recorded: {countFiles.length > 2 && countFiles[2]}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <div className={["sub-step", currentStep > 5.4 ? "step-complete" : currentStep == "5.4" ? "step-active" : ""].join(" ")}>
                            <div>
                                <div className="title">
                                    Count of Data Updated in the Database: {type == "deposit" ? countFiles.length > 3 && countFiles[3] : countFiles.length > 1 && countFiles[1]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default AnimatedProcessNew