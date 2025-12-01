export class CreatePizzaDto {
  nombre: string;
  descripcion: string;
  precio: number;
  stock?: number;   // opcional, por defecto 0
  imagen: string;
  demand?: number;  // opcional, por defecto 0
}
