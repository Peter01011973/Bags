import { createReducer, on } from '@ngrx/store';
import { LoadBags, AddProductToCart, DeleteProductFromCart, ChangeCurrentProduct, ChangeSearchingParams } from './bags.actions';
import { ICart } from '../shared/interfaces/cart-interface';
import { IBag } from '../shared/interfaces/bag-interface';
import { IBrand } from '../shared/interfaces/brand-interface';

export const bagsReducer = createReducer({bagsDB: [], cartDB: []},
    on(LoadBags, (state, action) => ({
        ...state, 
        bagsDB: action.payload,
        currentPoduct: action.payload[0],
        searchingParams: {
            price: {
              min: action.payload.reduce((accumulator: number, currentValue: IBag) => (accumulator < currentValue.price ? accumulator : currentValue.price), Infinity),
              max: action.payload.reduce((accumulator: number, currentValue: IBag) => (accumulator > currentValue.price ? accumulator : currentValue.price), -Infinity)
            },
            brands: getBrandsList(action.payload)
          }
    })),
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
    on(ChangeCurrentProduct, (state, action) => ({...state, currentPoduct: action.payload})),
    on(ChangeSearchingParams, (state, action) => ({...state, searchingParams: action.payload}))
);

function getBrandsList(a: IBag[]): IBrand[] {

    let list: IBrand[] = [];
    a.map(cur => (list.filter(item => item.brand === cur.brand).length === 0)?list=[...list,{brand: cur.brand, isChoosed: true}]:list);
    return list;
  }