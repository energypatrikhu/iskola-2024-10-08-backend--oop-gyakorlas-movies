<script lang="ts">
  import { onMount } from 'svelte';
  import { Movie } from './lib/Movie';

  const movies = [
    new Movie('The Shawshank Redemption', 142, ['Thriller', 'Crime']),
    new Movie('The Godfather', 175, ['Crime']),
    new Movie('The Dark Knight', 152, ['Action', 'Crime']),
  ];

  function displayMovies(movies: Movie[]): void {
    const tbody = document.querySelector('tbody');

    if (tbody) {
      tbody.innerHTML = '';

      for (const movie of movies) {
        const tr = document.createElement('tr');
        const title = document.createElement('td');
        const duration = document.createElement('td');
        const genres = document.createElement('td');

        title.textContent = movie.title;
        duration.textContent = movie.duration.toString();
        genres.textContent = movie.genres.join(', ');

        tr.appendChild(title);
        tr.appendChild(duration);
        tr.appendChild(genres);

        tbody.appendChild(tr);
      }
    }
  }

  function addMovie(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const title = form.querySelector<HTMLInputElement>('input[name="title"]');
    const duration = form.querySelector<HTMLInputElement>('input[name="duration"]');
    const genres = form.querySelector<HTMLInputElement>('input[name="genres"]');

    if (!title || !duration || !genres) {
      return;
    }

    movies.push(new Movie(title.value, parseInt(duration.value), genres.value.split(/,|\s,/g)));
    displayMovies(movies);
  }

  onMount(() => {
    displayMovies(movies);
  });
</script>

<form on:submit="{addMovie}">
  <label for="title">Cím:</label>
  <input
    type="text"
    id="title"
    name="title"
    required
  />

  <label for="duration">Hossz (percben):</label>
  <input
    type="number"
    id="duration"
    name="duration"
    required
  />

  <label for="genres">Műfajok:</label>
  <input
    type="text"
    id="genres"
    name="genres"
    required
  />

  <button type="submit">Film hozzáadása</button>
</form>

<table>
  <thead>
    <tr>
      <th>Cím</th>
      <th>Hossz (percben)</th>
      <th>Műfajok</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  :global(th, td) {
    border: 1px solid black;
    padding: 0.5rem;
  }

  :global(th) {
    background-color: #f0f0f0;
  }

  :global(tr:nth-child(even)) {
    background-color: #f0f0f0;
  }

  :global(tr:nth-child(odd)) {
    background-color: #ffffff;
  }

  input {
    margin: 0.5rem;
  }

  button {
    margin: 0.5rem;
  }

  form {
    margin: 1rem;
  }
</style>
