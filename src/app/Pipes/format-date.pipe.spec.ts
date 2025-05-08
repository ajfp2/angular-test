import { FormatDatePipe } from "./format-date.pipe";

describe('FormatDatePipe', () => {
    // Declaramos la variable de tipo FormatDatePipe;
    let pipe: FormatDatePipe;

    // Declaramos de cada test la instancia
    beforeEach(() => {
        pipe = new FormatDatePipe();
    });

    // TEST 1: Que el pipe se cree correctamente
    it('should create PIPE', () => {
        expect(pipe).toBeTruthy();
    });

    // TEST 2: Obtener el resultado esperado
    it('format pipe success', () => {
        let date: Date = new Date('08/05/2025');
        const result = pipe.transform(date);
        expect(result).toBe('');
    });

});