// external imports
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// internal imports
import { Icon } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { NAVIGATION_PATHS } from '@config';
import { getUnitName } from '../utils';
import LessonsSection from '@features/lessons/components/LessonsSection';
import UnitSummary from './UnitSummary';
import { borderRadius } from '@theme';
import { borderColors } from '@theme/colors';
import { margin } from '@constants';
import { useReduxTheme } from '@hooks';
/**
 * UnitAccordionItem Component
 *
 * Single Responsibility: Display a single unit accordion item with its lessons
 */
function UnitAccordionItem({
  unit,
  defaultExpanded,
  gradeId,
  subjectId,
  onUnitEdit,
  onUnitDelete,
}) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const { mode } = useReduxTheme();
  const [expanded, setExpanded] = useState(defaultExpanded || false);
  const unitName = getUnitName(unit, currentLanguage);
  const lessonsCount = unit.lessonsCount || 0;

  const handleUnitView = () => {
    if (subjectId && gradeId) {
      navigate(NAVIGATION_PATHS.GRADES.UNIT(gradeId, subjectId, unit.id));
    }
  };

  const handleUnitEdit = () => {
    if (onUnitEdit) {
      onUnitEdit(unit);
      return;
    }
  };

  const handleUnitDelete = (targetUnit = unit) => {
    if (onUnitDelete) {
      onUnitDelete(targetUnit);
    }
  };

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      sx={{
        ...margin.bottom.sm,
        borderRadius: borderRadius.xxs,
        border: `1px solid ${borderColors[mode]}`,
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<Icon name="expandMore" size={24} />}
        sx={{
          position: 'relative',
          '&:hover .unit-actions': {
            opacity: 1,
          },
        }}
      >
        <UnitSummary
          unitName={unitName}
          lessonsCount={lessonsCount}
          lessonsLabel={t('grade.lessons')}
          onView={handleUnitView}
          onEdit={handleUnitEdit}
          onDelete={onUnitDelete ? handleUnitDelete : undefined}
          unit={unit}
          labels={{
            view: t('grade.viewUnit'),
            edit: t('grade.editUnit'),
            delete: t('grade.deleteUnit'),
          }}
          getItemName={(item) => getUnitName(item, currentLanguage)}
        />
      </AccordionSummary>

      <AccordionDetails>
        <LessonsSection unit={unit} gradeId={gradeId} subjectId={subjectId} enabled={expanded} />
      </AccordionDetails>
    </Accordion>
  );
}

UnitAccordionItem.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    nameAr: PropTypes.string,
    nameEn: PropTypes.string,
    lessonsCount: PropTypes.number,
  }).isRequired,
  defaultExpanded: PropTypes.bool,
  gradeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onUnitEdit: PropTypes.func,
  onUnitDelete: PropTypes.func,
};

UnitAccordionItem.defaultProps = {
  defaultExpanded: false,
  gradeId: null,
  subjectId: null,
  onUnitEdit: undefined,
  onUnitDelete: undefined,
};

export default UnitAccordionItem;
