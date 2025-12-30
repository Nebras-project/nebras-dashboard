import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useBackspaceNavigation(enabled = true) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!enabled) return;

    const handler = (e) => {
      if (e.key !== 'Backspace') return;

      const target = e.target;
      const tag = target && target.tagName && target.tagName.toLowerCase();
      const isEditable =
        target &&
        (target.isContentEditable || tag === 'input' || tag === 'textarea' || tag === 'select');
      if (isEditable) return;

      e.preventDefault();
      navigate(-1);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate, enabled]);
}
