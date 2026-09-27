import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  disabled = false
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-label-lg font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary';

  const variantClasses = {
    primary:
      'bg-primary text-on-primary shadow-sm hover:bg-secondary hover:shadow-md',
    secondary:
      'bg-secondary text-on-secondary shadow-md hover:bg-secondary-fixed hover:text-on-secondary-fixed',
    accent:
      'bg-tertiary-fixed text-tertiary shadow-md hover:bg-tertiary-fixed-dim hover:shadow-lg',
    outline:
      'border-2 border-primary text-primary hover:bg-primary/5 hover:border-secondary hover:text-secondary',
    ghost:
      'bg-surface-container-highest/20 text-white backdrop-blur-sm hover:bg-surface-container-highest/30'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-label-md gap-1.5',
    md: 'px-5 py-2.5 text-label-lg gap-2',
    lg: 'px-7 py-3.5 text-title-md gap-2.5'
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span translate="no" className="notranslate material-symbols-outlined text-[20px]">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span translate="no" className="notranslate material-symbols-outlined text-[20px]">{icon}</span>
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {content}
    </button>
  );
};
