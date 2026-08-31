import { Router } from "express";
import * as seedController from "../controllers/seed.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

/**
 * @swagger
 * /seed:
 *   post:
 *     summary: Seed database using a JSON file
 *     description: Uploads a JSON file and uses its data to populate the database. Requires authentication and administrator role.
 *     tags:
 *       - Seed
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: JSON file containing the initial database data
 *     responses:
 *       201:
 *         description: Database seeded successfully
 *       400:
 *         description: Invalid JSON file or seed data
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: Access denied. Administrator role required
 */
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    upload.single("file"),
    seedController.seedDatabase
);

export default router;