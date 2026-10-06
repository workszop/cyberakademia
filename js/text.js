// ============================================================
// CyberAkademia - text.js
// Polish text helpers shared by the shell and modules
// ============================================================

export const SECTION_FORMS = ['sekcja', 'sekcje', 'sekcji'];
export const TERM_FORMS = ['termin', 'terminy', 'terminów'];

/** pluralPl(5, ['termin', 'terminy', 'terminów']) → '5 terminów' */
export function pluralPl(n, [one, few, many]) {
  const mod10 = n % 10, mod100 = n % 100;
  const form = n === 1 ? one
    : (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) ? few
    : many;
  return `${n} ${form}`;
}
