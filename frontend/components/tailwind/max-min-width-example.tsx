export default function MinMaxWidthExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="min-w-[50px]  max-w-[700px] bg-white shadow-lg rounded-lg p-6 text-center border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-700">
          📦 Resizable Card
        </h2>
        <p className="text-gray-600">
          This card will **never shrink below 250px** and **never grow beyond
          500px**! more about the tailwind width utilities is available over{" "}
          <a
            href="https://tailwindcss.com/docs/width"
            className="text-blue-500"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
}

/**
 * min-w-*: This class sets the minimum width of an element to the specified value.
 * max-w-*: This class sets the maximum width of an element to the specified value.
 */
