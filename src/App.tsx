import { ChangeEvent, FormEvent, Fragment, useState } from "react";

const size = 6;
const englishRegex = /^[^fFlLrR]+$/;
const swedishRegex = /^[^vVhHgG]+$/;
const frenchRegex = /^[^dDaAgG]+$/;
const dirs = ["N", "E", "S", "W"];
const lefts = ["l", "v", "g"];
const rights = ["r", "h", "d"];
const forwards = ["f", "g", "a"];
const arrY = [...Array(size)].map(() => crypto.randomUUID());
const arrX = [...Array(size)].map(() => crypto.randomUUID());

const App: React.FC = () => {
  const [coord, setCoord] = useState({ x: 0, y: 0, dir: "N", command: "" });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCoord((prev) => ({
      ...prev,
      [name]: !isNaN(Number(value)) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { x, y, dir, command } = coord;

    const cmd = command.toLowerCase();

    let lang = "en";
    if (cmd.includes("v") || cmd.includes("h")) lang = "se";
    if (cmd.includes("a") || cmd.includes("d")) lang = "fr";

    let tempX = x;
    let tempY = y;
    let tempDir = dir;
    const lastDirsIdx = dirs.length - 1;

    for (let idx = 0; idx <= cmd.length; idx++) {
      const c = cmd.charAt(idx).toLowerCase();
      const currDirIdx = dirs.findIndex((item) => item === tempDir);

      if (rights.includes(c)) {
        if (currDirIdx === lastDirsIdx) {
          tempDir = dirs[0];
        } else {
          tempDir = dirs[currDirIdx + 1];
        }
      }
      if (lefts.includes(c)) {
        if (currDirIdx === 0) {
          tempDir = dirs[lastDirsIdx];
        } else {
          tempDir = dirs[currDirIdx - 1];
        }
      }
      if (forwards.includes(c)) {
        if (tempDir === "N") tempY = tempY - 1;
        if (tempDir === "S") tempY = tempY + 1;
        if (tempDir === "E") tempX = tempX + 1;
        if (tempDir === "W") tempX = tempX - 1;
      }
    }

    setCoord((prev) => ({
      ...prev,
      dir: tempDir,
      x: tempX,
      y: tempY,
    }));
  };

  return (
    <main>
      <div className="wrapper">
        <div className="wrapper__content">
          <div className="wrapper__content__box">
            {arrY.map((yId, y) => (
              <Fragment key={yId}>
                {arrX.map((xId, x) => (
                  <div
                    key={xId}
                    className={`wrapper__content__box__cell ${
                      coord.x === x && coord.y === y && "active"
                    }`}
                  >
                    <span className="wrapper__content__box__cell__coord">
                      {x},{y}
                    </span>
                    {coord.x === x && coord.y === y && <h1>{coord.dir}</h1>}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
        <form className="wrapper__form" onSubmit={handleSubmit}>
          <div className="wrapper__form__row">
            <select
              name="dir"
              onChange={handleChange}
              className="wrapper__form__row__input"
            >
              <option value="N">North (N)</option>
              <option value="E">East (E)</option>
              <option value="S">South (S)</option>
              <option value="W">West (W)</option>
            </select>
            <input
              name="x"
              min="0"
              max="9"
              type="number"
              placeholder="Enter X"
              onChange={handleChange}
              className="wrapper__form__row__input"
            />
            <input
              name="y"
              min="0"
              max="9"
              type="number"
              placeholder="Enter Y"
              onChange={handleChange}
              className="wrapper__form__row__input"
            />
          </div>
          <div className="wrapper__form__row">
            <input
              placeholder="Enter your command!"
              type="text"
              id="command"
              name="command"
              onChange={handleChange}
              className="wrapper__form__row__input"
            />
            <input
              className="wrapper__form__row__submit"
              type="submit"
              value="Order"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default App;
