export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      className="w-40 h-12 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      {...props}
    >
      {props.children}
    </button>
  );
}
