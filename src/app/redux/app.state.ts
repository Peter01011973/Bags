import { IBag } from '../shared/interfaces/bag-interface';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ICart } from '../shared/interfaces/cart-interface';
import { IBagSearchParams } from '../shared/interfaces/bagSearch-interface';
import { IBrand } from '../shared/interfaces/brand-interface';

export interface AppState {
    bags: {
        bagsDB: IBag[];
        cartDB: ICart[];
        currentPoduct: IBag;
        searchingParams: IBagSearchParams;
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

export const getCurrentProduct = createSelector(
  getBagsState,
  (state) => state.currentPoduct
);

export const getGetSearchingParams: MemoizedSelector<AppState, IBagSearchParams> = createSelector(
  getBagsState,
  (state) => state.searchingParams
);

