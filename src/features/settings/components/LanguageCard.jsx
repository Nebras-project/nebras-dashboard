// external imports
import { useCallback, useMemo, memo } from 'react';

// internal imports
import { Dropdown, Card, Icon } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { padding, margin } from '@constants';
import { borderWidth, borderRadius } from '@theme';

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

const LanguageCard = memo(function LanguageCard() {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();

  const handleLanguageChange = useCallback(
    (lang) => {
      // Avoid state update if language hasn't changed
      if (lang === currentLanguage) return;
      setLanguage(lang);
    },
    [currentLanguage, setLanguage]
  );

  const languageOptions = useMemo(
    () => [
      {
        value: 'system',
        label: t('common.systemMode'),
        icon: <Icon name="earth" />,
        onClick: () => handleLanguageChange('system'),
      },
      {
        value: 'ar',
        label: t('common.arabic'),
        icon: <Icon name="language" />,
        onClick: () => handleLanguageChange('ar'),
      },
      {
        value: 'en',
        label: t('common.english'),
        icon: <Icon name="english" />,
        onClick: () => handleLanguageChange('en'),
      },
    ],
    [t, handleLanguageChange]
  );

  const actions = (
    <Dropdown
      label={t('common.language')}
      options={languageOptions}
      currentValue={currentLanguage}
      sx={getDropdownStyles()}
      buttonSx={getButtonStyles()}
      listContainerSx={getListContainerStyles()}
    />
  );

  return (
    <Card
      title={t('common.language')}
      subheader={t('settings.languageDescription')}
      actions={actions}
      sx={{ backgroundColor: 'background.paper' }}
    />
  );
});

export default LanguageCard;
