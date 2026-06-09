/**
 * ORGANIZACJA — role, SOC, procesy i zarządzanie
 * Źródło: "Cyberbezpieczeństwo w organizacjach — przewodnik porządkujący"
 */

// ── Role i odpowiedzialności ────────────────────────────────────────────────

export const ROLES = [
  {
    id: 'zarzad',
    name: 'Zarząd / Rada Nadzorcza',
    icon: '👔',
    responsibility: 'Zatwierdzanie strategii i polityk cyberbezpieczeństwa, nadzór nad programem bezpieczeństwa, akceptacja apetytu na ryzyko, zapewnienie zasobów. NIS2 i DORA wprost nakładają na zarząd osobistą odpowiedzialność za cyberbezpieczeństwo organizacji.',
    reports_to: null,
    keyActions: [
      'Zatwierdza politykę bezpieczeństwa informacji',
      'Określa apetyt na ryzyko cyberbezpieczeństwa',
      'Zapewnia budżet na bezpieczeństwo',
      'Odbiera regularne raporty od CISO',
      'Odpowiada osobiście za naruszenia (NIS2/DORA)'
    ],
    trap: 'Błąd: "To sprawa IT — my nie musimy się tym zajmować." NIS2 i DORA wprost nakładają osobistą odpowiedzialność na zarząd!'
  },
  {
    id: 'ciso',
    name: 'CISO — Chief Information Security Officer',
    icon: '🛡️',
    responsibility: 'Zarządzanie całościowym programem cyberbezpieczeństwa organizacji: strategia bezpieczeństwa, zarządzanie ryzykiem, compliance z regulacjami (NIS2, DORA, RODO), nadzór nad SOC, polityki i procedury, szkolenia, reagowanie na incydenty. Raportuje do zarządu.',
    reports_to: 'Zarząd / CEO',
    keyActions: [
      'Opracowuje i wdraża strategię cyberbezpieczeństwa',
      'Zarządza programem ryzyka cyberbezpieczeństwa',
      'Nadzoruje SOC i proces reagowania na incydenty',
      'Raportuje zarządowi o stanie bezpieczeństwa',
      'Zapewnia zgodność z NIS2, DORA, RODO'
    ],
    trap: 'Błąd: "CISO = DPO" — to zupełnie różne funkcje! CISO odpowiada za całe bezpieczeństwo IT, DPO wyłącznie za ochronę danych osobowych (RODO).'
  },
  {
    id: 'cso-cio-cto',
    name: 'CSO / CIO / CTO',
    icon: '💻',
    responsibility: 'CSO (Chief Security Officer) — bezpieczeństwo fizyczne i IT łącznie. CIO (Chief Information Officer) — strategia IT i transformacja cyfrowa. CTO (Chief Technology Officer) — technologia, infrastruktura, architektura IT. W zależności od organizacji może nakładać się z rolą CISO lub być od niej oddzielony.',
    reports_to: 'CEO / Zarząd',
    keyActions: [
      'CIO: strategia IT, cyfryzacja, budżet IT',
      'CTO: architektura techniczna, innowacje technologiczne',
      'CSO: całościowe bezpieczeństwo (fizyczne + cyfrowe)',
      'Współpraca z CISO w zakresie integracji bezpieczeństwa z IT'
    ],
    trap: 'W małych organizacjach często jedna osoba łączy role CISO+CIO lub CISO+CTO. W dużych — rozdzielenie ról zapobiega konfliktom interesów między "budowaniem systemów" a "ich zabezpieczaniem".'
  },
  {
    id: 'dpo',
    name: 'DPO — Inspektor Ochrony Danych (IOD)',
    icon: '📋',
    responsibility: 'Nadzorowanie przestrzegania RODO: doradztwo w zakresie ochrony danych osobowych, monitoring zgodności z RODO, punkt kontaktowy dla UODO i osób fizycznych, oceny skutków dla ochrony danych (DPIA), szkolenia pracowników w zakresie RODO.',
    reports_to: 'Zarząd (niezależna funkcja — DPO nie może otrzymywać poleceń w zakresie swoich zadań)',
    keyActions: [
      'Doradza w kwestiach ochrony danych osobowych',
      'Monitoruje zgodność z RODO',
      'Jest punktem kontaktowym dla UODO',
      'Prowadzi i opiniuje oceny skutków (DPIA)',
      'Szkoli pracowników z RODO'
    ],
    trap: 'DPO ≠ CISO — to różne funkcje! DPO zajmuje się wyłącznie ochroną danych osobowych (RODO), CISO — całym cyberbezpieczeństwem. DPO musi być niezależny i nie może łączyć roli z funkcją, która tworzy konflikt interesów (np. administrator IT przetwarzający dane).'
  },
  {
    id: 'analitycy',
    name: 'Analitycy SOC / Specjaliści ds. bezpieczeństwa',
    icon: '🔍',
    responsibility: 'Operacyjne wykonanie zadań bezpieczeństwa: monitoring alertów (L1/L2/L3), reagowanie na incydenty, zarządzanie podatnościami, pentesty, threat hunting, zarządzanie narzędziami bezpieczeństwa (SIEM, EDR), opracowywanie i aktualizacja playbooków.',
    reports_to: 'CISO / Manager SOC',
    keyActions: [
      'L1: Triaging alertów SIEM — selekcja i eskalacja',
      'L2: Analiza incydentów, investigacje',
      'L3: Threat hunting, forensics, reagowanie na zaawansowane zagrożenia',
      'Utrzymanie i tuning narzędzi bezpieczeństwa',
      'Aktualizacja playbooków i dokumentacji'
    ],
    trap: 'Wypalenie zawodowe (analyst burnout) — zbyt duża liczba alertów, praca zmianowa, presja. Niedobór specjalistów SOC to globalny problem. SOAR i automatyzacja częściowo łagodzą obciążenie.'
  },
];

// ── Komponenty SOC ──────────────────────────────────────────────────────────

export const SOC_COMPONENTS = {
  people: [
    {
      id: 'analyst-l1',
      name: 'Analityk L1',
      icon: '👁️',
      description: 'Pierwsza linia obrony — monitoring alertów 24/7, triage, eskalacja.',
      detail: 'Analityk L1 to "oczy" SOC pracujące na zmiany. Monitoruje dashboard SIEM, triaguje alerty (fałszywy alarm vs. prawdziwe zagrożenie), dokumentuje i eskaluje do L2. Praca wymaga koncentracji i szybkiego podejmowania decyzji. L1 to zazwyczaj pierwsza praca w cyberbezpieczeństwie — dobre miejsce na start kariery w SOC.'
    },
    {
      id: 'analyst-l2',
      name: 'Analityk L2',
      icon: '🔬',
      description: 'Głęboka analiza incydentów — forensics, korelacja, kontekst zagrożenia.',
      detail: 'Analityk L2 przejmuje eskalacje od L1 i prowadzi głębszą analizę: koreluje zdarzenia z różnych źródeł, zbiera dowody (forensics), ocenia zakres incydentu i rekomenduje działania naprawcze. Posiada zaawansowaną wiedzę o metodach ataków, narzędziach i systemach organizacji. Może używać threat intelligence do kontekstualizacji zagrożeń.'
    },
    {
      id: 'analyst-l3',
      name: 'Analityk L3 / Threat Hunter',
      icon: '🕵️',
      description: 'Threat hunting, zaawansowany IR, reverse engineering złośliwego oprogramowania.',
      detail: 'L3 to najwyższy poziom analityczny SOC. Prowadzi proaktywne threat hunting — szuka śladów ataków zanim SIEM wygeneruje alert. Specjalizuje się w zaawansowanym reagowaniu na incydenty, analizie złośliwego oprogramowania (malware analysis), forensics i analizie APT. Często uczestniczy w testach penetracyjnych i TLPT jako member blue team.'
    },
    {
      id: 'soc-manager',
      name: 'Manager SOC',
      icon: '📊',
      description: 'Zarządzanie zespołem, KPI, raportowanie do CISO, kontakty z regulatorami.',
      detail: 'Manager SOC odpowiada za całościowe funkcjonowanie centrum: zarządzanie zespołem analityków, tworzenie harmonogramów dyżurów, definiowanie i śledzenie KPI (MTTD, MTTR), raportowanie do CISO, kontakty z zewnętrznymi podmiotami (CSIRT, organy regulacyjne). Odpowiada za ciągłość operacji i dojrzałość procesów SOC.'
    },
  ],
  processes: [
    {
      id: 'playbooks',
      name: 'Playbooki IR',
      icon: '📖',
      description: 'Udokumentowane procedury krok po kroku dla każdego typu incydentu.',
      detail: 'Playbook to szczegółowy scenariusz postępowania dla konkretnego typu incydentu: ransomware, phishing, DDoS, kradzież konta, wyciek danych. Definiuje: kto co robi, jakie narzędzia używa, jak eskaluje, co dokumentuje, kiedy angażuje zewnętrzne podmioty. Playbooki skracają czas reakcji i zapobiegają chaosowi w stresującej sytuacji incydentu.'
    },
    {
      id: 'incident-response',
      name: 'Incident Response (IR)',
      icon: '🚨',
      description: 'Ustrukturyzowany proces reagowania na incydenty — od wykrycia do wniosków.',
      detail: 'IR to kompleksowy proces: Przygotowanie → Wykrycie → Analiza → Powstrzymanie → Usunięcie → Odtworzenie → Wnioski. Każda faza ma zdefiniowane działania i kryteria przejścia. Kluczowy element: dokumentacja każdego kroku (chain of custody) dla celów prawnych i regulacyjnych. DORA wymaga zgłoszenia poważnych incydentów do KNF w 4h/24h.'
    },
    {
      id: 'threat-intel',
      name: 'Threat Intelligence',
      icon: '🧠',
      description: 'Wiedza o aktualnych zagrożeniach, aktorach i technikach ataków.',
      detail: 'Threat Intelligence to zbieranie, analiza i operacjonalizacja wiedzy o zagrożeniach: IoC (wskaźniki kompromitacji — IP, domeny, hashe plików), TTPs (taktyki, techniki i procedury atakujących wg MITRE ATT&CK), profile grup APT. TI zasilana jest przez SIEM i EDR, umożliwiając proaktywne blokowanie znanych zagrożeń i ukierunkowując threat hunting.'
    },
    {
      id: 'vuln-management',
      name: 'Zarządzanie podatnościami',
      icon: '🔧',
      description: 'Ciągły cykl: skaner → priorytetyzacja → patch → weryfikacja.',
      detail: 'Zarządzanie podatnościami to ustrukturyzowany proces: regularne skanowanie infrastruktury (np. Tenable, Qualys), priorytetyzacja wyników (CVSS + ekspozycja biznesowa), planowanie i wdrożenie poprawek (patching), weryfikacja naprawy. Celem jest systematyczne zamykanie luk zanim wykorzystają je atakujący. NIS2/DORA wymagają udokumentowanego procesu zarządzania podatnościami.'
    },
  ],
  technology: [
    {
      id: 'siem-soc',
      name: 'SIEM',
      icon: '🖥️',
      description: 'Centralna platforma zbierania logów i wykrywania zagrożeń — mózg SOC.',
      detail: 'SIEM (Security Information and Event Management) zbiera logi ze wszystkich źródeł, normalizuje je, koreluje i generuje alerty. Analitycy SOC pracują na dashboard SIEM. Wymaga strojenia reguł korelacji — zbyt czułe generuje zbyt dużo alertów (alert fatigue), zbyt luźne przegapi zagrożenia. Przykłady: Splunk, Microsoft Sentinel, IBM QRadar.'
    },
    {
      id: 'soar-soc',
      name: 'SOAR',
      icon: '⚡',
      description: 'Automatyzacja powtarzalnych zadań reagowania — SOAR działa za analityka.',
      detail: 'SOAR (Security Orchestration, Automation and Response) integruje narzędzia bezpieczeństwa i automatyzuje workflows. Gdy SIEM wykryje phishing, SOAR może automatycznie: zablokować nadawcę, poddać kwarantannie e-mail, sprawdzić IP w threat intel, stworzyć ticket i powiadomić analityka. Redukuje MTTR (Mean Time to Respond) i alert fatigue.'
    },
    {
      id: 'edr-soc',
      name: 'EDR/XDR',
      icon: '🛡️',
      description: 'Ochrona i monitoring urządzeń końcowych — wykrywa zagrożenia na stacjach roboczych.',
      detail: 'EDR (Endpoint Detection and Response) monitoruje stacje robocze i serwery w czasie rzeczywistym, wykrywa złośliwe zachowania (nie tylko sygnatury), umożliwia izolację urządzenia i forensics zdalnie. XDR (Extended DR) rozszerza widoczność na sieć, chmurę i pocztę. EDR/XDR zastąpił klasyczny antywirus jako standard ochrony endpointów.'
    },
  ],
};

// ── Modele SOC ──────────────────────────────────────────────────────────────

export const SOC_MODELS = [
  {
    id: 'inhouse',
    name: 'SOC wewnętrzny (In-house)',
    icon: '🏢',
    pros: [
      'Pełna kontrola nad danymi i operacjami',
      'Głęboka znajomość własnej infrastruktury',
      'Natychmiastowe reagowanie bez SLA',
      'Budowanie wewnętrznych kompetencji',
      'Lepsza integracja z procesami biznesowymi'
    ],
    cons: [
      'Bardzo wysokie koszty (ludzie, narzędzia, infrastruktura)',
      'Trudność rekrutacji i retencji specjalistów',
      'Wypalenie zawodowe analityków (alarm fatigue, praca zmianowa)',
      'Trudność utrzymania operacji 24/7/365',
      'Ryzyko "silosów" — brak perspektywy zewnętrznej'
    ],
    bestFor: 'Duże organizacje z krytyczną infrastrukturą, sektorze regulowanym (banki, energetyka, obronność), z wysokimi wymaganiami suwerenności danych i budżetem na cyberbezpieczeństwo.',
    relatedConcept: 'SOC in-house wymaga lat budowania — nie można go uruchomić z dnia na dzień.'
  },
  {
    id: 'mssp',
    name: 'MSSP / Outsourcing (MDR)',
    icon: '🤝',
    pros: [
      'Niższy próg wejścia — szybkie uruchomienie',
      'Dostęp do specjalistów i narzędzi klasy enterprise',
      'Monitoring 24/7 bez budowania własnego zespołu',
      'Skalowanie zgodnie z potrzebami',
      'Znajomość zagrożeń z wielu klientów (threat intel)'
    ],
    cons: [
      'Mniejsza kontrola nad operacjami',
      'Dane organizacji przetwarzane przez zewnętrzny podmiot',
      'Uzależnienie od dostawcy (vendor lock-in)',
      'SLA może być niewystarczające dla krytycznych systemów',
      'Mniejsza znajomość specyfiki organizacji'
    ],
    bestFor: 'MŚP i organizacje bez możliwości zbudowania własnego SOC, organizacje potrzebujące szybkiego uruchomienia monitoringu, organizacje z ograniczonym budżetem na cyberbezpieczeństwo.',
    relatedConcept: 'MSSP musi mieć prawo dostępu do danych organizacji — kwestie RODO i NIS2 wymagają starannych umów.'
  },
  {
    id: 'hybrid',
    name: 'Model hybrydowy',
    icon: '⚖️',
    pros: [
      'Elastyczność — własny zespół dla krytycznych operacji',
      'Outsourcing 24/7 monitoringu — MSSP obsługuje nocne zmiany',
      'Kontrola nad kluczowymi danymi przy redukcji kosztów',
      'Stopniowe budowanie wewnętrznych kompetencji',
      'Najlepsze z obu podejść'
    ],
    cons: [
      'Złożoność zarządzania — dwa zespoły, dwa zestawy narzędzi',
      'Konieczność integracji procesów wewnętrznych z MSSP',
      'Ryzyko "szarej strefy" odpowiedzialności',
      'Wyższe koszty niż czyste MSSP'
    ],
    bestFor: 'Organizacje w fazie dojrzewania SOC, duże MŚP i średnie przedsiębiorstwa chcące budować kompetencje, organizacje z wymaganiami suwerenności danych dla wybranych systemów.',
    relatedConcept: 'Model hybrydowy to często punkt przejściowy — organizacja stopniowo przejmuje więcej funkcji in-house.'
  },
];

// ── Fazy Incident Response ──────────────────────────────────────────────────

export const IR_PHASES = [
  {
    id: 'preparation',
    name: 'Przygotowanie',
    icon: '📋',
    description: 'Budowanie gotowości do reagowania: playbooki, narzędzia, szkolenia, ćwiczenia, retainer z firmą IR, kontakty z CSIRT.',
    detail: 'Najważniejsza faza — wszystko co dzieje się przed incydentem. Obejmuje: opracowanie i testowanie playbooków, szkolenie analityków, ćwiczenia tabletop (symulacje incydentów z zarządem), konfigurację narzędzi IR (EDR, forensics), podpisanie retainera z firmą IR (zewnętrzni eksperci na wypadek poważnego ataku), zebranie kontaktów do CSIRT i organów regulacyjnych.',
    regulatoryLink: 'NIS2/KSC: wymagane udokumentowane procesy zarządzania incydentami. DORA: wymagane testowanie planów reagowania.'
  },
  {
    id: 'detection',
    name: 'Wykrycie i zgłoszenie',
    icon: '🔍',
    description: 'Identyfikacja potencjalnego incydentu przez SIEM, EDR, użytkownika lub zewnętrzne zgłoszenie.',
    detail: 'Incydent może być wykryty przez: alert SIEM/EDR, zgłoszenie pracownika, kontakt z CSIRT, artykuł w mediach, komunikat dostawcy. Kluczowy jest czas wykrycia (MTTD — Mean Time to Detect). Po wykryciu następuje wstępna ocena: czy to prawdziwy incydent czy false positive? Im szybciej wykrycie, tym mniejsze szkody — typowy czas od kompromitacji do wykrycia to nadal tygodnie/miesiące dla APT.',
    regulatoryLink: 'NIS2/KSC: wczesne ostrzeżenie do CSIRT w 24h od wykrycia poważnego incydentu. DORA: powiadomienie regulatora w 4h.'
  },
  {
    id: 'analysis',
    name: 'Analiza',
    icon: '🔬',
    description: 'Głęboka analiza: zakres, wektor ataku, dotknięte systemy, typ zagrożenia, priorytetyzacja.',
    detail: 'Analityk L2/L3 prowadzi szczegółowe dochodzenie: identyfikacja wektora wejścia (jak się dostali?), mapowanie zakresu (ile systemów dotkniętych?), identyfikacja danych/systemów naruszonych, ocena powagi incydentu. Kluczowe pytania: czy atakujący wciąż ma dostęp? Czy eksfiltracja danych miała miejsce? Analiza wspierana przez threat intelligence i frameworki MITRE ATT&CK.',
    regulatoryLink: 'Dokumentacja analizy jest wymagana dla raportu końcowego do CSIRT (termin 30 dni). Ważna dla ewentualnych postępowań prawnych.'
  },
  {
    id: 'containment',
    name: 'Powstrzymanie (Containment)',
    icon: '🚧',
    description: 'Ograniczenie zasięgu incydentu — izolacja zainfekowanych systemów, blokowanie ataków.',
    detail: 'Celem jest zatrzymanie rozprzestrzeniania się ataku bez całkowitego wyłączenia systemów (jeśli możliwe). Krótkoterminowe containment: izolacja sieci/systemów (EDR: isolate host), zmiana haseł, blokowanie złośliwych IP/domen. Długoterminowe: segmentacja, hardening dostępów. Kluczowe: zachowanie dowodów forensycznych przed izolacją (memory dump, logi). Balans między bezpieczeństwem a ciągłością działania.',
    regulatoryLink: null
  },
  {
    id: 'eradication',
    name: 'Usunięcie zagrożenia (Eradication)',
    icon: '🗑️',
    description: 'Eliminacja źródła zagrożenia: usunięcie złośliwego oprogramowania, backdoorów, skompromitowanych kont.',
    detail: 'Po powstrzymaniu następuje pełne usunięcie zagrożenia: usunięcie malware ze wszystkich systemów, zamknięcie backdoorów, unieważnienie skompromitowanych kont i tokenów, patchowanie podatności wykorzystanych przez atakujących, zmiana haseł (szczególnie kont uprzywilejowanych). Ważne: upewnienie się, że usunięto WSZYSTKIE artefakty ataku — pominięcie jednego oznacza re-infekcję.',
    regulatoryLink: null
  },
  {
    id: 'recovery',
    name: 'Odtworzenie (Recovery)',
    icon: '🔄',
    description: 'Przywrócenie systemów do normalnego działania — z backupów, monitorowanie po odtworzeniu.',
    detail: 'Odtwarzanie systemów po potwierdzeniu usunięcia zagrożenia: przywracanie z backupów (weryfikacja że backup nie jest zainfekowany!), odtwarzanie w izolowanym środowisku → weryfikacja → podłączenie do sieci, wzmocniony monitoring po odtworzeniu (atakujący mogą wracać). Komunikacja do użytkowników i klientów o przywróceniu usług. RTO i RPO definiują oczekiwany czas odtworzenia.',
    regulatoryLink: 'NIS2/KSC i DORA: wymagają planów BCP/DRP i testowania odtwarzania. Raport końcowy do CSIRT po odtworzeniu.'
  },
  {
    id: 'lessons-learned',
    name: 'Wnioski (Lessons Learned)',
    icon: '📚',
    description: 'Analiza post-incydentalna: co poszło nie tak, co zadziałało, jak zapobiec powtórzeniu.',
    detail: 'Spotkanie post-incydentalne (post-mortem, blameless review) z kluczowymi uczestnikami IR: co wykryliśmy i kiedy? co zadziałało dobrze? co nie zadziałało? co zmieniamy w playbookach, narzędziach, procesach? Wyniki przekładają się na: aktualizację playbooków, nowe reguły SIEM, zmiany konfiguracyjne, dodatkowe szkolenia. Lessons learned to inwestycja w przyszłą odporność.',
    regulatoryLink: 'Dokumentacja wniosków wymagana przez NIS2/DORA. Raport końcowy dla CSIRT zawiera działania podjęte i wnioski.'
  },
];

// ── Procesy kluczowe ────────────────────────────────────────────────────────

export const PROCESSES = [
  {
    id: 'incident-response',
    name: 'Incident Response (IR)',
    icon: '🚨',
    description: 'Ustrukturyzowany proces reagowania na incydenty bezpieczeństwa od wykrycia do wniosków.',
    fullDescription: 'IR to kompleksowy, udokumentowany proces zarządzania incydentami bezpieczeństwa. Składa się z 7 faz (patrz IR_PHASES). Dobrze wdrożony IR: skraca czas od wykrycia do opanowania (MTTD, MTTC, MTTR), minimalizuje straty, spełnia wymagania regulacyjne (24h/72h zgłoszenia do CSIRT), dostarcza dowodów dla postępowań prawnych i ubezpieczycieli.',
    regulatoryReq: 'NIS2/KSC: obowiązkowe procesy IR i zgłaszanie incydentów. DORA: IR zdefiniowany jako jeden z 5 filarów, rygorystyczne terminy zgłoszeń.',
    keyMetrics: ['MTTD — Mean Time to Detect', 'MTTC — Mean Time to Contain', 'MTTR — Mean Time to Respond/Recover', 'Liczba incydentów per kwartał', 'Accuracy (false positive ratio)']
  },
  {
    id: 'vulnerability-management',
    name: 'Zarządzanie podatnościami',
    icon: '🔧',
    description: 'Ciągły cykl identyfikacji, priorytetyzacji i eliminacji podatności w infrastrukturze.',
    fullDescription: 'Zarządzanie podatnościami to systematyczny, powtarzalny proces: (1) Skanowanie — regularne skany całej infrastruktury narzędziami jak Tenable Nessus, Qualys, OpenVAS; (2) Priorytetyzacja — nie każda podatność jest równie pilna. Kombinacja CVSS (ocena techniczna) + ekspozycja (czy system jest dostępny z internetu?) + wartość aktywu; (3) Remediation — patch, workaround lub akceptacja z uzasadnieniem; (4) Weryfikacja — potwierdzenie naprawy; (5) Raportowanie — KPI dla zarządu.',
    regulatoryReq: 'NIS2/KSC i DORA: wymagają udokumentowanego zarządzania podatnościami jako element SZBI/zarządzania ryzykiem ICT.',
    keyMetrics: ['Mean Time to Patch (krytyczne vs. wysokie)', 'Liczba otwartych podatności krytycznych', 'Coverage skanowania', 'SLA dotrzymanie (% podatności naprawionych w terminie)']
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence (TI)',
    icon: '🧠',
    description: 'Zbieranie i operacjonalizacja wiedzy o aktualnych zagrożeniach, aktorach i technikach ataków.',
    fullDescription: 'TI dzieli się na: (1) Strategiczną — trend raporty, profile grup APT, dla zarządu/CISO; (2) Taktyczną — informacje o kampaniach ataków dla SOC managera; (3) Operacyjną — IoC (IP, domeny, hashe), TTPs dla analityków; (4) Techniczną — szczegóły techniczne eksploitów dla L3. Źródła TI: OSINT (MITRE ATT&CK, VirusTotal), komercyjne feedy, ISAC (branżowe centra wymiany), CSIRT. TI zasilana jest przez SIEM/SOAR, umożliwiając proaktywne blokowanie i ukierunkowany threat hunting.',
    regulatoryReq: 'DORA: wymiana informacji o zagrożeniach jako jeden z 5 filarów. NIS2: zachęca do uczestnictwa w strukturach wymiany.',
    keyMetrics: ['Liczba nowych IoC wdrożonych', 'True positive rate TI feedów', 'Czas od publikacji TI do wdrożenia blokad', 'Zagrożenia zidentyfikowane proaktywnie (przed alertem SIEM)']
  },
  {
    id: 'bcp-drp',
    name: 'BCP / DRP — Ciągłość działania',
    icon: '🔄',
    description: 'Business Continuity Plan i Disaster Recovery Plan — zapewnienie działania organizacji po poważnych incydentach.',
    fullDescription: 'BCP (Business Continuity Plan) to szerszy plan zapewnienia ciągłości biznesu — określa jak organizacja działa podczas i po poważnych zakłóceniach. DRP (Disaster Recovery Plan) to techniczna część BCP skupiona na odtwarzaniu systemów IT. Kluczowe elementy: BIA (Business Impact Analysis) — które procesy są krytyczne i w jakim czasie muszą być odtworzone, RTO (Recovery Time Objective) — maksymalny akceptowalny czas niedostępności, RPO (Recovery Point Objective) — maksymalna utrata danych (punkt do którego wracamy). Regularne testy DRP są kluczowe — backup który nie był testowany to backup który nie działa.',
    regulatoryReq: 'NIS2/KSC: BCP/DRP jako obowiązkowy element SZBI. DORA: plany ciągłości działania ICT jako element filaru zarządzania ryzykiem. ISO 27001: Annex A kontrole dotyczące ciągłości działania.',
    keyMetrics: ['RTO — Recovery Time Objective', 'RPO — Recovery Point Objective', 'Częstotliwość testów BCP/DRP', 'Wyniki ostatniego testu odtwarzania', 'Pokrycie systemów krytycznych planami DR']
  },
];

// ── Frameworks zarządzania ──────────────────────────────────────────────────

export const GOVERNANCE_FRAMEWORKS = [
  {
    id: 'iso27001',
    name: 'ISO/IEC 27001',
    icon: '📜',
    description: 'Międzynarodowa norma systemu zarządzania bezpieczeństwem informacji (ISMS). Jedyna powszechna certyfikacja SZBI.',
    useCase: 'Organizacje chcące ustrukturyzować zarządzanie bezpieczeństwem i potwierdzić je certyfikatem akceptowanym przez klientów, partnerów i regulatorów. Dobry punkt startowy dla SZBI wymaganego przez NIS2/KSC.',
    relation: 'Wdrożony ISMS według ISO 27001 pokrywa znaczną część wymagań NIS2/KSC. Certyfikacja może być uznana przez organy nadzorcze jako dowód spełnienia wymagań. Uzupełniają ją ISO 27002 (kontrole), 27005 (ryzyko), 27017/27018 (chmura/dane osobowe).',
    strengths: ['Ustrukturyzowany, holistyczny podejście', 'Certyfikacja akceptowana globalnie', 'Ciągłe doskonalenie (PDCA)', 'Mocne zarządzanie ryzykiem']
  },
  {
    id: 'nist-csf',
    name: 'NIST CSF 2.0',
    icon: '🇺🇸',
    description: 'Elastyczny framework NIST z 6 funkcjami: Govern, Identify, Protect, Detect, Respond, Recover.',
    useCase: 'Organizacje szukające elastycznego, nienormatywnego frameworka do zarządzania ryzykiem cyberbezpieczeństwa. Świetny do oceny dojrzałości (maturity assessment), komunikacji z zarządem i planowania roadmapy. Popularny w USA, rosnące zastosowanie globalnie.',
    relation: 'NIST CSF nie wymaga certyfikacji — jest narzędziem do samooceny i poprawy. Funkcje NIST CSF pokrywają się z wymaganiami NIS2/DORA. Można go łączyć z ISO 27001: CSF jako mapa strategiczna, ISO 27001 jako ISMS operacyjny.',
    strengths: ['Elastyczność — brak sztywnych wymagań', 'Jasna komunikacja z zarządem', 'Narzędzie do oceny dojrzałości', 'Darmowy i publicznie dostępny']
  },
  {
    id: 'cis-controls',
    name: 'CIS Controls v8',
    icon: '🎯',
    description: '18 priorytetowych kontroli bezpieczeństwa z konkretną, techniczną implementacją.',
    useCase: 'Organizacje szukające konkretnych, priorytetyzowanych działań technicznych do natychmiastowego wdrożenia. Szczególnie przydatny dla MŚP i organizacji bez dedykowanego CISO — CIS Controls wskazuje "co robić najpierw" by uzyskać największy efekt za mniejsze pieniądze (Implementation Groups).',
    relation: 'CIS Controls uzupełnia ISO 27001 i NIST CSF o konkretną, techniczną implementację. Implementation Groups (IG1/IG2/IG3) dzielą kontrole na poziomy dojrzałości — IG1 to absolutne minimum (Cyber Hygiene). Pokrywają się z wymaganiami SZBI według NIS2/KSC.',
    strengths: ['Konkretne, techniczne działania', 'Priorytetyzacja (IG1/IG2/IG3)', 'Odpowiedni dla MŚP', 'Oparte na realnych zagrożeniach']
  },
];

// ── Quiz — organizacja ──────────────────────────────────────────────────────

export const ORG_QUIZ = [
  {
    question: 'Jaką kluczową różnicę należy pamiętać między rolą CISO a DPO?',
    options: [
      'CISO i DPO to to samo stanowisko — jedna osoba może pełnić obie funkcje bez ograniczeń',
      'CISO odpowiada za całe cyberbezpieczeństwo IT; DPO wyłącznie za ochronę danych osobowych zgodnie z RODO',
      'DPO jest przełożonym CISO — to DPO odpowiada za bezpieczeństwo systemów',
      'CISO jest obowiązkowy, DPO dobrowolny — każda firma może zdecydować czy go powołać'
    ],
    correct: 1,
    explanation: 'CISO i DPO to różne funkcje o różnym zakresie. CISO zarządza całym cyberbezpieczeństwem organizacji. DPO (IOD) to funkcja wymagana przez RODO, zajmująca się wyłącznie ochroną danych osobowych — doradza, monitoruje zgodność z RODO i jest punktem kontaktowym dla UODO. DPO musi być niezależny, co wyklucza łączenie tej roli z funkcją, która tworzy konflikt interesów.'
  },
  {
    question: 'Organizacja dostała alert SIEM o podejrzanym ruchu w środku nocy. Kto jako pierwszy reaguje?',
    options: [
      'CISO — bo to jego odpowiedzialność',
      'Zarząd — bo to oni odpowiadają za bezpieczeństwo',
      'Analityk SOC L1 — triage alertu i eskalacja',
      'DPO — bo może być naruszenie danych'
    ],
    correct: 2,
    explanation: 'Analityk L1 to pierwsza linia reagowania — monitoruje alerty 24/7 i prowadzi wstępny triage. Ocenia czy to false positive czy prawdziwy incydent i eskaluje do L2 jeśli potrzeba. CISO i zarząd angażują się przy poważnych incydentach, nie przy każdym alercie. DPO angażuje się gdy incydent dotyczy danych osobowych i konieczne jest zgłoszenie do UODO.'
  },
  {
    question: 'Małe przedsiębiorstwo (50 pracowników) chce wdrożyć monitoring bezpieczeństwa 24/7 przy ograniczonym budżecie. Jaki model SOC jest najlepszy?',
    options: [
      'SOC wewnętrzny — tylko pełna kontrola daje prawdziwe bezpieczeństwo',
      'Brak SOC — firma jest za mała żeby się tym przejmować',
      'MSSP/MDR — outsourcing do zewnętrznego dostawcy',
      'Jeden pracownik odpowiedzialny za IT i bezpieczeństwo'
    ],
    correct: 2,
    explanation: 'MSSP/MDR to optymalne rozwiązanie dla MŚP: dostęp do specjalistów i narzędzi klasy enterprise za ułamek kosztu własnego SOC, szybkie uruchomienie monitoringu 24/7, skalowanie z potrzebami. SOC wewnętrzny wymaga ogromnych inwestycji (personel, narzędzia, infrastruktura) — poza zasięgiem większości małych firm. Jeden pracownik IT nie zastąpi dedykowanego zespołu bezpieczeństwa.'
  },
  {
    question: 'Która faza Incident Response skupia się na ograniczeniu rozprzestrzeniania ataku bez wyłączania wszystkich systemów?',
    options: [
      'Wykrycie — identyfikujemy incydent',
      'Analiza — badamy zakres',
      'Powstrzymanie (Containment) — izolujemy zainfekowane systemy',
      'Usunięcie (Eradication) — usuwamy złośliwe oprogramowanie'
    ],
    correct: 2,
    explanation: 'Containment (Powstrzymanie) to faza ograniczania zasięgu incydentu: izolacja zainfekowanych sieci/systemów, blokowanie złośliwych adresów IP, zmiana haseł. Cel: zatrzymać rozprzestrzenianie się ataku przy zachowaniu ciągłości działania gdzie to możliwe. Ważne: zachowanie dowodów forensycznych PRZED izolacją. Eradication (Usunięcie) następuje po containment i polega na pełnym wyczyszczeniu zagrożenia.'
  },
  {
    question: 'Co oznacza skrót MTTD w kontekście SOC?',
    options: [
      'Maximum Time to Deploy — czas wdrożenia aktualizacji',
      'Mean Time to Detect — średni czas od kompromitacji do wykrycia incydentu',
      'Minimum Time to Defend — minimalny czas reakcji obronnej',
      'Managed Threat and Triage Dashboard — dashboard SOC'
    ],
    correct: 1,
    explanation: 'MTTD (Mean Time to Detect) to kluczowy wskaźnik SOC — średni czas od momentu kompromitacji do momentu wykrycia incydentu przez SOC. Im niższy MTTD, tym szybciej organizacja reaguje i tym mniejsze szkody wyrządza atak. Inne ważne metryki: MTTC (Mean Time to Contain), MTTR (Mean Time to Respond/Recover). Typowy MTTD dla APT to nadal kilkadziesiąt dni mimo postępów technologicznych.'
  },
];
