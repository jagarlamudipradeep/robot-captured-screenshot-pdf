import * as fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import PDFDocument from "pdfkit";
import robot from "robotjs";
import sharp from "sharp";

function createOutputFolder(folder) {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
  } catch (err) {
    console.error(`Error creating output folder "${folder}":`, err);
    process.exit(1);
  }
}

async function saveScreenshotsToPDF(numberOfPages, captureArea, outputFolder, nameOfPdf, applySharpening = false) {
  const doc = new PDFDocument({ autoFirstPage: false });
  const pdfPath = path.join(outputFolder, `${nameOfPdf}.pdf`);
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  try {
    for (let page = 1; page <= numberOfPages; page++) {
      const screenshot = robot.screen.capture(
        captureArea.x,
        captureArea.y,
        captureArea.width,
        captureArea.height
      );

      const png = new PNG({
        width: captureArea.width,
        height: captureArea.height,
      });

      for (let y = 0; y < screenshot.height; y++) {
        for (let x = 0; x < screenshot.width; x++) {
          const index = (y * screenshot.width + x) * 4;
          png.data[index] = screenshot.image[index];
          png.data[index + 1] = screenshot.image[index + 1];
          png.data[index + 2] = screenshot.image[index + 2];
          png.data[index + 3] = screenshot.image[index + 3];
        }
      }

      const buffer = PNG.sync.write(png);

      let sharpBuffer = buffer;
      if (applySharpening) {
        sharpBuffer = await sharp(buffer).sharpen().toBuffer();
      }

      doc.addPage({ size: [captureArea.width, captureArea.height] });
      doc.image(sharpBuffer, 0, 0);

      robot.keyTap("right");

      await new Promise(function (resolve) {
        setTimeout(resolve, 2000);
      });
    }

    doc.end();

    console.log("Screenshots saved as PDF:", pdfPath);
  } catch (err) {
    console.error("Error saving screenshots to PDF:", err);
    doc.end();
    process.exit(1);
  }
}

function setTimeoutForPDF(numberOfPages, captureArea, outputFolder, nameOfPdf, initialWaitInSeconds, applySharpening) {
  setTimeout(() => {
    saveScreenshotsToPDF(numberOfPages, captureArea, outputFolder, nameOfPdf, applySharpening);
  }, initialWaitInSeconds * 1000);
}

function main() {
  const numberOfPages = 10;
  const captureArea = { x: 606, y: 0, width: 801, height: 1058 };
  const initialWaitInSeconds = 10;
  const outputFolder = "pdfs";
  const nameOfPdf = "screenshots";
  const applySharpening = true;

  createOutputFolder(outputFolder);
  setTimeoutForPDF(numberOfPages, captureArea, outputFolder, nameOfPdf, initialWaitInSeconds, applySharpening);
}

main();
