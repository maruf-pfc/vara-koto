# How to Update Bus Fares in Dhaka Bus Vara

This guide explains how to add or update verified fare segments in the platform.

---

## Where Fare Data Lives

Verified pairwise fare records are stored in `src/lib/data/fares.json`.

---

## Adding or Modifying a Fare Record

```json
{
	"routeId": "route-victor-classic-main",
	"fromLocationId": "rampura",
	"toLocationId": "gulistan",
	"fareMin": 20,
	"fareMax": 25,
	"currency": "BDT",
	"basis": "operator_fixed",
	"isExact": true,
	"verifiedAt": "2026-08-30"
}
```

### Fields:

- `routeId`: Must match an existing route ID in `routes.json`.
- `fromLocationId`: Origin stop ID (must belong to this route).
- `toLocationId`: Destination stop ID (must belong to this route).
- `fareMin`: Minimum standard fare in BDT.
- `fareMax`: Maximum fare charged during peak hours or waypoint checkpoints.
- `basis`: `'brta_rate'` | `'operator_fixed'` | `'community_reported'`.
- `verifiedAt`: Date of verification in `YYYY-MM-DD` format.

---

## Verifying Integrity

Always run:

```bash
npm run test:unit -- --run
```

To ensure `fareMin <= fareMax` and all referenced IDs are valid.
