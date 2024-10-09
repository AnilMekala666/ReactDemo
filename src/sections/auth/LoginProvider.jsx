import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import { APP_AUTH, AuthProvider } from 'config';

// assets
import Jwt from 'assets/images/icons/jwt.svg';
import Firebase from 'assets/images/icons/firebase.svg';
import Auth0 from 'assets/images/icons/auth0.svg';
import Aws from 'assets/images/icons/aws.svg';
import Supabase from 'assets/images/icons/supabase.svg';

// ==============================|| SOCIAL BUTTON ||============================== //

export default function LoginProvider({ currentLoginWith }) {
  const theme = useTheme();
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const loginHandlers = {
    Jwt: () => navigate(APP_AUTH === AuthProvider.JWT ? '/login' : '/jwt/login?auth=jwt'),
    Firebase: () => navigate(APP_AUTH === AuthProvider.FIREBASE ? '/login' : '/firebase/login?auth=firebase'),
    Auth0: () => navigate(APP_AUTH === AuthProvider.AUTH0 ? '/login' : '/auth0/login?auth=auth0'),
    Aws: () => navigate(APP_AUTH === AuthProvider.AWS ? '/login' : '/aws/login?auth=aws'),
    Supabase: () => navigate(APP_AUTH === AuthProvider.SUPABASE ? '/login' : '/supabase/login?auth=supabase')
  };

  const buttonData = [
    { name: 'jwt', icon: Jwt, handler: loginHandlers.Jwt },
    { name: 'firebase', icon: Firebase, handler: loginHandlers.Firebase },
    { name: 'auth0', icon: Auth0, handler: loginHandlers.Auth0 },
    { name: 'aws', icon: Aws, handler: loginHandlers.Aws },
    { name: 'supabase', icon: Supabase, handler: loginHandlers.Supabase }
  ];

  const currentLoginExists = buttonData.some((button) => button.name === currentLoginWith);

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
      justifyContent={{ xs: 'space-around', sm: 'space-between' }}
      sx={{ '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } } }}
    >
      {buttonData
        .filter((button) => {
          if (currentLoginExists) {
            return button.name !== currentLoginWith;
          }
          return button.name !== APP_AUTH;
        })
        .map((button) => (
          <Tooltip title={button.name} key={button.name}>
            <Button
              sx={{
                borderColor: theme.palette.grey[300],
                color: theme.palette.grey[900],
                '&:hover': { borderColor: theme.palette.primary[400], backgroundColor: theme.palette.primary[100] }
              }}
              variant="outlined"
              color="secondary"
              fullWidth
              startIcon={<img src={button.icon} alt={button.name} />}
              onClick={button.handler}
            >
              {!downSM && button.name}
            </Button>
          </Tooltip>
        ))}
    </Stack>
  );
}

LoginProvider.propTypes = { currentLoginWith: PropTypes.string };
