// external imports
import { Card as MuiCard, CardHeader, CardContent, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import { memo } from 'react';

// internal imports
import { padding } from '@constants';

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
  onClick,
  elevation = 1,
  ...rest
}) {
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

  return (
    <MuiCard
      variant={variant}
      elevation={variant === 'outlined' ? 0 : elevation}
      onClick={onClick}
      sx={{
        ...padding.all.sm,
        '&:hover': {
          boxShadow: 'none',
        },
        ...sx,
      }}
      {...rest}
    >
      {/* Header Section */}
      {(title || subheader || action || avatar) && (
        <CardHeader
          avatar={avatar}
          action={action}
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
  onClick: PropTypes.func,
  elevation: PropTypes.number,
};

export default Card;
