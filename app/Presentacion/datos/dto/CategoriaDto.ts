import { Categoria } from "App/Dominio/Datos/Entidades/Categoria";

export class CategoriaDto {
    id: string;
    nombre: string;
    estado:boolean;
}

// Converts JSON strings to/from your types
export class TranslateCategoria {
    public static toCategoriaFromString(json: string): Categoria {
        return JSON.parse(json);
    }

    public static categoriaToJson(value: Categoria): string {
        return JSON.stringify(value);
    }
}