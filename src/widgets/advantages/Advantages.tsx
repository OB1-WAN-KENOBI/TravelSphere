import { useTranslation } from '@/shared/lib/useTranslation';
import './Advantages.scss';

export const Advantages = () => {
  const { t } = useTranslation();
  const advantages = t.advantages.items;

  return (
    <section className="advantages">
      <div className="container">
        <h2 className="advantages__title">{t.advantages.title}</h2>
        <div className="advantages__grid">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantages__item">
              <div className="advantages__icon">{advantage.icon}</div>
              <h3 className="advantages__item-title">{advantage.title}</h3>
              <p className="advantages__item-description">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
