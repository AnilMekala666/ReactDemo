import { useMemo, useState } from 'react';
import * as React from 'react';
// material-ui
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import ThemeLayout from './ThemeLayout';
import DefaultThemeMode from './ThemeMode';
import ColorScheme from './ColorScheme';
import ThemeWidth from './ThemeWidth';
import ThemeFont from './ThemeFont';
import ThemeMenuLayout from './ThemeMenuLayout';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import SimpleBar from 'components/third-party/SimpleBar';

import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import axios from 'axios';

// assets
import LayoutOutlined from '@ant-design/icons/LayoutOutlined';
import HighlightOutlined from '@ant-design/icons/HighlightOutlined';
import BorderInnerOutlined from '@ant-design/icons/BorderInnerOutlined';
import BgColorsOutlined from '@ant-design/icons/BgColorsOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import FontColorsOutlined from '@ant-design/icons/FontColorsOutlined';
import { Button } from '@mui/material';
import Fade from '@mui/material/Fade';

import Popper from '@mui/material/Popper';
import { useSpring, animated } from '@react-spring/web';

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

export default function Customization() {
  const { mode } = useConfig();

  const themeLayout = useMemo(() => <ThemeLayout />, []);
  const themeMenuLayout = useMemo(() => <ThemeMenuLayout />, []);
  const themeMode = useMemo(() => <DefaultThemeMode />, []);
  const themeColor = useMemo(() => <ColorScheme />, []);
  const themeWidth = useMemo(() => <ThemeWidth />, []);
  const themeFont = useMemo(() => <ThemeFont />, []);

  //const [open, setOpen] = useState(false);
  //const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleToggle = () => {
  //   setOpen(!open);
  // };
    const iconBackColorOpen = mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;


  const handleClearData = async () => {
    console.log("click")
    try {
      const response = await axios.get('https://ican-manage-chit-dem.cognitivehealthit.com/Correspondence/refresh');
      console.log(response)

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      
      // const data = await response.json();
      // console.log('Data cleared:', data);
      // Optionally, you could add a success message or UI feedback here

    } catch (error) {
      console.error('Failed to clear data:', error);
    }
  };

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          color="secondary"
          variant="light"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : 'transparent' }}
          // onClick={handleToggle}
          onClick={handleClick}
          aria-label="settings toggler"
        >
          <AnimateButton type="rotate">
            <SettingOutlined />
          </AnimateButton>
        </IconButton>

      {/* Popover */}
      <Popper id={id} open={open} anchorEl={anchorEl} transition
        sx={{zIndex:'9999',width: '10.5rem',textAlign:'center', boxShadow:'0px 1px 4px rgba(0, 0, 0, 0.08)' }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                background:'#fff',
                border:'1px solid #e6ebf1',
                borderRadius:'8px',
                padding:'30px 15px',
              }}
            >
             <Button variant="contained"
              sx={{ padding: '10px', width: '6.5rem', height: '2.5rem',borderRadius: '.5rem' }}
              onClick={handleClearData}
            >Clear Data
            </Button>
            </Box>
          </Fade>
        )}
      </Popper>

      </Box>
      {/* <Drawer
        sx={{ zIndex: 2001 }}
        anchor="right"
         onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 340
          }
        }}
      >
        {open && (
          <MainCard
            title="Theme Customization"
            sx={{
              border: 'none',
              borderRadius: 0,
              height: '100vh',
              '& .MuiCardHeader-root': { color: 'background.paper', bgcolor: 'primary.main', '& .MuiTypography-root': { fontSize: '1rem' } }
            }}
            content={false}
            secondary={
              <IconButton shape="rounded" size="small" onClick={handleToggle} sx={{ color: 'background.paper' }}>
                <CloseCircleOutlined style={{ fontSize: '1.15rem' }} />
              </IconButton>
            }
          >
            <SimpleBar sx={{ height: 'calc(100vh - 70px)', '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
              <Box
                sx={{
                  '& .MuiAccordion-root': {
                    borderColor: 'divider',
                    '& .MuiAccordionSummary-root': { bgcolor: 'transparent', flexDirection: 'row', pl: 1 },
                    '& .MuiAccordionDetails-root': { border: 'none' },
                    '& .Mui-expanded': { color: 'primary.main' }
                  }
                }}
              >
                <Accordion defaultExpanded sx={{ borderTop: 'none' }}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <LayoutOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="text.primary">
                          Theme Layout
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Choose your layout
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>{themeLayout}</AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <BorderInnerOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="text.primary">
                          Menu Orientation
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Choose Vertical or Horizontal Menu Orientation
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>{themeMenuLayout}</AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <HighlightOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="text.primary">
                          Theme Mode
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Choose light or dark mode
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>{themeMode}</AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <BgColorsOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="text.primary">
                          Color Scheme
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Choose your primary theme color
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>{themeColor}</AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <BorderInnerOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="text.primary">
                          Layout Width
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Choose fluid or container layout
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>{themeWidth}</AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded sx={{ borderBottom: 'none' }}>
                  <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <IconButton
                        disableRipple
                        color="primary"
                        sx={{ bgcolor: 'primary.lighter' }}
                        onClick={handleToggle}
                        aria-label="settings toggler"
                      >
                        <FontColorsOutlined />
                      </IconButton>
                      <Stack>
                        <Typography variant="subtitle1" color="text.primary">
                          Font Family
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Choose your font family.
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>{themeFont}</AccordionDetails>
                </Accordion>
              </Box>
            </SimpleBar>
          </MainCard>
        )}
      </Drawer> */}
    </>
  );
}