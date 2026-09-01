<script lang="ts">
	import type { Location } from '$lib/domain';
	import { routeService } from '$lib/services/route.service';
	import { locale } from '$lib/i18n';
	import { MapPin, Search, X, Check } from 'lucide-svelte';

	interface Props {
		id?: string;
		label: string;
		placeholder?: string;
		selectedLocation?: Location | null;
		onSelect: (location: Location | null) => void;
		disabled?: boolean;
	}

	let {
		id = 'location-combobox',
		label,
		placeholder = 'Search location...',
		selectedLocation = null,
		onSelect,
		disabled = false
	}: Props = $props();

	let query = $state('');
	let isOpen = $state(false);
	let activeIndex = $state(-1);
	let results = $state<Location[]>([]);
	let inputRef = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (selectedLocation) {
			query = $locale === 'bn' ? selectedLocation.nameBn : selectedLocation.name;
		} else {
			query = '';
		}
	});

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		query = target.value;
		isOpen = true;
		activeIndex = -1;

		if (query.trim().length > 0) {
			results = routeService.searchLocations(query, 7);
		} else {
			results = routeService.searchLocations('', 5);
		}
	}

	function handleFocus() {
		isOpen = true;
		activeIndex = -1;
		if (query.trim().length > 0) {
			results = routeService.searchLocations(query, 7);
		} else {
			// Show top major hubs
			results = routeService.searchLocations('mirpur', 6);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!isOpen) {
			if (e.key === 'ArrowDown' || e.key === 'Enter') {
				isOpen = true;
				e.preventDefault();
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				activeIndex = activeIndex < results.length - 1 ? activeIndex + 1 : 0;
				break;
			case 'ArrowUp':
				e.preventDefault();
				activeIndex = activeIndex > 0 ? activeIndex - 1 : results.length - 1;
				break;
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0 && activeIndex < results.length) {
					selectLocation(results[activeIndex]);
				} else if (results.length > 0) {
					selectLocation(results[0]);
				}
				break;
			case 'Escape':
				e.preventDefault();
				isOpen = false;
				activeIndex = -1;
				break;
		}
	}

	function selectLocation(loc: Location) {
		onSelect(loc);
		query = $locale === 'bn' ? loc.nameBn : loc.name;
		isOpen = false;
		activeIndex = -1;
	}

	function clearSelection() {
		onSelect(null);
		query = '';
		isOpen = false;
		activeIndex = -1;
		inputRef?.focus();
	}

	function handleBlur(e: FocusEvent) {
		// Close dropdown if focus moves outside component
		setTimeout(() => {
			isOpen = false;
		}, 200);
	}
</script>

<div class="relative w-full text-left">
	<label
		for={id}
		class="mb-1.5 block text-xs font-semibold tracking-wider text-slate-700 uppercase"
	>
		{label}
	</label>

	<div class="relative flex items-center">
		<div
			class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
		>
			<MapPin class="h-4 w-4 text-emerald-600" />
		</div>

		<input
			bind:this={inputRef}
			{id}
			type="text"
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={isOpen}
			aria-controls="{id}-listbox"
			aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
			class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-9 pl-9 text-sm text-slate-900 shadow-2xs transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden disabled:bg-slate-100"
			{placeholder}
			value={query}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeyDown}
			{disabled}
			autocomplete="off"
		/>

		{#if query.length > 0}
			<button
				type="button"
				onclick={clearSelection}
				class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-hidden"
				aria-label="Clear selection"
			>
				<X class="h-4 w-4" />
			</button>
		{/if}
	</div>

	<!-- Results Dropdown -->
	{#if isOpen && results.length > 0}
		<ul
			id="{id}-listbox"
			role="listbox"
			class="animate-in fade-in-50 absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg duration-100 focus:outline-hidden"
		>
			{#each results as loc, index (loc.id)}
				<li
					id="{id}-option-{index}"
					role="option"
					aria-selected={selectedLocation?.id === loc.id || activeIndex === index}
					class="relative flex cursor-pointer items-center justify-between px-3.5 py-2.5 text-sm transition select-none {activeIndex ===
					index
						? 'bg-emerald-50 font-medium text-emerald-950'
						: 'text-slate-800 hover:bg-slate-50'}"
					onmousedown={() => selectLocation(loc)}
				>
					<div class="flex items-center gap-2">
						<span class="font-medium text-slate-900">
							{$locale === 'bn' ? loc.nameBn : loc.name}
						</span>
						<span class="text-xs text-slate-400">
							({$locale === 'bn' ? loc.name : loc.nameBn})
						</span>
						{#if loc.isMajorHub}
							<span
								class="py-0.2 rounded bg-emerald-100 px-1.5 text-[10px] font-semibold text-emerald-800"
							>
								Hub
							</span>
						{/if}
					</div>

					<div class="flex items-center gap-2 text-xs text-slate-400">
						<span>{$locale === 'bn' ? loc.areaBn : loc.area}</span>
						{#if selectedLocation?.id === loc.id}
							<Check class="h-3.5 w-3.5 text-emerald-600" />
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
