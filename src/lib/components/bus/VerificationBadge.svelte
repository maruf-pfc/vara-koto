<script lang="ts">
	import type { ConfidenceLevel } from '$lib/domain';
	import { locale } from '$lib/i18n';
	import { ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-svelte';

	interface Props {
		confidence: ConfidenceLevel;
		verifiedAt: string;
		sourceName?: string;
	}

	let { confidence, verifiedAt, sourceName }: Props = $props();

	function formatBanglaDate(dateStr: string): string {
		const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
		return dateStr
			.split('')
			.map((c) => (c >= '0' && c <= '9' ? bnDigits[parseInt(c, 10)] : c))
			.join('');
	}

	const dateDisplay = $derived($locale === 'bn' ? formatBanglaDate(verifiedAt) : verifiedAt);
</script>

<div class="inline-flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
	{#if confidence === 'verified'}
		<span
			class="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700"
		>
			<ShieldCheck class="h-3.5 w-3.5 text-emerald-600" />
			<span>{$locale === 'bn' ? 'যাচাইকৃত রুট' : 'Verified Route'}</span>
		</span>
	{:else if confidence === 'community-reported'}
		<span
			class="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 font-medium text-amber-700"
		>
			<CheckCircle2 class="h-3.5 w-3.5 text-amber-600" />
			<span>{$locale === 'bn' ? 'কমিউনিটি রিপোর্ট' : 'Community Reported'}</span>
		</span>
	{:else}
		<span
			class="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-medium text-slate-600"
		>
			<ShieldAlert class="h-3.5 w-3.5 text-slate-400" />
			<span>{$locale === 'bn' ? 'অযাচাইকৃত' : 'Unverified'}</span>
		</span>
	{/if}

	<span class="text-slate-400">·</span>
	<span>{$locale === 'bn' ? `যাচাই: ${dateDisplay}` : `Verified: ${dateDisplay}`}</span>
	{#if sourceName}
		<span class="text-slate-400">({sourceName})</span>
	{/if}
</div>
