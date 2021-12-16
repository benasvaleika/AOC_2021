import { readFileSync } from "fs";

// Uable to find the solution. Saved this elegant solution to analyse later
const input = readFileSync("./src/Day12/day12.txt", "utf-8")
  .trim()
  .split(/\n+/)
  .map((line) => line.trim().split(/\s+/));

function countAllPaths(
  edges: Record<string, string[]>,
  specialRevisitAvailable = false,
  curr = "start",
  path: string[] = []
): number {
  if (curr === "end") return 1;
  const isSmall = curr === curr.toLowerCase();

  if (isSmall && path.includes(curr)) {
    if (specialRevisitAvailable && curr !== "start") {
      specialRevisitAvailable = false;
    } else {
      return 0;
    }
  }

  return edges[curr].reduce(
    (acc, neighbor) =>
      acc +
      countAllPaths(edges, specialRevisitAvailable, neighbor, [...path, curr]),
    0
  );
}

export function getData(): Record<string, string[]> {
  const edges: Record<string, string[]> = {};
  input.forEach((line) => {
    const [a, b] = line[0].split("-");
    edges[a] = edges[a] ?? [];
    edges[b] = edges[b] ?? [];
    edges[a].push(b);
    edges[b].push(a);
  });
  return edges;
}

console.log(countAllPaths(getData()));
console.log(countAllPaths(getData(), true));
