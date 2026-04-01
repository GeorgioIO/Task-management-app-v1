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
