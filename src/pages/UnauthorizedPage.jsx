import ErrorPage from './ErrorPage';
import { ERROR_CODES } from '@constants';

function UnauthorizedPage() {
  return <ErrorPage errorCode={ERROR_CODES.UNAUTHORIZED} />;
}

export default UnauthorizedPage;
