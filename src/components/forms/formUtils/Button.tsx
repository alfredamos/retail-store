import { ReactNode, type ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: string | ReactNode;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <>
      <button {...props}>{children}</button>
    </>
  );
}

export default Button;
