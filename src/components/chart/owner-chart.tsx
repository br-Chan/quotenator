import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { getOwners, splitOwners } from "#/lib/chart-data";
import type { ChartProps, OwnerChartPoint } from "#/types/chart";

export function OwnerChart({ quotes }: ChartProps) {
	const owners = getOwners(quotes);
	const totals: Record<string, number> = {};
	for (const owner of owners) {
		totals[owner] = 0;
	}

	const chartData: OwnerChartPoint[] = owners.map((owner) => {
		const ownerQuotes = quotes.filter((quote) =>
			splitOwners(quote.Owner).includes(owner),
		);
		totals[owner] = ownerQuotes.length;
		return {
			owner,
			count: totals[owner],
		};
	});

	chartData.sort((a, b) => b.count - a.count);

	return (
		<ResponsiveContainer width="100%" height={600}>
			<BarChart data={chartData}>
				<XAxis
					dataKey="owner"
					angle={-45}
					interval={0}
					textAnchor="end"
					height={150}
				/>
				<YAxis dataKey="count" allowDecimals={false} />
				<Tooltip />
				<Bar dataKey="count" />
			</BarChart>
		</ResponsiveContainer>
	);
}
