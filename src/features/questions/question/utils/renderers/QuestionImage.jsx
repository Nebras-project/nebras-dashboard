// external imports
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useQuestionImage } from './hooks';

/**
 * Component to display question image from URL or File object
 * Handles object URL creation and cleanup for File objects
 *
 * @param {string|File} image - Image URL string or File object
 * @returns {JSX.Element} Image component
 */
export function QuestionImage({ image }) {
  const imageUrl = useQuestionImage(image);

  if (!imageUrl) {
    return null;
  }

  return (
    <Box
      component="img"
      src={imageUrl}
      alt="Question image"
      sx={{
        maxWidth: '100%',
        maxHeight: '70%',
        objectFit: 'contain',
        borderRadius: 0.5,
      }}
    />
  );
}

QuestionImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
};
