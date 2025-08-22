import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { Movie } from '../models/movie.interface';
import { map } from 'rxjs';
import { initialMovies } from 'src/data/data';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  private _moviesSubject = new BehaviorSubject<Movie[]>([]);
  readonly movies$ = this._moviesSubject.asObservable();

  constructor() {}

  getMovies(searchName: string = ''): Observable<Movie[]> {
    this._moviesSubject.next(initialMovies);
    return this.movies$.pipe(
      delay(3000),
      map((movies) =>
        movies.filter((m) =>
          m.name.toLowerCase().includes(searchName.toLowerCase())
        )
      )
    );
  }

  addMovie(name: string): void {
    const current = this._moviesSubject.getValue();
    const newMovie: Movie = {
      id: this._moviesSubject.getValue().length++,
      name,
      isOnline: false,
    };
    this._moviesSubject.next([...current, newMovie]);
  }

  updateMovie(movie: Movie): void {
    const updated = this._moviesSubject.getValue().map((m) => (m.id === movie.id ? movie : m));
    this._moviesSubject.next(updated);
  }

  deleteMovie(id: number): void {
    const updated = this._moviesSubject.getValue().filter((m) => m.id !== id);
    this._moviesSubject.next(updated);
  }
}
