/**
 * SLOWNIK — flashcardy dla wszystkich akronimów
 * Źródło: "Cyberbezpieczeństwo w organizacjach — przewodnik porządkujący"
 *
 * Każdy wpis: { term, full, short, long, category }
 * Kategorie: fundamenty | regulacje | organizacja | technologia
 */

export const FLASHCARD_TERMS = [
  // ── FUNDAMENTY ────────────────────────────────────────────────────────────
  {
    term: 'CIA',
    full: 'Confidentiality, Integrity, Availability',
    short: 'Triada bezpieczeństwa: Poufność, Integralność, Dostępność — fundament cyberbezpieczeństwa.',
    long: 'CIA Triad to trzy podstawowe właściwości, które ochrona informacji powinna zapewnić: Confidentiality (Poufność) — dane dostępne tylko dla uprawnionych, Integrity (Integralność) — dane niezmienione bez autoryzacji, Availability (Dostępność) — systemy dostępne gdy są potrzebne. Każdy incydent cyberbezpieczeństwa narusza co najmniej jedną z tych właściwości. To najprostszy i najważniejszy model w całym cyberbezpieczeństwie.',
    category: 'fundamenty',
    icon: '🔐'
  },
  {
    term: 'APT',
    full: 'Advanced Persistent Threat',
    short: 'Zaawansowany, długotrwały atak celowany — często sponsorowany przez państwo.',
    long: 'APT to zaawansowany, długotrwały atak celowany wymierzony w konkretną organizację. Atakujący penetruje sieć, ukrywa się przez miesiące lub lata i eksfiltruje dane. Często stoją za nimi grupy sponsorowane przez państwa — np. Fancy Bear (APT28, Rosja), Lazarus Group (Korea Północna), APT41 (Chiny). Obrona: threat hunting, XDR, segmentacja, Zero Trust.',
    category: 'fundamenty',
    icon: '🕵️'
  },
  {
    term: 'BCP',
    full: 'Business Continuity Plan',
    short: 'Plan zapewnienia ciągłości działania organizacji podczas poważnych zakłóceń.',
    long: 'BCP opisuje jak organizacja będzie funkcjonować podczas poważnych zakłóceń — awarii, ataku, klęski żywiołowej. Definiuje krytyczne procesy, alternatywne sposoby ich realizacji i priorytety odtwarzania. Wymaga wcześniejszej analizy BIA (Business Impact Analysis). BCP uzupełniany jest przez DRP (techniczna część dla IT). Wymagany przez NIS2/KSC i DORA.',
    category: 'fundamenty',
    icon: '📋'
  },
  {
    term: 'DRP',
    full: 'Disaster Recovery Plan',
    short: 'Techniczny plan odtwarzania systemów IT po poważnej awarii lub ataku.',
    long: 'DRP to szczegółowy plan techniczny odtwarzania systemów IT po katastrofie. Określa RTO (Recovery Time Objective — maksymalny czas odtworzenia) i RPO (Recovery Point Objective — maksymalna utrata danych). DRP jest techniczną realizacją BCP. Kluczowe: regularne testowanie odtwarzania — backup nigdy niesprawdzony to backup który może nie zadziałać gdy będzie potrzebny.',
    category: 'fundamenty',
    icon: '🔄'
  },

  // ── REGULACJE ─────────────────────────────────────────────────────────────
  {
    term: 'NIS2',
    full: 'Network and Information Security Directive 2',
    short: 'Unijna dyrektywa cyberbezpieczeństwa — zastąpiła NIS (2016), objęła znacznie szerszy zakres.',
    long: 'NIS2 (Dyrektywa 2022/2555) rozszerzyła pierwotną dyrektywę NIS o nowe sektory (produkcja, poczta, wodociągi) i zaostryła wymagania: SZBI, szacowanie ryzyka, zgłaszanie incydentów w 24h/72h, zarządzanie ryzykiem dostawców, osobista odpowiedzialność zarządu. Polska implementuje ją przez KSC 2.0 (wejście w życie 3.04.2026). Kary: do 10 mln EUR lub 2% obrotu.',
    category: 'regulacje',
    icon: '🇪🇺'
  },
  {
    term: 'KSC',
    full: 'Krajowy System Cyberbezpieczeństwa',
    short: 'Polska ustawa implementująca NIS2 — obowiązki operatorów usług kluczowych.',
    long: 'KSC (Krajowy System Cyberbezpieczeństwa) to polska ustawa implementująca dyrektywę NIS2. Nowelizacja KSC 2.0 wchodzi w życie 3 kwietnia 2026. Dzieli podmioty na kluczowe i ważne, nakłada obowiązki: SZBI do 3.04.2027, audyt do 3.04.2028, rejestracja do 3.10.2026. Organy nadzorcze: CERT Polska, CSIRT GOV, CSIRT MON. Kary do 10 mln EUR.',
    category: 'regulacje',
    icon: '🇵🇱'
  },
  {
    term: 'DORA',
    full: 'Digital Operational Resilience Act',
    short: 'Unijne rozporządzenie o operacyjnej odporności cyfrowej sektora finansowego — od 17.01.2025.',
    long: 'DORA (Rozporządzenie UE 2022/2554) obowiązuje sektor finansowy UE od 17 stycznia 2025. Jako rozporządzenie działa wprost bez implementacji krajowej. 5 filarów: zarządzanie ryzykiem ICT, zarządzanie incydentami (zgłoszenie do KNF w 4h), TLPT co 3 lata, ryzyko dostawców ICT, wymiana informacji. Objęte: banki, ubezpieczyciele, fintech, giełdy krypto, a także ich dostawcy ICT.',
    category: 'regulacje',
    icon: '💶'
  },
  {
    term: 'RODO',
    full: 'Rozporządzenie o Ochronie Danych Osobowych',
    short: 'Polska nazwa GDPR — regulacja ochrony danych osobowych obowiązująca od maja 2018.',
    long: 'RODO (GDPR — General Data Protection Regulation, Rozporządzenie UE 2016/679) obowiązuje od 25 maja 2018. Nakłada obowiązki na wszystkich przetwarzających dane osobowe mieszkańców UE: podstawa prawna, prawa osób, privacy by design/default, zgłoszenie naruszenia do UODO w 72h. Kary do 20 mln EUR lub 4% obrotu. Organ nadzorczy w Polsce: UODO.',
    category: 'regulacje',
    icon: '🔒'
  },
  {
    term: 'GDPR',
    full: 'General Data Protection Regulation',
    short: 'Anglojęzyczna nazwa RODO — europejskie rozporządzenie o ochronie danych osobowych.',
    long: 'GDPR (General Data Protection Regulation) to angielska nazwa RODO. Rozporządzenie UE 2016/679 stosowane od 25 maja 2018 roku. Kluczowe zasady: celowość, minimalizacja danych, ograniczenie przechowywania, integralność i poufność. Prawa osób: dostęp, sprostowanie, usunięcie, przenoszalność, sprzeciw. Dotyczy wszystkich organizacji przetwarzających dane osób z UE — bez względu na siedzibę firmy.',
    category: 'regulacje',
    icon: '📄'
  },
  {
    term: 'ISO',
    full: 'International Organization for Standardization',
    short: 'Globalna organizacja standaryzacyjna — wydawca norm ISO/IEC 27001 i innych.',
    long: 'ISO (International Organization for Standardization) opracowuje globalne normy techniczne. W cyberbezpieczeństwie kluczowa rodzina ISO/IEC 27000: 27001 (ISMS — wymagania i certyfikacja), 27002 (dobre praktyki kontroli), 27005 (zarządzanie ryzykiem), 27017 (chmura), 27018 (dane osobowe). Certyfikacja ISO/IEC 27001 to jedyna powszechna certyfikacja SZBI — wymaga audytu przez akredytowaną jednostkę.',
    category: 'regulacje',
    icon: '📜'
  },
  {
    term: 'NIST',
    full: 'National Institute of Standards and Technology',
    short: 'Amerykańska agencja standaryzacji — twórca NIST CSF i SP 800-53.',
    long: 'NIST to amerykańska agencja federalna opracowująca standardy cyberbezpieczeństwa stosowane globalnie. Najważniejsze: NIST CSF (Cybersecurity Framework) 2.0 — 6 funkcji (Govern, Identify, Protect, Detect, Respond, Recover), NIST SP 800-53 — katalog kontroli bezpieczeństwa dla systemów federalnych, NIST SP 800-171 — wymagania dla systemów rządowych. Nieobowiązkowe w Polsce, ale globalny punkt odniesienia.',
    category: 'regulacje',
    icon: '🇺🇸'
  },
  {
    term: 'CSF',
    full: 'Cybersecurity Framework',
    short: 'Elastyczny framework NIST z 6 funkcjami do zarządzania ryzykiem cyberbezpieczeństwa.',
    long: 'NIST CSF 2.0 (2024) to ramowy model zarządzania ryzykiem cyberbezpieczeństwa z 6 funkcjami: Govern (strategia, polityki), Identify (aktywa, ryzyko), Protect (kontrole), Detect (monitoring), Respond (reagowanie), Recover (odtwarzanie). Niezależny od branży i wielkości organizacji. Nie wymaga certyfikacji. Używany jako narzędzie oceny dojrzałości i planowania roadmapy bezpieczeństwa.',
    category: 'regulacje',
    icon: '🗺️'
  },
  {
    term: 'ISMS',
    full: 'Information Security Management System',
    short: 'System Zarządzania Bezpieczeństwem Informacji — framework według ISO/IEC 27001.',
    long: 'ISMS (po polsku: SZBI — System Zarządzania Bezpieczeństwem Informacji) to udokumentowany system wg ISO/IEC 27001 obejmujący polityki, procedury, role, procesy i kontrole techniczne. Oparty na cyklu PDCA (Plan-Do-Check-Act). Certyfikacja ISO 27001 potwierdza skuteczny ISMS. KSC 2.0 wymaga wdrożenia SZBI dla podmiotów kluczowych i ważnych.',
    category: 'regulacje',
    icon: '⚙️'
  },
  {
    term: 'DPO',
    full: 'Data Protection Officer',
    short: 'Inspektor Ochrony Danych (IOD) — wymagany przez RODO w wielu organizacjach.',
    long: 'DPO (po polsku: IOD — Inspektor Ochrony Danych) doradza w kwestiach ochrony danych osobowych, monitoruje zgodność z RODO i jest punktem kontaktowym dla UODO. Obowiązkowy dla: organów publicznych, podmiotów masowo przetwarzających dane, przetwarzających szczególne kategorie danych. Kluczowe: DPO ≠ CISO — zupełnie różne funkcje! DPO musi być niezależny.',
    category: 'regulacje',
    icon: '📋'
  },

  // ── ORGANIZACJA ───────────────────────────────────────────────────────────
  {
    term: 'CISO',
    full: 'Chief Information Security Officer',
    short: 'Dyrektor ds. bezpieczeństwa informacji — odpowiada za strategię i program cyberbezpieczeństwa.',
    long: 'CISO zarządza całościowym programem cyberbezpieczeństwa: strategia, zarządzanie ryzykiem, compliance (NIS2, DORA, RODO), nadzór nad SOC, polityki i procedury, szkolenia, reagowanie na incydenty. Raportuje do zarządu/CEO. NIS2 i DORA wymagają zaangażowania zarządu — CISO jest łącznikiem między operacjami bezpieczeństwa a decyzjami zarządu.',
    category: 'organizacja',
    icon: '🛡️'
  },
  {
    term: 'SOC',
    full: 'Security Operations Center',
    short: 'Centrum operacji bezpieczeństwa — monitoruje i reaguje na zagrożenia 24/7.',
    long: 'SOC (Security Operations Center) to wyspecjalizowany zespół lub centrum odpowiadające za ciągły monitoring (24/7/365), wykrywanie i reagowanie na incydenty. Model: ludzie (analitycy L1/L2/L3, manager) + procesy (playbooki, IR, threat hunting) + technologia (SIEM, SOAR, EDR). Modele organizacji: własny in-house, outsourcing do MSSP/MDR, hybrydowy.',
    category: 'organizacja',
    icon: '🖥️'
  },
  {
    term: 'CERT',
    full: 'Computer Emergency Response Team',
    short: 'Zespół reagowania na incydenty komputerowe — krajowy lub sektorowy.',
    long: 'CERT to zespół specjalistów reagujących na incydenty bezpieczeństwa, koordynujących odpowiedź i wymieniających informacje. W Polsce: CERT Polska (NASK — dla sektora cywilnego), CERT GOV PL (ABW — dla administracji), CERT MON (wojsko). Termin stosowany zamiennie z CSIRT, choć dyrektywa NIS2 posługuje się oficjalnie terminem CSIRT.',
    category: 'organizacja',
    icon: '🚨'
  },
  {
    term: 'CSIRT',
    full: 'Computer Security Incident Response Team',
    short: 'Zespół reagowania na incydenty bezpieczeństwa — termin używany przez NIS2.',
    long: 'CSIRT (Computer Security Incident Response Team) to oficjalny termin NIS2 dla krajowych zespołów reagowania. W Polsce: CSIRT NASK, CSIRT GOV (ABW), CSIRT MON. Podmioty objęte KSC mają obowiązek zgłaszania poważnych incydentów do właściwego CSIRT: wczesne ostrzeżenie w 24h, pełne zgłoszenie w 72h, raport końcowy w 30 dni.',
    category: 'organizacja',
    icon: '🛡️'
  },
  {
    term: 'MSSP',
    full: 'Managed Security Service Provider',
    short: 'Dostawca zarządzanych usług bezpieczeństwa — zewnętrzny SOC na wynajem.',
    long: 'MSSP świadczy usługi bezpieczeństwa: monitoring 24/7, zarządzanie SIEM, MDR (Managed Detection and Response), zarządzanie podatnościami, IR. Umożliwia MŚP dostęp do ekspertów bezpieczeństwa bez budowania własnego SOC. Kluczowe kwestie: SLA (czas reakcji), zapisy RODO i KSC dotyczące dostępu do danych, exit plan z dostawcy.',
    category: 'organizacja',
    icon: '🤝'
  },

  // ── TECHNOLOGIA ───────────────────────────────────────────────────────────
  {
    term: 'SIEM',
    full: 'Security Information and Event Management',
    short: 'Mózg SOC — zbiera logi i koreluje zdarzenia z całej infrastruktury, generując alarmy.',
    long: 'SIEM zbiera logi ze wszystkich źródeł (serwery, sieć, aplikacje, chmura), normalizuje je i koreluje w czasie rzeczywistym, generując alerty gdy wzorzec wskazuje na zagrożenie. Analogia: centrala monitoringu z kamerami i czujnikami z całego budynku. Wymaga analityków SOC. Bez analityków generuje alarmy których nikt nie czyta. Przykłady: Splunk, Microsoft Sentinel, IBM QRadar.',
    category: 'technologia',
    icon: '🖥️'
  },
  {
    term: 'SOAR',
    full: 'Security Orchestration, Automation and Response',
    short: 'Automatyzuje reagowanie na incydenty — wykonuje powtarzalne kroki zamiast analityka.',
    long: 'SOAR integruje narzędzia bezpieczeństwa i automatyzuje workflows reagowania. Gdy SIEM wykryje phishing, SOAR automatycznie: blokuje nadawcę, poddaje kwarantannie e-mail, sprawdza IP w threat intel, tworzy ticket i powiadamia analityka. Redukuje MTTR z godzin do minut. SOAR bez playbooka IR jest bezużyteczny — playbooki muszą być opracowane zanim SOAR będzie konfigurowany.',
    category: 'technologia',
    icon: '⚡'
  },
  {
    term: 'EDR',
    full: 'Endpoint Detection and Response',
    short: 'Zaawansowana ochrona stacji roboczych — wykrywa zachowania, nie tylko sygnatury.',
    long: 'EDR zastąpił klasyczny antywirus. Monitoruje zachowanie procesów na stacjach roboczych i serwerach: co uruchamia, co zapisuje, z czym się łączy. Wykrywa ataki fileless, living-off-the-land, ransomware w fazie szyfrowania. Kluczowe funkcje: izolacja hosta, forensics, rollback zmian. Przykłady: CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne.',
    category: 'technologia',
    icon: '💻'
  },
  {
    term: 'XDR',
    full: 'Extended Detection and Response',
    short: 'Rozszerzone wykrywanie i reagowanie — integruje dane z urządzeń, sieci, chmury i poczty.',
    long: 'XDR rozszerza EDR o dane z sieci (NDR), poczty, chmury i aplikacji w ujednoliconą platformę analizy. Koreluje zdarzenia cross-source, wykrywając zagrożenia niewidoczne w izolowanych narzędziach. Daje analitykowi SOC jeden ekran z pełnym obrazem. Redukuje złożoność ("mniej narzędzi"). Przykłady: Microsoft Defender XDR, Palo Alto Cortex XDR, CrowdStrike Falcon XDR.',
    category: 'technologia',
    icon: '🌐'
  },
  {
    term: 'NDR',
    full: 'Network Detection and Response',
    short: 'Wykrywanie zagrożeń w ruchu sieciowym — widzi ruch lateralny i C2 których EDR nie widzi.',
    long: 'NDR analizuje ruch sieciowy (pasywnie lub metadane NetFlow) w poszukiwaniu anomalii. Wykrywa: ruch lateralny wewnątrz sieci, komunikację z serwerami C2, eksfiltrację danych przez niestandardowe kanały (DNS, ICMP), skanowanie portów. Nieoceniony dla urządzeń bez agenta (IoT, OT, legacy). Element architektury XDR. Przykłady: Darktrace, ExtraHop, Vectra AI.',
    category: 'technologia',
    icon: '📡'
  },
  {
    term: 'MDR',
    full: 'Managed Detection and Response',
    short: 'Zarządzane wykrywanie i reagowanie — outsourcing funkcji SOC do zewnętrznego dostawcy.',
    long: 'MDR to usługa zewnętrznego dostawcy (MSSP) łącząca technologię (SIEM, EDR, XDR) z zespołem analityków obsługujących klienta 24/7. Umożliwia organizacjom bez własnego SOC dostęp do zaawansowanego monitoringu i reagowania. Kluczowe elementy umowy: SLA (czas reakcji), zakres reagowania (notify-only vs. aktywna izolacja), lokalizacja danych, procedury eskalacji.',
    category: 'technologia',
    icon: '🤝'
  },
  {
    term: 'IAM',
    full: 'Identity and Access Management',
    short: 'Zarządzanie tożsamością i dostępem — kto może, do czego, kiedy i jak.',
    long: 'IAM zarządza tożsamościami cyfrowymi i uprawnieniami: cykl życia kont (onboarding/offboarding), SSO (Single Sign-On), uwierzytelnianie (MFA), autoryzacja (role, uprawnienia), audyt dostępu. Zasada least privilege: minimum niezbędnych uprawnień. IAM to filar Zero Trust. Przykłady: Microsoft Entra ID, Okta, SailPoint.',
    category: 'technologia',
    icon: '🆔'
  },
  {
    term: 'MFA',
    full: 'Multi-Factor Authentication',
    short: 'Uwierzytelnianie wieloskładnikowe — hasło to za mało, potrzebny drugi czynnik.',
    long: 'MFA wymaga co najmniej dwóch czynników: coś wiesz (hasło), coś masz (telefon, token FIDO2), coś jesteś (biometria). Eliminuje ~99% ataków na skradzione hasła. Typy od słabszego do silniejszego: SMS OTP (podatny na SIM swap), TOTP (Google/MS Authenticator), push notification, klucz sprzętowy FIDO2/passkeys (phishing-resistant). Wymagany przez NIS2, DORA, ISO 27001.',
    category: 'technologia',
    icon: '📱'
  },
  {
    term: 'PAM',
    full: 'Privileged Access Management',
    short: 'Zarządzanie dostępem uprzywilejowanym — vault haseł, rotacja, nagrywanie sesji adminów.',
    long: 'PAM chroni konta z podwyższonymi uprawnieniami (administratorzy systemów, baz danych, sieci). Funkcje: vault (sejf) haseł z automatyczną rotacją, just-in-time access (uprawnienia tylko gdy potrzebne), nagrywanie sesji uprzywilejowanych (video+keylog), MFA obowiązkowe. Konta admin to "klucze do królestwa" — ich kompromitacja = dostęp do całej infrastruktury. Przykłady: CyberArk, BeyondTrust, Delinea.',
    category: 'technologia',
    icon: '🏛️'
  },
  {
    term: 'IDS',
    full: 'Intrusion Detection System',
    short: 'System pasywny wykrywający włamania — monitoruje i alarmuje, ale nie blokuje.',
    long: 'IDS pasywnie analizuje ruch sieciowy (NIDS) lub logi systemowe (HIDS) i generuje alerty dla anomalii lub znanych wzorców ataków. Nie blokuje ruchu — tylko informuje. Stosowany gdy blokowanie jest zbyt ryzykowne (przemysłowe OT/SCADA) lub jako uzupełnienie IPS. Popularne open-source: Snort, Suricata, Zeek. Większość wdrożeń migruje do IPS lub NGFW z modułem IPS.',
    category: 'technologia',
    icon: '👁️'
  },
  {
    term: 'IPS',
    full: 'Intrusion Prevention System',
    short: 'System aktywnie blokujący włamania — inline w sieci, zatrzymuje zagrożenia w czasie rzeczywistym.',
    long: 'IPS to aktywna wersja IDS — siedzi inline w ruchu i blokuje zagrożenia w czasie rzeczywistym: exploity znanych podatności, skanowanie portów, brute-force. Zazwyczaj wbudowany w NGFW. Wymaga strojenia — zbyt agresywny blokuje legalny ruch (false positives). Regularne aktualizacje sygnatur są kluczowe dla skuteczności. Standard we wszystkich nowoczesnych sieciach korporacyjnych.',
    category: 'technologia',
    icon: '🚧'
  },
  {
    term: 'DLP',
    full: 'Data Loss Prevention',
    short: 'System zapobiegający wyciekowi danych — monitoruje i blokuje nieautoryzowany transfer.',
    long: 'DLP monitoruje i blokuje nieautoryzowany transfer wrażliwych danych: e-mail (blokuje wysłanie pliku z danymi osobowymi), USB (kontrola nośników), chmura (upload do Dropbox), wydruk. Wymaga wcześniejszej klasyfikacji danych — DLP musi wiedzieć co jest wrażliwe. Wspiera RODO (ochrona danych osobowych) i ochronę własności intelektualnej. Szczególnie ważny dla zagrożeń wewnętrznych (insider threat).',
    category: 'technologia',
    icon: '🚫'
  },
  {
    term: 'WAF',
    full: 'Web Application Firewall',
    short: 'Zapora chroniąca aplikacje webowe — blokuje SQL injection, XSS, CSRF i inne.',
    long: 'WAF stoi przed aplikacją webową i analizuje każde żądanie HTTP/HTTPS. Blokuje OWASP Top 10: SQL injection, XSS, CSRF, SSRF, XXE. Tryby: detection (loguje), prevention (blokuje). Może być sprzętowy, software lub chmurowy (Cloudflare WAF, AWS WAF). Wymaga strojenia dla konkretnej aplikacji. Wymagany przez PCI DSS i rekomendowany dla aplikacji przetwarzających dane osobowe.',
    category: 'technologia',
    icon: '🕸️'
  },
  {
    term: 'NGFW',
    full: 'Next-Generation Firewall',
    short: 'Zapora nowej generacji — łączy firewall z IPS, inspekcją aplikacji i deszyfrowanieml SSL.',
    long: 'NGFW łączy klasyczny firewall z: Deep Packet Inspection (DPI), IPS, identyfikacją aplikacji (Layer 7 — widzi Facebook, nie tylko port 443), deszyfrowanie SSL/TLS, filtrowanie URL, sandboxing plików. NGFW jest standardem w nowoczesnych sieciach korporacyjnych — zastąpił tradycyjny firewall jako punkt kontroli sieci. Przykłady: Palo Alto PA-Series, Fortinet FortiGate, Cisco Firepower.',
    category: 'technologia',
    icon: '🔥'
  },
  {
    term: 'VPN',
    full: 'Virtual Private Network',
    short: 'Szyfrowany tunel zdalnego dostępu — VPN zastępowany przez ZTNA w modelu Zero Trust.',
    long: 'VPN tworzy szyfrowany tunel do sieci korporacyjnej dla zdalnych użytkowników. Tradycyjny problem: po uwierzytelnieniu użytkownik ma dostęp do całej sieci — jeden skompromitowany endpoint = ryzyko lateral movement. ZTNA (Zero Trust Network Access) to nowszy model: dostęp tylko do konkretnych aplikacji, z weryfikacją kondycji urządzenia. Trendem jest migracja z VPN do ZTNA.',
    category: 'technologia',
    icon: '🔒'
  },
  {
    term: 'TLPT',
    full: 'Threat-Led Penetration Testing',
    short: 'Zaawansowany test penetracyjny oparty na threat intelligence — wymagany przez DORA.',
    long: 'TLPT to regulacyjna forma red team exercise wg standardu TIBER-EU. Scenariusze ataków oparte na aktualnym threat intelligence dla konkretnej instytucji i sektora, zewnętrzni certyfikowani testerzy (red team), ograniczona wiedza wewnętrznego SOC. Wyniki raportowane do regulatora. DORA wymaga TLPT co 3 lata dla instytucji istotnych. Możliwość cross-border mutual recognition wyników.',
    category: 'technologia',
    icon: '🎯'
  },
];
