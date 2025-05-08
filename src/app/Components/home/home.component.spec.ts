import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { PostService } from "src/app/Services/post.service";
import { HomeComponent } from "./home.component";

import { PostDTO } from "src/app/Models/post.dto";
import { of } from "rxjs";

 

describe('HomeComponent', () => {

    // Variable component de tipo Homecomponent
    let component: HomeComponent;

    // 'fixture' para gestionar luego el componente.
    let fixture: ComponentFixture<HomeComponent>;

    // Antes de cada test
    beforeEach(() => {
        // Configuración del test para un componente
        // Aquí tenemos que importar y vincular todas las dependenias 
        TestBed.configureTestingModule({
             // Aquí tenemos que importar el módulo para testear llamadas a una API pero de manera simulada
            imports:  [ HttpClientTestingModule ],

            // ponemos el/los componente/s a testear
            declarations: [ HomeComponent ],

            // dependencias (normalmente los servicios que tenga inyectados el componente en su constructor)
            // en este caso solo nos haría falta inyectar el servicio PostService
            providers: [ PostService ],

            // se poner para evitar errores
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

            // importante ejecutar el compileComponents
        }).compileComponents();
    });


    // Antes de cada test: iniciamos el componente
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;

        // hacemos que se instancie el componente y con el detectChanges es como si pasara por el ngOnInit
        fixture.detectChanges();
    });

    // TEST 1: Que se cree correctamente el componente
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TEST 2: Carga correcta de los POST's
    it('loadPosts success from subscription', () => {
        // Definimos la dependencia del servicio
        const postService = fixture.debugElement.injector.get(PostService);

        // Lista de posts 'mock', en este ejemplo simplemente utilizamos una lista vacía
        const listPosts: PostDTO[] = [];

        // espía para simular el método getPosts del servicio
        // Le decimos que nos devolverá una lista de posts y que será un observable, de ahí que utilizemos (of)
        const spy = spyOn(postService, 'getPosts').and.returnValue(of(listPosts));

        // Llamamos al método privado loadPosts del componente HomeComponent
        component['loadPosts']();

        // Que esperamos?? esperamos que el getPosts del PostService sea llamado.
        expect(spy).toHaveBeenCalled();

        // Que esperamos???
        // Esperamos que la variable posts del HomeComponent donde se mapea el resultado de la llamada anterior tenga el numero de posts correcto,
        // en este caso, como listPosts "mock" tiene 0 posts, el resultado esperado debe ser 0.
        expect(component.posts.length).toBe(0);
    });

    //it('test', () => {});
});