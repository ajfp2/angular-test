import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { CategoryDTO } from '../Models/category.dto';
import { CategoryService, deleteResponse } from './category.service';

const url: string = 'http://localhost:3000/categories';

const cat: CategoryDTO = {
    "categoryId": "",
    "title": "Test Angular",
    "description": "Test de prueba categorias service",
    "css_color": "#0ff301",
    "userId": "1"
};

const catID: CategoryDTO = {
    "categoryId": "4",
    "title": "Test Angular",
    "description": "Test de prueba categorias service",
    "css_color": "#0ff301",
    "userId": "1"
};
const categoriesList: CategoryDTO[] = [
    {
        userId: '',
        categoryId: '1',
        css_color: '',
        description: '',
        title: ''
    },
    {
        userId: '',
        categoryId: '2',
        css_color: '',
        description: '',
        title: ''
    },
    {
        userId: '',
        categoryId: '3',
        css_color: '',
        description: '',
        title: ''
    }
];

export interface deleteTestResponse {
  affected: number;
}

describe('3A- TEST SERVICIOS: CategoryService', () => {

    // Variable service de tipo CategoryService para llamar a las diferentes funciones del servicio
    let service: CategoryService;

    // declaramos una variable 'httpMock' de tipo HttpTestingController para hacer las peticiones 'mock', para no hacer peticiones reales.
    let httpMock: HttpTestingController;

    // Antes de cada test, configuración necesaria para cada test del servicio.    
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports:  [ HttpClientTestingModule ],
            providers: [ CategoryService ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

            // importante ejecutar el compileComponents
        }).compileComponents();
    });


    // Instancias necesarias para cada test del servicio
    beforeEach(() => {
        service = TestBed.inject(CategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Para no lanzar el siguiente test mientras haya peticiones pendientes
    });

    // TEST 0: Que se cree correctamente el componente
    it('TEST 0: CategoriaService debería crearse', () => {
        expect(service).toBeTruthy();
    });

    // TEST 1: Comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
    it('TEST 1: getCategoriesByUserId() metodo GET => lista de Categorias', () => {

        // Llamaríamos ala servicio, nos suscribimos y el resultado esperado sería que la respuesta fuera igual a "categoriesList" (objeto mock)
        service.getCategoriesByUserId('1').subscribe( (resp: CategoryDTO[]) => {
            expect(resp).toEqual(categoriesList);
        });

        // Definimos la petición 'Mock' a la url determinada
        const req = httpMock.expectOne('http://localhost:3000/users/categories/1');

        // Verificamos que el método sea de tipo GET.
        expect(req.request.method).toBe('GET');

        // Lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo CategoryDTO[] y validamos
        //  que sea de tipo GET y que devuelva el listado de categorías.
        req.flush(categoriesList);
    });


    // TEST 2: Comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
    it('TEST 2: getCategoryById() por método GET => Categoría', () => {

        service.getCategoryById('4').subscribe( (resp: CategoryDTO) => {
            expect(resp).toEqual(catID);
        });

        const req = httpMock.expectOne(url + '/4');

        expect(req.request.method).toBe('GET');
        req.flush(catID);
    });

    // TEST 3: Comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
    it('TEST 3: createCategory() por método POST => Categoría', () => {
        service.createCategory(cat).subscribe( (resp: CategoryDTO) => {
            expect(resp).toEqual(catID);
        });

        const req = httpMock.expectOne(url);

        expect(req.request.method).toBe('POST');
        req.flush(catID);
    });

    // TEST 4: Comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
    // updateCategory(categoryId: string, category: CategoryDTO): Observable<CategoryDTO>
    it('TEST 4: updateCategory() por método PUT => Categoría', () => {
        service.updateCategory('4', cat).subscribe( (resp: CategoryDTO) => {
            expect(resp).toEqual(catID);
        });

        const req = httpMock.expectOne(url + '/4');

        expect(req.request.method).toBe('PUT');
        req.flush(catID);
    });

    // TEST 5: Comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
    // deleteCategory(categoryId: string): Observable<deleteResponse>
    it('TEST 5: deleteCategory() por método DELETE => Categoría', () => {
        service.deleteCategory('4').subscribe( (resp: deleteTestResponse) => {
            expect(resp).toEqual({ affected: 1 });
        });

        const req = httpMock.expectOne(url + '/4');

        expect(req.request.method).toBe('DELETE');
        req.flush({ affected: 1 });
    });
    

});