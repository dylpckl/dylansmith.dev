import type { Section, SectionWithProse } from "./types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export type ParsedBody = {
  intro: string;
  sections: SectionWithProse[];
  outro: string;
};

export function parseBody(body: string, sections: Section[]): ParsedBody {
  const lines = body.split("\n");
  const chunks: { heading: string | null; lines: string[] }[] = [
    { heading: null, lines: [] },
  ];

  for (const line of lines) {
    const h2Match = /^##\s+(.+?)\s*$/.exec(line);
    if (h2Match) {
      chunks.push({ heading: h2Match[1], lines: [] });
    } else {
      chunks[chunks.length - 1].lines.push(line);
    }
  }

  const intro = chunks[0].lines.join("\n").trim();
  const byId = new Map(sections.map((s) => [s.id, s]));
  const entries: SectionWithProse[] = [];

  let outro = "";

  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const headingSlug = slugify(chunk.heading ?? "");
    const section = byId.get(headingSlug);
    const prose = chunk.lines.join("\n").trim();

    if (section) {
      entries.push({ ...section, prose });
    } else if (i === chunks.length - 1) {
      outro = prose;
    }
  }

  for (const section of sections) {
    if (!entries.find((s) => s.id === section.id)) {
      entries.push({ ...section, prose: "" });
    }
  }

  entries.sort(
    (a, b) =>
      sections.findIndex((s) => s.id === a.id) -
      sections.findIndex((s) => s.id === b.id),
  );

  return { intro, sections: entries, outro };
}
