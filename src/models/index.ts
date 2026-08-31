import User from "./User";
import Role from "./Role";
import RefreshToken from "./RefreshToken";

import Clinic from "./Clinic";
import Warehouse from "./Warehouse";
import Medicine from "./Medicine";
import WarehouseMedicine from "./WarehouseMedicine";
import Request from "./Request";
import RequestHistory from "./RequestHistory";

// =========================
// Relaciones de User y Role
// =========================

Role.hasMany(User, {
    foreignKey: "roleId",
});

User.belongsTo(Role, {
    foreignKey: "roleId",
});

// =========================
// Relaciones de User y RefreshToken
// =========================

User.hasMany(RefreshToken, {
    foreignKey: "userId",
});

RefreshToken.belongsTo(User, {
    foreignKey: "userId",
});

// =========================
// Relaciones de Clinic y Request
// =========================

Clinic.hasMany(Request, {
    foreignKey: "clinicId",
});

Request.belongsTo(Clinic, {
    foreignKey: "clinicId",
});

// =========================
// Relaciones de Warehouse y Medicine
// =========================

Warehouse.hasMany(WarehouseMedicine, {
    foreignKey: "warehouseId",
});

WarehouseMedicine.belongsTo(Warehouse, {
    foreignKey: "warehouseId",
});

Medicine.hasMany(WarehouseMedicine, {
    foreignKey: "medicineId",
});

WarehouseMedicine.belongsTo(Medicine, {
    foreignKey: "medicineId",
});

// =========================
// Relaciones de Request
// =========================

Medicine.hasMany(Request, {
    foreignKey: "medicineId",
});

Request.belongsTo(Medicine, {
    foreignKey: "medicineId",
});

Warehouse.hasMany(Request, {
    foreignKey: "warehouseId",
});

Request.belongsTo(Warehouse, {
    foreignKey: "warehouseId",
});

// =========================
// Relaciones de RequestHistory
// =========================

Request.hasMany(RequestHistory, {
    foreignKey: "requestId",
});

RequestHistory.belongsTo(Request, {
    foreignKey: "requestId",
});

User.hasMany(RequestHistory, {
    foreignKey: "userId",
});

RequestHistory.belongsTo(User, {
    foreignKey: "userId",
});

// =========================
// Exportación de modelos
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