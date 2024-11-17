import { PrismaService } from "src/database/prisma.service";
import { CreatePayableDto } from "./dto/create-payable.dto";
import { UpdatePayableDto } from "./dto/update-payable.dto";
import { Payable } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PayableRepository {
    constructor(private prisma: PrismaService) {}

    async create(createPayableDto: CreatePayableDto) {
        return this.prisma.payable.create({
            data: {...createPayableDto} as Payable
        })
    }

    async findAll() {
        return this.prisma.payable.findMany();
    }

    async findOne(id: string) {
        return this.prisma.payable.findUnique({
            where: { id }
        })
    }

    async update(id: string, updatePayableDto: UpdatePayableDto) {
        return this.prisma.payable.update({
            where: { id },
            data: updatePayableDto
        })
    }

    async remove(id: string) {
        return this.prisma.payable.delete({
            where: { id }
        })
    }   
}