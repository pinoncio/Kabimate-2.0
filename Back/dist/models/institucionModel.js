"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Institucion = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
exports.Institucion = dbConnection_1.default.define('institucion', {
    'ID_INSTITUCION': { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    'NOMBRE_INSTITUCION': { type: sequelize_1.DataTypes.STRING },
    'TIPO_INSTITUCION': { type: sequelize_1.DataTypes.STRING },
    'ESTADO_INSTITUCION': { type: sequelize_1.DataTypes.BOOLEAN }
}, {
    timestamps: false,
    freezeTableName: true
});
