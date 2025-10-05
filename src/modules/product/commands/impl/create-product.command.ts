export class CreateProductCommand {
  constructor(public readonly data: {
    name: string;
    description: string;
    imageUrl?: string; // Make imageUrl optional
    price: number;
  }) {}
}