//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header.component";



class TemporalComponentForRoutes {}
 

describe('EJERCICIO 2- Test Rutas: HeaderComponent', () => {

    // Variable component de tipo HeaderComponent
    let component: HeaderComponent;

    // 'fixture' para gestionar luego el componente.
    let fixture: ComponentFixture<HeaderComponent>;

    const arrayRutas: string[] = ['home', 'login', 'register', 'posts', 'categories', 'profile']
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
    it('TEST 0: Se debería crear el Componente', () => {
        expect(component).toBeTruthy();
    });

    arrayRutas.forEach((ruta, i) => {
        // TEST Element: navegación al LOGIN
        it(`TEST ${i+1}: debería navegar al ${ ruta }`, () => {
            const router = TestBed.inject(Router);
            const spy = spyOn(router, 'navigateByUrl');
            component.navigationTo(ruta);
            expect(spy).toHaveBeenCalledWith(ruta);
        });
    });

});