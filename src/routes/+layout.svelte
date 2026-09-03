<script lang="ts">
	import './layout.css';
	import { browser } from '$app/environment';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { locale } from '$lib/i18n';

	let { children } = $props();

	$effect(() => {
		if (browser) {
			document.documentElement.lang = $locale;
		}
	});

	const siteSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Dhaka Bus Vara',
		alternateName: 'ঢাকা বাস ভাড়া',
		url: 'https://busvarafinder.vercel.app',
		description:
			'Fast, accurate, and verified public bus fares and routes across Dhaka, Bangladesh.',
		inLanguage: ['bn', 'en'],
		potentialAction: {
			'@type': 'SearchAction',
			target: 'https://busvarafinder.vercel.app/buses?q={search_term_string}',
			'query-input': 'required name=search_term_string'
		}
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#047857" />
	<meta
		name="description"
		content="Dhaka Bus Vara - Fast, accurate, and verified public bus fares, stops, and routes across Dhaka, Bangladesh."
	/>
	{@html `<script type="application/ld+json">${siteSchema}</` + 'script>'}
</svelte:head>

<div class="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
