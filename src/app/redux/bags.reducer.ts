import { createReducer, on } from '@ngrx/store';
import { LoadBags } from './bags.actions';

export const bagsReducer = createReducer({bagsDB: []},
    on(LoadBags, (state, action) => ({
        ...state, 
        bagsDB: action.payload
    })),
);