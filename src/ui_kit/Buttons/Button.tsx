import { FC } from "react";
import { ReactNode } from "react";
import styles from "./Button.module.scss";
// import clsx from 'clsx';

type ButtonVariant = "defaultButton" | "text" | "icon" | "circleIcon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: ReactNode;
  type: "button" | "submit" | "reset";
  // state: 'default' | 'hover' | 'disabled' | 'focus';
}

const Button: FC<ButtonProps> = ({
  variant,
  type,
  children,
  // state,
  ...props
}) => {
  const variantClass = {
    defaultButton: styles.defaultButton,
    text: styles.text,
    icon: styles.icon,
    circleIcon: styles.circleIcon,
  }[variant];

  // const stateClass = {
  //   default: styles.stateDefault,
  //   hover: styles.stateHover,
  //   disabled: styles.stateDisabled,
  //   focus: styles.stateFocus,
  // }[state];

  // const buttonClass = clsx(
  //   variantClass,
  //   stateClass,
  // );

  return (
    <button type={type} className={variantClass} {...props}>
      {children}
    </button>
  );
};
export default Button;
