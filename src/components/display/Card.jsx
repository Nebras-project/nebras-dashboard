// external imports
import { Card as MuiCard, CardHeader, CardContent, CardActions, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

// internal imports
import Icon from './Icon';
import { useLanguage } from '@hooks';
import { padding, gap } from '@constants';

const Card = memo(function Card({
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
        {isRTL ? <Icon name="arrowForward" size={24} /> : <Icon name="arrowBack" size={24} />}
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
});

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
