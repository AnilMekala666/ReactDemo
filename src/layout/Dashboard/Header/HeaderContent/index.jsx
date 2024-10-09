import { useMemo } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Message from './Message';
import Profile from './Profile';
import Localization from './Localization';
import Notification from './Notification';
import FullScreen from './FullScreen';
import Customization from './Customization';
import MobileSection from './MobileSection';
import MegaMenuSection from './MegaMenuSection';

import useConfig from 'hooks/useConfig';
import { MenuOrientation } from 'config';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';

import iconImg from 'assets/images/ican_img.png';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const localization = useMemo(() => <Localization />, []);

  const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      
        {!downLG && <Search />}
        {/* {!downLG && megaMenu} */}
        {/* {!downLG && localization} */}
        {/* {downLG && <Box sx={{ width: '100%', ml: 1 }} />} */}

        {/* <Notification /> */}
        {/* <Message /> */}
        {/* {!downLG && <FullScreen />} */}
    
      
      <Box class='head-right'>
        <img src={iconImg} alt='Icon' />
        <Customization />
        {!downLG && <Profile />}
        {downLG && <MobileSection />}
      </Box>
        
     
        
      
      
     
    </>
  );
}
