const revert = (array) => {
  let special = [];
  let normal = [];
  const expressionAlfanumeric = /[a-zA-Z0-9]/;

  array.map((element, index) => {
    expressionAlfanumeric.test(element)
      ? normal.push(element)
      : special.push({ element, index });
  });

  const result = normal.reverse();

  special.map((element) => {
    result.splice(element.index, 0, element.element);
  });

  return result;
};

const array = [
  "n",
  2,
  "&",
  "a",
  "l",
  "%",
  9,
  "$",
  "q",
  47,
  "i",
  "a",
  "j",
  "b",
  "z",
  "%",
  8,
];

console.log(revert(array));
