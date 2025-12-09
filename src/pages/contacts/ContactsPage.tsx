import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { logger } from '@/shared/lib/logger';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { useTranslation } from '@/shared/lib/useTranslation';
import { type TranslationDictionary } from '@/shared/lib/i18n';
import './ContactsPage.scss';

const createContactSchema = (
  validation: TranslationDictionary['contacts']['validation']
) =>
  z.object({
    name: z.string().min(2, validation.nameMin),
    email: z.string().email(validation.email),
    phone: z.string().min(10, validation.phoneMin),
    message: z.string().min(10, validation.messageMin),
  });

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

export function ContactsPage() {
  const { t } = useTranslation();
  const contactSchema = useMemo(
    () => createContactSchema(t.contacts.validation),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = (data: ContactFormData) => {
    logger.log('Contact form:', data);
    // TODO: Отправить данные на сервер
    setSuccessMessage(t.contacts.formSuccess);
    reset();
  };

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div className="contacts-page">
      <div className="container">
        <h1 className="contacts-page__title">{t.contacts.title}</h1>
        <div className="contacts-page__content">
          <div className="contacts-page__info">
            <Card className="contacts-page__card">
              <h2 className="contacts-page__section-title">
                {t.contacts.sectionContact}
              </h2>
              <div className="contacts-page__contact-item">
                <Phone className="contacts-page__icon" />
                <div>
                  <div className="contacts-page__contact-label">
                    {t.contacts.phone}
                  </div>
                  <div className="contacts-page__contact-value">
                    {t.contacts.phoneValue ?? '+7 (999) 123-45-67'}
                  </div>
                </div>
              </div>
              <div className="contacts-page__contact-item">
                <Email className="contacts-page__icon" />
                <div>
                  <div className="contacts-page__contact-label">
                    {t.contacts.email}
                  </div>
                  <div className="contacts-page__contact-value">
                    {t.contacts.emailValue ?? 'info@travelsphere.ru'}
                  </div>
                </div>
              </div>
              <div className="contacts-page__contact-item">
                <LocationOn className="contacts-page__icon" />
                <div>
                  <div className="contacts-page__contact-label">
                    {t.contacts.address}
                  </div>
                  <div className="contacts-page__contact-value">
                    {t.contacts.addressValue}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="contacts-page__form-section">
            <Card className="contacts-page__card">
              <h2 className="contacts-page__section-title">
                {t.contacts.sectionForm}
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="contacts-page__form"
              >
                <Input
                  label={t.contacts.fields.name}
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
                <Input
                  label={t.contacts.fields.phone}
                  type="tel"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
                <Input
                  label={t.contacts.fields.message}
                  multiline
                  rows={6}
                  {...register('message')}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  fullWidth
                />
                <Button type="submit" fullWidth>
                  {t.contacts.submit}
                </Button>
                {successMessage && (
                  <p
                    className="contacts-page__success"
                    aria-live="polite"
                    role="status"
                  >
                    {successMessage}
                  </p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
