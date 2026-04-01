import { useRef } from "react";
import Task from "../Task/Task";
import ErrorModal from "../ErrorModal/ErrorModal";

export default function Project({
  selectedProject,
  deleteProject,
  addTask,
  clearTask,
}) {
  const date = new Date(selectedProject.dueDate);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const taskInput = useRef();
  const dialog = useRef();

  return (
    <section className="w-full flex flex-col gap-5 xl:w-[600px]">
      <header className="flex justify-between w-full ">
        <h2 className="text-3xl text-black font-bold">
          {selectedProject.title}
        </h2>
        <button
          className="w-[100px] bg-transparent pl-3 pr-3 pt-1 pb-1 cursor-pointer rounded-lg transition duration-300 hover:bg-orange-600 hover:text-white"
          onClick={() => deleteProject(selectedProject.id)}
        >
          Delete
        </button>
      </header>
      <p className="text-gray-500 font-normal text-xl">{formattedDate}</p>
      <p>{selectedProject.description}</p>
      <div className="w-full h-[2px] bg-slate-400 rounded-sm"></div>
      <h3 className="text-2xl text-black font-bold">Tasks</h3>
      <div className="flex w-full gap-3 items-center">
        <ErrorModal ref={dialog} />
        <input
          ref={taskInput}
          type="text"
          className="bg-slate-300 rounded-sm pr-1 pl-1 pt-2 pb-2"
        />
        <button
          className="font-medium"
          type="button"
          onClick={() => {
            if (!taskInput.current.value) {
              dialog.current.open("Task cannot be empty");
              return;
            }
            addTask(selectedProject.id, taskInput.current.value);
            taskInput.current.value = "";
          }}
        >
          Add Task
        </button>
      </div>
      {selectedProject.tasks.length > 0 ? (
        <ol className="w-full bg-slate-100 pt-5 pb-5 pl-6 pr-6 flex flex-col gap-6">
          {selectedProject.tasks.map((task) => (
            <Task key={task.id} task={task} onClear={clearTask} />
          ))}
        </ol>
      ) : (
        <p>This project does not have any tasks yet.</p>
      )}
    </section>
  );
}
