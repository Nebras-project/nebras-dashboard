// external imports
import { Box, Typography, Stack, Divider } from '@mui/material';

// internal imports
import { Card, IconButtonWithTooltip } from '@components';
import { useTranslation, useAuth, useRole } from '@hooks';
import { borderRadius, fontWeights } from '@theme';
import { spacing, gap, margin } from '@constants';
import AdminForm from '@features/admins/components/AdminForm';
import ManagerForm from '@features/managers/components/ManagerForm';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { getPersonalInfoItems } from '../utils/personalInfoItems';

const getTitleStyles = () => ({
  fontWeight: 700,
  letterSpacing: 1.5,
});

const getItemContainerStyles = () => ({
  display: 'flex',
  alignItems: 'center',
  ...gap.md,
});

const getIconContainerStyles = (color) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: borderRadius.xs,
  bgcolor: `${color}15`,
  color,
  flexShrink: 0,
});

const getInfoWrapperStyles = () => ({
  flex: 1,
  minWidth: 0,
});

const getLabelStyles = () => ({
  textTransform: 'uppercase',
  fontWeight: fontWeights.semiBold,
  display: 'block',
  ...margin.bottom.xxs,
});

const getValueStyles = (isEmail) => ({
  wordBreak: isEmail ? 'break-all' : 'normal',
  color: 'text.primary',
});

const getDividerStyles = () => ({
  ...margin.top.md,
});

function PersonalInfoCard() {
  const { t } = useTranslation();
  const { userName, email } = useAuth();
  const { isOwner, isGeneralAdmin } = useRole();
  const { defaultValues, formOpen, isManager, handleEditClick, handleFormClose } =
    useUpdateProfile();

  const infoItems = getPersonalInfoItems(t, userName, email);

  return (
    <>
      <Card
        title={t('settings.personalInformation')}
        titleTypographyProps={{
          variant: 'overline',
          color: 'primary.main',
          sx: getTitleStyles(),
        }}
        action={
          !isOwner && (
            <IconButtonWithTooltip
              iconName="edit"
              tooltip={t('settings.editProfile')}
              // text={t('settings.editProfile')}
              onClick={handleEditClick}
              color="primary"
              size={25}
            />
          )
        }
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Stack spacing={spacing.values.lg}>
          {infoItems.map((item, index) => (
            <Box key={index}>
              <Box sx={getItemContainerStyles()}>
                <Box sx={getIconContainerStyles(item.color)}>{item.icon}</Box>
                <Box sx={getInfoWrapperStyles()}>
                  <Typography variant="caption" color="text.secondary" sx={getLabelStyles()}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={fontWeights.medium}
                    sx={getValueStyles(item.label === t('common.email'))}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
              {index < infoItems.length - 1 && <Divider sx={getDividerStyles()} />}
            </Box>
          ))}
        </Stack>
      </Card>

      {/* Render appropriate form based on user role */}
      {isGeneralAdmin && (
        <AdminForm
          mode="dialog"
          open={formOpen}
          onClose={handleFormClose}
          defaultValues={defaultValues}
          isEdit={true}
          titleEdit={t('settings.editProfile')}
        />
      )}

      {isManager && (
        <ManagerForm
          mode="dialog"
          open={formOpen}
          onClose={handleFormClose}
          defaultValues={defaultValues}
          isEdit={true}
          titleEdit={t('settings.editProfile')}
        />
      )}
    </>
  );
}

export default PersonalInfoCard;
