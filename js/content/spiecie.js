/**
 * SPIECIE - powiązania regulacje ↔ organizacja ↔ technologia
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 *
 * Kluczowa idea dokumentu: technologia bez procesów to wydatek, a nie bezpieczeństwo.
 * Właściwa kolejność: Zrozum obowiązek i ryzyko → Ułóż proces i role → Dobierz narzędzie.
 */

export const CONNECTIONS = [
  {
    id: 'c1',
    regulatory: 'Wykrywaj incydenty (NIS2 Art. 21, DORA Art. 10)',
    organizational: 'SOC monitoruje infrastrukturę 24/7, analitycy triagują alerty, threat hunting',
    technology: 'SIEM (korelacja zdarzeń) + EDR/XDR (ochrona endpointów) + NDR (monitoring sieci)',
    example: 'Bez SIEM analitycy SOC są ślepi. Bez analityków SIEM generuje alarmy których nikt nie czyta. Potrzebne są oba elementy.',
    regulatoryDetail: 'NIS2 wymaga wdrożenia środków wykrywania incydentów. DORA definiuje zarządzanie incydentami ICT jako jeden z 5 filarów. Kluczowy wskaźnik: MTTD (Mean Time to Detect).',
    wrongApproach: 'Kupienie SIEM bez zatrudnienia analityków SOC to klasyczny błąd - tool bez procesu.'
  },
  {
    id: 'c2',
    regulatory: 'Zgłaszaj poważne incydenty w terminie (NIS2: 24h/72h; DORA: 4h/24h/30 dni)',
    organizational: 'Udokumentowany proces Incident Response, playbooki IR, przypisane role, kontakty CSIRT/KNF',
    technology: 'SOAR (automatyzacja reagowania), system ticketowy (dokumentacja), alerty SIEM, komunikacja',
    example: 'Bez procesu IR i jasnych ról firma nie zdąży zgłosić incydentu w 24h - nie dlatego że narzędzia zawiodły, ale bo nikt nie wiedział co robić.',
    regulatoryDetail: 'NIS2/KSC: wczesne ostrzeżenie do CSIRT w 24h, pełne zgłoszenie w 72h, raport końcowy w 30 dni. DORA: powiadomienie regulatora (KNF) w 4h dla poważnych incydentów ICT.',
    wrongApproach: 'Posiadanie SOAR bez playbooka IR to jak samochód bez kierowcy. SOAR wykonuje kroki z playbooka - playbook musi istnieć wcześniej.'
  },
  {
    id: 'c3',
    regulatory: 'Zarządzaj ryzykiem łańcucha dostaw (NIS2 Art. 21d, DORA Art. 28-44)',
    organizational: 'Ocena bezpieczeństwa dostawców ICT, wymogi bezpieczeństwa w umowach, nadzór nad realizacją, plany wyjścia',
    technology: 'Rejestr dostawców z oceną ryzyka, platformy GRC, klauzule bezpieczeństwa w umowach, audyty dostawców',
    example: 'SolarWinds (2020): 18 000 organizacji skompromitowanych przez jedną zainfekowaną aktualizację zaufanego dostawcy. Brak oceny ryzyka dostawcy = brak ochrony.',
    regulatoryDetail: 'NIS2 wprost wskazuje na atak SolarWinds jako motywację wprowadzenia wymagań dotyczących łańcucha dostaw. DORA dla sektora finansowego: kluczowi dostawcy ICT (np. chmury) pod bezpośrednim nadzorem ESA.',
    wrongApproach: 'Samo posiadanie rejestru dostawców bez faktycznej oceny ich bezpieczeństwa to „compliance theatre” - spełnianie litery prawa bez ducha.'
  },
  {
    id: 'c4',
    regulatory: 'Zapewnij ciągłość działania i odtwarzanie po incydencie (NIS2 Art. 21, DORA Art. 11-13)',
    organizational: 'Plany BCP i DRP, regularne ćwiczenia odtwarzania, zdefiniowane RTO/RPO, komunikacja kryzysowa',
    technology: 'Backup 3-2-1 (offline/immutable), infrastruktura redundantna (HA/DR), system backupu chmurowego',
    example: 'Szpital bez działającego DRP po ataku ransomware: systemy niedostępne przez tydzień, bo backup był - ale nigdy nie przetestowany. Odtworzenie trwało 4x dłużej niż planowano.',
    regulatoryDetail: 'NIS2/KSC: BCP/DRP jako obowiązkowy element SZBI. DORA: plany ciągłości działania ICT w ramach zarządzania ryzykiem ICT, testowanie planów odtwarzania.',
    wrongApproach: 'Backup bez DRP i testów odtwarzania to fałszywe poczucie bezpieczeństwa. „Backup mamy” ≠ „możemy odtworzyć w 4h”.'
  },
  {
    id: 'c5',
    regulatory: 'Kontroluj dostęp - zasada minimalnych uprawnień (NIS2 Art. 21, DORA Art. 9, ISO 27001 A.8.3)',
    organizational: 'Polityki zarządzania tożsamością i dostępem, zasada least privilege, regularne przeglądy uprawnień, offboarding procedury',
    technology: 'IAM (zarządzanie tożsamościami), MFA (uwierzytelnianie wieloskładnikowe), PAM (konta uprzywilejowane), Zero Trust (kontekstowa weryfikacja)',
    example: 'Pracownik odchodzący z firmy - jeśli konto nie zostanie dezaktywowane tego samego dnia, nadal ma dostęp. Bez IAM i procedur offboardingu to standardowy problem.',
    regulatoryDetail: 'NIS2/DORA/RODO: kontrola dostępu jako fundament bezpieczeństwa. ISO 27001 Annex A.8: zarządzanie tożsamością, MFA, IAM. DORA: zarządzanie dostępem w ramach zarządzania ryzykiem ICT.',
    wrongApproach: 'MFA dla jednego systemu (np. VPN) przy braku kontroli dostępu do innych to dziurawa tarcza. Zasada least privilege musi obowiązywać wszędzie.'
  },
  {
    id: 'c6',
    regulatory: 'Testuj odporność regularnie (NIS2 Art. 21, DORA Art. 24-27 - TLPT)',
    organizational: 'Program testów penetracyjnych, red/blue team exercises, ćwiczenia tabletop, TLPT dla sektora finansowego',
    technology: 'Narzędzia ofensywne (Metasploit, Burp Suite, Cobalt Strike), platformy symulacji ataków (BAS), narzędzia TIBER-EU dla TLPT',
    example: 'Bank przez 2 lata nie testował odporności. Podczas TLPT wymaganego przez DORA red team osiągnął cel w 3 dni przez podatność w aplikacji mobilnej. Regularne testy by to wykryły wcześniej.',
    regulatoryDetail: 'DORA Art. 26: TLPT co 3 lata dla instytucji istotnych - metodologia TIBER-EU. NIS2: testy penetracyjne jako element zarządzania ryzykiem. DORA Art. 24: regularne testy dla wszystkich instytucji finansowych.',
    wrongApproach: 'Jednorazowy pentest „na papier” (żeby mieć raport) bez wdrożenia wniosków to strata pieniędzy. Wartość testu jest w naprawieniu znalezionych problemów.'
  },
];

// ── Klucz lekcja - spiecie wszystkich warstw ───────────────────────────────

export const MORAL = 'Technologia bez procesów to wydatek, a nie bezpieczeństwo. SIEM bez analityków generuje alarmy, których nikt nie czyta. Backup bez testów odtwarzania to fałszywe poczucie bezpieczeństwa. Dlatego dojrzałe wdrożenie idzie w kolejności: zrozum obowiązek i ryzyko → ułóż proces i role → dobierz narzędzie.';

// ── Typowe błędy (anty-wzorce) ─────────────────────────────────────────────

export const ANTIPATTERNS = [
  {
    id: 'ap1',
    name: 'Tool-first approach',
    description: 'Kupowanie narzędzi bezpieczeństwa bez wcześniejszego zrozumienia ryzyka i ułożenia procesów.',
    example: 'Zakup SIEM za milion złotych, który generuje tysiące alertów tygodniowo - i nikt ich nie analizuje, bo nie ma analityków ani procesów.',
    fix: 'Najpierw: zrozum ryzyko i obowiązki regulacyjne. Potem: ułóż procesy i role. Na końcu: dobierz narzędzia.'
  },
  {
    id: 'ap2',
    name: 'Compliance theatre',
    description: 'Spełnianie litery regulacji bez faktycznego wzmocnienia bezpieczeństwa - „odhaczanie checkboxów”.',
    example: 'Wdrożenie polityki haseł na papierze bez technicznego wymuszenia. Rejestr dostawców bez faktycznej oceny ich bezpieczeństwa.',
    fix: 'Regulacje (NIS2, DORA, RODO) mają cel biznesowy - zrozumienie tego celu prowadzi do sensownego wdrożenia, nie tylko formalnego spełnienia.'
  },
  {
    id: 'ap3',
    name: 'Silosy bezpieczeństwa',
    description: 'IT, bezpieczeństwo, zarząd, prawny i DPO działają niezależnie bez koordynacji.',
    example: 'CISO nie wie o nowym projekcie IT, który przetwarza dane osobowe. Wdraża się system bez oceny bezpieczeństwa i DPIA.',
    fix: 'Security by design: bezpieczeństwo i ochrona danych jako element każdego projektu od początku. Regularne spotkania koordynacyjne CISO, DPO, CTO, Legal.'
  },
  {
    id: 'ap4',
    name: 'Zaniedbany łańcuch dostaw',
    description: 'Skupienie się na wewnętrznym bezpieczeństwie przy ignorowaniu ryzyk dostawców.',
    example: 'Perfekcyjne zabezpieczenia wewnętrzne, ale dostawca oprogramowania księgowego ma dostęp do sieci bez żadnych ograniczeń i nie przeszedł oceny bezpieczeństwa.',
    fix: 'Ocena bezpieczeństwa kluczowych dostawców, wymogi bezpieczeństwa w umowach, segmentacja dostępów dostawców, monitoring (wymagane przez NIS2 i DORA).'
  },
];

// ── Matryca dojrzałości (simplified) ──────────────────────────────────────

export const MATURITY_LEVELS = [
  {
    level: 1,
    name: 'Poziom 1 - Reaktywny',
    description: 'Brak formalnych procesów bezpieczeństwa. Reagowanie na incydenty ad hoc. Podstawowe narzędzia (antywirus, firewall).',
    characteristics: ['Brak CISO lub dedykowanego specjalisty bezpieczeństwa', 'Brak formalnych polityk bezpieczeństwa', 'Reagowanie na incydenty po fakcie', 'Brak zarządzania podatnościami'],
    nextStep: 'Powołanie odpowiedzialnej osoby (CISO lub specjalista), podstawowa polityka bezpieczeństwa, MFA, backup.'
  },
  {
    level: 2,
    name: 'Poziom 2 - Podstawowy',
    description: 'Formalne polityki bezpieczeństwa. Podstawowe kontrole wdrożone. Nieformalne procesy IR.',
    characteristics: ['Polityki bezpieczeństwa na papierze', 'MFA wdrożone dla kluczowych systemów', 'Backup regularny (nie zawsze testowany)', 'EDR zamiast antywirusa', 'Brak formalnego SOC'],
    nextStep: 'Formalizacja procesów IR (playbooki), SIEM lub MSSP, regularne testy backupów, zarządzanie podatnościami.'
  },
  {
    level: 3,
    name: 'Poziom 3 - Zdefiniowany',
    description: 'ISMS wdrożony (ISO 27001 lub equivalent). SOC (własny lub MSSP). Formalne procesy IR i zarządzania ryzykiem.',
    characteristics: ['SZBI wdrożony i udokumentowany', 'SOC z monitoringiem 24/7 (własny lub MSSP)', 'Formalne procesy IR z playbooks', 'Regularne testy penetracyjne', 'Zarządzanie ryzykiem dostawców'],
    nextStep: 'Certyfikacja ISO 27001, red team exercises, threat intelligence, Zero Trust architecture.'
  },
  {
    level: 4,
    name: 'Poziom 4 - Dojrzały',
    description: 'Proaktywne zarządzanie ryzykiem. Threat hunting. Mierzalne KPI bezpieczeństwa. Pełna zgodność regulacyjna.',
    characteristics: ['Certyfikacja ISO 27001 lub equivalent', 'Threat hunting i advanced threat intelligence', 'Purple team exercises', 'Zero Trust w kluczowych obszarach', 'Pełna zgodność NIS2/DORA/RODO z dokumentacją'],
    nextStep: 'Continuous improvement, TLPT dla sektora finansowego, zaawansowane UEBA, automatyzacja SOAR.'
  },
];
