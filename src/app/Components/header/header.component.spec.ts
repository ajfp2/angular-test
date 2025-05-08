//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header.component";



class TemporalComponentForRoutes {}
 

describe('2- Test Rutas: HeaderComponent', () => {

    // Variable component de tipo HeaderComponent
    let component: HeaderComponent;

    // 'fixture' para gestionar luego el componente.
    let fixture: ComponentFixture<HeaderComponent>;

    // Antes de cada test
    beforeEach(() => {
        // Configuración del test para un componente
        // Aquí tenemos que importar y vincular todas las dependenias 
        TestBed.configureTestingModule({
             // nos hace falta importar el módulo para testear rutas
            imports:  [

                // declaramos todas las rutas a testear
                RouterTestingModule.withRoutes([
                    {
                        path: 'home',
                        // En el component tendríamos que poner el HomeComponent, pero para no tener que importar todas las dependencias del HomeComponent 
                        // y ensuciar así el test del HeaderComponent, lo que podemos hacer es crear una clase TemporalComponentsForRoutes 'vacia'.
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'login',                        
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'register',                        
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'posts',                        
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'categories',                        
                        component: TemporalComponentForRoutes,
                    },
                    {
                        path: 'profile',                        
                        component: TemporalComponentForRoutes,
                    }
                    
            ])
            ],
            declarations: [ HeaderComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
        }).compileComponents();
    });


    // Antes de cada test: iniciamos el componente
    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        // hacemos que se instancie el componente y con el detectChanges es como si pasara por el ngOnInit
        fixture.detectChanges();
    });

    // TEST 1: Que se cree correctamente el componente
    it('TEST 1: Se debería crear el Componente', () => {
        expect(component).toBeTruthy();
    });

    // TEST 2: que naveguemos correctamente cuando se lance el método 'home' del componente HeaderComponent
    it('TEST 2: debería navegar al HOME', () => {
        // Declaramos el Router
        const router = TestBed.inject(Router);

        // Espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
        const spy = spyOn(router, 'navigateByUrl');
        // Ejecutamos el método home del HeaderComponent
        component.navigationTo('home');

        // Que esperamos???
        // Esperamos que se lance un 'navigateByUrl' con argumento home
        expect(spy).toHaveBeenCalledWith('home');
    });

    // TEST 3: navegación al LOGIN
    it('TEST 3: debería navegar al LOGIN', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigationTo('login');
        expect(spy).toHaveBeenCalledWith('login');
    });

    // TEST 4: navegación al register
    it('TEST 4: debería navegar al register', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigationTo('register');
        expect(spy).toHaveBeenCalledWith('register');
    });

    // TEST 5: navegación al LOGIN
    it('TEST 5: debería navegar a POSTS', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigationTo('posts');
        expect(spy).toHaveBeenCalledWith('posts');
    });

    // TEST 6: navegación al LOGIN
    it('TEST 6: debería navegar a CATEGORIES', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigationTo('categories');
        expect(spy).toHaveBeenCalledWith('categories');
    });

    // TEST 7: navegación al PROFILE
    it('TEST 7: debería navegar a PROFILE', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.navigationTo('profile');
        expect(spy).toHaveBeenCalledWith('profile');
    });
});