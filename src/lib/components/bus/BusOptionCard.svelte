<script lang="ts">
	import type { DirectJourneyOption } from '$lib/services/route.service';
	import { locale, t } from '$lib/i18n';
	import FareDisplay from './FareDisplay.svelte';
	import VerificationBadge from './VerificationBadge.svelte';
	import RouteTimeline from './RouteTimeline.svelte';
	import {
		Clock,
		ArrowRight,
		ChevronDown,
		ChevronUp,
		Share2,
		AlertCircle,
		Check,
		ExternalLink,
		Sparkles
	} from 'lucide-svelte';

	interface Props {
		option: DirectJourneyOption;
	}

	let { option }: Props = $props();

	let showFullTimeline = $state(false);
	let copied = $state(false);

	function toggleTimeline() {
		showFullTimeline = !showFullTimeline;
	}

	async function shareJourney() {
		const shareUrl = window.location.href;
		if (navigator.share) {
			try {
				await navigator.share({
					title: `${option.bus.name} | Dhaka Bus Vara`,
					text: `Bus Fare & Route for ${option.fromLocation.name} to ${option.toLocation.name} via ${option.bus.name}`,
					url: shareUrl
				});
				return;
			} catch (err) {
				// Fallback to clipboard
			}
		}

		await navigator.clipboard.writeText(shareUrl);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2500);
	}

	const operatorTypeLabel = $derived.by(() => {
		switch (option.bus.operatorType) {
			case 'seating_service':
				return $locale === 'bn' ? 'সিটিং সার্ভিস' : 'Seating Service';
			case 'ac':
				return $locale === 'bn' ? 'এসি বাস' : 'AC Express';
			case 'brtc':
				return $locale === 'bn' ? 'বিআরটিসি' : 'BRTC';
			default:
				return $locale === 'bn' ? 'সাধারণ বাস' : 'Regular Bus';
		}
	});

	const stopsCountText = $derived.by(() => {
		const count = option.stopsTraversedCount;
		return $locale === 'bn' ? `${count}টি স্টপ` : `${count} stops`;
	});

	const issueReportUrl = $derived.by(() => {
		const title = encodeURIComponent(
			`Route / Fare Correction: ${option.bus.name} (${option.fromLocation.name} to ${option.toLocation.name})`
		);
		const body = encodeURIComponent(
			`**Bus:** ${option.bus.name} (${option.bus.slug})\n**Route:** ${option.fromLocation.name} (${option.fromLocation.slug}) -> ${option.toLocation.name} (${option.toLocation.slug})\n**Current Fare Shown:** ৳${option.fare.fareMin} - ৳${option.fare.fareMax}\n\n**Correction Details:**\n(Please describe the correct fare or route)`
		);
		return `https://github.com/maruf-pfc/busvarafinder/issues/new?title=${title}&body=${body}`;
	});
</script>

<div
	class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:border-slate-300 hover:shadow-md"
>
	<!-- Card Top Ribbon / Operator Details -->
	<div
		class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/70 px-5 py-3.5"
	>
		<div class="flex items-center gap-2.5">
			<!-- Operator Color Accent Dot -->
			<span
				class="h-3 w-3 rounded-full"
				style="background-color: {option.bus.colorCode}"
				aria-hidden="true"
			></span>

			<a
				href="/bus/{option.bus.slug}"
				class="flex items-center gap-1.5 text-base font-bold text-slate-900 transition hover:text-emerald-700"
			>
				<span>{$locale === 'bn' ? option.bus.nameBn : option.bus.name}</span>
				<span class="text-xs font-normal text-slate-400">
					({$locale === 'bn' ? option.bus.name : option.bus.nameBn})
				</span>
			</a>

			<span class="rounded-md bg-slate-200/70 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
				{operatorTypeLabel}
			</span>
		</div>

		<!-- Direct Badge -->
		<div class="flex items-center gap-1.5">
			<span
				class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800"
			>
				<Sparkles class="h-3 w-3" />
				{$t.results.direct}
			</span>
		</div>
	</div>

	<!-- Main Card Content -->
	<div class="space-y-5 p-5 sm:p-6">
		<!-- Fare & Travel Duration Highlight -->
		<div
			class="grid grid-cols-2 gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-3"
		>
			<!-- Estimated Fare -->
			<div>
				<div class="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
					{$t.results.fare}
				</div>
				<FareDisplay fare={option.fare} size="md" />
				{#if option.fare.isEstimated}
					<div class="mt-0.5 text-[11px] font-medium text-amber-700">
						{$locale === 'bn' ? 'আনুমানিক' : 'Estimated'}
					</div>
				{/if}
			</div>

			<!-- Travel Duration -->
			<div>
				<div class="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
					{$t.results.estimatedTime}
				</div>
				<div class="flex items-center gap-1.5 text-lg font-bold text-slate-900">
					<Clock class="h-4 w-4 text-emerald-600" />
					<span>{$locale === 'bn' ? option.estimatedTime.textBn : option.estimatedTime.textEn}</span
					>
				</div>
				<div class="mt-0.5 text-[11px] text-slate-400">
					{$locale === 'bn' ? 'ট্রাফিকভেদে পরিবর্তনশীল' : 'Traffic dependent'}
				</div>
			</div>

			<!-- Stop Traversed Count -->
			<div class="col-span-2 sm:col-span-1">
				<div class="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
					{$locale === 'bn' ? 'মধ্যবর্তী স্টপ' : 'Stops'}
				</div>
				<div class="text-lg font-bold text-slate-900">
					{stopsCountText}
				</div>
				<div class="mt-0.5 text-[11px] text-slate-400">
					{$locale === 'bn' ? 'মোট রুটের অংশ' : 'Direct segment'}
				</div>
			</div>
		</div>

		<!-- Segment Route Summary Preview -->
		<div class="space-y-2">
			<div class="text-xs font-semibold text-slate-500">
				{$locale === 'bn' ? 'চলাচলের পথ:' : 'Route Segment:'}
			</div>
			<div class="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-700">
				{#each option.stopsOnSegment as stop, i (stop.location.id + i)}
					<span
						class="rounded px-2 py-1 {stop.isOrigin
							? 'bg-emerald-700 font-bold text-white'
							: stop.isDestination
								? 'bg-rose-700 font-bold text-white'
								: 'bg-slate-100 text-slate-700'}"
					>
						{$locale === 'bn' ? stop.location.nameBn : stop.location.name}
					</span>
					{#if i < option.stopsOnSegment.length - 1}
						<ArrowRight class="h-3 w-3 text-slate-400" />
					{/if}
				{/each}
			</div>
		</div>

		<!-- Collapsible Full Route Timeline -->
		{#if showFullTimeline}
			<div class="animate-in fade-in-50 mt-4 border-t border-slate-100 pt-4 duration-150">
				<div class="mb-3 text-xs font-bold tracking-wider text-slate-700 uppercase">
					{$locale === 'bn' ? 'সম্পূর্ণ স্টপ তালিকা' : 'Full Stop Sequence'}
				</div>
				<RouteTimeline stops={option.stopsOnSegment} />
			</div>
		{/if}

		<!-- Provenance & Source Metadata -->
		<div class="border-t border-slate-100 pt-3">
			<VerificationBadge
				confidence={option.source.confidence}
				verifiedAt={option.source.verifiedAt}
				sourceName={option.source.name}
			/>
		</div>

		<!-- Card Actions -->
		<div
			class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs"
		>
			<div class="flex items-center gap-2">
				<!-- Toggle Full Timeline -->
				<button
					type="button"
					onclick={toggleTimeline}
					class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600"
				>
					{#if showFullTimeline}
						<ChevronUp class="h-3.5 w-3.5" />
						<span>{$t.results.hideFullRoute}</span>
					{:else}
						<ChevronDown class="h-3.5 w-3.5" />
						<span>{$t.results.viewFullRoute}</span>
					{/if}
				</button>

				<!-- View Bus Page -->
				<a
					href="/bus/{option.bus.slug}"
					class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 hover:text-emerald-700"
				>
					<span>{$t.results.busDetails}</span>
					<ExternalLink class="h-3 w-3 opacity-60" />
				</a>
			</div>

			<div class="flex items-center gap-3">
				<!-- Share Button -->
				<button
					type="button"
					onclick={shareJourney}
					class="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-emerald-700"
					title="Share this journey link"
				>
					{#if copied}
						<Check class="h-3.5 w-3.5 text-emerald-600" />
						<span class="font-semibold text-emerald-700">{$t.results.copied}</span>
					{:else}
						<Share2 class="h-3.5 w-3.5" />
						<span>{$t.results.shareJourney}</span>
					{/if}
				</button>

				<!-- Report Error Link -->
				<a
					href={issueReportUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 text-slate-400 transition hover:text-rose-600"
					title="Report incorrect fare or route"
				>
					<AlertCircle class="h-3.5 w-3.5" />
					<span>{$t.results.reportError}</span>
				</a>
			</div>
		</div>
	</div>
</div>
