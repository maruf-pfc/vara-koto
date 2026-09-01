<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Location } from '$lib/domain';
	import LocationCombobox from './LocationCombobox.svelte';
	import { locale, t } from '$lib/i18n';
	import { ArrowUpDown, Search, Sparkles } from 'lucide-svelte';
	import { transportRepository } from '$lib/repositories/transport.repository';

	interface Props {
		initialFrom?: Location | null;
		initialTo?: Location | null;
		compact?: boolean;
	}

	let props: Props = $props();

	let fromLocation = $state<Location | null>(null);
	let toLocation = $state<Location | null>(null);
	let errorMessage = $state<string | null>(null);

	$effect(() => {
		if (props.initialFrom) fromLocation = props.initialFrom;
		if (props.initialTo) toLocation = props.initialTo;
	});

	function handleSwap() {
		const temp = fromLocation;
		fromLocation = toLocation;
		toLocation = temp;
		errorMessage = null;
	}

	function handleSearch(e?: Event) {
		e?.preventDefault();
		if (!fromLocation || !toLocation) {
			errorMessage =
				$locale === 'bn'
					? 'অনুগ্রহ করে শুরুর স্থান এবং গন্তব্য উভয়ই নির্বাচন করুন।'
					: 'Please select both origin and destination.';
			return;
		}

		if (fromLocation.id === toLocation.id) {
			errorMessage =
				$locale === 'bn'
					? 'শুরুর স্থান এবং গন্তব্য একই হতে পারে না।'
					: 'Origin and destination cannot be the same location.';
			return;
		}

		errorMessage = null;
		goto(`/route/${fromLocation.slug}/to/${toLocation.slug}`);
	}

	function selectPopularRoute(fromSlug: string, toSlug: string) {
		const from = transportRepository.getLocationBySlug(fromSlug);
		const to = transportRepository.getLocationBySlug(toSlug);
		if (from && to) {
			fromLocation = from;
			toLocation = to;
			errorMessage = null;
			goto(`/route/${from.slug}/to/${to.slug}`);
		}
	}

	const popularRoutes = [
		{
			from: 'mirpur-10',
			to: 'farmgate',
			labelEn: 'Mirpur 10 → Farmgate',
			labelBn: 'মিরপুর ১০ → ফার্মগেট'
		},
		{
			from: 'uttara-azampur',
			to: 'shahbag',
			labelEn: 'Uttara → Shahbag',
			labelBn: 'উত্তরা → শাহবাগ'
		},
		{
			from: 'gabtoli',
			to: 'gulistan',
			labelEn: 'Gabtoli → Gulistan',
			labelBn: 'গাবতলী → গুলিস্তান'
		},
		{
			from: 'jatrabari',
			to: 'uttara-abdullahpur',
			labelEn: 'Jatrabari → Uttara',
			labelBn: 'যাত্রাবাড়ী → উত্তরা'
		},
		{
			from: 'mirpur-1',
			to: 'sadarghat',
			labelEn: 'Mirpur 1 → Sadarghat',
			labelBn: 'মিরপুর ১ → সদরঘাট'
		}
	];
</script>

<div class="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
	<form onsubmit={handleSearch} class="space-y-4">
		<div class="grid grid-cols-1 items-end gap-3 sm:gap-4 md:grid-cols-[1fr,auto,1fr]">
			<!-- Origin -->
			<div class="w-full">
				<LocationCombobox
					id="journey-from"
					label={$t.search.fromLabel}
					placeholder={$t.search.fromPlaceholder}
					selectedLocation={fromLocation}
					onSelect={(loc) => {
						fromLocation = loc;
						errorMessage = null;
					}}
				/>
			</div>

			<!-- Swap Button -->
			<div class="flex justify-center md:pb-1">
				<button
					type="button"
					onclick={handleSwap}
					class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 shadow-2xs transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600 active:scale-95"
					title={$t.search.swapButton}
					aria-label={$t.search.swapButton}
				>
					<ArrowUpDown class="h-4 w-4" />
				</button>
			</div>

			<!-- Destination -->
			<div class="w-full">
				<LocationCombobox
					id="journey-to"
					label={$t.search.toLabel}
					placeholder={$t.search.toPlaceholder}
					selectedLocation={toLocation}
					onSelect={(loc) => {
						toLocation = loc;
						errorMessage = null;
					}}
				/>
			</div>
		</div>

		<!-- Error Message Alert -->
		{#if errorMessage}
			<div
				class="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-medium text-rose-700"
			>
				{errorMessage}
			</div>
		{/if}

		<!-- Search Submit Button -->
		<div class="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
			<button
				type="submit"
				class="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:scale-[0.98] sm:w-auto"
			>
				<Search class="h-4 w-4" />
				<span>{$t.search.findButton}</span>
			</button>

			<span class="text-center text-xs font-medium text-slate-400 sm:text-right">
				{$locale === 'bn' ? '✓ সঠিক রুট ও হালনাগাদ ভাড়া' : '✓ Verified routes & updated fares'}
			</span>
		</div>
	</form>

	<!-- Popular Routes Quick Select -->
	{#if !props.compact}
		<div class="mt-6 border-t border-slate-100 pt-5">
			<div class="mb-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
				<Sparkles class="h-3.5 w-3.5 text-amber-500" />
				<span>{$t.search.popularRoutes}</span>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each popularRoutes as pr (pr.from + pr.to)}
					<button
						type="button"
						onclick={() => selectPopularRoute(pr.from, pr.to)}
						class="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
					>
						{$locale === 'bn' ? pr.labelBn : pr.labelEn}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
