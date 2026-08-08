import * as htmlToImage from "html-to-image";

export const downloadDivAsImage = async (
	div: HTMLDivElement,
	fileName: string,
) => {
	const dataURL = await htmlToImage.toPng(div, {
		cacheBust: true,
	});

	const link = document.createElement("a");
	link.href = dataURL;
	link.download = fileName;
	link.click();
};

export const copyDivAsImageToClipboard = async (div: HTMLDivElement) => {
	const blob = await htmlToImage.toBlob(div, {
		cacheBust: true,
	});

	if (!blob) {
		throw new Error("Failed to blobify :(((");
	}

	await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
};
