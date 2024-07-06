import { format, isToday } from "date-fns";
import jsPDF from "jspdf";

//This function formats date to string e.g 06/07/2024 - Saturday
export function formatDateToString(date: Date): string {
	const formattedDate = format(date, "dd/MM/yyyy");
	const todayString = isToday(date) ? "Today" : format(date, "EEEE"); 
	return `${todayString} ${formattedDate}`;
}

// T
export const generatePDF = (quote: any) => {
	const doc = new jsPDF();

	// Set up the document title
	doc.setFontSize(18);
	doc.text("Quote Details", 14, 22);

	// Add company logo
	const img = new Image();
	img.src = "/oneport.png";
	img.onload = function () {
		doc.addImage(img, "PNG", 14, 30, 50, 15);

		// Add client information
		doc.setFontSize(12);
		doc.text(`Attention (Customer Name): Daniel Alobode`, 14, 50);
		doc.text(`Email Address: ample@mail.com`, 14, 56);
		doc.text(`Commodity: Electric goods`, 14, 62);
		doc.text(`Chargeable weight (KG): 55.34Kg`, 14, 68);
		doc.text(`POL (Port of Loading): Lagos City`, 14, 74);
		doc.text(`POD (Port of Destination): Johannesburg`, 14, 80);
		doc.text(
			`Collection Address: INNIO Waukesha Gas Engines 8123 116th Street, Suite 300, SW Side of Building, Dock 46-50, Pleasant Prairie, WI 53158`,
			14,
			86,
			{ maxWidth: 180 }
		);

		// Add table for quote breakdown
		let startY = 96;
		quote.sections.forEach((section: any, index: number) => {
			doc.setFontSize(14);
			doc.text(
				`${section.section_name.toUpperCase()} Quote Breakdown`,
				14,
				startY
			);

			// Table header
			startY += 10;
			doc.setFontSize(12);
			doc.setTextColor(100);
			// doc.setFillColor(200);
			doc.rect(14, startY, 182, 8, "F");
			doc.setTextColor(255);
			// doc.setFontStyle("bold");
			doc.text("Basis", 16, startY + 5);
			doc.text("Unit of Measure", 60, startY + 5);
			doc.text("Unit", 102, startY + 5);
			doc.text("Rate (USD)", 135, startY + 5);
			doc.text("Amount (USD)", 174, startY + 5);

			// Table rows
			startY += 8;
			// doc.setFontStyle("normal");
			doc.setTextColor(50);
			section.section_data.forEach((data: any) => {
				doc.text(String(data.basis), 16, startY);
				doc.text(String(data.unit_of_measurement), 60, startY);
				doc.text(String(data.unit), 102, startY);
				doc.text(`$${data.rate}`, 135, startY);
				doc.text(`$${data.amount}`, 174, startY);
				startY += 8;
			});

			startY += 10;
		});

		// Add terms and conditions
		doc.setFontSize(14);
		// doc.setFontStyle("bold");
		doc.text("ONEPORT365 TERMS AND CONDITIONS", 14, startY);
		doc.setFontSize(12);
		// doc.setFontStyle("normal");
		startY += 10;
		doc.text(
			"Please note this offer is firm for acceptance within 48 hours...",
			14,
			startY,
			{ maxWidth: 182 }
		);

		// Save the PDF
		doc.save("quote_details.pdf");
	};
};