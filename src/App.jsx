import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { memo } from 'react';
import { MainLayout } from '@layout';
import { routes } from '@config';
import { LanguageSync, ErrorBoundary, ToastContainer, Loader } from '@components';
import { AuthInit } from '@features/authentication';
import { Suspense } from 'react';

const AppRoutes = memo(function AppRoutes() {
  return (
    <Suspense fallback={<Loader variant="page" />}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
});

const AppContent = memo(function AppContent() {
  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <ToastContainer />
    </>
  );
});

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthInit />
        <LanguageSync />
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
