# Log Compiler – Requirements

Source reference: https://log-json-visualizer.lovable.app/

---

## Input Format

- Files must be **NDJSON** (newline-delimited JSON): one valid JSON object per line.
- Accepted file extensions: `.log`, `.txt`, `.json`.
- Each entry must follow this schema:

```json
{
  "clusterId": "Worker 20",
  "endpoint": "/ccstorex/custom/v1/bopis_order",
  "level": "info",
  "message": "",
  "requestId": "",
  "requestMethod": "POST",
  "timestamp": "2025-09-05T14:25:43.179Z"
}
```

---

## Pages / States

The app is a single-page application with two visual states: **empty** (no file loaded) and **loaded** (file parsed and displayed).

---

## Functional Requirements

### FR-01 – File Upload (Empty State)

- Display a centered upload area with:
  - Drag-and-drop support.
  - Click-to-browse fallback.
  - Accepted types: `.log`, `.txt`, `.json`.
- Below the upload area, show a collapsible or static **Expected Log Format** card with the JSON schema example as a code block.

### FR-02 – File Info Bar (Loaded State)

- After a file is loaded, display a top bar containing:
  - The **filename**.
  - The **total number of entries** (e.g., "4 log entries loaded").
  - A **"Load New File"** button that resets the app to the empty state.

### FR-03 – Log Table

- Render parsed log entries in a table with the following columns (in order):

| Column | Source field | Notes |
|---|---|---|
| Timestamp | `timestamp` | Sortable; display in locale format |
| # | – | Row index (1-based) |
| Level | `level` | Rendered as a colored badge |
| Method | `requestMethod` | |
| Endpoint | `endpoint` | |
| Cluster ID | `clusterId` | |
| Request ID | `requestId` | |
| Message | `message` | |

- **Timestamp column** must be sortable (toggle ascending / descending).
- Show a filtered entry count above the table: `"X of Y entries"`.

### FR-04 – Filtering

All filters are applied simultaneously and update the table in real time.

| Filter | Behavior |
|---|---|
| **Log Level** | Toggle buttons, one per distinct level (`info`, `error`, `warning`, `debug`). Multiple can be active at once. All active by default. |
| **Cluster ID** | Toggle buttons auto-generated from the unique `clusterId` values found in the file. All active by default. |
| **Timeframe** | Two date+time pickers (From / To) using 12-hour AM/PM format. Filters entries whose `timestamp` falls within the range. |
| **Text Search** | Free-text input that searches across all visible fields. |

### FR-05 – Row Detail Panel

- Clicking any table row opens a **side panel / drawer** from the right side of the screen.
- The panel displays:
  - Header: formatted timestamp + level badge.
  - Labeled fields: **Method**, **Endpoint**, **Cluster ID**, **Request ID**, **Message**.
  - Each value is displayed in a monospace code-styled box.
- The panel is closeable via an **X button**.
- The panel overlays the content (not a full-page navigation).

### FR-06 – Export / Download

- A **Download** button exports the currently **filtered** entries.
- The file format is the same as the input: NDJSON (`.log`).

---

## Visual / UI Requirements

### VR-01 – Theme

- **Dark theme** exclusively.
- Color palette:
  - Background: deep navy / near-black.
  - Surface cards: slightly lighter semi-transparent layer.
  - Accent: teal / cyan (used on icons, active toggle buttons, info badges).
  - Primary text: near-white.
  - Secondary / muted text: medium gray.

### VR-02 – Layout

- Full viewport height, no scrollable top-level container (inner sections scroll individually).
- **Header** centered at the top: `FileText` icon in an accent-tinted circle + bold app title + muted subtitle.
- Empty state: centered card stack (max-width ~672 px).
- Loaded state: stacked sections — file bar → filters card → table.

### VR-03 – Upload Area

- Card with a **dashed border** (2px), rounded corners.
- Upload icon centered inside a rounded full-circle accent-tinted background.
- Hover state: slightly lighter card background (CSS transition).

### VR-04 – Filter Section

- Single bordered card with internal padding.
- Three labeled rows: **Log Levels**, **Cluster IDs**, **Timeframe**.
- Toggle buttons:
  - **Active**: filled with accent color.
  - **Inactive**: outlined / ghost style.

### VR-05 – Table

- Rows on the dark background (no alternating zebra stripes needed).
- **Timestamp values** rendered in an amber / gold accent color.
- Level column: pill-shaped badges with distinct fill colors per level:

| Level | Color |
|---|---|
| `info` | Blue |
| `error` | Red |
| `warning` | Amber / orange |
| `debug` | Gray |

### VR-06 – Detail Drawer

- Slides in from the right, covering roughly half the viewport width.
- Header: "Log Details" label + level badge pill.
- Each field: uppercase/capitalized label above a dark monospace value box.
- Smooth open/close transition.

### VR-07 – Typography & Icons

- App title: large, bold (e.g., `text-4xl font-bold`).
- All log data (table cells, drawer values, format example): **monospace** (`font-mono`).
- Icon library: **lucide-react**.
