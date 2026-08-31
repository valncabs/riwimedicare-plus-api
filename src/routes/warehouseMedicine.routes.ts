
import { Router } from "express";
import * as warehouseMedicineController from "../controllers/warehouseMedicine.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /warehouses/{warehouseId}/medicines:
 *   post:
 *     summary: Add a medicine to a warehouse
 *     description: Adds a medicine to a warehouse with an initial stock. Requires authentication and administrator role.
 *     tags:
 *       - Warehouse Medicines
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: warehouseId
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
 *             required:
 *               - medicineId
 *               - stock
 *             properties:
 *               medicineId:
 *                 type: integer
 *                 example: 1
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Medicine added to warehouse successfully
 *       400:
 *         description: Invalid warehouse medicine data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 */
router.post(
    "/:warehouseId/medicines",
    authMiddleware,
    roleMiddleware(["admin"]),
    warehouseMedicineController.createWarehouseMedicine
);


/**
 * @swagger
 * /warehouses/{warehouseId}/medicines:
 *   get:
 *     summary: Get medicines in a warehouse
 *     description: Returns all medicines and their stock in a warehouse. Requires authentication.
 *     tags:
 *       - Warehouse Medicines
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the warehouse
 *         example: 1
 *     responses:
 *       200:
 *         description: Warehouse medicines retrieved successfully
 *       400:
 *         description: Invalid warehouse ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 */
router.get(
    "/:warehouseId/medicines",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    warehouseMedicineController.getWarehouseMedicines
);


/**
 * @swagger
 * /warehouses/{warehouseId}/medicines/{medicineId}:
 *   put:
 *     summary: Update medicine stock
 *     description: Updates the stock of a medicine in a warehouse. Requires authentication and administrator role.
 *     tags:
 *       - Warehouse Medicines
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the warehouse
 *         example: 1
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the medicine
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stock
 *             properties:
 *               stock:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Medicine stock updated successfully
 *       400:
 *         description: Invalid warehouse medicine data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Medicine not found in warehouse
 */
router.put(
    "/:warehouseId/medicines/:medicineId",
    authMiddleware,
    roleMiddleware(["admin"]),
    warehouseMedicineController.updateWarehouseMedicine
);


/**
 * @swagger
 * /warehouses/{warehouseId}/medicines/{medicineId}:
 *   delete:
 *     summary: Remove a medicine from a warehouse
 *     description: Removes a medicine from a warehouse. Requires authentication and administrator role.
 *     tags:
 *       - Warehouse Medicines
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the warehouse
 *         example: 1
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the medicine
 *         example: 1
 *     responses:
 *       200:
 *         description: Medicine removed from warehouse successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Medicine not found in warehouse
 */
router.delete(
    "/:warehouseId/medicines/:medicineId",
    authMiddleware,
    roleMiddleware(["admin"]),
    warehouseMedicineController.deleteWarehouseMedicine
);

export default router;

