import {
  type ReactNode,
  type ComponentPropsWithoutRef,
  forwardRef,
} from "react";

interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  labelName: string;
  id: string;
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, labelName, children, ...props },
  ref
) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label" style={{display: 'flex'}}>{labelName}</label>
      <select id={id} {...props} ref={ref}>
        {children}
      </select>
    </div>
  );
});

export default Select;
