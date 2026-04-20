import { AccountEntity } from "@/domains/accounts/dtos/account.entity";
import { TaskEntity, TaskStatus } from "@/domains/kanban/dtos/taks.entity";

export interface ICreateTask {
  name: string;
  description?: string;
  account: AccountEntity;
  status?: TaskStatus;
}

export abstract class TaskRepository {
  public abstract create(task: ICreateTask): Promise<void>;
  public abstract deleteById(taskId: string): Promise<void>;
  public abstract searchById(taskId: string): Promise<TaskEntity>;
  public abstract searchAllByAccountId(accountId: string): Promise<TaskEntity[]>
}