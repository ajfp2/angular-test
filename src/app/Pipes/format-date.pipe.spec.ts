import { FormatDatePipe } from "./format-date.pipe";

describe('1- Test Pipe: FormatDatePipe', () => {
    // Declaramos la variable de tipo FormatDatePipe;
    let pipe: FormatDatePipe;    
    

    const date: Date = new Date('11/11/2011');
    const salidas: string[] = ['', '11112011', '11 / 11 / 2011', '11/11/2011', '2011-11-11'];

    // Declaramos de cada test la instancia
    beforeEach(() => {
        pipe = new FormatDatePipe();
    });

    // TEST 0: Que el pipe se cree correctamente
    it('TEST 0: Pipe DateFormat Creado', () => {
        expect(pipe).toBeTruthy();
    });


    for(let i = 1; i < 5; i++){
        // TEST i: Formato suma
        it('TEST '+ i +': Formato Salida ('+salidas[i]+')', () => {
                
            const result = pipe.transform(date , i);
            expect(result).toBe(salidas[i]);
        });
    }
    /*
    // TEST 2: Formato suma
    it('TEST 2: Suma (dd+mm+yyyy)', () => {
        
        const result = pipe.transform(date , 1);
        expect(result).toBe(salidas[0]);
    });

    // TEST 3: Format Barras espaciadas
    it('TEST 3: Barras espaciadas (dd / mm / yyyy)', () => {
        const result = pipe.transform(date , 2);
        expect(result).toBe(salidas[1]);
    });

    // TEST 4: Obtener el resultado esperado
    it('TEST 4: Barras (dd/mm/yyyy)', () => {
        const result = pipe.transform(date , 3);
        expect(result).toBe(salidas[2]);
    });

    // TEST 5: Obtener el resultado esperado
    it('TEST 5: Guiones (yyyy-mm-dd)', () => {
        const result = pipe.transform(date , 4);
        expect(result).toBe(salidas[3]);
    });
*/
});