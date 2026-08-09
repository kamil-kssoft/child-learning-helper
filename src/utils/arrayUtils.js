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
  const items = shuffleArray([target, ...distractors]);
  return {
    items,
    correctIndex: items.indexOf(target),
  };
}

function generateArrayWithSubitems(array, subitemsCount, randomize) {
  const sequence = randomize ? shuffleArray(array) : [...array];

  if (subitemsCount === 1) {
    return sequence.map((item) => ({ items: [item], correctIndex: 0 }));
  }

  // Each value is the unique correct answer exactly once; remaining tiles
  // are arbitrary other items (distractors may repeat across rounds).
  return sequence.map((target) => buildQuizRound(array, target, subitemsCount));
}

export { shuffleArray, generateArrayWithSubitems, buildQuizRound };
