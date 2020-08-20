import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  // id: params.id,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export const AddMovie = (props) => {
  const [item, setItem] = useState(initialItem);
  const history = useHistory();
  const {setMovieList} = props
// console.log(setMovieList)
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/movies', item)
      .then((res) => {
        setMovieList(res.data)
      })
      .catch((err) => console.log(err, "lol"));
      history.push("/");
  };

  const onChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="title"
          type="text"
          value={item.title}
          onChange={onChange}
        />
        <input
          name="director"
          type="text"
          value={item.director}
          onChange={onChange}
        />
        <input
          name="metascore"
          type="text"
          value={item.metascore}
          onChange={onChange}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
