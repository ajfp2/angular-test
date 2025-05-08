import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { CategoryDTO } from '../Models/category.dto';
import { CategoryService } from './category.service';


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
 

describe('CategoryService', () => {

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

    // TEST 1: Que se cree correctamente el componente
    it('should create', () => {
        expect(service).toBeTruthy();
    });

    // TEST 2: Comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
    it('GET method and getCategoriesByUserId return a list of Categories', () => {

        // Llamaríamos ala servicio, nos suscribimos y el resultado esperado sería que la respuesta fuera igual a "categoriesList" (objeto mock)
        service.getCategoriesByUserId('1').subscribe( (resp: CategoryDTO[]) => {
            expect(resp).toEqual(categoriesList);
        });

        // Definimos la petición 'Mock' a la url determinada
        const req = httpMock.expectOne('http://localhost:3000/users/categories/1');

        // Verificamos que el método sea de tipo GET.
        expect(req.request.method).toBe('GET');

        // Lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo CategoryDTO[] y validamos que sea de tipo GET y que devuelva el listado de categorías.
        req.flush(categoriesList);
    });

    //it('test', () => {});
});