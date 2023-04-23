import { Fragment, useState } from "react";

const size = 6;

const arrY = [...Array(size)].map(() => crypto.randomUUID());
const arrX = [...Array(size)].map(() => crypto.randomUUID());

const App: React.FC = () => {
  const [coord, setCoord] = useState({ x: 0, y: 0, dir: "N", command: "" });

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
        <form className="wrapper__form">
          <div className="wrapper__form__row">
            <select
              id="direction"
              name="direction"
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
              className="wrapper__form__row__input"
            />
            <input
              name="y"
              min="0"
              max="9"
              type="number"
              placeholder="Enter Y"
              className="wrapper__form__row__input"
            />
          </div>
          <div className="wrapper__form__row">
            <input
              placeholder="Enter your command!"
              type="text"
              id="command"
              name="command"
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
