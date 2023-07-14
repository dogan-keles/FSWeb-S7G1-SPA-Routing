import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmListesi from "./Filmler/FilmListesi";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import Film from "./Filmler/Film";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log("Filmler", response.data);

          setMovieList(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (movObj) => {
    // console.log("App.js: KaydedilenlerListesineEkle", id);
    // setSaved([...saved, id]);
    const findSaved = saved.filter((m) => m.id === movObj.id);
    if (findSaved.length > 0) {
      alert("Zaten Kaydedilmiş!");
    } else {
      setSaved([...saved, movObj]);
    }

    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <div>
      <Router>
        <KaydedilenlerListesi list={saved} />

        <div></div>

        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/filmler/:id">
              <Film save={KaydedilenlerListesineEkle} />
            </Route>

            <Route path="/">
              <FilmListesi movies={movieList} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
