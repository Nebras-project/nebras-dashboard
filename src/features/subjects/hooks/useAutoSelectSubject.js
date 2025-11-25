import { useEffect } from 'react';

/**
 * Auto-selects the first subject when subjects are loaded and no subject is selected
 */
export const useAutoSelectSubject = ({ subjects, selectedSubjectId, onSubjectSelect }) => {
  useEffect(() => {
    if (subjects?.length > 0 && !selectedSubjectId && onSubjectSelect) {
      onSubjectSelect(subjects[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, selectedSubjectId]);
};
