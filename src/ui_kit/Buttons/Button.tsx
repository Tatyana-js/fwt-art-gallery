import { FC } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type ButtonVariant = "defaultButton" | "text" | "icon" | "circleIcon";
type theme = "dark" | "light";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  theme: theme;
}

const Button: FC<ButtonProps> = ({ variant, children, theme, ...props }) => {
  const buttonClass = clsx(styles[variant], styles[`${variant}--${theme}`]);

  return (
    <button className={buttonClass} type="submit" {...props}>
      {children}
    </button>
  );
};
export default Button;
