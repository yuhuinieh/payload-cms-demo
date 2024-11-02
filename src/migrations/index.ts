import * as migration_20241102_193049_initial from './20241102_193049_initial';

export const migrations = [
  {
    up: migration_20241102_193049_initial.up,
    down: migration_20241102_193049_initial.down,
    name: '20241102_193049_initial'
  },
];
