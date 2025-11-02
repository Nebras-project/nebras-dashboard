export const isRTL = (language) => {
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  return rtlLanguages.includes(language);
};

export const getDirection = (language) => {
  return isRTL(language) ? "rtl" : "ltr";
};

export const getTextAlign = (direction) => {
  return direction === "rtl" ? "right" : "left";
};

export const getFlexDirection = (direction, baseDirection = "row") => {
  if (direction === "rtl" && baseDirection === "row") {
    return "row-reverse";
  }
  if (direction === "ltr" && baseDirection === "row-reverse") {
    return "row";
  }
  return baseDirection;
};
