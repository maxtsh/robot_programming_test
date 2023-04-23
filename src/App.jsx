import { Fragment, useState } from "react";
import { detectLanguage } from "./functions";
import { dirs, arrX, arrY } from "./constants";

const App = () => {
  const [coord, setCoord] = useState({ x: 0, y: 0, dir: "N", command: "" });

  const handleChange = ({ target: { name, value } }) => {
    setCoord((prev) => ({
      ...prev,
      [name]: !isNaN(Number(value)) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { x, y, dir, command } = coord;
    const cmd = command.toLowerCase();
    const { left, right, forward } = detectLanguage(cmd);
    const lastDirsIdx = dirs.length - 1;

    let tempX = x;
    let tempY = y;
    let tempDir = dir;

    for (let idx = 0; idx <= cmd.length; idx++) {
      const c = cmd.charAt(idx).toLowerCase();
      const currDirIdx = dirs.findIndex((item) => item === tempDir);

      if (c === right) {
        if (currDirIdx === lastDirsIdx) {
          tempDir = dirs[0];
        } else {
          tempDir = dirs[currDirIdx + 1];
        }
      }
      if (c === left) {
        if (currDirIdx === 0) {
          tempDir = dirs[lastDirsIdx];
        } else {
          tempDir = dirs[currDirIdx - 1];
        }
      }
      if (c === forward) {
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
    <main role="main">
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
        <form role="form" className="wrapper__form" onSubmit={handleSubmit}>
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
