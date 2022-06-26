import { WebSocketServer } from 'ws';
import { parseMessage } from './parseMessage'
import robot from 'robotjs';
import { drawRect, drawCircle } from './drawShapes'
import { createScreen } from './screenCreator'

const SOCER_PORT = 8080;

export const startWSServer = () => {
    const wsServer = new WebSocketServer({port: SOCER_PORT});
    console.log(`WebSocet was created on PORT:${SOCER_PORT}!`);
    wsServer.on('connection', ws => {
        ws.on('message', async (message) => {
            let data = parseMessage(message);
            let command = data.command;
            let step = data.firstPar;
            let size = data.secondPar;
            const { x, y } = robot.getMousePos();
            switch (command) {
                case 'mouse_up':
                    robot.moveMouse(x, y - step);
                    break;
                case 'mouse_down':
                    robot.moveMouse(x, y + step);
                    break;
                case 'mouse_left':
                    robot.moveMouse(x - step, y);
                    break;
                case 'mouse_right':
                    robot.moveMouse(x + step, y);
                    break;
                case 'mouse_position':
                    break;
                case 'draw_circle':
                    drawCircle(step);
                    break;
                case 'draw_rectangle':
                    drawRect(step, size);
                    break;
                case 'draw_square':
                    drawRect(step, step);
                    break;
                case 'prnt_scrn': 
                    const screen = await createScreen();
                    ws.send(`${command} ${screen} \0`)
                    break;
                default:
                    console.log('Incorrect input!');
                    break;
            }
            if (command !== 'prnt_scrn') {
                ws.send(`${command} ${x},${y} \0`)
            }
        });

        ws.on('close', () => {
            console.log(`WebSocet was stoped.`)
        });

        ws.on('error', () => {
            console.log(`WebSocet has error.`);
            ws.close();  
        });
    });
}
