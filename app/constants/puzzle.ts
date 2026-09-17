
 
export interface PuzzleData {
  rows: { label: string; id: string }[];
  cols: { label: string; id: string }[];
  solutions: Record<string, string>;
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
  // TODO: remplacer ces placeholders (hérités du thème métro) par les vraies réponses nucléaire
  solutions: {
    "r1-c1": "Italie",
    "r1-c2": "Slovaquie",
    "r1-c3": "Chine",
    "r2-c1": "Belgique",
    "r2-c2": "Hongrie",
    "r2-c3": "Corée du Sud",
    "r3-c1": "Suisse",
    "r3-c2": "France",
    "r3-c3": "Canada",
  }
};
