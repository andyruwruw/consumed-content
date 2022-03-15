// Types
import {
  IMovieDbMovie,
  IMovieDbMovieSimplified,
  IMovieDbTvShow,
  IMovieDbTvShowSimplified,
} from '../types';
import { IShow } from '../../../shared/types';
import { Database } from '../database/database';

/**
 * Converts The Movie DB movies into our own format.
 *
 * @param {IMovieDbMovie[]} movies Movies to convert.
 * @returns {IShow[]} Converted movies.
 */
export const convertMovies = (movies: IMovieDbMovie[]): IShow[] => {
  return movies.map((movie: IMovieDbMovie): IShow => {
    return {
      name: movie.title,
      type: 'movie',
      posterUrl: movie.poster_path,
      backdropUrl: movie.backdrop_path,
      releaseDate: (new Date(movie.release_date)).getTime(),
      overview: movie.overview,
      theMovieDbId: movie.id,
    };
  });
};

/**
 * Converts The Movie DB simplified movies into our own format.
 *
 * @param {IMovieDbMovieSimplified[]} movies Simplified movies to convert.
 * @returns {IShow[]} Converted movies.
 */
export const convertSimplifiedMovies = (movies: IMovieDbMovieSimplified[]): IShow[] => {
  return movies.map((movie: IMovieDbMovieSimplified): IShow => {
    const date = movie.release_date.split('-') as unknown as [number, number, number];
    return {
      name: movie.title,
      type: 'movie',
      posterUrl: movie.poster_path,
      backdropUrl: movie.backdrop_path,
      releaseDate: (new Date(...date)).getTime() || null,
      overview: movie.overview,
      theMovieDbId: movie.id,
    };
  });
};

/**
 * Converts The Movie DB TV shows into our own format.
 *
 * @param {IMovieDbTvShow[]} tvShows TV shows to convert.
 * @returns {IShow[]} Converted TV shows.
 */
export const convertTvShows = (tvShows: IMovieDbTvShow[]): IShow[] => {
  return tvShows.map((tvShow: IMovieDbTvShow): IShow => {
    return {
      name: tvShow.name,
      type: 'tv-show',
      posterUrl: tvShow.poster_path,
      backdropUrl: tvShow.backdrop_path,
      releaseDate: (new Date(tvShow.first_air_date)).getTime(),
      overview: tvShow.overview,
      theMovieDbId: tvShow.id,
    };
  });
};

/**
 * Converts The Movie DB simplified TV shows into our own format.
 *
 * @param {IMovieDbTvShowSimplified[]} tvShows Simplified TV shows to convert.
 * @returns {IShow[]} Converted TV shows.
 */
export const convertSimplifiedTvShows = (tvShows: IMovieDbTvShowSimplified[]): IShow[] => {
  return tvShows.map((tvShow: IMovieDbTvShowSimplified): IShow => {
    const date = tvShow.first_air_date.split('-') as unknown as [number, number, number];
    return {
      name: tvShow.name,
      type: 'tv-show',
      posterUrl: tvShow.poster_path,
      backdropUrl: tvShow.backdrop_path,
      releaseDate: (new Date(...date)).getTime() || null,
      overview: tvShow.overview,
      theMovieDbId: tvShow.id,
    };
  });
};

export const convertAndMergeMovies = async (
  shows: IMovieDbMovieSimplified[],
  database: Database,
): Promise<IShow[]> => {
  try {
    const pendingExisting = [];

    for (let i = 0; i < shows.length; i += 1) {
      pendingExisting.push(database.show.selectByMovieDb(
        shows[i].id,
      ));
    }

    const existing = await Promise.all(pendingExisting);
    const add = [];

    for (let i = 0; i < shows.length; i += 1) {
      const show = shows[i];

      if (existing[i] === null) {
        const releaseDate = show.release_date.split('-') as unknown as [number, number, number];
        const date = (new Date(...releaseDate)).getTime() || 0;

        add.push(database.show.add(
          show.title,
          'movie',
          show.poster_path,
          show.backdrop_path,
          date,
          show.overview,
          show.id,
        ));
      }
    }

    await Promise.all(add);

    const insertedShowsPending = [];

    for (let i = 0; i < shows.length; i += 1) {
      const show = shows[i];

      insertedShowsPending.push(database.show.selectByMovieDb(show.id));
    }

    const insertedShows = await Promise.all(insertedShowsPending);
    const pending = [];

    for (let i = 0; i < insertedShows.length; i += 1) {
      const oldShow = shows[i];
      const show = insertedShows[i];

      if (existing[i] === null) {
        for (let j = 0; j < oldShow.genre_ids.length; j += 1) {
          pending.push(database.showGenre.add(
            show.id,
            oldShow.genre_ids[j],
          ));
        }
      }
    }

    await Promise.all(pending);

    const converted = await convertSimplifiedMovies(shows);
    const convertedWithId = [];

    for (let i = 0; i < converted.length; i += 1) {
      let id = 0;

      for (let j = 0; j < insertedShows.length; j += 1) {
        if (insertedShows[j].theMovieDbId === converted[i].theMovieDbId) {
          id = insertedShows[j].id;
          break;
        }
      }
      convertedWithId.push({
        id,
        ...converted[i],
      });
    }

    return convertedWithId;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export const convertAndMergeTvShows = async (
  shows: IMovieDbTvShowSimplified[],
  database: Database,
): Promise<IShow[]> => {
  try {
    const pendingExisting = [];

    for (let i = 0; i < shows.length; i += 1) {
      pendingExisting.push(database.show.selectByMovieDb(
        shows[i].id,
      ));
    }

    const existing = await Promise.all(pendingExisting);
    const add = [];

    for (let i = 0; i < shows.length; i += 1) {
      const show = shows[i];

      if (existing[i] === null) {
        let date = 0;
        if ('first_air_date' in show) {
          const releaseDate = show.first_air_date.split('-') as unknown as [number, number, number];
          date = (new Date(...releaseDate)).getTime() || 0;
        }

        add.push(database.show.add(
          show.name,
          'tv-show',
          show.poster_path,
          show.backdrop_path,
          date,
          show.overview,
          show.id,
        ));
      }
    }

    await Promise.all(add);

    const insertedShowsPending = [];

    for (let i = 0; i < shows.length; i += 1) {
      const show = shows[i];

      insertedShowsPending.push(database.show.selectByMovieDb(show.id));
    }

    const insertedShows = await Promise.all(insertedShowsPending);
    const pending = [];

    for (let i = 0; i < insertedShows.length; i += 1) {
      const oldShow = shows[i];
      const show = insertedShows[i];

      if (existing[i] === null) {
        for (let j = 0; j < oldShow.genre_ids.length; j += 1) {
          pending.push(database.showGenre.add(
            show.id,
            oldShow.genre_ids[j],
          ));
        }
      }
    }

    await Promise.all(pending);

    const converted = await convertSimplifiedTvShows(shows);
    const convertedWithId = [];

    for (let i = 0; i < converted.length; i += 1) {
      let id = 0;

      for (let j = 0; j < insertedShows.length; j += 1) {
        if (insertedShows[j].theMovieDbId === converted[i].theMovieDbId) {
          id = insertedShows[j].id;
          break;
        }
      }
      convertedWithId.push({
        id,
        ...converted[i],
      });
    }

    return convertedWithId;
  } catch (error) {
    console.log(error);
  }
  return [];
}