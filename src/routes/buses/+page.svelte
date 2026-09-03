<script lang="ts">
	import type { PageData } from './$types';
	import { locale, t } from '$lib/i18n';
	import { Bus, Search, ArrowRight, ShieldCheck, Clock, Filter, X } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');
	let selectedType = $state<string>('all');

	const filteredBuses = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase();
		return data.busList.filter((item) => {
			const bus = item.bus;
			const matchesType = selectedType === 'all' || bus.operatorType === selectedType;

			if (!matchesType) return false;
			if (!q) return true;

			const nameMatch =
				bus.name.toLowerCase().includes(q) ||
				bus.nameBn.toLowerCase().includes(q) ||
				bus.slug.includes(q) ||
				bus.aliases.some((a) => a.toLowerCase().includes(q));

			const descMatch =
				(bus.description && bus.description.toLowerCase().includes(q)) ||
				(bus.descriptionBn && bus.descriptionBn.toLowerCase().includes(q));

			const originMatch =
				item.origin &&
				(item.origin.name.toLowerCase().includes(q) || item.origin.nameBn.includes(q));

			const destMatch =
				item.destination &&
				(item.destination.name.toLowerCase().includes(q) || item.destination.nameBn.includes(q));

			return nameMatch || descMatch || originMatch || destMatch;
		});
	});
</script>

<svelte:head>
	<title
		>{$locale === 'bn'
			? 'ঢাকার সকল বাসের তালিকা ও রুট | ঢাকা বাস ভাড়া'
			: 'Dhaka Bus Directory & Route List | Dhaka Bus Vara'}</title
	>
	<meta
		name="description"
		content="Explore all verified public buses in Dhaka with complete stop lists, fares, operating hours, and route directions."
	/>
	<link rel="canonical" href="https://busvarafinder.vercel.app/buses" />
	<meta property="og:title" content="ঢাকার সকল বাসের তালিকা ও রুট | Dhaka Bus Directory" />
	<meta
		property="og:description"
		content="Explore all verified public buses in Dhaka with complete stop lists, fares, operating hours, and route directions."
	/>
	<meta property="og:url" content="https://busvarafinder.vercel.app/buses" />
	<meta property="og:type" content="website" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Dhaka Bus Directory',
		description: 'Complete verified directory of public transit buses operating across Dhaka.',
		url: 'https://busvarafinder.vercel.app/buses'
	})}</` + 'script>'}
</svelte:head>

<div class="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Page Header -->
	<div class="space-y-2">
		<div
			class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
		>
			<Bus class="h-3.5 w-3.5 text-emerald-600" />
			<span>{$locale === 'bn' ? 'যাচাইকৃত বাস তালিকা' : 'Verified Bus Directory'}</span>
		</div>
		<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
			{$t.buses.title}
		</h1>
		<p class="max-w-2xl text-sm leading-relaxed text-slate-600">
			{$t.buses.subtitle}
		</p>
	</div>

	<!-- Search & Filter Controls -->
	<div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5">
		<div class="relative">
			<div
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
			>
				<Search class="h-4 w-4 text-emerald-600" />
			</div>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder={$t.buses.searchPlaceholder}
				class="w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-9 pl-10 text-sm text-slate-900 shadow-2xs transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden"
			/>
			{#if searchQuery}
				<button
					type="button"
					onclick={() => (searchQuery = '')}
					class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
				>
					<X class="h-4 w-4" />
				</button>
			{/if}
		</div>

		<!-- Filter Type Chips -->
		<div class="flex flex-wrap items-center gap-2 text-xs">
			<span class="mr-1 flex items-center gap-1 font-semibold text-slate-500">
				<Filter class="h-3 w-3" />
				{$locale === 'bn' ? 'সার্ভিসের ধরণ:' : 'Service Type:'}
			</span>

			<button
				type="button"
				onclick={() => (selectedType = 'all')}
				class="cursor-pointer rounded-lg px-3 py-1.5 font-medium transition {selectedType === 'all'
					? 'bg-emerald-700 font-bold text-white shadow-xs'
					: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
			>
				{$locale === 'bn' ? 'সকল বাস' : 'All Buses'} ({data.busList.length})
			</button>

			<button
				type="button"
				onclick={() => (selectedType = 'regular')}
				class="cursor-pointer rounded-lg px-3 py-1.5 font-medium transition {selectedType ===
				'regular'
					? 'bg-emerald-700 font-bold text-white shadow-xs'
					: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
			>
				{$t.buses.regularService}
			</button>

			<button
				type="button"
				onclick={() => (selectedType = 'seating_service')}
				class="cursor-pointer rounded-lg px-3 py-1.5 font-medium transition {selectedType ===
				'seating_service'
					? 'bg-emerald-700 font-bold text-white shadow-xs'
					: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
			>
				{$t.buses.seatingService}
			</button>

			<button
				type="button"
				onclick={() => (selectedType = 'ac')}
				class="cursor-pointer rounded-lg px-3 py-1.5 font-medium transition {selectedType === 'ac'
					? 'bg-emerald-700 font-bold text-white shadow-xs'
					: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
			>
				{$t.buses.acService}
			</button>
		</div>
	</div>

	<!-- Bus List Grid -->
	<div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredBuses as item (item.bus.id)}
			<a
				href="/bus/{item.bus.slug}"
				class="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-emerald-300 hover:shadow-md"
			>
				<div class="space-y-3">
					<!-- Top Ribbon -->
					<div class="flex items-center justify-between gap-2">
						<div class="flex items-center gap-2">
							<span
								class="h-3 w-3 shrink-0 rounded-full"
								style="background-color: {item.bus.colorCode}"
								aria-hidden="true"
							></span>
							<h2
								class="text-base font-bold text-slate-900 transition group-hover:text-emerald-700"
							>
								{$locale === 'bn' ? item.bus.nameBn : item.bus.name}
							</h2>
						</div>

						<span class="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
							{item.bus.operatorType === 'seating_service'
								? $locale === 'bn'
									? 'সিটিং'
									: 'Seating'
								: item.bus.operatorType === 'ac'
									? $locale === 'bn'
										? 'এসি'
										: 'AC'
									: $locale === 'bn'
										? 'রেগুলার'
										: 'Regular'}
						</span>
					</div>

					<!-- Route Origin to Destination -->
					{#if item.origin && item.destination}
						<div class="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
							<span>{$locale === 'bn' ? item.origin.nameBn : item.origin.name}</span>
							<ArrowRight class="h-3.5 w-3.5 shrink-0 text-slate-400" />
							<span>{$locale === 'bn' ? item.destination.nameBn : item.destination.name}</span>
						</div>
					{/if}

					<!-- Description -->
					<p class="line-clamp-2 text-xs leading-relaxed text-slate-500">
						{$locale === 'bn' ? item.bus.descriptionBn : item.bus.description}
					</p>
				</div>

				<!-- Card Footer -->
				<div
					class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400"
				>
					<div class="flex items-center gap-1.5">
						<Clock class="h-3.5 w-3.5 text-slate-400" />
						<span>{item.stopsCount} {$locale === 'bn' ? 'টি স্টপ' : 'stops'}</span>
					</div>

					<span
						class="flex items-center gap-1 font-semibold text-emerald-700 transition group-hover:translate-x-0.5"
					>
						<span>{$t.buses.viewBus}</span>
						<ArrowRight class="h-3.5 w-3.5" />
					</span>
				</div>
			</a>
		{/each}
	</div>

	{#if filteredBuses.length === 0}
		<div
			class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500"
		>
			<Bus class="mx-auto mb-2 h-8 w-8 text-slate-400" />
			<p class="text-sm font-medium">
				{$locale === 'bn' ? 'কোনো বাস পাওয়া যায়নি।' : 'No buses match your search criteria.'}
			</p>
		</div>
	{/if}
</div>
