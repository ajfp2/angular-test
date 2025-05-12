import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { LocalStorageService } from 'src/app/Services/local-storage.service';

import { PostsListComponent } from './posts-list.component';
import { PostService } from 'src/app/Services/post.service';
import { PostDTO } from 'src/app/Models/post.dto';

import { of } from "rxjs";
import { Router } from '@angular/router';


 

describe('EJERCICIO 4b- PostListComponent', () => {

    const ruta = '/user/post/';

    // Variable component de tipo PostsListComponent
    let component: PostsListComponent;

    // 'fixture' para gestionar luego el componente.
    let fixture: ComponentFixture<PostsListComponent>;

    let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
    

    // Antes de cada test
    beforeEach(() => {
        const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['get']);

        // Configuración del test para un componente. Aquí tenemos que importar y vincular todas las dependenias          
        TestBed.configureTestingModule({
             // Aquí tenemos que importar el módulo para testear llamadas a una API pero de manera simulada
            imports:  [ HttpClientTestingModule ],

            // ponemos el/los componente/s a testear
            declarations: [ PostsListComponent ],

            // dependencias (normalmente los servicios que tenga inyectados el componente en su constructor)
            // en este caso solo nos haría falta inyectar el servicio CategoryService
            providers: [ PostService, { provide: LocalStorageService, useValue: localStorageServiceSpy } ],

            // se poner para evitar errores
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

            // importante ejecutar el compileComponents
        }).compileComponents();

        mockLocalStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    });


    // Antes de cada test: iniciamos el componente
    beforeEach(() => {
        fixture = TestBed.createComponent(PostsListComponent);
        component = fixture.componentInstance;

        // hacemos que se instancie el componente y con el detectChanges es como si pasara por el ngOnInit
        fixture.detectChanges();
    });

    // TEST 1: Que se cree correctamente el componente
    it('TEST 1: Componente creado', () => {
        expect(component).toBeTruthy();
    });


    it('TEST 2: loadPosts Suscripción creado con éxito', () => {

        const mockUserId = '1';
        const postService = fixture.debugElement.injector.get(PostService);

        mockLocalStorageService.get.and.returnValue(mockUserId);

        const mockListPostVacia: PostDTO[] = [];
        const mockListPost: PostDTO[] = [{
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

        // const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(of(mockListPostVacia));
        const spy2 = spyOn(postService, 'getPostsByUserId').and.returnValue(of(mockListPost));
        
        component['loadPosts']();
        
        expect(mockLocalStorageService.get).toHaveBeenCalledWith('user_id');
        // expect(spy).toHaveBeenCalledWith(mockUserId);
        expect(spy2).toHaveBeenCalledWith(mockUserId);
        // expect(component.posts.length).toBe(0);
        expect(component.posts).toEqual(mockListPost);
    });

    it('TEST 3: Llamada a navigateByURL en createPost', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.createPost();
        expect(spy).toHaveBeenCalledWith(ruta);
    });

    it('TEST 4: Llamada a navigateByURL en updatePost', () => {
        const mockPostId = '1';
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.updatePost(mockPostId);
        expect(spy).toHaveBeenCalledWith(ruta + mockPostId);
    });
});