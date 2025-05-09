import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

// import { CategoryDTO } from '../Models/category.dto';
// import { CategoryService } from './category.service';
import { PostDTO } from '../Models/post.dto';
import { PostService } from './post.service';

export interface deleteTestResponse {
    affected: number;
}

const url: string = 'http://localhost:3000/posts';

const postList: PostDTO[] = [
    {
        "postId": "0",
        "title": "",
        "description": "",
        "num_likes": 0,
        "num_dislikes": 0,
        "publication_date": new Date('02/05/2025'),
        "categories": [],
        "userId": "",
        "userAlias": "",
    },
    {
        "postId": "1",
        "title": "Un post",
        "description": "Post cualquiera",
        "num_likes": 0,
        "num_dislikes": 0,
        "publication_date": new Date('02/05/2025'),
        "categories": [],
        "userId": "1",
        "userAlias": "ajfp2",
    },
    {
        "postId": "2",
        "title": "Dos post",
        "description": "Dos Post cualquiera",
        "num_likes": 1,
        "num_dislikes": 1,
        "publication_date": new Date('03/05/2025'),
        "categories": [],
        "userId": "2",
        "userAlias": "andrea",
    }
];

const post: PostDTO[] = [{
    "postId": "2",
    "title": "Dos post",
    "description": "Dos Post cualquiera",
    "num_likes": 1,
    "num_dislikes": 1,
    "publication_date": new Date('03/05/2025'),
    "categories": [],
    "userId": "2",
    "userAlias": "andrea",
}];

describe('3B- TEST SERVICIOS: PostService', () => {

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

    // TEST 0: Que se cree correctamente el componente
    it('TEST 0: PostService debería crearse', () => {
        expect(service).toBeTruthy();
    });

    // TEST 1: Comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
    it('TEST 1: getPosts() metodo GET => lista de posts', () => {

        // Llamaríamos al servicio, nos suscribimos y el resultado esperado sería que la respuesta fuera igual a "categoriesList" (objeto mock)
        service.getPosts().subscribe( (resp: PostDTO[]) => {
            expect(resp).toEqual(postList);
        });

        // Definimos la petición 'Mock' a la url determinada
        const req = httpMock.expectOne(url);

        // Verificamos que el método sea de tipo GET.
        expect(req.request.method).toBe('GET');

        // Lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo CategoryDTO[] y validamos
        //  que sea de tipo GET y que devuelva el listado de categorías.
        req.flush(postList);
    });


    it('TEST 2: getPostsByUserId() por método GET => lista de Posts', () => {
        service.getPostsByUserId('2').subscribe( (resp: PostDTO[]) => {
            expect(resp).toEqual(post);
        });
        const req = httpMock.expectOne('http://localhost:3000/users/posts/2');
        expect(req.request.method).toBe('GET');
        req.flush(post);
    });

    it('TEST 3: createPost() por método POST => un Post', () => {
        service.createPost(post[0]).subscribe( (resp: PostDTO) => {
            expect(resp).toEqual(postList[2]);
        });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush(postList[2]);
    });

    it('TEST 4: getPostById() por método GET => un Post', () => {
        service.getPostById('1').subscribe( (resp: PostDTO) => {
            expect(resp).toEqual(postList[1]);
        });
        const req = httpMock.expectOne(url+ '/1');
        expect(req.request.method).toBe('GET');
        req.flush(postList[1]);
    });

    it('TEST 5: updatePost() por método PUT => un Posts', () => {
        service.updatePost('2', post[0]).subscribe( (resp: PostDTO) => {
            expect(resp).toEqual(postList[2]);
        });
        const req = httpMock.expectOne(url+ '/2');
        expect(req.request.method).toBe('PUT');
        req.flush(postList[2]);
    });

    it('TEST 6: deletePost() por método DELETE => number affected rows', () => {
        service.deletePost('2').subscribe( (resp: deleteTestResponse) => {
            expect(resp).toEqual({affected: 1});
        });
        const req = httpMock.expectOne(url+ '/2');
        expect(req.request.method).toBe('DELETE');
        req.flush({affected: 1});
    });

    it('TEST 7: likePost() por método PUT => un Posts', () => {
        service.likePost('2').subscribe( (resp: deleteTestResponse) => {
            expect(resp).toEqual({affected: 1});
        });
        const req = httpMock.expectOne(url+ '/like/2');
        expect(req.request.method).toBe('PUT');
        req.flush({affected: 1});
    });

    it('TEST 8: dislikePost() por método PUT => un Posts', () => {
        service.dislikePost('2').subscribe( (resp: deleteTestResponse) => {
            expect(resp).toEqual({affected: 1});
        });
        const req = httpMock.expectOne(url+ '/dislike/2');
        expect(req.request.method).toBe('PUT');
        req.flush({affected: 1});
    });

});

/*
  likePost(postId: string): Observable<updateResponse> {
    return this.http
      .put<updateResponse>(this.urlBlogUocApi + '/like/' + postId, NONE_TYPE)
      .pipe(catchError(this.sharedService.handleError));
  }

  dislikePost(postId: string): Observable<updateResponse> {
    return this.http
      .put<updateResponse>(this.urlBlogUocApi + '/dislike/' + postId, NONE_TYPE)
      .pipe(catchError(this.sharedService.handleError));
  }
*/