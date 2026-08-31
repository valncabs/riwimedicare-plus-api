
import { Router } from "express";
import * as requestHistoryController from "../controllers/requestHistory.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /request-history:
 *   post:
 *     summary: Create a request history record
 *     description: Creates a new request history record. Requires authentication and administrator role.
 *     tags:
 *       - Request History
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *               - status
 *             properties:
 *               requestId:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: approved
 *     responses:
 *       201:
 *         description: Request history created successfully
 *       400:
 *         description: Invalid request history data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    requestHistoryController.createRequestHistory
);


/**
 * @swagger
 * /request-history:
 *   get:
 *     summary: Get all request history
 *     description: Returns all request history records. Requires authentication.
 *     tags:
 *       - Request History
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request history retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    requestHistoryController.getRequestHistory
);


/**
 * @swagger
 * /request-history/{id}:
 *   get:
 *     summary: Get request history by ID
 *     description: Returns a specific request history record. Requires authentication.
 *     tags:
 *       - Request History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the request history
 *         example: 1
 *     responses:
 *       200:
 *         description: Request history retrieved successfully
 *       400:
 *         description: Invalid history ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 *       404:
 *         description: Request history not found
 */
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    requestHistoryController.getRequestHistoryById
);


/**
 * @swagger
 * /request-history/request/{requestId}:
 *   get:
 *     summary: Get history by request ID
 *     description: Returns all history records for a specific request. Requires authentication.
 *     tags:
 *       - Request History
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the request
 *         example: 1
 *     responses:
 *       200:
 *         description: Request history retrieved successfully
 *       400:
 *         description: Invalid request ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 */
router.get(
    "/request/:requestId",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    requestHistoryController.getHistoryByRequestId
);

export default router;

