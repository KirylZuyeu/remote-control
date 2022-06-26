"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCircle = exports.drawRect = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const drawRect = (x, y) => {
    const mousePos = robotjs_1.default.getMousePos();
    robotjs_1.default.mouseToggle('down');
    for (let i = 0; i < x; i += 1) {
        robotjs_1.default.dragMouse(mousePos.x + i, mousePos.y);
    }
    for (let i = 0; i < y; i += 1) {
        robotjs_1.default.dragMouse(mousePos.x + x, mousePos.y + i);
    }
    for (let i = 0; i < x; i += 1) {
        robotjs_1.default.dragMouse(mousePos.x + x - i, mousePos.y + y);
    }
    for (let i = 0; i < y; i += 1) {
        robotjs_1.default.dragMouse(mousePos.x, mousePos.y + y - i);
    }
    robotjs_1.default.mouseToggle('up');
};
exports.drawRect = drawRect;
const drawCircle = (radius) => {
    const mousePos = robotjs_1.default.getMousePos();
    robotjs_1.default.mouseToggle('down');
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = mousePos.x + (radius * Math.cos(i));
        const y = mousePos.y + (radius * Math.sin(i));
        robotjs_1.default.dragMouse(x, y);
    }
    robotjs_1.default.mouseToggle('up');
};
exports.drawCircle = drawCircle;
