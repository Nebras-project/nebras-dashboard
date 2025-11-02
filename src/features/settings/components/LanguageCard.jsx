// external imports

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

function LanguageCard() {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();

  const languageOptions = [
    {
      value: 'default',
      label: t('common.systemMode'),
      icon: <Icon name="earth" />,
      onClick: () => setLanguage('default'),
    },
    {
      value: 'ar',
      label: t('common.arabic'),
      icon: <Icon name="language" />,
      onClick: () => setLanguage('ar'),
    },
    {
      value: 'en',
      label: t('common.english'),
      icon: <Icon name="english" />,
      onClick: () => setLanguage('en'),
    },
  ];

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
      hoverable
    />
  );
}

export default LanguageCard;
