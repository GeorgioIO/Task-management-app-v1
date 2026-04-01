import { validateProjectFields } from "../../utils/utils";
import ErrorModal from "../ErrorModal/ErrorModal";
import Input from "../Input/Input";
import { useRef } from "react";

export default function NewProject({ saveProject, cancelProject }) {
  let title = useRef();
  let description = useRef();
  let dueDate = useRef();
  const dialog = useRef();

  return (
    <form action="" className="flex flex-col w-[600px]  gap-4">
      <ErrorModal ref={dialog} />
      <div className="flex justify-end items-center h-[55px] gap-5">
        <button type="button" className="font-medium" onClick={cancelProject}>
          Cancel
        </button>
        <button
          type="button"
          className="w-[100px] h-[45px] bg-orange-600 text-black rounded-lg font-medium"
          onClick={() => {
            const validation = validateProjectFields(
              title.current.value,
              description.current.value,
              dueDate.current.value,
            );

            if (!validation.valid) {
              dialog.current.open(validation.message);
              return;
            }

            saveProject(
              title.current.value,
              description.current.value,
              dueDate.current.value,
            );
          }}
        >
          Save
        </button>
      </div>
      <Input labelText="Title" type="text" id="project-title" ref={title} />
      <Input
        labelText="Description"
        type="text"
        id="project-description"
        isTextArea={true}
        ref={description}
      />
      <Input
        labelText="Due Date"
        type="date"
        id="project-due-date"
        ref={dueDate}
      />
    </form>
  );
}
