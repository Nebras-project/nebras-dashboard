import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@layout';
import { routes } from '@config';
import { LanguageSync, ErrorBoundary } from '@components';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageSync />
        <MainLayout>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
