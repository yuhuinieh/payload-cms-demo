import * as migration_20241102_193049_initial from './20241102_193049_initial';
import * as migration_20241103_022209_movies from './20241103_022209_movies';

export const migrations = [
  {
    up: migration_20241102_193049_initial.up,
    down: migration_20241102_193049_initial.down,
    name: '20241102_193049_initial',
  },
  {
    up: migration_20241103_022209_movies.up,
    down: migration_20241103_022209_movies.down,
    name: '20241103_022209_movies'
  },
];
