import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {MainLayout} from '@layout';
import {routes} from '@config';
import {LanguageSync} from '@components';

/**
 * Main App Component
 * Sets up routing and layout structure
 */
function App() {
  return (
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
  );
}

export default App;
