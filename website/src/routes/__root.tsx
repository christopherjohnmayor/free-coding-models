import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { Nav } from "#/components/nav";
import { Footer } from "#/components/footer";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "free-coding-models — Find the fastest free coding model in seconds" },
			{
				name: "description",
				content:
					"Track ~170 coding models across ~15 trusted free or free-limited AI providers in real time. Install free API endpoints to OpenCode, Crush, Goose, Aider, Cline, and more.",
			},
			{ property: "og:title", content: "free-coding-models" },
			{
				property: "og:description",
				content: "Find the fastest free coding model in seconds",
			},
			{ property: "og:type", content: "website" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/logo.webp", type: "image/webp" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				{/* Apply dark class immediately before first paint to prevent flash */}
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: theme init must run synchronously before paint
					dangerouslySetInnerHTML={{
						__html: `
(function() {
  var theme = localStorage.getItem('fcm-theme') || 'auto';
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = theme === 'dark' || (theme === 'auto' && prefersDark);
  if (!isDark) document.documentElement.classList.add('light');
})();
`.trim(),
					}}
				/>
			</head>
			<body>
				<Nav />
				<main>{children}</main>
				<Footer />
				<Scripts />
			</body>
		</html>
	);
}
