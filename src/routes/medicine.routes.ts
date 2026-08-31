
import { Router } from "express";
import * as medicineController from "../controllers/medicine.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /medicines:
 *   post:
 *     summary: Create a new medicine
 *     description: Creates a new medicine. Requires authentication and administrator role.
 *     tags:
 *       - Medicines
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Acetaminophen
 *               description:
 *                 type: string
 *                 example: Pain reliever and fever reducer
 *     responses:
 *       201:
 *         description: Medicine created successfully
 *       400:
 *         description: Invalid medicine data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    medicineController.createMedicine
);


/**
 * @swagger
 * /medicines:
 *   get:
 *     summary: Get all medicines
 *     description: Returns all active medicines. Requires authentication.
 *     tags:
 *       - Medicines
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Medicines retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    medicineController.getMedicines
);


/**
 * @swagger
 * /medicines/{id}:
 *   get:
 *     summary: Get a medicine by ID
 *     description: Returns a specific active medicine. Requires authentication.
 *     tags:
 *       - Medicines
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the medicine
 *         example: 1
 *     responses:
 *       200:
 *         description: Medicine retrieved successfully
 *       400:
 *         description: Invalid medicine ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 *       404:
 *         description: Medicine not found
 */
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    medicineController.getMedicine
);


/**
 * @swagger
 * /medicines/{id}:
 *   put:
 *     summary: Update a medicine
 *     description: Updates an existing medicine. Requires authentication and administrator role.
 *     tags:
 *       - Medicines
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Acetaminophen
 *               description:
 *                 type: string
 *                 example: Pain reliever and fever reducer
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Medicine updated successfully
 *       400:
 *         description: Invalid medicine data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Medicine not found
 */
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    medicineController.updateMedicine
);


/**
 * @swagger
 * /medicines/{id}:
 *   delete:
 *     summary: Deactivate a medicine
 *     description: Deactivates an existing medicine instead of permanently deleting it. Requires authentication and administrator role.
 *     tags:
 *       - Medicines
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the medicine
 *         example: 1
 *     responses:
 *       200:
 *         description: Medicine deactivated successfully
 *       400:
 *         description: Invalid medicine ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Medicine not found
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    medicineController.deleteMedicine
);

export default router;
