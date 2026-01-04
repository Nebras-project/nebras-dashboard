// external imports
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';

// internal imports
import { borderColors } from '@theme/colors';
import { margin, HEADER_HEIGHT } from '@constants';
import { fontSizes, fontWeights } from '@theme';

const getContainerStyles = (mode) => ({
  borderBottom: `1px solid ${borderColors[mode]}`,
  ...margin.bottom.lg,
});

const getTabStyles = () => ({
  minHeight: HEADER_HEIGHT,
  textTransform: 'none',
  fontSize: fontSizes.sm,
  fontWeight: fontWeights.semiBold,
});

function QuestionsTabsHeader({ value, onChange }) {
  const { t } = useTranslation();
  const { mode } = useReduxTheme();
  return (
    <Box sx={getContainerStyles(mode)}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="questions and forms tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          label={t('questions.questions')}
          icon={<Icon name="questionAnswer" />}
          iconPosition="end"
          sx={getTabStyles()}
        />
        <Tab
          label={t('ministerialForms.forms')}
          icon={<Icon name="fileList" />}
          iconPosition="end"
          sx={getTabStyles()}
        />
      </Tabs>
    </Box>
  );
}

QuestionsTabsHeader.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionsTabsHeader;
