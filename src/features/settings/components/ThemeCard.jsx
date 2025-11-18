// external imports
import { useCallback, useMemo, memo } from 'react';

// internal imports
import { Dropdown, Card, Icon } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { borderWidth, borderRadius } from '@theme';
import { margin, padding } from '@constants';

const getDropdownStyles = () => ({
  minWidth: 280,
});

const getButtonStyles = () => ({
  border: borderWidth.xs,
  borderColor: 'divider',
  borderRadius: borderRadius.xxs,
});

const getListContainerStyles = () => ({
  border: borderWidth.xs,
  borderColor: 'divider',
  borderRadius: borderRadius.xxs,
  ...margin.top.sm,
  ...padding.y.sm,
});

const ThemeCard = memo(function ThemeCard() {
  const { t } = useTranslation();
  const { mode, setThemeMode } = useReduxTheme();

  const handleThemeChange = useCallback(
    (themeMode) => {
      // Avoid state update if theme hasn't changed
      if (themeMode === mode) return;
      setThemeMode(themeMode);
    },
    [mode, setThemeMode]
  );

  const themeOptions = useMemo(
    () => [
      {
        value: 'system',
        label: t('common.systemMode'),
        icon: <Icon name="contrast" />,
        onClick: () => handleThemeChange('system'),
      },
      {
        value: 'light',
        label: t('common.lightMode'),
        icon: <Icon name="lightMode" />,
        onClick: () => handleThemeChange('light'),
      },
      {
        value: 'dark',
        label: t('common.darkMode'),
        icon: <Icon name="darkMode" />,
        onClick: () => handleThemeChange('dark'),
      },
    ],
    [t, handleThemeChange]
  );

  const actions = (
    <Dropdown
      label={t('common.theme')}
      options={themeOptions}
      currentValue={mode}
      sx={getDropdownStyles()}
      buttonSx={getButtonStyles()}
      listContainerSx={getListContainerStyles()}
    />
  );

  return (
    <Card
      title={t('common.theme')}
      subheader={t('settings.themeDescription')}
      actions={actions}
      sx={{ backgroundColor: 'background.paper' }}
    />
  );
});

export default ThemeCard;
