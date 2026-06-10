/**
 * THREATS - karty zagrożeń cyberbezpieczeństwa (flip cards)
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

export const THREATS = [
  {
    id: 'ransomware',
    name: 'Ransomware',
    icon: '🔒',
    front: 'Złośliwe oprogramowanie szyfrujące dane i żądające okupu za ich odblokowanie.',
    entryPoint: 'Phishing e-mail z załącznikiem lub linkiem, podatność w oprogramowaniu (np. nieaktualne VPN/RDP), słabe hasło do RDP, złośliwy plik pobrany z internetu.',
    effect: 'Zaszyfrowanie wszystkich danych na urządzeniu i w udziałach sieciowych - systemy przestają działać. Nowoczesny ransomware stosuje podwójne wymuszenie: najpierw wykrada dane (exfiltracja), potem szyfruje i grozi ich opublikowaniem jeśli okup nie zostanie zapłacony.',
    cia: 'Dostępność (A) - systemy niedostępne; Poufność (C) - dane wykradzione przed szyfrowaniem.',
    defense: 'Backup 3-2-1 (offline/immutable), EDR z wykrywaniem behawioralnym, MFA na wszystkich kontach, segmentacja sieci, aktualizacje oprogramowania, szkolenia antyphishingowe.',
    example: 'Atak ransomware na szpital: systemy medyczne niedostępne przez tydzień, brak dostępu do historii chorób pacjentów, groźba ujawnienia danych 50 000 pacjentów. Koszt odtworzenia: kilka milionów złotych.'
  },
  {
    id: 'phishing',
    name: 'Phishing / Inżynieria społeczna',
    icon: '🎣',
    front: 'Manipulacja ludźmi w celu wyłudzenia danych dostępowych lub wykonania złośliwej akcji.',
    entryPoint: 'Fałszywy e-mail udający bank/szefa/IT, SMS (smishing), telefon (vishing), fałszywa strona logowania, spreparowany link lub załącznik.',
    effect: 'Wykradzenie haseł i danych logowania, przejęcie kont (Account Takeover), instalacja złośliwego oprogramowania, autoryzacja fałszywego przelewu (Business Email Compromise - BEC). Phishing jest wektorem wejścia dla ok. 90% ataków ransomware.',
    cia: 'Poufność (C) - wykradzione dane logowania; Integralność (I) - nieautoryzowane transakcje; Dostępność (A) - przejęte konta blokują dostęp prawowitemu użytkownikowi.',
    defense: 'MFA (eliminuje 99% ataków na hasła), szkolenia pracowników z rozpoznawania phishingu, filtrowanie poczty (SPF, DKIM, DMARC), symulacje phishingu, weryfikacja tożsamości dla przelewów.',
    example: 'CEO fraud (BEC): pracownik działu finansowego otrzymał e-mail „od prezesa” z pilną prośbą o przelew 2 mln PLN na nowe konto. E-mail wyglądał autentycznie - domena różniła się jedną literą. Przelew wykonano zanim ktoś zadzwonił do prezesa.'
  },
  {
    id: 'supply-chain',
    name: 'Atak na łańcuch dostaw',
    icon: '🔗',
    front: 'Kompromitacja organizacji poprzez zainfekowanie oprogramowania lub infrastruktury zaufanego dostawcy.',
    entryPoint: 'Zainfekowana aktualizacja oprogramowania (SolarWinds, 3CX), skompromitowany kod biblioteki open source (Log4Shell, XZ Utils), zainfekowany sprzęt lub firmware, dostęp dostawcy IT do sieci klienta.',
    effect: 'Jeden zainfekowany dostawca może skompromitować tysiące klientów jednocześnie. Atakujący zyskują zaufany, podpisany cyfrowo wektor wejścia, który omija tradycyjne zabezpieczenia. Jeden z najtrudniejszych rodzajów ataków do wykrycia i ochrony przed nim.',
    cia: 'Poufność (C) - eksfiltracja danych przez ukryte backdoory; Integralność (I) - zmodyfikowane oprogramowanie; Dostępność (A) - możliwość dezaktywacji systemów.',
    defense: 'Zarządzanie ryzykiem dostawców (wymagane przez NIS2 i DORA), weryfikacja integralności oprogramowania (podpisy cyfrowe, SBOM), segmentacja dostępów dla dostawców, monitoring zachowania oprogramowania po aktualizacjach.',
    example: 'SolarWinds Orion (2020): zainfekowana aktualizacja platformy monitoringu IT trafiła do 18 000 organizacji, w tym do agencji rządowych USA i firm Fortune 500. Atakujący mieli dostęp przez 9 miesięcy zanim atak wykryto.'
  },
  {
    id: 'ddos',
    name: 'Atak DDoS',
    icon: '🌊',
    front: 'Atak rozproszonej odmowy usługi - zalanie systemów ruchem uniemożliwiające ich działanie.',
    entryPoint: 'Botnet (tysiące zainfekowanych urządzeń IoT lub komputerów), amplifikacja DNS/NTP, atak wolumetryczny lub na aplikację (warstwa 7). Często zlecany jako usługa (DDoS-for-hire).',
    effect: 'Niedostępność serwisów internetowych, API, systemów transakcyjnych. Może być zasłoną dymną dla właściwego ataku (włamanie podczas gdy zespół IT skupiony jest na DDoS). Bezpośrednie straty: utracone przychody, kary za SLA, utrata reputacji.',
    cia: 'Dostępność (A) - główne zagrożenie; systemy niedostępne dla legalnych użytkowników.',
    defense: 'CDN z ochroną DDoS (Cloudflare, Akamai), scrubbing centers, rate limiting, anycast routing, plany reakcji na DDoS, monitoring ruchu i automatyczne przełączanie.',
    example: 'Atak DDoS na polskie banki i instytucje rządowe (2022-2024): fale ataków grupy NoName057(16) powodowały kilku-kilkunastominutowe przerwy w działaniu serwisów bankowych i stron rządowych. Ataki zsynchronizowane z wydarzeniami geopolitycznymi.'
  },
  {
    id: 'insider',
    name: 'Zagrożenie wewnętrzne (Insider Threat)',
    icon: '👤',
    front: 'Zagrożenie ze strony obecnych lub byłych pracowników, kontrahentów lub partnerów mających legalny dostęp.',
    entryPoint: 'Pracownik z dostępem do systemów - działający złośliwie (świadoma kradzież/sabotaż) lub nieświadomie (błąd, brak wiedzy) lub zmuszony (szantaż, socjotechnika zewnętrzna).',
    effect: 'Kradzież wrażliwych danych (własność intelektualna, dane klientów), sabotaż systemów, celowe wycieki, sprzedaż danych konkurencji lub obcym służbom. Zagrożenia wewnętrzne są najtrudniejsze do wykrycia – osoba ma legalny dostęp i zna procedury bezpieczeństwa.',
    cia: 'Poufność (C) - wykradzione dane; Integralność (I) - sabotaż, modyfikacja danych; Dostępność (A) - celowe usunięcie danych lub awaria systemów.',
    defense: 'Zasada minimalnych uprawnień (least privilege), PAM z nagrywaniem sesji, DLP, monitoring anomalii zachowania (UEBA), separacja obowiązków (4-eye principle), offboarding procedury (natychmiastowe odcinanie dostępów), kultura zgłaszania incydentów.',
    example: 'Administrator IT odchodzący z banku w złych relacjach skopiował 500 000 rekordów klientów na prywatny dysk USB. Wykryto to dopiero po 3 miesiącach dzięki analizie logów DLP. Sprawa skończyła się wyrokiem sądowym i karą dla banku od UODO.'
  },
  {
    id: 'apt',
    name: 'APT - Zaawansowane Trwałe Zagrożenie',
    icon: '🕵️',
    front: 'Długotrwały, ukryty atak celowany - często sponsorowany przez państwo lub zorganizowaną przestępczość.',
    entryPoint: 'Spear-phishing (precyzyjnie celowany phishing), eksploitacja podatności zero-day, skompromitowany dostawca (supply chain), insider, fizyczny dostęp do infrastruktury.',
    effect: 'Atakujący przez miesiące lub lata pozostaje ukryty w sieci ofiary: eksfiltruje dane wywiadowcze lub handlowe, instaluje backdoory dla przyszłego użytku, może sabotować infrastrukturę krytyczną w zaplanowanym momencie. Trudny do wykrycia bo unika głośnych działań.',
    cia: 'Poufność (C) - długotrwała eksfiltracja danych; Integralność (I) - możliwa modyfikacja danych; Dostępność (A) - możliwy sabotaż jako finalny akt.',
    defense: 'Threat intelligence, XDR/NDR do wykrywania ruchu lateralnego, segmentacja sieci (microsegmentacja), Zero Trust, regularne threat hunting, TLPT, monitorowanie anomalii długoterminowych.',
    example: 'Atak APT29 (Cozy Bear) na systemy rządowe: przez ponad 6 miesięcy atakujący mieli dostęp do skrzynek e-mail urzędników wysokiego szczebla. Przeczytali tysiące maili zanim zostali wykryci dzięki alertowi SIEM na anomalię w ruchu nocnym.'
  },
];
