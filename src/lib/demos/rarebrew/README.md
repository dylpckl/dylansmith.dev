Data only — the rarebrew demo is a UI recreation, so nothing here is vendored code.

`deck.ts` is a snapshot of the public "Light Party" deck's main build (rare-brew
Supabase project). The live build is 103 cards; Plains is trimmed 6 → 3 so the
demo shows a legal 100. Keep that trim when refreshing.

Refresh: re-run the main-build query (deck_cards ⨝ deck_board_cards on
`decks.default_board_id` ⨝ cards, prices, card_classifications→tags) for deck
`04aaf68e-483d-4152-aed5-42b1ac1927ce`, then regenerate the `ROWS` table. Card
images are built from the Scryfall printing id, same as the app's
`lib/api/scryfall.ts`.
