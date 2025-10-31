import { MdContrast, MdLightMode, MdDarkMode } from 'react-icons/md';
import { Dropdown, Card } from '@components';
import { useTranslation, useReduxTheme } from '@hooks';
import { borderWidth, borderRadius } from '@theme/components';
import { margin, padding } from '@constants';

function ThemeCard() {
  const { t } = useTranslation();
  const { mode, setThemeMode } = useReduxTheme();

  const themeOptions = [
    {
      value: 'system',
      label: t('common.systemMode'),
      icon: <MdContrast />,
      onClick: () => setThemeMode('system'),
    },
    {
      value: 'light',
      label: t('common.lightMode'),
      icon: <MdLightMode />,
      onClick: () => setThemeMode('light'),
    },
    {
      value: 'dark',
      label: t('common.darkMode'),
      icon: <MdDarkMode />,
      onClick: () => setThemeMode('dark'),
    },
  ];

  const actions = (
    <Dropdown
      label={t('common.theme')}
      options={themeOptions}
      currentValue={mode}
      sx={{ minWidth: 280 }}
      buttonSx={{ border: borderWidth.xs, borderColor: 'divider', borderRadius: borderRadius.xxs }}
      listContainerSx={{
        border: borderWidth.xs,
        borderColor: 'divider',
        borderRadius: borderRadius.xxs,
        ...margin.top.sm,
        ...padding.y.sm,
      }}
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
