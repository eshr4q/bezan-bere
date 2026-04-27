export function getSeason(month) {
    if ([3, 1, 2].includes(month)) return "winter";
    if ([6, 4, 5].includes(month)) return "spring";
    if ([9, 7, 8].includes(month)) return "summer";
    return "fall";
  }
  
  export const seasonBg = {
    winter: "bg-purple-200",
    spring: "bg-green-300",
    summer: "bg-red-300",
    fall: "bg-orange-400",
  };
  