import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Valentina
 *               email:
 *                 type: string
 *                 format: email
 *                 example: valentina@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid user data
 *       409:
 *         description: Email already registered
 */
router.post("/", userController.createUser);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns all users. Requires authentication and administrator role.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware([1,2]),
    userController.getUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Returns a specific user. Requires authentication and administrator role.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *         example: 1
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: User not found
 */
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware([1]),
    userController.getUser
);


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates an existing user. Requires authentication and administrator role.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Valery
 *               email:
 *                 type: string
 *                 format: email
 *                 example: valery@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewPassword123
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid user data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: User not found
 */
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware([1]),
    userController.updateUser
);


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user. Requires authentication and administrator role.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: User not found
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware([1]),
    userController.deleteUser
);



export default router