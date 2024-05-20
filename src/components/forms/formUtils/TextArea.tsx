import { type ComponentPropsWithoutRef, forwardRef } from "react";

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  labelName: string;
  id: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ id, labelName, ...props }, ref) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label" style={{display: 'flex'}}>{labelName}</label>
        <textarea id={id} {...props} ref={ref} />
      </div>
    );
  }
);

export default TextArea;
