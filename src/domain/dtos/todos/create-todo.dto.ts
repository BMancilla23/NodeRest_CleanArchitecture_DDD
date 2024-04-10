export class CreateTodoDto {
    // Constructor privado para evitar la creación directa de instancias fuera de la clase.
    private constructor(public readonly text: string){}

    // Método estático para crear una instancia de CreateTodoDto a partir de un conjunto de propiedades.
    static create(props: {[key:string]: any} ): [string?, CreateTodoDto?]{
        // Desestructura las propiedades para obtener el valor de 'text'.
        const {text} = props;

        // Verifica si 'text' está presente.
        if (!text) 
            // Si 'text' está ausente, devuelve un error y una instancia 'undefined' de CreateTodoDto.
            return ['Text property is required', undefined];

        // Si 'text' está presente, devuelve una instancia válida de CreateTodoDto.
        return [undefined, new CreateTodoDto(text)];
    }
}
