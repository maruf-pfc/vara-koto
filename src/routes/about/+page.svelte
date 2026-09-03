<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { Bus, Heart, ShieldCheck, Code2, Users, Compass, ExternalLink } from 'lucide-svelte';
</script>

<svelte:head>
	<title
		>{$locale === 'bn'
			? 'আমাদের সম্পর্কে | ঢাকা বাস ভাড়া'
			: 'About Dhaka Bus Vara | Open Source Public Transit'}</title
	>
	<meta
		name="description"
		content="About Dhaka Bus Vara - A free, open-source transit tool built specifically for daily commuters in Dhaka, Bangladesh."
	/>
	<link rel="canonical" href="https://busvarafinder.vercel.app/about" />
	<meta property="og:title" content="About Dhaka Bus Vara | আমাদের সম্পর্কে" />
	<meta
		property="og:description"
		content="A free, open-source transit tool built specifically for daily commuters in Dhaka, Bangladesh."
	/>
	<meta property="og:url" content="https://busvarafinder.vercel.app/about" />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="mx-auto max-w-4xl space-y-10 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Page Header -->
	<div class="space-y-2">
		<div
			class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
		>
			<Bus class="h-3.5 w-3.5 text-emerald-600" />
			<span>{$locale === 'bn' ? 'উন্মুক্ত নাগরিক সেবা' : 'Open Public Utility'}</span>
		</div>
		<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
			{$locale === 'bn' ? 'ঢাকা বাস ভাড়া উদ্যোগ' : 'About Dhaka Bus Vara'}
		</h1>
		<p class="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
			{$locale === 'bn'
				? 'ঢাকার রাস্তায় দাঁড়িয়ে যেন যে-কেউ কয়েক সেকেন্ডের মধ্যে জানতে পারেন কোন বাসে উঠবেন এবং কত ভাড়া হতে পারে — এই লক্ষ্যেই আমাদের যাত্রা।'
				: 'Designed to help everyday commuters standing beside a busy Dhaka road quickly determine which bus to board and approximately how much they should pay.'}
		</p>
	</div>

	<!-- Mission Section -->
	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
			{$locale === 'bn' ? 'আমাদের উদ্দেশ্য ও দর্শন' : 'Our Mission & Philosophy'}
		</h2>
		<div class="space-y-3 text-sm leading-relaxed text-slate-600">
			<p>
				{$locale === 'bn'
					? 'ঢাকার গণপরিবহন ব্যবস্থা অত্যন্ত সমৃদ্ধ কিন্তু প্রায়শই তথ্যের অভাবে যাত্রীদের ভোগান্তিতে পড়তে হয়। কোন রুটে কোন বাস যায়, স্টপ কোথায় এবং প্রকৃত সরকারি ভাড়া কত — তা জানা অনেক সময় কঠিন হয়ে দাঁড়ায়।'
					: 'Dhaka has a vast, interconnected network of bus routes, but commuters frequently face challenges finding accurate stop sequences, route directions, and government-approved fare rates.'}
			</p>
			<p>
				{$locale === 'bn'
					? 'ঢাকা বাস ভাড়া কোনো বাণিজ্যিক উদ্যোগ নয়। এটি একটি উন্মুক্ত, বিজ্ঞাপনমুক্ত এবং হালকা ওজনের সেবা যা ধীরগতির ইন্টারনেটেও সমান দ্রুত কাজ করে।'
					: 'Dhaka Bus Vara is a 100% open-source, non-commercial public service utility built to work seamlessly on low-end mobile devices and slow connections without annoying ads or tracking.'}
			</p>
		</div>
	</section>

	<!-- Core Principles Grid -->
	<section class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<div class="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"
			>
				<ShieldCheck class="h-5 w-5" />
			</div>
			<h3 class="text-base font-bold text-slate-900">
				{$locale === 'bn' ? 'তথ্যের সত্যতা' : 'Data Integrity'}
			</h3>
			<p class="text-xs leading-relaxed text-slate-500">
				{$locale === 'bn'
					? 'আমরা কোনো মনগড়া বা অনুমানভিত্তিক বাস রুট প্রকাশ করি না। প্রতিটি রুট ও স্টপেজ সরকারি রেকর্ড ও মাঠ পর্যায়ের যাচাই সাপেক্ষে সংরক্ষিত।'
					: 'We never fabricate bus routes or fares. Every record comes with verified provenance and clear confidence tags.'}
			</p>
		</div>

		<div class="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"
			>
				<Code2 class="h-5 w-5" />
			</div>
			<h3 class="text-base font-bold text-slate-900">
				{$locale === 'bn' ? 'ওপেন সোর্স কোড' : 'Open Source'}
			</h3>
			<p class="text-xs leading-relaxed text-slate-500">
				{$locale === 'bn'
					? 'সম্পূর্ণ কোড ও ট্রানজিট ডাটা গিটহাবে উন্মুক্ত। যে-কেউ অবদান রাখতে, নতুন ফিচার যোগ করতে বা সংশোধন জানাতে পারেন।'
					: 'All code, tests, and route data are fully open source under the MIT License for transparency and community growth.'}
			</p>
		</div>

		<div class="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
			<div
				class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"
			>
				<Compass class="h-5 w-5" />
			</div>
			<h3 class="text-base font-bold text-slate-900">
				{$locale === 'bn' ? 'ব্যবহারবান্ধব গতি' : 'Commuter Speed'}
			</h3>
			<p class="text-xs leading-relaxed text-slate-500">
				{$locale === 'bn'
					? 'ভারী কোনো ফ্রেমওয়ার্ক বা অপ্রয়োজনীয় বিজ্ঞাপন ছাড়াই তৈরি, যাতে বাসে ওঠার তাড়াহুড়োতেও নিমিষেই তথ্য পাওয়া যায়।'
					: 'Engineered for sub-second client performance so commuters at busy stops get immediate answers.'}
			</p>
		</div>
	</section>

	<!-- Open Source GitHub Block -->
	<section class="space-y-4 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
		<h3 class="text-xl font-bold tracking-tight">
			{$locale === 'bn' ? 'গিটহাবে যুক্ত হোন' : 'Join Us on GitHub'}
		</h3>
		<p class="max-w-xl text-sm leading-relaxed text-slate-300">
			{$locale === 'bn'
				? 'আপনি একজন যাত্রী, গবেষক বা সফটওয়্যার প্রকৌশলী হিসেবে এই প্রকল্পে ভূমিকা রাখতে পারেন।'
				: 'Contribute route corrections, add new bus operators, or improve the codebase on GitHub.'}
		</p>
		<div class="pt-2">
			<a
				href="https://github.com/maruf-pfc/busvarafinder"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-500"
			>
				<span>{$locale === 'bn' ? 'গিটহাব রিপোজিটরি দেখুন' : 'View GitHub Repository'}</span>
				<ExternalLink class="h-4 w-4" />
			</a>
		</div>
	</section>
</div>
