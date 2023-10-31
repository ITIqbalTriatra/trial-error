import React from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import Logo from '../assets/img/logo.png';

const urlCode = {
    checkIn: "https://triatra.co.id/",
    checkOut: "https://dikantor-desktop-dev.triatra.co.id/"
}

const generateQRCodeBlob = (url: string, qrWidth: number, qrHeight: number, imageUrl: string, imageWidth: number, imageHeight: number) => {
    return new Promise<Blob | null>((resolve) => {
        const qrOptions: any = {
            errorCorrectionLevel: 'H',
            width: qrWidth,
            height: qrHeight,
        };

        QRCode.toCanvas(url, qrOptions, (qrError, canvas) => {
            if (qrError) {
                console.error(`Failed to generate QR code for ${url}`);
                resolve(null);
            } else {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const image = new Image();
                    image.src = imageUrl;
                    image.onload = () => {
                        const centerX = (canvas.width - imageWidth) / 2;
                        const centerY = (canvas.height - imageHeight) / 2;
                        ctx.drawImage(image, centerX, centerY, imageWidth, imageHeight);
                        canvas.toBlob((blob) => {
                            resolve(blob);
                        });
                    }
                } else {
                    resolve(null);
                }
            }
        });
    });
}

const QRCodeGenerator: React.FC = () => {
    const handleGenerateQRCode = async () => {
        const zip = new JSZip();

        const addQRCodeWithImageToZip = async (url: string, filename: string, qrWidth: number, qrHeight: number, imageUrl: string, imageWidth: number, imageHeight: number) => {
            const blob = await generateQRCodeBlob(url, qrWidth, qrHeight, imageUrl, imageWidth, imageHeight);
            if (blob) {
                zip.file(filename, blob);
            } else {
                console.error(`Failed to generate blob for ${filename}`);
            }
        }

        // Specify QR code size, image size, and image URL
        const qrWidth = 500;
        const qrHeight = 500;
        const imageWidth = 100;
        const imageHeight = 20;
        const imageUrl = Logo;

        // Generate and add the Check In QR code with image to the ZIP
        await addQRCodeWithImageToZip(urlCode.checkIn, 'checkInQRCode.png', qrWidth, qrHeight, imageUrl, imageWidth, imageHeight);

        // Generate and add the Check Out QR code with image to the ZIP
        await addQRCodeWithImageToZip(urlCode.checkOut, 'checkOutQRCode.png', qrWidth, qrHeight, imageUrl, imageWidth, imageHeight);

        // Generate the ZIP file
        const content = await zip.generateAsync({ type: 'blob' });

        // Save the ZIP file and provide it for download
        saveAs(content, 'QRCodeImages.zip');
    }

    return (
        <div>
            <button onClick={handleGenerateQRCode}>Generate and Download ZIP</button>
        </div>
    );
}

export default QRCodeGenerator;
