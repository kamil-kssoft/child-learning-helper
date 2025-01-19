function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateArrayWithSubitems(array, subitemsCount, randomize) {
  if (subitemsCount === 1 && !randomize)
    return array.map((item) => [item]);

  if (subitemsCount === 1 && randomize)
    return shuffleArray(array).map((item) => [item]);

  return shuffleArrayWithSubitems(array, subitemsCount);
}

function shuffleArrayWithSubitems(array, subitemsCount) {
  // shuffle array
  const intermediate = shuffleArray(array);

  // create 2lvl array
  const output = intermediate.map((item) => [item]);

  for (let i = 0; i < output.length; i++) {
    let currentArray = [...array];

    // exclude first value
    const firstValue = output[i][0];
    currentArray = currentArray.filter((item) => item !== firstValue);

    // exclude all values from previous subitems
    if (i > 0) {
      const previousSubitems = output[i - 1];
      previousSubitems.forEach((subitem) => {
        currentArray = currentArray.filter((item) => item !== subitem);
      });
    }

    // exclude first value from next subitem
    if (i < output.length - 1) {
      const nextSubitem = output[i + 1];
      currentArray = currentArray.filter((item) => !nextSubitem.includes(item));
    }

    // add subitems
    for (let j = 0; j < subitemsCount - 1; j++) {
      const nextValue = currentArray[Math.floor(Math.random() * currentArray.length)];
      currentArray = currentArray.filter((item) => item !== nextValue);
      output[i].push(nextValue);
    }
  }

  return output;
}

export { shuffleArray, generateArrayWithSubitems, shuffleArrayWithSubitems };
