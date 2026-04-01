export default function Task({ task, onClear }) {
  return (
    <li className="w-full flex items-baseline justify-between">
      <h3>{task.title}</h3>
      <button className="font-semibold" onClick={() => onClear(task.id)}>
        Clear
      </button>
    </li>
  );
}
