import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
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
			<Outlet />
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
