export class UpdateTodoDto {
    // Constructor privado para evitar la creación directa de instancias fuera de la clase.
    private constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly completedAt?: Date,
    ) { }

    // Método getter que devuelve un objeto con las propiedades no nulas del DTO.
    get values(){
        const returnObj: {[key: string]: any} = {};

        // Agrega 'text' al objeto de retorno si no es nulo.
        if (this.text) returnObj.text = this.text;
        // Agrega 'completedAt' al objeto de retorno si no es nulo.
        if (this.completedAt) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    // Método estático para crear una instancia de UpdateTodoDto a partir de un conjunto de propiedades.
    static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        // Desestructura las propiedades para obtener los valores de 'id', 'text' y 'completedAt'.
        const {id, text, completedAt } = props;
        let newCompletedAt = completedAt;

        // Verifica si 'id' es válido.
        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number']
        }

        // Verifica si 'completedAt' está presente y trata de convertirlo a un objeto Date.
        if (completedAt) {
            newCompletedAt = new Date(completedAt)
            // Verifica si el nuevo 'completedAt' es una fecha válida.
            if (newCompletedAt.toString() === 'Invalid Date') {
                return ['CompletedAt must be a valid date']
            }
        }

        // Devuelve una instancia válida de UpdateTodoDto junto con un mensaje de error opcional.
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}

