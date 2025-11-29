import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_PATHS } from '@config';
import { useDeleteCompetition, useUpdateCompetitionStatus } from './index';
import { useClickableArea } from '@hooks';

/**
 * Custom hook for managing CompetitionCard logic
 * @param {Object} competition - The competition object
 * @returns {Object} Handlers and state for the competition card
 */
function useCompetitionCard(competition) {
  
  const { id: competitionId } = competition;

  const navigate = useNavigate();
  const { deleteCompetition } = useDeleteCompetition();
  const { updateStatus } = useUpdateCompetitionStatus();
  const [formOpen, setFormOpen] = useState(false);

  const handleView = useCallback(() => {
    navigate(NAVIGATION_PATHS.COMPETITIONS.BY_ID(competitionId));
  }, [navigate, competitionId]);

  const handleViewParticipants = useCallback(() => {
    navigate(NAVIGATION_PATHS.COMPETITIONS.MEMBERS(competitionId));
  }, [navigate, competitionId]);

  const handleEdit = useCallback(() => {
    setFormOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    deleteCompetition(competition);
  }, [deleteCompetition, competition]);

  const handleStatusChange = useCallback(
    (newStatus) => {
      updateStatus(competition, newStatus);
    },
    [updateStatus, competition]
  );

  const handleFormClose = useCallback(() => {
    setFormOpen(false);
  }, []);

  const handleCardClick = useClickableArea(handleView);

  return {
    formOpen,
    handleView,
    handleViewParticipants,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleFormClose,
    handleCardClick,
  };
}

export default useCompetitionCard;
