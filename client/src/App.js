import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [Agegroup, setAgegroup] = useState(0);
  const [type, settype] = useState("");
  const [Review, setReview] = useState("");
  const [Likes, setLikes] = useState(0);

  const [newLikes, setNewLikes] = useState(0);

  const [MovieList, setMovieList] = useState([]);

  const addMovie = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      Agegroup: Agegroup,
      type: type,
      Review: Review,
      Likes: Likes,
    }).then(() => {
      setMovieList([
        ...MovieList,
        {
          name: name,
          Agegroup: Agegroup,
          type: type,
          Review: Review,
          Likes: Likes,
        },
      ]);
    });
  };

  const getMovies = () => {
    Axios.get("http://localhost:3001/Movies").then((response) => {
      setMovieList(response.data);
    });
  };

  const updateMovieLikes = (id) => {
    Axios.put("http://localhost:3001/update", { Likes: newLikes, id: id }).then(
      (response) => {
        setMovieList(
          MovieList.map  ((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  type: val.type,
                  Agegroup: val.Agegroup,
                  Review: val.Review,
                  Likes: newLikes,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteMovie = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setMovieList(
        MovieList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Agegroup:</label>
        <input
          type="number"
          onChange={(event) => {
            setAgegroup(event.target.value);
          }}
        />
        <label>type:</label>
        <input
          type="text"
          onChange={(event) => {
            settype(event.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          onChange={(event) => {
            setReview(event.target.value);
          }}
        />
        <label>Likes (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setLikes(event.target.value);
          }}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>
      <div className="Movies">
        <button onClick={getMovies}>Show Movies</button>

        {MovieList.map((val, key) => {
          return (
            <div className="Movie">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Agegroup: {val.Agegroup}</h3>
                <h3>type: {val.type}</h3>
                <h3>Review: {val.Review}</h3>
                <h3>Likes: {val.Likes}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewLikes(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateMovieLikes(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteMovie(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
