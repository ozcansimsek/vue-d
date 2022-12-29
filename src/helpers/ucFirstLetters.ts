export const ucFirstLetters = (text: string) => {
  if (text) {
    return text
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
  }

  return "";
};
