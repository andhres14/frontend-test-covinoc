export class TaskModel {

  constructor(
    public title: string,
    public state: boolean,
    public createdAt: Date = new Date(),
    public id: number = null
  ) {
  }

  get isCompleted(): boolean {
    return this.state;
  }
}
