import { IBrand } from './brand-interface';

export interface IBagSearchParams {
    price: {
        min: number, 
        max: number}, 
    brands: IBrand[]
};