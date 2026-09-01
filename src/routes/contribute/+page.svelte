<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import {
		Bus,
		PlusCircle,
		AlertCircle,
		DollarSign,
		MapPin,
		ExternalLink,
		GitPullRequest
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title
		>{$locale === 'bn'
			? 'তথ্য ও কোডে অবদান রাখুন | ঢাকা বাস ভাড়া'
			: 'Contribute Transport Data | Dhaka Bus Vara'}</title
	>
	<meta
		name="description"
		content="Learn how to add new bus routes, update fares, and submit transport corrections to the open-source Dhaka Bus Vara platform."
	/>
</svelte:head>

<div class="mx-auto max-w-4xl space-y-10 px-4 py-6 sm:px-6 sm:py-10">
	<!-- Page Header -->
	<div class="space-y-2">
		<div
			class="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
		>
			<GitPullRequest class="h-3.5 w-3.5 text-emerald-600" />
			<span>{$locale === 'bn' ? 'উন্মুক্ত নাগরিক সহযোগিতা' : 'Community Contributions'}</span>
		</div>
		<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
			{$locale === 'bn'
				? 'তথ্য সংশোধন বা নতুন বাস যোগ করুন'
				: 'How to Contribute to Dhaka Bus Vara'}
		</h1>
		<p class="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
			{$locale === 'bn'
				? 'ঢাকার গণপরিবহন গতিশীল এবং রুট বা ভাড়া মাঝেমাঝেই পরিবর্তিত হয়। আপনি যেভাবে খুব সহজে তথ্য হালনাগাদ করতে পারেন:'
				: 'Dhaka transit is constantly evolving. Here is how you can submit a quick correction or add a new bus route.'}
		</p>
	</div>

	<!-- Contribution Options Grid -->
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<!-- Option 1: Report Fare Update -->
		<div
			class="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
		>
			<div class="space-y-2">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"
				>
					<DollarSign class="h-5 w-5" />
				</div>
				<h3 class="text-base font-bold text-slate-900">
					{$locale === 'bn' ? 'ভাড়া আপডেট জানান' : 'Report Fare Change'}
				</h3>
				<p class="text-xs leading-relaxed text-slate-500">
					{$locale === 'bn'
						? 'কোনো রুটে ভাড়া পরিবর্তন হয়ে থাকলে সরাসরি বিআরটিএ চার্ট বা টিকেটের ছবি সংযুক্ত করে জানাতে পারেন।'
						: 'If a fare has been revised, let us know with the bus name, origin, destination, and the new fare.'}
				</p>
			</div>

			<a
				href="https://github.com/maruf-pfc/vara-koto/issues/new?title=Fare+Update:+[Bus+Name]&body=**Bus:**+%0A**From:**+%0A**To:**+%0A**New+Fare:**+%0A**Evidence/Source:**+"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
			>
				<span>{$locale === 'bn' ? 'ভাড়া রিপোর্ট করুন' : 'Submit Fare Update'}</span>
				<ExternalLink class="h-3.5 w-3.5" />
			</a>
		</div>

		<!-- Option 2: Correct a Route / Missing Stop -->
		<div
			class="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
		>
			<div class="space-y-2">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"
				>
					<AlertCircle class="h-5 w-5" />
				</div>
				<h3 class="text-base font-bold text-slate-900">
					{$locale === 'bn' ? 'রুট বা স্টপ সংশোধন' : 'Route / Stop Correction'}
				</h3>
				<p class="text-xs leading-relaxed text-slate-500">
					{$locale === 'bn'
						? 'কোনো বাসের স্টপ তালিকায় ভুল থাকলে বা নতুন কোনো স্টপেজ চালু হলে আমাদের জানান।'
						: 'Spotted a missing stop or an altered bus diversion? Submit a quick route correction.'}
				</p>
			</div>

			<a
				href="https://github.com/maruf-pfc/vara-koto/issues/new?title=Route+Correction:+[Bus+Name]&body=**Bus:**+%0A**Incorrect+Stops:**+%0A**Corrected+Sequence:**+%0A**Details:**+"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
			>
				<span>{$locale === 'bn' ? 'স্টপ সংশোধন জানান' : 'Submit Route Correction'}</span>
				<ExternalLink class="h-3.5 w-3.5" />
			</a>
		</div>

		<!-- Option 3: Add a New Bus -->
		<div
			class="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
		>
			<div class="space-y-2">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800"
				>
					<PlusCircle class="h-5 w-5" />
				</div>
				<h3 class="text-base font-bold text-slate-900">
					{$locale === 'bn' ? 'নতুন বাস যুক্ত করুন' : 'Add a New Bus'}
				</h3>
				<p class="text-xs leading-relaxed text-slate-500">
					{$locale === 'bn'
						? 'যেসব বাস এখনো আমাদের ডাটাবেজে নেই, সেগুলোর প্রারম্ভিক স্টপ থেকে শেষ গন্তব্য পর্যন্ত তালিকা দিন।'
						: 'Help us expand Dhaka coverage by submitting verified bus names and their full stop sequences.'}
				</p>
			</div>

			<a
				href="https://github.com/maruf-pfc/vara-koto/issues/new?title=New+Bus+Request:+[Bus+Name]&body=**Bus+Name+(English+%26+Bangla):**+%0A**Service+Type+(Regular/Seating/AC):**+%0A**Origin:**+%0A**Destination:**+%0A**All+Intermediate+Stops:**+%0A**Operating+Hours:**+"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
			>
				<span>{$locale === 'bn' ? 'নতুন বাস প্রস্তাব করুন' : 'Suggest New Bus'}</span>
				<ExternalLink class="h-3.5 w-3.5" />
			</a>
		</div>
	</div>

	<!-- Developer Pull Request Guide -->
	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<h2 class="text-lg font-bold text-slate-900 sm:text-xl">
			{$locale === 'bn'
				? 'সরাসরি পুল রিকোয়েস্ট (Pull Request) জমা দেওয়া'
				: 'Submitting Changes via Pull Request'}
		</h2>
		<p class="text-sm leading-relaxed text-slate-600">
			{$locale === 'bn'
				? 'আমাদের সমস্ত ট্রানজিট ডাটা `src/lib/data/` ফোল্ডারে সুশৃঙ্খল JSON ফাইল হিসেবে সংরক্ষিত। ডেভেলপাররা সরাসরি গিটহাব ফর্ক করে PR দিতে পারেন:'
				: 'All Dhaka transit data is stored cleanly inside `src/lib/data/` in strict JSON schemas. You can clone, make modifications, run automated validation tests, and submit a PR:'}
		</p>

		<div
			class="space-y-1 overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-100"
		>
			<div>
				<span class="text-emerald-400">git</span> clone https://github.com/maruf-pfc/vara-koto.git
			</div>
			<div><span class="text-emerald-400">npm</span> install</div>
			<div>
				<span class="text-slate-400"># Run integrity tests to ensure zero schema errors:</span>
			</div>
			<div><span class="text-emerald-400">npm</span> test</div>
		</div>
	</section>
</div>
