<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { locale } from '$lib/i18n';

	let { children } = $props();
</script>

<svelte:head>
	<html lang={$locale}></html>
	<meta name="theme-color" content="#047857" />
	<meta
		name="description"
		content="Dhaka Bus Vara - Fast, accurate, and verified public bus fares and routes across Dhaka, Bangladesh."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
