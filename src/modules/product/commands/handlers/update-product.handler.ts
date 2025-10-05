import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { UpdateProductCommand } from "../impl/update-product.command";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(command: UpdateProductCommand) {
        const { id, ...updateData } = command.data;

        const filteredData = Object.fromEntries(
            Object.entries(updateData).filter(([_, value]) => value !== undefined)
        );

        const product = await this.prismaService.product.update({
            where: { id },
            data: {
                ...filteredData,
                imageUrl: updateData.imageUrl ? updateData.imageUrl : undefined
            }
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return product;
    }
}
