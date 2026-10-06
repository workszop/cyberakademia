// ─── Provenance and organizational takeaways ───

export const SOURCES = {
  original: { label: 'Przewodnik źródłowy (PDF, 9.06.2026)', url: './cyberbezpieczenstwo-w-organizacjach_2026_06_09.md.pdf' },
  ksc: { label: 'Ministerstwo Cyfryzacji: harmonogram KSC', url: 'https://www.gov.pl/web/cyfryzacja/nowelizacja-ustawy-o-krajowym-systemie-cyberbezpieczenstwa-zaczyna-obowiazywac' },
  kscAct: { label: 'KSC: nowelizacja, Dz.U. 2026 poz. 252', url: 'https://eli.gov.pl/eli/DU/2026/252/ogl/pol' },
  nis1: { label: 'NIS: dyrektywa 2016/1148', url: 'https://eur-lex.europa.eu/eli/dir/2016/1148/oj/pol' },
  nis2: { label: 'NIS2: art. 23 i 34', url: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj/pol' },
  dora: { label: 'DORA: rozporządzenie 2022/2554', url: 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj/pol' },
  doraReporting: { label: 'DORA: terminy, art. 5 rozporządzenia 2025/301', url: 'https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/pol' },
  doraFines: { label: 'Polskie kary DORA: art. 18zm (PDF)', url: 'https://eli.gov.pl/api/acts/DU/2006/1119/text/U/D20061119Lj.pdf#page=80' },
  rodo: { label: 'UODO: art. 33 i 34 RODO', url: 'https://bip.uodo.gov.pl/pl/525/2584' },
  rodoAct: { label: 'RODO: art. 83', url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/pol' },
  iso: { label: 'ISO: ISO/IEC 27001', url: 'https://www.iso.org/standard/27001' },
  backup: { label: 'CISA: zasada 3-2-1 (PDF)', url: 'https://www.cisa.gov/sites/default/files/publications/data_backup_options.pdf' },
  backupExtension: { label: 'Veeam: praktyka 3-2-1-1-0', url: 'https://www.veeam.com/blog/321-backup-rule.html' },
};

export const MODULE_NOTES = {
  fundamenty: {
    takeaways: ['Wskaż krytyczne dane i usługi oraz skutki utraty ich poufności, integralności i dostępności.', 'Dla największych ryzyk przypisz kontrolę, osobę odpowiedzialną i sposób sprawdzenia jej działania.'],
    sources: ['original'],
  },
  regulacje: {
    takeaways: ['Ustal, które przepisy obejmują organizację; zapisz podstawę kwalifikacji i terminy.', 'Przypisz osoby odpowiedzialne za ocenę incydentów, zgłoszenia i dowody wykonania obowiązków.'],
    sources: ['original', 'ksc', 'kscAct', 'nis2', 'dora', 'doraReporting', 'doraFines', 'rodo', 'rodoAct', 'iso'],
    checked: 'Sprawdzenie punktowe 6.10.2026: harmonogram KSC i próg zgłaszania naruszeń RODO. Pozostała treść pochodzi z przewodnika i wskazanych aktów; nie przeszła pełnego przeglądu prawnego.',
  },
  organizacja: {
    takeaways: ['Przypisz role i uprawnienia decyzyjne, także poza godzinami pracy.', 'Sprawdź procedurę reagowania i ciągłość działania w ćwiczeniu; zapisz luki i działania naprawcze.'],
    sources: ['original'],
  },
  technologia: {
    takeaways: ['Dobieraj narzędzia do ryzyka i procesów, nie tylko do listy produktów.', 'Sprawdź MFA, dostęp administracyjny i odtwarzanie kopii; zmierz wynik względem RPO i RTO.'],
    sources: ['original', 'backup', 'backupExtension'],
    checked: 'Sprawdzenie punktowe 6.10.2026: zasada 3-2-1, w tym kopia poza siedzibą. Offline lub niezmienialność to osobne zabezpieczenie, opisane w rozszerzeniu 3-2-1-1-0.',
  },
  integracja: {
    takeaways: ['Połącz obowiązek prawny z procesem, narzędziem i dowodem działania.', 'Prześledź scenariusz incydentu od wykrycia przez eskalację po odtworzenie usług.'],
    sources: ['original'],
  },
  plan: {
    takeaways: ['Wybierz pierwsze działania i przypisz właścicieli, terminy oraz dowody wykonania.', 'Wracaj do planu po incydencie, ćwiczeniu lub audycie i aktualizuj priorytety według ryzyka.'],
    sources: ['original', 'ksc'],
    checked: 'Harmonogram KSC sprawdzony punktowo 6.10.2026. Siedem kroków to zalecana praktyka wdrożeniowa, nie uniwersalny katalog obowiązków prawnych.',
  },
};
