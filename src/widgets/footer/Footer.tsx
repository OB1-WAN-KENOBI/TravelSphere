import { useTranslation } from '@/shared/lib/useTranslation';
import './Footer.scss';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
