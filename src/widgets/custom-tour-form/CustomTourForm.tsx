import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { logger } from '@/shared/lib/logger';
import { useTranslation } from '@/shared/lib/useTranslation';
import { type TranslationDictionary } from '@/shared/lib/i18n';
import './CustomTourForm.scss';

const createCustomTourSchema = (
  validation: TranslationDictionary['customTourForm']['validation']
) =>
  z.object({
    name: z.string().min(2, validation.nameMin),
    phone: z.string().min(10, validation.phoneMin),
    email: z.string().email(validation.email),
    destination: z.string().min(2, validation.destination),
    dates: z.string().min(1, validation.dates),
    budget: z.string().optional(),
    comments: z.string().optional(),
  });

type CustomTourFormData = z.infer<ReturnType<typeof createCustomTourSchema>>;

export const CustomTourForm = () => {
  const { t } = useTranslation();
  const customTourSchema = useMemo(
    () => createCustomTourSchema(t.customTourForm.validation),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomTourFormData>({
    resolver: zodResolver(customTourSchema),
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = (data: CustomTourFormData) => {
    logger.log('Custom tour request:', data);
    // TODO: Отправить данные на сервер
    setSuccessMessage(t.customTourForm.success);
    reset();
  };

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <section className="custom-tour-form">
      <div className="container">
        <h2 className="custom-tour-form__title">{t.customTourForm.title}</h2>
        <p className="custom-tour-form__subtitle">
          {t.customTourForm.subtitle}
        </p>
        <Card className="custom-tour-form__card">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="custom-tour-form__form"
          >
            <div className="custom-tour-form__row">
              <Input
                label={t.customTourForm.fields.name}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                className="custom-tour-form__input"
              />
              <Input
                label={t.customTourForm.fields.phone}
                type="tel"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                className="custom-tour-form__input"
              />
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                className="custom-tour-form__input"
              />
            </div>
            <div className="custom-tour-form__row">
              <Input
                label={t.customTourForm.fields.destination}
                {...register('destination')}
                error={!!errors.destination}
                helperText={errors.destination?.message}
                className="custom-tour-form__input"
              />
              <Input
                label={t.customTourForm.fields.dates}
                {...register('dates')}
                error={!!errors.dates}
                helperText={errors.dates?.message}
                className="custom-tour-form__input"
              />
              <Input
                label={t.customTourForm.fields.budget}
                type="number"
                {...register('budget')}
                error={!!errors.budget}
                helperText={errors.budget?.message}
                className="custom-tour-form__input"
              />
            </div>
            <div className="custom-tour-form__row">
              <Input
                label={t.customTourForm.fields.comments}
                multiline
                rows={4}
                {...register('comments')}
                className="custom-tour-form__input custom-tour-form__input--full"
              />
            </div>
            <Button type="submit" className="custom-tour-form__button">
              {t.customTourForm.submit}
            </Button>
            {successMessage && (
              <p
                className="custom-tour-form__success"
                aria-live="polite"
                role="status"
              >
                {successMessage}
              </p>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
};
