import { Card as MuiCard, CardProps } from '@mui/material';
import { ReactNode } from 'react';
import './Card.scss';

interface CardPropsExtended extends CardProps {
  children: ReactNode;
}

export const Card = ({
  className = '',
  children,
  ...props
}: CardPropsExtended) => {
  return (
    <MuiCard className={`card ${className}`.trim()} {...props}>
      {children}
    </MuiCard>
  );
};
