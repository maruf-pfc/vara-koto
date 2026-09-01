<script lang="ts">
	import type { CalculatedFare } from '$lib/domain';
	import { locale } from '$lib/i18n';

	interface Props {
		fare: CalculatedFare;
		size?: 'sm' | 'md' | 'lg';
	}

	let { fare, size = 'md' }: Props = $props();

	function formatBanglaNumber(n: number): string {
		const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
		return n
			.toString()
			.split('')
			.map((d) => bnDigits[parseInt(d, 10)] ?? d)
			.join('');
	}

	const minText = $derived(
		$locale === 'bn' ? formatBanglaNumber(fare.fareMin) : fare.fareMin.toString()
	);
	const maxText = $derived(
		$locale === 'bn' ? formatBanglaNumber(fare.fareMax) : fare.fareMax.toString()
	);
</script>

<div class="inline-flex items-baseline gap-1 font-mono font-bold text-slate-900">
	<span class="font-sans text-emerald-700">৳</span>
	{#if fare.fareMin === fare.fareMax}
		<span class={size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-lg'}>
			{minText}
		</span>
	{:else}
		<span class={size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-lg'}>
			{minText}–{maxText}
		</span>
	{/if}
</div>
