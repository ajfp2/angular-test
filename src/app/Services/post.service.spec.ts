import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

// import { CategoryDTO } from '../Models/category.dto';
// import { CategoryService } from './category.service';
import { PostDTO } from '../Models/post.dto';
import { PostService } from './post.service';

const postList: PostDTO[] = [];
/*
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
*/

describe('3b- Test Servicios: PostService', () => {

    // Variable service de tipo CategoryService para llamar a las diferentes funciones del servicio
    let service: PostService;

    // declaramos una variable 'httpMock' de tipo HttpTestingController para hacer las peticiones 'mock', para no hacer peticiones reales.
    let httpMock: HttpTestingController;

    // Antes de cada test, configuración necesaria para cada test del servicio.    
    beforeEach(() => {
        TestBed.configureTestingModule({

            imports:  [ HttpClientTestingModule ],
            providers: [ PostService ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

            // importante ejecutar el compileComponents
        }).compileComponents();
    });


    // Instancias necesarias para cada test del servicio
    beforeEach(() => {
        service = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Para no lanzar el siguiente test mientras haya peticiones pendientes
    });

    // TEST 1: Que se cree correctamente el componente
    it('TEST 1: PostService debería crearse', () => {
        expect(service).toBeTruthy();
    });

    //it('test', () => {});
});