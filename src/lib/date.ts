// Datas do backend chegam como 'YYYY-MM-DD'. `new Date('YYYY-MM-DD')` interpreta isso
// como meia-noite UTC, o que no Brasil (UTC-3) exibe o dia anterior — por isso
// essas funções tratam a string diretamente, sem conversão de fuso.

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})/;

export function formatDate(value: string): string {
  const match = DATE_ONLY.exec(value);
  if (!match) return new Date(value).toLocaleDateString('pt-BR');
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

// Valor para <input type="date">
export function toDateInput(value?: string | null): string {
  return value ? (DATE_ONLY.exec(value)?.[0] ?? '') : '';
}

// Data de hoje no fuso local, no formato 'YYYY-MM-DD'
export function todayInput(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}
