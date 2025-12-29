// external imports
import { useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { SubjectsSidebar } from '@features/subjects/components';
import { UnitsAccordion } from '@features/units/components';
import { useTranslation } from '@hooks';

/**
 * GradeDetails Component
 *
 * Single Responsibility: Orchestrate and layout grade details with subjects sidebar and units accordion
 */
function GradeDetails({   gradeId }) {
  const { t } = useTranslation();

  // State for selected subject
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  return (
    <Grid container spacing={3}>
      {/* Subjects Sidebar - Left */}
      <Grid item size={{ mobile: 12, desktop: 3 }}>
        <SubjectsSidebar
          gradeId={gradeId}
          selectedSubjectId={selectedSubjectId}
          onSubjectSelect={setSelectedSubjectId}
        />
      </Grid>

      {/* Units Accordion - Right */}
      <Grid item size={{ mobile: 12, desktop: 9 }}>
        <UnitsAccordion
          subjectId={selectedSubjectId}
          gradeId={gradeId}
          title={t('grade.units')}
        />
      </Grid>
    </Grid>
  );
}

GradeDetails.propTypes = {
  gradeId: PropTypes.number.isRequired,
};

export default GradeDetails;
