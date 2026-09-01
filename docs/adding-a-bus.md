# How to Add a Bus to Dhaka Bus Vara

This guide explains how to add a verified bus operator and its route to the dataset.

---

## Step 1: Add the Bus Operator to `src/lib/data/buses.json`

Add a new JSON object:

```json
{
	"id": "my-bus",
	"slug": "my-bus",
	"name": "My Bus Name",
	"nameBn": "মাই বাস",
	"aliases": ["my bus", "my bus paribahan", "মাই বাস"],
	"operatorType": "regular",
	"colorCode": "#059669",
	"serviceHours": { "start": "06:00", "end": "22:30" },
	"description": "Serves Route Origin to Destination via Major Stops.",
	"descriptionBn": "শুরুর স্থান থেকে গন্তব্য পর্যন্ত চলাচল করে।",
	"source": {
		"name": "BRTA Approved Route Register",
		"verifiedAt": "2026-08-30",
		"confidence": "verified"
	}
}
```

---

## Step 2: Ensure All Stops Exist in `src/lib/data/locations.json`

If your bus visits a stop not currently in `locations.json`, add it first:

```json
{
	"id": "new-stop",
	"slug": "new-stop",
	"name": "New Stop",
	"nameBn": "নতুন স্টপ",
	"aliases": ["new stop", "নতুন স্টপ"],
	"area": "Mirpur",
	"areaBn": "মিরপুর",
	"isMajorHub": false
}
```

---

## Step 3: Add the Route Sequence in `src/lib/data/routes.json`

```json
{
	"id": "route-my-bus-main",
	"busId": "my-bus",
	"name": "Origin to Destination",
	"nameBn": "শুরুর স্থান হতে গন্তব্য",
	"originId": "origin-stop-id",
	"destinationId": "dest-stop-id",
	"stops": [
		{ "locationId": "origin-stop-id", "order": 1, "isRequestStop": false },
		{ "locationId": "intermediate-stop-id", "order": 2, "isRequestStop": false },
		{ "locationId": "dest-stop-id", "order": 3, "isRequestStop": false }
	],
	"bidirectional": true,
	"approximateDistanceKm": 15.0,
	"source": {
		"name": "Field Survey",
		"verifiedAt": "2026-08-30",
		"confidence": "verified"
	}
}
```

---

## Step 4: Run Data Integrity Tests

```bash
npm run test:unit -- --run
```

Ensure all tests pass and no duplicate IDs or missing references are reported.
