import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

// O tema inicial é aplicado no <html> por um script inline no layout (evita flash);
// a classe `dark` do <html> é a fonte da verdade.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const getServerSnapshot = (): Theme => 'light';

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (next: Theme) => {
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // armazenamento indisponível (modo privado etc.)
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
