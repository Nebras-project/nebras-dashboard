// external imports
import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

// internal imports
import { useDeleteMinisterialForm } from '../hooks';
import { useReduxTheme } from '@hooks';
import CardActionsMenu from './CardActionsMenu';
import MinisterialFormCardTitle from './MinisterialFormCardTitle';
import { padding } from '@constants';
import { getCardStyles } from '@constants/layout';
import { Icon } from '@components';

/**
 * MinisterialFormCard Component
 *
 * Single Responsibility: Display ministerial form information in a card format
 */
function MinisterialFormCard({ form, onEdit }) {
  const { deleteMinisterialForm } = useDeleteMinisterialForm();
  const { mode } = useReduxTheme();

  const handleEdit = () => {
    onEdit?.(form);
  };

  const handleDelete = () => {
    deleteMinisterialForm(form);
  };

  return (
    <Card
      sx={{
        ...getCardStyles(mode, { position: 'relative' }),
      }}
    >
      {/* Actions Menu - Three Dots */}
      <CardActionsMenu form={form} onEdit={handleEdit} onDelete={handleDelete} />

      <CardContent
        sx={{
          ...padding.all.lg,
          textAlign: 'center',
        }}
      >
        <Icon name="fileList" size={60} />
        <MinisterialFormCardTitle formNumber={form.formNumber} year={form.year} />
      </CardContent>
    </Card>
  );
}

MinisterialFormCard.propTypes = {
  form: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
};

export default MinisterialFormCard;
