import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
export declare class TodoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTodoInput: CreateTodoInput): Promise<import(".prisma/client").Todo>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Todo[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TodoClient<import(".prisma/client").Todo, never>;
    update(id: number, updateTodoInput: UpdateTodoInput): import(".prisma/client").Prisma.Prisma__TodoClient<import(".prisma/client").Todo, never>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TodoClient<import(".prisma/client").Todo, never>;
}
