// external imports
import { List as MuiList, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

/**
 * Styled List component for navigation
 */
const StyledNavigationList = styled(MuiList)(({ collapsed }) => ({
  flexGrow: 1,
  px: collapsed ? 2 : 2, // 2 units (16px)
  pb: 0,
}));

/**
 * Styled Stack component for settings
 */
const StyledSettingsStack = styled(Stack)(({ collapsed }) => ({
  px: collapsed ? 1 : 2,
  py: 1,
}));

/**
 * Styled List component for default variant
 */
const StyledDefaultList = styled(MuiList)(() => ({
  px: 2,
  py: 1,
}));

/**
 * List Component
 * A reusable list component that provides consistent styling and behavior
 * for navigation menus, settings panels, and other list-based interfaces
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - List items to render
 * @param {boolean} props.collapsed - Whether the list is in collapsed state
 * @param {string} props.variant - List variant ('navigation', 'settings', 'default')
 * @param {boolean} props.spacing - Whether to add spacing between items
 * @param {number} props.spacingValue - Custom spacing value between items
 * @param {boolean} props.flexGrow - Whether the list should grow to fill available space
 * @param {Object} props.sx - Additional styles
 * @param {Object} props.containerProps - Props for the container element
 * @param {Object} props.rest - Additional props passed to the List component
 */
function List({
  children,
  collapsed = false,
  variant = 'default',
  spacing = true,
  spacingValue = 0.75,
  flexGrow = false,
  sx = {},
  containerProps = {},
  ...rest
}) {
  // Render based on variant
  if (variant === 'navigation') {
    return (
      <StyledNavigationList
        collapsed={collapsed}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledNavigationList>
    );
  }

  if (variant === 'settings') {
    return (
      <StyledSettingsStack
        spacing={spacingValue}
        collapsed={collapsed}
        sx={sx}
        {...containerProps}
      >
        {children}
      </StyledSettingsStack>
    );
  }

  // Default variant
  return (
    <StyledDefaultList
      sx={{
        ...(flexGrow && { flexGrow: 1 }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </StyledDefaultList>
  );
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  collapsed: PropTypes.bool,
  variant: PropTypes.oneOf(['navigation', 'settings', 'default']),
  spacing: PropTypes.bool,
  spacingValue: PropTypes.number,
  flexGrow: PropTypes.bool,
  sx: PropTypes.object,
  containerProps: PropTypes.object,
};

export default List;
