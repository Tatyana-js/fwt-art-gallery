import { FC } from "react";
import { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "defaultButton" | "text" | "icon" | "circleIcon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: ReactNode;
  type: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  variant = "circleIcon",
  type,
  children,
  ...props
}) => {
  const variantClass = {
    defaultButton: styles.defaultButton,
    text: styles.text,
    icon: styles.icon,
    circleIcon: styles.circleIcon,
  }[variant];

  return (
    <button type={type} className={variantClass} {...props}>
      {children}
    </button>
  );
};
export default Button;
