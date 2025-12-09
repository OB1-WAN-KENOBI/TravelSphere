import { Chip, ChipProps } from '@mui/material';
import './Tag.scss';

interface TagProps extends ChipProps {
  label: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export const Tag = ({
  className = '',
  color = 'default',
  ...props
}: TagProps) => {
  return (
    <Chip className={`tag ${className}`.trim()} color={color} {...props} />
  );
};
