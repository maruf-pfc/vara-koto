import { writable, derived } from 'svelte/store';

export type Locale = 'en' | 'bn';

export const locale = writable<Locale>('bn');

export function toggleLocale() {
	locale.update((l) => (l === 'en' ? 'bn' : 'en'));
}

export function setLocale(newLocale: Locale) {
	locale.set(newLocale);
}

export const translations = {
	en: {
		appTitle: 'Dhaka Bus Vara',
		tagline: 'Dhaka Public Bus Fare & Route Guide',
		subtagline:
			'Fast, verified bus routes and estimated fares across Dhaka metropolitan area. Works seamlessly offline and on slow mobile networks.',
		nav: {
			findRoute: 'Find Route',
			buses: 'Buses',
			locations: 'Locations',
			methodology: 'Methodology',
			about: 'About',
			contribute: 'Contribute'
		},
		search: {
			fromLabel: 'From',
			fromPlaceholder: 'Select or type origin (e.g. Mirpur 10)',
			toLabel: 'To',
			toPlaceholder: 'Select or type destination (e.g. Farmgate)',
			swapButton: 'Swap origin and destination',
			findButton: 'Find Bus & Fare',
			popularRoutes: 'Popular Dhaka Routes',
			quickSelect: 'Quick Select'
		},
		results: {
			title: 'Available Buses & Routes',
			directFound: 'direct bus options found',
			noDirectFound: 'No direct bus route found between these locations.',
			noDirectHint:
				'Try searching with nearby major transit hubs (e.g., Farmgate, Shahbag, Mohakhali, or Kuril).',
			fare: 'Fare',
			estimatedTime: 'Est. Time',
			journeyType: 'Journey',
			direct: 'Direct',
			stops: 'stops',
			viewFullRoute: 'View Full Route',
			hideFullRoute: 'Hide Full Route',
			busDetails: 'Bus Details',
			shareJourney: 'Share Journey',
			copied: 'Link Copied to Clipboard!',
			reportError: 'Report Incorrect Route / Fare',
			verifiedOn: 'Verified on',
			source: 'Source',
			fareDisclaimer:
				'Fares are calculated based on official BRTA rate charts and field surveys. Actual charged fare on peak hours may vary slightly by operator.'
		},
		buses: {
			title: 'Dhaka Bus Directory',
			subtitle:
				'Explore all verified bus operators, full stop sequences, and route paths in Dhaka.',
			searchPlaceholder: 'Search bus by name, operator, or area...',
			allOperators: 'All Bus Services',
			stopsCount: 'Stops',
			viewBus: 'View Bus Route',
			serviceHours: 'Service Hours',
			regularService: 'Regular Service',
			seatingService: 'Seating Service',
			acService: 'AC Service'
		},
		locations: {
			title: 'Dhaka Transit Locations & Hubs',
			subtitle: 'Browse all supported stops, intersections, and bus terminals in Dhaka.',
			searchPlaceholder: 'Search location, area, or intersection...',
			busesAvailable: 'buses available',
			viewLocation: 'View Location Hub'
		},
		footer: {
			disclaimer:
				'Dhaka Bus Vara is an open-source public service utility. Transit data is maintained with care and community verification.',
			builtForDhaka: 'Built for Dhaka commuters',
			github: 'GitHub Repository',
			license: 'MIT Licensed',
			openData: 'Open Data & Transparent Calculations'
		}
	},
	bn: {
		appTitle: 'ঢাকা বাস ভাড়া',
		tagline: 'ঢাকা পাবলিক বাস ভাড়া ও রুট নির্দেশিকা',
		subtagline:
			'ঢাকা শহরের সকল নিয়মিত বাসের সঠিক রুট, স্টপেজ ও আনুমানিক ভাড়া যাচাই করুন। ধীরগতির মোবাইল নেটওয়ার্কেও সহজে ব্যবহার উপযোগী।',
		nav: {
			findRoute: 'রুট খুঁজুন',
			buses: 'বাসসমূহ',
			locations: 'এলাকাসমূহ',
			methodology: 'পদ্ধতি',
			about: 'আমাদের সম্পর্কে',
			contribute: 'যুক্ত হোন'
		},
		search: {
			fromLabel: 'শুরুর স্থান',
			fromPlaceholder: 'যাত্রা শুরুর স্থান নির্বাচন করুন (যেমন: মিরপুর ১০)',
			toLabel: 'গন্তব্য',
			toPlaceholder: 'নামার স্থান নির্বাচন করুন (যেমন: ফার্মগেট)',
			swapButton: 'যাত্রা ও গন্তব্য অদলবদল করুন',
			findButton: 'বাস ও ভাড়া খুঁজুন',
			popularRoutes: 'জনপ্রিয় যাতায়াত রুট',
			quickSelect: 'দ্রুত নির্বাচন'
		},
		results: {
			title: 'উপলব্ধ বাস ও রুটসমূহ',
			directFound: 'টি সরাসরি বাস রুট পাওয়া গেছে',
			noDirectFound: 'এই দুই স্টপেজের মধ্যে সরাসরি কোনো বাস রুট পাওয়া যায়নি।',
			noDirectHint:
				'কাছাকাছি প্রধান ট্রানজিট হাব (যেমন: ফার্মগেট, শাহবাগ, মহাখালী অথবা কুড়িল) দিয়ে অনুসন্ধান করে দেখতে পারেন।',
			fare: 'ভাড়া',
			estimatedTime: 'ভ্রমণ সময়',
			journeyType: 'ধরণ',
			direct: 'সরাসরি',
			stops: 'টি স্টপ',
			viewFullRoute: 'সম্পূর্ণ রুট দেখুন',
			hideFullRoute: 'রুট সংক্ষেপ করুন',
			busDetails: 'বাসের বিবরণ',
			shareJourney: 'শেয়ার করুন',
			copied: 'লিংক কপি হয়েছে!',
			reportError: 'ভুল ভাড়া বা রুট রিপোর্ট করুন',
			verifiedOn: 'যাচাইয়ের তারিখ',
			source: 'উৎস',
			fareDisclaimer:
				'প্রদর্শিত ভাড়া বিআরটিএ নির্ধারিত তালিকা ও নিয়মিত ফিল্ড সার্ভে থেকে প্রস্তুতকৃত। যানজট বা পিক আওয়ারে অপারেটরভেদে ভাড়া সামান্য পরিবর্তিত হতে পারে।'
		},
		buses: {
			title: 'ঢাকা বাস ডিরেক্টরি',
			subtitle: 'ঢাকা শহরের সকল বাস, তাদের সম্পূর্ণ স্টপ ও চলাচলের পথ ব্রাউজ করুন।',
			searchPlaceholder: 'বাসের নাম বা এলাকা দিয়ে খুঁজুন...',
			allOperators: 'সকল বাস সার্ভিস',
			stopsCount: 'টি স্টপেজ',
			viewBus: 'বাসের রুট দেখুন',
			serviceHours: 'চলাচলের সময়',
			regularService: 'সাধারণ সার্ভিস',
			seatingService: 'সিটিং সার্ভিস',
			acService: 'এসি সার্ভিস'
		},
		locations: {
			title: 'ঢাকার স্টপেজ ও গুরুত্বপূর্ণ এলাকা',
			subtitle: 'ঢাকা শহরের সকল নিবন্ধিত বাস স্টপ, মোড় ও টার্মিনাল ব্রাউজ করুন।',
			searchPlaceholder: 'স্টপ বা এলাকার নাম দিয়ে খুঁজুন...',
			busesAvailable: 'টি বাসের স্টপ',
			viewLocation: 'এলাকার বিবরণ দেখুন'
		},
		footer: {
			disclaimer:
				'ঢাকা বাস ভাড়া একটি ওপেন-সোর্স উন্মুক্ত সেবা উদ্যোগ। জনসাধারণের যাতায়াতের সুবিধার্থে ট্রানজিট ডাটা নিয়মিত যাচাই করা হয়।',
			builtForDhaka: 'ঢাকা বাস যাত্রীদের জন্য তৈরি',
			github: 'গিটহাব রিপোজিটরি',
			license: 'এমআইটি লাইসেন্সযুক্ত',
			openData: 'উন্মুক্ত ডাটা ও স্বচ্ছ গণনা'
		}
	}
};

export const t = derived(locale, ($locale) => translations[$locale]);
