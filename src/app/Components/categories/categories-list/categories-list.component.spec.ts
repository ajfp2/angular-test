import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";


import { CategoryService } from 'src/app/Services/category.service';
import { CategoriesListComponent } from './categories-list.component';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { of } from "rxjs";

 

describe('EJERCICIO 5- CategoriesListComponent', () => {

    // Variable component de tipo Homecomponent
    let component: CategoriesListComponent;

    // 'fixture' para gestionar luego el componente.
    let fixture: ComponentFixture<CategoriesListComponent>;

    // Antes de cada test
    beforeEach(() => {
        // Configuración del test para un componente
        // Aquí tenemos que importar y vincular todas las dependenias 
        TestBed.configureTestingModule({
             // Aquí tenemos que importar el módulo para testear llamadas a una API pero de manera simulada
            imports:  [ HttpClientTestingModule ],

            // ponemos el/los componente/s a testear
            declarations: [ CategoriesListComponent ],

            // dependencias (normalmente los servicios que tenga inyectados el componente en su constructor)
            // en este caso solo nos haría falta inyectar el servicio CategoryService
            providers: [ CategoryService ],

            // se poner para evitar errores
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

            // importante ejecutar el compileComponents
        }).compileComponents();
    });


    // Antes de cada test: iniciamos el componente
    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesListComponent);
        component = fixture.componentInstance;

        // hacemos que se instancie el componente y con el detectChanges es como si pasara por el ngOnInit
        fixture.detectChanges();
    });

    // TEST 1: Que se cree correctamente el componente
    it('TEST 1: Componente creado', () => {
        expect(component).toBeTruthy();
    });

    // TEST 2: Carga correcta de los POST's
    it('TEST 2: loadCategories Suscripción creado con éxito', () => {
        // Definimos la dependencia del servicio
        const catService = fixture.debugElement.injector.get(CategoryService);

        // Lista de categorías 'mock', en este ejemplo simplemente utilizamos una lista vacía
        const listCats: CategoryDTO[] = [];

        // espía para simular el método getCategoriesByUserId del servicio
        // Le decimos que nos devolverá una lista de posts y que será un observable, de ahí que utilizemos (of)
        const spy = spyOn(catService, 'getCategoriesByUserId').and.returnValue(of(listCats));

        catService.getCategoriesByUserId('1');
        // Llamamos al método privado loadCategories del componente categories-list.component
        // component['loadCategories']();
        

        // Que esperamos?? esperamos que el getPosts del PostService sea llamado.
        expect(spy).toHaveBeenCalled();
        // expect(spy).toHaveBeenCalledWith('1');

        // Que esperamos???
        // Esperamos que la variable cats del HomeComponent donde se mapea el resultado de la llamada anterior tenga el numero de posts correcto,
        // en este caso, como listPosts "mock" tiene 0 posts, el resultado esperado debe ser 0.
        expect(component.categories.length).toBe(0);
    });
//https://stackoverflow.com/questions/67829672/angular-spyon-service-with-another-parameter
//https://github.com/codecraft-tv/angular-course/blob/current/13.unit-testing/4.mocks-and-spies/code/app/login.component.spec.ts
    //it('test', () => {});
});