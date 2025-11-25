/**
 * Lessons API Service
 *
 * Single Responsibility: Handle all API calls related to lesson management
 */

// internal imports
import apiClient, { API_ENDPOINTS } from '@config/axios';
import { dummyLessons } from '../data/dummyLessons';

const handleApiError = async (error, fallbackFn) => {
  const errorMessage = error?.message || '';
  const shouldUseFallback =
    errorMessage.includes('Network Error') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('ECONNREFUSED') ||
    errorMessage.includes('not found') ||
    errorMessage.includes('404') ||
    errorMessage.includes('Failed to fetch') ||
    !errorMessage ||
    !error?.response;

  if (shouldUseFallback) {
    return fallbackFn();
  }

  throw error;
};

export const fetchLessons = async (curriculumId, subjectId, unitId, params = {}) => {
  try {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.LESSONS(curriculumId, subjectId, unitId), {
      params,
    });
  } catch (error) {
    return handleApiError(error, () =>
      Promise.resolve(
        dummyLessons.filter(
          (lesson) =>
            lesson.curriculumId === Number(curriculumId) &&
            lesson.subjectId === Number(subjectId) &&
            lesson.unitId === Number(unitId)
        )
      )
    );
  }
};

export const fetchLessonById = async (curriculumId, subjectId, unitId, lessonId) => {
  try {
    return await apiClient.get(
      API_ENDPOINTS.CURRICULUMS.LESSON(curriculumId, subjectId, unitId, lessonId)
    );
  } catch (error) {
    return handleApiError(error, () => {
      const lesson = dummyLessons.find(
        (item) =>
          item.id === Number(lessonId) &&
          item.unitId === Number(unitId) &&
          item.subjectId === Number(subjectId) &&
          item.curriculumId === Number(curriculumId)
      );

      if (lesson) {
        return Promise.resolve(lesson);
      }

      throw new Error('Lesson not found');
    });
  }
};

/**
 * Create a new lesson within a unit, subject and curriculum
 */
export const createLesson = async (curriculumId, subjectId, unitId, data = {}) => {
  try {
    return await apiClient.post(
      API_ENDPOINTS.CURRICULUMS.LESSONS(curriculumId, subjectId, unitId),
      data
    );
  } catch (error) {
    return handleApiError(error, () => {
      const now = new Date().toISOString();
      const fallbackLesson = {
        id: Date.now(),
        unitId: Number(unitId),
        subjectId: Number(subjectId),
        curriculumId: Number(curriculumId),
        order: data.order ?? 1,
        isActive: data.isActive ?? true,
        createdAt: now,
        updatedAt: now,
        ...data,
      };

      return Promise.resolve(fallbackLesson);
    });
  }
};

/**
 * Update an existing lesson
 */
export const updateLesson = async (curriculumId, subjectId, unitId, lessonId, data = {}) => {
  try {
    return await apiClient.put(
      API_ENDPOINTS.CURRICULUMS.LESSON(curriculumId, subjectId, unitId, lessonId),
      data
    );
  } catch (error) {
    return handleApiError(error, () => {
      const existingLesson = dummyLessons.find(
        (lesson) =>
          lesson.id === Number(lessonId) &&
          lesson.unitId === Number(unitId) &&
          lesson.subjectId === Number(subjectId) &&
          lesson.curriculumId === Number(curriculumId)
      );

      if (!existingLesson) {
        throw new Error('Lesson not found');
      }

      return Promise.resolve({
        ...existingLesson,
        ...data,
        updatedAt: new Date().toISOString(),
      });
    });
  }
};

/**
 * Delete a lesson
 */
export const deleteLesson = async (curriculumId, subjectId, unitId, lessonId) => {
  try {
    return await apiClient.delete(
      API_ENDPOINTS.CURRICULUMS.LESSON(curriculumId, subjectId, unitId, lessonId)
    );
  } catch (error) {
    return handleApiError(error, () => Promise.resolve({ success: true }));
  }
};
