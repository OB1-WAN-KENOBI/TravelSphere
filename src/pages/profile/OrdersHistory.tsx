import { useEffect, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Tag } from '@/shared/ui/Tag';
import { Button } from '@/shared/ui/Button';
import { usePriceFormatter } from '@/shared/lib/formatPrice';
import { useTranslation } from '@/shared/lib/useTranslation';
import './OrdersHistory.scss';

type OrderStatus = 'confirmed' | 'pending';
type Order = {
  id: string;
  tourTitle: string;
  date: string;
  price: number;
  status: OrderStatus;
};

export function OrdersHistory() {
  const { t } = useTranslation();
  const { formatPrice, locale } = usePriceFormatter();
  const orders = t.ordersHistory.orders as Order[];
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!infoMessage) return;
    const timer = setTimeout(() => setInfoMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [infoMessage]);

  return (
    <div className="orders-history">
      <h2 className="orders-history__title">{t.ordersHistory.title}</h2>
      <div className="orders-history__list">
        {orders.map((order) => (
          <Card key={order.id} className="orders-history__card">
            <div className="orders-history__header">
              <div>
                <h3 className="orders-history__tour-title">
                  {order.tourTitle}
                </h3>
                <p className="orders-history__date">
                  {t.ordersHistory.date}:{' '}
                  {new Date(order.date).toLocaleDateString(locale)}
                </p>
              </div>
              <Tag
                label={
                  order.status === 'confirmed'
                    ? t.ordersHistory.status.confirmed
                    : t.ordersHistory.status.pending
                }
              />
            </div>
            <div className="orders-history__footer">
              <div className="orders-history__price">
                {formatPrice(order.price, t.ordersHistory.currency)}
              </div>
              <Button
                variant="secondary"
                onClick={() =>
                  setInfoMessage(
                    `${t.ordersHistory.details}: ${order.tourTitle}`
                  )
                }
              >
                {t.ordersHistory.details}
              </Button>
            </div>
          </Card>
        ))}
        {infoMessage && (
          <p
            className="orders-history__info"
            aria-live="polite"
            role="status"
          >
            {infoMessage}
          </p>
        )}
      </div>
    </div>
  );
}
