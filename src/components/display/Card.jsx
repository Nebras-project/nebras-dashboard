// external imports
import { Card as MuiCard, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import PropTypes from 'prop-types';

// internal imports
import { useLanguage } from '@hooks';
import { padding, gap } from '@constants';

/**
 * Card Component
 * A flexible, reusable card component with multiple variants using MUI Card
 *
 * @param {string} variant - Card style variant: 'elevation' or 'outlined'
 * @param {string} title - Card title (optional)
 * @param {string} subheader - Card subheader/description (optional)
 * @param {object} titleTypographyProps - Props to customize title Typography
 * @param {object} subheaderTypographyProps - Props to customize subheader Typography
 * @param {node} action - Action component in header (e.g., button, icon)
 * @param {node} avatar - Avatar component in header
 * @param {node} children - Card content
 * @param {node} actions - Action buttons at the bottom of card
 * @param {object} sx - Additional MUI sx props for the card
 * @param {object} contentSx - Additional MUI sx props for CardContent
 * @param {boolean} hoverable - Enable hover effects with sliding arrow
 * @param {function} onClick - Click handler for entire card
 * @param {number} elevation - Card elevation (shadow depth)
 */
function Card({
  variant = 'outlined',
  title,
  subheader,
  titleTypographyProps = {},
  subheaderTypographyProps = {},
  action,
  avatar,
  children,
  actions,
  sx = {},
  contentSx = {},
  hoverable = false,
  onClick,
  elevation = 1,
  ...rest
}) {
  const { isRTL } = useLanguage();

  // Default typography props with smaller sizes using slotProps
  const cardHeaderSlotProps = {
    title: {
      variant: 'body1',
      fontWeight: 600,
      ...titleTypographyProps,
      ...padding.bottom.xs,
    },
    subheader: {
      variant: 'caption',
      ...subheaderTypographyProps,
    },
  };

  // Hover styles with arrow effect
  const hoverStyles = hoverable
    ? {
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        position: 'relative',
        '&:hover': {
          '& .hover-arrow': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      }
    : {};

  // Custom action with hover arrow if hoverable is true
  const headerAction = hoverable ? (
    <Box sx={{ display: 'flex', alignItems: 'center', ...gap.xxs }}>
      {action}
      <Box
        className="hover-arrow"
        sx={{
          opacity: 0,
          transform: isRTL ? 'translateX(-10px)' : 'translateX(10px)',
          transition: 'all 0.2s ease',
          color: 'primary.main',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {isRTL ? <MdArrowForward size={24} /> : <MdArrowBack size={24} />}
      </Box>
    </Box>
  ) : (
    action
  );

  return (
    <MuiCard
      variant={variant}
      elevation={variant === 'outlined' ? 0 : elevation}
      onClick={onClick}
      sx={{
        ...padding.all.sm,
        ...hoverStyles,
        ...sx,
      }}
      {...rest}
    >
      {/* Header Section */}
      {(title || subheader || headerAction || avatar) && (
        <CardHeader
          avatar={avatar}
          action={headerAction}
          title={title}
          subheader={subheader}
          slotProps={cardHeaderSlotProps}
        />
      )}

      {/* Content Section */}
      {children && <CardContent sx={contentSx}>{children}</CardContent>}

      {/* Actions Section */}
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
}

Card.propTypes = {
  variant: PropTypes.oneOf(['elevation', 'outlined']),
  title: PropTypes.string,
  subheader: PropTypes.string,
  titleTypographyProps: PropTypes.object,
  subheaderTypographyProps: PropTypes.object,
  action: PropTypes.node,
  avatar: PropTypes.node,
  children: PropTypes.node,
  actions: PropTypes.node,
  sx: PropTypes.object,
  contentSx: PropTypes.object,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
  elevation: PropTypes.number,
};

export default Card;
