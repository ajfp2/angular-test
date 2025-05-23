import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CategoryService } from 'src/app/Services/category.service';

import { CategoriesListComponent } from './categories-list.component';
import { CategoryDTO } from 'src/app/Models/category.dto';
import { of } from "rxjs";
import { Router } from '@angular/router';


 

describe('EJERCICIO 4a- CategoriesListComponent', () => {

    const ruta = '/user/category/';

    // Variable component de tipo CategoriesListComponent
    let component: CategoriesListComponent;

    // 'fixture' para gestionar luego el componente.
    let fixture: ComponentFixture<CategoriesListComponent>;

    let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
    

    // Antes de cada test
    beforeEach(() => {
        const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['get']);

        // Configuración del test para un componente. Aquí tenemos que importar y vincular todas las dependenias          
        TestBed.configureTestingModule({
             // Aquí tenemos que importar el módulo para testear llamadas a una API pero de manera simulada
            imports:  [ HttpClientTestingModule ],

            // ponemos el/los componente/s a testear
            declarations: [ CategoriesListComponent ],

            // dependencias (normalmente los servicios que tenga inyectados el componente en su constructor)
            // en este caso solo nos haría falta inyectar el servicio CategoryService
            providers: [ CategoryService, {
                provide: LocalStorageService, useValue: localStorageServiceSpy
            } ],

            // se poner para evitar errores
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]

            // importante ejecutar el compileComponents
        }).compileComponents();

        mockLocalStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
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


    // TEST 2: Carga correcta de las Categorias
    it('TEST 2: loadCategories Suscripción creado con éxito', () => {

        const mockUserId = '1';
        const catService = fixture.debugElement.injector.get(CategoryService);

        mockLocalStorageService.get.and.returnValue(mockUserId);

        const mockListCatsVacia: CategoryDTO[] = [];
        const mockListCats: CategoryDTO[] = [{
            "categoryId": '23',
            "title": 'Test Cat',
            "description": 'Un test para una cat en angular',
            "css_color": '#ff0055',
            "userId": '1'
        }];

        // const spy = spyOn(catService, 'getCategoriesByUserId').and.returnValue(of(mockListCatsVacia));
        const spy2 = spyOn(catService, 'getCategoriesByUserId').and.returnValue(of(mockListCats));
        
        component['loadCategories']();
        
        expect(mockLocalStorageService.get).toHaveBeenCalledWith('user_id');
        // expect(spy).toHaveBeenCalledWith(mockUserId);
        expect(spy2).toHaveBeenCalledWith(mockUserId);
        // expect(component.categories.length).toBe(0);
        expect(component.categories).toEqual(mockListCats);
    });

    it('TEST 3: Llamada a navigateByURL en createCategory', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.createCategory();
        expect(spy).toHaveBeenCalledWith(ruta);
    });

    it('TEST 4: Llamada a navigateByURL en updateCategory', () => {
        const mockCatId = '1';
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.updateCategory(mockCatId);
        expect(spy).toHaveBeenCalledWith(ruta + mockCatId);
    });
});