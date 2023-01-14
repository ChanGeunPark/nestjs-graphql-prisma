import { CreateTodoInput } from './create-todo.input';
declare const UpdateTodoInput_base: import("@nestjs/common").Type<Partial<CreateTodoInput>>;
export declare class UpdateTodoInput extends UpdateTodoInput_base {
    id: number;
    title: string;
}
export {};
