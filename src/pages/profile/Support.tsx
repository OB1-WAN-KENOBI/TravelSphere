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
import './Support.scss';

const createSupportSchema = (
  validation: TranslationDictionary['support']['validation']
) =>
  z.object({
    subject: z.string().min(3, validation.subjectMin),
    message: z.string().min(10, validation.messageMin),
  });

type SupportFormData = z.infer<ReturnType<typeof createSupportSchema>>;

export function Support() {
  const { t } = useTranslation();
  const supportSchema = useMemo(
    () => createSupportSchema(t.support.validation),
    [t]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = (data: SupportFormData) => {
    logger.log('Support request:', data);
    // TODO: Отправить данные на сервер
    setSuccessMessage(t.support.success);
    reset();
  };

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div className="support">
      <h2 className="support__title">{t.support.title}</h2>
      <Card className="support__card">
        <p className="support__description">{t.support.description}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="support__form">
          <Input
            label={t.support.fields.subject}
            {...register('subject')}
            error={!!errors.subject}
            helperText={errors.subject?.message}
            fullWidth
          />
          <Input
            label={t.support.fields.message}
            multiline
            rows={6}
            {...register('message')}
            error={!!errors.message}
            helperText={errors.message?.message}
            fullWidth
          />
          <Button type="submit">{t.support.submit}</Button>
          {successMessage && (
            <p className="support__success" aria-live="polite" role="status">
              {successMessage}
            </p>
          )}
        </form>
      </Card>
    </div>
  );
}
