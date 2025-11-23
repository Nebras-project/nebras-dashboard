// external imports
import { CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useReduxTheme } from '@hooks';
import darkImage from '@data/images/default-course-image-dark.png';
import lightImage from '@data/images/default-course-image-light-removebg-preview.png';

/**
 * CurriculumCardImage Component
 *
 * Single Responsibility: Display curriculum image or placeholder
 */
function CurriculumCardImage({ imageUrl, alt }) {
  const { isDark } = useReduxTheme();

  const defaultCourseImage = isDark ? darkImage : lightImage;

  return (
    <CardMedia
      component="img"
      height="240"
      image={imageUrl || defaultCourseImage}
      alt={alt}
      sx={{ objectFit: 'cover' }}
    />
  );
}

CurriculumCardImage.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

export default CurriculumCardImage;
