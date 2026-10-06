/**
 * ORGANIZACJA - role, SOC, procesy i zarządzanie
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

// ── Role i odpowiedzialności ────────────────────────────────────────────────

export const ROLES = [
  {
    id: 'zarzad',
    name: 'Zarząd / rada nadzorcza',
    responsibility: 'Zatwierdzanie strategii i polityk cyberbezpieczeństwa, nadzór nad programem bezpieczeństwa, zatwierdzanie apetytu na ryzyko, zapewnienie zasobów. NIS2 i DORA wprost nakładają na zarząd odpowiedzialność osobistą za cyberbezpieczeństwo organizacji.',
    reports_to: null,
    keyActions: [
      'Zatwierdza politykę bezpieczeństwa informacji',
      'Określa apetyt na ryzyko cyberbezpieczeństwa',
      'Zapewnia budżet na bezpieczeństwo',
      'Odbiera regularne raporty od CISO',
      'Odpowiada osobiście za naruszenia (NIS2/DORA)'
    ],
    trap: 'Błąd: „To sprawa IT – my nie musimy się tym zajmować”. NIS2 i DORA wprost nakładają odpowiedzialność osobistą na zarząd!'
  },
  {
    id: 'ciso',
    name: 'CISO – Chief Information Security Officer',
    responsibility: 'Zarządzanie całym programem cyberbezpieczeństwa organizacji: strategia bezpieczeństwa, zarządzanie ryzykiem, zgodność z regulacjami (NIS2, DORA, RODO), nadzór nad SOC, polityki i procedury, szkolenia, reagowanie na incydenty. Raportuje do zarządu.',
    reports_to: 'Zarząd / CEO',
    keyActions: [
      'Opracowuje i wdraża strategię cyberbezpieczeństwa',
      'Zarządza programem ryzyka cyberbezpieczeństwa',
      'Nadzoruje SOC i proces reagowania na incydenty',
      'Raportuje zarządowi o stanie bezpieczeństwa',
      'Zapewnia zgodność z NIS2, DORA, RODO'
    ],
    trap: 'Błąd: „CISO = DPO”. To zupełnie różne funkcje! CISO odpowiada za całe bezpieczeństwo informacji i systemów IT, a DPO wyłącznie za ochronę danych osobowych (RODO).'
  },
  {
    id: 'cso-cio-cto',
    name: 'CSO / CIO / CTO',
    responsibility: 'CSO (Chief Security Officer): bezpieczeństwo fizyczne i IT łącznie. CIO (Chief Information Officer): strategia IT i transformacja cyfrowa. CTO (Chief Technology Officer): technologia, infrastruktura, architektura IT. Zależnie od organizacji te role mogą nakładać się na rolę CISO albo być od niej oddzielone.',
    reports_to: 'CEO / Zarząd',
    keyActions: [
      'CIO: strategia IT, cyfryzacja, budżet IT',
      'CTO: architektura techniczna, innowacje technologiczne',
      'CSO: całościowe bezpieczeństwo (fizyczne + cyfrowe)',
      'Współpraca z CISO przy włączaniu bezpieczeństwa do IT'
    ],
    trap: 'W małych organizacjach jedna osoba często łączy role CISO i CIO albo CISO i CTO. W dużych organizacjach rozdzielenie ról pomaga uniknąć konfliktów interesów między „budowaniem systemów” a „ich zabezpieczaniem”.'
  },
  {
    id: 'dpo',
    name: 'DPO – Inspektor Ochrony Danych (IOD)',
    responsibility: 'Nadzorowanie przestrzegania RODO: doradztwo w sprawach ochrony danych osobowych, monitorowanie zgodności z RODO, punkt kontaktowy dla UODO i osób fizycznych, oceny skutków dla ochrony danych (DPIA), szkolenia pracowników z RODO.',
    reports_to: 'Zarząd (niezależna funkcja: DPO nie może otrzymywać poleceń dotyczących wykonywania swoich zadań)',
    keyActions: [
      'Doradza w sprawach ochrony danych osobowych',
      'Monitoruje zgodność z RODO',
      'Jest punktem kontaktowym dla UODO',
      'Prowadzi i opiniuje oceny skutków (DPIA)',
      'Szkoli pracowników z RODO'
    ],
    trap: 'DPO ≠ CISO, to różne funkcje! DPO zajmuje się wyłącznie ochroną danych osobowych (RODO), a CISO całym cyberbezpieczeństwem. DPO musi być niezależny i nie może łączyć tej roli z funkcją, która tworzy konflikt interesów (np. administrator IT przetwarzający dane).'
  },
  {
    id: 'analitycy',
    name: 'Analitycy SOC / specjaliści ds. bezpieczeństwa',
    responsibility: 'Operacyjne wykonanie zadań bezpieczeństwa: monitoring alertów (L1/L2/L3), reagowanie na incydenty, zarządzanie podatnościami, pentesty, threat hunting, zarządzanie narzędziami bezpieczeństwa (SIEM, EDR), opracowywanie i aktualizacja playbooków.',
    reports_to: 'CISO / Manager SOC',
    keyActions: [
      'L1: triage alertów SIEM – selekcja i eskalacja',
      'L2: analiza incydentów, dochodzenia',
      'L3: threat hunting, forensics, reagowanie na zaawansowane zagrożenia',
      'Utrzymanie i tuning narzędzi bezpieczeństwa',
      'Aktualizacja playbooków i dokumentacji'
    ],
    trap: 'Wypalenie zawodowe (analyst burnout): zbyt dużo alertów, praca zmianowa, presja. Niedobór specjalistów SOC to problem globalny. SOAR i automatyzacja częściowo zmniejszają obciążenie.'
  },
];

// ── Komponenty SOC ──────────────────────────────────────────────────────────

export const SOC_COMPONENTS = {
  people: [
    {
      id: 'analyst-l1',
      name: 'Analityk L1',
      description: 'Pierwsza linia obrony: monitoring alertów 24/7, triage, eskalacja.',
      detail: 'Analityk L1 to „oczy” SOC pracujące na zmiany. Monitoruje dashboard SIEM, triaguje alerty (fałszywy alarm vs. prawdziwe zagrożenie), dokumentuje i eskaluje do L2. Praca wymaga koncentracji i szybkiego podejmowania decyzji. L1 to zwykle pierwsza praca w cyberbezpieczeństwie i dobre miejsce na start kariery w SOC.'
    },
    {
      id: 'analyst-l2',
      name: 'Analityk L2',
      description: 'Pogłębiona analiza incydentów: forensics, korelacja, kontekst zagrożenia.',
      detail: 'Analityk L2 przejmuje eskalacje od L1 i prowadzi głębszą analizę: koreluje zdarzenia z różnych źródeł, zbiera dowody (forensics), ocenia zakres incydentu i rekomenduje działania naprawcze. Ma zaawansowaną wiedzę o metodach ataków, narzędziach i systemach organizacji. Może korzystać z threat intelligence, żeby osadzić zagrożenie w kontekście.'
    },
    {
      id: 'analyst-l3',
      name: 'Analityk L3 / Threat Hunter',
      description: 'Threat hunting, zaawansowany IR, reverse engineering złośliwego oprogramowania.',
      detail: 'L3 to najwyższy poziom analityczny SOC. Prowadzi proaktywny threat hunting: szuka śladów ataków, zanim SIEM wygeneruje alert. Specjalizuje się w zaawansowanym reagowaniu na incydenty, analizie złośliwego oprogramowania (malware analysis), forensics i analizie APT. Często uczestniczy w testach penetracyjnych i TLPT jako członek blue teamu.'
    },
    {
      id: 'soc-manager',
      name: 'Manager SOC',
      description: 'Zarządzanie zespołem, KPI, raportowanie do CISO, kontakty z regulatorami.',
      detail: 'Manager SOC odpowiada za działanie całego centrum: zarządza zespołem analityków, układa harmonogramy dyżurów, definiuje i śledzi KPI (MTTD, MTTR), raportuje do CISO i utrzymuje kontakty z podmiotami zewnętrznymi (CSIRT, organy regulacyjne). Odpowiada też za ciągłość operacji i dojrzałość procesów SOC.'
    },
  ],
  processes: [
    {
      id: 'playbooks',
      name: 'Playbooki IR',
      description: 'Udokumentowane procedury krok po kroku dla każdego typu incydentu.',
      detail: 'Playbook to szczegółowy scenariusz postępowania dla konkretnego typu incydentu: ransomware, phishing, DDoS, kradzież konta, wyciek danych. Określa, kto co robi, jakich narzędzi używa, jak eskaluje, co dokumentuje i kiedy angażuje podmioty zewnętrzne. Playbooki skracają czas reakcji i zapobiegają chaosowi pod presją incydentu.'
    },
    {
      id: 'incident-response',
      name: 'Incident Response (IR)',
      description: 'Uporządkowany proces reagowania na incydenty, od wykrycia do wniosków.',
      detail: 'Proces IR przebiega w fazach: Przygotowanie → Wykrycie → Analiza → Powstrzymanie → Usunięcie → Odtworzenie → Wnioski. Każda faza ma zdefiniowane działania i kryteria przejścia. Każdy krok trzeba dokumentować (chain of custody) na potrzeby prawne i regulacyjne. DORA wymaga zgłoszenia poważnych incydentów do KNF w 4h/24h.'
    },
    {
      id: 'threat-intel',
      name: 'Threat Intelligence',
      description: 'Wiedza o aktualnych zagrożeniach, aktorach i technikach ataków.',
      detail: 'Threat Intelligence to zbieranie, analiza i praktyczne wykorzystanie wiedzy o zagrożeniach: IoC (wskaźniki kompromitacji: IP, domeny, hashe plików), TTPs (taktyki, techniki i procedury atakujących wg MITRE ATT&CK), profile grup APT. TI zasila SIEM i EDR, co pozwala proaktywnie blokować znane zagrożenia i ukierunkować threat hunting.'
    },
    {
      id: 'vuln-management',
      name: 'Zarządzanie podatnościami',
      description: 'Ciągły cykl: skaner → priorytetyzacja → patch → weryfikacja.',
      detail: 'Zarządzanie podatnościami to uporządkowany proces: regularne skanowanie infrastruktury (np. Tenable, Qualys), priorytetyzacja wyników (CVSS + ekspozycja biznesowa), planowanie i wdrożenie poprawek (patching), weryfikacja naprawy. Chodzi o to, by systematycznie zamykać luki, zanim wykorzystają je atakujący. NIS2/DORA wymagają udokumentowanego procesu zarządzania podatnościami.'
    },
  ],
  technology: [
    {
      id: 'siem-soc',
      name: 'SIEM',
      description: 'Centralna platforma zbierania logów i wykrywania zagrożeń, czyli mózg SOC.',
      detail: 'SIEM (Security Information and Event Management) zbiera logi ze wszystkich źródeł, normalizuje je, koreluje i generuje alerty. Analitycy SOC pracują na dashboardzie SIEM. Reguły korelacji trzeba stroić: zbyt czułe generują za dużo alertów (alert fatigue), zbyt luźne przepuszczają zagrożenia. Przykłady: Splunk, Microsoft Sentinel, IBM QRadar.'
    },
    {
      id: 'soar-soc',
      name: 'SOAR',
      description: 'Automatyzacja powtarzalnych zadań reagowania: SOAR wykonuje je za analityka.',
      detail: 'SOAR (Security Orchestration, Automation and Response) integruje narzędzia bezpieczeństwa i automatyzuje przepływy pracy (workflows). Gdy SIEM wykryje phishing, SOAR może automatycznie zablokować nadawcę, poddać e-mail kwarantannie, sprawdzić IP w threat intel, utworzyć ticket i powiadomić analityka. Skraca MTTR (Mean Time to Respond) i zmniejsza alert fatigue.'
    },
    {
      id: 'edr-soc',
      name: 'EDR/XDR',
      description: 'Ochrona i monitoring urządzeń końcowych: wykrywanie zagrożeń na stacjach roboczych.',
      detail: 'EDR (Endpoint Detection and Response) monitoruje stacje robocze i serwery w czasie rzeczywistym, wykrywa złośliwe zachowania (nie tylko sygnatury), pozwala zdalnie izolować urządzenie i prowadzić forensics. XDR (Extended DR) rozszerza widoczność na sieć, chmurę i pocztę. EDR/XDR zastąpił klasyczny antywirus jako standard ochrony endpointów.'
    },
  ],
};

// ── Modele SOC ──────────────────────────────────────────────────────────────

export const SOC_MODELS = [
  {
    id: 'inhouse',
    name: 'SOC wewnętrzny (in-house)',
    pros: [
      'Pełna kontrola nad danymi i operacjami',
      'Dobra znajomość własnej infrastruktury',
      'Natychmiastowe reagowanie bez SLA',
      'Budowanie wewnętrznych kompetencji',
      'Lepsza integracja z procesami biznesowymi'
    ],
    cons: [
      'Bardzo wysokie koszty (ludzie, narzędzia, infrastruktura)',
      'Trudna rekrutacja i utrzymanie specjalistów',
      'Wypalenie zawodowe analityków (alert fatigue, praca zmianowa)',
      'Trudno utrzymać operacje 24/7/365',
      'Ryzyko „silosów”: brak perspektywy zewnętrznej'
    ],
    bestFor: 'Duże organizacje z krytyczną infrastrukturą, z sektora regulowanego (banki, energetyka, obronność), z wysokimi wymaganiami suwerenności danych i budżetem na cyberbezpieczeństwo.',
    relatedConcept: 'Budowa SOC in-house trwa latami, nie da się go uruchomić z dnia na dzień.'
  },
  {
    id: 'mssp',
    name: 'MSSP / Outsourcing (MDR)',
    pros: [
      'Niższy próg wejścia i szybkie uruchomienie',
      'Dostęp do specjalistów i narzędzi klasy enterprise',
      'Monitoring 24/7 bez budowania własnego zespołu',
      'Skalowanie zgodnie z potrzebami',
      'Znajomość zagrożeń z wielu klientów (threat intel)'
    ],
    cons: [
      'Mniejsza kontrola nad operacjami',
      'Dane organizacji przetwarzane przez zewnętrzny podmiot',
      'Uzależnienie od dostawcy (vendor lock-in)',
      'SLA może nie wystarczyć dla krytycznych systemów',
      'Słabsza znajomość specyfiki organizacji'
    ],
    bestFor: 'MŚP i organizacje bez możliwości zbudowania własnego SOC, organizacje, które muszą szybko uruchomić monitoring, organizacje z ograniczonym budżetem na cyberbezpieczeństwo.',
    relatedConcept: 'MSSP musi mieć prawo dostępu do danych organizacji, więc ze względu na RODO i NIS2 umowy trzeba przygotować starannie.'
  },
  {
    id: 'hybrid',
    name: 'Model hybrydowy',
    pros: [
      'Elastyczność: własny zespół dla krytycznych operacji',
      'Outsourcing monitoringu 24/7: MSSP obsługuje nocne zmiany',
      'Kontrola nad najważniejszymi danymi przy niższych kosztach',
      'Stopniowe budowanie wewnętrznych kompetencji',
      'Najlepsze z obu podejść'
    ],
    cons: [
      'Złożone zarządzanie: dwa zespoły, dwa zestawy narzędzi',
      'Konieczność integracji procesów wewnętrznych z MSSP',
      'Ryzyko „szarej strefy” odpowiedzialności',
      'Wyższe koszty niż czyste MSSP'
    ],
    bestFor: 'Organizacje w fazie dojrzewania SOC, duże MŚP i średnie przedsiębiorstwa, które chcą budować kompetencje, organizacje z wymaganiami suwerenności danych dla wybranych systemów.',
    relatedConcept: 'Model hybrydowy to często etap przejściowy: organizacja stopniowo przejmuje więcej funkcji in-house.'
  },
];

// ── Fazy Incident Response ──────────────────────────────────────────────────

export const IR_PHASES = [
  {
    id: 'preparation',
    name: 'Przygotowanie',
    description: 'Budowanie gotowości do reagowania: playbooki, narzędzia, szkolenia, ćwiczenia, retainer z firmą IR, kontakty z CSIRT.',
    detail: 'Najważniejsza faza: wszystko, co dzieje się przed incydentem. Obejmuje opracowanie i testowanie playbooków, szkolenie analityków, ćwiczenia tabletop (symulacje incydentów z zarządem), konfigurację narzędzi IR (EDR, forensics), podpisanie retainera z firmą IR (zewnętrzni eksperci na wypadek poważnego ataku) i zebranie kontaktów do CSIRT i organów regulacyjnych.',
    regulatoryLink: 'NIS2/KSC: wymagane udokumentowane procesy zarządzania incydentami. DORA: wymagane testowanie planów reagowania.'
  },
  {
    id: 'detection',
    name: 'Wykrycie i zgłoszenie',
    description: 'Identyfikacja potencjalnego incydentu przez SIEM, EDR, użytkownika lub zewnętrzne zgłoszenie.',
    detail: 'Incydent może zostać wykryty przez: alert SIEM/EDR, zgłoszenie pracownika, kontakt z CSIRT, artykuł w mediach, komunikat dostawcy. Liczy się czas wykrycia (MTTD – Mean Time to Detect). Po wykryciu następuje wstępna ocena: czy to prawdziwy incydent, czy false positive? Im szybsze wykrycie, tym mniejsze szkody. Przy APT od kompromitacji do wykrycia wciąż mijają zwykle tygodnie lub miesiące.',
    regulatoryLink: 'NIS2/KSC: wczesne ostrzeżenie do CSIRT w 24 h od wykrycia poważnego incydentu. DORA: wstępne powiadomienie KNF w 4 h od uznania incydentu za poważny, najpóźniej 24 h od wykrycia.'
  },
  {
    id: 'analysis',
    name: 'Analiza',
    description: 'Pogłębiona analiza: zakres, wektor ataku, dotknięte systemy, typ zagrożenia, priorytetyzacja.',
    detail: 'Analityk L2/L3 prowadzi szczegółowe dochodzenie: ustala wektor wejścia (jak się dostali?), mapuje zakres (ile systemów dotkniętych?), wskazuje naruszone dane i systemy, ocenia powagę incydentu. Najważniejsze pytania: czy atakujący wciąż ma dostęp? Czy doszło do eksfiltracji danych? Analizę wspierają threat intelligence i framework MITRE ATT&CK.',
    regulatoryLink: 'Dokumentacja analizy jest wymagana w sprawozdaniu końcowym do CSIRT (w ciągu miesiąca od zgłoszenia incydentu). Przydaje się też w ewentualnych postępowaniach prawnych.'
  },
  {
    id: 'containment',
    name: 'Powstrzymanie (Containment)',
    description: 'Ograniczenie zasięgu incydentu: izolacja zainfekowanych systemów, blokowanie ataków.',
    detail: 'Celem jest zatrzymanie rozprzestrzeniania się ataku, w miarę możliwości bez całkowitego wyłączania systemów. Containment krótkoterminowy: izolacja sieci/systemów (EDR: isolate host), zmiana haseł, blokowanie złośliwych IP/domen. Długoterminowy: segmentacja, hardening dostępów. Przed izolacją trzeba zabezpieczyć dowody forensyczne (memory dump, logi). Bezpieczeństwo trzeba tu wyważyć z ciągłością działania.',
    regulatoryLink: null
  },
  {
    id: 'eradication',
    name: 'Usunięcie zagrożenia (Eradication)',
    description: 'Eliminacja źródła zagrożenia: usunięcie złośliwego oprogramowania, backdoorów, skompromitowanych kont.',
    detail: 'Po powstrzymaniu ataku zagrożenie usuwa się w całości: malware ze wszystkich systemów, backdoory, skompromitowane konta i tokeny. Łata się podatności wykorzystane przez atakujących i zmienia hasła (szczególnie kont uprzywilejowanych). Trzeba się upewnić, że usunięto WSZYSTKIE artefakty ataku: pominięcie jednego oznacza ponowną infekcję.',
    regulatoryLink: null
  },
  {
    id: 'recovery',
    name: 'Odtworzenie (Recovery)',
    description: 'Przywrócenie systemów do normalnego działania: odtworzenie z backupów, monitorowanie po odtworzeniu.',
    detail: 'Systemy odtwarza się dopiero po potwierdzeniu, że zagrożenie usunięto: przywracanie z backupów (sprawdź, czy backup nie jest zainfekowany!), odtwarzanie w izolowanym środowisku → weryfikacja → podłączenie do sieci, wzmocniony monitoring po odtworzeniu (atakujący mogą wracać). Użytkownicy i klienci dostają informację o przywróceniu usług. RTO i RPO określają oczekiwany czas odtworzenia.',
    regulatoryLink: 'NIS2/KSC i DORA: wymagają planów BCP/DRP i testowania odtwarzania. Raport końcowy do CSIRT po odtworzeniu.'
  },
  {
    id: 'lessons-learned',
    name: 'Wnioski (Lessons Learned)',
    description: 'Analiza poincydentalna: co poszło nie tak, co zadziałało, jak zapobiec powtórzeniu.',
    detail: 'Spotkanie poincydentalne (post-mortem, blameless review) z głównymi uczestnikami IR: co wykryliśmy i kiedy? co zadziałało dobrze? co nie zadziałało? co zmieniamy w playbookach, narzędziach, procesach? Wyniki przekładają się na aktualizację playbooków, nowe reguły SIEM, zmiany konfiguracji i dodatkowe szkolenia. Lessons learned to inwestycja w przyszłą odporność.',
    regulatoryLink: 'Dokumentacja wniosków wymagana przez NIS2/DORA. Raport końcowy dla CSIRT zawiera podjęte działania i wnioski.'
  },
];

// ── Procesy kluczowe ────────────────────────────────────────────────────────

export const PROCESSES = [
  {
    id: 'incident-response',
    name: 'Incident Response (IR)',
    description: 'Uporządkowany proces reagowania na incydenty bezpieczeństwa od wykrycia do wniosków.',
    fullDescription: 'IR to udokumentowany proces zarządzania incydentami bezpieczeństwa, złożony z 7 faz opisanych w cyklu reagowania na incydenty. Dobrze wdrożony IR skraca czas od wykrycia do opanowania (MTTD, MTTC, MTTR), ogranicza straty, spełnia wymagania regulacyjne (24h/72h zgłoszenia do CSIRT) i dostarcza dowodów do postępowań prawnych i dla ubezpieczycieli.',
    regulatoryReq: 'NIS2/KSC: obowiązkowe procesy IR i zgłaszanie incydentów. DORA: zarządzanie incydentami to jeden z 5 filarów, z rygorystycznymi terminami zgłoszeń.',
    keyMetrics: ['MTTD – Mean Time to Detect', 'MTTC – Mean Time to Contain', 'MTTR – Mean Time to Respond/Recover', 'Liczba incydentów na kwartał', 'Accuracy (false positive ratio)']
  },
  {
    id: 'vulnerability-management',
    name: 'Zarządzanie podatnościami',
    description: 'Ciągły cykl identyfikacji, priorytetyzacji i eliminacji podatności w infrastrukturze.',
    fullDescription: 'Zarządzanie podatnościami to systematyczny, powtarzalny proces: (1) Skanowanie: regularne skany całej infrastruktury narzędziami takimi jak Tenable Nessus, Qualys, OpenVAS; (2) Priorytetyzacja: nie każda podatność jest równie pilna, liczy się połączenie CVSS (ocena techniczna), ekspozycji (czy system jest dostępny z internetu?) i wartości aktywu; (3) Naprawa (remediation): patch, obejście (workaround) lub akceptacja z uzasadnieniem; (4) Weryfikacja: potwierdzenie naprawy; (5) Raportowanie: KPI dla zarządu.',
    regulatoryReq: 'NIS2/KSC i DORA: wymagają udokumentowanego zarządzania podatnościami jako elementu SZBI/zarządzania ryzykiem ICT.',
    keyMetrics: ['Mean Time to Patch (krytyczne vs. wysokie)', 'Liczba otwartych podatności krytycznych', 'Pokrycie skanowaniem (coverage)', 'Dotrzymanie SLA (% podatności naprawionych w terminie)']
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence (TI)',
    description: 'Zbieranie i praktyczne wykorzystanie wiedzy o aktualnych zagrożeniach, aktorach i technikach ataków.',
    fullDescription: 'TI dzieli się na: (1) strategiczną: raporty o trendach, profile grup APT, dla zarządu/CISO; (2) taktyczną: informacje o kampaniach ataków dla managera SOC; (3) operacyjną: IoC (IP, domeny, hashe), TTPs dla analityków; (4) techniczną: szczegóły techniczne eksploitów dla L3. Źródła TI: OSINT (MITRE ATT&CK, VirusTotal), komercyjne feedy, ISAC (branżowe centra wymiany), CSIRT. TI zasila SIEM/SOAR, co pozwala proaktywnie blokować zagrożenia i ukierunkować threat hunting.',
    regulatoryReq: 'DORA: wymiana informacji o zagrożeniach to jeden z 5 filarów. NIS2: zachęca do udziału w strukturach wymiany.',
    keyMetrics: ['Liczba nowych IoC wdrożonych', 'True positive rate TI feedów', 'Czas od publikacji TI do wdrożenia blokad', 'Zagrożenia zidentyfikowane proaktywnie (przed alertem SIEM)']
  },
  {
    id: 'bcp-drp',
    name: 'BCP / DRP – ciągłość działania',
    description: 'Business Continuity Plan i Disaster Recovery Plan: jak utrzymać działanie organizacji po poważnych incydentach.',
    fullDescription: 'BCP (Business Continuity Plan) to szerszy plan ciągłości działania: określa, jak organizacja funkcjonuje w trakcie poważnych zakłóceń i po nich. DRP (Disaster Recovery Plan) to techniczna część BCP, skupiona na odtwarzaniu systemów IT. Najważniejsze elementy: BIA (Business Impact Analysis), czyli które procesy są krytyczne i w jakim czasie trzeba je odtworzyć; RTO (Recovery Time Objective), czyli maksymalny akceptowalny czas niedostępności; RPO (Recovery Point Objective), czyli maksymalna utrata danych (punkt, do którego wracamy). DRP trzeba regularnie testować: nieprzetestowany backup należy traktować jak niedziałający.',
    regulatoryReq: 'NIS2/KSC: BCP/DRP jako obowiązkowy element SZBI. DORA: plany ciągłości działania ICT jako element filaru zarządzania ryzykiem. ISO 27001: kontrole z załącznika A dotyczące ciągłości działania.',
    keyMetrics: ['RTO – Recovery Time Objective', 'RPO – Recovery Point Objective', 'Częstotliwość testów BCP/DRP', 'Wyniki ostatniego testu odtwarzania', 'Pokrycie systemów krytycznych planami DR']
  },
];

// ── Frameworks zarządzania ──────────────────────────────────────────────────

export const GOVERNANCE_FRAMEWORKS = [
  {
    id: 'iso27001',
    name: 'ISO/IEC 27001',
    description: 'Międzynarodowa norma systemu zarządzania bezpieczeństwem informacji (ISMS). Jedyna powszechna certyfikacja SZBI.',
    useCase: 'Dla organizacji, które chcą uporządkować zarządzanie bezpieczeństwem i potwierdzić je certyfikatem akceptowanym przez klientów, partnerów i regulatorów. Dobry punkt startowy dla SZBI wymaganego przez NIS2/KSC.',
    relation: 'Wdrożony ISMS według ISO 27001 pokrywa znaczną część wymagań NIS2/KSC. Organy nadzorcze mogą uznać certyfikację za dowód spełnienia wymagań. Normę uzupełniają ISO 27002 (kontrole), 27005 (ryzyko), 27017/27018 (chmura/dane osobowe).',
    strengths: ['Uporządkowane, całościowe podejście', 'Certyfikacja akceptowana globalnie', 'Ciągłe doskonalenie (PDCA)', 'Mocne zarządzanie ryzykiem']
  },
  {
    id: 'nist-csf',
    name: 'NIST CSF 2.0',
    description: 'Elastyczny framework NIST z 6 funkcjami: Govern, Identify, Protect, Detect, Respond, Recover.',
    useCase: 'Dla organizacji, które szukają elastycznego, nienormatywnego frameworka do zarządzania ryzykiem cyberbezpieczeństwa. Dobrze sprawdza się w ocenie dojrzałości (maturity assessment), komunikacji z zarządem i planowaniu roadmapy. Popularny w USA, coraz częściej stosowany na świecie.',
    relation: 'NIST CSF nie wymaga certyfikacji: to narzędzie do samooceny i poprawy. Funkcje NIST CSF pokrywają się z wymaganiami NIS2/DORA. Można go łączyć z ISO 27001: CSF jako mapa strategiczna, ISO 27001 jako ISMS operacyjny.',
    strengths: ['Elastyczność: brak sztywnych wymagań', 'Jasna komunikacja z zarządem', 'Narzędzie do oceny dojrzałości', 'Darmowy i publicznie dostępny']
  },
  {
    id: 'cis-controls',
    name: 'CIS Controls v8',
    description: '18 priorytetowych kontroli bezpieczeństwa z konkretną, techniczną implementacją.',
    useCase: 'Dla organizacji, które szukają konkretnych, uszeregowanych według priorytetu działań technicznych do natychmiastowego wdrożenia. Szczególnie przydatny dla MŚP i organizacji bez osobnego CISO: CIS Controls wskazuje, „co robić najpierw”, żeby uzyskać największy efekt mniejszym kosztem (Implementation Groups).',
    relation: 'CIS Controls uzupełnia ISO 27001 i NIST CSF o konkretną, techniczną implementację. Implementation Groups (IG1/IG2/IG3) dzielą kontrole na poziomy dojrzałości; IG1 to absolutne minimum (Cyber Hygiene). Kontrole pokrywają się z wymaganiami SZBI według NIS2/KSC.',
    strengths: ['Konkretne, techniczne działania', 'Priorytetyzacja (IG1/IG2/IG3)', 'Odpowiedni dla MŚP', 'Oparte na realnych zagrożeniach']
  },
];
