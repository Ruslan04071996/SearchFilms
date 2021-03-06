class MovieSearch {
  _baseUrl = "https://api.themoviedb.org/3";
  api_key = "ac4255c06e52a841804866a58661de95";
  async getResourse(url1, url2, url3) {
    const res = await fetch(
      `${this._baseUrl}${url1}?api_key=${this.api_key}&${url2}&${url3}`
    );
    if (!res.ok) {
      throw new Error(`Movies not found , received ${res.status} `);
    }
    const path=  `${this._baseUrl}${url1}?api_key=${this.api_key}&${url2}&${url3}`;
    const body = await res.json();
    return body;
  }
  async getMovie(movie, num) {
    return this.getResourse("/search/movie", `query=${movie}`, `page=${num}`);
  }
  async getGenres() {
    return this.getResourse("/genre/movie/list");
  }
  async getSession() {
    return this.getResourse("/authentication/guest_session/new");
  }

  async getRatedFilms(guest_session_id) {
    return this.getResourse(`/guest_session/${guest_session_id}/rated/movies`,'language=en-US','sort_by=created_at.asc');
  }

  async postRate(movie_id,stars,session) {
    const res = await fetch(
      `${this._baseUrl}/movie/${movie_id}/rating?api_key=${this.api_key}&guest_session_id=${session}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
         
        },
        body: JSON.stringify({
          "value": stars
        })
      }
    );
   
  }
}
export default MovieSearch;
