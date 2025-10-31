// import { Box, Paper, Typography } from '@mui/material';
// import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { RiEnglishInput } from 'react-icons/ri';
import { FaEarthAmericas } from 'react-icons/fa6';
import { IoLanguage } from 'react-icons/io5';
import { Dropdown } from '@components';
import { useTranslation, useLanguage } from '@hooks';
import { Card } from '@components';
import { padding, margin } from '@constants';
import { borderWidth, borderRadius } from '@theme/components';

function LanguageCard() {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguage();

  const languageOptions = [
    {
      value: 'default',
      label: t('common.systemMode'),
      icon: <FaEarthAmericas />,
      onClick: () => setLanguage('default'),
    },
    {
      value: 'ar',
      label: t('common.arabic'),
      icon: <IoLanguage />,
      onClick: () => setLanguage('ar'),
    },
    {
      value: 'en',
      label: t('common.english'),
      icon: <RiEnglishInput />,
      onClick: () => setLanguage('en'),
    },
  ];

  const actions = (
    <Dropdown
      label={t('common.language')}
      options={languageOptions}
      currentValue={currentLanguage}
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
      title={t('common.language')}
      subheader={t('settings.languageDescription')}
      actions={actions}
      hoverable
    />
  );
}

export default LanguageCard;
