import React, { useState, useMemo, useEffect } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import SvgIcon from '@mui/material/SvgIcon';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import CustomTable from 'components/payments/CustomTable';
import DenseTable from 'pages/tables/mui-table/dense';
import PaginationTable from 'pages/tables/react-table/pagination';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import AnimateButton from 'components/@extended/AnimateButton';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Box, } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

// third-party
import { useSpring, animated } from 'react-spring';

// project import
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { currencyFormat } from 'components/mindpath';
import moment from 'moment';


const postingReport = new URL('src/assets/data/newData/posting_report.csv', import.meta.url).href;


function PlusSquare(props) {
    return (
        <PlusOutlined style={{ fontSize: '14px' }} {...props} />
    );
}

function MinusSquare(props) {
    return (
        <MinusOutlined style={{ fontSize: '14px' }} {...props} />
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

function TransitionComponent({ ...others }) {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)'
        },
        to: {
            opacity: others.in ? 1 : 0,
            transform: `translate3d(${others.in ? 0 : 20}px,0,0)`
        }
    });

    return (
        <animated.div style={style}>
            <Collapse {...others} />
        </animated.div>
    );
}

const StyledTreeItem = styled((props) => <TreeItem {...props} slots={{ groupTransition: TransitionComponent }} />)(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3
        }
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    }
}));

StyledTreeItem.displayName = 'StyledTreeItem';

const PostingReport = () => {
    const navigate = useNavigate();
    const [value] = useState('AZ');
    const [expandedItem, setExpandedItem] = useState(null);
    const [loading, setLoading] = useState(false)
    const [parsedData, setParsedData] = useState()
    const [tableColumns, setTableColumns] = useState([])
    const handleToggle = (itemId) => {
        console.log("id", itemId)
        setExpandedItem(itemId === expandedItem ? null : itemId);
    };

    useEffect(() => {
        init(postingReport)
    }, []);

    const handleClickbackBtn = () => {
        navigate('/patient/payment')
    }

    const init = async (url) => {
        setTableColumns([]);
        // Set the parsed data to the state or return it
        setParsedData([]);
        setExpandedItem(url);
        const file = await fetch(url).then(res => res.text());
        console.log(file)
        if (file) {
            setLoading(true);
            const text = file;
            setTimeout(() => {
                parseBaiFile(text);
                setLoading(false);
            }, 2000);
        }
      };

    function splitCSVButIgnoreCommasInDoublequotes(str) {
        //split the str first  
        //then merge the elments between two double quotes  
        var delimiter = ',';
        var quotes = '"';
        var elements = str.split(delimiter);
        var newElements = [];
        for (var i = 0; i < elements.length; ++i) {
            if (elements[i].indexOf(quotes) >= 0) {//the left double quotes is found  
                var indexOfRightQuotes = -1;
                var tmp = elements[i];
                //find the right double quotes  
                for (var j = i + 1; j < elements.length; ++j) {
                    if (elements[j].indexOf(quotes) >= 0) {
                        indexOfRightQuotes = j;
                        break;
                    }
                }
                //found the right double quotes  
                //merge all the elements between double quotes  
                if (-1 != indexOfRightQuotes) {
                    for (var j = i + 1; j <= indexOfRightQuotes; ++j) {
                        tmp = tmp + delimiter + elements[j];
                    }
                    newElements.push(tmp);
                    i = indexOfRightQuotes;
                }
                else { //right double quotes is not found  
                    newElements.push(elements[i]);
                }
            }
            else {//no left double quotes is found  
                newElements.push(elements[i]);
            }
        }

        return newElements;
    }

    const parseBaiFile = (content) => {
        const csvHeader = content.slice(0, content.indexOf("\n")).split(",");
        const csvRows = content.slice(content.indexOf("\n") + 1).split("\n");
        // console.log(csvHeader)
        const array = csvRows.map((i, x) => {
            const values = splitCSVButIgnoreCommasInDoublequotes(i);
            // console.log(x, values);
            // let object = {
            //   id: x
            // }
            const obj = csvHeader.reduce((object, header, index) => {
                if (object !== undefined) {
                    console.log(object)
                    // if (object["id"] == undefined) {
                    //     object["id"] = x + 1;
                    // }
                    delete object["batchnumber"];
                    if(header.toLowerCase().includes("amount")) {
                        if (values[index]) {
                            if(!Number.isNaN(parseFloat(values[index] || 0)))
                                object[header.replace(" ", "_").replace("\r", "").toLowerCase()] = currencyFormat(parseFloat(values[index] || 0));
                            else
                                object[header.replace(" ", "_").replace("\r", "").toLowerCase()] = values[index].replaceAll("\"", "");
                            return object;
                        }
                    }
                    else if(header.toLowerCase().includes("depositdate")) {
                        object[header.replace(" ", "_").replace("\r", "").toLowerCase()] = moment().format("MM/DD/YYYY");
                    }
                    else {
                        if (values[index]) {
                            object[header.replace(" ", "_").replace("\r", "").toLowerCase()] = values[index] || "";
                            return object;
                        }
                    }
                }
                return object;
            }, {});
            console.log("OBJ", obj)
            if(Object.keys(obj).length > 1) {
                return obj;
            }
            return null;
        }).filter((val) => val != undefined && Object.keys(val).length > 2);
        const headerKeys = Object.keys(Object.assign({}, ...array));
        let columns = [];
        columns = headerKeys.map((header, index) => {
            let o = {
                id: index + 1,
                header: header.replace("_", " ").replace("\r", "").toUpperCase(),
                accessorKey: header.replace("\r", "")
            }
            return o;
        })
        console.log("Columns", columns);
        setTableColumns(columns);
        console.log("Parsed Data: ", array);
        // Set the parsed data to the state or return it
        setParsedData(array);
    };

    return (
        <div>
            {/* <Button onClick={handleClickbackBtn}>Back</Button> */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <AnimateButton type="slide">
                    <Button
                        onClick={handleClickbackBtn}
                        variant="contained"
                        color="success"
                        component="label"
                        sx={{ borderRadius: '40px', marginBottom: '20px', marginTop: '20px' }}
                    >
                        <ArrowLeftOutlined style={{ fontSize: '16px', marginRight: '10px' }} />
                        Back
                    </Button>
                </AnimateButton>
            </Box>
            <div>
            <Accordion sx={{border: 0, bgcolor: 'transparent'}} expanded={expandedItem == postingReport} onChange={()=>init(postingReport)}>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ backgroundColor: '#efeffd', p: 0,m:0,minHeight:'40px', borderRadius: "10px", border: 0 }}
                >
                    Posting Report
                </AccordionSummary>
                <AccordionDetails>
                    {loading &&
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <CircularProgress /> {/* Spinner */}
                            <p>Processing...</p>
                        </div>
                    }
                    {!loading &&
                        <CustomTable data={parsedData} datacolumns={tableColumns} />
                    }
                </AccordionDetails>
            </Accordion>
            </div>
        </div>
    );
}

export default PostingReport