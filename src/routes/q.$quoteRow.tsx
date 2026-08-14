import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Copy, Download } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import {
	copyDivAsImageToClipboard,
	downloadDivAsImage,
} from "#/lib/html-to-image";
import {
	findNextQuoteInCategory,
	findPreviousQuoteInCategory,
	formatDate,
} from "#/lib/utils";

export const Route = createFileRoute("/q/$quoteRow")({
	component: RouteComponent,
});

function RouteComponent() {
	const { quoteRow } = Route.useParams();

	const quoteRef = useRef<HTMLDivElement>(null);

	const quotes = useLoaderData({ from: "__root__" });

	const quote = quotes[parseInt(quoteRow, 10) - 1];

	const handleDownloadQuote = async () => {
		if (quoteRef.current) {
			try {
				await downloadDivAsImage(quoteRef.current, `quote-${quoteRow}.png`);
			} catch (error) {
				toast.error("Failed to download quote as image.");
			}
		}
	};

	const handleCopyQuote = async () => {
		if (quoteRef.current) {
			try {
				await copyDivAsImageToClipboard(quoteRef.current);
				toast.success("Quote copied as image!");
			} catch (error) {
				toast.error("Failed to copy quote to clipboard.");
			}
		}
	};

	const nextQuoteInCategoryIndex = findNextQuoteInCategory(
		quotes,
		parseInt(quoteRow, 10) - 1,
	);
	const previousQuoteInCategoryIndex = findPreviousQuoteInCategory(
		quotes,
		parseInt(quoteRow, 10) - 1,
	);

	return (
		<div className="p-8 container mx-auto items-center justify-center gap-2 flex flex-col">
			<div className="w-lg flex flex-row justify-between">
				<Link className="btn btn-outline btn-sm" to="/" search={{}}>
					Quotenator
				</Link>
				<div className="flex items-center gap-2">
					<div className="tooltip tooltip-bottom" data-tip="Download as image">
						<button
							type="button"
							className="btn btn-neutral btn-outline btn-sm btn-square"
							onClick={handleDownloadQuote}
						>
							<Download />
						</button>
					</div>

					<div className="tooltip tooltip-bottom" data-tip="Copy to clipboard">
						<button
							type="button"
							className="btn btn-outline btn-sm btn-square"
							onClick={handleCopyQuote}
						>
							<Copy />
						</button>
					</div>
				</div>
			</div>

			<div className="tooltip tooltip-bottom" data-tip={`${quote.Context}`}>
				<div
					ref={quoteRef}
					className="relative flex flex-col items-center justify-center aspect-square w-lg p-4 bg-[radial-gradient(circle,var(--color-amber-100),var(--color-amber-200))] cursor-default"
				>
					<p className="mt-20 mb-20 text-4xl text-center whitespace-pre-wrap caudex-bold-italic">
						{quote.Quote}
					</p>
					<div className="absolute bottom-4 items-center justify-center text-center">
						<p>~</p>
						<p className="text-lg italic">{quote.Owner}</p>
						<p className="text-md">{formatDate(quote.Date)}</p>
					</div>
				</div>
			</div>

			<div className="w-lg flex flex-row justify-between">
				<div className="flex flex-col items-start gap-2">
					<Link
						to={`/q/$quoteRow`}
						params={{ quoteRow: (parseInt(quoteRow, 10) - 1).toString() }}
						className="btn btn-outline btn-sm"
						disabled={parseInt(quoteRow, 10) === 1}
					>
						<ArrowLeft />
					</Link>
					<Link
						to={`/q/$quoteRow`}
						params={{
							quoteRow:
								previousQuoteInCategoryIndex !== null
									? (previousQuoteInCategoryIndex + 1).toString()
									: quoteRow,
						}}
						className="btn btn-outline btn-sm"
						disabled={previousQuoteInCategoryIndex === null}
					>
						<ArrowLeft /> from {quote.Category}
					</Link>
				</div>

				<div className="flex flex-col items-end gap-2">
					<Link
						to={`/q/$quoteRow`}
						params={{ quoteRow: (parseInt(quoteRow, 10) + 1).toString() }}
						className="btn btn-outline btn-sm"
						disabled={parseInt(quoteRow, 10) === quotes.length}
					>
						<ArrowRight />
					</Link>{" "}
					<Link
						to={`/q/$quoteRow`}
						params={{
							quoteRow:
								nextQuoteInCategoryIndex !== null
									? (nextQuoteInCategoryIndex + 1).toString()
									: quoteRow,
						}}
						className="btn btn-outline btn-sm"
						disabled={nextQuoteInCategoryIndex === null}
					>
						<ArrowRight /> from {quote.Category}
					</Link>
				</div>
			</div>
		</div>
	);
}
