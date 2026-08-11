import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function generatePDF() {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
    
    doc.text('This is a test document to see if pdf-parse can extract this text properly. It should contain enough text to pass the 50 word limit if I copy it a few times.');
    doc.text('This is a test document to see if pdf-parse can extract this text properly. It should contain enough text to pass the 50 word limit if I copy it a few times.');
    doc.text('This is a test document to see if pdf-parse can extract this text properly. It should contain enough text to pass the 50 word limit if I copy it a few times.');
    doc.end();
  });
}

async function test() {
  console.log("Generating PDF...");
  const buffer = await generatePDF();
  console.log("PDF length:", buffer.length);
  
  console.log("Parsing PDF...");
  const parser = new PDFParse({ data: buffer });
  try {
    const info = await parser.getInfo();
    console.log("Info:", info);
    
    const textResult = await parser.getText();
    console.log("Extracted total:", textResult.total);
    console.log("Extracted text length:", textResult.text?.length);
    console.log("Text content:", textResult.text);
    
  } catch(e) {
    console.error("Error", e);
  } finally {
    await parser.destroy();
  }
}

test();
