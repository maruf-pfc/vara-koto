<script lang="ts">
	import type { PageData } from './$types';
	import { locale, t } from '$lib/i18n';
	import { MapPin, Search, ArrowRight, Bus, X } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let searchQuery = $state('');

	const filteredAreas = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return data.areas;

		return data.areas
			.map((areaGroup) => {
				const matchingItems = areaGroup.items.filter((item) => {
					const loc = item.location;
					return (
						loc.name.toLowerCase().includes(q) ||
						loc.nameBn.toLowerCase().includes(q) ||
						loc.slug.includes(q) ||
						loc.area.toLowerCase().includes(q) ||
						loc.areaBn.toLowerCase().includes(q) ||
						loc.aliases.some((a) => a.toLowerCase().includes(q))
					);
				});
				return {
					...areaGroup,
					items: matchingItems
				};
			})
			.filter((areaGroup) => areaGroup.items.length > 0);
	});
</script>

<svelte:head>
	<title
		>{$locale === 'bn'
			? 'ঢাকার বাস স্টপেজ ও গুরুত্বপূর্ণ এলাকাসমূহ | ঢাকা বাস ভাড়া'
			: 'Dhaka Transit Locations & Bus Hubs | Dhaka Bus Vara'}</title
	>
	<meta
		name="description"
		content="Browse all bus stops, major transport intersections, and locations in Dhaka with connected bus routes."
	/>
</svelte:head>

<div class="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Page Header -->
	<div class="space-y-2">
		<div
			class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
		>
			<MapPin class="h-3.5 w-3.5 text-emerald-600" />
			<span>{$locale === 'bn' ? 'স্টপ ও এলাকা ডিরেক্টরি' : 'Transit Hubs & Stops'}</span>
		</div>
		<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
			{$t.locations.title}
		</h1>
		<p class="max-w-2xl text-sm leading-relaxed text-slate-600">
			{$t.locations.subtitle}
		</p>
	</div>

	<!-- Search Input -->
	<div class="relative max-w-xl">
		<div
			class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
		>
			<Search class="h-4 w-4 text-emerald-600" />
		</div>
		<input
			type="text"
			bind:value={searchQuery}
			placeholder={$t.locations.searchPlaceholder}
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

	<!-- Grouped by Area -->
	<div class="space-y-8">
		{#each filteredAreas as areaGroup (areaGroup.area)}
			<div class="space-y-3">
				<div class="flex items-center gap-2 border-b border-slate-200 pb-2">
					<h2 class="text-base font-bold text-slate-900 sm:text-lg">
						{$locale === 'bn' ? areaGroup.areaBn : areaGroup.area}
					</h2>
					<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
						{areaGroup.items.length}
						{$locale === 'bn' ? 'টি স্টপ' : 'stops'}
					</span>
				</div>

				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{#each areaGroup.items as item (item.location.id)}
						<a
							href="/location/{item.location.slug}"
							class="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs transition hover:border-emerald-300 hover:shadow-xs"
						>
							<div class="space-y-1">
								<div class="flex items-center justify-between gap-1">
									<span
										class="text-sm font-bold text-slate-900 transition group-hover:text-emerald-700"
									>
										{$locale === 'bn' ? item.location.nameBn : item.location.name}
									</span>
									{#if item.location.isMajorHub}
										<span
											class="py-0.2 rounded bg-emerald-100 px-1.5 text-[10px] font-semibold text-emerald-800 uppercase"
										>
											Hub
										</span>
									{/if}
								</div>

								<div class="text-xs text-slate-400">
									{$locale === 'bn' ? item.location.name : item.location.nameBn}
								</div>
							</div>

							<div
								class="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500"
							>
								<span class="flex items-center gap-1 font-medium text-emerald-700">
									<Bus class="h-3.5 w-3.5" />
									<span>
										{item.busCount}
										{$locale === 'bn' ? 'টি বাস' : 'buses'}
									</span>
								</span>
								<ArrowRight
									class="h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700"
								/>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
