import { CircularProgress } from '@mui/material';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  size?: number;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({
  size = 40,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const content = (
    <div className="loading-spinner">
      <CircularProgress size={size} />
    </div>
  );

  if (fullScreen) {
    return <div className="loading-spinner--fullscreen">{content}</div>;
  }

  return content;
};
