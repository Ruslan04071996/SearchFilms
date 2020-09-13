import React, { Component } from "react";
import ReactDom from "react-dom";
import { DebounceInput } from "react-debounce-input";
import MovieSearch from "./components/movie-search";
import { List, Card } from "antd";
import "./index.css";
class App extends Component {
  state = {
    data: [],
    value: "",
  };
  createItem(id, title, date, genre, desk, stars, rate, poster) {
    return {
      id,
      title,
      date,
      genre,
      desk,
      stars,
      rate,
      poster,
    };
  }
  onChangeHandler = (e) => {
    this.setState({ value: e.target.value });
    const { value } = this.state;
    if (value) {
      new MovieSearch().getMovie(value).then((body) => {
        const needArr = body.results;
        console.log(needArr);
        const newData = needArr.map((item) => {
          console.log(typeof item.release_date);
          return this.createItem(
            item.id,
            item.original_title,
            item.release_date,
            item.genre_ids,
            item.overview,
            item.vote_count,
            item.vote_average,
            item.poster_path
          );
        });
        this.setState({ data: newData });
      });
    } else {
      this.setState({ data: [] });
    }
  };

  render() {
    const { data } = this.state;
    const elements = data.map((item) => {
      return (
        <li key={item.id} className="content">
          <div className="content-img">
            {" "}
            <img
              alt={item.title}
              src={`http://image.tmdb.org/t/p/w440_and_h660_face/${item.poster}`}
              width={150}
            />
          </div>

          <div className="content-desc">
            <header className="content-desc-header">
              <h1> {item.title}</h1>
              <span className='content-desc-header-rate'><span>{item.rate}</span>
              </span>
            </header>
            <div className="content-desc-date">{item.date}</div>
            <div className="content-desc-genre"></div>
            <div className="content-desc-overview">{item.desk}</div>

            <div className="content-desc-stars"></div>
          </div>
        </li>
      );
    });
    return (
      <div className="main">
        <DebounceInput
          minLength={1}
          debounceTimeout={100}
          onChange={this.onChangeHandler}
        />
        <ul className="list-content">{elements}</ul>
      </div>
    );
  }
}
ReactDom.render(<App />, document.querySelector("#root"));
