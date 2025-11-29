import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_PATHS } from '@config';
import { useDeleteExam } from './useDeleteExam';

/**
 * Custom hook for managing ExamCard logic
 * @param {Object} exam - The exam object
 * @param {string|number} competitionId - The competition ID
 * @returns {Object} Handlers and state for the exam card
 */
function useExamCard(exam, competitionId) {
  const navigate = useNavigate();
  const { deleteExam } = useDeleteExam(competitionId);
  const [formOpen, setFormOpen] = useState(false);

  const handleViewResults = useCallback(() => {
    // Navigate to exam results page if route exists
    navigate(NAVIGATION_PATHS.COMPETITIONS.RESULT(competitionId));
  }, [navigate, competitionId]);

  const handleEdit = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    deleteExam(exam);
  }, [deleteExam, exam]);

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
  }, []);

  return {
    formOpen,
    handleViewResults,
    handleEdit,
    handleDelete,
    handleFormClose,
  };
}

export default useExamCard;
