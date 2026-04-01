export default function AddProjectButton({ children, onAddProject, ...props }) {
  return (
    <button onClick={() => onAddProject("new")} {...props}>
      {children}
    </button>
  );
}
