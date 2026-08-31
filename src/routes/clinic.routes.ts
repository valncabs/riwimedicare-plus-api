
import { Router } from "express";
import * as clinicController from "../controllers/clinic.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /clinics:
 *   post:
 *     summary: Create a new clinic
 *     description: Creates a new clinic. Requires authentication and administrator role.
 *     tags:
 *       - Clinics
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
 *               - nit
 *               - address
 *               - phone
 *               - responsible
 *             properties:
 *               name:
 *                 type: string
 *                 example: Clínica Central
 *               nit:
 *                 type: string
 *                 example: 900123456-7
 *               address:
 *                 type: string
 *                 example: Calle 72 #45-10
 *               phone:
 *                 type: string
 *                 example: "3001234567"
 *               responsible:
 *                 type: string
 *                 example: María González
 *     responses:
 *       201:
 *         description: Clinic created successfully
 *       400:
 *         description: Invalid clinic data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    clinicController.createClinic
);


/**
 * @swagger
 * /clinics:
 *   get:
 *     summary: Get all clinics
 *     description: Returns all clinics. Requires authentication.
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clinics retrieved successfully
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 */
router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    clinicController.getAllClinics
);


/**
 * @swagger
 * /clinics/{id}:
 *   get:
 *     summary: Get a clinic by ID
 *     description: Returns a specific clinic by its ID. Requires authentication.
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the clinic
 *         example: 1
 *     responses:
 *       200:
 *         description: Clinic retrieved successfully
 *       400:
 *         description: Invalid clinic ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied
 *       404:
 *         description: Clinic not found
 */
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin", "user"]),
    clinicController.getClinicById
);


/**
 * @swagger
 * /clinics/{id}:
 *   put:
 *     summary: Update a clinic
 *     description: Updates an existing clinic. Requires authentication and administrator role.
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the clinic
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
 *                 example: Clínica Central
 *               nit:
 *                 type: string
 *                 example: 900123456-7
 *               address:
 *                 type: string
 *                 example: Calle 72 #45-10
 *               phone:
 *                 type: string
 *                 example: "3001234567"
 *               responsible:
 *                 type: string
 *                 example: María González
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Clinic updated successfully
 *       400:
 *         description: Invalid clinic data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Clinic not found
 */
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    clinicController.updateClinic
);


/**
 * @swagger
 * /clinics/{id}:
 *   delete:
 *     summary: Deactivate a clinic
 *     description: Deactivates an existing clinic instead of permanently deleting it. Requires authentication and administrator role.
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the clinic
 *         example: 1
 *     responses:
 *       200:
 *         description: Clinic deactivated successfully
 *       400:
 *         description: Invalid clinic ID
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 *       404:
 *         description: Clinic not found
 */
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    clinicController.deleteClinic
);

export default router;

