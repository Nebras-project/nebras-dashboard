// internal imports
import { EntityErrorState } from '@components';

/**
 * ManagerErrorState Component
 *
 * Single Responsibility: Manager-specific wrapper for EntityErrorState
 */
function ManagerErrorState() {
  return <EntityErrorState entityName="managers" />;
}

export default ManagerErrorState;
