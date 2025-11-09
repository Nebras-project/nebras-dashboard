import { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';

import { useMenuContext } from '../MenuContext';

function MenuTrigger({ children, onClick, ...props }) {
  const { handleOpen } = useMenuContext();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    handleOpen(event);
  };

  if (isValidElement(children)) {
    return cloneElement(children, { onClick: handleClick, ...props });
  }

  return (
    <span onClick={handleClick} {...props}>
      {children}
    </span>
  );
}

MenuTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default MenuTrigger;
