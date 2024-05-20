import { type ReactNode, type ComponentPropsWithoutRef } from "react";

interface FormProps extends ComponentPropsWithoutRef<"form"> {
  children: ReactNode;
}

function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}

export default Form;
