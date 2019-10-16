import { IBag } from '../shared/interfaces/bag-interface';
import { createSelector } from '@ngrx/store';

export interface AppState {
    bags: {
        bagsDB: IBag[],

    }
}

export const getBagsState = (state: AppState) => state.bags;

export const getBagsArray = createSelector(
    getBagsState,
    (state) => state.bagsDB
  );

