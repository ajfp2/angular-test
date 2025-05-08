//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HeaderComponent } from "./header.component";



class TemporalComponentForRoutes {}
 

describe('HeaderComponent', () => {

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
                RouterTestingModule.withRoutes([{
                    path: 'home',

                    // En el component tendríamos que poner el HomeComponent, pero para no tener que importar todas las dependencias del HomeComponent y ensuciar así
                    // el test del HeaderComponent, lo que podemos hacer es crear una clase TemporalComponentsForRoutes 'vacia'.
                    component: TemporalComponentForRoutes,
                }])
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
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TEST 2: Carga correcta de los POST's
    it('should navigate to HOME', () => {
        // Declaramos el Router
        const router = TestBed.inject(Router);

        // Espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
        const spy = spyOn(router, 'navigateByUrl');
        // Ejecutamos el método home del HeaderComponent
        component.home();

        // Que esperamos???
        // Esperamos que se lance un 'navigateByUrl' con argumento home
        expect(spy).toHaveBeenCalledWith('home');
    });

    //it('test', () => {});
});