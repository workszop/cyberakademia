/**
 * TECHNOLOGIA - narzędzia i warstwy obrony
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

// ── Warstwy obrony ───────────────────────────────────────────────────────

export const DEFENSE_LAYERS = [
  {
    id: 'mfa',
    name: 'MFA – uwierzytelnianie wieloskładnikowe',
    category: 'tożsamość',
    description: 'Wymaga co najmniej dwóch czynników uwierzytelniania, więc samo hasło nie wystarcza. Mocno ogranicza skuteczność ataków ze skradzionymi hasłami.',
    detail: 'MFA (Multi-Factor Authentication) to jedna z najtańszych i najskuteczniejszych kontroli bezpieczeństwa. Nawet jeśli atakujący zna hasło (phishing, wyciek bazy), bez drugiego czynnika (kod SMS, aplikacja uwierzytelniająca albo klucz sprzętowy FIDO2) nie uzyska dostępu. Wymagają go NIS2, DORA i większość standardów branżowych.',
    blocks: ['phishing', 'brute force', 'credential stuffing', 'ransomware'],
    doesNotBlock: ['Ataków na sam drugi czynnik (SIM swapping, phishing w czasie rzeczywistym na kod OTP)']
  },
  {
    id: 'backup',
    name: 'Backup 3-2-1',
    category: 'ciągłość',
    description: '3 kopie danych, 2 różne nośniki, 1 kopia poza siedzibą. Offline lub niezmienialność kopii to osobne zabezpieczenie przed ransomware.',
    detail: 'Zasada 3-2-1: 3 kopie danych (produkcja + 2 backupy), 2 różne typy nośników i 1 kopia poza siedzibą. Odległa kopia online nadal może być zagrożona. Rozszerzenie 3-2-1-1-0 dodaje kopię offline, odizolowaną lub immutable (niezmienialną) oraz weryfikację odtwarzania bez błędów. Skuteczność zależy od konfiguracji, odrębnych uprawnień i testów. RPO określa dopuszczalną utratę danych.',
    blocks: ['ransomware', 'przypadkowe usunięcie', 'awaria sprzętu', 'zagrożenie wewnętrzne'],
    doesNotBlock: ['Wycieku danych (backup chroni dostępność, nie poufność)']
  },
  {
    id: 'edr',
    name: 'EDR – ochrona stacji roboczych',
    category: 'endpointy',
    description: 'Zaawansowana ochrona urządzeń końcowych: wykrywa złośliwe zachowania (nie tylko sygnatury), pozwala izolować urządzenie i zbierać dowody (forensics).',
    detail: 'EDR (Endpoint Detection and Response) zastąpił klasyczny antywirus. Monitoruje zachowanie procesów w czasie rzeczywistym: co uruchamiają, co zapisują, z czym się łączą. Wykrywa ataki fileless (bez pliku), living-off-the-land (z użyciem legalnych narzędzi systemowych) i szyfrowanie typowe dla ransomware. Najważniejsze funkcje: izolacja hosta (odcięcie od sieci jednym kliknięciem), zbieranie dowodów forensycznych, wycofanie zmian (rollback).',
    blocks: ['ransomware', 'malware', 'APT', 'ataki bezplikowe', 'atak na łańcuch dostaw'],
    doesNotBlock: ['Ataków sieciowych omijających urządzenia końcowe (tu potrzebny NDR)']
  },
  {
    id: 'ngfw',
    name: 'NGFW – zapora sieciowa nowej generacji',
    category: 'sieć',
    description: 'Kontroluje ruch sieciowy z pełną inspekcją: IPS, identyfikacja aplikacji, odszyfrowywanie SSL, filtrowanie URL.',
    detail: 'NGFW (Next-Generation Firewall) łączy klasyczny firewall (filtracja pakietów, stateful inspection) z Deep Packet Inspection, systemem IPS (Intrusion Prevention System), identyfikacją aplikacji (a nie tylko portów), odszyfrowywaniem SSL/TLS, filtrowaniem URL i kategorii oraz sandboxingiem plików. NGFW jest „bramą” sieci: kontroluje, co wchodzi i wychodzi.',
    blocks: ['ataki z zewnątrz', 'pobieranie malware', 'komunikacja z C2', 'DDoS'],
    doesNotBlock: ['Zagrożeń wewnętrznych; ataków z zaszyfrowanym C2, jeśli nie odszyfrowuje SSL']
  },
  {
    id: 'waf',
    name: 'WAF – zapora aplikacji webowych',
    category: 'aplikacje',
    description: 'Chroni aplikacje webowe przed SQL injection, XSS, CSRF i innymi atakami w warstwie HTTP.',
    detail: 'WAF (Web Application Firewall) stoi przed aplikacją webową i analizuje każde żądanie HTTP/HTTPS. Blokuje: SQL injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), command injection, file inclusion, ataki na API. Może działać w trybie detekcji (loguje) lub prewencji (blokuje). Wymaga strojenia pod konkretną aplikację: zbyt agresywny blokuje legalnych użytkowników.',
    blocks: ['SQL injection', 'XSS', 'CSRF', 'ataki na API', 'web scraping'],
    doesNotBlock: ['Zagrożeń z wewnątrz sieci, ataków na inne protokoły niż HTTP']
  },
  {
    id: 'iam-layer',
    name: 'IAM / Zero Trust',
    category: 'tożsamość',
    description: 'Zarządzanie dostępem na podstawie tożsamości i kontekstu, zgodnie z zasadą „nigdy nie ufaj, zawsze weryfikuj”.',
    detail: 'IAM (Identity and Access Management) w modelu Zero Trust zakłada, że każde żądanie dostępu trzeba zweryfikować niezależnie od źródła (z wewnątrz czy z zewnątrz sieci). Weryfikacja uwzględnia tożsamość użytkownika (MFA), kondycję urządzenia (compliance), lokalizację, czas i kontekst zachowania. Zasada minimalnych uprawnień: dostęp tylko do niezbędnych zasobów.',
    blocks: ['lateral movement', 'zagrożenie wewnętrzne', 'skradzione dane logowania', 'ransomware'],
    doesNotBlock: ['Exploitów na aplikacje (tu WAF), ataków sieciowych (NGFW)']
  },
  {
    id: 'pam-layer',
    name: 'PAM – zarządzanie dostępem uprzywilejowanym',
    category: 'tożsamość',
    description: 'Osobna kontrola kont administratorów: sejf haseł, rotacja, nagrywanie sesji.',
    detail: 'PAM (Privileged Access Management) chroni konta z podwyższonymi uprawnieniami: administratorów systemów, baz danych i sieci oraz konta serwisowe (service accounts). Funkcje: vault haseł (centralne przechowywanie i rotacja), just-in-time access (uprawnienia tylko wtedy, gdy są potrzebne), nagrywanie sesji (zapis wideo tego, co robił administrator), MFA dla wszystkich kont uprzywilejowanych. Konta administratorów to priorytetowy cel ataków, a PAM ogranicza ryzyko ich przejęcia.',
    blocks: ['zagrożenie wewnętrzne', 'lateral movement', 'APT', 'eskalacja uprawnień'],
    doesNotBlock: ['Ataków, które nie korzystają z kont uprzywilejowanych']
  },
  {
    id: 'siem-layer',
    name: 'SIEM – wykrywanie i monitoring',
    category: 'wykrywanie',
    description: 'Centralna platforma do zbierania logów i korelacji zdarzeń, „mózg” SOC. Wykrywa wzorce ataków w całej infrastrukturze.',
    detail: 'SIEM zbiera logi ze wszystkich źródeł (serwery, sieć, aplikacje, chmura), normalizuje je do wspólnego formatu, koreluje zdarzenia w czasie i generuje alerty, gdy wzorzec wskazuje na zagrożenie. Reguły korelacji trzeba regularnie aktualizować. SIEM nie zastąpi analityka: wspiera go, ale nie działa samodzielnie. Przykłady: Splunk, Microsoft Sentinel, IBM QRadar.',
    blocks: ['APT', 'zagrożenie wewnętrzne', 'eksfiltracja danych', 'anomalie'],
    doesNotBlock: ['Zagrożeń, dla których nie ma reguł korelacji (zero-day, nieznane TTP)']
  },
  {
    id: 'dlp-layer',
    name: 'DLP – zapobieganie wyciekom danych',
    category: 'dane',
    description: 'Monitoruje i blokuje nieautoryzowany transfer wrażliwych danych: e-mail, USB, chmura.',
    detail: 'DLP (Data Loss Prevention) chroni dane przed wyciekiem przez monitoring poczty (np. blokuje wysłanie pliku z numerami kart kredytowych), kontrolę urządzeń USB, monitoring chmury (OneDrive, Dropbox) i inspekcję wydruków. Wymaga wcześniejszej klasyfikacji danych, bo DLP musi wiedzieć, co jest wrażliwe. Szczególnie ważne dla RODO (ochrona danych osobowych) i własności intelektualnej.',
    blocks: ['zagrożenie wewnętrzne', 'eksfiltracja danych', 'przypadkowy wyciek'],
    doesNotBlock: ['Wycieku danych przez przejęte konto (jeśli DLP nie odróżnia transferu autoryzowanego od nieautoryzowanego)']
  },
  {
    id: 'segmentation',
    name: 'Segmentacja sieci',
    category: 'sieć',
    description: 'Podział sieci na izolowane strefy ogranicza przemieszczanie się atakującego (lateral movement).',
    detail: 'Segmentacja dzieli infrastrukturę na strefy z kontrolowanym przepływem ruchu: sieć serwerów, sieć użytkowników, sieć OT/IoT, DMZ. Mikrosegmentacja (Zero Trust Network) idzie dalej i izoluje każdy workload. Atakujący, który wejdzie do jednej strefy, nie przejdzie łatwo do kolejnej. Analogia: drzwi przeciwpożarowe sprawiają, że pożar w jednej części nie obejmuje całego budynku.',
    blocks: ['lateral movement', 'ransomware', 'APT', 'zagrożenie wewnętrzne'],
    doesNotBlock: ['Ataków w obrębie tej samej strefy sieci']
  },
  {
    id: 'vuln-mgmt-layer',
    name: 'Zarządzanie podatnościami / patching',
    category: 'hardening',
    description: 'Systematyczne wyszukiwanie i usuwanie podatności, zanim wykorzystają je atakujący.',
    detail: 'Większość skutecznych ataków wykorzystuje znane podatności, na które jest już patch: atakujący liczą na to, że organizacje nie aktualizują oprogramowania na czas. Cykl: skanowanie (co jest podatne?) → priorytetyzacja (CVSS + ekspozycja) → patch w terminie (krytyczne: 24-72h, wysokie: 7 dni, średnie: 30 dni) → weryfikacja. Zarządzanie podatnościami zmniejsza powierzchnię ataku systematycznie i mierzalnie.',
    blocks: ['atak na łańcuch dostaw', 'ransomware', 'APT', 'ataki z zewnątrz'],
    doesNotBlock: ['Podatności zero-day (jeszcze nieznanych), błędów konfiguracji, które nie wynikają z podatności']
  },
];

// ── Scenariusze ataków ─────────────────────────────────────────────────────

export const ATTACK_SCENARIOS = [
  {
    id: 'ransomware-attack',
    name: 'Atak ransomware',
    description: 'Pracownik kliknął link w e-mailu phishingowym. Malware szyfruje pliki na stacji roboczej i rozprzestrzenia się po sieci. Żądanie okupu: 500 000 PLN.',
    attackChain: [
      'E-mail phishingowy z linkiem do malware',
      'Malware pobiera payload z serwera C2',
      'Payload szyfruje pliki lokalnie i na udziałach sieciowych',
      'Ransomware próbuje wyłączyć backup',
      'Żądanie okupu'
    ],
    blockedBy: ['mfa', 'backup', 'edr', 'segmentation', 'ngfw'],
    explanation: 'MFA nie zatrzyma kliknięcia w link, ale utrudni przejęcie konta. EDR może wykryć i zatrzymać szyfrowanie. Segmentacja ograniczy zasięg. Backup 3-2-1 z osobno zabezpieczoną kopią offline lub niezmienialną pomaga odtworzyć dane, jeśli kopia nie została naruszona i testy potwierdziły możliwość odtworzenia.'
  },
  {
    id: 'phishing-bec',
    name: 'Phishing / Business Email Compromise',
    description: 'Pracownik finansowy otrzymał e-mail „od prezesa” z prośbą o pilny przelew 2 mln PLN. E-mail wygląda autentycznie.',
    attackChain: [
      'Atakujący rejestruje domenę podobną do firmowej (np. firma-pl.com zamiast firma.pl)',
      'Wysyła e-mail „od prezesa” do działu finansowego',
      'Prosi o pilny, poufny przelew na nowe konto',
      'Presja czasu i poufności utrudnia weryfikację'
    ],
    blockedBy: ['mfa', 'iam-layer', 'siem-layer'],
    explanation: 'SPF/DKIM/DMARC blokuje podszywanie się pod prawdziwą domenę firmy, ale nie zatrzyma e-maila z domeny tylko podobnej, takiej jak firma-pl.com. MFA chroni przed odmianą tego ataku, w której przestępca przejmuje prawdziwą skrzynkę prezesa. Najważniejsza kontrola jest tu procesowa: telefoniczna weryfikacja dużych przelewów, bo sama technologia nie wystarczy.'
  },
  {
    id: 'apt-intrusion',
    name: 'Atak APT (długotrwałe włamanie)',
    description: 'Zaawansowana grupa APT uzyskała przyczółek w sieci przez podatność VPN. Przez 3 miesiące zbiera dane wywiadowcze i szuka drogi do systemów krytycznych.',
    attackChain: [
      'Wykorzystanie podatności w bramie VPN',
      'Instalacja backdoora (persistent access)',
      'Lateral movement – przemieszczanie się po sieci',
      'Privilege escalation – przejęcie kont administratorów',
      'Eksfiltracja danych przez zaszyfrowany kanał'
    ],
    blockedBy: ['ngfw', 'pam-layer', 'segmentation', 'siem-layer', 'edr', 'vuln-mgmt-layer'],
    explanation: 'Żadna warstwa nie zatrzyma APT w 100%. Podstawą jest patching (brak podatności VPN). Segmentacja ogranicza lateral movement. EDR wykrywa anomalie behawioralne. SIEM koreluje zdarzenia z wielu źródeł. PAM chroni konta administratorów. Ochrona przed APT to obrona w głąb: wiele warstw działających razem.'
  },
  {
    id: 'supply-chain-scenario',
    name: 'Atak na łańcuch dostaw',
    description: 'Zaufane oprogramowanie, którym zarządza zewnętrzny dostawca (MSSP), dostaje zainfekowaną aktualizację. Malware instaluje się jednocześnie na setkach stacji roboczych.',
    attackChain: [
      'Kompromitacja środowiska budowania oprogramowania u dostawcy',
      'Złośliwy kod wstrzyknięty do legalnej aktualizacji',
      'Aktualizacja trafia automatycznie do klientów',
      'Malware uruchamia się z podpisanym certyfikatem dostawcy',
      'Masowa kompromitacja klientów'
    ],
    blockedBy: ['edr', 'siem-layer', 'segmentation', 'ngfw'],
    explanation: 'Atak na łańcuch dostaw (supply chain attack) omija tradycyjne zabezpieczenia, bo malware ma podpis zaufanego dostawcy. EDR z wykrywaniem behawioralnym może wychwycić nietypowe zachowanie nawet podpisanego oprogramowania. SIEM koreluje masowe anomalie. Segmentacja ogranicza skutki. Liczy się też ocena bezpieczeństwa dostawców (wymagana przez NIS2/DORA).'
  },
];

// ── Narzędzia SOC ───────────────────────────────────────────────────────────

export const SOC_TOOLS = [
  {
    id: 'siem',
    name: 'SIEM',
    full: 'Security Information and Event Management',
    description: 'Centralny system zbierania logów, korelacji zdarzeń i generowania alertów bezpieczeństwa.',
    analogy: 'Centrala monitoringu z kamerami i czujnikami z całego budynku. Wszystko spływa w jedno miejsce: operator widzi cały obraz i dostaje alarm, gdy coś nie pasuje do wzorca.',
    howItWorks: 'Zbiera logi ze wszystkich źródeł (agenty lub syslog), normalizuje je do wspólnego formatu, stosuje reguły korelacji (np. „5 nieudanych logowań z jednego IP w 60 sekund → alert brute-force”) i tworzy incydenty dla analityków. Typowe zastosowania (use cases): wykrywanie ataków brute-force, lateral movement, eksfiltracji danych, anomalii behawioralnych.',
    examples: ['Splunk Enterprise Security', 'Microsoft Sentinel', 'IBM QRadar', 'Elastic SIEM', 'LogRhythm'],
    pros: ['Pełna widoczność infrastruktury', 'Korelacja zdarzeń z wielu źródeł', 'Zgodność z regulacjami (retencja logów)'],
    cons: ['Wymaga strojenia reguł', 'Wysokie koszty licencji', 'Alert fatigue bez SOAR', 'Wymaga doświadczonych analityków']
  },
  {
    id: 'soar',
    name: 'SOAR',
    full: 'Security Orchestration, Automation and Response',
    description: 'Platforma, która automatyzuje powtarzalne zadania reagowania na incydenty i integruje narzędzia bezpieczeństwa.',
    analogy: 'Autopilot dla SOC. Gdy SIEM „widzi” zagrożenie, SOAR sam wykonuje procedurę bez udziału człowieka: blokuje IP, wysyła e-mail, tworzy ticket, powiadamia analityka.',
    howItWorks: 'Playbooki (workflows) definiują sekwencję działań dla różnych typów incydentów. Uruchamia je SIEM albo ręcznie analityk. SOAR integruje się przez API z setkami narzędzi: SIEM, EDR, firewall, ticketing, e-mail, threat intel. Skraca MTTR (Mean Time to Respond) z godzin do minut.',
    examples: ['Palo Alto XSOAR (Cortex)', 'Splunk SOAR', 'Microsoft Sentinel Playbooks', 'IBM Security SOAR', 'Swimlane'],
    pros: ['Drastyczne skrócenie MTTR', 'Mniej alert fatigue', 'Standaryzacja reagowania', 'Odciążenie analityków L1'],
    cons: ['Wymaga inwestycji w konfigurację', 'Złe playbooki mogą wyrządzić szkody', 'Uzależnienie od integracji API']
  },
  {
    id: 'edr-tool',
    name: 'EDR',
    full: 'Endpoint Detection and Response',
    description: 'Zaawansowana ochrona stacji roboczych i serwerów: wykrywa złośliwe zachowania, pozwala reagować i zbierać dowody (forensics).',
    analogy: 'Kamera bezpieczeństwa w każdym komputerze: nagrywa wszystko, co się dzieje (procesy, pliki, sieć), wykrywa podejrzane zachowania i pozwala „cofnąć czas” po incydencie.',
    howItWorks: 'Agent EDR zainstalowany na każdym urządzeniu monitoruje w czasie rzeczywistym uruchamiane procesy, zmiany plików i rejestru, połączenia sieciowe i wykonywany kod. Wykrywa anomalie behawioralne (nie tylko sygnatury). Funkcje IR: izolacja hosta, memory dump, oś czasu aktywności (timeline), usuwanie malware.',
    examples: ['CrowdStrike Falcon', 'Microsoft Defender for Endpoint', 'SentinelOne', 'Palo Alto Cortex XDR', 'Carbon Black'],
    pros: ['Wykrywanie behawioralne (zero-day)', 'Izolacja urządzenia jednym kliknięciem', 'Zdalne forensics', 'Zastąpił AV jako standard'],
    cons: ['Koszt agenta na każdym urządzeniu', 'Wpływ na wydajność systemu', 'False positives przy agresywnym strojeniu']
  },
  {
    id: 'xdr-tool',
    name: 'XDR',
    full: 'Extended Detection and Response',
    description: 'Rozszerzone wykrywanie i reagowanie: łączy dane z endpointów, sieci, chmury i poczty w jeden obraz.',
    analogy: 'EDR widzi wnętrze jednego pokoju, XDR cały budynek naraz: endpointy, sieć, e-mail, chmurę, serwery. Koreluje zdarzenia z różnych warstw, które osobno wyglądają normalnie.',
    howItWorks: 'XDR łączy dane z EDR (endpointy), NDR (sieć), e-mail security, CASB (chmura) i innych źródeł w jedną platformę analizy. Korelacja między źródłami (cross-source) wykrywa zagrożenia niewidoczne w pojedynczych narzędziach. Analityk ma jeden ekran zamiast kilku konsol.',
    examples: ['Microsoft Defender XDR', 'Palo Alto Cortex XDR', 'CrowdStrike Falcon XDR', 'Trend Micro Vision One', 'Cisco XDR'],
    pros: ['Pełny obraz zagrożeń', 'Mniejsza złożoność (mniej narzędzi)', 'Lepsza detekcja zaawansowanych ataków', 'Szybsza reakcja'],
    cons: ['Uzależnienie od jednego dostawcy (vendor lock-in)', 'Wysoki koszt', 'Integracja ze starszymi systemami (legacy)']
  },
  {
    id: 'ndr-tool',
    name: 'NDR',
    full: 'Network Detection and Response',
    description: 'Wykrywanie zagrożeń w ruchu sieciowym. Widzi to, czego nie widzi EDR (ruch między serwerami, IoT, OT).',
    analogy: 'Kamera obserwująca korytarze między pokojami. EDR widzi, co dzieje się w każdym pokoju (urządzeniu), a NDR to, co przepływa korytarzami (siecią): ruch lateralny, komunikację C2, eksfiltrację.',
    howItWorks: 'Pasywnie analizuje ruch sieciowy (mirror port lub TAP) albo metadane przepływów (NetFlow). Buduje baseline normalnego zachowania i wychwytuje odchylenia od niego. Wykrywa ruch lateralny, komunikację z serwerami C2, skanowanie portów i eksfiltrację danych przez DNS/ICMP.',
    examples: ['Darktrace', 'ExtraHop Reveal(x)', 'Vectra AI', 'Corelight', 'Cisco Stealthwatch'],
    pros: ['Widoczność urządzeń bez agenta (IoT, OT, legacy)', 'Wykrywa ruch lateralny', 'Bez wpływu na urządzenia końcowe'],
    cons: ['Nie widzi zawartości zaszyfrowanego ruchu (bez deszyfrowania)', 'Wymaga dużej przepustowości do analizy', 'Baseline wymaga czasu nauki']
  },
  {
    id: 'mdr-tool',
    name: 'MDR',
    full: 'Managed Detection and Response',
    description: 'Zarządzane wykrywanie i reagowanie: zewnętrzny dostawca przejmuje operacyjne funkcje SOC w formie usługi.',
    analogy: 'Zamiast budować własną wartownię (SOC), wynajmujesz profesjonalną firmę ochroniarską (dostawcę MDR), która pilnuje Twojego obiektu 24/7 i reaguje na zagrożenia.',
    howItWorks: 'Dostawca MDR zapewnia zarówno technologię (SIEM, EDR, XDR), jak i zespół analityków (L1/L2/L3), który obsługuje klienta. Usługa zwykle obejmuje monitoring 24/7, triaż alertów, reagowanie na incydenty (w różnym zakresie: od samego powiadomienia, czyli notify only, po aktywną reakcję) i miesięczne raporty. Najważniejszy zapis umowy: czas reakcji w SLA.',
    examples: ['Arctic Wolf', 'Rapid7 MDR', 'Sophos MDR', 'CrowdStrike Falcon Complete', 'Polscy dostawcy MSSP'],
    pros: ['Szybkie uruchomienie', 'Bez budowania własnego SOC', 'Dostęp do ekspertów klasy enterprise', 'Ochrona 24/7'],
    cons: ['Dane organizacji w zewnętrznym SOC', 'SLA może być niewystarczające', 'Słabsza znajomość specyfiki firmy', 'Uzależnienie od dostawcy']
  },
];

// ── Narzędzia sieciowe ─────────────────────────────────────────────────────

export const NETWORK_TOOLS = [
  {
    id: 'firewall',
    name: 'Firewall / NGFW',
    full: 'Next-Generation Firewall',
    description: 'Zapora sieciowa, która kontroluje ruch na podstawie reguł i głębokiej inspekcji pakietów.',
    detail: 'Firewall to „brama” sieci: decyduje, co wchodzi i wychodzi. Tradycyjny firewall filtruje ruch po adresach IP i portach. NGFW (Next-Generation Firewall) dodaje Deep Packet Inspection, IPS/IDS, identyfikację aplikacji (Layer 7: widzi, że to Facebook, a nie tylko port 443), deszyfrowanie SSL/TLS, filtrowanie URL i ochronę przed exploitami. Typowe miejsca: perimeter (brzeg sieci), styk segmentów sieci, wejście do serwerów.',
    examples: ['Palo Alto Networks PA-Series', 'Fortinet FortiGate', 'Cisco Firepower', 'Check Point', 'Sophos XGS'],
    useCases: ['Ochrona granicy sieci (north-south traffic)', 'Segmentacja wewnętrzna', 'Inspekcja ruchu zaszyfrowanego', 'Blokowanie złośliwych domen/IP']
  },
  {
    id: 'ids-tool',
    name: 'IDS',
    full: 'Intrusion Detection System',
    description: 'Pasywny system wykrywania włamań: monitoruje ruch i generuje alerty, ale niczego nie blokuje.',
    detail: 'IDS (Intrusion Detection System) analizuje ruch sieciowy lub logi systemowe i szuka wzorców ataków (sygnatury) albo anomalii (analiza behawioralna). NIDS (Network) monitoruje sieć, HIDS (Host) konkretny serwer. IDS jest pasywny: tylko wykrywa i alarmuje. Stosuje się go tam, gdzie blokowanie jest zbyt ryzykowne (np. przemysłowe systemy sterowania), albo jako uzupełnienie IPS, które daje szerszą widoczność bez ryzyka błędnych blokad (false positives).',
    examples: ['Snort (open source)', 'Suricata (open source)', 'Zeek/Bro', 'OSSEC (HIDS)'],
    useCases: ['Monitoring sieci OT/przemysłowej (gdzie blokowanie = wyłączenie produkcji)', 'Uzupełnienie IPS', 'Compliance monitoring']
  },
  {
    id: 'ips-tool',
    name: 'IPS',
    full: 'Intrusion Prevention System',
    description: 'System, który aktywnie blokuje włamania: działa inline i zatrzymuje podejrzany ruch w czasie rzeczywistym.',
    detail: 'IPS (Intrusion Prevention System) to aktywna wersja IDS. Działa inline w ruchu sieciowym i blokuje zagrożenia w czasie rzeczywistym. Wykrywa exploity znanych podatności, skanowanie portów, brute-force i ataki DDoS w warstwie aplikacji. Zwykle jest wbudowany w NGFW. Wymaga regularnej aktualizacji sygnatur i starannego strojenia, bo zbyt agresywne reguły blokują legalny ruch (false positives).',
    examples: ['Najczęściej jako moduł NGFW (Palo Alto, Fortinet)', 'Cisco Firepower IPS', 'Snort inline mode'],
    useCases: ['Ochrona serwerów przed exploitami', 'Blokowanie ataków w czasie rzeczywistym', 'Ochrona perimetru']
  },
  {
    id: 'waf-tool',
    name: 'WAF',
    full: 'Web Application Firewall',
    description: 'Zapora chroniąca aplikacje webowe przed atakami warstwy aplikacji: SQL injection, XSS, CSRF.',
    detail: 'WAF (Web Application Firewall) analizuje ruch HTTP/HTTPS i blokuje złośliwe żądania, zanim dotrą do aplikacji. Chroni przed zagrożeniami z listy OWASP Top 10: SQL injection, XSS, CSRF, SSRF, XXE, insecure deserialization i innymi. Tryby: detection (loguje) i prevention (blokuje). WAF może być sprzętowy (on-premise), programowy (reverse proxy) albo chmurowy (CDN WAF). Wymaga strojenia pod konkretną aplikację: zbyt agresywny generuje false positives.',
    examples: ['Cloudflare WAF', 'AWS WAF', 'F5 Advanced WAF', 'ModSecurity (open source)', 'Imperva WAF'],
    useCases: ['Ochrona aplikacji webowych (sklepy, portale klientów)', 'Ochrona API', 'Wymagany przez PCI DSS, często przy NIS2']
  },
  {
    id: 'vpn-tool',
    name: 'VPN / ZTNA',
    full: 'Virtual Private Network / Zero Trust Network Access',
    description: 'Bezpieczny zdalny dostęp do zasobów organizacji. VPN daje dostęp do sieci, ZTNA tylko do aplikacji.',
    detail: 'Tradycyjny VPN tworzy szyfrowany tunel do sieci firmowej. Po uwierzytelnieniu użytkownik ma dostęp do całej sieci (ryzyko: jeden skompromitowany endpoint = dostęp do wszystkiego). ZTNA (Zero Trust Network Access) to nowszy model: dostęp do konkretnych aplikacji, a nie całej sieci, z weryfikacją kondycji urządzenia i kontekstu. ZTNA przenosi zasady Zero Trust na dostęp zdalny. Organizacje coraz częściej przechodzą z VPN na ZTNA.',
    examples: ['Cisco AnyConnect (VPN)', 'Palo Alto GlobalProtect', 'Zscaler Private Access (ZTNA)', 'Cloudflare Access (ZTNA)', 'Microsoft Entra Private Access (ZTNA)'],
    useCases: ['Zdalny dostęp pracowników', 'Dostęp dostawców/kontrahentów do systemów', 'Bezpieczny dostęp z niezaufanych sieci']
  },
];

// ── Narzędzia tożsamości ────────────────────────────────────────────────────

export const IDENTITY_TOOLS = [
  {
    id: 'iam-tool',
    name: 'IAM',
    full: 'Identity and Access Management',
    description: 'Ramy zarządzania tożsamościami cyfrowymi i uprawnieniami: kto ma dostęp, do czego, kiedy i jak.',
    detail: 'IAM obejmuje zarządzanie cyklem życia kont (tworzenie, modyfikacja, usuwanie), federację tożsamości (SSO, czyli jeden login do wielu systemów), uwierzytelnianie (hasła, MFA, certyfikaty), autoryzację (role, uprawnienia, polityki dostępu) i audyt (kto, co i kiedy zrobił). Zasada least privilege: użytkownik ma dostęp tylko do tego, czego potrzebuje w pracy.',
    examples: ['Microsoft Entra ID (Azure AD)', 'Okta', 'SailPoint IdentityNow', 'One Identity', 'ForgeRock'],
    zeroTrustRelation: 'IAM to filar Zero Trust: każde żądanie dostępu jest weryfikowane na podstawie tożsamości użytkownika, niezależnie od lokalizacji.'
  },
  {
    id: 'mfa-tool',
    name: 'MFA',
    full: 'Multi-Factor Authentication',
    description: 'Uwierzytelnianie wieloskładnikowe: wymaga co najmniej dwóch różnych czynników potwierdzenia tożsamości.',
    detail: 'MFA łączy: coś, co wiesz (hasło, PIN), coś, co masz (telefon z aplikacją uwierzytelniającą, klucz sprzętowy FIDO2/YubiKey, karta OTP), i coś, czym jesteś (odcisk palca, twarz). Typy: TOTP (kody czasowe, np. Google/Microsoft Authenticator), powiadomienia push (zatwierdzenie w aplikacji), SMS (najsłabszy, podatny na SIM swapping), FIDO2/passkeys (najsilniejszy, odporny na phishing). MFA mocno ogranicza skuteczność ataków ze skradzionymi hasłami.',
    examples: ['Microsoft Authenticator', 'Google Authenticator', 'Duo Security', 'YubiKey (FIDO2)', 'RSA SecurID'],
    zeroTrustRelation: 'Absolutne minimum Zero Trust: bez MFA nie ma Zero Trust. Złotym standardem jest MFA odporne na phishing (phishing-resistant, FIDO2).'
  },
  {
    id: 'pam-tool',
    name: 'PAM',
    full: 'Privileged Access Management',
    description: 'Zarządzanie dostępem uprzywilejowanym: vault haseł, dostęp JIT, nagrywanie sesji administratorów.',
    detail: 'PAM chroni konta z podwyższonymi uprawnieniami. Obejmuje vault (sejf) haseł administratorów z automatyczną rotacją, just-in-time access (administrator ma uprawnienia tylko na czas wykonywania zadania), session recording (zapis wideo i naciśnięć klawiszy w sesjach uprzywilejowanych), multi-party approval (zasada czterech oczu przy krytycznych operacjach) i automatyczne wykrywanie kont uprzywilejowanych (discovery). Konta administratorów to „klucze do królestwa”, a PAM ogranicza ryzyko ich przejęcia.',
    examples: ['CyberArk Privilege Cloud', 'BeyondTrust', 'Delinea (Thycotic)', 'Wallix PAM', 'HashiCorp Vault'],
    zeroTrustRelation: 'PAM + IAM + MFA = pełna kontrola dostępu w modelu Zero Trust. PAM ma szczególne znaczenie dla zasady „just-in-time, just-enough access”.'
  },
  {
    id: 'zero-trust',
    name: 'Zero Trust',
    full: 'Zero Trust Architecture',
    description: 'Model bezpieczeństwa oparty na zasadzie „nigdy nie ufaj, zawsze weryfikuj”: każde żądanie dostępu jest weryfikowane niezależnie od lokalizacji.',
    detail: 'Zero Trust odchodzi od modelu „zaufana sieć wewnętrzna / niezaufane zewnętrze”. Zasady: (1) Weryfikuj explicite: zawsze uwierzytelniaj i autoryzuj (tożsamość + urządzenie + lokalizacja + czas + zachowanie); (2) Least privilege: minimalny zakres dostępu; (3) Assume breach: zakładaj, że sieć jest już skompromitowana. Sieć przestaje być granicą bezpieczeństwa, granicą jest tożsamość.',
    oldModel: {
      name: 'Model castle-and-moat (tradycyjny)',
      description: 'Zaufana sieć wewnętrzna (LAN), niezaufane zewnętrze (internet). Kto jest w sieci, ten jest zaufany. VPN daje pełny dostęp do sieci wewnętrznej.',
      weakness: 'Jeden skompromitowany endpoint lub konto VPN = atakujący „wewnątrz zamku” z dostępem do wszystkiego. Lateral movement jest łatwy.'
    },
    newModel: {
      name: 'Model Zero Trust',
      description: 'Żaden użytkownik, urządzenie ani sieć nie jest z góry zaufana. Każde żądanie dostępu przechodzi weryfikację: kto to jest? Z jakiego urządzenia? Czy urządzenie jest zgodne z polityką? Jaki jest kontekst (czas, lokalizacja, zachowanie)?',
      benefit: 'Nawet jeśli atakujący przejmie jedno konto, dostaje dostęp tylko do tego, do czego to konto ma uprawnienia, a nie do „całego zamku”.'
    },
    pillars: ['Tożsamość (Identity) – IAM + MFA', 'Urządzenia (Devices) – MDM, compliance check', 'Sieć (Network) – mikrosegmentacja, ZTNA', 'Aplikacje (Apps) – ZTNA, dostęp kontekstowy', 'Dane (Data) – szyfrowanie, DLP, klasyfikacja'],
    examples: ['Microsoft Zero Trust Architecture (Entra ID + Defender)', 'Google BeyondCorp', 'Zscaler Zero Trust Exchange', 'Palo Alto Prisma Access']
  },
];

// ── Ochrona danych ─────────────────────────────────────────────────────────

export const DATA_PROTECTION = [
  {
    id: 'encryption',
    name: 'Szyfrowanie danych',
    types: [
      {
        name: 'Szyfrowanie w spoczynku (at rest)',
        description: 'Szyfrowanie danych przechowywanych na dyskach, w bazach danych i backupach. Chroni przed fizyczną kradzieżą nośnika.',
        standards: 'Standardem jest AES-256. Dla dysków: BitLocker (Windows), FileVault (macOS), LUKS (Linux). Dla baz danych: TDE (Transparent Data Encryption).',
        regulatoryReq: 'RODO zaleca szyfrowanie jako środek ochrony. NIS2/DORA: wymagane dla danych wrażliwych. ISO 27001: kontrola A.8.24.'
      },
      {
        name: 'Szyfrowanie w tranzycie (in transit)',
        description: 'Szyfrowanie danych przesyłanych przez sieć. Chroni przed podsłuchem (MitM).',
        standards: 'Minimum to TLS 1.2/1.3. HTTPS, SFTP, SSH, VPN. Certyfikaty PKI. Wycofanie starych protokołów: SSL, TLS 1.0/1.1, RC4.',
        regulatoryReq: 'RODO: obowiązkowe przy przesyłaniu danych osobowych. PCI DSS: wymagany TLS 1.2+. Wymaga go też większość regulacji finansowych.'
      }
    ]
  },
  {
    id: 'backup321',
    name: 'Backup 3-2-1 (i rozszerzenia)',
    description: 'Zalecana zasada rozdzielenia kopii zapasowych, która ogranicza ryzyko ich jednoczesnej utraty.',
    rules: [
      { rule: '3 kopie', explanation: 'Produkcja + co najmniej 2 backupy. Jedna kopia to za mało, bo może zostać skompromitowana razem z produkcją.' },
      { rule: '2 różne nośniki', explanation: 'Np. dysk lokalny + taśma lub chmura. Różne nośniki chronią przed awarią jednego ich typu.' },
      { rule: '1 kopia poza siedzibą', explanation: 'Kopia w innej lokalizacji ogranicza skutki np. pożaru lub zalania siedziby. Poza siedzibą nie znaczy offline ani niezmienialna.' },
    ],
    extensions: [
      { name: '3-2-1-1-0', description: 'Oprócz kopii poza siedzibą: 1 kopia offline, odizolowana lub niezmienialna oraz 0 błędów w zweryfikowanym odtwarzaniu. Ochrona wymaga właściwej konfiguracji i rozdzielenia uprawnień.' },
      { name: 'Testowanie odtwarzania', description: 'Bez testu nie wiadomo, czy kopia pozwala przywrócić usługę. Ustal częstotliwość według ryzyka i zmian systemu; test co kwartał to przykład harmonogramu, nie uniwersalny wymóg prawny.' },
    ],
    rtoRpo: {
      rto: 'RTO (Recovery Time Objective) – jak długo system może być niedostępny? Wyznacza wymagania dla architektury i procedur odtwarzania.',
      rpo: 'RPO (Recovery Point Objective) – ile danych możemy stracić (do którego momentu cofamy się przy odtwarzaniu)? Definiuje, jak często robić backup.'
    }
  },
  {
    id: 'dlp-protection',
    name: 'DLP – Data Loss Prevention',
    description: 'Narzędzia i polityki, które zapobiegają nieautoryzowanemu przesyłaniu wrażliwych danych poza organizację.',
    channels: ['E-mail – blokuje wysłanie pliku z danymi kart kredytowych, numerami PESEL, danymi osobowymi', 'Urządzenia USB – kontrola podłączanych nośników, szyfrowanie', 'Chmura – monitoruje i blokuje wysyłanie plików do nieautoryzowanych usług', 'Wydruk – monitorowanie drukowania wrażliwych dokumentów', 'Przesyłanie przez internet – inspekcja HTTP/HTTPS'],
    prerequisites: 'DLP wymaga wcześniejszej klasyfikacji danych, bo musi wiedzieć, co jest wrażliwe. Bez klasyfikacji DLP jest ślepe.',
    regulatoryLink: 'RODO: DLP wspiera ochronę danych osobowych i wykrywanie naruszeń. NIS2: jeden ze środków zarządzania ryzykiem.'
  },
];

// ── Testowanie ofensywne ────────────────────────────────────────────────────

export const OFFENSIVE_TESTING = [
  {
    id: 'pentest',
    name: 'Test penetracyjny (pentest)',
    description: 'Symulowany, kontrolowany atak na systemy organizacji, który ma wykryć podatności i luki bezpieczeństwa.',
    types: [
      { name: 'Black box', description: 'Tester nie ma żadnej wiedzy o systemach (symuluje zewnętrznego atakującego).' },
      { name: 'White box', description: 'Tester ma pełną dokumentację: test jest wydajniejszy i szybszy, ale mniej realistyczny.' },
      { name: 'Grey box', description: 'Kompromis: częściowa wiedza (jak u wewnętrznego atakującego lub przy skompromitowanym koncie).' },
    ],
    scope: 'Może obejmować aplikacje webowe, infrastrukturę sieciową, sieci bezprzewodowe, inżynierię społeczną (phishing) i bezpieczeństwo fizyczne. Zakres dokładnie określa umowa (Rules of Engagement).',
    regulatoryLink: 'NIS2/KSC: testy penetracyjne są zalecane jako część zarządzania ryzykiem. DORA: regularne testowanie w sektorze finansowym, TLPT dla największych instytucji.',
    frequency: 'Co najmniej raz w roku dla systemów krytycznych, przy każdej istotnej zmianie infrastruktury i po większych aktualizacjach.'
  },
  {
    id: 'red-team',
    name: 'Red Team',
    description: 'Zaawansowana, realistyczna symulacja ataku APT: red team próbuje osiągnąć konkretny cel bez wiedzy zespołu obrońców (blue team).',
    detail: 'Ćwiczenie red team jest bardziej realistyczne niż pentest. Trwa dłużej (tygodnie lub miesiące), obejmuje pełen zakres wektorów ataku (phishing, fizyczny, cyfrowy), a o ćwiczeniu wie tylko wąska grupa („white cell”), nie cały zespół bezpieczeństwa. Zadaniem jest osiągnięcie konkretnego celu biznesowego (np. „wykraść dane finansowe” lub „wyłączyć system produkcyjny”). Ćwiczenie sprawdza podatności techniczne, a także procesy, ludzi i zdolność wykrywania (detection capabilities).',
    vspentest: 'Pentest: znajdź wszystkie podatności. Red Team: osiągnij cel jak prawdziwy atakujący, który wybiera ścieżkę selektywnie.',
    regulatoryLink: 'TLPT (DORA) to regulacyjna forma ćwiczenia red team dla sektora finansowego. Metodologię określa standard TIBER-EU.'
  },
  {
    id: 'blue-team',
    name: 'Blue Team',
    description: 'Zespół obronny: wykrywa ataki, reaguje na nie i wzmacnia obronę organizacji.',
    detail: 'Blue team to operacyjny zespół bezpieczeństwa (analitycy SOC, inżynierowie bezpieczeństwa), który broni organizacji. W ćwiczeniach red/blue team blue team próbuje wykryć działania red teamu i na nie zareagować. Główne metryki: MTTD (czas wykrycia) i MTTC (czas opanowania). Ćwiczenie purple team łączy obie strony: red ujawnia techniki, a blue uczy się je wykrywać.',
    purpleTeam: 'Purple team = czerwoni i niebiescy razem: red wykonuje atak → blue obserwuje → wspólnie poprawiają detekcję. To bardziej współpraca niż rywalizacja (adversarial).'
  },
  {
    id: 'tlpt',
    name: 'TLPT',
    full: 'Threat-Led Penetration Testing',
    description: 'Zaawansowany test penetracyjny oparty na aktualnym wywiadzie o zagrożeniach. DORA wymaga go od największych instytucji finansowych.',
    detail: 'TLPT to regulacyjna forma zaawansowanego testu penetracyjnego, zdefiniowana w standardzie TIBER-EU. Wyróżniają ją: scenariusze ataków oparte na aktualnym threat intelligence dla danej instytucji i sektora (a nie generyczne), zewnętrzni certyfikowani testerzy (red team), ograniczona wiedza wewnętrznego SOC (realistyczny scenariusz), raportowanie wyników do regulatora i możliwość wzajemnego uznawania wyników między krajami (cross-border). DORA wymaga TLPT co 3 lata od instytucji znaczących.',
    tiber: 'TIBER-EU (Threat Intelligence-based Ethical Red-teaming) to europejski standard TLPT opracowany przez EBC. Definiuje fazy: Preparation, Testing, Closure. Stosują go ECB, NBP i inne banki centralne.',
    regulatoryLink: 'DORA Art. 26: TLPT co 3 lata dla instytucji istotnych. Wyniki trafiają do EBA/ESMA/EIOPA lub właściwego organu krajowego (w Polsce KNF).'
  },
];
