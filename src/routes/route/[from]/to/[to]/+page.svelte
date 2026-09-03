<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import BusOptionCard from '$lib/components/bus/BusOptionCard.svelte';
	import JourneySearch from '$lib/components/search/JourneySearch.svelte';
	import { locale, t } from '$lib/i18n';
	import {
		ArrowLeftRight,
		AlertCircle,
		ShieldCheck,
		Share2,
		Check,
		ArrowRight
	} from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let copied = $state(false);

	const originName = $derived($locale === 'bn' ? data.fromLocation.nameBn : data.fromLocation.name);
	const destName = $derived($locale === 'bn' ? data.toLocation.nameBn : data.toLocation.name);

	const pageTitle = $derived(
		$locale === 'bn'
			? `${data.fromLocation.nameBn} থেকে ${data.toLocation.nameBn} বাসের রুট ও ভাড়া | ঢাকা বাস ভাড়া`
			: `${data.fromLocation.name} to ${data.toLocation.name} Bus Routes & Fare | Dhaka Bus Vara`
	);

	const metaDescription = $derived(
		$locale === 'bn'
			? `${data.fromLocation.nameBn} হতে ${data.toLocation.nameBn} যাওয়ার সকল বাস, স্টপেজ ও আনুমানিক বাস ভাড়ার তালিকা।`
			: `Compare all direct buses, verified fares, estimated travel time, and stop sequences from ${data.fromLocation.name} to ${data.toLocation.name} in Dhaka.`
	);

	function swapRoute() {
		goto(`/route/${data.toLocation.slug}/to/${data.fromLocation.slug}`);
	}

	async function sharePage() {
		const url = window.location.href;
		if (navigator.share) {
			try {
				await navigator.share({
					title: pageTitle,
					text: metaDescription,
					url
				});
				return;
			} catch (err) {}
		}
		await navigator.clipboard.writeText(url);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	// Lowest fare among direct options
	const lowestFare = $derived.by(() => {
		if (!data.searchResult || data.searchResult.directOptions.length === 0) return null;
		const minFares = data.searchResult.directOptions.map((o) => o.fare.fareMin);
		return Math.min(...minFares);
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metaDescription} />
	<link
		rel="canonical"
		href={`https://busvarafinder.vercel.app/route/${data.fromLocation.slug}/to/${data.toLocation.slug}`}
	/>
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta
		property="og:url"
		content={`https://busvarafinder.vercel.app/route/${data.fromLocation.slug}/to/${data.toLocation.slug}`}
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={metaDescription} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Trip',
		name: `${data.fromLocation.name} to ${data.toLocation.name}`,
		itinerary: {
			'@type': 'ItemList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: data.fromLocation.name
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: data.toLocation.name
				}
			]
		}
	})}</` + 'script>'}
</svelte:head>

<div class="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Breadcrumb & Top Controls -->
	<div class="flex items-center justify-between text-xs text-slate-500">
		<nav class="flex items-center gap-1.5" aria-label="Breadcrumb">
			<a href="/" class="transition hover:text-emerald-700">
				{$locale === 'bn' ? 'হোম' : 'Home'}
			</a>
			<span>/</span>
			<span class="font-medium text-slate-900">
				{originName} → {destName}
			</span>
		</nav>

		<button
			type="button"
			onclick={sharePage}
			class="inline-flex cursor-pointer items-center gap-1 font-medium text-slate-600 transition hover:text-emerald-700"
		>
			{#if copied}
				<Check class="h-3.5 w-3.5 text-emerald-600" />
				<span class="font-bold text-emerald-700">{$t.results.copied}</span>
			{:else}
				<Share2 class="h-3.5 w-3.5" />
				<span>{$t.results.shareJourney}</span>
			{/if}
		</button>
	</div>

	<!-- Journey Header Banner -->
	<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
		<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<!-- Origin and Destination Display -->
			<div class="space-y-1">
				<div class="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
					{$locale === 'bn' ? 'নির্বাচিত বাস রুট' : 'Selected Bus Journey'}
				</div>
				<h1
					class="flex flex-wrap items-center gap-2 text-xl font-extrabold text-slate-900 sm:text-2xl"
				>
					<a href="/location/{data.fromLocation.slug}" class="transition hover:text-emerald-700">
						{originName}
					</a>
					<ArrowRight class="h-5 w-5 shrink-0 text-slate-400" />
					<a href="/location/{data.toLocation.slug}" class="transition hover:text-emerald-700">
						{destName}
					</a>
				</h1>
				<p class="text-xs text-slate-500">
					{$locale === 'bn'
						? `${data.fromLocation.areaBn} থেকে ${data.toLocation.areaBn}`
						: `${data.fromLocation.area} to ${data.toLocation.area}`}
				</p>
			</div>

			<!-- Swap Locations Button -->
			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={swapRoute}
					class="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 active:scale-95"
					title="Reverse route direction"
				>
					<ArrowLeftRight class="h-3.5 w-3.5" />
					<span>{$locale === 'bn' ? 'বিপরীত রুট দেখুন' : 'Reverse Direction'}</span>
				</button>
			</div>
		</div>

		<!-- Direct Result Summary Stats -->
		{#if data.searchResult?.hasDirectRoutes}
			<div
				class="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 text-xs sm:grid-cols-3"
			>
				<div class="rounded-lg border border-emerald-100 bg-emerald-50/70 p-3">
					<div class="font-semibold text-emerald-800">
						{$locale === 'bn' ? 'উপলব্ধ বাস' : 'Available Buses'}
					</div>
					<div class="mt-0.5 font-mono text-lg font-bold text-emerald-950">
						{data.searchResult.directOptions.length}
					</div>
				</div>

				<div class="rounded-lg border border-slate-100 bg-slate-50 p-3">
					<div class="font-semibold text-slate-600">
						{$locale === 'bn' ? 'শুরুর ভাড়া' : 'Starting Fare'}
					</div>
					<div class="mt-0.5 font-mono text-lg font-bold text-slate-900">
						৳{lowestFare}
					</div>
				</div>

				<div class="col-span-2 rounded-lg border border-slate-100 bg-slate-50 p-3 sm:col-span-1">
					<div class="font-semibold text-slate-600">
						{$locale === 'bn' ? 'গড় ভ্রমণ সময়' : 'Est. Duration'}
					</div>
					<div class="mt-0.5 font-mono text-lg font-bold text-slate-900">
						{data.searchResult.directOptions[0].estimatedTime.textEn}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Bus Options List or Empty State -->
	{#if data.searchResult?.hasDirectRoutes}
		<section class="space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-base font-bold text-slate-900 sm:text-lg">
					{$locale === 'bn'
						? `${data.searchResult.directOptions.length}টি সরাসরি বাস পাওয়া গেছে`
						: `${data.searchResult.directOptions.length} Direct Bus Options Found`}
				</h2>
				<span class="text-xs font-medium text-slate-400">
					{$locale === 'bn' ? 'ভাড়া ও স্টপ অনুসারে সাজানো' : 'Sorted by stops & fare'}
				</span>
			</div>

			<div class="space-y-4">
				{#each data.searchResult.directOptions as option (option.bus.id + option.direction)}
					<BusOptionCard {option} />
				{/each}
			</div>
		</section>
	{:else}
		<!-- No Direct Bus Found State -->
		<section
			class="space-y-4 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center"
		>
			<div
				class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600"
			>
				<AlertCircle class="h-6 w-6" />
			</div>

			<div class="space-y-1">
				<h2 class="text-lg font-bold text-slate-900">
					{$t.results.noDirectFound}
				</h2>
				<p class="mx-auto max-w-md text-sm leading-relaxed text-slate-500">
					{$t.results.noDirectHint}
				</p>
			</div>

			<div class="mx-auto max-w-lg pt-4 text-left">
				<div class="mb-3 text-center text-xs font-bold tracking-wider text-slate-700 uppercase">
					{$locale === 'bn' ? 'নতুন করে অনুসন্ধান করুন' : 'Try Another Search'}
				</div>
				<JourneySearch compact={true} initialFrom={data.fromLocation} />
			</div>
		</section>
	{/if}

	<!-- Transit Advisory Note -->
	<section
		class="space-y-1.5 rounded-xl border border-slate-200 bg-slate-100/70 p-4 text-xs text-slate-600"
	>
		<div class="flex items-center gap-1.5 font-bold text-slate-800">
			<ShieldCheck class="h-4 w-4 text-emerald-700" />
			<span>{$locale === 'bn' ? 'ভাড়া সংক্রান্ত নির্দেশিকা' : 'Fare Advisory Note'}</span>
		</div>
		<p class="leading-relaxed text-slate-500">
			{$t.results.fareDisclaimer}
		</p>
	</section>
</div>
