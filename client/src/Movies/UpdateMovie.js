import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export const UpdateMovie = () => {
  const [item, setItem] = useState(initialItem);
  const { id } = useParams;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err, "lolol"));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => console.log(res))
      .catch((err) => console.log(err, "lol"));
  };
console.log('object')
  const onChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div onSubmit={onSubmit}>
      <form>
        <input
          name="title"
          type="text"
          value={item.title}
          onChange={onChange}
        />
        <input
          name="director"
          type="text"
          value={item.title}
          onChange={onChange}
        />
        <input
          name="metascore"
          type="text"
          value={item.title}
          onChange={onChange}
        />
        {item.stars.map((star) => (
          <input
            name="stars"
            type="text"
            value={item.title}
            onChange={onChange}
          />
        ))}
        <button>Update</button>
      </form>
    </div>
  );
};
