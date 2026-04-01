import EmptyPanel from "../EmptyPanel/EmptyPanel";
import NewProject from "../NewProject/NewProject";
import Project from "../Project/Project";

export default function ContentPanel({
  projects,
  currentSelectedProject,
  onSelectProject,
  onSavingProject,
  onCancel,
  onDelete,
  onAddingTask,
  onClearingTask,
}) {
  return (
    <section className="w-full pl-5 pr-5 pb-5">
      {currentSelectedProject === null && (
        <EmptyPanel onSelectProject={onSelectProject} />
      )}
      {currentSelectedProject === "new" && (
        <NewProject saveProject={onSavingProject} cancelProject={onCancel} />
      )}
      {currentSelectedProject && currentSelectedProject !== "new" && (
        <Project
          selectedProject={currentSelectedProject}
          deleteProject={onDelete}
          addTask={onAddingTask}
          clearTask={onClearingTask}
        />
      )}
    </section>
  );
}
