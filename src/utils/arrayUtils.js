function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function buildQuizRound(values, target, tilesCount) {
  const distractors = shuffleArray(values.filter((item) => item !== target)).slice(
    0,
    tilesCount - 1
  );
  return shuffleArray([target, ...distractors]);
}

function generateArrayWithSubitems(array, subitemsCount, randomize) {
  if (subitemsCount === 1) {
    const sequence = randomize ? shuffleArray(array) : [...array];
    return sequence.map((item) => [item]);
  }

  const sequence = randomize ? shuffleArray(array) : [...array];
  return sequence.map((target) => buildQuizRound(array, target, subitemsCount));
}

export { shuffleArray, generateArrayWithSubitems, buildQuizRound };
