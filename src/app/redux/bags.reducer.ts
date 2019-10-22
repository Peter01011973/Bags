import { createReducer, on } from '@ngrx/store';
import { LoadBags, RefreshBags, AddProductToCart, DeleteProductFromCart } from './bags.actions';
import { ICart } from '../shared/interfaces/cart-interface';

export const bagsReducer = createReducer({bagsDB: [], cartDB: []},
    on(LoadBags, (state, action) => ({
        ...state, 
        bagsDB: action.payload
    })),
    on(RefreshBags, state => ({...state})),
    on(AddProductToCart, (state, action) =>{
        const clone = state;
        const index = clone.cartDB.findIndex((item: ICart)=>item.id === action.payload.id);
        return (index !== -1)?{...clone, cartDB: clone.cartDB.map((item, ind)=>(ind === index)?{...item,count: item.count+1}:item)}:
        {...clone, cartDB: [...clone.cartDB,{...action.payload, count: 1}]}
    }),
    on(DeleteProductFromCart, (state, action) => {
        const clone = state;
        const index = clone.cartDB.findIndex((item: ICart)=>item.id === action.payload.id);
        return (index !== -1 && clone.cartDB[index].count > 1)?{...clone, cartDB: clone.cartDB.map((item, ind)=>(ind === index)?{...item,count: item.count-1}:item)}:
        {...state, cartDB: state.cartDB.filter((bag: ICart) => bag !== action.payload) }
    }),
);