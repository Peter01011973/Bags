import { createAction } from '@ngrx/store';
import { IBag } from '../shared/interfaces/bag-interface';
import { IBagSearchParams } from '../shared/interfaces/bagSearch-interface';

export const LoadBags = createAction('LOAD_BAGS', (payload: IBag[]) => ({payload}));

