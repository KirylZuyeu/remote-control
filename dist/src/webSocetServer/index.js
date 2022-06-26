"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWSServer = void 0;
const ws_1 = require("ws");
const parseMessage_1 = require("./parseMessage");
const robotjs_1 = __importDefault(require("robotjs"));
const drawShapes_1 = require("./drawShapes");
const screenCreator_1 = require("./screenCreator");
const SOCER_PORT = 8080;
const startWSServer = () => {
    const wsServer = new ws_1.WebSocketServer({ port: SOCER_PORT });
    console.log(`WebSocet was created on PORT:${SOCER_PORT}!`);
    wsServer.on('connection', ws => {
        ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
            let data = (0, parseMessage_1.parseMessage)(message);
            let command = data.command;
            let step = data.firstPar;
            let size = data.secondPar;
            const { x, y } = robotjs_1.default.getMousePos();
            switch (command) {
                case 'mouse_up':
                    robotjs_1.default.moveMouse(x, y - step);
                    break;
                case 'mouse_down':
                    robotjs_1.default.moveMouse(x, y + step);
                    break;
                case 'mouse_left':
                    robotjs_1.default.moveMouse(x - step, y);
                    break;
                case 'mouse_right':
                    robotjs_1.default.moveMouse(x + step, y);
                    break;
                case 'mouse_position':
                    break;
                case 'draw_circle':
                    (0, drawShapes_1.drawCircle)(step);
                    break;
                case 'draw_rectangle':
                    (0, drawShapes_1.drawRect)(step, size);
                    break;
                case 'draw_square':
                    (0, drawShapes_1.drawRect)(step, step);
                    break;
                case 'prnt_scrn':
                    const screen = yield (0, screenCreator_1.createScreen)();
                    ws.send(`${command} ${screen} \0`);
                    break;
                default:
                    console.log('Incorrect input!');
                    break;
            }
            if (command !== 'prnt_scrn') {
                ws.send(`${command} ${x},${y} \0`);
            }
        }));
        ws.on('close', () => {
            console.log(`WebSocet was stoped.`);
        });
        ws.on('error', () => {
            console.log(`WebSocet has error.`);
            ws.close();
        });
    });
};
exports.startWSServer = startWSServer;
