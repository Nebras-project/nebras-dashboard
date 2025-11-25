/**
 * Units API Service
 *
 * Single Responsibility: Handle all API calls related to unit management
 */

// Import dummy data for fallback
import { dummyUnits } from '../data/dummyUnits';
import { dummySubjects } from '@features/subjects/data/dummySubjects';

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Helper function to handle API errors and fallback to dummy data
 * @param {Error} error - Error object
 * @param {Function} fallbackFn - Function to get fallback data
 * @returns {Promise} Fallback data or throws error
 */
const handleApiError = async (error, fallbackFn) => {
  // Always use fallback for development (when API is not available)
  // In production, you might want to be more selective
  const errorMessage = error?.message || '';
  const shouldUseFallback =
    errorMessage.includes('Network Error') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('ECONNREFUSED') ||
    errorMessage.includes('not found') ||
    errorMessage.includes('404') ||
    errorMessage.includes('Failed to fetch') ||
    !errorMessage ||
    !error?.response; // No response means network/connection issue

  if (shouldUseFallback) {
    return fallbackFn();
  }
  throw error;
};

/**
 * Fetch all units for a subject within a curriculum
 * @param {number|string} curriculumId - Curriculum ID (required)
 * @param {number|string} subjectId - Subject ID (required)
 * @param {Object} params - Additional query parameters
 * @returns {Promise} API response
 */
export const fetchUnits = async (curriculumId, subjectId, params = {}) => {
  try {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.UNITS(curriculumId, subjectId), {
      params,
    });
  } catch (error) {
    return handleApiError(error, () => {
      // Filter units by subjectId, and verify the subject belongs to the curriculum
      const subject = dummySubjects.find(
        (s) => s.id === Number(subjectId) && s.curriculumId === Number(curriculumId)
      );
      if (!subject) {
        return Promise.resolve([]);
      }
      return Promise.resolve(dummyUnits.filter((u) => u.subjectId === Number(subjectId)));
    });
  }
};

/**
 * Fetch a single unit by ID within a subject and curriculum
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @param {number|string} unitId - Unit ID
 * @returns {Promise} API response
 */
export const fetchUnitById = async (curriculumId, subjectId, unitId) => {
  try {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.UNIT(curriculumId, subjectId, unitId));
  } catch (error) {
    return handleApiError(error, () => {
      // Verify the subject belongs to the curriculum
      const subject = dummySubjects.find(
        (s) => s.id === Number(subjectId) && s.curriculumId === Number(curriculumId)
      );
      if (!subject) {
        throw new Error('Subject not found in this curriculum');
      }
      // Find the unit by ID and subjectId
      const unit = dummyUnits.find(
        (u) => u.id === Number(unitId) && u.subjectId === Number(subjectId)
      );
      if (unit) {
        return Promise.resolve(unit);
      }
      throw new Error('Unit not found');
    });
  }
};

/**
 * Fetch units by subject ID within a curriculum
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const fetchUnitsBySubjectId = async (curriculumId, subjectId) => {
  return fetchUnits(curriculumId, subjectId);
};

/**
 * Create a new unit within a subject and curriculum
 */
export const createUnit = async (curriculumId, subjectId, data = {}) => {
  try {
    return await apiClient.post(API_ENDPOINTS.CURRICULUMS.UNITS(curriculumId, subjectId), data);
  } catch (error) {
    return handleApiError(error, () => {
      const now = new Date().toISOString();
      const fallbackUnit = {
        id: Date.now(),
        subjectId: Number(subjectId),
        lessonsCount: data.lessonsCount ?? 0,
        order: data.order ?? 1,
        isActive: data.isActive ?? true,
        createdAt: now,
        updatedAt: now,
        ...data,
      };

      return Promise.resolve(fallbackUnit);
    });
  }
};

/**
 * Update an existing unit
 */
export const updateUnit = async (curriculumId, subjectId, unitId, data = {}) => {
  try {
    return await apiClient.put(
      API_ENDPOINTS.CURRICULUMS.UNIT(curriculumId, subjectId, unitId),
      data
    );
  } catch (error) {
    return handleApiError(error, () => {
      const existingUnit = dummyUnits.find(
        (unit) => unit.id === Number(unitId) && unit.subjectId === Number(subjectId)
      );

      if (!existingUnit) {
        throw new Error('Unit not found');
      }

      return Promise.resolve({
        ...existingUnit,
        ...data,
        updatedAt: new Date().toISOString(),
      });
    });
  }
};

/**
 * Delete a unit
 */
export const deleteUnit = async (curriculumId, subjectId, unitId) => {
  try {
    return await apiClient.delete(API_ENDPOINTS.CURRICULUMS.UNIT(curriculumId, subjectId, unitId));
  } catch (error) {
    return handleApiError(error, () => Promise.resolve({ success: true }));
  }
};
