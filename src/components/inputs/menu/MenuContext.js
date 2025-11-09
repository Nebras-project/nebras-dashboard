import { createContext, useContext } from 'react';

const MenuContext = createContext(null);

export function useMenuContext() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('Menu components must be used within a Menu component');
  }

  return context;
}

export default MenuContext;
