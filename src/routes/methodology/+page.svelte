<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import {
		ShieldCheck,
		HelpCircle,
		AlertCircle,
		Clock,
		Calculator,
		CheckCircle2,
		ArrowRight
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title
		>{$locale === 'bn'
			? 'ডাটা ও ভাড়া নির্ধারণ পদ্ধতি | ঢাকা বাস ভাড়া'
			: 'Data & Fare Calculation Methodology | Dhaka Bus Vara'}</title
	>
	<meta
		name="description"
		content="Learn how Dhaka Bus Vara calculates bus fares, verifies route stops, estimates journey duration, and maintains transportation data accuracy."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl space-y-10 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Header -->
	<div class="space-y-2">
		<div
			class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
		>
			<Calculator class="h-3.5 w-3.5 text-emerald-600" />
			<span>{$locale === 'bn' ? 'স্বচ্ছ ডাটা ও গণনা নীতি' : 'Data Transparency & Methodology'}</span
			>
		</div>
		<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
			{$locale === 'bn'
				? 'বাসের ভাড়া ও রুট কীভাবে নির্ধারিত হয়?'
				: 'How Dhaka Bus Fares & Routes Are Verified'}
		</h1>
		<p class="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
			{$locale === 'bn'
				? 'ঢাকা বাস ভাড়া একটি উন্মুক্ত ও নিরপেক্ষ প্ল্যাটফর্ম। এখানে আমরা যেভাবে তথ্যের সঠিকতা যাচাই করি এবং ভাড়া ও সময় হিসাব করি তার বিস্তারিত বিবরণ নিচে তুলে ধরা হলো।'
				: 'Dhaka Bus Vara operates on strict data verification principles. Here is an open breakdown of how bus fares, stop sequences, and journey times are determined.'}
		</p>
	</div>

	<!-- Section 1: Fare Calculation Rules -->
	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<div class="flex items-center gap-2 text-emerald-800">
			<ShieldCheck class="h-5 w-5 text-emerald-600" />
			<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
				{$locale === 'bn'
					? '১. বিআরটিএ ও অপারেটর নির্ধারিত ভাড়ার হিসাব'
					: '1. BRTA Guidelines & Operator Rates'}
			</h2>
		</div>

		<div class="space-y-3 text-sm leading-relaxed text-slate-600">
			<p>
				{$locale === 'bn'
					? 'ঢাকা মহানগরীতে সরকার ও বাংলাদেশ সড়ক পরিবহন কর্তৃপক্ষ (বিআরটিএ) কর্তৃক নির্ধারিত সর্বনিম্ন বাস ভাড়া ১০ (দশ) টাকা। প্রতি কিলোমিটারের জন্য সরকার নির্ধারিত হার প্রায় ২.৪৫–২.৫০ টাকা।'
					: 'Under Bangladesh Road Transport Authority (BRTA) regulations, the minimum base bus fare in Dhaka metropolitan area is ৳10. The distance rate is based on standard per-kilometer tiers (~৳2.45–৳2.50 / km).'}
			</p>
			<div class="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
				<div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
					<div class="mb-1 text-xs font-bold text-slate-500 uppercase">
						{$locale === 'bn' ? 'সাধারণ বাস' : 'Regular Bus'}
					</div>
					<div class="font-mono text-xl font-bold text-slate-900">৳১০ - ৳৩৫</div>
					<p class="mt-1 text-xs text-slate-500">
						{$locale === 'bn' ? 'বিআরটিএ রেগুলার চার্ট অনুসারে' : 'Official BRTA regular chart'}
					</p>
				</div>

				<div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
					<div class="mb-1 text-xs font-bold text-slate-500 uppercase">
						{$locale === 'bn' ? 'সিটিং সার্ভিস' : 'Seating Service'}
					</div>
					<div class="font-mono text-xl font-bold text-slate-900">৳১৫ - ৳৫০</div>
					<p class="mt-1 text-xs text-slate-500">
						{$locale === 'bn' ? 'অপারেটর চার্ট ও ফিল্ড সার্ভে' : 'Operator rate & survey'}
					</p>
				</div>

				<div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
					<div class="mb-1 text-xs font-bold text-slate-500 uppercase">
						{$locale === 'bn' ? 'এসি এক্সপ্রেস' : 'AC Express'}
					</div>
					<div class="font-mono text-xl font-bold text-slate-900">৳৪০ - ৳১০০+</div>
					<p class="mt-1 text-xs text-slate-500">
						{$locale === 'bn' ? 'বিআরটিসি / প্রিমিয়াম সার্ভিস' : 'BRTC / Premium air-conditioned'}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 2: Why fare varies -->
	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<div class="flex items-center gap-2 text-emerald-800">
			<AlertCircle class="h-5 w-5 text-amber-600" />
			<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
				{$locale === 'bn'
					? '২. ভাড়া কেন পরিসরে (যেমন ৳১৫–৳২০) দেখানো হয়?'
					: '2. Why Fares Are Displayed as Ranges'}
			</h2>
		</div>

		<div class="space-y-3 text-sm leading-relaxed text-slate-600">
			<p>
				{$locale === 'bn'
					? 'বাস্তব ক্ষেত্রে ঢাকার বিভিন্ন রুটে পিক আওয়ার (অফিস সময়) এবং অফ-পিক আওয়ারে হেল্পার বা কন্ডাক্টরদের ভাড়া আদায়ের ক্ষেত্রে সামান্য পার্থক্য দেখা যায়। এছাড়া কিছু বাস নির্দিষ্ট দূরত্বের মধ্যে ‘ওয়েবিল’ বা ফিক্সড সেগমেন্ট ভাড়া দাবি করে। তাই যাত্রীদের বিভ্রান্তি এড়াতে আমরা একটি বাস্তবসম্মত রেঞ্জ (যেমন: ৳২৫–৳৩০) প্রদর্শন করি এবং স্পষ্ট জানিয়ে দিই।'
					: 'In real-world Dhaka commuting, conductors occasionally collect slight variations between peak office hours and regular hours, or apply fixed waypoint checkpoints (Waybill system). To prevent misleading commuters with false precision, we display realistic verified ranges (e.g. ৳25–৳30) with explicit basis indicators.'}
			</p>
		</div>
	</section>

	<!-- Section 3: Travel Duration Model -->
	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<div class="flex items-center gap-2 text-emerald-800">
			<Clock class="h-5 w-5 text-emerald-600" />
			<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
				{$locale === 'bn' ? '৩. ভ্রমণের সময় নির্ধারণ পদ্ধতি' : '3. Travel Duration Estimation'}
			</h2>
		</div>

		<div class="space-y-3 text-sm leading-relaxed text-slate-600">
			<p>
				{$locale === 'bn'
					? 'ঢাকার ট্রাফিক অত্যন্ত পরিবর্তনশীল। তাই আমরা কোনো নির্দিষ্ট একক মিনিট দাবি করি না। স্টপের সংখ্যা এবং দূরত্বের ভিত্তিতে সাধারণ ও পিক ট্রাফিকের একটি সময়সীমা (যেমন: ২৫–৪০ মিনিট) গণনা করা হয়।'
					: 'Because Dhaka traffic fluctuates drastically depending on time of day, weather, and road conditions, we avoid deterministic single-number estimates. Our model produces conservative, realistic travel windows (e.g. 25–45 mins) calculated from stop density and corridor distance.'}
			</p>
		</div>
	</section>

	<!-- Section 4: Data Verification & Reporting -->
	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<div class="flex items-center gap-2 text-emerald-800">
			<CheckCircle2 class="h-5 w-5 text-emerald-600" />
			<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
				{$locale === 'bn'
					? '৪. ডাটা যাচাই ও সংশোধন প্রক্রিয়া'
					: '4. Community Verification & Corrections'}
			</h2>
		</div>

		<div class="space-y-3 text-sm leading-relaxed text-slate-600">
			<p>
				{$locale === 'bn'
					? 'প্রতিটি বাসের তথ্যের সাথে তার যাচাইয়ের তারিখ ও উৎস উল্লেখ থাকে। আপনি যদি কোনো রুটে ভাড়া পরিবর্তন লক্ষ্য করেন বা নতুন স্টপ দেখেন, তবে আমাদের উন্মুক্ত গিটহাব রিপোজিটরিতে সহজেই রিপোর্ট করতে পারেন।'
					: 'Every transport record carries explicit provenance metadata (`verifiedAt`, `source`, `confidence`). If you spot a changed fare or an outdated route stop, you can submit a correction directly via our open-source GitHub tracker.'}
			</p>
			<div class="pt-2">
				<a
					href="/contribute"
					class="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-800"
				>
					<span>{$locale === 'bn' ? 'ডাটা সংশোধন জানান' : 'Learn How to Contribute'}</span>
					<ArrowRight class="h-4 w-4" />
				</a>
			</div>
		</div>
	</section>
</div>
