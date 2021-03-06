import React from "react";
import "./card.css";
import { Rate as Stars } from "antd";
import Genre from "../genres";
import Rate from "../rate";
import MovieSearch from "../movie-search";
import Img from "../img";
import Text from "../text";
import PropTypes from "prop-types";

function Card({ data, session }) {
  const elements = data.map((item) => {
    const onHandlerStars = async (stars) => {
      await new MovieSearch().postRate(item.id, stars, session);
    };

    return (
      <li key={item.id} className="content">
        <div className="content-img">
          {" "}
          <Img path={item.poster} overview={item.title} />
        </div>

        <div className="content-desc">
          <header className="content-desc-header">
            <h1> {item.title}</h1>
            <Rate rate={item.rate} />
          </header>
          <div className="content-desc-date">{item.date}</div>
          <div className="content-desc-genre">
            <Genre id={item.genre} />
          </div>
          <div className="content-desc-overview">
            <Text overview={item.desk} />
          </div>

          <div className="content-desc-stars">
            <Stars
              allowHalf={true}
              count={9}
              defaultValue={item.rate}
              onChange={(stars) => {
                onHandlerStars(stars);
              }}
            />
          </div>
        </div>
      </li>
    );
  });
  return <> {elements} </>;
}
Card.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  session: PropTypes.string
};
export default Card;
