import { API_ENDPOINTS } from '../../../constants/apiEndpoints';
import {apiClient} from '@config';

export async function fetchOverviewStats() {
  return await apiClient.get(API_ENDPOINTS.OVERVIEW_STATS.BASE);
}
