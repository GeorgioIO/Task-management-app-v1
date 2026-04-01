import { Plus } from "lucide-react";
import AddProjectButton from "../AddProjectButton/AddProjectButton";

export default function Sidebar({
  currentProjects,
  onSelectingProject,
  onAddProject,
}) {
  return (
    <aside className="h-full flex flex-col gap-8 items-center justify-center shadow-black bg-black  pt-20 pb-20 pl-8 pr-8 lg:justify-start lg:items-start lg:rounded-tr-xl lg:rounded-br-xl">
      <h2 className="w-full text-center uppercase text-orange-600 text-3xl font-semibold lg:text-left">
        Your Projects
      </h2>
      <AddProjectButton
        onAddProject={onAddProject}
        className="flex gap-2 items-center bg-orange-50 pt-2 pb-2 pr-5 pl-5 rounded-md text-orange-600 ml-5 text-lg font-medium transition duration-200  hover:bg-orange-600 hover:text-black"
      >
        <Plus className="w-5 h-5 " strokeWidth={3} />
        Add Project
      </AddProjectButton>
      <menu className="flex flex-col  gap-3 w-full">
        {currentProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectingProject(project.id)}
            className="w-full text-orange-600 text-left transition duration-300 pl-4 pr-4 pt-3 pb-3 rounded-lg font-medium hover:bg-orange-600 hover:text-black "
          >
            {project.title}
          </button>
        ))}
      </menu>
    </aside>
  );
}
