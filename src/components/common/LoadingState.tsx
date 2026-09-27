import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading content..."
}) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-surface-container border-t-secondary animate-spin" />
      <p className="font-body-md text-on-surface-variant animate-pulse">{message}</p>
    </div>
  );
};
