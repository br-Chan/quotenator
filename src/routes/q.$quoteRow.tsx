import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Download } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Status } from "use-google-sheets";
import { useQuotes } from "#/hooks/useQuotes";
import {
	copyDivAsImageToClipboard,
	downloadDivAsImage,
} from "#/lib/html-to-image";
import { formatDate } from "#/lib/utils";

export const Route = createFileRoute("/q/$quoteRow")({
	component: RouteComponent,
});

function RouteComponent() {
	const { quoteRow } = Route.useParams();

	const quoteRef = useRef<HTMLDivElement>(null);

	const { status, quotes, error } = useQuotes();

	if (status === Status.pending) {
		return <div>Loading...</div>;
	}

	if (status === Status.error) {
		return <div>Error: {error?.message}</div>;
	}

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

	return (
		<div className="p-8 container mx-auto items-center justify-center gap-2 flex flex-col">
			<div className="w-lg flex flex-row justify-between">
				<Link className="btn btn-outline btn-sm" to="/">
					Back
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
				<Link
					to={`/q/$quoteRow`}
					params={{ quoteRow: (parseInt(quoteRow, 10) - 1).toString() }}
					className="btn btn-outline btn-sm"
					disabled={parseInt(quoteRow, 10) === 1}
				>
					Back
				</Link>
				<Link
					to={`/q/$quoteRow`}
					params={{ quoteRow: (parseInt(quoteRow, 10) + 1).toString() }}
					className="btn btn-outline btn-sm"
					disabled={parseInt(quoteRow, 10) === quotes.length}
				>
					Next
				</Link>
			</div>
		</div>
	);
}
