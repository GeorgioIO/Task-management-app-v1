import { forwardRef, useRef, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";

const ErrorModal = forwardRef(function ErrorModal({}, ref) {
  const [message, setMessage] = useState("");
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open(openingMessage) {
        setMessage(openingMessage);
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      className="pt-5 pb-5 pr-20 pl-20 rounded-lg flex flex-col items-center gap-6 backdrop:bg-black/40 backdrop:backdrop-blur-md"
      ref={dialog}
    >
      <p>{message}</p>
      <form method="dialog">
        <button className="pt-1 pb-1 pl-4 pr-4 rounded-md font-semibold bg-transparent transition duration-300 hover:bg-black hover:text-white">
          Close
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root"),
  );
});

export default ErrorModal;
