CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS boards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    board_order SERIAL NOT NULL
);

CREATE TABLE IF NOT EXISTS columns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    column_order SERIAL NOT NULL
)

CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    column_id UUID NOT NULL REFERENCES columns(id) ON DELETE CASCADE,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    task_order SERIAL NOT NULL
)

CREATE TABLE IF NOT EXISTS subtasks(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    subtask_order SERIAL NOT NULL
)