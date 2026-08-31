// import { TaskRepositoryImpl } from "../repositories/task.repository";
// import fs from "fs/promises";
// import Task from "../models/Task";


// const taskRepository = new TaskRepositoryImpl();

// export const createTask = async (data: {
//     title: string;
//     // description?: string;
//     userId: number;
// }) => {
//     return await taskRepository.create(data);
// };

// export const getAllTasks = async () => {
//     return await taskRepository.findAll();
// };

// export const getTaskById = async (id: number) => {
//     const task = await taskRepository.findById(id);

//     if (!task) {
//         throw new Error("Tarea no encontrada");
//     }

//     return task;
// };

// export const updateTask = async (
//     id: number,
//     data: {
//         title?: string;
//         description?: string;
//         status?: string;
//     }
// ) => {
//     const task = await taskRepository.update(id, data);

//     if (!task) {
//         throw new Error("Tarea no encontrada");
//     }

//     return task;
// };

// export const deleteTask = async (id: number) => {
//     const task = await taskRepository.delete(id);

//     if (!task) {
//         throw new Error("Tarea no encontrada");
//     }

//     return task;
// };


// export const importTasks = async (
//     filePath: string,
//     userId: number
// ) => {

//     const content = await fs.readFile(filePath, "utf-8");

//     const lines = content
//         .split("\n")
//         .map(line => line.trim())
//         .filter(line => line.length > 0);

//     const tasks = lines.map((line, index) => {

//         const parts = line.split("|");

//         if (parts.length !== 3) {
//             throw new Error(
//                 `Formato inválido en la línea ${index + 1}`
//             );
//         }

//         const [title, description, status] = parts;

//         return {
//             title: title.trim(),
//             description: description.trim(),
//             status: status.trim(),
//             userId
//         };
//     });

//     const createdTasks = await Task.bulkCreate(tasks);

//     return createdTasks;
// };