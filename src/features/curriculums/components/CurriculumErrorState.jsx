// internal imports
import { EntityErrorState } from '@components';

/**
 * CurriculumErrorState Component
 *
 * Single Responsibility: Curriculum-specific wrapper for EntityErrorState
 */
function CurriculumErrorState() {
  return <EntityErrorState entityName="curriculums" />;
}

export default CurriculumErrorState;
