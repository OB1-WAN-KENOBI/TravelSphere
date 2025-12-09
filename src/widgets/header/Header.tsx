import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/shared/store/languageStore';
import { useTranslation } from '@/shared/lib/useTranslation';
import './Header.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const originalOverflowRef = useRef<string | null>(null);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { t, language, nextLanguage } = useTranslation();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (originalOverflowRef.current === null) {
      originalOverflowRef.current = document.body.style.overflow;
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflowRef.current || '';
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflowRef.current || '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo" aria-label={t.aria.logo}>
            TravelSphere
          </Link>
          <button
            type="button"
            className={`header__burger ${
              isMenuOpen ? 'header__burger--active' : ''
            }`}
            aria-label={isMenuOpen ? t.aria.closeMenu : t.aria.openMenu}
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={`header__nav ${
              isMenuOpen ? 'header__nav--open' : ''
            }`}
            role="navigation"
            aria-label={t.aria.nav}
          >
            <Link to="/tours" aria-label={t.aria.tours} onClick={closeMenu}>
              {t.nav.tours}
            </Link>
            <Link
              to="/destinations"
              aria-label={t.aria.destinations}
              onClick={closeMenu}
            >
              {t.nav.destinations}
            </Link>
            <Link to="/services" aria-label={t.aria.services} onClick={closeMenu}>
              {t.nav.services}
            </Link>
            <Link
              to="/promotions"
              aria-label={t.aria.promotions}
              onClick={closeMenu}
            >
              {t.nav.promotions}
            </Link>
            <Link to="/about" aria-label={t.aria.about} onClick={closeMenu}>
              {t.nav.about}
            </Link>
            <Link to="/contacts" aria-label={t.aria.contacts} onClick={closeMenu}>
              {t.nav.contacts}
            </Link>
            <Link to="/profile" aria-label={t.aria.profile} onClick={closeMenu}>
              {t.nav.profile}
            </Link>
            <button
              type="button"
              className="header__lang-toggle"
              aria-label={
                language === 'ru' ? t.aria.toggleToEn : t.aria.toggleToRu
              }
              onClick={() => {
                setLanguage(nextLanguage);
                closeMenu();
              }}
            >
              {t.langSwitch[nextLanguage]}
            </button>
          </nav>
        </div>
      </div>
      {isMenuOpen && <div className="header__backdrop" onClick={closeMenu} />}
    </header>
  );
};
