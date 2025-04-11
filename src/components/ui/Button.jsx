export default function Button({ children, ...props }) {
  return (
    <button className="bg-blue-700 text-white py-2 px-4 rounded" {...props}>
      {children}
    </button>
  );
}
