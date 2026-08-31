
import { Router } from "express";
import * as requestController from "../controllers/request.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Create a new request
 *     description: Creates a new medicine request. Requires authentication.
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clinicId
 *               - medicineId
 *               - warehouseId
 *               - quantity
 *             properties:
 *               clinicId:
 *                 type: integer
 *                 example: 1
 *               medicineId:
 *                 type: integer
 *                 example: 1
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Request created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: User not authenticated
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    requestController.createRequest
);


/**
 * @swagger
 * /requests:
 *   get:
 *     summary: Get all requests
 *     description: Returns all medicine requests. Requires authentication.
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Requests retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    requestController.getRequests
);


/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Get a request by ID
 *     description: Returns a specific medicine request. Requires authentication.
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the request
 *         example: 1
 *     responses:
 *       200:
 *         description: Request retrieved successfully
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 *       404:
 *         description: Request not found
 */
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    requestController.getRequest
);


/**
 * @swagger
 * /requests/{id}:
 *   put:
 *     summary: Update a request
 *     description: Updates an existing medicine request. Requires administrator role.
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the request
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clinicId:
 *                 type: integer
 *                 example: 1
 *               medicineId:
 *                 type: integer
 *                 example: 1
 *               warehouseId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 100
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - approved
 *                   - rejected
 *                   - completed
 *                 example: approved
 *     responses:
 *       200:
 *         description: Request updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Request not found
 */
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    requestController.updateRequest
);


/**
 * @swagger
 * /requests/{id}:
 *   delete:
 *     summary: Delete a request
 *     description: Deletes an existing medicine request. Requires administrator role.
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the request
 *         example: 1
 *     responses:
 *       200:
 *         description: Request deleted successfully
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Request not found
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    requestController.deleteRequest
);

export default router;

