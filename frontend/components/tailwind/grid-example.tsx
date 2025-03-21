import React from "react";

const items = [
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
  { id: 3, text: "Item 3" },
  { id: 4, text: "Item 4" },
  { id: 5, text: "Item 5" },
  { id: 6, text: "Item 6" },
];

const GridExample = () => {
  return (
    <div className="p-10 my-36 border-2 border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Cute Grid</h2>
      <div className="grid grid-cols-3 gap-4 ">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-pink-200 p-4 rounded-lg shadow-md text-center"
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridExample;

/**
 * Explanation of Grid Utilities Used
 * grid: This class applies display: grid; to the container, enabling grid layout.
 * grid-cols-3: This class sets the number of columns to 3.
 * gap-4: This class adds a 16px gap between grid items.

 */
