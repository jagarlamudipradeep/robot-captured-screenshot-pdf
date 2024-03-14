# Screenshots to PDF Converter

This is a simple Node.js application that captures screenshots and saves them into a PDF file.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/screenshots-to-pdf.git
    ```

2. Navigate to the project directory:

    ```bash
    cd screenshots-to-pdf
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

To use this application:

1. Ensure your screen capture area is correctly set up.
2. Modify the parameters in the `main()` function of `captureScreenshotsToPDF.js` according to your requirements.
3. Run the application:

    ```bash
    node captureScreenshotsToPDF.js
    ```

The screenshots will be captured and saved as a PDF file in the specified output folder.

## Configuration

You can customize the behavior of the application by modifying the following variables in `captureScreenshotsToPDF.js`:

- `numberOfPages`: Number of screenshots to capture.
- `captureArea`: Specifies the coordinates and dimensions of the capture area.
- `initialWaitInSeconds`: Initial delay before capturing starts (in seconds).
- `outputFolder`: Name of the folder where the PDF will be saved.
- `nameOfPdf`: Name of the output PDF file.
- `applySharpening`: Whether to apply sharpening to the screenshots before saving (true/false).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [pngjs](https://www.npmjs.com/package/pngjs) - For handling PNG images.
- [pdfkit](https://www.npmjs.com/package/pdfkit) - For generating PDF files.
- [robotjs](https://www.npmjs.com/package/robotjs) - For capturing screenshots.
- [sharp](https://www.npmjs.com/package/sharp) - For image processing.

## Contributing

Contributions are welcome! Please feel free to open a pull request for any improvements or bug fixes.

