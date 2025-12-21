// internal imports
import { baseColors } from '@theme';
import { Icon } from '@components';

/**
 * Get personal info items configuration
 *
 * @param {Function} t - Translation function
 * @param {string} userName - User name
 * @param {string} email - User email
 * @param {string} [phoneNumber] - User phone number (optional)
 * @returns {Array} Array of info items configuration
 */
export const getPersonalInfoItems = (t, userName, email, phoneNumber) => {
  return [
    {
      icon: <Icon name="person" size={20} />,
      label: t('common.name'),
      value: userName || '-',
      color: baseColors.blue700,
    },
    {
      icon: <Icon name="email" size={20} />,
      label: t('common.email'),
      value: email || '-',
      color: baseColors.pink200,
    },
    {
      icon: <Icon name="phone" size={20} />,
      label: t('common.phone'),
      value: phoneNumber || '-',
      color: baseColors.green400,
    },
  ];
};
