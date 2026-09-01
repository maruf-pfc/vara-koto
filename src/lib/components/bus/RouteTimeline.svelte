<script lang="ts">
	import type { JourneyStopInfo } from '$lib/services/route.service';
	import { locale } from '$lib/i18n';
	import { MapPin, CircleDot } from 'lucide-svelte';

	interface Props {
		stops: JourneyStopInfo[];
		condensed?: boolean;
	}

	let { stops, condensed = false }: Props = $props();
</script>

<div class="relative py-2 pl-2">
	<div class="space-y-4">
		{#each stops as stop, index (stop.location.id + index)}
			<div class="relative flex items-start gap-3">
				<!-- Connecting vertical line -->
				{#if index < stops.length - 1}
					<div
						class="absolute top-6 -bottom-4 left-2.75 w-0.5 bg-slate-200"
						aria-hidden="true"
					></div>
				{/if}

				<!-- Node dot -->
				<div class="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
					{#if stop.isOrigin}
						<div
							class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs"
						>
							<div class="h-2 w-2 rounded-full bg-white"></div>
						</div>
					{:else if stop.isDestination}
						<div
							class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white shadow-xs"
						>
							<MapPin class="h-3.5 w-3.5" />
						</div>
					{:else}
						<div
							class="h-3 w-3 rounded-full border-2 border-slate-300 bg-white transition hover:border-emerald-500"
						></div>
					{/if}
				</div>

				<!-- Stop info -->
				<div class="pt-0.5">
					<a
						href="/location/{stop.location.slug}"
						class="text-sm font-semibold transition hover:text-emerald-700 {stop.isOrigin ||
						stop.isDestination
							? 'font-bold text-slate-900'
							: 'text-slate-600'}"
					>
						{$locale === 'bn' ? stop.location.nameBn : stop.location.name}
					</a>

					<span class="ml-1.5 text-xs text-slate-400">
						({$locale === 'bn' ? stop.location.areaBn : stop.location.area})
					</span>

					{#if stop.isOrigin}
						<span
							class="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase"
						>
							{$locale === 'bn' ? 'শুরুর স্টপ' : 'Origin'}
						</span>
					{:else if stop.isDestination}
						<span
							class="ml-2 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-800 uppercase"
						>
							{$locale === 'bn' ? 'গন্তব্য' : 'Destination'}
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
