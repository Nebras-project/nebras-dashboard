// internal imports
import { EntityErrorState } from '@components';

/**
 * AdminErrorState Component
 *
 * Single Responsibility: Admin-specific wrapper for EntityErrorState
 */
function AdminErrorState() {
  return <EntityErrorState entityName="admins" />;
}

export default AdminErrorState;
