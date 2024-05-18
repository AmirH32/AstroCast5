export type DayForecastType = {
  day: string;
  temperature: string; // Change the type of temperature to string
};


const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Function to generate longer Lorem Ipsum text
const generateLoremIpsum = (): string => {
  return `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;
};

export const generateFakeWeatherData = (amount: number = 7): Array<DayForecastType> => {
  const result = [];
  let dayIndex = new Date().getDay();
  let currentDayIndex = 0;
  
  // Find the index of Monday in the daysOfWeek array
  while (daysOfWeek[currentDayIndex] !== "Monday") {
    currentDayIndex++;
  }

  for (let i = 0; i < amount; ++i) {
    const day = daysOfWeek[currentDayIndex % 7];
    result.push({
      day: day,
      temperature: generateLoremIpsum(), // Use longer Lorem Ipsum text for temperature
    });
    currentDayIndex++; // Move to the next day
  }
  return result;
};
