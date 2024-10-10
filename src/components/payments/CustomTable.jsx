import React, { useMemo, useState } from 'react';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import ReusableTable from 'components/tableComponent/Table';


const CustomTable = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handlePlayClick = (videoUrl) => {
        setSelectedVideo(videoUrl); // Assuming video URL is from file_name or other field
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVideo(null);
    };

    const columns = useMemo(
        () => [
            {
                header: 'File Name',
                accessorKey: 'file_name',
                cell: ({ getValue }) => (
                    <Button style={{ color: 'black' }} onClick={() => alert(`File clicked: ${getValue()}`)}>
                        {getValue()}
                    </Button>
                ),
            },
            {
                header: 'Classification Type',
                accessorKey: 'classification_type',
            },
            {
                header: 'Batch Date',
                accessorKey: 'batch_date',
            },
            {
                header: 'Payor',
                accessorKey: 'payer',
            },
            {
                header: 'Payment Amount',
                accessorKey: 'payment_amount',
                cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
            },
            {
                header: 'Action',
                accessorKey: 'actions',
                cell: ({ getValue }) => (
                    <Button style={{ color: 'black' }} 
                    // onClick={() => handlePlayClick(row.original.file_name)}
                    onClick={() => setOpen(true)}
                    >
                        {getValue()}
                    </Button>
                ),
            }
        ],
        []
    );

    return (
        <div>
            <ReusableTable data={data} columns={columns} />
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <DialogContent>
                    <div>test</div>
                    {/* {selectedVideo ? (
                        <ReactPlayer url={selectedVideo} playing controls width="100%" height="100%" />
                    ) : (
                        'No video selected'
                    )} */}
                </DialogContent>
            </Dialog>
        </div>

    );


}

export default CustomTable