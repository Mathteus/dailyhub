import { ICreateTask, TaskRepository } from "@/database/tasks.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateTask {
	constructor(private readonly database: TaskRepository) {}

  public async execute(task: ICreateTask) {
    try {
      

      await this.database.create(task);
    } catch (err) {
      throw err;
    }
  }
}