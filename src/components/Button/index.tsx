import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.less";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={styles.buttonStyle} {...rest}>
      {children}
    </button>
  );
};

export default Button;
