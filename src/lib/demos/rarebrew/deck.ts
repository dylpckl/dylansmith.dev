// Snapshot of the "Light Party" main build from rarebrew.gg (a public deck),
// taken 2026-10. Prices are USD at snapshot time. `print` is the Scryfall
// printing id; images come straight off Scryfall's CDN, same as the app.

export type DeckCard = {
  name: string;
  cost: string;
  cmc: number;
  type: string;
  print: string;
  usd: number | null;
  tags: string[];
  qty: number;
  commander?: boolean;
  /** Double-faced layouts get a back image on Scryfall. */
  dfc?: boolean;
};

type Row = [
  name: string,
  cost: string,
  cmc: number,
  type: string,
  print: string,
  usd: number | null,
  tags?: string[],
  extra?: { qty?: number; dfc?: boolean },
];

const ROWS: Row[] = [
  ["Adarkar Wastes", "", 0, "Land", "42e0aa15-639a-4e88-9bd8-ce5e7c7d7649", 0.37],
  ["Arcane Sanctum", "", 0, "Land", "9ec9245a-bfd4-4fbd-83da-28c89abad011", 0.55],
  ["Base Camp", "", 0, "Land", "dc85412e-333d-4e7d-8c85-40618cf1b6c2", 0.11],
  ["Bleachbone Verge", "", 0, "Land", "52dcdabd-a186-45fe-9fee-6c0f1afeaf16", 10.48],
  ["Bojuka Bog", "", 0, "Land", "55b5b094-9d2d-4d96-b90c-78fecdae725a", 1.04],
  ["Caves of Koilos", "", 0, "Land", "a8a57915-5226-4d3c-ae8e-a55c50f3c131", 0.39],
  ["Command Tower", "", 0, "Land", "27e36832-09ca-4070-8511-94580014c3ed", 0.37],
  ["Deserted Beach", "", 0, "Land", "c819de09-dac2-407a-98c8-775865e9bdf8", 5.31],
  ["Dungeon Descent", "", 0, "Land", "b9c7b02d-ac45-45b1-9f1b-2dbd2b5c3cdc", 0.42, ["Dungeon"]],
  ["Flooded Strand", "", 0, "Land", "8c2996d9-3287-4480-8c04-7a378e37e3cf", 15.38],
  ["Floodfarm Verge", "", 0, "Land", "d53ed0db-1199-44b3-8eda-8189dfcf53d1", 8.11],
  ["Glacial Fortress", "", 0, "Land", "a1fc8d86-b118-46e3-92a5-8cbf2ca282f7", 0.33],
  ["Godless Shrine", "", 0, "Land — Plains Swamp", "8c542ea4-98c3-4c2d-9066-205ab7aa697a", 11.04],
  ["Hallowed Fountain", "", 0, "Land — Plains Island", "e056b55f-82ed-4fe0-ab0c-bb20fa4a218a", 8.37],
  ["Meticulous Archive", "", 0, "Land — Plains Island", "652236c2-84ef-45e4-b5fc-ed6170bc3d6c", 10.81],
  ["Morphic Pool", "", 0, "Land", "48e40927-dd87-42ed-b805-0ae8ba81f5fb", 31.78],
  ["Otawara, Soaring City", "", 0, "Legendary Land", "486d7edc-d983-41f0-8b78-c99aecd72996", 29.6, ["Removal"]],
  ["Path of Ancestry", "", 0, "Land", "9335e773-4b45-4b91-8140-5159fe7e0395", 0.32],
  ["Plains", "", 0, "Basic Land — Plains", "5f9b6584-ad27-410d-b6f1-c25c91630aea", 0.11, [], { qty: 6 }],
  ["Prairie Stream", "", 0, "Land — Plains Island", "ce3a0ad9-6b7a-470c-8e49-4121fea72c89", 0.34],
  ["Raffine's Tower", "", 0, "Land — Plains Island Swamp", "a2c56479-4bee-4edb-80d7-4af010b7c793", 14.31, ["Card Draw"]],
  ["Rogue's Passage", "", 0, "Land", "a2a424ea-ef32-4ac5-8f8c-3ea1839f01d4", 0.43],
  ["Shadowy Backstreet", "", 0, "Land — Plains Swamp", "69c1b656-1d67-499c-bf0f-417682a86c7d", 12.4],
  ["Shineshadow Snarl", "", 0, "Land", "e45eff2e-c624-4c59-b192-a9d7dc2eeeba", 0.36],
  ["Shipwreck Marsh", "", 0, "Land", "156df6eb-1ac9-4954-bf93-b1668096b8bd", 7.01],
  ["Soulstone Sanctuary", "", 0, "Land", "98f4cc78-c25f-494c-b57e-c185d37605e8", 1.4],
  ["Starting Town", "", 0, "Land — Town", "fc7d1912-7e27-49ef-bd98-375d975a42b0", 9.44],
  ["Sunken Hollow", "", 0, "Land — Island Swamp", "7ab0a5f2-5260-403d-9522-954efc91e96d", 0.38],
  ["Undercity Sewers", "", 0, "Land — Island Swamp", "2b5801fb-2026-4f25-98bc-ebb2f99684b9", 18.48],
  ["Underground River", "", 0, "Land", "c219a41a-d5f4-42f3-841c-2518be583198", 1.29],
  ["Watery Grave", "", 0, "Land — Island Swamp", "5b8170dc-6a90-46fc-9989-7575f3d402b5", 11.12],
  ["Archpriest of Iona", "{W}", 1, "Creature — Human Cleric", "a23d588e-f7d8-4a11-9bf5-77b9f6faffd4", 0.31, ["Buff", "Full Party"]],
  ["Changeling Outcast", "{B}", 1, "Creature — Shapeshifter", "ab499df5-ed76-43ad-81b3-70afd0487ccd", 2.01, ["Evasion", "Gameplan"]],
  ["Concerted Defense", "{U}", 1, "Instant", "235c108d-3902-4c2e-919c-a5449cd2dc3c", 0.11, ["Counterspell", "Full Party", "Gameplan"]],
  ["Erode", "{W}", 1, "Instant", "32e670da-7563-4f6a-a7db-4c126a440eb8", 9.45, ["Ramp", "Removal"]],
  ["Fly", "{U}", 1, "Enchantment — Aura", "f1a91cc6-67e1-4f1b-86e2-eb388a75d6ad", 0.29, ["Dungeon"]],
  ["Multiclass Baldric", "{1}", 1, "Artifact — Equipment", "dbb7927d-c3c4-4464-8ada-bcd8466b2012", 0.65, ["Buff", "Full Party", "Protection"]],
  ["Path to Exile", "{W}", 1, "Instant", "90b690f4-9647-4e67-b7cb-b2692ea149b1", 0.9, ["Ramp", "Removal"]],
  ["Practiced Tactics", "{W}", 1, "Instant", "91b448f4-aa0c-42c7-a771-e8dd20e0520c", 0.09, ["Full Party", "Removal"]],
  ["Requisition Raid", "{W}", 1, "Sorcery", "6d9efae9-365d-46c8-be92-d4a3038f0414", 0.26, ["Removal"]],
  ["Restoration Magic", "{W}", 1, "Instant", "494e68e9-ecba-4482-82bc-207ad59144c1", 1.83, ["Protection"]],
  ["Sol Ring", "{1}", 1, "Artifact", "870ec754-a76c-40ea-9b81-81b3dca1f62c", 1.08, ["Ramp"]],
  ["Weathered Wayfarer", "{W}", 1, "Creature — Human Nomad Cleric", "72277d98-f443-4a27-9804-f391b1fa71d7", 1.15],
  ["Arcane Signet", "{2}", 2, "Artifact", "7811dd72-61b9-4067-ac20-cea153e625d2", 0.35, ["Ramp"]],
  ["Astrologian's Planisphere", "{1}{U}", 2, "Artifact — Equipment", "bfa4e927-1d6f-4a64-9801-7d168a5ef3f6", 0.29],
  ["Bitterblossom", "{1}{B}", 2, "Kindred Enchantment — Faerie", "b9640cbf-b016-410e-9eff-e8924883517b", 33.14],
  ["Dovin's Veto", "{W}{U}", 2, "Instant", "ba332954-ed8c-48d7-8d85-971c7b71dccf", 2.25, ["Counterspell"]],
  ["Flowering of the White Tree", "{W}{W}", 2, "Legendary Enchantment", "2203b2cd-48e5-471a-85fe-dc81012e5d61", 8.43, ["Protection"]],
  ["Joined Researchers // Secret Rendezvous", "{1}{W} // {1}{W}{W}", 2, "Creature — Human Cleric Wizard // Sorcery", "1ebaafe0-3a9a-424c-8698-d26e7be45343", 0.28, ["Card Draw"]],
  ["Lightning Greaves", "{2}", 2, "Artifact — Equipment", "08005be9-fbf4-43e6-a742-b1fb8196c4a5", 3.33, ["Protection"]],
  ["Selfless Spirit", "{1}{W}", 2, "Creature — Spirit Cleric", "9cd16dac-3bf9-4a71-a906-0cfbf98cdca5", 0.39, ["Evasion", "Protection"]],
  ["Sygg, Wanderwine Wisdom // Sygg, Wanderbrine Shield", "{1}{U}", 2, "Legendary Creature — Merfolk Wizard // Legendary Creature — Merfolk Rogue", "70adc870-f0db-4d4b-863b-673c2c258751", 0.34, ["Card Draw", "Evasion", "Protection"], { dfc: true }],
  ["Talisman of Progress", "{2}", 2, "Artifact", "b356ee36-1c62-4097-87d7-fef6a6dad067", 0.38, ["Ramp"]],
  ["Thieving Skydiver", "{1}{U}", 2, "Creature — Merfolk Rogue", "06996ff1-7f57-4e73-940a-a58c4482cadd", 0.36, ["Removal"]],
  ["Unsettled Mariner", "{W}{U}", 2, "Creature — Shapeshifter", "9634bcc5-77bc-4a87-99e2-33f09fca13d1", 6.52, ["Full Party", "Protection"]],
  ["Urdnan, Dromoka Warrior", "{1}{W}", 2, "Legendary Creature — Human Warrior", "f239682a-2b81-4f62-a474-60e8db343200", 0.4],
  ["Yuan-Ti Malison", "{1}{U}", 2, "Creature — Snake Rogue", "0f51afd9-7093-4aa3-ad5b-7383684d6285", 0.36, ["Dungeon"]],
  ["Acererak the Archlich", "{2}{B}", 3, "Legendary Creature — Zombie Wizard", "dd52d0bd-3abd-401c-9f56-ee911613da3b", 5.03, ["Dungeon", "Removal"]],
  ["Adept Watershaper", "{2}{W}", 3, "Creature — Merfolk Cleric", "6e53f246-8347-4632-9d5b-4aeb12f7b762", 0.54, ["Protection"]],
  ["Ardbert, Warrior of Darkness", "{1}{W}{B}", 3, "Legendary Creature — Spirit Warrior", "866400d8-c94b-4b1a-ba5a-20f9d92476db", 2.32, ["Buff"]],
  ["Black Market Connections", "{2}{B}", 3, "Enchantment", "9bac8176-d0db-4397-820d-acbdd3264377", 19.33, ["Card Draw", "Gameplan", "Ramp"]],
  ["Blue Mage's Cane", "{2}{U}", 3, "Artifact — Equipment", "9b3cfc13-db4e-4ec3-8444-f715bcd43be6", 0.23, ["Recursion"]],
  ["Flawless Maneuver", "{2}{W}", 3, "Instant", "ab12f69e-1491-47a8-8c46-d85bbf637ff6", 21.02, ["Protection"]],
  ["Glasspool Mimic // Glasspool Shore", "{2}{U}", 3, "Creature — Shapeshifter Rogue // Land", "5adcb500-8c77-4925-8e2c-1243502827d1", 5.69, [], { dfc: true }],
  ["Hama Pashar, Ruin Seeker", "{1}{W}{U}", 3, "Legendary Creature — Human Wizard", "47b8eb2e-73ac-4ad6-9ab6-4f8da7b41020", 0.23, ["Dungeon"]],
  ["Harper Recruiter", "{2}{W}", 3, "Creature — Human Warrior", "6bb131fd-d96f-43e0-a40d-fa6394a4b75c", 0.34, ["Tutor"]],
  ["Imoen, Mystic Trickster", "{2}{U}", 3, "Legendary Creature — Human Rogue Wizard", "1097264b-e383-4864-a587-dc7d5468f359", 0.22, ["Card Draw", "Dungeon"]],
  ["Jill, Shiva's Dominant // Shiva, Warden of Ice", "{2}{U}", 3, "Legendary Creature — Human Noble Warrior // Legendary Enchantment Creature — Saga Elemental", "863dc1bd-8554-42ba-8d49-d99ea969103d", 2.63, ["Removal"], { dfc: true }],
  ["Linvala, Shield of Sea Gate", "{1}{W}{U}", 3, "Legendary Creature — Angel Wizard", "ae337294-b5b9-471d-a292-1ba3ca3a5d1a", 0.34, ["Full Party", "Protection"]],
  ["Nadaar, Selfless Paladin", "{2}{W}", 3, "Legendary Creature — Dragon Knight", "878a0d8c-11c1-4c65-9051-78e036ac496f", 0.39, ["Dungeon"]],
  ["Nalia de'Arnise", "{1}{W}{B}", 3, "Legendary Creature — Human Rogue", "7a1294fd-9885-4dfd-8192-0ca074fc83f7", null, ["Full Party"]],
  ["Relic of Legends", "{3}", 3, "Artifact", "ed235727-7e60-4b37-8947-4b3613711c4d", 1.46, ["Ramp"]],
  ["Sefris of the Hidden Ways", "{W}{U}{B}", 3, "Legendary Creature — Human Wizard", "d30255f6-e058-476a-b377-2ee4c9178ed1", null, ["Dungeon", "Recursion"]],
  ["Split Up", "{1}{W}{W}", 3, "Sorcery", "7428a157-67e8-48fb-9882-54bf3ae001e3", 2.07, ["Board Wipe"]],
  ["The Destined Thief", "{2}{U}", 3, "Legendary Creature — Human Rogue", "de95250d-294d-4a0e-8049-e0a877078e2e", 3.4, ["Card Draw", "Full Party"]],
  ["Venat, Heart of Hydaelyn // Hydaelyn, the Mothercrystal", "{1}{W}{W}", 3, "Legendary Creature — Elder Wizard // Legendary Creature — God", "2625c00d-0a51-4481-bf36-cf13a2546242", 1.28, ["Card Draw", "Protection", "Removal"], { dfc: true }],
  ["White Plume Adventurer", "{2}{W}", 3, "Creature — Orc Cleric", "b256ddc8-8b12-434c-a610-1a872e948f2f", 2.57, ["Dungeon"]],
  ["Barrowin of Clan Undurr", "{2}{W}{B}", 4, "Legendary Creature — Dwarf Cleric", "6896c311-5593-4437-b945-43ade9665e43", 0.16, ["Dungeon", "Recursion"]],
  ["Burakos, Party Leader", "{3}{B}", 4, "Legendary Creature — Orc", "899e278d-5d4e-461a-9878-2b85de16b38d", null, ["Full Party", "Ramp"]],
  ["Circle of Power", "{3}{B}", 4, "Sorcery", "b6dc1f5a-a6cc-4ab4-8bb9-e216e24ca735", null, ["Card Draw"]],
  ["Maskwood Nexus", "{4}", 4, "Artifact", "c6f2c543-9b01-4760-966a-f0609c24f53e", 1.06, ["Gameplan"]],
  ["Midnight Pathlighter", "{2}{W}{U}", 4, "Creature — Human Wizard", "8eb6f699-1b5d-412b-a697-ee94b7be07a6", 1.22],
  ["Ravenloft Adventurer", "{3}{B}", 4, "Creature — Human Rogue Assassin", "a5e27c36-d883-4681-8430-b4d0ad7f1df0", 0.38, ["Dungeon"]],
  ["Sarevok's Tome", "{4}", 4, "Artifact — Book", "5a470690-a05d-4311-963c-50cbf779846d", 4.5, ["Dungeon", "Ramp"]],
  ["Seasoned Dungeoneer", "{3}{W}", 4, "Creature — Human Warrior", "7fee3f76-20a8-4621-84fb-ddf79c955532", 5.98, ["Dungeon", "Protection"]],
  ["Squad Commander", "{3}{W}", 4, "Creature — Kor Warrior", "5390bbf3-9906-46a9-81d3-60e23eb89ca1", 0.25, ["Dungeon", "Full Party", "Protection"]],
  ["Coveted Prize", "{4}{B}", 5, "Sorcery", "5afbc5d3-318f-4545-88d6-fc81e5466238", 0.28, ["Full Party", "Tutor"]],
  ["Deadly Alliance", "{4}{B}", 5, "Instant", "007a5c8c-ed0b-4844-9393-a3d25d4ffa1d", 0.11, ["Full Party", "Removal"]],
  ["Journey to Oblivion", "{4}{W}", 5, "Enchantment", "47120e3c-73aa-468d-96b7-47aead342e31", 0.08, ["Full Party", "Gameplan", "Removal"]],
  ["Rilsa Rael, Kingpin", "{3}{U}{B}", 5, "Legendary Creature — Human Rogue", "54484439-6f8a-47f1-8d62-4689af7f00c2", 0.16, ["Dungeon"]],
  ["Solemn Doomguide", "{3}{B}{B}", 5, "Creature — Tiefling Cleric", "b467929d-5fc3-4104-8a29-a8157835f274", 0.36, ["Recursion"]],
  ["Stick Together", "{3}{W}{W}", 5, "Sorcery", "8d77a57a-e30b-46d7-acb8-1d164c7dff78", 0.34, ["Board Wipe"]],
  ["Zenos yae Galvus // Shinryu, Transcendent Rival", "{3}{B}{B}", 5, "Legendary Creature — Human Noble Warrior // Legendary Creature — Dragon", "b65ffce4-bb58-418a-9bad-81533a5f2ba2", 0.36, ["Board Wipe", "Finisher"], { dfc: true }],
  ["Austere Command", "{4}{W}{W}", 6, "Sorcery", "8ee73fe8-d52b-43bb-ab91-5545192be676", 1.51, ["Board Wipe"]],
  ["Radiant Solar", "{5}{W}", 6, "Creature — Angel", "fa0e443a-c479-40ab-9702-8beca3e5ab95", 3.33, ["Dungeon"]],
  ["Spoils of Adventure", "{4}{W}{U}", 6, "Instant", "2e4a0686-cb48-404c-a15a-2ad1c53aa144", 0.21, ["Card Draw", "Full Party"]],
  ["Thwart the Grave", "{4}{B}{B}", 6, "Sorcery", "cc339d3b-9c89-4679-bc83-8399d9a864c7", 0.34, ["Gameplan", "Recursion"]],
];

export const COMMANDER: DeckCard = {
  name: "The Destined Warrior",
  cost: "{1}{W}{U}{B}",
  cmc: 4,
  type: "Legendary Creature — Human Warrior",
  print: "743ee254-07f1-4d13-9ec7-6cb6358b9303",
  usd: 3.75,
  tags: ["Ramp"],
  qty: 1,
  commander: true,
};

export const DECK_NAME = "Light Party";
export const DECK_COLORS = ["W", "U", "B"] as const;

export const CARDS: DeckCard[] = ROWS.map(
  ([name, cost, cmc, type, print, usd, tags = [], extra = {}]) => ({
    name,
    cost,
    cmc,
    type,
    print,
    usd,
    tags,
    qty: extra.qty ?? 1,
    dfc: extra.dfc,
  }),
);

/** Scryfall CDN url for a printing — mirrors rarebrew's lib/api/scryfall.ts. */
export function scryfallImage(
  print: string,
  size: "normal" | "small" | "art_crop" = "normal",
  face: "front" | "back" = "front",
): string {
  return `https://cards.scryfall.io/${size}/${face}/${print[0]}/${print[1]}/${print}.jpg`;
}
