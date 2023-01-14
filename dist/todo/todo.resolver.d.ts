import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
export declare class TodoResolver {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(createTodoInput: CreateTodoInput): Promise<import(".prisma/client").Todo>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Todo[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TodoClient<import(".prisma/client").Todo, never>;
    updateTodo(updateTodoInput: UpdateTodoInput): import(".prisma/client").Prisma.Prisma__TodoClient<import(".prisma/client").Todo, never>;
    removeTodo(id: number): import(".prisma/client").Prisma.Prisma__TodoClient<import(".prisma/client").Todo, never>;
}
