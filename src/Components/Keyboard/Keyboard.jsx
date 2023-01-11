const Keyboard = ({ keyPressHandler }) => {
  const letters = [];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const numString = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "zero",
  ];

  for (let i = 65; i < 91; i++) {
    letters.push(String.fromCharCode(i));
  }
  return (
    <div className="keyboardContainer" onClick={keyPressHandler}>
      {numbers.map((num, index) => {
        return (
          <div className="key" id={numString[index]} key={numString[index]}>
            {num}
          </div>
        );
      })}
      {letters.map((letter) => {
        return (
          <div className="key" id={letter} key={letter}>
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
