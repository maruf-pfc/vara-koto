<script lang="ts">
	import type { PageData } from './$types';
	import JourneySearch from '$lib/components/search/JourneySearch.svelte';
	import { locale, t } from '$lib/i18n';
	import {
		Bus,
		MapPin,
		ArrowRight,
		ShieldCheck,
		Clock,
		Compass,
		Layers,
		CheckCircle2,
		Sparkles
	} from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const majorHubs = $derived(data.locations.filter((l) => l.isMajorHub));
</script>

<svelte:head>
	<title
		>{$locale === 'bn'
			? 'ঢাকা বাস ভাড়া ও রুট গাইড | Dhaka Bus Fare & Route Finder'
			: 'Dhaka Bus Vara | Dhaka Public Bus Fare & Route Finder'}</title
	>
	<meta
		name="description"
		content="Find direct bus routes and calculate exact ticket fares across Dhaka, Bangladesh. Search buses like Victor Classic, Bahon, Bikalpa, Raida, Moumita, and more."
	/>
	<link rel="canonical" href="https://busvarafinder.vercel.app/" />
	<meta property="og:title" content="ঢাকা বাস ভাড়া ও রুট গাইড | Dhaka Bus Fare & Route Finder" />
	<meta
		property="og:description"
		content="Calculate exact public bus fares, find direct bus routes, and explore stop timelines in Dhaka, Bangladesh."
	/>
	<meta property="og:url" content="https://busvarafinder.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content="Dhaka Bus Vara - Dhaka Public Bus Fare & Route Finder" />
	<meta
		name="twitter:description"
		content="Calculate exact public bus fares, find direct bus routes, and explore stop timelines in Dhaka, Bangladesh."
	/>
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Dhaka Bus Vara',
		alternateName: 'ঢাকা বাস ভাড়া',
		url: 'https://busvarafinder.vercel.app/',
		applicationCategory: 'TravelApplication',
		operatingSystem: 'All',
		browserRequirements: 'Requires JavaScript. Requires HTML5.',
		description:
			'Find direct bus routes, calculate exact ticket fares, and view stop timelines across Dhaka, Bangladesh.',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'BDT'
		}
	})}</` + 'script>'}
</svelte:head>

<div class="mx-auto max-w-6xl space-y-12 px-4 py-6 sm:space-y-16 sm:px-6 sm:py-10">
	<!-- Top Transit Header & Calculator Block -->
	<section class="space-y-6">
		<div class="space-y-2 text-center sm:text-left">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-800"
			>
				<ShieldCheck class="h-3.5 w-3.5 text-emerald-600" />
				<span
					>{$locale === 'bn'
						? 'বিআরটিএ চার্ট ও ফিল্ড যাচাইকৃত ডাটা'
						: 'BRTA Chart & Field Verified Data'}</span
				>
			</div>
			<h1 class="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl">
				{$locale === 'bn'
					? 'ঢাকার বাসের রুট ও সঠিক ভাড়া খুঁজুন'
					: 'Dhaka Public Bus Fare & Route Finder'}
			</h1>
			<p class="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
				{$t.subtagline}
			</p>
		</div>

		<!-- Primary Journey Calculator -->
		<JourneySearch />
	</section>

	<!-- Quick System Stats Counter -->
	<section class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
		<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5">
			<div
				class="mb-1 flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-700 uppercase"
			>
				<Bus class="h-4 w-4" />
				<span>{$locale === 'bn' ? 'যাচাইকৃত বাস' : 'Verified Buses'}</span>
			</div>
			<div class="font-mono text-2xl font-bold text-slate-900 sm:text-3xl">
				{$locale === 'bn' ? '১৫+' : '15+'}
			</div>
			<div class="mt-0.5 text-xs text-slate-500">
				{$locale === 'bn' ? 'সকল প্রধান অপারেটর' : 'Major route lines'}
			</div>
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5">
			<div
				class="mb-1 flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-700 uppercase"
			>
				<MapPin class="h-4 w-4" />
				<span>{$locale === 'bn' ? 'সংযুক্ত স্টপ' : 'Tracked Stops'}</span>
			</div>
			<div class="font-mono text-2xl font-bold text-slate-900 sm:text-3xl">
				{$locale === 'bn' ? '৪০+' : '40+'}
			</div>
			<div class="mt-0.5 text-xs text-slate-500">
				{$locale === 'bn' ? 'সকল প্রধান ইন্টারসেকশন' : 'Key Dhaka hubs'}
			</div>
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5">
			<div
				class="mb-1 flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-700 uppercase"
			>
				<Clock class="h-4 w-4" />
				<span>{$locale === 'bn' ? 'সর্বনিম্ন ভাড়া' : 'Base Fare'}</span>
			</div>
			<div class="font-mono text-2xl font-bold text-slate-900 sm:text-3xl">
				{$locale === 'bn' ? '৳১০' : '৳10'}
			</div>
			<div class="mt-0.5 text-xs text-slate-500">
				{$locale === 'bn' ? 'বিআরটিএ রেট অনুসারে' : 'Standard BRTA chart'}
			</div>
		</div>

		<div class="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs sm:p-5">
			<div
				class="mb-1 flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-700 uppercase"
			>
				<Sparkles class="h-4 w-4 text-amber-500" />
				<span>{$locale === 'bn' ? 'কমিউনিটি চালিত' : 'Open Source'}</span>
			</div>
			<div class="font-mono text-2xl font-bold text-slate-900 sm:text-3xl">100%</div>
			<div class="mt-0.5 text-xs text-slate-500">
				{$locale === 'bn' ? 'স্বচ্ছ ও উন্মুক্ত কোড' : 'Transparent calculations'}
			</div>
		</div>
	</section>

	<!-- Major Dhaka Transit Hubs Grid -->
	<section class="space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
					{$locale === 'bn' ? 'ঢাকার প্রধান ট্রানজিট হাবসমূহ' : 'Major Dhaka Transit Hubs'}
				</h2>
				<p class="text-xs text-slate-500 sm:text-sm">
					{$locale === 'bn'
						? 'যেসব স্টপে সবচেয়ে বেশি বাসের সংযোগ রয়েছে'
						: 'High-connectivity intersections and hubs'}
				</p>
			</div>
			<a
				href="/locations"
				class="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
			>
				<span>{$locale === 'bn' ? 'সব দেখুন' : 'View all'}</span>
				<ArrowRight class="h-3.5 w-3.5" />
			</a>
		</div>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
			{#each majorHubs.slice(0, 8) as hub (hub.id)}
				<a
					href="/location/{hub.slug}"
					class="group rounded-xl border border-slate-200 bg-white p-3.5 transition hover:border-emerald-300 hover:shadow-xs"
				>
					<div
						class="mb-1.5 flex items-center justify-between text-slate-400 group-hover:text-emerald-600"
					>
						<MapPin class="h-4 w-4" />
						<span
							class="py-0.2 rounded bg-emerald-50 px-1 text-[10px] font-semibold text-emerald-800 uppercase"
						>
							Hub
						</span>
					</div>
					<div class="text-sm font-bold text-slate-900 transition group-hover:text-emerald-700">
						{$locale === 'bn' ? hub.nameBn : hub.name}
					</div>
					<div class="mt-0.5 text-xs text-slate-400">
						{$locale === 'bn' ? hub.areaBn : hub.area}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Verified Bus Directory Preview -->
	<section class="space-y-4">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
					{$locale === 'bn' ? 'জনপ্রিয় বাস সার্ভিসসমূহ' : 'Popular Bus Services'}
				</h2>
				<p class="text-xs text-slate-500 sm:text-sm">
					{$locale === 'bn'
						? 'ঢাকার বিভিন্ন রুটে চলাচলকারী নিয়মিত বাস'
						: 'Regular and seating bus operators in Dhaka'}
				</p>
			</div>
			<a
				href="/buses"
				class="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
			>
				<span>{$locale === 'bn' ? 'সকল বাস' : 'View all buses'}</span>
				<ArrowRight class="h-3.5 w-3.5" />
			</a>
		</div>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#each data.buses.slice(0, 6) as bus (bus.id)}
				<a
					href="/bus/{bus.slug}"
					class="group flex flex-col justify-between space-y-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-xs"
				>
					<div>
						<div class="mb-2 flex items-center justify-between gap-2">
							<div class="flex items-center gap-2">
								<span
									class="h-2.5 w-2.5 rounded-full"
									style="background-color: {bus.colorCode}"
									aria-hidden="true"
								></span>
								<span
									class="text-sm font-bold text-slate-900 transition group-hover:text-emerald-700"
								>
									{$locale === 'bn' ? bus.nameBn : bus.name}
								</span>
							</div>
							<span
								class="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
							>
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
							</span>
						</div>
						<p class="line-clamp-2 text-xs leading-relaxed text-slate-500">
							{$locale === 'bn' ? bus.descriptionBn : bus.description}
						</p>
					</div>

					<div
						class="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-400"
					>
						<span>{$locale === 'bn' ? 'সম্পূর্ণ রুট ও স্টপ' : 'Full Route & Stops'}</span>
						<ArrowRight
							class="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:text-emerald-700"
						/>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Methodology & Transparency Notice -->
	<section class="rounded-2xl border border-slate-200 bg-emerald-950 p-6 text-white sm:p-8">
		<div class="max-w-3xl space-y-4">
			<div
				class="inline-flex items-center gap-1.5 rounded-md border border-emerald-700/50 bg-emerald-900/80 px-2.5 py-1 text-xs font-semibold text-emerald-200"
			>
				<ShieldCheck class="h-4 w-4 text-emerald-400" />
				<span
					>{$locale === 'bn'
						? 'স্বচ্ছ ভাড়া নীতি ও তথ্যসূত্র'
						: 'Fare Transparency & Open Source Notice'}</span
				>
			</div>
			<h3 class="text-xl font-bold tracking-tight sm:text-2xl">
				{$locale === 'bn'
					? 'বাসের ভাড়া কীভাবে হিসাব করা হয়?'
					: 'How Bus Fares Are Calculated in Dhaka'}
			</h3>
			<p class="text-sm leading-relaxed text-emerald-100/80">
				{$locale === 'bn'
					? 'ঢাকা মেট্রোপলিটন এলাকায় বিআরটিএ নির্দেশিত সর্বনিম্ন ভাড়া ১০ টাকা এবং প্রতি কিলোমিটারের হার অনুসারে ভাড়া নির্ধারিত হয়। সিটিং সার্ভিস এবং শীতাতপ নিয়ন্ত্রিত (এসি) বাসের ক্ষেত্রে অপারেটরভেদে ভাড়া কিছুটা ভিন্ন হতে পারে। আমাদের ডাটা নিয়মিত ফিল্ড সার্ভে এবং সক্রিয় কমিউনিটি সদস্যদের মাধ্যমে যাচাইকৃত।'
					: 'In Dhaka metropolitan area, base bus fares are governed by Bangladesh Road Transport Authority (BRTA) baseline rates (minimum ৳10 for regular buses) alongside verified operator charts for seating services. Fares are continuously updated through field surveys and open-source commuter reports.'}
			</p>
			<div class="flex flex-wrap items-center gap-3 pt-2 text-xs">
				<a
					href="/methodology"
					class="rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white transition hover:bg-emerald-600"
				>
					{$locale === 'bn' ? 'গণনা পদ্ধতি জানুন' : 'Learn Methodology'}
				</a>
				<a
					href="/contribute"
					class="rounded-lg border border-emerald-700/80 px-4 py-2 font-semibold text-emerald-200 transition hover:bg-emerald-900"
				>
					{$locale === 'bn' ? 'তথ্য সংশোধন বা যুক্ত করুন' : 'Contribute / Report Correction'}
				</a>
			</div>
		</div>
	</section>
</div>
