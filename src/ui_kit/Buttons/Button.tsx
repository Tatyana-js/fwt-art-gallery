import { FC } from "react";
import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonVariant = "defaultButton" | "text" | "icon" | "circleIcon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: ReactNode;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ variant, type, children, disabled }) => {
  const variantClass = {
    defaultButton: styles.defaultButton,
    text: styles.text,
    icon: styles.icon,
    circleIcon: styles.circleIcon,
  }[variant];

  const buttonClass = clsx(variantClass, {
    [styles.disabled]: disabled,
  });

  return (
    <button type={type} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
