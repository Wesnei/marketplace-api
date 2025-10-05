export class CreateProductCommand {
  constructor(public readonly data: {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  }) {}
}
