import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const UpdateMovie = () => {
  const params = useParams();

  const initialItem = {
    id: params.id,
    title: "",
    director: "",
    metascore: "",
    stars: [],
  };

  const [item, setItem] = useState(initialItem);
  const [movie, setMovie] = useState(null);
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, item)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => console.log(err, "lol"));
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
        <button>Update</button>
      </form>
    </div>
  );
};
