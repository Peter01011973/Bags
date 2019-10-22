import { IBag } from '../shared/interfaces/bag-interface';
import { createSelector } from '@ngrx/store';
import { ICart } from '../shared/interfaces/cart-interface';

export interface AppState {
    bags: {
        bagsDB: IBag[];
        cartDB: ICart[]
        // bagsArrayLengthAfterSearch: number;
    }
}

export const getBagsState = (state: AppState) => state.bags;

export const getBagsArray = createSelector(
  getBagsState,
  (state) => state.bagsDB
);

export const getCart = createSelector(
  getBagsState,
  (state) => state.cartDB
);

export const getBagsArrayLength = createSelector(
  getBagsState,
  (state) => state.bagsDB.length
);

