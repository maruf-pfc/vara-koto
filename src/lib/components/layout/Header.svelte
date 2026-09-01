<script lang="ts">
	import { locale, toggleLocale, t } from '$lib/i18n';
	import { Bus, MapPin, Compass, HelpCircle, Info, Languages, Menu, X } from 'lucide-svelte';

	let mobileMenuOpen = $state(false);

	function toggleMobile() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobile() {
		mobileMenuOpen = false;
	}
</script>

<header
	class="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur-md"
>
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
		<!-- Brand Logo & Title -->
		<a
			href="/"
			class="flex items-center gap-2.5 rounded-md py-1 text-slate-900 transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
			onclick={closeMobile}
		>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 font-mono text-lg font-bold text-white shadow-xs"
			>
				<Bus class="h-5 w-5" />
			</div>
			<div>
				<div class="flex items-center gap-1.5">
					<span class="text-lg leading-tight font-bold tracking-tight text-slate-900">
						{$locale === 'bn' ? 'ঢাকা বাস ভাড়া' : 'Dhaka Bus Vara'}
					</span>
					<span
						class="rounded-sm bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-emerald-800 uppercase"
					>
						Dhaka
					</span>
				</div>
				<p class="text-[11px] font-medium text-slate-500">
					{$locale === 'bn' ? 'পাবলিক বাস ও ভাড়া গাইড' : 'Public Bus & Fare Guide'}
				</p>
			</div>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex">
			<a
				href="/"
				class="flex items-center gap-1.5 rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
			>
				<Compass class="h-4 w-4 text-emerald-600" />
				<span>{$t.nav.findRoute}</span>
			</a>
			<a
				href="/buses"
				class="flex items-center gap-1.5 rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
			>
				<Bus class="h-4 w-4 text-emerald-600" />
				<span>{$t.nav.buses}</span>
			</a>
			<a
				href="/locations"
				class="flex items-center gap-1.5 rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
			>
				<MapPin class="h-4 w-4 text-emerald-600" />
				<span>{$t.nav.locations}</span>
			</a>
			<a
				href="/methodology"
				class="flex items-center gap-1.5 rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
			>
				<HelpCircle class="h-4 w-4 text-slate-500" />
				<span>{$t.nav.methodology}</span>
			</a>
			<a
				href="/about"
				class="flex items-center gap-1.5 rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900"
			>
				<Info class="h-4 w-4 text-slate-500" />
				<span>{$t.nav.about}</span>
			</a>
		</nav>

		<!-- Right Controls (Language switcher & GitHub) -->
		<div class="flex items-center gap-2">
			<!-- Bilingual Language Toggle -->
			<button
				type="button"
				onclick={toggleLocale}
				class="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600"
				title="Change Language / ভাষা পরিবর্তন"
				aria-label="Toggle language between English and Bengali"
			>
				<Languages class="h-3.5 w-3.5 text-emerald-600" />
				<span>{$locale === 'bn' ? 'English' : 'বাংলা'}</span>
			</button>

			<!-- GitHub Link -->
			<a
				href="https://github.com/maruf-pfc/busvarafinder"
				target="_blank"
				rel="noopener noreferrer"
				class="hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:flex"
				aria-label="GitHub Repository"
				title="GitHub Repository"
			>
				<svg class="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
					/>
				</svg>
			</a>

			<!-- Mobile Menu Toggle Button -->
			<button
				type="button"
				onclick={toggleMobile}
				class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
				aria-label="Toggle navigation menu"
				aria-expanded={mobileMenuOpen}
			>
				{#if mobileMenuOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu Dropdown -->
	{#if mobileMenuOpen}
		<div
			class="animate-in slide-in-from-top-2 space-y-1 border-t border-slate-200 bg-white px-4 py-3 shadow-lg duration-150 md:hidden"
		>
			<a
				href="/"
				class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
				onclick={closeMobile}
			>
				<Compass class="h-4 w-4 text-emerald-600" />
				<span>{$t.nav.findRoute}</span>
			</a>
			<a
				href="/buses"
				class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
				onclick={closeMobile}
			>
				<Bus class="h-4 w-4 text-emerald-600" />
				<span>{$t.nav.buses}</span>
			</a>
			<a
				href="/locations"
				class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
				onclick={closeMobile}
			>
				<MapPin class="h-4 w-4 text-emerald-600" />
				<span>{$t.nav.locations}</span>
			</a>
			<a
				href="/methodology"
				class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
				onclick={closeMobile}
			>
				<HelpCircle class="h-4 w-4 text-slate-500" />
				<span>{$t.nav.methodology}</span>
			</a>
			<a
				href="/about"
				class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
				onclick={closeMobile}
			>
				<Info class="h-4 w-4 text-slate-500" />
				<span>{$t.nav.about}</span>
			</a>
			<a
				href="/contribute"
				class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
				onclick={closeMobile}
			>
				<span>{$t.nav.contribute}</span>
			</a>
		</div>
	{/if}
</header>
