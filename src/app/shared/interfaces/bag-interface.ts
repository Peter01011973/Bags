import { IPhoto } from './photo-interface';

export interface IBag {
    id: number,
    category: string,
    name: string,
    vendor: string,
    brand: string,
    countryManufacture: string,
    color: string,
    dimensions: string,
    material: string,
    price: number,
    quantity: number,
    photo1: IPhoto,
    photo2: IPhoto,
}
