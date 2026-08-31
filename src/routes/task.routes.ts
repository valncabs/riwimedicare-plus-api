// import { Router } from "express";
// import * as taskController from "../controllers/task.controller";
// import { authMiddleware } from "../middleware/auth.middleware";
// import { upload } from "../middleware/upload.middleware";

// const router = Router();

// router.use(authMiddleware);

// /**
//  * @swagger
//  * /tasks/import:
//  *   post:
//  *     summary: Import tasks from a TXT file
//  *     tags:
//  *       - Tasks
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - file
//  *             properties:
//  *               file:
//  *                 type: string
//  *                 format: binary
//  *                 description: TXT file containing the tasks to import
//  *     responses:
//  *       201:
//  *         description: Tasks imported successfully
//  *       400:
//  *         description: Invalid file or invalid task format
//  *       401:
//  *         description: User not authenticated
//  */
// router.post(
//     "/import",
//     upload.single("file"),
//     taskController.importTasks
// );

// /**
//  * @swagger
//  * /tasks:
//  *   post:
//  *     summary: Create a new task
//  *     description: Creates a new task for the authenticated user.
//  *     tags:
//  *       - Tasks
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - title
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 example: Learn Swagger
//  *               description:
//  *                 type: string
//  *                 example: Document the Task Management API
//  *               status:
//  *                 type: string
//  *                 example: pending
//  *     responses:
//  *       201:
//  *         description: Task created successfully
//  *       400:
//  *         description: Invalid task data
//  *       401:
//  *         description: User not authenticated
//  */
// router.post("/", taskController.createTask);


// /**
//  * @swagger
//  * /tasks:
//  *   get:
//  *     summary: Get all tasks
//  *     description: Returns all tasks belonging to the authenticated user.
//  *     tags:
//  *       - Tasks
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of tasks retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: "#/components/schemas/Task"
//  *       401:
//  *         description: User not authenticated
//  */
// router.get("/", taskController.getAllTasks);


// /**
//  * @swagger
//  * /tasks/{id}:
//  *   get:
//  *     summary: Get a task by ID
//  *     description: Returns a specific task belonging to the authenticated user.
//  *     tags:
//  *       - Tasks
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID of the task
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Task retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: "#/components/schemas/Task"
//  *       401:
//  *         description: User not authenticated
//  *       404:
//  *         description: Task not found
//  */
// router.get("/:id", taskController.getTaskById);


// /**
//  * @swagger
//  * /tasks/{id}:
//  *   put:
//  *     summary: Update a task
//  *     description: Updates an existing task belonging to the authenticated user.
//  *     tags:
//  *       - Tasks
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID of the task
//  *         example: 1
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 example: Learn Swagger
//  *               description:
//  *                 type: string
//  *                 example: Complete Swagger documentation
//  *               status:
//  *                 type: string
//  *                 example: completed
//  *     responses:
//  *       200:
//  *         description: Task updated successfully
//  *       400:
//  *         description: Invalid task data
//  *       401:
//  *         description: User not authenticated
//  *       404:
//  *         description: Task not found
//  */
// router.put("/:id", taskController.updateTask);


// /**
//  * @swagger
//  * /tasks/{id}:
//  *   delete:
//  *     summary: Delete a task
//  *     description: Deletes a task belonging to the authenticated user.
//  *     tags:
//  *       - Tasks
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID of the task
//  *         example: 1
//  *     responses:
//  *       200:
//  *         description: Task deleted successfully
//  *       401:
//  *         description: User not authenticated
//  *       404:
//  *         description: Task not found
//  */
// router.delete("/:id", taskController.deleteTask);


// export default router;