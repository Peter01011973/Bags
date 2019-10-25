import { createAction } from '@ngrx/store';
import { IBag } from '../shared/interfaces/bag-interface';
import { IBagSearchParams } from '../shared/interfaces/bagSearch-interface';

export const LoadBags = createAction('LOAD_BAGS', (payload: IBag[]) => ({payload}));
export const AddProductToCart = createAction('ADD_PRODUCT_TO_CART', (payload: IBag) => ({payload}));
export const DeleteProductFromCart = createAction('DELETE_PRODUCT_FROM_CART', (payload: IBag) => ({payload}));
export const ChangeCurrentProduct = createAction('CHANGE_CURRENT_PRODUCT',(payload: IBag) => ({payload}));
export const ChangeSearchingParams = createAction('CHANGE_SEARCHING_PARAMS',(payload: IBagSearchParams) => ({payload}));


