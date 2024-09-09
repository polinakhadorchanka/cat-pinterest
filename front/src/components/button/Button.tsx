import { FC, PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  isActive = false,
  onClick = undefined,
  className,
}) => {
  return (
    <div
      className={`h-full px-8 
      flex items-center justify-center text-center
      text-xs md:text-sm font-roboto text-white 
      ${isActive ? 'bg-primary_dark' : 'bg-transparent'}
      hover:bg-primary_dark cursor-pointer ${className}`}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
