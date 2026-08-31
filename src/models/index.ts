import User from "./User";
import Role from "./Role";
import RefreshToken from "./RefreshToken";

import Clinic from "./Clinic";
import Warehouse from "./Warehouse";
import Medicine from "./Medicine";
import WarehouseMedicine from "./WarehouseMedicine";
import Request from "./Request";
import RequestHistory from "./RequestHistory";

/**
 * Defines all Sequelize model relationships for the application.
 *
 * - User ↔ Role: Each user belongs to a role; a role can have many users.
 * - User ↔ RefreshToken: Each user can have multiple refresh tokens.
 * - Clinic ↔ Request: A clinic can make many requests; each request belongs to a clinic.
 * - Warehouse ↔ Medicine: Many-to-many relationship through WarehouseMedicine.
 * - Request ↔ Medicine/Warehouse: Each request is linked to a medicine and a warehouse.
 * - Request ↔ RequestHistory: A request can have multiple history records.
 * - User ↔ RequestHistory: Each history record is associated with a user.
 */

// =========================
// User and Role relationships
// =========================
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

// =========================
// User and RefreshToken relationships
// =========================
User.hasMany(RefreshToken, { foreignKey: "userId" });
RefreshToken.belongsTo(User, { foreignKey: "userId" });

// =========================
// Clinic and Request relationships
// =========================
Clinic.hasMany(Request, { foreignKey: "clinicId" });
Request.belongsTo(Clinic, { foreignKey: "clinicId" });

// =========================
// Warehouse and Medicine relationships
// =========================
Warehouse.hasMany(WarehouseMedicine, { foreignKey: "warehouseId" });
WarehouseMedicine.belongsTo(Warehouse, { foreignKey: "warehouseId" });

Medicine.hasMany(WarehouseMedicine, { foreignKey: "medicineId" });
WarehouseMedicine.belongsTo(Medicine, { foreignKey: "medicineId" });

// =========================
// Request relationships
// =========================
Medicine.hasMany(Request, { foreignKey: "medicineId" });
Request.belongsTo(Medicine, { foreignKey: "medicineId" });

Warehouse.hasMany(Request, { foreignKey: "warehouseId" });
Request.belongsTo(Warehouse, { foreignKey: "warehouseId" });

// =========================
// RequestHistory relationships
// =========================
Request.hasMany(RequestHistory, { foreignKey: "requestId" });
RequestHistory.belongsTo(Request, { foreignKey: "requestId" });

User.hasMany(RequestHistory, { foreignKey: "userId" });
RequestHistory.belongsTo(User, { foreignKey: "userId" });

// =========================
// Export models
// =========================
export {
    User,
    Role,
    RefreshToken,
    Clinic,
    Warehouse,
    Medicine,
    WarehouseMedicine,
    Request,
    RequestHistory,
};
