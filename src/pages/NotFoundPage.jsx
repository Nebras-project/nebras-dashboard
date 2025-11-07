import ErrorPage from './ErrorPage';
import { ERROR_CODES } from '@constants';

function NotFoundPage() {
  return <ErrorPage errorCode={ERROR_CODES.NOT_FOUND} />;
}

export default NotFoundPage;
