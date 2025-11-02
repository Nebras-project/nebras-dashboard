// external imports

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

function ThemeCard() {
  const { t } = useTranslation();
  const { mode, setThemeMode } = useReduxTheme();

  const themeOptions = [
    {
      value: 'system',
      label: t('common.systemMode'),
      icon: <Icon name="contrast" />,
      onClick: () => setThemeMode('system'),
    },
    {
      value: 'light',
      label: t('common.lightMode'),
      icon: <Icon name="lightMode" />,
      onClick: () => setThemeMode('light'),
    },
    {
      value: 'dark',
      label: t('common.darkMode'),
      icon: <Icon name="darkMode" />,
      onClick: () => setThemeMode('dark'),
    },
  ];

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
      hoverable
    />
  );
}

export default ThemeCard;
