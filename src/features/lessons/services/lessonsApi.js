/**
 * Lessons API Service
 *
 * Single Responsibility: Handle all API calls related to lesson management
 */

// internal imports
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all lessons for a unit within a subject and curriculum
 */
export const fetchLessons = async (gradeId, subjectId, unitId, params = {}) => {
  return await apiClient.get(API_ENDPOINTS.GRADES.LESSONS(gradeId, subjectId, unitId), {
    params,
  });
};

/**
 * Fetch a single lesson by ID
 */
export const fetchLessonById = async (gradeId, subjectId, unitId, lessonId) => {
  return await apiClient.get(
    API_ENDPOINTS.GRADES.LESSON(gradeId, subjectId, unitId, lessonId)
  );
};

/**
 * Create a new lesson within a unit, subject and curriculum
 */
export const createLesson = async (gradeId, subjectId, unitId, data = {}) => {
  return await apiClient.post(
    API_ENDPOINTS.GRADES.LESSONS(gradeId, subjectId, unitId),
    data
  );
};

/**
 * Update an existing lesson
 */
export const updateLesson = async (gradeId, subjectId, unitId, lessonId, data = {}) => {
  return await apiClient.put(
    API_ENDPOINTS.GRADES.LESSON(gradeId, subjectId, unitId, lessonId),
    data
  );
};

/**
 * Delete a lesson
 */
export const deleteLesson = async (gradeId, subjectId, unitId, lessonId) => {
  return await apiClient.delete(
    API_ENDPOINTS.GRADES.LESSON(gradeId, subjectId, unitId, lessonId)
  );
};
