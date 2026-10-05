/**
 * REGULACJE - przepisy, normy i ramy cyberbezpieczeństwa
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

// ── Główne regulacje ────────────────────────────────────────────────────────

export const REGULATIONS = [
  {
    id: 'nis2',
    name: 'NIS2 / Ustawa o KSC',
    type: 'dyrektywa',
    scope: 'Szeroka gospodarka: energia, transport, bankowość, infrastruktura rynków finansowych, ochrona zdrowia, wodociągi, infrastruktura cyfrowa, zarządzanie ICT, administracja publiczna, przestrzeń kosmiczna, produkcja, poczta, gospodarka odpadami, chemia, żywność, usługi cyfrowe.',
    topic: 'Ogólna odporność cyfrowa organizacji: zarządzanie ryzykiem, ciągłość działania, bezpieczeństwo łańcucha dostaw.',
    legalForm: 'Dyrektywa UE 2022/2555 → implementacja przez krajowe ustawy. W Polsce: Ustawa o KSC (nowelizacja KSC 2.0, wejście w życie 3.04.2026).',
    description: 'NIS2 to najważniejsza regulacja cyberbezpieczeństwa w UE dla organizacji spoza sektora finansowego. Mocno rozszerza pierwotną dyrektywę NIS (2016): obejmuje nowe sektory, rozszerza kategorie podmiotów (kluczowe i ważne) i zaostrza wymagania. Polska wdraża ją przez nowelizację ustawy o Krajowym Systemie Cyberbezpieczeństwa.',
    keyFacts: [
      'Podmioty kluczowe: sektory energii, transportu, bankowości, zdrowia, wody, infrastruktury cyfrowej – powyżej 250 pracowników lub 50 mln EUR obrotu',
      'Podmioty ważne: dodatkowe sektory (produkcja, poczta, chemia) – powyżej 50 pracowników lub 10 mln EUR obrotu; MSSP i rejestry domen od 10 osób / 2 mln EUR',
      'Obowiązki: wdrożenie SZBI, szacowanie ryzyka co najmniej raz na 2 lata, zarządzanie incydentami, BCP, bezpieczeństwo łańcucha dostaw, szkolenia zarządu',
      'Zgłaszanie incydentów: wczesne ostrzeżenie do CSIRT w 24h, pełne zgłoszenie w 72h, raport końcowy w 30 dni (poważne incydenty)',
      'Odpowiedzialność zarządu: zarząd zatwierdza środki zarządzania ryzykiem i odpowiada osobiście',
      'Kary: podmioty kluczowe do 10 mln EUR lub 2% światowego obrotu; ważne do 7 mln EUR lub 1,4% obrotu',
      'Polska oś czasu: KSC 2.0 wchodzi w życie 3.04.2026, rejestracja podmiotów do 3.10.2026, wdrożenie SZBI do 3.04.2027, audyt do 3.04.2028'
    ],
    color: '#4F46E5'
  },
  {
    id: 'dora',
    name: 'DORA',
    type: 'rozporządzenie',
    scope: 'Wyłącznie sektor finansowy UE: banki, ubezpieczyciele, firmy inwestycyjne, instytucje płatnicze, fundusze emerytalne, giełdy kryptowalut, a także ich kluczowi dostawcy ICT (w tym dostawcy chmury).',
    topic: 'Operacyjna odporność cyfrowa instytucji finansowych: jednolite wymagania bezpieczeństwa ICT w całym sektorze.',
    legalForm: 'Rozporządzenie UE 2022/2554 – działa bezpośrednio, bez implementacji krajowej. Stosowane od 17 stycznia 2025 roku.',
    description: 'DORA to lex specialis dla sektora finansowego: jest bardziej szczegółowe i surowsze niż NIS2. Jako rozporządzenie (a nie dyrektywa) działa wprost we wszystkich krajach UE, bez implementacji krajowej. Obejmuje ok. 22 000 podmiotów finansowych i ich kluczowych dostawców ICT.',
    keyFacts: [
      'Obowiązuje od 17 stycznia 2025 roku, bez okresu przejściowego',
      'Dotyczy też dostawców ICT: kluczowi dostawcy (np. chmury dla banków) podlegają nadzorowi ESA',
      'Filar 1: Zarządzanie ryzykiem ICT – polityki, procedury, ład zarządczy, aktualizacje i szyfrowanie',
      'Filar 2: Zarządzanie incydentami – klasyfikacja, zgłaszanie do KNF/EBA w 4h (poważny) i 24h (aktualizacja)',
      'Filar 3: Testowanie odporności – TLPT co 3 lata dla największych instytucji (standard TIBER-EU)',
      'Filar 4: Ryzyko dostawców ICT – rejestr umów, ocena koncentracji, plany wyjścia, klauzule umowne',
      'Filar 5: Wymiana informacji – udział w strukturach wymiany informacji o zagrożeniach',
      'Kary: do 1% dziennego globalnego obrotu przez maks. 6 miesięcy; zarząd do 1 mln EUR'
    ],
    color: '#0891B2'
  },
  {
    id: 'rodo',
    name: 'RODO / GDPR',
    type: 'rozporządzenie',
    scope: 'Wszystkie organizacje przetwarzające dane osobowe mieszkańców UE, niezależnie od branży, wielkości i siedziby firmy. W praktyce niemal każda organizacja.',
    topic: 'Ochrona danych osobowych: prawa osób fizycznych i obowiązki administratorów danych.',
    legalForm: 'Rozporządzenie UE 2016/679 – stosowane bezpośrednio od 25 maja 2018. Uzupełnione krajową ustawą o ochronie danych osobowych.',
    description: 'RODO (General Data Protection Regulation) to fundament ochrony prywatności w UE. Nakłada też obowiązki techniczne związane z cyberbezpieczeństwem: pseudonimizację, szyfrowanie, testowanie zabezpieczeń, plany reagowania na naruszenia. Działa niezależnie od NIS2, więc organizacja może podlegać obu jednocześnie.',
    keyFacts: [
      'Zasady: celowość, minimalizacja danych, ograniczenie przechowywania, prawidłowość, integralność i poufność',
      'Podstawy prawne przetwarzania: zgoda, umowa, obowiązek prawny, żywotne interesy, interes publiczny, uzasadniony interes',
      'Prawa osób: dostęp, sprostowanie, usunięcie („prawo do bycia zapomnianym”), przenoszalność, sprzeciw',
      'Privacy by design i privacy by default – ochrona prywatności wbudowana w projekt od początku',
      'DPO (IOD) obowiązkowy dla organów publicznych oraz podmiotów, które przetwarzają dane masowo lub przetwarzają szczególne kategorie danych',
      'Naruszenia: zgłoszenie do UODO w 72h, powiadomienie osób, gdy ryzyko jest wysokie',
      'Kary: do 20 mln EUR lub 4% globalnego obrotu (wyższa kwota)',
      'Organ nadzorczy w Polsce: UODO (Urząd Ochrony Danych Osobowych)'
    ],
    color: '#059669'
  },
  {
    id: 'iso27001',
    name: 'ISO/IEC 27001',
    type: 'norma',
    scope: 'Dobrowolna, dla organizacji z każdej branży i każdej wielkości. Certyfikacja jest popularna w IT, finansach, administracji i ochronie zdrowia.',
    topic: 'System Zarządzania Bezpieczeństwem Informacji (ISMS), czyli całościowe ramy zarządzania bezpieczeństwem.',
    legalForm: 'Norma międzynarodowa ISO/IEC 27001:2022. Nieobowiązkowa, ale wielu klientów i partnerów wymaga certyfikacji. Punkt odniesienia dla SZBI wymaganego przez NIS2.',
    description: 'ISO/IEC 27001 to jedyna powszechnie uznawana certyfikacja systemu zarządzania bezpieczeństwem informacji. Wymaga udokumentowanego ISMS, zarządzania ryzykiem, wdrożenia kontroli z Załącznika A (93 kontrole w wersji 2022) i regularnych audytów zewnętrznych. Certyfikację często akceptuje się jako dowód spełnienia wymagań NIS2/KSC.',
    keyFacts: [
      'ISO/IEC 27001:2022 to aktualna wersja normy; Załącznik A (Annex A) zawiera 93 kontrole w 4 obszarach',
      'Oparta na cyklu PDCA: Plan (zaplanuj) → Do (wdróż) → Check (sprawdź) → Act (popraw)',
      'Wymagania: kontekst organizacji, przywództwo, planowanie (ryzyko i szanse), wsparcie, operacje, ocena wyników, doskonalenie',
      'Certyfikacja: audyt przez akredytowaną jednostkę (np. Bureau Veritas, TÜV, DNV), recertyfikacja co 3 lata',
      'Uzupełnienie: ISO/IEC 27002 (dobre praktyki), 27005 (zarządzanie ryzykiem), 27017 (chmura), 27018 (dane osobowe)',
      'Relacja z NIS2: wdrożony i certyfikowany ISMS może zostać uznany za spełnienie znacznej części wymagań NIS2/KSC',
      'Koszty certyfikacji zależą od wielkości organizacji; dla MŚP zaczynają się od kilkudziesięciu tysięcy PLN'
    ],
    color: '#D97706'
  },
];

// ── Oś czasu regulacyjna ────────────────────────────────────────────────────

export const TIMELINE_EVENTS = [
  {
    date: '2016-07-06',
    label: 'Dyrektywa NIS (pierwsza)',
    description: 'Pierwsza europejska dyrektywa o bezpieczeństwie sieci i systemów informacyjnych. Obejmowała ograniczony zakres sektorów i podmiotów.',
    regulation: 'nis2',
    important: false
  },
  {
    date: '2018-05-25',
    label: 'RODO zaczyna obowiązywać',
    description: 'Rozporządzenie RODO (GDPR) zaczyna być w pełni stosowane w całej UE. Wszystkie organizacje przetwarzające dane osobowe mieszkańców UE muszą spełniać jego wymagania.',
    regulation: 'rodo',
    important: true
  },
  {
    date: '2023-01-16',
    label: 'DORA wchodzi w życie',
    description: 'Rozporządzenie DORA (Rozporządzenie UE 2022/2554) wchodzi w życie. Sektor finansowy ma 2 lata na przygotowanie się do pełnego stosowania.',
    regulation: 'dora',
    important: true
  },
  {
    date: '2024-10-17',
    label: 'Termin implementacji NIS2',
    description: 'Do tego dnia kraje UE miały wdrożyć dyrektywę NIS2 do prawa krajowego. Polska (jak wiele innych krajów) nie dotrzymała terminu: nowelizacja KSC była wtedy jeszcze w toku.',
    regulation: 'nis2',
    important: true
  },
  {
    date: '2025-01-17',
    label: 'DORA – pełne stosowanie',
    description: 'DORA w pełni obowiązuje sektor finansowy UE. Instytucje finansowe i ich dostawcy ICT muszą spełniać wszystkie wymogi: zarządzanie ryzykiem ICT, incydenty, TLPT, dostawcy.',
    regulation: 'dora',
    important: true
  },
  {
    date: '2026-04-03',
    label: 'KSC 2.0 wchodzi w życie',
    description: 'Polska ustawa o KSC 2.0 (implementacja NIS2) wchodzi w życie. Od tego dnia podmioty kluczowe i ważne podlegają nowym obowiązkom i rejestrują się w rejestrze operatorów.',
    regulation: 'nis2',
    important: true
  },
  {
    date: '2026-10-03',
    label: 'KSC – termin rejestracji',
    description: 'Podmioty objęte KSC muszą się zarejestrować w rejestrze operatorów usług kluczowych. Termin: 6 miesięcy po wejściu w życie ustawy (3.04.2026 + 6 miesięcy).',
    regulation: 'nis2',
    important: true
  },
  {
    date: '2027-04-03',
    label: 'KSC – wdrożenie SZBI',
    description: 'Termin wdrożenia pełnego Systemu Zarządzania Bezpieczeństwem Informacji (SZBI) przez podmioty objęte KSC. 12 miesięcy od wejścia w życie ustawy.',
    regulation: 'nis2',
    important: true
  },
  {
    date: '2028-04-03',
    label: 'KSC – pierwszy audyt',
    description: 'Termin pierwszego obowiązkowego audytu bezpieczeństwa dla podmiotów kluczowych i ważnych. 24 miesiące od wejścia w życie ustawy. Audyt musi przeprowadzić akredytowany audytor.',
    regulation: 'nis2',
    important: false
  },
];

// ── Filary DORA ─────────────────────────────────────────────────────────────

export const DORA_PILLARS = [
  {
    id: 'risk-management',
    name: 'Zarządzanie ryzykiem ICT',
    icon: '⚙️',
    description: 'Ład zarządczy i ramy zarządzania ryzykiem ICT – polityki, procedury, odpowiedzialność zarządu.',
    detail: 'Instytucja musi wdrożyć pełne ramy zarządzania ryzykiem ICT: identyfikację i klasyfikację zasobów ICT, ciągłą ocenę ryzyka, polityki bezpieczeństwa, plany ochrony i odtwarzania. Zarząd bezpośrednio odpowiada za zatwierdzenie tych ram i nadzór nad nimi. Zarząd i pracownicy muszą też regularnie przechodzić szkolenia z bezpieczeństwa ICT.'
  },
  {
    id: 'incident-management',
    name: 'Zarządzanie incydentami ICT',
    icon: '🚨',
    description: 'Klasyfikacja, zarządzanie i zgłaszanie incydentów ICT do regulatorów finansowych.',
    detail: 'Instytucje muszą wdrożyć procesy zarządzania incydentami ICT: wykrywanie, klasyfikację (poważne vs. inne), eskalację i zgłaszanie. Poważne incydenty zgłasza się do właściwego organu nadzoru (w Polsce KNF): wczesne ostrzeżenie w 4h, aktualizacja w 24h, raport końcowy w 30 dni. DORA przewiduje też dobrowolne zgłaszanie cyberzagrożeń, które nie spowodowały jeszcze incydentu.'
  },
  {
    id: 'testing',
    name: 'Testowanie odporności operacyjnej',
    icon: '🔬',
    description: 'Regularne testowanie systemów ICT: od podstawowych testów po zaawansowane TLPT.',
    detail: 'DORA wymaga regularnych testów: podstawowych (podatności, przeglądy kodu, testy aplikacji) od wszystkich instytucji i zaawansowanych TLPT (Threat-Led Penetration Testing) co 3 lata od największych. TLPT bazuje na standardzie TIBER-EU i angażuje zewnętrznych testerów (red team), którzy działają jak prawdziwi napastnicy. Wyniki TLPT trafiają do regulatora i mogą być współdzielone między instytucjami.'
  },
  {
    id: 'third-party',
    name: 'Ryzyko dostawców ICT',
    icon: '🔗',
    description: 'Zarządzanie ryzykiem zewnętrznych dostawców ICT, szczególnie dostawców chmury.',
    detail: 'Instytucje muszą prowadzić rejestr umów z dostawcami ICT, regularnie oceniać ryzyko koncentracji (zbyt duże uzależnienie od jednego dostawcy), negocjować wymagane klauzule umowne (prawo do audytu, SLA, plany wyjścia) i przygotować plany wyjścia. Plan wyjścia to procedura zakończenia korzystania z dostawcy ICT i przeniesienia usługi do innego dostawcy albo do rozwiązania wewnętrznego bez zakłócenia działania funkcji krytycznych lub ważnych. Nie jest to plan awaryjny na wypadek incydentu, lecz z góry przygotowana ścieżka migracji na wypadek, gdyby dostawca przestał spełniać wymagania lub zakończył działalność. Kluczowi dostawcy ICT (np. wielkie firmy chmurowe obsługujące wiele banków) podlegają bezpośredniemu nadzorowi ESA (EBA, ESMA, EIOPA).'
  },
  {
    id: 'information-sharing',
    name: 'Wymiana informacji o zagrożeniach',
    icon: '🤝',
    description: 'Udział w strukturach wymiany informacji o cyberzagrożeniach między instytucjami finansowymi.',
    detail: 'DORA zachęca instytucje do udziału w ustaleniach dotyczących wymiany informacji o zagrożeniach cybernetycznych (CTI). Wymiana informacji o wskaźnikach kompromitacji (IoC), technikach atakujących (TTPs) i podatnościach wzmacnia odporność całego sektora finansowego. Udział jest dobrowolny, ale DORA tworzy ramy prawne, które zapewniają bezpieczeństwo i poufność tej wymiany.'
  },
];

// ── Obowiązki NIS2/KSC ──────────────────────────────────────────────────────

export const OBLIGATIONS_NIS2 = [
  {
    id: 'risk-management',
    name: 'Zarządzanie ryzykiem cyberbezpieczeństwa',
    icon: '⚠️',
    description: 'Wdrożenie SZBI i systematyczne szacowanie ryzyka co najmniej raz na 2 lata.',
    detail: 'Podmiot musi wdrożyć System Zarządzania Bezpieczeństwem Informacji (SZBI) obejmujący: identyfikację aktywów, szacowanie ryzyka, wdrożenie kontroli (polityki bezpieczeństwa, zarządzanie dostępem, kryptografia, bezpieczeństwo fizyczne, BCP/DRP, bezpieczeństwo łańcucha dostaw). Punktem odniesienia jest zwykle ISO/IEC 27001. Zarząd zatwierdza SZBI i odpowiada za jego skuteczność.'
  },
  {
    id: 'incident-handling',
    name: 'Obsługa incydentów i zgłaszanie',
    icon: '🚨',
    description: 'Procesy wykrywania, zarządzania i zgłaszania poważnych incydentów do CSIRT.',
    detail: 'Podmiot musi wdrożyć procesy zarządzania incydentami i zgłaszać poważne incydenty do właściwego CSIRT: wczesne ostrzeżenie w 24h od powzięcia wiedzy, pełne zgłoszenie w 72h, raport końcowy w 30 dni. „Poważny incydent” to taki, który zakłóca lub może zakłócić świadczenie usług. KSC definiuje kryteria klasyfikacji. Za niezgłoszenie grożą kary administracyjne.'
  },
  {
    id: 'supply-chain',
    name: 'Bezpieczeństwo łańcucha dostaw',
    icon: '🔗',
    description: 'Ocena i zarządzanie ryzykiem cyberbezpieczeństwa dostawców i podwykonawców.',
    detail: 'Podmiot musi oceniać ryzyko cyberbezpieczeństwa w łańcuchu dostaw i nim zarządzać: wskazać najważniejszych dostawców ICT, oceniać ich poziom bezpieczeństwa, wpisywać wymogi bezpieczeństwa do umów i sprawdzać, czy dostawcy je spełniają. NIS2 wprost wskazuje atak SolarWinds jako przykład zagrożenia, któremu ta regulacja ma zapobiegać. Wymagany jest rejestr dostawców z oceną ryzyka.'
  },
  {
    id: 'governance',
    name: 'Odpowiedzialność i nadzór zarządu',
    icon: '👔',
    description: 'Zarząd zatwierdza środki zarządzania ryzykiem, szkoli się i odpowiada osobiście.',
    detail: 'NIS2 przełamuje zasadę, że cyberbezpieczeństwo to „sprawa IT”. Zarząd musi: zatwierdzać środki zarządzania ryzykiem cyberbezpieczeństwa, regularnie szkolić się z cyberbezpieczeństwa, monitorować realizację polityk bezpieczeństwa. Członkowie zarządu mogą odpowiadać osobiście za naruszenia. Ten mechanizm ma wymusić faktyczne zaangażowanie kadry kierowniczej zamiast przerzucania tematu na CISO.'
  },
];

// ── Funkcje NIST CSF 2.0 ────────────────────────────────────────────────────

export const NIST_FUNCTIONS = [
  {
    id: 'govern',
    name: 'Govern (Zarządzaj)',
    color: '#7C3AED',
    shortColor: '#EDE9FE',
    description: 'Nowa funkcja w CSF 2.0: strategia, polityki, role i odpowiedzialność na poziomie organizacji.',
    detail: 'Govern odpowiada na pytanie: jak cyberbezpieczeństwo jest wbudowane w strategię organizacji? Obejmuje: określenie tolerancji ryzyka, polityki cyberbezpieczeństwa, role i odpowiedzialności (CISO, zarząd, operacje), zarządzanie ryzykiem dostawców, integrację z zarządzaniem ryzykiem przedsiębiorstwa (ERM).',
    examples: [
      'Polityka bezpieczeństwa informacji zatwierdzona przez zarząd',
      'Określony apetyt na ryzyko cyberbezpieczeństwa',
      'CISO z dostępem do zarządu',
      'Program zarządzania ryzykiem dostawców',
      'Regularne raportowanie cyberbezpieczeństwa do zarządu'
    ]
  },
  {
    id: 'identify',
    name: 'Identify (Identyfikuj)',
    color: '#1D4ED8',
    shortColor: '#DBEAFE',
    description: 'Zrozumienie kontekstu organizacji: co mamy, co jest krytyczne, jakie ryzyka nam grożą.',
    detail: 'Identify odpowiada na pytanie: co mamy do ochrony? Obejmuje: inwentaryzację zasobów (hardware, software, dane, ludzie, dostawcy), ocenę ryzyka, analizę środowiska biznesowego, określenie wymagań regulacyjnych i priorytetów. Bez dobrego „Identify” nie można skutecznie chronić.',
    examples: [
      'Rejestr aktywów IT (hardware i software)',
      'Mapa danych – gdzie są dane krytyczne i osobowe',
      'Ocena ryzyka cyberbezpieczeństwa',
      'Klasyfikacja danych (publiczne/wewnętrzne/poufne/tajne)',
      'Inwentaryzacja dostawców i zależności'
    ]
  },
  {
    id: 'protect',
    name: 'Protect (Chroń)',
    color: '#047857',
    shortColor: '#D1FAE5',
    description: 'Wdrożenie zabezpieczeń ograniczających ryzyko: kontrola dostępu, szkolenia, kryptografia.',
    detail: 'Protect to wdrażanie środków ochronnych: zarządzanie tożsamością i dostępem (IAM/MFA/PAM), szkolenia i świadomość bezpieczeństwa, ochrona danych (szyfrowanie, DLP), bezpieczeństwo sieci (NGFW, segmentacja), zarządzanie podatnościami (aktualizacje), bezpieczeństwo fizyczne.',
    examples: [
      'MFA na wszystkich kontach',
      'Szyfrowanie dysków i transmisji',
      'Regularne szkolenia pracowników',
      'Zasada minimalnych uprawnień',
      'Zarządzanie podatnościami (zarządzanie poprawkami)',
      'Firewall i segmentacja sieci'
    ]
  },
  {
    id: 'detect',
    name: 'Detect (Wykrywaj)',
    color: '#B45309',
    shortColor: '#FEF3C7',
    description: 'Ciągły monitoring i wykrywanie incydentów: SIEM, EDR, NDR, monitoring anomalii.',
    detail: 'Detect odpowiada na pytanie: jak szybko wykryjemy atak? Obejmuje: monitoring ciągły (SIEM, EDR, NDR), wykrywanie anomalii, logi i audyt, threat intelligence, testy wykrywania (purple team). Im krótszy time-to-detect, tym mniejsze szkody wyrządza atak.',
    examples: [
      'SIEM z korelacją zdarzeń 24/7',
      'EDR na stacjach roboczych i serwerach',
      'Monitoring ruchu sieciowego (NDR)',
      'Alerty na anomalie zachowania (UEBA)',
      'Threat intelligence feeds',
      'SOC lub MSSP'
    ]
  },
  {
    id: 'respond',
    name: 'Respond (Reaguj)',
    color: '#DC2626',
    shortColor: '#FEE2E2',
    description: 'Reagowanie na wykryte incydenty: playbooki, komunikacja, powstrzymanie i usunięcie.',
    detail: 'Respond to procesy reagowania na incydenty: playbooki IR (co robić krok po kroku), komunikacja (wewnętrzna i zewnętrzna: regulatorzy, klienci, media), powstrzymanie (containment, czyli izolacja zainfekowanych systemów), usunięcie zagrożenia (eradication). SOAR automatyzuje powtarzalne kroki reagowania.',
    examples: [
      'Playbooki IR dla różnych typów incydentów',
      'Procedura zgłaszania incydentów do CSIRT/KNF',
      'Retainer z firmą IR na wypadek ataku',
      'Ćwiczenia tabletop i symulacje incydentów',
      'SOAR do automatyzacji reagowania',
      'Procedura komunikacji kryzysowej'
    ]
  },
  {
    id: 'recover',
    name: 'Recover (Odtwarzaj)',
    color: '#7C3AED',
    shortColor: '#F3E8FF',
    description: 'Odtwarzanie systemów po incydencie i wyciąganie wniosków: BCP, DRP, lessons learned.',
    detail: 'Recover odpowiada na pytanie: jak szybko wrócimy do normalnego działania? Obejmuje: plany odtwarzania (DRP/BCP), testy backupów, odtwarzanie systemów z kopii zapasowych, komunikację o przywróceniu usług, analizę poincydentalną (lessons learned) i wdrożenie wniosków. Dobrze przygotowane odtwarzanie skraca czas niedostępności i zapobiega powtórzeniu incydentu.',
    examples: [
      'Backup 3-2-1 z regularnymi testami odtwarzania',
      'DRP z RTO i RPO dla każdego systemu krytycznego',
      'Ćwiczenia odtwarzania (disaster recovery drill)',
      'Procedura analizy poincydentalnej',
      'Komunikacja do klientów o przywróceniu usług',
      'Rejestr wniosków i plan poprawy'
    ]
  },
];

// ── Quiz - regulacje ────────────────────────────────────────────────────────

export const REGULATION_QUIZ = [
  {
    question: 'Organizacja z sektora energetycznego ma 300 pracowników. Jakie regulacje cyberbezpieczeństwa jej dotyczą?',
    options: [
      'Tylko RODO, bo przetwarza dane pracowników',
      'NIS2/KSC i RODO, bo sektor energetyczny jest objęty NIS2 jako podmiot kluczowy',
      'Tylko ISO 27001, bo to norma dla dużych organizacji',
      'Żadne, bo regulacje dotyczą tylko banków i administracji'
    ],
    correct: 1,
    explanation: 'Dyrektywa NIS2 wymienia energetykę jako sektor kluczowy. Organizacja z 300 pracownikami przekracza próg podmiotów kluczowych (250 os. / 50 mln EUR). RODO dotyczy jej niezależnie od tego, bo przetwarza dane osobowe pracowników i klientów. ISO 27001 jest dobrowolna, ale certyfikacja może potwierdzać spełnienie wymagań KSC.'
  },
  {
    question: 'DORA obowiązuje od 17 stycznia 2025. Kogo dotyczy ta regulacja?',
    options: [
      'Wszystkich firm prowadzących działalność w Polsce',
      'Tylko dużych korporacji powyżej 1000 pracowników',
      'Instytucji finansowych UE i ich kluczowych dostawców ICT',
      'Wyłącznie banków objętych nadzorem EBC'
    ],
    correct: 2,
    explanation: 'DORA to lex specialis dla sektora finansowego: obejmuje banki, ubezpieczycieli, firmy inwestycyjne, instytucje płatnicze, giełdy kryptowalut i inne. Nowością jest objęcie regulacją dostawców ICT obsługujących sektor finansowy (w tym dostawców chmury). DORA nie ma progu wielkości, więc dotyczy nawet małych instytucji finansowych.'
  },
  {
    question: 'Firma odkryła, że baza danych klientów wyciekła. RODO nakazuje zgłoszenie naruszenia do UODO w ciągu:',
    options: [
      '24 godzin od wykrycia',
      '48 godzin od wykrycia',
      '72 godzin od powzięcia wiedzy o naruszeniu',
      '7 dni roboczych od wykrycia'
    ],
    correct: 2,
    explanation: 'Art. 33 RODO nakłada obowiązek zgłoszenia naruszenia ochrony danych osobowych organowi nadzorczemu (w Polsce UODO) „bez zbędnej zwłoki – w miarę możliwości, nie później niż w terminie 72 godzin po stwierdzeniu naruszenia”. Jeśli zgłoszenie następuje po 72h, trzeba dołączyć wyjaśnienie opóźnienia. Gdy naruszenie grozi wysokim ryzykiem dla osób, trzeba też powiadomić same osoby.'
  },
  {
    question: 'Co odróżnia DORA od NIS2 pod względem formy prawnej i skutku?',
    options: [
      'DORA to dyrektywa – wymaga implementacji; NIS2 to rozporządzenie – działa wprost',
      'DORA to rozporządzenie – działa wprost w całej UE; NIS2 to dyrektywa – wymaga implementacji krajowej',
      'Obie są dyrektywami – obie wymagają implementacji krajowej',
      'Obie są rozporządzeniami – obie działają wprost bez implementacji'
    ],
    correct: 1,
    explanation: 'DORA jest rozporządzeniem UE (2022/2554), więc ma bezpośredni skutek prawny we wszystkich krajach UE bez implementacji. NIS2 jest dyrektywą (2022/2555): wyznacza cele, ale każdy kraj musi ją wdrożyć do prawa krajowego. Polska wdraża NIS2 przez nowelizację ustawy o KSC.'
  },
  {
    question: 'Który termin na osi czasu KSC 2.0 dotyczy wdrożenia pełnego SZBI?',
    options: [
      '3 kwietnia 2026 – wejście w życie ustawy',
      '3 października 2026 – rejestracja podmiotów',
      '3 kwietnia 2027 – 12 miesięcy od wejścia w życie',
      '3 kwietnia 2028 – termin pierwszego audytu'
    ],
    correct: 2,
    explanation: 'KSC 2.0 wchodzi w życie 3 kwietnia 2026. Objęte nią podmioty mają 6 miesięcy na rejestrację (do 3.10.2026), 12 miesięcy na wdrożenie SZBI (do 3.04.2027) i 24 miesiące na przeprowadzenie pierwszego audytu (do 3.04.2028). Obowiązki wchodzą stopniowo, żeby organizacje zdążyły się przygotować, a ten czas trzeba wykorzystać na wdrożenie.'
  },
  {
    question: 'NIST CSF 2.0 dodał nową funkcję w porównaniu z wersją 1.1. Która to?',
    options: [
      'Detect (Wykrywaj) – bo wcześniej nie było monitoringu',
      'Govern (Zarządzaj) – strategia i governance na poziomie organizacji',
      'Respond (Reaguj) – reagowanie na incydenty',
      'Recover (Odtwarzaj) – odtwarzanie po incydencie'
    ],
    correct: 1,
    explanation: 'NIST CSF 2.0 (luty 2024) dodał szóstą funkcję: Govern (Zarządzaj). Poprzednia wersja 1.1 miała 5 funkcji: Identify, Protect, Detect, Respond, Recover. Govern dotyczy całej organizacji: strategii, polityk, ról, odpowiedzialności i zarządzania ryzykiem na poziomie zarządu. To odpowiedź na rosnące wymagania regulacyjne (NIS2, DORA) dotyczące zaangażowania zarządu w cyberbezpieczeństwo.'
  },
];
