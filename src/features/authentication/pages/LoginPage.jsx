import { useMemo, memo } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Stack, useTheme, alpha } from '@mui/material';

// internal imports
import { useUser, useTranslation } from '@hooks';
import { Form, Icon } from '@components';
import { gap } from '@constants';
import { useLogin } from '../hooks/useLogin';
import LoginHeader from '../components/LoginHeader';

// Style getters
const getRootStyles = (theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: isLight ? theme.palette.grey[50] : theme.palette.background.default,
  };
};

const getFormWrapperStyles = (theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    width: '100%',
    maxWidth: '500px',
    '& .MuiPaper-root': {
      bgcolor: isLight
        ? alpha(theme.palette.background.paper, 0.95)
        : alpha(theme.palette.background.paper, 0.9),
      backdropFilter: 'blur(20px)',
      boxShadow: isLight
        ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
        : '0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
      border: isLight
        ? `1px solid ${alpha(theme.palette.divider, 0.2)}`
        : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    },
  };
};

const getSubmitButtonStyles = (theme) => ({
  boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
});

/**
 * LoginPage Component
 * Single Responsibility: Render login page UI and coordinate child components
 */
const LoginPage = memo(function LoginPage() {
  const theme = useTheme();
  const { isAuthenticated } = useUser();
  const { t } = useTranslation();
  const { handleLogin } = useLogin();

  // Memoized styles
  const rootStyles = useMemo(() => getRootStyles(theme), [theme]);
  const formWrapperStyles = useMemo(() => getFormWrapperStyles(theme), [theme]);
  const submitButtonStyles = useMemo(() => getSubmitButtonStyles(theme), [theme]);

  // Early return for authenticated users
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box sx={rootStyles}>
      {/* Floating Login Form Card */}
      <Box sx={formWrapperStyles}>
        <Form mode="page" onSubmit={handleLogin}>
          <Form.Content>
            <LoginHeader />
            <Stack {...gap.sm}>
              <Form.EmailInput name="email" autoFocus fullWidth />
              <Form.PasswordInput name="password" fullWidth />
            </Stack>
          </Form.Content>

          <Form.Actions>
            <Form.SubmitButton
              fullWidth
              size="medium"
              variant="contained"
              startIcon={<Icon name="login" />}
              sx={submitButtonStyles}
            >
              {t('auth.loginButton')}
            </Form.SubmitButton>
          </Form.Actions>
        </Form>
      </Box>
    </Box>
  );
});

export default LoginPage;
