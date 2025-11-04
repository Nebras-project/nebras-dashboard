import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { memo } from 'react';
import { store } from '@store';

const ReduxProvider = memo(function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
});

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReduxProvider;
