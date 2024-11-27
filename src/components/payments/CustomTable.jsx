import React, { useMemo, useState } from 'react';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import ReusableTable from 'components/tableComponent/Table';
import { margin } from '@mui/system';


const CustomTable = ({ data, datacolumns }) => {

    // console.log(data, datacolumns)
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

    return (
        <div style={{marginTop:'10px'}} >
            {datacolumns && datacolumns.length > 0 ? 
            <ReusableTable data={data} columns={datacolumns} />
        :""}
            <Dialog open={open} onClose={handleClose} maxWidth="100px">
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