import { LoanPage } from "./LoanPage";

export const LOAN_DATA: LoanPage = {
    content: [
        { id: 1, game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: {id:1, name:"Juan"}, borrowedDate: new Date('2020/01/01'), returnDate: new Date('2020/01/06') },
        { id: 2, game: { id: 2, title: 'Juego 2', age: 6, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 1' } }, client: {id:2, name:"Cristiano"}, borrowedDate: new Date('2020/01/20'), returnDate: new Date('2020/01/30') },
        { id: 3, game: { id: 3, title: 'Juego 3', age: 6, category: { id: 3, name: 'Categoría 3' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 1' } }, client: {id:3, name:"LeBron"}, borrowedDate: new Date('2020/02/01'), returnDate: new Date('2020/02/06') },
        { id: 4, game: { id: 4, title: 'Juego 4', age: 6, category: { id: 4, name: 'Categoría 4' }, author: { id: 4, name: 'Autor 4', nationality: 'Nacionalidad 1' } }, client: {id:4, name:"Leo"}, borrowedDate: new Date('2020/03/01'), returnDate: new Date('2020/03/06') },
        { id: 5, game: { id: 5, title: 'Juego 5', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: {id:5, name:"Kobe"}, borrowedDate: new Date('2020/04/01'), returnDate: new Date('2020/04/06') },
        { id: 6, game: { id: 1, title: 'Juego 6', age: 6, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 1' } }, client: {id:6, name:"Diego"}, borrowedDate: new Date('2020/05/01'), returnDate: new Date('2020/05/06') },
        { id: 7, game: { id: 2, title: 'Juego 7', age: 6, category: { id: 3, name: 'Categoría 3' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 1' } }, client: {id:7, name:"Mike"}, borrowedDate: new Date('2020/06/01'), returnDate: new Date('2020/06/06') },
    ],  
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 7
}