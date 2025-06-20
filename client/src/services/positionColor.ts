export const getPositionColor = (position: string): string => {
    const colors: Record<string, string> = {
      שוער: "bg-green-100 text-green-800 border-green-200",
      מגן: "bg-blue-100 text-blue-800 border-blue-200",
      קשר: "bg-purple-100 text-purple-800 border-purple-200",
      חלוץ: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[position] || "bg-gray-100 text-gray-800 border-gray-200";
  };