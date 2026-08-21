interface LoaderProps {
  text?: string;
}

const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
};

export default Loader;
