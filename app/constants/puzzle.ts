export interface PuzzleData {
  rows: { label: string; id: string }[];
  cols: { label: string; id: string }[];
  solutions: Record<string, string[]>;
}

export const PUZZLE: PuzzleData = {
  rows: [
    { label: "N'a pas participé à la dernière Coupe du monde de Foot", id: "r1" },
    { label: "Aime le rouge", id: "r2" },
    { label: "Céline Dion s'y plairait", id: "r3" },
  ],
  cols: [
  { label: "A dit STOP", id: "c1" },
  { label: "Plus de 50% du mix électrique (grosso modo)", id: "c2" },
  { label: "Top 10 en production absolue", id: "c3" },
],
  solutions: {
    "r1-c1": ["Louvre-Rivoli", "Châtelet"],
    "r1-c2": ["Saint-Paul"],
    "r1-c3": ["Tuileries"],
    "r2-c1": ["Saint-Maurice"], // Example placeholders
    "r2-c2": ["Saint-Lazare", "Saint-Michel"],
    "r2-c3": ["Saint-Germain-des-Prés"],
    "r3-c1": ["Châtelet"],
    "r3-c2": ["Saint-Denis", "Saint-Martin"],
    "r3-c3": ["Gare de Lyon"],
  }
};
