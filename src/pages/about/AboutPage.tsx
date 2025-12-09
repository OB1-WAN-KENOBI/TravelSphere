import { Card } from '@/shared/ui/Card';
import { useTranslation } from '@/shared/lib/useTranslation';
import './AboutPage.scss';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="about-page__title">{t.aboutPage.title}</h1>
        <div className="about-page__content">
          <Card className="about-page__card">
            <h2 className="about-page__section-title">
              {t.aboutPage.historyTitle}
            </h2>
            {t.aboutPage.history.map((paragraph, index) => (
              <p key={index} className="about-page__text">
                {paragraph}
              </p>
            ))}
          </Card>

          <Card className="about-page__card">
            <h2 className="about-page__section-title">
              {t.aboutPage.whyTitle}
            </h2>
            <ul className="about-page__list">
              {t.aboutPage.whyList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card className="about-page__card">
            <h2 className="about-page__section-title">
              {t.aboutPage.achievementsTitle}
            </h2>
            <div className="about-page__stats">
              <div className="about-page__stat">
                <div className="about-page__stat-number">
                  {t.aboutPage.stats.experience.value}
                </div>
                <div className="about-page__stat-label">
                  {t.aboutPage.stats.experience.label}
                </div>
              </div>
              <div className="about-page__stat">
                <div className="about-page__stat-number">
                  {t.aboutPage.stats.destinations.value}
                </div>
                <div className="about-page__stat-label">
                  {t.aboutPage.stats.destinations.label}
                </div>
              </div>
              <div className="about-page__stat">
                <div className="about-page__stat-number">
                  {t.aboutPage.stats.clients.value}
                </div>
                <div className="about-page__stat-label">
                  {t.aboutPage.stats.clients.label}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
