import { lazy } from 'react';

// project import
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';
import { APP_AUTH, AuthProvider } from 'config';

// jwt auth
const JwtAuthLogin = Loadable(lazy(() => import('pages/auth/jwt/login')));
const JwtAuthRegister = Loadable(lazy(() => import('pages/auth/jwt/register')));
const JwtAuthForgotPassword = Loadable(lazy(() => import('pages/auth/jwt/forgot-password')));
const JwtAuthResetPassword = Loadable(lazy(() => import('pages/auth/jwt/reset-password')));
const JwtAuthCodeVerification = Loadable(lazy(() => import('pages/auth/jwt/code-verification')));
const JwtAuthCheckMail = Loadable(lazy(() => import('pages/auth/jwt/check-mail')));

// firebase auth
const FirebaseAuthLogin = Loadable(lazy(() => import('pages/auth/firebase/login')));
const FirebaseAuthRegister = Loadable(lazy(() => import('pages/auth/firebase/register')));
const FirebaseAuthForgotPassword = Loadable(lazy(() => import('pages/auth/firebase/forgot-password')));
const FirebaseAuthResetPassword = Loadable(lazy(() => import('pages/auth/firebase/reset-password')));
const FirebaseAuthCodeVerification = Loadable(lazy(() => import('pages/auth/firebase/code-verification')));
const FirebaseAuthCheckMail = Loadable(lazy(() => import('pages/auth/firebase/check-mail')));

// auth0 auth
const Auth0AuthLogin = Loadable(lazy(() => import('pages/auth/auth0/login')));
const Auth0AuthRegister = Loadable(lazy(() => import('pages/auth/auth0/register')));
const Auth0AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth0/forgot-password')));
const Auth0AuthResetPassword = Loadable(lazy(() => import('pages/auth/auth0/reset-password')));
const Auth0AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth0/code-verification')));
const Auth0AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth0/check-mail')));

// aws auth
const AwsAuthLogin = Loadable(lazy(() => import('pages/auth/aws/login')));
const AwsAuthRegister = Loadable(lazy(() => import('pages/auth/aws/register')));
const AwsAuthForgotPassword = Loadable(lazy(() => import('pages/auth/aws/forgot-password')));
const AwsAuthResetPassword = Loadable(lazy(() => import('pages/auth/aws/reset-password')));
const AwsAuthCodeVerification = Loadable(lazy(() => import('pages/auth/aws/code-verification')));
const AwsAuthCheckMail = Loadable(lazy(() => import('pages/auth/aws/check-mail')));

// supabase auth
const SupabaseAuthLogin = Loadable(lazy(() => import('pages/auth/supabase/login')));
const SupabaseAuthRegister = Loadable(lazy(() => import('pages/auth/supabase/register')));
const SupabaseAuthForgotPassword = Loadable(lazy(() => import('pages/auth/supabase/forgot-password')));
const SupabaseAuthResetPassword = Loadable(lazy(() => import('pages/auth/supabase/reset-password')));
const SupabaseAuthCodeVerification = Loadable(lazy(() => import('pages/auth/supabase/code-verification')));
const SupabaseAuthCheckMail = Loadable(lazy(() => import('pages/auth/supabase/check-mail')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: APP_AUTH === AuthProvider.JWT ? '/' : 'jwt',
          children: [
            { path: 'login', element: <JwtAuthLogin /> },
            { path: 'register', element: <JwtAuthRegister /> },
            { path: 'forgot-password', element: <JwtAuthForgotPassword /> },
            { path: 'check-mail', element: <JwtAuthCheckMail /> },
            { path: 'reset-password', element: <JwtAuthResetPassword /> },
            { path: 'code-verification', element: <JwtAuthCodeVerification /> }
          ]
        },
        {
          path: APP_AUTH === AuthProvider.FIREBASE ? '/' : 'firebase',
          children: [
            { path: 'login', element: <FirebaseAuthLogin /> },
            { path: 'register', element: <FirebaseAuthRegister /> },
            { path: 'forgot-password', element: <FirebaseAuthForgotPassword /> },
            { path: 'reset-password', element: <FirebaseAuthResetPassword /> },
            { path: 'code-verification', element: <FirebaseAuthCodeVerification /> },
            { path: 'check-mail', element: <FirebaseAuthCheckMail /> }
          ]
        },
        {
          path: APP_AUTH === AuthProvider.AUTH0 ? '/' : 'auth0',
          children: [
            { path: 'login', element: <Auth0AuthLogin /> },
            { path: 'register', element: <Auth0AuthRegister /> },
            { path: 'forgot-password', element: <Auth0AuthForgotPassword /> },
            { path: 'reset-password', element: <Auth0AuthResetPassword /> },
            { path: 'code-verification', element: <Auth0AuthCodeVerification /> },
            { path: 'check-mail', element: <Auth0AuthCheckMail /> }
          ]
        },
        {
          path: APP_AUTH === AuthProvider.AWS ? '/' : 'aws',
          children: [
            { path: 'login', element: <AwsAuthLogin /> },
            { path: 'register', element: <AwsAuthRegister /> },
            { path: 'forgot-password', element: <AwsAuthForgotPassword /> },
            { path: 'reset-password', element: <AwsAuthResetPassword /> },
            { path: 'code-verification', element: <AwsAuthCodeVerification /> },
            { path: 'check-mail', element: <AwsAuthCheckMail /> }
          ]
        },
        {
          path: APP_AUTH === AuthProvider.SUPABASE ? '/' : 'supabase',
          children: [
            { path: 'login', element: <SupabaseAuthLogin /> },
            { path: 'register', element: <SupabaseAuthRegister /> },
            { path: 'forgot-password', element: <SupabaseAuthForgotPassword /> },
            { path: 'reset-password', element: <SupabaseAuthResetPassword /> },
            { path: 'code-verification', element: <SupabaseAuthCodeVerification /> },
            { path: 'check-mail', element: <SupabaseAuthCheckMail /> }
          ]
        }
      ]
    }
  ]
};

export default LoginRoutes;
