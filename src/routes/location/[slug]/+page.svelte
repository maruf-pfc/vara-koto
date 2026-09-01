<script lang="ts">
	import type { PageData } from './$types';
	import JourneySearch from '$lib/components/search/JourneySearch.svelte';
	import { locale, t } from '$lib/i18n';
	import { MapPin, Bus, ArrowRight, Share2, Check, ExternalLink } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let copied = $state(false);

	const locationName = $derived($locale === 'bn' ? data.location.nameBn : data.location.name);

	const pageTitle = $derived(
		$locale === 'bn'
			? `${data.location.nameBn} বাস স্টপ ও চলাচলকারী বাসের তালিকা | ঢাকা বাস ভাড়া`
			: `${data.location.name} Bus Stop, Routes & Passing Buses | Dhaka Bus Vara`
	);

	const metaDescription = $derived(
		$locale === 'bn'
			? `${data.location.nameBn} স্টপ দিয়ে চলাচলকারী সকল বাস, গন্তব্য ও ভাড়ার তথ্য।`
			: `All buses serving ${data.location.name} in Dhaka, connected destinations, and direct fare routes.`
	);

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
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metaDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content="place" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BusStop',
		name: data.location.name,
		alternateName: data.location.nameBn,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Dhaka',
			addressCountry: 'BD'
		}
	})}</` + 'script>'}
</svelte:head>

<div class="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Breadcrumb -->
	<div class="flex items-center justify-between text-xs text-slate-500">
		<nav class="flex items-center gap-1.5" aria-label="Breadcrumb">
			<a href="/" class="transition hover:text-emerald-700">
				{$locale === 'bn' ? 'হোম' : 'Home'}
			</a>
			<span>/</span>
			<a href="/locations" class="transition hover:text-emerald-700">
				{$t.nav.locations}
			</a>
			<span>/</span>
			<span class="font-medium text-slate-900">{locationName}</span>
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

	<!-- Location Header Card -->
	<div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
			<div class="space-y-1">
				<div class="flex items-center gap-2">
					<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
						{locationName}
					</h1>
					{#if data.location.isMajorHub}
						<span
							class="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 uppercase"
						>
							Transit Hub
						</span>
					{/if}
				</div>
				<p class="text-xs text-slate-400">
					{$locale === 'bn' ? data.location.name : data.location.nameBn} · {$locale === 'bn'
						? data.location.areaBn
						: data.location.area}
				</p>
			</div>

			<div class="flex items-center gap-2">
				<span
					class="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800"
				>
					{data.buses.length}
					{$locale === 'bn' ? 'টি বাস সার্ভিস' : 'Bus Services'}
				</span>
			</div>
		</div>

		{#if data.location.aliases.length > 0}
			<div
				class="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500"
			>
				<span class="font-semibold text-slate-700"
					>{$locale === 'bn' ? 'অন্যান্য নাম / ডাকনাম:' : 'Known aliases:'}</span
				>
				{#each data.location.aliases as alias (alias)}
					<span class="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
						{alias}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Calculate Route from Here Block -->
	<div class="space-y-3">
		<h2 class="text-base font-bold text-slate-900 sm:text-lg">
			{$locale === 'bn'
				? `${locationName} থেকে ভাড়া ও রুট হিসাব করুন`
				: `Calculate Fare from ${data.location.name}`}
		</h2>
		<JourneySearch initialFrom={data.location} compact={true} />
	</div>

	<!-- Passing Buses List -->
	<div class="space-y-4">
		<h2 class="text-base font-bold text-slate-900 sm:text-lg">
			{$locale === 'bn'
				? `${locationName} দিয়ে চলাচলকারী বাসসমূহ`
				: `Buses Passing Through ${data.location.name}`}
		</h2>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
			{#each data.buses as bus (bus.id)}
				<a
					href="/bus/{bus.slug}"
					class="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition hover:border-emerald-300 hover:shadow-xs"
				>
					<div class="flex items-center gap-2.5">
						<span
							class="h-3 w-3 shrink-0 rounded-full"
							style="background-color: {bus.colorCode}"
							aria-hidden="true"
						></span>
						<div>
							<div class="text-sm font-bold text-slate-900 transition group-hover:text-emerald-700">
								{$locale === 'bn' ? bus.nameBn : bus.name}
							</div>
							<div class="text-[11px] text-slate-400">
								{bus.operatorType === 'seating_service'
									? $locale === 'bn'
										? 'সিটিং'
										: 'Seating'
									: bus.operatorType === 'ac'
										? $locale === 'bn'
											? 'এসি'
											: 'AC'
										: $locale === 'bn'
											? 'রেগুলার'
											: 'Regular'}
							</div>
						</div>
					</div>

					<ArrowRight
						class="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700"
					/>
				</a>
			{/each}
		</div>
	</div>

	<!-- Direct Destinations Accessible from this Location -->
	<div class="space-y-4">
		<h2 class="text-base font-bold text-slate-900 sm:text-lg">
			{$locale === 'bn' ? 'সরাসরি যুক্ত গন্তব্যসমূহ' : 'Directly Connected Destinations'}
		</h2>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
			{#each data.directDestinations.slice(0, 15) as dest (dest.location.id)}
				<a
					href="/route/{data.location.slug}/to/{dest.location.slug}"
					class="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs transition hover:border-emerald-300 hover:shadow-xs"
				>
					<div>
						<div class="text-sm font-bold text-slate-900 transition group-hover:text-emerald-700">
							{$locale === 'bn' ? dest.location.nameBn : dest.location.name}
						</div>
						<div class="text-xs text-slate-400">
							{$locale === 'bn' ? dest.location.areaBn : dest.location.area}
						</div>
					</div>

					<div class="flex items-center gap-1 text-xs font-semibold text-emerald-700">
						<span>{dest.busesCount} {$locale === 'bn' ? 'টি বাস' : 'buses'}</span>
						<ArrowRight class="h-3.5 w-3.5" />
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
