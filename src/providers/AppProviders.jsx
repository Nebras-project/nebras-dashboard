import PropTypes from 'prop-types';
import ReduxProvider from './ReduxProvider';
import QueryProvider from './QueryProvider';
import ThemeProvider from './ThemeProvider';

function AppProviders({ children }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
