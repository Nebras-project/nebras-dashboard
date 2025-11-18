// internal imports
import { EntityErrorState } from '@components';

/**
 * StudentErrorState Component
 *
 * Single Responsibility: Student-specific wrapper for EntityErrorState
 */
function StudentErrorState() {
  return <EntityErrorState entityName="students" />;
}

export default StudentErrorState;
