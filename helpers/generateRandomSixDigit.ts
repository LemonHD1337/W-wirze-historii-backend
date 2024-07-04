async function generateRandomSixDigit(): Promise<string> {
  // Generate a random number between 100000 and 999999 (inclusive)
  const randomNumber =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  // Convert the number to a string and return it
  return randomNumber.toString();
}

export default generateRandomSixDigit;
