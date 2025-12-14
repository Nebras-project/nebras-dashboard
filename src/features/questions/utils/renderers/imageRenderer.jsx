// external imports
import { Box } from '@mui/material';

// internal imports
import { QuestionImage } from './QuestionImage';

/**
 * Custom renderer for Image column that displays question image
 * Wraps image with centered alignment for table cell
 * Accepts both URL strings and File objects
 *
 * @param {Object} params - Renderer parameters
 * @param {Object} params.row - Row data
 * @returns {JSX.Element|string} Image component wrapped in centered Box or '-' if no image
 */
export const imageRenderer = ({ row }) => {
  const image = row.questionImage;

  if (!image) {
    return '-';
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <QuestionImage image={image} />
    </Box>
  );
};
