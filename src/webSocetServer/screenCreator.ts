import robot from "robotjs";
import Jimp from "jimp";

export const createScreen = async () => {
    const width = 200;
    const mousePos = robot.getMousePos();
    
    const pic = robot.screen.capture(mousePos.x - width / 2, mousePos.y - width / 2, width, width);
    const image = new Jimp(width, width);
  
    image.bitmap.data = pic.image;
    let pos = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = pic.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = pic.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = pic.image.readUInt8(pos++);
        pos++
        image.bitmap.data[idx + 3] = 255;
    });
  
    const buffer = await image.getBase64Async(Jimp.MIME_JPEG);
    return buffer.split(",")[1];
  };