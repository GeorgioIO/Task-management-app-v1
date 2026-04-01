import { useRef } from "react";

export default function Input({ labelText, isTextArea, type, ...props }) {
  let classText =
    "bg-slate-100 border-b-2 border-slate-300 pl-1 pr-1 focus:outline-none focus:border-slate-900 ";

  if (labelText === "Description") {
    classText = "h-16 resize-none " + classText;
  } else {
    classText = "h-8 " + classText;
  }

  return (
    <div className="flex flex-col w-full gap-3">
      <label
        className="text-lg uppercase font-medium text-gray-600"
        htmlFor={props.id}
      >
        {labelText}
      </label>
      {isTextArea ? (
        <textarea className={classText} {...props}></textarea>
      ) : (
        <input className={classText} type={type} {...props} />
      )}
    </div>
  );
}
