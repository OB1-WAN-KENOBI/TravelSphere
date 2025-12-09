import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { forwardRef } from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', ...props }, ref) => {
    const variantClass = `button--${variant}`;
    const classes = `button ${variantClass} ${className}`.trim();

    return (
      <MuiButton
        ref={ref}
        className={classes}
        variant={variant === 'primary' ? 'contained' : 'outlined'}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
