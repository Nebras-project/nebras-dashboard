// external imports
import { useState } from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { SubjectSidebar } from '@features/subjects/components';
import { UnitsAccordion } from '@features/units/components';
import { useTranslation } from '@hooks';

/**
 * CurriculumDetails Component
 *
 * Single Responsibility: Orchestrate and layout curriculum details with subjects sidebar and units accordion
 */
function CurriculumDetails({ curriculumId }) {
  const { t } = useTranslation();

  // State for selected subject
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  return (
    <Grid container spacing={3}>
      {/* Subjects Sidebar - Left */}
      <Grid item size={{ mobile: 12, desktop: 3 }}>
        <SubjectSidebar
          curriculumId={curriculumId}
          selectedSubjectId={selectedSubjectId}
          onSubjectSelect={setSelectedSubjectId}
        />
      </Grid>

      {/* Units Accordion - Right */}
      <Grid item size={{ mobile: 12, desktop: 9 }}>
          <UnitsAccordion
            subjectId={selectedSubjectId}
            curriculumId={curriculumId}
            title={t('curriculum.units')}
          />
      </Grid>
    </Grid>
  );
}

CurriculumDetails.propTypes = {
  curriculumId: PropTypes.number.isRequired,
};

export default CurriculumDetails;
