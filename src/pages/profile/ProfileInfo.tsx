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
import './ProfileInfo.scss';

const createProfileSchema = (
  validation: TranslationDictionary['profile']['validation']
) =>
  z.object({
    name: z.string().min(2, validation.nameMin),
    email: z.string().email(validation.email),
    phone: z.string().min(10, validation.phoneMin),
    birthDate: z.string().optional(),
  });

type ProfileFormData = z.infer<ReturnType<typeof createProfileSchema>>;

export function ProfileInfo() {
  const { t } = useTranslation();
  const profileSchema = useMemo(
    () => createProfileSchema(t.profile.validation),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      phone: '+7 (999) 123-45-67',
    },
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = (data: ProfileFormData) => {
    logger.log('Profile update:', data);
    // TODO: Отправить данные на сервер
    setSuccessMessage(t.profile.success);
  };

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <Card>
      <h2 className="profile-info__title">{t.profile.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="profile-info__form">
        <Input
          label={t.profile.fields.name}
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
          label={t.profile.fields.phone}
          type="tel"
          {...register('phone')}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          fullWidth
        />
        <Input
          label={t.profile.fields.birthDate}
          type="date"
          {...register('birthDate')}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit">{t.profile.submit}</Button>
        {successMessage && (
          <p
            className="profile-info__success"
            aria-live="polite"
            role="status"
          >
            {successMessage}
          </p>
        )}
      </form>
    </Card>
  );
}
