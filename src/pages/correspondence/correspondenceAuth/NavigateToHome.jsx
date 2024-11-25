import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


const NavigateToHome = () => {
  const token = useSelector((state)=>state.user.userAuthToken);
  return (
    <Button
      variant="contained"
      startIcon={<HomeIcon />}
      onClick={() =>
        (window.location.href =
          `http://10.0.1.109:8181/GlobalCommandCenter/users/gccDashboard?sessionId=${token}`)
      }
      sx={{ marginRight: '8px' }}
    >
      Home
    </Button>
  );
};

export default NavigateToHome;
