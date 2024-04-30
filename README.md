# Watermark App

This is a simple web application for adding watermark text to images uploaded by the user.

## Features

- Allows users to upload multiple images.
- Supports customization of watermark text, font, opacity, and position.
- Automatically generates watermarked images on the canvas.
- Provides the option to download watermarked images as a ZIP file.

## Usage

1. **Upload Images**: Click on the "Choose File" button to select one or more images from your device.

2. **Customize Watermark**:
   - Adjust the font size using the range input or by directly typing in the input box.
   - Enter the desired watermark text in the input field.
   - Choose a font family from the available options.
   - Select the desired opacity for the watermark.

3. **Position Watermark**: Choose the position of the watermark from the available options.

4. **View Watermarked Images**: Images will be displayed with the applied watermark on the canvas.

5. **Download Watermarked Images**: After watermarking, click the "Download" button to save all watermarked images as a ZIP file.

6. **Cancel**: Click the "Cancel" button to return to the initial state, allowing you to upload new images and customize the watermark again.

## Technologies Used

- HTML
- CSS
- JavaScript

## Dependencies

- [JSZip](https://stuk.github.io/jszip/): For generating ZIP files client-side.

## Setup

To run the application locally, simply clone the repository and open the `index.html` file in your web browser.

```bash
git clone https://github.com/vebpath/watermark
cd watermark-app
```

## Credits

This project was created by Ranjan Kashyap as a demonstration of client-side image watermarking using JavaScript.

## License

This project is licensed under the [MIT License](LICENSE).
