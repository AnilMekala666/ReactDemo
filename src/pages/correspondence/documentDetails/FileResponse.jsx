import React from 'react'
import { Box } from '@mui/material'

export const FileResponse = ({mailContent,attachments}) => {
  console.log(mailContent,typeof(mailContent),attachments,"Lavanya");
  return (
    <Box sx={{ padding: 2 }}  dangerouslySetInnerHTML={{ __html: mailContent }}>

    </Box>
  )
}
