import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "../styles.css";
import { Toaster } from "sonner";
import getQuotes from "#/lib/google-sheets-mapper";

export const Route = createRootRoute({
	component: RootComponent,
	loader: async () => {
		return getQuotes();
	},
});

function RootComponent() {
	return (
		<>
			<Toaster position="top-center" />
			<div className="flex flex-col items-center px-8 pt-4 pb-8">
				<Link className="w-fit text-center" to="/">
					<h1 className="text-4xl font-bold">The Quotenator</h1>
				</Link>
				<p className="text-center italic">
					Because some things deserve to be heard more than once.
				</p>
				<Outlet />
			</div>
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	);
}
