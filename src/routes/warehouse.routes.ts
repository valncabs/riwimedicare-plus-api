
import { Router } from "express";
import * as warehouseController from "../controllers/warehouse.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: Create a new warehouse
 *     description: Creates a new warehouse. Requires authentication and administrator role.
 *     tags:
 *       - Warehouses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: Central Warehouse
 *               location:
 *                 type: string
 *                 example: Calle 72 #45-10
 *     responses:
 *       201:
 *         description: Warehouse created successfully
 *       400:
 *         description: Invalid warehouse data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    warehouseController.createWarehouse
);


/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: Get all warehouses
 *     description: Returns all warehouses. Requires authentication.
 *     tags:
 *       - Warehouses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Warehouses retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    warehouseController.getWarehouses
);


/**
 * @swagger
 * /warehouses/{id}:
 *   get:
 *     summary: Get a warehouse by ID
 *     description: Returns a specific warehouse by its ID. Requires authentication.
 *     tags:
 *       - Warehouses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the warehouse
 *         example: 1
 *     responses:
 *       200:
 *         description: Warehouse retrieved successfully
 *       400:
 *         description: Invalid warehouse ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 *       404:
 *         description: Warehouse not found
 */
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    warehouseController.getWarehouse
);


/**
 * @swagger
 * /warehouses/{id}:
 *   put:
 *     summary: Update a warehouse
 *     description: Updates an existing warehouse. Requires authentication and administrator role.
 *     tags:
 *       - Warehouses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the warehouse
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
 *                 example: Main Warehouse
 *               location:
 *                 type: string
 *                 example: Carrera 50 #80-20
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Warehouse updated successfully
 *       400:
 *         description: Invalid warehouse data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Warehouse not found
 */
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    warehouseController.updateWarehouse
);


/**
 * @swagger
 * /warehouses/{id}:
 *   delete:
 *     summary: Deactivate a warehouse
 *     description: Deactivates an existing warehouse instead of permanently deleting it. Requires authentication and administrator role.
 *     tags:
 *       - Warehouses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the warehouse
 *         example: 1
 *     responses:
 *       200:
 *         description: Warehouse deactivated successfully
 *       400:
 *         description: Invalid warehouse ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Warehouse not found
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    warehouseController.deleteWarehouse
);

export default router;

