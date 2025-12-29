// internal imports
import { EntityErrorState } from '@components';

/**
 * GradeErrorState Component
 *
 * Single Responsibility: grade-specific wrapper for EntityErrorState
 */
function GradeErrorState() {
  return <EntityErrorState entityName="grades" />;
}

export default GradeErrorState;