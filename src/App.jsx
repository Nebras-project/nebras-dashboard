import { Box, Container, Typography, Button, Card, CardContent, Switch, FormControlLabel, Stack, Chip } from '@mui/material';
import { useLanguage, useReduxTheme } from './hooks';
import ReactQueryDemo from './components/ReactQueryDemo';

function App() {
const {mode,toggleTheme} = useReduxTheme();
const {currentLanguage,toggleLanguage, isRTL} = useLanguage();

  return (
    <Container maxWidth="desktop" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h2" gutterBottom color="primary">
            Nebras Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Educational Management System - Theme Demo
          </Typography>
        </Box>

        {/* Theme Controls */}
        <Card sx={{ bgcolor: 'background.paper'}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Theme Controls
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={mode === 'dark'} 
                    onChange={() => toggleTheme()}
                  />
                }
                label={`${mode === 'dark' ? 'Dark' : 'Light'} Mode`}
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={isRTL} 
                    onChange={() => toggleLanguage()}
                  />
                }
                label={`${currentLanguage === 'ar' ? 'Arabic (RTL)' : 'English (LTR)'}`}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Color Showcase */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Color Palette
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
              <Button variant="contained" color="primary">
                Primary (#006239)
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" color="success">
                Success
              </Button>
              <Button variant="contained" color="error">
                Error
              </Button>
              <Button variant="contained" color="warning">
                Warning
              </Button>
              <Button variant="contained" color="info">
                Info
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Background Surfaces */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Background & Surfaces
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                <Typography>background.default: {mode === 'dark' ? '#121212' : '#f5f5f5'}</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                <Typography>background.paper: {mode === 'dark' ? '#171717' : '#ffffff'}</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.primary', borderRadius: 1 }}>
                <Typography>background.primary (Primary tinted)</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.surface.level1', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                <Typography>surface.level1: {mode === 'dark' ? '#171717' : '#ffffff'}</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.surface.level2', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                <Typography>surface.level2: {mode === 'dark' ? '#2c2c2c' : '#fafafa'}</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'background.surface.level3', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                <Typography>surface.level3: {mode === 'dark' ? '#383838' : '#f5f5f5'}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Typography Showcase */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Typography System
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="body1">Body 1 - Regular text for paragraphs</Typography>
              <Typography variant="body2">Body 2 - Smaller text for secondary content</Typography>
              <Typography variant="caption">Caption - Very small text</Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Components Showcase */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Components
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>Chips:</Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label="Default" />
                  <Chip label="Primary" color="primary" />
                  <Chip label="Secondary" color="secondary" />
                  <Chip label="Success" color="success" />
                  <Chip label="Error" color="error" />
                </Stack>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>Buttons:</Typography>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained">Contained</Button>
                  <Button variant="outlined">Outlined</Button>
                  <Button variant="text">Text</Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* React Query Demo */}
        <ReactQueryDemo />

        {/* Feature Summary */}
        <Card sx={{ bgcolor: 'background.primary' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              ✨ Phase 1 Features Completed
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography>✅ Primary Color: #006239 (Nebras Green)</Typography>
              <Typography>✅ Dark Background: #121212</Typography>
              <Typography>✅ Dark Surface: #171717</Typography>
              <Typography>✅ Light/Dark Mode Toggle</Typography>
              <Typography>✅ RTL Support for Arabic</Typography>
              <Typography>✅ Named Breakpoints (mobile, tablet, desktop, widescreen)</Typography>
              <Typography>✅ Custom Spacing Scale (xs to xxxl)</Typography>
              <Typography>✅ Surface Elevation Levels (level1-3)</Typography>
              <Typography>✅ No Hardcoded Values</Typography>
              <Typography>✅ Arabic Font Support (Cairo, Tajawal, Almarai)</Typography>
              <Typography>✅ React Query Setup with Devtools</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default App;
