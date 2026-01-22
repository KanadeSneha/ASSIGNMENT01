

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getCurrentDateISO(): string {
  return toISODate(new Date());
}

export function getPastDateISO(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return toISODate(d);
}

export function getFutureDateISO(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return toISODate(d);
}
