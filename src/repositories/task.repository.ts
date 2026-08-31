// import Task from "../models/Task";

// export class TaskRepositoryImpl {

//     // async create(data: {
//         title: string;
//         description?: string;
//         userId: number;
//     }) {
//         return await Task.create(data);
//     }

//     async findAll() {
//         return await Task.findAll({
//             where: {
//                 status: "pending"
//             }
//         });
//     }

//     async findById(id: number) {
//         return await Task.findByPk(id);
//     }

//     async update(
//         id: number,
//         data: {
//             title?: string;
//             description?: string;
//             status?: string;
//         }
//     ) {
//         const task = await Task.findByPk(id);

//         if (!task) {
//             return null;
//         }

//         await task.update(data);

//         return task;
//     }

//     async delete(id: number) {
//         const task = await Task.findByPk(id);

//         if (!task) {
//             return null;
//         }

//         await task.update({
//             status: "deleted"
//         });

//         return task;
//     }
// }

