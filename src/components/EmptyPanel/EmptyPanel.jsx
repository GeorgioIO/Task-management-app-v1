import noProjectImage from "../../assets/no-projects.png";
import AddProjectButton from "../AddProjectButton/AddProjectButton";

export default function EmptyPanel({ onSelectProject }) {
  return (
    <div className="h-full flex flex-col gap-6 justify-center items-center">
      <img
        className="w-20 h-20 object-contain mx-auto"
        src={noProjectImage}
        alt="No project selected"
      />
      <h2 className="font-bold text-orange-600 text-2xl">
        No Project Selected
      </h2>
      <p className="font-medium text-gray-400">
        Select a project or get started with a new one
      </p>
      <AddProjectButton
        onAddProject={onSelectProject}
        className="bg-orange-600 text-white pt-2 pb-2 pl-6 pr-6 rounded-xl"
      >
        Create New Project
      </AddProjectButton>
    </div>
  );
}
