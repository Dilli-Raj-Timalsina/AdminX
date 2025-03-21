export default function MinMaxHeightExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-80 min-h-[100px] max-h-[400px] overflow-auto bg-white shadow-lg rounded-lg p-6 text-center border border-gray-300">
        <h2 className="text-xl font-semibold text-gray-700">
          📦 Resizable Box
        </h2>
        <p className="text-gray-600">
          This box will **never be shorter than 100px** and **never grow taller
          than 400px**! If content exceeds `max-h`, it becomes scrollable. More
          about Tailwind height utilities is available over{" "}
          <a
            href="https://tailwindcss.com/docs/height"
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
 * Explanation :
 * min-h-*: This class sets the minimum height of an element to the specified value.
 * max-h-*: This class sets the maximum height of an element to the specified value.
 * overflow-auto: This class adds a scrollbar when the content exceeds the height.
 * max-h-screen: This class sets the maximum height of an element to the height of the screen.(viewport height 100vh)
 * min-h-screen: This class sets the minimum height of an element to the height of the screen.
 */
