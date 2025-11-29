// external imports
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

// internal imports
import { useLanguage } from '@hooks';
import { useCurriculum } from '@features/curriculums/hooks';
import { getCurriculumName } from '@features/curriculums/utils';
import { useSubjects } from '@features/subjects/hooks';
import { getSubjectOptions } from '@features/subjects/utils';
import { useCompetition } from '../../competition/hooks';

/**
 * useExamFormFields Hook
 *
 * Single Responsibility: Manage form fields logic for exam form
 * Handles fetching competition, curriculum, subjects, and setting form values
 */
export const useExamFormFields = () => {
  const { currentLanguage } = useLanguage();
  const { watch, setValue } = useFormContext();
  const { id } = useParams();
  const competitionId = id ? Number(id) : null;

  // Fetch competition to get curriculumId
  const { competition } = useCompetition({
    id: competitionId,
    enabled: !!competitionId,
  });

  // Get curriculumId from competition
  const competitionCurriculumId = competition?.curriculumId || competition?.curriculum?.id;

  // Watch current curriculumId in form
  const currentCurriculumId = watch('curriculumId');

  // Fetch single curriculum to get its name for display
  const { curriculum } = useCurriculum({
    id: competitionCurriculumId,
    enabled: !!competitionCurriculumId,
  });

  // Set curriculumId from competition when form is opened for add (not edit)
  useEffect(() => {
    if (competition && competitionCurriculumId && !currentCurriculumId) {
      setValue('curriculumId', competitionCurriculumId);
    }
  }, [competition, competitionCurriculumId, currentCurriculumId, setValue]);

  // Fetch subjects based on competition's curriculum
  const { subjects = [], isLoading: isLoadingSubjects } = useSubjects({
    curriculumId: competitionCurriculumId ? Number(competitionCurriculumId) : undefined,
    enabled: !!competitionCurriculumId,
  });

  // Get curriculum name for display
  const curriculumName = curriculum ? getCurriculumName(curriculum, currentLanguage) : '';

  // Build subject options for select
  const subjectOptions = getSubjectOptions(subjects, currentLanguage);

  return {
    curriculumName,
    subjectOptions,
    isLoadingSubjects,
    competitionCurriculumId,
  };
};
