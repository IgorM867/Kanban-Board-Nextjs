export type Board = {
  id: string;
  name: string;
  board_order: number;
};

export type Column = {
  id: string;
  board_id: string;
  name: string;
  column_order: number;
  color: string;
};
export type Task = {
  id: string;
  title: string;
  description: string;
  column_id: string;
  done: boolean;
  task_order: number;
};
export type Subtask = {
  id: string;
  content: string;
  task_id: string;
  done: boolean;
  subtask_order: number;
};

export type TaskWithSubtasks = Task & { subtasks: Subtask[] };

export type ColumnWithTasks = Column & { tasks: TaskWithSubtasks[] };
