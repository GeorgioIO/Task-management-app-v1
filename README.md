# Task management app (Version 1)

This project is my second practice project in my react learning journey where i decided to practice the following **React Topics:**

- Components
- States
- Refs
- Portals
- useImperativeHandle

On top of that i used tailwindcss for the first time in an actual project and i imprved my skills and understanding using it.

In this project a user can :

- Add project
- Delete project
- Add tasks to project

## App.jsx , Where everything flows

```
import Sidebar from "./components/Sidebar/Sidebar";
import ContentPanel from "./components/ContentPanel/ContentPanel";
import { useState } from "react";
import { createUniqueID } from "./utils/utils";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // ! On saving a project
  function handleSave(title, description, dueDate) {
    setProjects((previousProjects) => [
      ...previousProjects,
      {
        id: createUniqueID(),
        title: title,
        description: description,
        dueDate: dueDate,
        tasks: [],
      },
    ]);
    setSelectedProject(null);
  }

  // ! On Cancelling the creation of a project
  function handleCancel() {
    setSelectedProject(null);
  }

  // ! On Selecting a project in Sidebar
  function handleSelect(projectID) {
    setSelectedProject(projects.find((project) => project.id === projectID));
  }

  // ! On Deleting a project
  function handleDelete(projectID) {
    setProjects(projects.filter((project) => project.id !== projectID));
    setSelectedProject(null);
  }

  // ! On Adding task
  function handleAddTask(projectID, newTask) {
    setProjects((previousProjects) => {
      const updatedProjects = previousProjects.map((project) => {
        if (project.id !== projectID) return project;

        return {
          ...project,
          tasks: [...project.tasks, { id: createUniqueID(), title: newTask }],
        };
      });

      const updatedSelectedProject = updatedProjects.find(
        (project) => project.id === projectID,
      );

      setSelectedProject(updatedSelectedProject);
      return updatedProjects;
    });
  }

  function handleClearTask(taskID) {
    const projectID = selectedProject.id;
    setProjects((previousProjects) => {
      const updatedProjects = previousProjects.map((project) => {
        if (project.id !== projectID) return project;

        return {
          ...project,
          tasks: project.tasks.filter((task) => task.id !== taskID),
        };
      });

      const updatedSelectedProject = updatedProjects.find(
        (project) => project.id === projectID,
      );

      setSelectedProject(updatedSelectedProject);
      return updatedProjects;
    });
  }

  return (
    <>
      <Sidebar
        currentProjects={projects}
        onSelectingProject={handleSelect}
        onAddProject={setSelectedProject}
      />
      <ContentPanel
        currentProjects={projects}
        currentSelectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onSavingProject={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onAddingTask={handleAddTask}
        onClearingTask={handleClearTask}
      />
    </>
  );
}

export default App;

```

Starting from _app.jsx_ everything flows in my project i have two main stats controlling the app.

**projects :** Array of objects that represent the projects of the user.

**selectedProject :** The current selected project that controls what get rendered in the **ContentPanel** component

## Input validation using refs and portals

The main component im using for input validation is **ErrorModal**

```
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
```

With the help of **useImperativeHandle()** that is exposing only the **open()** function for the parent component , and **createPortal()** that is moving this component to its actual place in the DOM , and also **forwardRef()** to pass a ref from outside (conforming to react version oof my course).

## Using ErrorModal

```
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
```

This is one of the places where im using **ErrorModal** in my **NewProject** component that represent the form of adding a new project , i have four references , three for the inputs and one for the dialog **ErrorModal**.
