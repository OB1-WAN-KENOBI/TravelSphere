import { useEffect, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Download } from '@mui/icons-material';
import { useTranslation } from '@/shared/lib/useTranslation';
import { usePriceFormatter } from '@/shared/lib/formatPrice';
import './Documents.scss';

type Document = {
  id: string;
  title: string;
  date: string;
  type: string;
};

export function Documents() {
  const { t } = useTranslation();
  const { locale } = usePriceFormatter();
  const documents = t.documents.items as Document[];
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const handleDownload = (docId: string) => {
    // Заглушка для скачивания PDF
    setDownloadMessage(t.documents.downloadStub.replace('{{id}}', docId));
  };

  useEffect(() => {
    if (!downloadMessage) return;
    const timer = setTimeout(() => setDownloadMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [downloadMessage]);

  return (
    <div className="documents">
      <h2 className="documents__title">{t.documents.title}</h2>
      {downloadMessage && (
        <div className="documents__message" aria-live="polite" role="status">
          {downloadMessage}
        </div>
      )}
      <div className="documents__list">
        {documents.map((doc) => (
          <Card key={doc.id} className="documents__card">
            <div className="documents__content">
              <div>
                <h3 className="documents__doc-title">{doc.title}</h3>
                <p className="documents__doc-date">
                  {new Date(doc.date).toLocaleDateString(locale)}
                </p>
              </div>
              <Button
                variant="secondary"
                startIcon={<Download />}
                onClick={() => handleDownload(doc.id)}
              >
                {t.documents.download}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
