/**
 * TECHNOLOGIA - narzędzia i warstwy obrony
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

// ── Warstwy obrony (gra "zbuduj mur") ─────────────────────────────────────

export const DEFENSE_LAYERS = [
  {
    id: 'mfa',
    name: 'MFA - Uwierzytelnianie wieloskładnikowe',
    icon: '🔑',
    category: 'tożsamość',
    description: 'Wymaga co najmniej dwóch czynników uwierzytelniania – samo hasło nie wystarcza. Znacząco ogranicza skuteczność ataków wykorzystujących skradzione hasła.',
    detail: 'MFA (Multi-Factor Authentication) jest jedną z najtańszych i najskuteczniejszych kontroli bezpieczeństwa. Nawet jeśli atakujący zna hasło (phishing, wyciek bazy), bez drugiego czynnika (kod SMS, aplikacja uwierzytelniająca albo klucz sprzętowy FIDO2) nie uzyska dostępu. Wymagane przez NIS2, DORA i większość standardów branżowych.',
    blocks: ['phishing', 'brute-force', 'credential-stuffing', 'ransomware'],
    doesNotBlock: ['Ataki na sam drugi czynnik (SIM swapping, phishing w czasie rzeczywistym na kod OTP)']
  },
  {
    id: 'backup',
    name: 'Backup 3-2-1',
    icon: '💾',
    category: 'ciągłość',
    description: '3 kopie danych, 2 różne nośniki, 1 kopia offline/poza siedzibą. Jedyna skuteczna ochrona przed ransomware.',
    detail: 'Zasada 3-2-1: 3 kopie danych (produkcja + 2 backupy), na 2 różnych typach nośników (np. dysk + taśma lub chmura), 1 kopia offline lub immutable (niezmienialna - ransomware nie może jej zaszyfrować). Kluczowe: regularne testowanie odtwarzania. Backup który nie był testowany = backup który nie działa. Definicja RPO (Recovery Point Objective) określa jak stara kopia jest akceptowalna.',
    blocks: ['ransomware', 'accidental-deletion', 'hardware-failure', 'insider'],
    doesNotBlock: ['Wycieku danych (backup chroni dostępność, nie poufność)']
  },
  {
    id: 'edr',
    name: 'EDR - Ochrona stacji roboczych',
    icon: '🛡️',
    category: 'endpointy',
    description: 'Zaawansowana ochrona urządzeń końcowych - wykrywa złośliwe zachowania (nie tylko sygnatury), umożliwia izolację i forensics.',
    detail: 'EDR (Endpoint Detection and Response) zastąpił klasyczny antywirus. Monitoruje zachowanie procesów w czasie rzeczywistym: co uruchamia, co zapisuje, z czym się łączy. Wykrywa ataki fileless (bez pliku), living-off-the-land (używanie legalnych narzędzi systemowych), szyfrowanie charakterystyczne dla ransomware. Kluczowe funkcje: izolacja hosta (odcięcie od sieci jednym kliknięciem), zbieranie dowodów forensycznych, rollback zmian.',
    blocks: ['ransomware', 'malware', 'apt', 'fileless-attacks', 'supply-chain'],
    doesNotBlock: ['Ataków sieciowych omijających urządzenia końcowe (tu potrzebny NDR)']
  },
  {
    id: 'ngfw',
    name: 'NGFW - Zapora sieciowa nowej generacji',
    icon: '🔥',
    category: 'sieć',
    description: 'Kontroluje ruch sieciowy z pełną inspekcją: IPS, identyfikacja aplikacji, odszyfrowywanie SSL, filtrowanie URL.',
    detail: 'NGFW (Next-Generation Firewall) łączy klasyczny firewall (filtracja pakietów, stateful inspection) z: Deep Packet Inspection, Intrusion Prevention System (IPS), identyfikacją aplikacji (nie tylko portów), odszyfrowywaniem SSL/TLS, filtrowaniem URL i kategorii, sandboxingiem plików. NGFW jest „bramą” sieci - kontroluje co wchodzi i wychodzi.',
    blocks: ['external-attacks', 'malware-download', 'c2-communication', 'ddos'],
    doesNotBlock: ['Zagrożeń wewnętrznych, ataków z zaszyfrowanym C2 jeśli nie odszyfrowuje SSL']
  },
  {
    id: 'waf',
    name: 'WAF - Zapora aplikacji webowych',
    icon: '🕸️',
    category: 'aplikacje',
    description: 'Chroni aplikacje webowe przed atakami SQL injection, XSS, CSRF i innymi na poziomie HTTP.',
    detail: 'WAF (Web Application Firewall) stoi przed aplikacją webową i analizuje każde żądanie HTTP/HTTPS. Blokuje: SQL injection, Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), command injection, file inclusion, ataki na API. Może działać w trybie detekcji (loguje) lub prewencji (blokuje). Wymaga strojenia dla konkretnej aplikacji - zbyt agresywny blokuje legalnych użytkowników.',
    blocks: ['sql-injection', 'xss', 'csrf', 'api-attacks', 'web-scraping'],
    doesNotBlock: ['Zagrożeń z wewnątrz sieci, ataków na inne protokoły niż HTTP']
  },
  {
    id: 'iam-layer',
    name: 'IAM / Zero Trust',
    icon: '🔐',
    category: 'tożsamość',
    description: 'Zarządzanie dostępem oparte na tożsamości i kontekście - zasada „nigdy nie ufaj, zawsze weryfikuj”.',
    detail: 'IAM (Identity and Access Management) w modelu Zero Trust zakłada, że każde żądanie dostępu musi być zweryfikowane niezależnie od źródła (wewnątrz czy z zewnątrz sieci). Weryfikacja opiera się na: tożsamości użytkownika (MFA), kondycji urządzenia (compliance), lokalizacji, czasie i kontekście zachowania. Zasada minimalnych uprawnień: dostęp tylko do niezbędnych zasobów.',
    blocks: ['lateral-movement', 'insider', 'stolen-credentials', 'ransomware'],
    doesNotBlock: ['Exploitów na aplikacje (tu WAF), ataków sieciowych (NGFW)']
  },
  {
    id: 'pam-layer',
    name: 'PAM - Zarządzanie dostępem uprzywilejowanym',
    icon: '👑',
    category: 'tożsamość',
    description: 'Specjalna kontrola kont administratorów - sejf haseł, rotacja, nagrywanie sesji.',
    detail: 'PAM (Privileged Access Management) chroni konta z podwyższonymi uprawnieniami: administratorów systemów, baz danych, sieci, service accounts. Funkcje: vault haseł (centralne przechowywanie i rotacja), just-in-time access (dostęp uprzywilejowany tylko gdy potrzebny), nagrywanie sesji (video zapis co admin robił), MFA dla wszystkich kont uprzywilejowanych. Konta admin to priorytetowy cel ataków - PAM minimalizuje ryzyko ich kompromitacji.',
    blocks: ['insider', 'lateral-movement', 'apt', 'privilege-escalation'],
    doesNotBlock: ['Ataków niekorzystających z kont uprzywilejowanych']
  },
  {
    id: 'siem-layer',
    name: 'SIEM - Wykrywanie i monitoring',
    icon: '🖥️',
    category: 'wykrywanie',
    description: 'Centralna platforma zbierania logów i korelacji zdarzeń - mózg SOC. Wykrywa wzorce ataków w całej infrastrukturze.',
    detail: 'SIEM zbiera logi ze wszystkich źródeł (serwery, sieć, aplikacje, chmura), normalizuje je do wspólnego formatu, koreluje zdarzenia w czasie i generuje alerty gdy wzorzec wskazuje na zagrożenie. Kluczowe: reguły korelacji muszą być regularnie aktualizowane. SIEM nie zastąpi analityka - to narzędzie wspomagające, nie autonomiczne. Przykłady: Splunk, Microsoft Sentinel, IBM QRadar.',
    blocks: ['apt', 'insider', 'data-exfiltration', 'anomalies'],
    doesNotBlock: ['Zagrożeń, dla których nie ma reguł korelacji (zero-day, nieznane TTP)']
  },
  {
    id: 'dlp-layer',
    name: 'DLP - Zapobieganie wyciekom danych',
    icon: '🚫',
    category: 'dane',
    description: 'Monitoruje i blokuje nieautoryzowany transfer wrażliwych danych - e-mail, USB, chmura.',
    detail: 'DLP (Data Loss Prevention) chroni dane przed wyciekiem przez: monitoring poczty e-mail (blokuje wysyłanie pliku z numerami kart kredytowych), kontrolę urządzeń USB, monitoring chmury (OneDrive, Dropbox), inspekcję wydruków. Wymaga wcześniejszej klasyfikacji danych - DLP musi wiedzieć co jest wrażliwe. Szczególnie ważne dla RODO (ochrona danych osobowych) i własności intelektualnej.',
    blocks: ['insider', 'data-exfiltration', 'accidental-leak'],
    doesNotBlock: ['Wycieku danych przez skompromitowane konto (jeśli DLP nie rozróżnia autoryzowanego/nieautoryzowanego)']
  },
  {
    id: 'segmentation',
    name: 'Segmentacja sieci',
    icon: '🏗️',
    category: 'sieć',
    description: 'Podział sieci na izolowane strefy - ogranicza możliwość przemieszczania się atakującego (lateral movement).',
    detail: 'Segmentacja sieci dzieli infrastrukturę na strefy z kontrolowanym przepływem ruchu: sieć serwerów, sieć użytkowników, sieć OT/IoT, DMZ. Mikrosegmentacja (Zero Trust Network) idzie dalej - każdy workload jest izolowany. Gdy atakujący wejdzie do jednej strefy, nie może łatwo przemieścić się do kolejnej. Analogia: szczelne drzwi przeciwpożarowe - jeden pożar nie pali całego budynku.',
    blocks: ['lateral-movement', 'ransomware', 'apt', 'insider'],
    doesNotBlock: ['Ataków w obrębie tej samej strefy sieci']
  },
  {
    id: 'vuln-mgmt-layer',
    name: 'Zarządzanie podatnościami / Patching',
    icon: '🔧',
    category: 'hardening',
    description: 'Systematyczne identyfikowanie i usuwanie podatności przed ich exploitacją przez atakujących.',
    detail: 'Większość skutecznych ataków exploituje znane podatności z dostępnym patchem - atakujący liczą na to, że organizacje nie aktualizują oprogramowania na czas. Cykl: skanowanie (co jest podatne?) → priorytetyzacja (CVSS + ekspozycja) → patch w terminie (krytyczne: 24-72h, wysokie: 7 dni, średnie: 30 dni) → weryfikacja. Zarządzanie podatnościami redukuje powierzchnię ataku systematycznie i mierzalnie.',
    blocks: ['supply-chain', 'ransomware', 'apt', 'external-attacks'],
    doesNotBlock: ['Podatności zero-day (nieznanych jeszcze), błędów konfiguracji niewynikających z podatności']
  },
];

// ── Scenariusze ataków (gra "dobierz warstwy obrony") ──────────────────────

export const ATTACK_SCENARIOS = [
  {
    id: 'ransomware-attack',
    name: 'Atak ransomware',
    icon: '🔒',
    description: 'Pracownik kliknął w phishingowy link. Malware szyfruje pliki na stacji roboczej i rozprzestrzenia się przez sieć. Żądanie okupu 500 000 PLN.',
    attackChain: [
      'Phishing e-mail z linkiem do malware',
      'Malware pobiera payload z C2 server',
      'Payload szyfruje pliki lokalnie i na udziałach sieciowych',
      'Ransomware próbuje wyłączyć backup',
      'Żądanie okupu'
    ],
    blockedBy: ['mfa', 'backup', 'edr', 'segmentation', 'ngfw'],
    bestLayer: 'backup',
    explanation: 'MFA nie zatrzyma kliknięcia w link, ale utrudni kompromitację konta. EDR może wykryć i zatrzymać szyfrowanie. Segmentacja ograniczy zasięg. Backup 3-2-1 (offline) to ostatnia linia - bez względu na to czy ransomware zaszyfruje dane, mamy kopię nietkniętą.'
  },
  {
    id: 'phishing-bec',
    name: 'Phishing / Business Email Compromise',
    icon: '🎣',
    description: 'Pracownik finansowy otrzymał e-mail „od prezesa” z prośbą o pilny przelew 2 mln PLN. E-mail wygląda autentycznie.',
    attackChain: [
      'Atakujący rejestruje domenę podobną do firmowej (np. firma-pl.com zamiast firma.pl)',
      'Wysyła e-mail „od prezesa” do działu finansowego',
      'Prosi o pilny, poufny przelew na nowe konto',
      'Presja czasu i poufności utrudnia weryfikację'
    ],
    blockedBy: ['mfa', 'iam-layer', 'siem-layer'],
    bestLayer: 'mfa',
    explanation: 'Podstawowa ochrona: SPF/DKIM/DMARC blokuje podszywanie się pod domenę firmy. MFA zabezpiecza konto nawet jeśli e-mail przechwycono. Procedury weryfikacji telefonicznej dla dużych przelewów to kluczowa kontrola procesowa - technologia sama nie wystarczy.'
  },
  {
    id: 'apt-intrusion',
    name: 'Atak APT (długotrwałe włamanie)',
    icon: '🕵️',
    description: 'Zaawansowana grupa APT uzyskała przyczółek w sieci przez podatność VPN. Przez 3 miesiące zbiera dane wywiadowcze i szuka drogi do systemów krytycznych.',
    attackChain: [
      'Eksploitacja podatności w bramie VPN',
      'Instalacja backdoora (persistent access)',
      'Lateral movement - przemieszczenie przez sieć',
      'Privilege escalation - przejęcie kont admin',
      'Eksfiltracja danych przez zaszyfrowany kanał'
    ],
    blockedBy: ['ngfw', 'pam-layer', 'segmentation', 'siem-layer', 'edr', 'vuln-mgmt-layer'],
    bestLayer: 'segmentation',
    explanation: 'Żadna warstwa nie zatrzyma APT w 100%. Patching (brak podatności VPN) jest kluczowy. Segmentacja ogranicza lateral movement. EDR wykrywa anomalie behawioralne. SIEM koreluje zdarzenia z wielu źródeł. PAM chroni konta admin. Ochrona przed APT to głęboka obrona - wiele warstw razem.'
  },
  {
    id: 'supply-chain-scenario',
    name: 'Atak na łańcuch dostaw',
    icon: '🔗',
    description: 'Zaufane oprogramowanie dostawcy zarządzanego przez MSSP zawiera zainfekowaną aktualizację. Malware instaluje się na setkach stacji roboczych jednocześnie.',
    attackChain: [
      'Kompromitacja środowiska budowania oprogramowania u dostawcy',
      'Złośliwy kod wstrzyknięty do legalnej aktualizacji',
      'Aktualizacja dystrybuowana automatycznie do klientów',
      'Malware uruchamia się z podpisanym certyfikatem dostawcy',
      'Masowa kompromitacja klientów'
    ],
    blockedBy: ['edr', 'siem-layer', 'segmentation', 'ngfw'],
    bestLayer: 'edr',
    explanation: 'Supply chain attack omija tradycyjne zabezpieczenia (malware ma podpis zaufanego dostawcy). EDR z wykrywaniem behawioralnym może wykryć anomalne zachowanie nawet podpisanego oprogramowania. SIEM koreluje masowe anomalie. Segmentacja ogranicza skutki. Kluczowa jest też ocena bezpieczeństwa dostawców (wymagana przez NIS2/DORA).'
  },
];

// ── Narzędzia SOC ───────────────────────────────────────────────────────────

export const SOC_TOOLS = [
  {
    id: 'siem',
    name: 'SIEM',
    full: 'Security Information and Event Management',
    icon: '🖥️',
    description: 'Centralny system zbierania logów, korelacji zdarzeń i generowania alertów bezpieczeństwa.',
    analogy: 'Centrala monitoringu z kamerami i czujnikami z całego budynku. Wszystko spływa do jednego miejsca - operator widzi cały obraz i otrzymuje alarm gdy coś nie pasuje do wzorca.',
    howItWorks: 'Zbiera logi ze wszystkich źródeł (agenty lub syslog), normalizuje do wspólnego formatu, stosuje reguły korelacji (np. „5 nieudanych logowań z jednego IP w 60 sekund → alert brute-force”), generuje incydenty dla analityków. Use cases: wykrywanie ataków brute-force, lateral movement, exfiltracji danych, anomalii behawioralnych.',
    examples: ['Splunk Enterprise Security', 'Microsoft Sentinel', 'IBM QRadar', 'Elastic SIEM', 'LogRhythm'],
    pros: ['Pełna widoczność infrastruktury', 'Korelacja zdarzeń z wielu źródeł', 'Zgodność z regulacjami (retencja logów)'],
    cons: ['Wymaga strojenia reguł', 'Wysokie koszty licencji', 'Alert fatigue bez SOAR', 'Wymaga doświadczonych analityków']
  },
  {
    id: 'soar',
    name: 'SOAR',
    full: 'Security Orchestration, Automation and Response',
    icon: '⚡',
    description: 'Platforma automatyzacji powtarzalnych zadań reagowania na incydenty i integracji narzędzi bezpieczeństwa.',
    analogy: 'Pilot automatyczny dla SOC - gdy SIEM „widzi” zagrożenie, SOAR automatycznie wykonuje procedurę bez udziału człowieka: blokuje IP, wysyła e-mail, tworzy ticket, powiadamia analityka.',
    howItWorks: 'Playbooki (workflows) definiują sekwencję działań dla różnych typów incydentów. Wyzwalane przez SIEM lub ręcznie przez analityka. Integruje się z setkami narzędzi przez API: SIEM, EDR, firewall, ticketing, e-mail, threat intel. Redukuje MTTR (Mean Time to Respond) z godzin do minut.',
    examples: ['Palo Alto XSOAR (Cortex)', 'Splunk SOAR', 'Microsoft Sentinel Playbooks', 'IBM Security SOAR', 'Swimlane'],
    pros: ['Drastyczne skrócenie MTTR', 'Redukcja alert fatigue', 'Standaryzacja reagowania', 'Odciążenie analityków L1'],
    cons: ['Wymaga inwestycji w konfigurację', 'Złe playbooki mogą wyrządzić szkody', 'Uzależnienie od integracji API']
  },
  {
    id: 'edr-tool',
    name: 'EDR',
    full: 'Endpoint Detection and Response',
    icon: '💻',
    description: 'Zaawansowana ochrona stacji roboczych i serwerów - wykrywa złośliwe zachowania, umożliwia reakcję i forensics.',
    analogy: 'Kamera bezpieczeństwa wewnątrz każdego komputera - nagrywa wszystko co się dzieje (procesy, pliki, sieć), wykrywa podejrzane zachowania i pozwala „cofnąć czas” po incydencie.',
    howItWorks: 'Agent EDR zainstalowany na każdym urządzeniu monitoruje w czasie rzeczywistym: uruchamiane procesy, modyfikacje plików i rejestru, połączenia sieciowe, wykonywany kod. Wykrywa anomalie behawioralne (nie tylko sygnatury). Funkcje IR: izolacja hosta, memory dump, timeline aktywności, usuwanie malware.',
    examples: ['CrowdStrike Falcon', 'Microsoft Defender for Endpoint', 'SentinelOne', 'Palo Alto Cortex XDR', 'Carbon Black'],
    pros: ['Wykrywanie behawioralne (zero-day)', 'Izolacja urządzenia jednym kliknięciem', 'Forensics zdalnie', 'Zastąpił AV jako standard'],
    cons: ['Koszt agentów na każde urządzenie', 'Wpływ na wydajność systemu', 'False positive przy agresywnym strojeniu']
  },
  {
    id: 'xdr-tool',
    name: 'XDR',
    full: 'Extended Detection and Response',
    icon: '🌐',
    description: 'Rozszerzone wykrywanie i reagowanie - integruje dane z endpointów, sieci, chmury i poczty w jeden obraz.',
    analogy: 'EDR widzi wnętrze jednego pokoju, XDR widzi cały budynek - endpointy, sieć, e-mail, chmurę, serwery - jednocześnie. Koreluje zdarzenia z różnych warstw, które z osobna wyglądają normalnie.',
    howItWorks: 'XDR łączy dane z EDR (endpointy), NDR (sieć), e-mail security, CASB (chmura) i innych źródeł w ujednoliconą platformę analizy. Korelacja cross-source wykrywa zagrożenia niewidoczne w izolowanych narzędziach. Daje analitykowi jeden ekran zamiast przełączania między kilkoma konsolami.',
    examples: ['Microsoft Defender XDR', 'Palo Alto Cortex XDR', 'CrowdStrike Falcon XDR', 'Trend Micro Vision One', 'Cisco XDR'],
    pros: ['Holistyczny obraz zagrożeń', 'Redukcja złożoności (mniej narzędzi)', 'Lepsza detekcja zaawansowanych ataków', 'Szybszy czas reakcji'],
    cons: ['Uzależnienie od jednego dostawcy (vendor lock-in)', 'Wysoki koszt', 'Integracja z legacy systemami']
  },
  {
    id: 'ndr-tool',
    name: 'NDR',
    full: 'Network Detection and Response',
    icon: '📡',
    description: 'Wykrywanie zagrożeń w ruchu sieciowym - widzi to czego EDR nie widzi (ruch między serwerami, IoT, OT).',
    analogy: 'Kamera obserwująca korytarze między pokojami. EDR widzi co dzieje się w każdym pokoju (urządzeniu), NDR widzi co przepływa przez korytarze (sieć) - ruch lateralny, komunikację C2, exfiltrację.',
    howItWorks: 'Pasywnie analizuje ruch sieciowy (mirror port lub TAP) lub metadane przepływów (NetFlow). Buduje baseline normalnego zachowania i wykrywa anomalie. Wykrywa: ruch lateralny, komunikację z C2 serwerami, skanowanie portów, exfiltrację danych przez DNS/ICMP.',
    examples: ['Darktrace', 'ExtraHop Reveal(x)', 'Vectra AI', 'Corelight', 'Cisco Stealthwatch'],
    pros: ['Widoczność urządzeń bez agenta (IoT, OT, legacy)', 'Wykrywa ruch lateralny', 'Bez wpływu na urządzenia końcowe'],
    cons: ['Nie widzi zawartości zaszyfrowanego ruchu (bez deszyfrowania)', 'Wymaga dużej przepustowości do analizy', 'Baseline wymaga czasu nauki']
  },
  {
    id: 'mdr-tool',
    name: 'MDR',
    full: 'Managed Detection and Response',
    icon: '🤝',
    description: 'Zarządzane wykrywanie i reagowanie - zewnętrzny dostawca przejmuje operacyjne funkcje SOC jako usługa.',
    analogy: 'Zamiast budować własną wartownię (SOC), wynajmujesz profesjonalną firmę ochroniarską (MDR provider), która monitoruje Twój obiekt 24/7 i reaguje na zagrożenia.',
    howItWorks: 'MDR provider dostarcza zarówno technologię (SIEM, EDR, XDR) jak i zespół analityków (L1/L2/L3) obsługujących klienta. Zwykle obejmuje: 24/7 monitoring, triaging alertów, reagowanie na incydenty (z różnym zakresem - notify only vs. aktywna reakcja), miesięczne raportowanie. Kluczowy element: SLA czas reakcji.',
    examples: ['Arctic Wolf', 'Rapid7 MDR', 'Sophos MDR', 'CrowdStrike Falcon Complete', 'Polish local MSSPs'],
    pros: ['Szybkie uruchomienie', 'Bez budowania własnego SOC', 'Dostęp do ekspertów klasy enterprise', '24/7 coverage'],
    cons: ['Dane organizacji w zewnętrznym SOC', 'SLA może być niewystarczające', 'Mniejsza znajomość specyfiki', 'Uzależnienie od dostawcy']
  },
];

// ── Narzędzia sieciowe ─────────────────────────────────────────────────────

export const NETWORK_TOOLS = [
  {
    id: 'firewall',
    name: 'Firewall / NGFW',
    full: 'Next-Generation Firewall',
    icon: '🔥',
    description: 'Zapora sieciowa kontrolująca ruch na podstawie reguł i inspekcji głębokiej pakietów.',
    detail: 'Firewall to „brama” sieci - decyduje co wchodzi i wychodzi. Tradycyjny firewall: filtracja na podstawie IP i portów. NGFW (Next-Generation Firewall): Deep Packet Inspection, IPS/IDS, identyfikacja aplikacji (Layer 7 - widzi że to Facebook, nie tylko port 443), deszyfrowanie SSL/TLS, filtrowanie URL, ochrona przed exploit. Kluczowe umiejscowienie: perimeter (brzeg sieci), między segmentami sieci, przed serwerami.',
    examples: ['Palo Alto Networks PA-Series', 'Fortinet FortiGate', 'Cisco Firepower', 'Check Point', 'Sophos XGS'],
    useCases: ['Ochrona granicy sieci (north-south traffic)', 'Segmentacja wewnętrzna', 'Inspekcja ruchu zaszyfrowanego', 'Blokowanie złośliwych domen/IP']
  },
  {
    id: 'ids-tool',
    name: 'IDS',
    full: 'Intrusion Detection System',
    icon: '👁️',
    description: 'System pasywny wykrywający włamania - monitoruje ruch i generuje alerty, ale nie blokuje.',
    detail: 'IDS (Intrusion Detection System) analizuje ruch sieciowy lub logi systemowe w poszukiwaniu wzorców ataków (sygnatury) lub anomalii (behawioralnie). Typ NIDS (Network) monitoruje sieć, HIDS (Host) - konkretny serwer. Pasywny - tylko wykrywa i alarmuje, nie blokuje. Stosowany gdy blokowanie jest zbyt ryzykowne (np. przemysłowe systemy sterowania) lub jako uzupełnienie IPS dla szerszej widoczności bez ryzyka false positive blokowania.',
    examples: ['Snort (open source)', 'Suricata (open source)', 'Zeek/Bro', 'OSSEC (HIDS)'],
    useCases: ['Monitoring sieci OT/przemysłowej (gdzie blokowanie = wyłączenie produkcji)', 'Uzupełnienie IPS', 'Compliance monitoring']
  },
  {
    id: 'ips-tool',
    name: 'IPS',
    full: 'Intrusion Prevention System',
    icon: '🚧',
    description: 'System aktywnie blokujący włamania - inline w sieci, blokuje podejrzany ruch w czasie rzeczywistym.',
    detail: 'IPS (Intrusion Prevention System) to aktywna wersja IDS - siedzi inline w ruchu sieciowym i blokuje zagrożenia w czasie rzeczywistym. Wykrywa exploity znanych podatności, skanowanie portów, brute-force, ataki DDoS warstwy aplikacji. Zazwyczaj wbudowany w NGFW. Wymaga regularnego aktualizowania sygnatur i dokładnego strojenia - zbyt agresywne reguły blokują legalny ruch (false positives).',
    examples: ['Najczęściej jako moduł NGFW (Palo Alto, Fortinet)', 'Cisco Firepower IPS', 'Snort inline mode'],
    useCases: ['Ochrona serwerów przed exploitami', 'Blokowanie ataków w czasie rzeczywistym', 'Ochrona perimetru']
  },
  {
    id: 'waf-tool',
    name: 'WAF',
    full: 'Web Application Firewall',
    icon: '🕸️',
    description: 'Zapora chroniąca aplikacje webowe przed atakami warstwy aplikacji: SQL injection, XSS, CSRF.',
    detail: 'WAF (Web Application Firewall) analizuje ruch HTTP/HTTPS i blokuje złośliwe żądania zanim dotrą do aplikacji. Chroni przed OWASP Top 10: SQL injection, XSS, CSRF, SSRF, XXE, insecure deserialization i inne. Tryby: detection (loguje), prevention (blokuje). WAF może być: sprzętowy (on-premise), software (reverse proxy), chmurowy (CDN WAF). Wymaga strojenia dla konkretnej aplikacji - zbyt agresywny generuje false positives.',
    examples: ['Cloudflare WAF', 'AWS WAF', 'F5 Advanced WAF', 'ModSecurity (open source)', 'Imperva WAF'],
    useCases: ['Ochrona aplikacji webowych (sklepy, portale klientów)', 'Ochrona API', 'Wymagany dla PCI DSS, często dla NIS2']
  },
  {
    id: 'vpn-tool',
    name: 'VPN / ZTNA',
    full: 'Virtual Private Network / Zero Trust Network Access',
    icon: '🔒',
    description: 'Bezpieczny zdalny dostęp do zasobów organizacji - VPN daje dostęp do sieci, ZTNA tylko do aplikacji.',
    detail: 'Tradycyjny VPN tworzy szyfrowany tunel do sieci korporacyjnej - po uwierzytelnieniu użytkownik ma dostęp do całej sieci (ryzyko: jeden skompromitowany endpoint = dostęp do wszystkiego). ZTNA (Zero Trust Network Access) to nowszy model: dostęp do konkretnych aplikacji, nie całej sieci, z weryfikacją kondycji urządzenia i kontekstu. ZTNA implementuje zasady Zero Trust w dostępie zdalnym. Trendem jest migracja z VPN do ZTNA.',
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
    icon: '🆔',
    description: 'Framework zarządzania tożsamościami cyfrowymi i uprawnieniami dostępu - kto może, do czego, kiedy, jak.',
    detail: 'IAM obejmuje: zarządzanie cyklem życia kont (tworzenie, modyfikacja, usuwanie), federację tożsamości (SSO - jeden login dla wielu systemów), uwierzytelnianie (hasła, MFA, certyfikaty), autoryzację (role, uprawnienia, polityki dostępu), audyt (kto co kiedy zrobił). Zasada least privilege: użytkownik ma dostęp tylko do tego co potrzebuje do swojej pracy.',
    examples: ['Microsoft Entra ID (Azure AD)', 'Okta', 'SailPoint IdentityNow', 'One Identity', 'ForgeRock'],
    zeroTrustRelation: 'IAM to filar Zero Trust - każde żądanie dostępu weryfikowane przez pryzmat tożsamości użytkownika, niezależnie od lokalizacji.'
  },
  {
    id: 'mfa-tool',
    name: 'MFA',
    full: 'Multi-Factor Authentication',
    icon: '📱',
    description: 'Uwierzytelnianie wieloskładnikowe – wymaga co najmniej dwóch różnych czynników potwierdzenia tożsamości.',
    detail: 'MFA łączy: coś co wiesz (hasło, PIN), coś co masz (telefon z aplikacją uwierzytelniającą, klucz sprzętowy FIDO2/YubiKey, karta OTP), coś czym jesteś (odcisk palca, twarz). Typy: TOTP (kody czasowe – Google/Microsoft Authenticator), powiadomienia push (zatwierdź w aplikacji), SMS (najsłabszy – podatny na SIM swapping), FIDO2/passkeys (najsilniejszy – phishing-resistant). MFA znacząco ogranicza skuteczność ataków na skradzione hasła.',
    examples: ['Microsoft Authenticator', 'Google Authenticator', 'Duo Security', 'YubiKey (FIDO2)', 'RSA SecurID'],
    zeroTrustRelation: 'Absolutny minimum Zero Trust - bez MFA nie ma Zero Trust. Phishing-resistant MFA (FIDO2) to gold standard.'
  },
  {
    id: 'pam-tool',
    name: 'PAM',
    full: 'Privileged Access Management',
    icon: '🏛️',
    description: 'Zarządzanie dostępem uprzywilejowanym - vault haseł, JIT access, nagrywanie sesji administratorów.',
    detail: 'PAM chroni konta z podwyższonymi uprawnieniami: vault (sejf) haseł administratorów z automatyczną rotacją, just-in-time access (admin ma uprawnienia tylko przez czas wykonywania zadania), session recording (video+keystroke logging sesji uprzywilejowanych), multi-party approval (4-eye principle dla krytycznych operacji), automatyczne discovery kont uprzywilejowanych. Konta admin to „klucze do królestwa” - PAM minimalizuje ryzyko ich kompromitacji.',
    examples: ['CyberArk Privilege Cloud', 'BeyondTrust', 'Delinea (Thycotic)', 'Wallix PAM', 'HashiCorp Vault'],
    zeroTrustRelation: 'PAM + IAM + MFA = kompletna kontrola dostępu w modelu Zero Trust. PAM szczególnie istotny dla „just-in-time, just-enough access”.'
  },
  {
    id: 'zero-trust',
    name: 'Zero Trust',
    full: 'Zero Trust Architecture',
    icon: '🏰',
    description: 'Model bezpieczeństwa: „nigdy nie ufaj, zawsze weryfikuj” - każde żądanie dostępu weryfikowane niezależnie od lokalizacji.',
    detail: 'Zero Trust to odejście od modelu „zaufana sieć wewnętrzna / niezaufane zewnętrze”. Zasady: (1) Weryfikuj explicite - zawsze uwierzytelniaj i autoryzuj (tożsamość + urządzenie + lokalizacja + czas + zachowanie); (2) Least privilege - minimalny zakres dostępu; (3) Assume breach - zakładaj że sieć jest już skompromitowana. Sieć przestaje być granicą bezpieczeństwa - granicą jest tożsamość.',
    oldModel: {
      name: 'Model castle-and-moat (tradycyjny)',
      description: 'Zaufana sieć wewnętrzna (LAN), niezaufane zewnętrze (internet). Kto jest w sieci = zaufany. VPN daje pełny dostęp do sieci wewnętrznej.',
      weakness: 'Jeden skompromitowany endpoint lub konto VPN = atakujący „wewnątrz zamku” z dostępem do wszystkiego. Lateral movement jest łatwy.'
    },
    newModel: {
      name: 'Model Zero Trust',
      description: 'Żaden użytkownik, urządzenie ani sieć nie jest z góry zaufana. Każde żądanie dostępu weryfikowane: kto to? Z jakiego urządzenia? Czy urządzenie jest zgodne z polityką? Jaki jest kontekst (czas, lokalizacja, zachowanie)?',
      benefit: 'Nawet jeśli atakujący skompromituje jedno konto, dostaje dostęp tylko do tego do czego to konto ma uprawnienia - nie do „całego zamku”.'
    },
    pillars: ['Tożsamość (Identity) - IAM + MFA', 'Urządzenia (Devices) - MDM, compliance check', 'Sieć (Network) - mikrosegmentacja, ZTNA', 'Aplikacje (Apps) - ZTNA, dostęp kontekstowy', 'Dane (Data) - szyfrowanie, DLP, klasyfikacja'],
    examples: ['Microsoft Zero Trust Architecture (Entra ID + Defender)', 'Google BeyondCorp', 'Zscaler Zero Trust Exchange', 'Palo Alto Prisma Access']
  },
];

// ── Ochrona danych ─────────────────────────────────────────────────────────

export const DATA_PROTECTION = [
  {
    id: 'encryption',
    name: 'Szyfrowanie danych',
    icon: '🔐',
    types: [
      {
        name: 'Szyfrowanie w spoczynku (at rest)',
        description: 'Szyfrowanie danych przechowywanych na dyskach, bazach danych, backupach. Chroni przed fizyczną kradzieżą nośnika.',
        standards: 'AES-256 jako standard. BitLocker (Windows), FileVault (macOS), LUKS (Linux) dla dysków. TDE (Transparent Data Encryption) dla baz danych.',
        regulatoryReq: 'RODO zaleca szyfrowanie jako środek ochrony. NIS2/DORA: wymagane dla danych wrażliwych. ISO 27001: kontrola A.8.24.'
      },
      {
        name: 'Szyfrowanie w tranzycie (in transit)',
        description: 'Szyfrowanie danych przesyłanych przez sieć. Chroni przed podsłuchaniem (MitM).',
        standards: 'TLS 1.2/1.3 jako minimum. HTTPS, SFTP, SSH, VPN. Certyfikaty PKI. Deprecjacja starych protokołów: SSL, TLS 1.0/1.1, RC4.',
        regulatoryReq: 'RODO: obowiązkowe dla przesyłania danych osobowych. PCI DSS: TLS 1.2+ wymagane. Większość regulacji finansowych.'
      }
    ]
  },
  {
    id: 'backup321',
    name: 'Backup 3-2-1 (i rozszerzenia)',
    icon: '💾',
    description: 'Zasada tworzenia kopii zapasowych zapewniająca odtworzenie danych po każdym scenariuszu awarii.',
    rules: [
      { rule: '3 kopie', explanation: 'Produkcja + co najmniej 2 backupy. Jedna kopia to za mało - może być skompromitowana razem z produkcją.' },
      { rule: '2 różne nośniki', explanation: 'Np. dysk lokalny + taśma lub chmura. Dywersyfikacja chroni przed awarią jednego typu nośnika.' },
      { rule: '1 kopia offline / poza siedzibą', explanation: 'Kopia odizolowana od sieci (air-gapped) lub geograficznie odległa. Ransomware nie dosięgnie kopii offline.' },
    ],
    extensions: [
      { name: '3-2-1-1-0', description: '1 dodatkowa kopia immutable (niezmienialna) + 0 błędów po weryfikacji odtwarzania. Immutable backup = ransomware nie może go zaszyfrować ani usunąć.' },
      { name: 'Testowanie odtwarzania', description: 'Backup który nie był testowany = backup który nie działa. Regularne testy odtwarzania (co kwartał dla krytycznych systemów) są kluczowe.' },
    ],
    rtoRpo: {
      rto: 'RTO (Recovery Time Objective) - jak długo system może być niedostępny? Definiuje częstotliwość backupu i architekturę odtwarzania.',
      rpo: 'RPO (Recovery Point Objective) - ile danych możemy stracić (do kiedy cofamy się przy odtwarzaniu)? Definiuje jak często robić backup.'
    }
  },
  {
    id: 'dlp-protection',
    name: 'DLP - Data Loss Prevention',
    icon: '🚫',
    description: 'Narzędzia i polityki zapobiegające nieautoryzowanemu transferowi wrażliwych danych poza organizację.',
    channels: ['E-mail - blokuje wysłanie pliku z danymi kart kredytowych, PESEL, danymi osobowymi', 'Urządzenia USB - kontrola podłączanych nośników, szyfrowanie', 'Chmura - monitor i blokuje upload do nieautoryzowanych usług', 'Wydruk - monitorowanie drukowania wrażliwych dokumentów', 'Przesyłanie przez internet - inspekcja HTTP/HTTPS'],
    prerequisites: 'DLP wymaga wcześniejszej klasyfikacji danych - musi wiedzieć co jest wrażliwe. Bez klasyfikacji DLP jest ślepe.',
    regulatoryLink: 'RODO: DLP wspiera ochronę danych osobowych i wykrywanie naruszeń. NIS2: element środków zarządzania ryzykiem.'
  },
];

// ── Testowanie ofensywne ────────────────────────────────────────────────────

export const OFFENSIVE_TESTING = [
  {
    id: 'pentest',
    name: 'Test penetracyjny (Pentest)',
    icon: '🔓',
    description: 'Symulowany, kontrolowany atak na systemy organizacji w celu identyfikacji podatności i luk bezpieczeństwa.',
    types: [
      { name: 'Black box', description: 'Tester nie ma żadnej wiedzy o systemach (symuluje atakującego zewnętrznego)' },
      { name: 'White box', description: 'Tester ma pełną dokumentację - efektywniejszy, szybszy, ale mniej realistyczny' },
      { name: 'Grey box', description: 'Kompromis - częściowa wiedza (jak wewnętrzny atakujący lub skompromitowane konto)' },
    ],
    scope: 'Może obejmować: aplikacje webowe, infrastrukturę sieciową, sieci bezprzewodowe, inżynierię społeczną (phishing), bezpieczeństwo fizyczne. Zakres dokładnie definiowany w umowie (Rules of Engagement).',
    regulatoryLink: 'NIS2/KSC: testy penetracyjne zalecane jako element zarządzania ryzykiem. DORA: regularne testowanie dla sektora finansowego, TLPT dla największych.',
    frequency: 'Minimum raz w roku dla systemów krytycznych, przy każdej istotnej zmianie infrastruktury, po znaczących aktualizacjach.'
  },
  {
    id: 'red-team',
    name: 'Red Team',
    icon: '🔴',
    description: 'Zaawansowana, realistyczna symulacja ataku APT - red team próbuje osiągnąć konkretny cel bez wiedzy blue team.',
    detail: 'Red team exercise jest bardziej realistyczne niż pentest: dłuższy czas trwania (tygodnie/miesiące), pełen zakres wektora ataku (phishing, fizyczny, digital), brak powiadamiania całego zespołu bezpieczeństwa (tylko ograniczony „white cell”), cel: osiągnąć konkretny cel biznesowy (np. „wykraść dane finansowe” lub „wyłączyć system produkcyjny”). Ocenia nie tylko podatności techniczne ale też procesy, ludzi i detection capabilities.',
    vspentest: 'Pentest: znajdź wszystkie podatności. Red Team: osiągnij cel jak prawdziwy atakujący - jest selektywny w wyborze ścieżki.',
    regulatoryLink: 'TLPT (DORA) to regulacyjna forma red team exercise dla sektora finansowego. Standard TIBER-EU definiuje metodologię.'
  },
  {
    id: 'blue-team',
    name: 'Blue Team',
    icon: '🔵',
    description: 'Zespół obronny - odpowiada za wykrywanie ataków, reagowanie i wzmacnianie obrony organizacji.',
    detail: 'Blue team to operacyjny zespół bezpieczeństwa (SOC analitycy, inżynierowie bezpieczeństwa), który broni organizacji. W ćwiczeniach red/blue team: blue team próbuje wykryć działania red team i zareagować. Kluczowe metryki: MTTD (czas wykrycia), MTTC (czas opanowania). Purple team exercise łączy red i blue - red ujawnia techniki, blue uczy się jak je wykrywać.',
    purpleTeam: 'Purple team = czerwoni i niebiescy wspólnie: red wykonuje atak → blue obserwuje → wspólnie poprawiają detekcję. Bardziej kolaboracyjne niż adversarial.'
  },
  {
    id: 'tlpt',
    name: 'TLPT',
    full: 'Threat-Led Penetration Testing',
    icon: '🎯',
    description: 'Zaawansowany test penetracyjny oparty na aktualnym wywiadzie o zagrożeniach - wymagany przez DORA dla największych instytucji finansowych.',
    detail: 'TLPT to regulacyjna forma zaawansowanego testu penetracyjnego zdefiniowana w standardzie TIBER-EU. Wyróżnia ją: scenariusze ataków oparte na aktualnym threat intelligence specyficznym dla instytucji i sektora (nie generyczne), zewnętrzni certyfikowani testerzy (red team), ograniczona wiedza wewnętrznego SOC (realistyczny scenariusz), wyniki raportowane do regulatora, możliwość wzajemnego uznawania wyników (cross-border). DORA wymaga TLPT co 3 lata dla instytucji znaczących.',
    tiber: 'TIBER-EU (Threat Intelligence-based Ethical Red-teaming) to europejski standard TLPT opracowany przez EBC. Definiuje fazy: Preparation, Testing, Closure. Stosowany przez ECB, NBP i inne banki centralne.',
    regulatoryLink: 'DORA Art. 26: TLPT co 3 lata dla instytucji istotnych. Wyniki do EBA/ESMA/EIOPA lub właściwego organu krajowego (w Polsce KNF).'
  },
];

// ── Quiz - technologia ─────────────────────────────────────────────────────

export const TECH_QUIZ = [
  {
    question: 'Jaka jest kluczowa różnica między IDS a IPS?',
    options: [
      'IDS chroni endpointy, IPS chroni sieć',
      'IDS pasywnie wykrywa i alarmuje, IPS aktywnie blokuje ruch w czasie rzeczywistym',
      'IPS jest przestarzały - IDS zastąpił go we wszystkich zastosowaniach',
      'IDS działa na warstwie aplikacji, IPS na warstwie sieciowej'
    ],
    correct: 1,
    explanation: 'IDS (Intrusion Detection System) to system pasywny - monitoruje ruch i generuje alerty, ale nie blokuje. IPS (Intrusion Prevention System) siedzi inline w ruchu sieciowym i blokuje zagrożenia w czasie rzeczywistym. IPS jest agresywniejszy - wymaga dokładnego strojenia by uniknąć blokowania legalnego ruchu (false positives). Współcześnie IPS jest zazwyczaj wbudowany w NGFW.'
  },
  {
    question: 'Firma wdrożyła backup codzienny. Czy spełnia zasadę 3-2-1?',
    options: [
      'Tak - jeden backup wystarczy jako uzupełnienie produkcji',
      'Nie - zasada 3-2-1 wymaga 3 kopii na 2 różnych nośnikach, z 1 kopią offline/poza siedzibą',
      'Tak, ale tylko jeśli backup jest w chmurze',
      'Nie - backup musi być robiony co godzinę żeby spełniać 3-2-1'
    ],
    correct: 1,
    explanation: 'Zasada 3-2-1 to: 3 kopie danych (produkcja + co najmniej 2 backupy), na 2 różnych typach nośników (dywersyfikacja), z 1 kopią offline lub poza siedzibą (air-gapped lub geograficznie odległa). Sam codzienny backup to prawdopodobnie tylko jedna kopia zapasowa - nie spełnia pełnej zasady. Kopia offline jest kluczowa dla ochrony przed ransomware.'
  },
  {
    question: 'Czym XDR różni się od EDR?',
    options: [
      'XDR jest tańszy - to uproszczona wersja EDR dla małych firm',
      'XDR rozszerza EDR o dane z sieci, poczty i chmury - daje holistyczny obraz zagrożeń',
      'EDR to nowsza technologia - zastąpił XDR',
      'XDR i EDR to dwa nazwy tego samego narzędzia'
    ],
    correct: 1,
    explanation: 'EDR (Endpoint Detection and Response) skupia się na urządzeniach końcowych. XDR (Extended Detection and Response) rozszerza widoczność o dane z sieci (NDR), poczty, chmury i aplikacji. XDR koreluje zdarzenia z różnych warstw, wykrywając zagrożenia niewidoczne w izolowanych narzędziach. Daje analitykowi SOC jeden, ujednolicony obraz zamiast przełączania między kilkoma konsolami.'
  },
  {
    question: 'Dlaczego Zero Trust jest lepszy niż tradycyjny model „zaufana sieć wewnętrzna”?',
    options: [
      'Zero Trust jest tańszy w implementacji',
      'W modelu tradycyjnym jeden skompromitowany endpoint daje dostęp do całej sieci; Zero Trust weryfikuje każde żądanie niezależnie',
      'Zero Trust całkowicie eliminuje ryzyko cyberataków',
      'Zero Trust nie wymaga haseł - jest bezpieczniejszy bo używa biometrii'
    ],
    correct: 1,
    explanation: 'Tradycyjny model castle-and-moat: kto jest „wewnątrz” sieci = zaufany. Problem: jeden skompromitowany laptop lub konto VPN = atakujący wewnątrz z szerokim dostępem, lateral movement jest łatwy. Zero Trust: „nigdy nie ufaj, zawsze weryfikuj” - każde żądanie dostępu weryfikowane przez pryzmat tożsamości, urządzenia, kontekstu. Nawet skompromitowane konto ma dostęp tylko do ograniczonych zasobów.'
  },
  {
    question: 'Jaka jest rola SOAR w SOC?',
    options: [
      'SOAR to zaawansowany firewall nowej generacji',
      'SOAR automatyzuje powtarzalne zadania reagowania, integruje narzędzia i przyspiesza obsługę incydentów',
      'SOAR zastępuje analityków SOC - po wdrożeniu SOAR nie potrzeba ludzi',
      'SOAR to narzędzie do backupowania konfiguracji SIEM'
    ],
    correct: 1,
    explanation: 'SOAR (Security Orchestration, Automation and Response) automatyzuje powtarzalne zadania reagowania na incydenty: gdy SIEM wykryje phishing, SOAR może automatycznie zablokować nadawcę, poddać e-mail kwarantannie, sprawdzić IP w threat intel, stworzyć ticket i powiadomić analityka. Redukuje MTTR z godzin do minut i „odciąża” analityków od rutynowych działań. SOAR uzupełnia, nie zastępuje analityków - skomplikowane incydenty wciąż wymagają ludzkiego osądu.'
  },
];
