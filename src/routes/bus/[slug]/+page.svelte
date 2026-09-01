<script lang="ts">
	import type { PageData } from './$types';
	import VerificationBadge from '$lib/components/bus/VerificationBadge.svelte';
	import { locale, t } from '$lib/i18n';
	import { Clock, MapPin, AlertCircle, Share2, Check } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let copied = $state(false);

	const busName = $derived($locale === 'bn' ? data.bus.nameBn : data.bus.name);
	const primaryRoute = $derived(data.expandedRoutes[0]);

	const pageTitle = $derived(
		$locale === 'bn'
			? `${data.bus.nameBn} বাসের সম্পূর্ণ রুট ও স্টপেজ | ঢাকা বাস ভাড়া`
			: `${data.bus.name} Bus Route, Stops & Schedule | Dhaka Bus Vara`
	);

	const metaDescription = $derived(
		$locale === 'bn'
			? `${data.bus.nameBn} বাসের চলাচলের পথ, সকল স্টপেজের তালিকা ও চলাচলের সময়সূচী।`
			: `Complete stop list, route direction, operating hours, and fare details for ${data.bus.name} bus in Dhaka.`
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

	const issueReportUrl = $derived.by(() => {
		const title = encodeURIComponent(`Bus Route Update: ${data.bus.name}`);
		const body = encodeURIComponent(
			`**Bus:** ${data.bus.name} (${data.bus.slug})\n\n**Requested Correction:**\n(Please describe missing stops or incorrect routes)`
		);
		return `https://github.com/maruf-pfc/busvarafinder/issues/new?title=${title}&body=${body}`;
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metaDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content="article" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BusService',
		name: data.bus.name,
		alternateName: data.bus.nameBn,
		description: data.bus.description,
		provider: {
			'@type': 'Organization',
			name: data.bus.name
		}
	})}</` + 'script>'}
</svelte:head>

<div class="mx-auto max-w-4xl space-y-8 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Breadcrumb -->
	<div class="flex items-center justify-between text-xs text-slate-500">
		<nav class="flex items-center gap-1.5" aria-label="Breadcrumb">
			<a href="/" class="transition hover:text-emerald-700">
				{$locale === 'bn' ? 'হোম' : 'Home'}
			</a>
			<span>/</span>
			<a href="/buses" class="transition hover:text-emerald-700">
				{$t.nav.buses}
			</a>
			<span>/</span>
			<span class="font-medium text-slate-900">{busName}</span>
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

	<!-- Bus Info Header Card -->
	<div class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
			<div class="space-y-2">
				<div class="flex items-center gap-2.5">
					<span
						class="h-4 w-4 rounded-full shadow-xs"
						style="background-color: {data.bus.colorCode}"
						aria-hidden="true"
					></span>
					<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
						{busName}
					</h1>
					<span class="text-base font-normal text-slate-400">
						({$locale === 'bn' ? data.bus.name : data.bus.nameBn})
					</span>
				</div>

				<p class="max-w-xl text-sm leading-relaxed text-slate-600">
					{$locale === 'bn' ? data.bus.descriptionBn : data.bus.description}
				</p>
			</div>

			<!-- Operator Tag & Service Hours -->
			<div class="flex items-end gap-2 text-xs sm:flex-col">
				<span
					class="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 font-bold text-emerald-800"
				>
					{data.bus.operatorType === 'seating_service'
						? $locale === 'bn'
							? 'সিটিং সার্ভিস'
							: 'Seating Service'
						: data.bus.operatorType === 'ac'
							? $locale === 'bn'
								? 'এসি সার্ভিস'
								: 'AC Express'
							: $locale === 'bn'
								? 'রেগুলার সার্ভিস'
								: 'Regular Service'}
				</span>

				{#if data.bus.serviceHours}
					<div class="flex items-center gap-1.5 text-slate-500">
						<Clock class="h-3.5 w-3.5 text-slate-400" />
						<span>{data.bus.serviceHours.start} – {data.bus.serviceHours.end}</span>
					</div>
				{/if}
			</div>
		</div>

		<!-- Verification & Provenance Badge -->
		<div class="border-t border-slate-100 pt-4">
			<VerificationBadge
				confidence={data.bus.source.confidence}
				verifiedAt={data.bus.source.verifiedAt}
				sourceName={data.bus.source.name}
			/>
		</div>
	</div>

	<!-- Stops and Route Sequence Section -->
	{#if primaryRoute}
		<div class="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-lg font-bold text-slate-900">
						{$locale === 'bn' ? 'সম্পূর্ণ চলাচলের রুট ও স্টপেজ' : 'Complete Route & Stop Sequence'}
					</h2>
					<p class="mt-0.5 text-xs text-slate-500">
						{$locale === 'bn'
							? `মোট ${primaryRoute.stops.length}টি নিবন্ধিত স্টপেজ · উভয়মুখী চলাচল`
							: `Total ${primaryRoute.stops.length} verified stops · Bidirectional route`}
					</p>
				</div>

				{#if primaryRoute.route.approximateDistanceKm}
					<span
						class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700"
					>
						~{primaryRoute.route.approximateDistanceKm} km
					</span>
				{/if}
			</div>

			<!-- Vertical Timeline of all stops -->
			<div class="relative py-2 pl-2">
				<div class="space-y-4">
					{#each primaryRoute.stops as stop, index (stop.location.id + index)}
						<div class="relative flex items-start gap-3">
							<!-- Connecting vertical line -->
							{#if index < primaryRoute.stops.length - 1}
								<div
									class="absolute top-6 bottom-[-16px] left-[11px] w-[2px] bg-slate-200"
									aria-hidden="true"
								></div>
							{/if}

							<!-- Node dot -->
							<div class="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
								{#if index === 0}
									<div
										class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs"
									>
										<div class="h-2 w-2 rounded-full bg-white"></div>
									</div>
								{:else if index === primaryRoute.stops.length - 1}
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

							<!-- Stop details -->
							<div class="flex flex-1 items-center justify-between pt-0.5">
								<div>
									<a
										href="/location/{stop.location.slug}"
										class="text-sm font-semibold transition hover:text-emerald-700 {index === 0 ||
										index === primaryRoute.stops.length - 1
											? 'font-bold text-slate-900'
											: 'text-slate-700'}"
									>
										{$locale === 'bn' ? stop.location.nameBn : stop.location.name}
									</a>
									<span class="ml-1.5 text-xs text-slate-400">
										({$locale === 'bn' ? stop.location.areaBn : stop.location.area})
									</span>
								</div>

								{#if index === 0}
									<span
										class="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 uppercase"
									>
										{$locale === 'bn' ? 'প্রারম্ভিক স্টপ' : 'Origin'}
									</span>
								{:else if index === primaryRoute.stops.length - 1}
									<span
										class="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 uppercase"
									>
										{$locale === 'bn' ? 'শেষ গন্তব্য' : 'Terminus'}
									</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Report correction callout -->
			<div
				class="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500"
			>
				<span
					>{$locale === 'bn'
						? 'কোনো স্টপ ভুল বা বাদ পড়েছে?'
						: 'Is a stop incorrect or missing?'}</span
				>
				<a
					href={issueReportUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 font-semibold text-emerald-700 transition hover:text-emerald-800"
				>
					<AlertCircle class="h-3.5 w-3.5" />
					<span>{$locale === 'bn' ? 'রুট সংশোধন জানান' : 'Suggest Route Correction'}</span>
				</a>
			</div>
		</div>
	{/if}
</div>
