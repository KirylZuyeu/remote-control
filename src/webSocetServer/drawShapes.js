import robot from 'robotjs';

export const drawRect = (x, y) => {
    const mousePos = robot.getMousePos();
    robot.mouseToggle('down');
    for (let i = 0; i < x; i += 1) {
      robot.dragMouse(mousePos.x + i, mousePos.y);
    }
    for (let i = 0; i < y; i += 1) {
      robot.dragMouse(mousePos.x + x, mousePos.y + i);
    }
    for (let i = 0; i < x; i += 1) {
      robot.dragMouse(mousePos.x + x - i, mousePos.y + y);
    }
    for (let i = 0; i < y; i += 1) {
      robot.dragMouse(mousePos.x, mousePos.y + y - i);
    }
    robot.mouseToggle('up');
};

export const drawCircle = (radius) => {
    const mousePos = robot.getMousePos();
    robot.mouseToggle('down');
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = mousePos.x + (radius * Math.cos(i));
        const y = mousePos.y + (radius * Math.sin(i));
        robot.dragMouse(x, y);
    }
    robot.mouseToggle('up');
  };