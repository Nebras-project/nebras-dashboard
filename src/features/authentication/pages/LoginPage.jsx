import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useUser, useTranslation } from '../../../hooks';
import { MdVisibility, MdVisibilityOff, MdLogin } from 'react-icons/md';

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useUser();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - In real app, this would call an API
    login({
      id: 1,
      name: 'Admin User',
      email: formData.email,
      role: 'curriculum_manager',
    });
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center">
          {/* Logo */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              Nebras Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {t('auth.loginSubtitle')}
            </Typography>
          </Box>

          {/* Login Card */}
          <Card sx={{ width: '100%', maxWidth: 400 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom textAlign="center">
                {t('auth.loginTitle')}
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label={t('common.email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    autoFocus
                  />

                  <TextField
                    fullWidth
                    label={t('auth.password')}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<MdLogin />}
                  >
                    {t('auth.loginButton')}
                  </Button>
                </Stack>
              </Box>

              {/* Demo credentials */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'background.surface.level2', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {t('auth.welcomeBack')}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default LoginPage;

