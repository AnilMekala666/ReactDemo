import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import store from './store';


// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { SupabseProvider as AuthProvider } from 'contexts/SupabaseContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>
      <ThemeCustomization>
        <RTLLayout>
          <Locales>
            <ScrollTop>
              <MantineProvider>
                <AuthProvider>
                  <>
                    <Notistack>
                      <RouterProvider router={router} />
                      <Snackbar />
                    </Notistack>
                  </>
                </AuthProvider>
              </MantineProvider>
            </ScrollTop>
          </Locales>
        </RTLLayout>
      </ThemeCustomization>
    </Provider>
  );
}