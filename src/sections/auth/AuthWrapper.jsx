import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

// project import
import AuthFooter from 'components/cards/AuthFooter';
import Logo from 'components/logo';
import AuthCard from './AuthCard';
import LoginProvider from './LoginProvider';

import useAuth from 'hooks/useAuth';

// assets
import AuthBackground from './AuthBackground';
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  const { isLoggedIn } = useAuth();

  const [searchParams] = useSearchParams();
  const authParam = searchParams.get('auth') || '';

  let documentationLink = 'https://codedthemes.gitbook.io/mantis/authentication';

  switch (authParam) {
    case 'auth0':
      documentationLink = 'https://codedthemes.gitbook.io/mantis/authentication/switch-to-auth0';
      break;
    case 'firebase':
      documentationLink = 'https://codedthemes.gitbook.io/mantis/authentication/switch-to-firebase';
      break;
    case 'aws':
      documentationLink = 'https://codedthemes.gitbook.io/mantis/authentication/switch-to-aws-cognito';
      break;
    case 'supabase':
      documentationLink = 'https://codedthemes.gitbook.io/mantis/authentication/switch-to-supabase';
      break;
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AuthBackground />
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid item>
              {!isLoggedIn && authParam && (
                <Box sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}>
                  <Alert variant="border" color="primary" icon={<ExclamationCircleOutlined />}>
                    <Typography variant="h5">View Only</Typography>
                    <Typography variant="h6">
                      This page is view-only. To make it fully functional, please read the documentation provided{' '}
                      <Link href={documentationLink} target="_blank">
                        here
                      </Link>{' '}
                      after purchasing the theme.
                    </Typography>
                  </Alert>
                </Box>
              )}
              <AuthCard>{children}</AuthCard>
              {!isLoggedIn && (
                <Box sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}>
                  <Grid item xs={12}>
                    <Divider sx={{ mb: 3 }}>
                      <Typography variant="caption"> Check other login views </Typography>
                    </Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <LoginProvider currentLoginWith={authParam} />
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
