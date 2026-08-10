import type { Quote } from "./quotes";

interface ChartProps {
	quotes: Quote[];
}

type CumulativeChartPoint = {
	date: Date;
	[owner: string]: Date | number;
};

type OwnerChartPoint = {
	owner: string;
	count: number;
};

const COLOURS = [
	"#FE9A00",
	"#71717B",
	"#BB4D00",
	"#B05FBC",
	"#050C22",
	"#00C950",
	"#53EAFD",
	"#E12AFB",
	"#0D542B",
	"#721378",
] as const;

export {
	type CumulativeChartPoint,
	type ChartProps,
	type OwnerChartPoint,
	COLOURS,
};
