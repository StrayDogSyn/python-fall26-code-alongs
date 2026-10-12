/* Verified Gemini Notebook Studio artifacts. See site/README.md for the contract.
 * Add one entry per instructor-reviewed artifact; the hub renders it as a
 * "Study route" card inside the matching lesson view. Leave this list empty
 * until an artifact's accuracy and student access have been checked.
 *
 * Entry shape:
 * {
 *   unit: "week01",                         // must match a unit id in plan.js
 *   title: "Look → Move → Act infographic", // artifact title
 *   format: "infographic",                  // audio|video|mindmap|infographic|table|flashcards|quiz|report|deck
 *   scope: "W01 sources",                   // which notebook sources it was grounded on
 *   reviewDate: "2026-10-12",               // YYYY-MM-DD of the instructor accuracy check
 *   visibility: "cohort",                   // "public" or "cohort"
 *   url: "https://notebook.google.com/…",   // shareable artifact link
 *   alt: "One-page troubleshooting flow pairing symptoms with first safe checks."
 * }
 */
window.NOTEBOOK_ARTIFACTS = [];
