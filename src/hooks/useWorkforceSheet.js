/**
 * useWorkforceSheet
 * ─────────────────
 * Fetches the entire workforce register from Google Sheets once,
 * caches it in module scope, then filters client-side by district & block.
 *
 * States returned:
 *   workers  – array of worker objects matching current district + block
 *   loading  – true while the first network fetch is in flight
 *   error    – non-null string if fetch or parse failed
 *   refresh  – call to force a re-fetch (clears module cache)
 */

import { useCallback, useEffect, useReducer, useRef } from "react";
import { getSheetUrl, SHEET_CONFIGURED } from "../config/sheetsConfig";
import { getDistrictWorkforce } from "../data/workforceData";

// ── Module-level cache so we only fetch once per page load ──────────
let _cachedRows = null;   // null = not fetched, [] = empty, [...] = data
let _fetchPromise = null; // in-flight promise deduplication

/** Parse the gviz/tq JSON-wrapped response into plain row objects. */
function parseGvizJson(rawText) {
  // Google wraps the response: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const jsonString = rawText
    .replace(/^[^{]*/, "")  // strip leading callback text
    .replace(/\);?\s*$/, ""); // strip trailing );

  const data = JSON.parse(jsonString);
  const cols = data.table.cols.map((c) => c.label.trim());
  const rows = data.table.rows || [];

  return rows
    .filter((row) => row && row.c && row.c[0] && row.c[0].v) // skip blank rows
    .map((row, rowIndex) => {
      const get = (index) => (row.c[index] ? (row.c[index].v ?? "") : "");
      const name     = String(get(0)).trim();
      const jobRole  = String(get(1)).trim();
      const district = String(get(2)).trim();
      const block    = String(get(3)).trim();
      const aadhar   = String(get(4)).trim();
      const gender   = String(get(5)).trim();
      const cert     = String(get(6)).trim();
      const expYears = Number(get(7)) || 0;
      const expCos   = Number(get(8)) || 0;
      const lastPkg  = Number(get(9)) || 0;

      return {
        id: `sheet-${rowIndex}`,
        name,
        jobRole,
        district,
        block,
        location: `${district} / ${block}`,
        aadhar,
        gender,
        certification: cert,
        experienceYears: expYears,
        experienceCompanies: expCos,
        lastPackage: lastPkg,
        // derive roleKey for existing filter dropdown compatibility
        roleKey: deriveRoleKey(jobRole),
        // keep employmentStatus for summary counts (not in sheet = "—")
        employmentStatus: "—",
      };
    });
}

const ROLE_KEY_MAP = {
  "dumper": "dumper",  "tipper": "dumper",
  "excavator": "excavator",
  "loader": "loader",
  "mechanic": "mechanic",
  "electrician": "electrician",
  "welder": "welder",
};

function deriveRoleKey(jobRole) {
  const lower = jobRole.toLowerCase();
  for (const [keyword, key] of Object.entries(ROLE_KEY_MAP)) {
    if (lower.includes(keyword)) return key;
  }
  return "other";
}

/** Fetch all rows from Google Sheets (deduplicated, module-cached). */
async function fetchAllRows() {
  if (_cachedRows !== null) return _cachedRows;
  if (_fetchPromise) return _fetchPromise;

  _fetchPromise = fetch(getSheetUrl())
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    })
    .then((text) => {
      _cachedRows = parseGvizJson(text);
      _fetchPromise = null;
      return _cachedRows;
    })
    .catch((err) => {
      _fetchPromise = null;
      throw err;
    });

  return _fetchPromise;
}

// ── Reducer ─────────────────────────────────────────────────────────
const initialState = { workers: [], loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case "LOADING": return { ...state, loading: true, error: null };
    case "SUCCESS": return { loading: false, error: null, workers: action.workers };
    case "ERROR":   return { ...state, loading: false, error: action.message };
    default:        return state;
  }
}

// ── Hook ─────────────────────────────────────────────────────────────
/**
 * Returns ALL workers for the selected district.
 * Block-level filtering is done by the caller so it is instant (no re-fetch).
 */
export function useWorkforceSheet(districtObj) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refreshKey = useRef(0);

  const load = useCallback(async () => {
    if (!districtObj) {
      dispatch({ type: "SUCCESS", workers: [] });
      return;
    }

    // If sheet isn't configured, fall back to generated data immediately
    if (!SHEET_CONFIGURED) {
      const fallback = getDistrictWorkforce(districtObj);
      dispatch({ type: "SUCCESS", workers: fallback });
      return;
    }

    dispatch({ type: "LOADING" });

    try {
      const allRows = await fetchAllRows();
      const filtered = allRows.filter(
        (w) => w.district.toLowerCase() === districtObj.name.toLowerCase()
      );
      dispatch({ type: "SUCCESS", workers: filtered });
    } catch (err) {
      dispatch({ type: "ERROR", message: err.message || "Failed to load data from Google Sheets." });
    }
  }, [districtObj]);

  // Trigger fetch whenever district/refreshKey changes
  useEffect(() => {
    load();
  }, [load, refreshKey.current]); // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(() => {
    _cachedRows = null; // clear module cache
    refreshKey.current += 1;
    load();
  }, [load]);

  return { ...state, refresh };
}

