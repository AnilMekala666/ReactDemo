import React, { useState, useMemo } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import SvgIcon from '@mui/material/SvgIcon';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import CustomTable from 'components/payments/CustomTable';
import DenseTable from 'pages/tables/mui-table/dense';
import PaginationTable from 'pages/tables/react-table/pagination';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

// third-party
import { useSpring, animated } from 'react-spring';

// project import
import MainCard from 'components/MainCard';


function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
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

const cashPosting = () => {
    const navigate = useNavigate();
    const [value] = useState('AZ');
    const [expandedItem, setExpandedItem] = useState('1');
    const handleToggle = (itemId) => {
        setExpandedItem(itemId);
    };


    const depositData = [
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ',
            actions: 'Play'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ',
            actions: 'Play'
        },
        {
            file_name: 'Transaction_003.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-10-03',
            payer: 'John Doe',
            payment_amount: 120.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_006.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-29',
            payer: 'Jane Smith',
            payment_amount: 250.50,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_007.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-25',
            payer: 'GHI Medical',
            payment_amount: 1750.20,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_003.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-10-03',
            payer: 'John Doe',
            payment_amount: 120.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_006.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-29',
            payer: 'Jane Smith',
            payment_amount: 250.50,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_007.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-25',
            payer: 'GHI Medical',
            payment_amount: 1750.20,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_003.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-10-03',
            payer: 'John Doe',
            payment_amount: 120.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_006.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-29',
            payer: 'Jane Smith',
            payment_amount: 250.50,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_007.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-25',
            payer: 'GHI Medical',
            payment_amount: 1750.20,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        }
    ];

    const patientData = [
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ',
            actions: 'Play1'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ',
            actions: 'Play1'
        },
        {
            file_name: 'Transaction_003.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-10-03',
            payer: 'John Doe',
            payment_amount: 120.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_006.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-29',
            payer: 'Jane Smith',
            payment_amount: 250.50,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_007.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-25',
            payer: 'GHI Medical',
            payment_amount: 1750.20,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_003.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-10-03',
            payer: 'John Doe',
            payment_amount: 120.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_006.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-29',
            payer: 'Jane Smith',
            payment_amount: 250.50,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_007.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-25',
            payer: 'GHI Medical',
            payment_amount: 1750.20,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_003.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-10-03',
            payer: 'John Doe',
            payment_amount: 120.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_006.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-29',
            payer: 'Jane Smith',
            payment_amount: 250.50,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_007.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-25',
            payer: 'GHI Medical',
            payment_amount: 1750.20,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        }
    ];
    const paymentData = [
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ',
            actions: 'Play2'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ',
            actions: 'Play2'
        },

        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_006.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-29',
            payer: 'Jane Smith',
            payment_amount: 250.50,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_007.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-25',
            payer: 'GHI Medical',
            payment_amount: 1750.20,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ'
        },

        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },

        {
            file_name: 'Transaction_008.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-01',
            payer: 'LMN Health Plan',
            payment_amount: 600.90,
            state_name: 'CA'
        },
        {
            file_name: 'Transaction_009.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-09-26',
            payer: 'Mark Johnson',
            payment_amount: 300.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_010.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-28',
            payer: 'OPQ Healthcare',
            payment_amount: 1800.75,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_001.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-10-01',
            payer: 'ABC Health',
            payment_amount: 1500.50,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_002.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-09-28',
            payer: 'XYZ Insurance',
            payment_amount: 800.75,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_003.pdf',
            classification_type: 'Patient Payment',
            batch_date: '2024-10-03',
            payer: 'John Doe',
            payment_amount: 120.00,
            state_name: 'AZ'
        },
        {
            file_name: 'Transaction_004.pdf',
            classification_type: 'Deposit',
            batch_date: '2024-09-30',
            payer: 'DEF Healthcare',
            payment_amount: 2000.00,
            state_name: 'TX'
        },
        {
            file_name: 'Transaction_005.pdf',
            classification_type: 'Remittance',
            batch_date: '2024-10-02',
            payer: 'MNO Insurance',
            payment_amount: 500.00,
            state_name: 'CA'
        },


    ];
    const filteredDepositData = useMemo(() => depositData.filter((item) => item.state_name === value), [depositData, value]);
    const filteredPatientData = useMemo(() => patientData.filter((item) => item.state_name === value), [patientData, value]);
    const filteredPaymenttData = useMemo(() => paymentData.filter((item) => item.state_name === value), [paymentData, value]);

    const handleClickbackBtn = () => {
        navigate('/patient/payment')
    }

    return (
        <div>
            <Button onClick={handleClickbackBtn}>Back</Button>
            <div >
                <SimpleTreeView
                    aria-label="customized"
                    defaultExpandedItems={['1']}
                    slots={{ collapseIcon: MinusSquare, expandIcon: PlusSquare, endIcon: CloseSquare }}
                    onNodeSelect={(event, nodeId) => handleToggle(nodeId)}
                // sx={{ height: 320, flexGrow: 1, overflowY: 'auto' }}
                >
                    <StyledTreeItem itemId="1" label="Deposit Posting Queue">

                        {/* Render the table only if the first tree item is expanded */}
                        {expandedItem === '1' && (
                            <CustomTable data={filteredDepositData} />
                        )}
                    </StyledTreeItem>
                </SimpleTreeView>
                <SimpleTreeView
                    aria-label="customized"
                    defaultExpandedItems={['2']}
                    slots={{ collapseIcon: MinusSquare, expandIcon: PlusSquare, endIcon: CloseSquare }}
                    onNodeSelect={(event, nodeId) => handleToggle(nodeId)}
                // sx={{ height: 320, flexGrow: 1, overflowY: 'auto' }}
                >
                    <StyledTreeItem itemId="1" label="Patient Posting Queue.">
                        {expandedItem === '1' && (
                            <CustomTable data={filteredPatientData} />
                        )}
                    </StyledTreeItem>
                </SimpleTreeView>

                <SimpleTreeView
                    aria-label="customized"
                    defaultExpandedItems={['3']}
                    slots={{ collapseIcon: MinusSquare, expandIcon: PlusSquare, endIcon: CloseSquare }}
                    onNodeSelect={(event, nodeId) => handleToggle(nodeId)}
                // sx={{ height: 320, flexGrow: 1, overflowY: 'auto' }}
                >
                    <StyledTreeItem itemId="1" label="Zero Payments Posting Queue">
                        {expandedItem === '1' && (
                            <CustomTable data={filteredPaymenttData} />
                        )}
                    </StyledTreeItem>
                </SimpleTreeView>
            </div>
        </div>
    );
}

export default cashPosting