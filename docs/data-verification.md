# Transit Data Verification Guidelines

Data accuracy is the foundation of **Dhaka Bus Vara**. This document outlines our data provenance and verification policy.

---

## 1. Zero Tolerance for Fabricated Data

- **Never invent routes or stops**: If intermediate stops are unknown, verify them through physical route riding, official BRTA registers, or commuter ticket receipts before submitting.
- **Never guess fares**: If a fare is not explicitly verified, allow the engine to compute the estimated fare based on BRTA distance rate rules rather than guessing a fixed number.

---

## 2. Confidence Levels

Every bus operator and route definition includes a `confidence` level:

1. **`verified`**:
   - Confirmed by official BRTA approved route lists or cross-verified physical route surveys.
2. **`community-reported`**:
   - Contributed by commuters and backed by photographic ticket evidence or multiple independent reports.
3. **`unverified`**:
   - Newly submitted route pending community corroboration.

---

## 3. Automated Integrity Checks

Our automated CI test suite validates:

- Non-empty, unique IDs and slugs across all locations, buses, and routes.
- Stop orders start at `1` and increment consecutively.
- Route origins and destinations match the first and last stop elements.
- All referenced locations exist in `locations.json`.
- Fare minimums do not exceed fare maximums.
