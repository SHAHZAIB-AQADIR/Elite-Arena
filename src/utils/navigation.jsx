import { Link, useLocation, useNavigate } from 'react-router-dom';

export function buildPath({ to = '/', hash = '', search = '' }) {
  return `${to}${search}${hash}`;
}

export function scrollToHash(hash) {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function useScrollToHash() {
  const { pathname, hash } = useLocation();

  return () => {
    if (pathname === '/' && hash) {
      requestAnimationFrame(() => scrollToHash(hash));
    }
  };
}

export default function AppLink({
  to = '/',
  hash = '',
  search = '',
  className = '',
  children,
  onClick,
  ...rest
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = buildPath({ to, hash, search });

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (hash && to === '/' && location.pathname === '/') {
      event.preventDefault();
      window.history.pushState(null, '', destination);
      scrollToHash(hash);
    } else if (hash && to === '/' && location.pathname !== '/') {
      event.preventDefault();
      navigate(destination);
    }
  };

  return (
    <Link to={destination} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
