import { AccountEntity } from '../../accounts/dtos/account.entity';

export enum TaskStatus {
	Pending = 'pendente',
	Completed = 'completa',
	Canceled = 'cancelada',
	Doing = 'fazendo',
}

export interface ITaskEntity {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	status: TaskStatus;
	account: AccountEntity;
}

export interface ITaskCreateEntity {
	id?: string;
	name: string;
	account: AccountEntity;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
	status?: TaskStatus;
}

export class TaskEntity {
	private _task: ITaskEntity;

	constructor(task: ITaskCreateEntity) {
		const identifier = task.id || '';
		const description = task.description || '';
		const createdAt = task.createdAt || new Date();
		const updatedAt = task.updatedAt || createdAt;
		const status = task.status || TaskStatus.Pending;
		this._task = {
			id: identifier,
			name: task.name,
			description,
			createdAt,
			updatedAt,
			status,
			account: task.account,
		};
	}

	get id(): string {
		return this._task.id;
	}

	get name(): string {
		return this._task.name;
	}

	get description(): string {
		return this._task.description;
	}

	get createdAt(): Date {
		return this._task.createdAt;
	}

	get updatedAt(): Date {
		return this._task.updatedAt;
	}

	get status(): TaskStatus {
		return this._task.status;
	}

	get account(): AccountEntity {
		return this._task.account;
	}
}
