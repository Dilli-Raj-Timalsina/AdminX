export default function FlexboxExample() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg border-2 border-gray-300 p-10 my-36">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Card Title</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Action
          </button>
        </div>
        <div className="flex-1 p-4">
          <p className="text-gray-700">
            This is the content area of the card. You can add any content here,
            such as text, images, or other components.
          </p>
        </div>
        <div className="flex justify-between p-4 border-t">
          <span className="text-gray-600">Footer Left</span>
          <span className="text-gray-600">Footer Right</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Explanation of Flex Utilities Used
 * flex: This class applies display: flex; to the container, enabling flexbox layout.
 * flex-col: This class sets the flex direction to column, stacking child elements vertically.
 * items-center: This class centers items along the cross axis (vertically in this case).
 * justify-between: This class distributes space between items along the main axis (horizontally), placing the first item at the start and the last item at the end.
 * flex-row: This class sets the flex direction to row, arranging child elements horizontally.(default flex is flex-row)
 * border-b and border-t: These classes add borders to the bottom and top of the header and footer, respectively, for visual separation.
 * mx-auto: This class centers the container horizontally by setting left and right margins to auto.
 */
