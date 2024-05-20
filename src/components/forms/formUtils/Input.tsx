import { type ComponentPropsWithoutRef, forwardRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  labelName: string;

  id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, labelName, ...props },
  ref
) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label" style={{display: 'flex'}}>
        {labelName}
      </label>
      <input id={id} {...props} ref={ref} />
    </div>
  );
});

export default Input;
