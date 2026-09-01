# Contributing to Dhaka Bus Vara

Thank you for your interest in contributing to **Dhaka Bus Vara**! This is an open-source public service initiative built to provide accurate and fast public transit information to Dhaka commuters.

---

## How You Can Contribute

1. **Transit Data Updates**:
   - Add new verified bus operators and routes.
   - Update changed fares or waypoint checkpoints.
   - Correct stop sequences or add missing intersections.

2. **Code & Engineering**:
   - Improve search algorithms and fuzzy matching.
   - Enhance mobile accessibility (WCAG 2.2 AA).
   - Optimize bundle size, hydration speed, and offline caching.
   - Add unit and E2E test coverage.

---

## Development Workflow

1. **Fork & Clone**:

   ```bash
   git clone https://github.com/your-username/busvarafinder.git
   cd busvarafinder
   git checkout -b feat/your-feature-name
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run Development Server**:

   ```bash
   npm run dev
   ```

4. **Verify Quality Gates**:
   Before submitting your PR, ensure all tests and quality checks pass:
   ```bash
   npm run check
   npm run lint
   npm run test:unit -- --run
   npm run build
   npm run test:e2e
   ```

---

## Commit Guidelines

We follow **Conventional Commits**:

- `feat:` for new features or buses
- `fix:` for bug fixes or route corrections
- `docs:` for documentation updates
- `test:` for test additions
- `refactor:` for code restructuring

---

## Data Contribution Guidelines

All transport data lives inside `src/lib/data/`:

- `locations.json`: Dhaka transit hubs, intersections, and aliases.
- `buses.json`: Bus operators, descriptions, and service hours.
- `routes.json`: Ordered stop sequences with origin and destination IDs.
- `fares.json`: Verified fare segments.

Every record must include valid provenance metadata:

```json
"source": {
  "name": "BRTA Approved Route Register",
  "verifiedAt": "YYYY-MM-DD",
  "confidence": "verified"
}
```

Never fabricate bus route or fare data.
