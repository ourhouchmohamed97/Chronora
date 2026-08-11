import PDFDocument from 'pdfkit';
import * as fs from 'fs';

async function generatePDF() {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
    
    doc.fontSize(24).text('Photosynthesis and Cellular Respiration', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(16).text('1. Introduction to Photosynthesis');
    doc.fontSize(12).text(
      'Photosynthesis is the chemical process by which green plants, algae, and some bacteria convert light energy, usually from the Sun, into chemical energy in the form of glucose. This process is crucial for life on Earth because it is the primary source of organic matter and oxygen in the atmosphere.'
    );
    doc.moveDown();
    
    doc.fontSize(16).text('2. The Light-Dependent Reactions');
    doc.fontSize(12).text(
      'The light-dependent reactions take place in the thylakoid membranes of the chloroplasts. During this stage, chlorophyll absorbs light energy, which excites electrons. These high-energy electrons travel through the electron transport chain, generating ATP (adenosine triphosphate) and NADPH (nicotinamide adenine dinucleotide phosphate). Water molecules are split in a process called photolysis, releasing oxygen gas as a byproduct.'
    );
    doc.moveDown();
    
    doc.fontSize(16).text('3. The Calvin Cycle (Light-Independent Reactions)');
    doc.fontSize(12).text(
      'The Calvin cycle occurs in the stroma of the chloroplasts. It does not require light directly but uses the ATP and NADPH produced in the light-dependent reactions. Carbon dioxide from the atmosphere is captured and combined with RuBP (ribulose bisphosphate) in a process called carbon fixation. Through a series of enzyme-catalyzed reactions, carbon dioxide is reduced to form G3P, which is eventually converted into glucose.'
    );
    doc.moveDown();
    
    doc.fontSize(16).text('4. Cellular Respiration Overview');
    doc.fontSize(12).text(
      'Cellular respiration is the process by which cells break down glucose and other organic molecules to produce ATP, the universal energy currency of cells. While photosynthesis stores energy in organic molecules, cellular respiration releases that energy. Respiration occurs in three main stages: Glycolysis, the Krebs cycle, and the Electron Transport Chain.'
    );
    doc.moveDown();
    
    doc.fontSize(16).text('5. The Relationship between Photosynthesis and Respiration');
    doc.fontSize(12).text(
      'Photosynthesis and cellular respiration are complementary processes. The products of photosynthesis (glucose and oxygen) are the starting reactants for cellular respiration. Conversely, the products of cellular respiration (carbon dioxide, water, and energy) are the reactants used in photosynthesis. Together, they drive the carbon-oxygen cycle on Earth.'
    );
    doc.end();
  });
}

async function run() {
  console.log("Generating sample PDF...");
  const buffer = await generatePDF();
  fs.writeFileSync('sample.pdf', buffer);
  console.log("Generated sample.pdf of size:", buffer.length);
}

run();
