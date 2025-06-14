
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTrimesterInfo = (trimester: number) => {
  const info = {
    1: { name: "First Trimester", weeks: "1-12", description: "Early development and organ formation" },
    2: { name: "Second Trimester", weeks: "13-26", description: "Growth and development continue" },
    3: { name: "Third Trimester", weeks: "27-40", description: "Final growth and preparation for birth" }
  };
  return info[trimester as keyof typeof info];
};
