import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { createCumulativeData, getTopOwners } from "#/lib/chart-data";
import { COLOURS } from "#/types/chart";
import type { Quote } from "#/types/quotes";

interface CumulativeChartProps {
	quotes: Quote[];
}

export function CumulativeChart({ quotes }: CumulativeChartProps) {
	const owners = getTopOwners(quotes, 8);
	const chartData = createCumulativeData(quotes);

	return (
		<ResponsiveContainer width="100%" height={600}>
			<LineChart data={chartData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="date"
					type="number"
					scale="time"
					domain={["dataMin", "dataMax"]}
					tickFormatter={(date) =>
						new Date(date).toLocaleDateString("en-NZ", {
							day: "numeric",
							month: "short",
						})
					}
				/>
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Legend />
				{owners.map((owner, i) => (
					<Line
						strokeWidth={4}
						key={owner}
						type="monotone"
						dataKey={owner}
						name={owner}
						dot={false}
						stroke={
							COLOURS.length > i
								? COLOURS[i]
								: `#${Math.floor(Math.random() * 16777215).toString(16)}`
						}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
}
