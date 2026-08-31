import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowDown,
	ArrowUpRight,
	Download,
	Github,
	Menu,
	MessageCircle,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const links = {
	manual: "https://omarchy.org/manual/",
	iso: "https://iso.omarchy.org/omarchy-4.0.1.iso",
	plugins: "https://omarchyplugins.com/",
	github: "https://github.com/omacom/omarchy",
	security: "https://omarchy.org/security/",
	news: "https://omarchy.org/news/",
	latestNews:
		"https://omarchy.org/news/2026/08/omacom-foundation-launches-with-8-million",
	teams: "https://omarchy.org/teams/",
	patrons: "https://omarchy.org/patrons/",
	sponsorships: "https://omarchy.org/sponsorships/",
	air: "https://omarchy.org/air/",
	discord: "https://discord.gg/tXFUdasqhY",
	meetups: "https://omarchy.org/meetups/",
	workstations: "https://omarchy.org/workstations/",
	merch: "https://supply.37signals.com/collections/omarchy",
	omarchs: "https://omarchs.fyi/",
	dhh: "https://dhh.dk/",
	threeSignals: "https://37signals.com/",
	basecamp: "https://basecamp.com/",
	hey: "https://www.hey.com/",
	brand: "https://omarchy.org/brand/",
	cloudflare: "https://cloudflare.com",
} as const;

type LinkItem = {
	label: string;
	href: string;
};

const primaryLinks: LinkItem[] = [
	{ label: "Manual", href: links.manual },
	{ label: "ISO", href: links.iso },
	{ label: "Plugins", href: links.plugins },
	{ label: "GitHub", href: links.github },
	{ label: "Security", href: links.security },
];

const communityLinks: LinkItem[] = [
	{ label: "News", href: links.news },
	{ label: "Teams", href: links.teams },
	{ label: "Patrons", href: links.patrons },
	{ label: "Sponsorships", href: links.sponsorships },
	{ label: "AIR", href: links.air },
];

const moreLinks: LinkItem[] = [
	{ label: "Discord", href: links.discord },
	{ label: "Meetups", href: links.meetups },
	{ label: "Workstations", href: links.workstations },
	{ label: "Merch", href: links.merch },
];

const videos = [
	{
		title: "Omarchy Quattro by David Heinemeier Hansson",
		href: "https://www.youtube.com/watch?v=F7fe9pa8OeE",
		image: "/images/video/omarchy-quattro.webp",
		action: "Play",
	},
	{
		title: "You need to switch to Linux RIGHT NOW!! by NetworkChuck",
		href: "https://www.youtube.com/watch?v=9SDkU5VDQEQ",
		image: "/images/video/networkchuck.webp",
		action: "Watch on YouTube",
	},
	{
		title: "They finally fixed linux by typecraft",
		href: "https://www.youtube.com/watch?v=5JPYJfN7HY0",
		image: "/images/video/typecraft.webp",
		action: "Watch on YouTube",
	},
	{
		title: "I Didn't Expect Omarchy 4 to Be This Good by LinuxBTW",
		href: "https://www.youtube.com/watch?v=qBKMe8AatY0",
		image: "/images/video/linuxbtw.webp",
		action: "Watch on YouTube",
	},
	{
		title: "If you use AI, switch to Omarchy immediately by Alex Finn",
		href: "https://www.youtube.com/watch?v=KO2T0oET9go",
		image: "/images/video/alex-finn.webp",
		action: "Watch on YouTube",
	},
] as const;

function ExternalLink({ label, href }: LinkItem) {
	return (
		<a href={href} target="_blank" rel="noreferrer">
			{label}
			<ArrowUpRight size={13} />
		</a>
	);
}

function Home() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuToggleRef = useRef<HTMLButtonElement>(null);
	const navRef = useRef<HTMLElement>(null);

	const closeMenu = () => setMenuOpen(false);

	useEffect(() => {
		if (!menuOpen) return;

		navRef.current?.querySelector<HTMLElement>("button, a")?.focus();
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;

			event.preventDefault();
			setMenuOpen(false);
			requestAnimationFrame(() => menuToggleRef.current?.focus());
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [menuOpen]);

	const scrollToSection = (id: string) => {
		const wasMenuOpen = menuOpen;
		closeMenu();
		if (wasMenuOpen) {
			requestAnimationFrame(() => menuToggleRef.current?.focus());
		}

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		document.getElementById(id)?.scrollIntoView({
			behavior: reduceMotion ? "auto" : "smooth",
		});
	};

	return (
		<main className="omarchy-page" id="top">
			<a
				className="news-strip"
				href={links.latestNews}
				target="_blank"
				rel="noreferrer"
			>
				<span className="news-strip-label">Latest</span>
				<span>Omacom Foundation launches with $10 million</span>
				<ArrowUpRight size={14} />
			</a>

			<header className="site-header page-wrap">
				<a className="wordmark" href="#top" aria-label="Omarchy home">
					<img
						className="wordmark-logo"
						src="/images/omarchy-logo.svg"
						alt="Omarchy"
					/>
				</a>
				<nav
					id="primary-navigation"
					ref={navRef}
					className={menuOpen ? "site-nav is-open" : "site-nav"}
					aria-label="Primary navigation"
				>
					<button type="button" onClick={() => scrollToSection("manifesto")}>
						Manifesto
					</button>
					<a
						href={links.news}
						target="_blank"
						rel="noreferrer"
						onClick={closeMenu}
					>
						News
					</a>
					<a
						href={links.manual}
						target="_blank"
						rel="noreferrer"
						onClick={closeMenu}
					>
						Manual
					</a>
					<button type="button" onClick={() => scrollToSection("links")}>
						Community
					</button>
					<a
						className="nav-action"
						href={links.iso}
						target="_blank"
						rel="noreferrer"
						onClick={closeMenu}
					>
						Download ISO <Download size={13} />
					</a>
				</nav>
				<button
					className="menu-toggle"
					ref={menuToggleRef}
					type="button"
					aria-expanded={menuOpen}
					aria-controls="primary-navigation"
					aria-label={menuOpen ? "Close navigation" : "Open navigation"}
					onClick={() => setMenuOpen((open) => !open)}
				>
					{menuOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</header>

			<section className="archive-hero page-wrap" aria-labelledby="hero-title">
				<div className="hero-copy">
					<h1 id="hero-title">Beautiful, Fun &amp; Opinionated Linux</h1>
					<p className="hero-byline">
						By{" "}
						<a href={links.dhh} target="_blank" rel="noreferrer">
							DHH
						</a>
					</p>
					<p className="hero-description">
						The malleable OS for the age of agents. Where you can vibe your way
						through every alteration, tweak, and desire.{" "}
						<a href={links.omarchs} target="_blank" rel="noreferrer">
							Be the Omarch
						</a>{" "}
						and command your agent!
					</p>
					<div className="hero-actions">
						<a
							className="primary-action"
							href={links.iso}
							target="_blank"
							rel="noreferrer"
						>
							Download the ISO <ArrowUpRight size={16} />
						</a>
						<a
							className="secondary-action"
							href={links.manual}
							target="_blank"
							rel="noreferrer"
						>
							Read the manual <ArrowRightIcon />
						</a>
					</div>
				</div>

				<figure className="hero-artwork">
					<img
						src="/images/omarchy-signal-atlas.png"
						alt="Abstract dithered technical atlas created for Omarchy"
					/>
					<figcaption>
						<span>Signal atlas / 01</span>
						<span>Omarchy</span>
					</figcaption>
				</figure>
				<div className="section-marker">OMARCHY / A MALLEABLE OS</div>
			</section>

			<section
				className="video-section page-wrap"
				aria-labelledby="video-title"
			>
				<div className="video-content">
					<div className="video-intro">
						<h2 id="video-title">Watch Omarchy.</h2>
					</div>
					<div className="video-grid">
						{videos.map((video, index) => (
							<a
								className={
									index === 0 ? "video-card video-card-featured" : "video-card"
								}
								href={video.href}
								target="_blank"
								rel="noreferrer"
								key={video.title}
							>
								<span className="video-image">
									<img src={video.image} alt="" />
									<span className="video-action">
										{video.action} <ArrowUpRight size={14} />
									</span>
								</span>
								<span className="video-title">{video.title}</span>
							</a>
						))}
					</div>
				</div>
				<div className="section-marker">01 / VIDEOS</div>
			</section>

			<section
				className="manifesto-section page-wrap"
				id="manifesto"
				aria-labelledby="manifesto-title"
			>
				<div className="manifesto-content">
					<h2 id="manifesto-title">A different kind of desktop.</h2>
					<p>
						Omarchy is an{" "}
						<a href={links.manual} target="_blank" rel="noreferrer">
							omakase
						</a>{" "}
						Linux distribution based on{" "}
						<a href="https://archlinux.org" target="_blank" rel="noreferrer">
							Arch
						</a>
						, the tiling window manager{" "}
						<a href="https://hypr.land" target="_blank" rel="noreferrer">
							Hyprland
						</a>
						, and the desktop construction-kit{" "}
						<a href="https://quickshell.org" target="_blank" rel="noreferrer">
							Quickshell
						</a>
						.
					</p>
					<p>
						It ships with everything a modern, savvy computer user needs to be
						productive immediately. There&apos;s zero bloat here: Just
						everything I use.
					</p>
				</div>
				<div className="manifesto-note">
					<span className="note-index">02</span>
					<p>
						It&apos;s a complete system designed with both aesthetics and
						productivity in mind. Because a beautiful system is a motivating
						system.
					</p>
				</div>
				<div className="section-marker">02 / MANIFESTO</div>
			</section>

			<section
				className="links-section page-wrap"
				id="links"
				aria-labelledby="links-title"
			>
				<div className="links-intro">
					<h2 id="links-title">Start anywhere.</h2>
					<p>Let&apos;s get started with the basics.</p>
				</div>
				<div className="link-groups">
					<div className="link-group">
						<h3>Omarchy</h3>
						{primaryLinks.map((item) => (
							<ExternalLink key={item.label} {...item} />
						))}
					</div>
					<div className="link-group">
						<h3>Community</h3>
						{communityLinks.map((item) => (
							<ExternalLink key={item.label} {...item} />
						))}
					</div>
					<div className="link-group">
						<h3>More</h3>
						{moreLinks.map((item) => (
							<ExternalLink key={item.label} {...item} />
						))}
					</div>
				</div>
				<div className="section-marker">03 / EXPLORE</div>
			</section>

			<section className="news-section page-wrap" aria-labelledby="news-title">
				<div className="news-feature">
					<div>
						<span className="news-date">August 21, 2026</span>
						<h2 id="news-title">Omacom Foundation launches with $10 million</h2>
					</div>
					<a
						className="secondary-action"
						href={links.latestNews}
						target="_blank"
						rel="noreferrer"
					>
						Read the news <ArrowRightIcon />
					</a>
				</div>
				<div className="section-marker">04 / NEWS</div>
			</section>

			<footer className="site-footer page-wrap">
				<div className="footer-identity">
					<div className="closing-copy">
						<h2 id="closing-title">
							Beautiful, fun &amp; opinionated Linux by{" "}
							<a href={links.dhh} target="_blank" rel="noreferrer">
								DHH
							</a>
							.
						</h2>
						<p>
							Looking to become a partner or patron of Omarchy? Write{" "}
							<a href="mailto:david@omarchy.org">david@omarchy.org</a>
						</p>
					</div>
					<div className="closing-meta">
						<p>
							Incubated at{" "}
							<a href={links.threeSignals} target="_blank" rel="noreferrer">
								37signals
							</a>{" "}
							(makers of{" "}
							<a href={links.basecamp} target="_blank" rel="noreferrer">
								Basecamp
							</a>{" "}
							and{" "}
							<a href={links.hey} target="_blank" rel="noreferrer">
								HEY
							</a>
							)
						</p>
						<p>
							Sponsored hosting by{" "}
							<a href={links.cloudflare} target="_blank" rel="noreferrer">
								Cloudflare
							</a>
						</p>
					</div>
				</div>
				<div className="section-marker">05 / OMARCHY</div>
				<div className="footer-topline">
					<a className="wordmark footer-wordmark" href="#top">
						<img
							className="wordmark-logo"
							src="/images/omarchy-logo.svg"
							alt="Omarchy"
						/>
					</a>
					<div className="footer-social">
						<a href={links.github} target="_blank" rel="noreferrer">
							<Github size={15} /> GitHub
						</a>
						<a href={links.discord} target="_blank" rel="noreferrer">
							<MessageCircle size={15} /> Discord
						</a>
						<a href="#top">
							<ArrowDown size={15} className="back-to-top-icon" /> Back to top
						</a>
					</div>
				</div>
				<div className="footer-bottom">
					<span>
						Omarchy is a{" "}
						<a href={links.brand} target="_blank" rel="noreferrer">
							pending trademark
						</a>
					</span>
				</div>
			</footer>
		</main>
	);
}

function ArrowRightIcon() {
	return <ArrowUpRight size={15} />;
}
