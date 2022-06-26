"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMessage = void 0;
const parseMessage = (wsMessage) => {
    const [command, params1, params2] = wsMessage.toString().split(' ');
    return {
        command,
        firstPar: +params1,
        secondPar: +params2
    };
};
exports.parseMessage = parseMessage;
