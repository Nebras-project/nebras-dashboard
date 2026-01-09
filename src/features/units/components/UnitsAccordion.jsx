// external imports
import { Paper } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useTranslation, useReduxTheme } from '@hooks';
import UnitsHeader from './UnitsHeader';
import UnitAccordionItem from './UnitAccordionItem';
import UnitFormDialog from './UnitFormDialog';
import { getSectionPaperStyles } from '@constants/layout';
import { CircularLoader, EmptyState } from '@components';
import { useUnits } from '../hooks';

/**
 * UnitsAccordion Component
 *
 * Displays units accordion for a selected subject
 */
function UnitsAccordion({ subjectId = null, gradeId = null, title = null, subtitle = null }) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();


  // Fetch units from API
  const {
    units = [],
    isLoading,
    isError,
    refetch,
  } = useUnits({
    gradeId,
    subjectId,
    enabled: !!gradeId && !!subjectId,
  });
 
  const showSelectSubject = !subjectId;
  const hasUnits = Array.isArray(units) && units.length > 0;
  const showEmptyState = !showSelectSubject && (!hasUnits || isError);
  const safeUnits = hasUnits ? units : [];

  return (
    <UnitFormDialog gradeId={gradeId} subjectId={subjectId} onSuccess={refetch}>
      {({ onAdd, onEdit, onDelete }) => (
        <Paper sx={getSectionPaperStyles(mode)}>
          {subjectId && (
            <UnitsHeader
              title={title}
              subtitle={subtitle}
              onUnitAdd={subjectId ? onAdd : undefined}
            />
          )}

          {isLoading && <CircularLoader />}

          {!isLoading && showSelectSubject && (
            <EmptyState icon="libraryBooks" title={t('grade.selectSubject')} />
          )}

          {!isLoading && showEmptyState && (
            <EmptyState icon="libraryBooks" title={t('grade.noUnits')} />
          )}

          {!isLoading && !showSelectSubject && hasUnits && (
            <>
              {safeUnits.map((unit, index) => (
                <UnitAccordionItem
                  key={unit.id}
                  unit={unit}
                  defaultExpanded={index === 0}
                  gradeId={gradeId}
                  subjectId={subjectId}
                  onUnitEdit={onEdit}
                  onUnitDelete={onDelete}
                />
              ))}
            </>
          )}
        </Paper>
      )}
    </UnitFormDialog>
  );
}

UnitsAccordion.propTypes = {
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default UnitsAccordion;
