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
exports.createScreen = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const jimp_1 = __importDefault(require("jimp"));
const createScreen = () => __awaiter(void 0, void 0, void 0, function* () {
    const width = 200;
    const mousePos = robotjs_1.default.getMousePos();
    const pic = robotjs_1.default.screen.capture(mousePos.x - width / 2, mousePos.y - width / 2, width, width);
    const image = new jimp_1.default(width, width);
    image.bitmap.data = pic.image;
    let pos = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = pic.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = pic.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = pic.image.readUInt8(pos++);
        pos++;
        image.bitmap.data[idx + 3] = 255;
    });
    const buffer = yield image.getBase64Async(jimp_1.default.MIME_JPEG);
    return buffer.split(",")[1];
});
exports.createScreen = createScreen;
