<script lang="ts">
	import { locale, t } from '$lib/i18n';
	import { Bus, Heart, ShieldCheck, ExternalLink } from 'lucide-svelte';
</script>

<footer class="mt-20 border-t border-slate-200 bg-white py-12 text-slate-600">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- App Info -->
			<div class="space-y-3 md:col-span-2">
				<div class="flex items-center gap-2 text-slate-900">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 font-mono font-bold text-white"
					>
						<Bus class="h-4 w-4" />
					</div>
					<span class="text-base font-bold tracking-tight">
						{$locale === 'bn' ? 'ঢাকা বাস ভাড়া' : 'Dhaka Bus Vara'}
					</span>
				</div>
				<p class="max-w-md text-sm leading-relaxed text-slate-500">
					{$t.footer.disclaimer}
				</p>
				<div class="flex items-center gap-2 pt-1 text-xs text-slate-500">
					<ShieldCheck class="h-4 w-4 text-emerald-600" />
					<span>{$t.footer.openData}</span>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="space-y-3">
				<h4 class="text-xs font-bold tracking-wider text-slate-900 uppercase">
					{$locale === 'bn' ? 'গুরুত্বপূর্ণ পাতা' : 'Navigation'}
				</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/" class="transition hover:text-emerald-700">
							{$t.nav.findRoute}
						</a>
					</li>
					<li>
						<a href="/buses" class="transition hover:text-emerald-700">
							{$t.nav.buses}
						</a>
					</li>
					<li>
						<a href="/locations" class="transition hover:text-emerald-700">
							{$t.nav.locations}
						</a>
					</li>
					<li>
						<a href="/methodology" class="transition hover:text-emerald-700">
							{$t.nav.methodology}
						</a>
					</li>
				</ul>
			</div>

			<!-- Open Source & Project -->
			<div class="space-y-3">
				<h4 class="text-xs font-bold tracking-wider text-slate-900 uppercase">
					{$locale === 'bn' ? 'মুক্ত উদ্যোগ' : 'Open Source'}
				</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="/about" class="transition hover:text-emerald-700">
							{$t.nav.about}
						</a>
					</li>
					<li>
						<a href="/contribute" class="transition hover:text-emerald-700">
							{$t.nav.contribute}
						</a>
					</li>
					<li>
						<a
							href="https://github.com/maruf-pfc/busvarafinder"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 transition hover:text-emerald-700"
						>
							<svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								/>
							</svg>
							<span>{$t.footer.github}</span>
							<ExternalLink class="h-3 w-3 opacity-60" />
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom copyright / tagline -->
		<div
			class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row"
		>
			<p>
				© 2026 {$locale === 'bn' ? 'ঢাকা বাস ভাড়া' : 'Dhaka Bus Vara'} · {$t.footer.license}
			</p>
			<p class="flex items-center gap-1">
				<span>{$t.footer.builtForDhaka}</span>
				<Heart class="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
			</p>
		</div>
	</div>
</footer>
