import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionTo?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "image_not_supported",
  title,
  description,
  actionText,
  actionTo,
  onAction
}) => {
  return (
    <div className="w-full py-16 px-6 rounded-2xl bg-surface-container-low text-center flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
        <span translate="no" className="notranslate material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-primary">{title}</h3>
      <p className="font-body-md text-on-surface-variant max-w-sm">{description}</p>
      {actionText && (
        <div className="pt-2">
          {actionTo ? (
            <Button to={actionTo} variant="primary" size="md">
              {actionText}
            </Button>
          ) : (
            <Button onClick={onAction} variant="primary" size="md">
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
