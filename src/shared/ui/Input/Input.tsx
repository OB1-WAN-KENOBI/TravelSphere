import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import './Input.scss';

/**
 * Компонент Input с улучшенной поддержкой accessibility
 * Material UI TextField автоматически добавляет aria-describedby для helperText
 */
export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        className={`input ${className}`.trim()}
        variant="outlined"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
