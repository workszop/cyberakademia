/**
 * FUNDAMENTY - triada CIA, odpowiedzi na ryzyko i scenariusze
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

// ── Triada CIA ──────────────────────────────────────────────────────────────

export const CIA_TRIAD = {
  C: {
    id: 'C',
    name: 'Confidentiality',
    namePL: 'Poufność',
    icon: '🔐',
    color: '#4F46E5',
    description: 'Dostęp do danych mają tylko uprawnieni.',
    violationExample: 'Naruszenie = wyciek danych. Haker wykradł bazę klientów. Pracownik wysłał poufny dokument na prywatny e-mail.',
    controls: ['Szyfrowanie danych (w spoczynku i w tranzycie)', 'Kontrola dostępu (IAM, PAM)', 'MFA', 'DLP', 'Klasyfikacja danych'],
    questions: ['Kto może czytać te dane?', 'Czy dane są zaszyfrowane?', 'Czy dostęp jest logowany?']
  },
  I: {
    id: 'I',
    name: 'Integrity',
    namePL: 'Integralność',
    icon: '✅',
    color: '#059669',
    description: 'Dane nie zostały niepostrzeżenie zmienione.',
    violationExample: 'Naruszenie = sfałszowany przelew, podmieniona faktura. Atakujący zmienił numer konta bankowego w systemie finansowym.',
    controls: ['Podpisy cyfrowe i sumy kontrolne', 'Kontrola wersji i logi zmian', 'Separacja obowiązków', 'Backupy do weryfikacji', 'SIEM do wykrywania zmian'],
    questions: ['Czy ktoś mógł zmienić te dane?', 'Czy zmiany są logowane?', 'Jak weryfikujemy autentyczność?']
  },
  A: {
    id: 'A',
    name: 'Availability',
    namePL: 'Dostępność',
    icon: '⚡',
    color: '#D97706',
    description: 'System działa, kiedy jest potrzebny.',
    violationExample: 'Naruszenie = ransomware, który blokuje firmę, albo atak DDoS. Szpital niedostępny przez tydzień po zaszyfrowaniu serwerów.',
    controls: ['Redundancja systemów (HA)', 'Backup 3-2-1 z testami odtwarzania', 'DRP i BCP', 'Ochrona DDoS (CDN)', 'Monitoring dostępności'],
    questions: ['Co się stanie gdy system padnie?', 'Jak szybko możemy go odtworzyć?', 'Czy backup działa?']
  },
};

// ── Odpowiedzi na ryzyko ────────────────────────────────────────────────────

export const RISK_RESPONSES = [
  {
    id: 'obniżać',
    name: 'Obniżaj ryzyko (Mitigate)',
    icon: '🛡️',
    color: '#4F46E5',
    description: 'Wdrożenie kontroli technicznych lub organizacyjnych redukujących prawdopodobieństwo wystąpienia zagrożenia lub jego skutki. Ryzyko pozostaje, ale na akceptowalnym poziomie.',
    whenToUse: 'Gdy ryzyko jest powyżej apetytu na ryzyko organizacji, ale można je zredukować do akceptowalnego poziomu przez kontrole. Najczęstsza i zalecana odpowiedź.',
    examples: ['Wdrożenie MFA redukuje ryzyko przejęcia kont', 'Aktualizacja oprogramowania redukuje ryzyko eksploitacji', 'Szkolenia zmniejszają ryzyko phishingu', 'Backup redukuje skutki ransomware'],
    cost: 'Umiarkowany - inwestycja w kontrole bezpieczeństwa'
  },
  {
    id: 'przenosić',
    name: 'Przenoś ryzyko (Transfer)',
    icon: '🤝',
    color: '#0891B2',
    description: 'Przeniesienie finansowych skutków ryzyka na zewnętrzny podmiot przez ubezpieczenie lub umowy z dostawcami. Ryzyko nadal istnieje, ale skutki finansowe pokrywa ktoś inny.',
    whenToUse: 'Gdy ryzyko ma niskie prawdopodobieństwo ale wysokie skutki finansowe, lub gdy koszt mitygacji przewyższa koszt ubezpieczenia. Ubezpieczenie cybernetyczne staje się standardem.',
    examples: ['Polisa ubezpieczenia cybernetycznego', 'Klauzule SLA i kary umowne dla dostawców', 'Outsourcing odpowiedzialności do MSSP', 'Umowy o odpowiedzialności z dostawcami chmury'],
    cost: 'Koszt składki ubezpieczeniowej lub dodatkowych klauzul umownych'
  },
  {
    id: 'akceptować',
    name: 'Akceptuj ryzyko (Accept)',
    icon: '✋',
    color: '#059669',
    description: 'Świadoma decyzja o niepodjęciu dalszych działań w stosunku do danego ryzyka. Organizacja akceptuje potencjalne skutki, gdyż ryzyko mieści się w apetycie ryzyka lub koszt mitygacji jest wyższy niż potencjalna strata.',
    whenToUse: 'Gdy ryzyko ma niskie prawdopodobieństwo i/lub niskie skutki, lub gdy koszt kontroli jest nieproporcjonalny. Wymaga formalnej decyzji zarządu i dokumentacji. Nie jest to ignorowanie ryzyka!',
    examples: ['Akceptacja ryzyka przestarzałej maszyny produkcyjnej, której wymiana jest niemożliwa', 'Ryzyko incydentów niskoprawdopodobnych o małych skutkach', 'Ryzyko poniżej zdefiniowanego progu akceptacji'],
    cost: 'Brak dodatkowych kosztów - ale wymaga świadomej decyzji i dokumentacji'
  },
  {
    id: 'unikać',
    name: 'Unikaj ryzyka (Avoid)',
    icon: '🚫',
    color: '#DC2626',
    description: 'Zaprzestanie działalności lub procesu, który generuje ryzyko. Eliminacja ryzyka przez jego źródło. Zazwyczaj oznacza rezygnację z czegoś.',
    whenToUse: 'Gdy ryzyko jest zbyt wysokie i nie da się go skutecznie zredukować przez inne metody, lub gdy działalność jest niezgodna z regulacjami. Stosowane rzadko - bo też eliminuje potencjalną wartość biznesową.',
    examples: ['Rezygnacja z uruchamiania aplikacji w niezabezpieczonym środowisku chmurowym', 'Zaprzestanie przetwarzania określonej kategorii wrażliwych danych', 'Nierozwijanie produktu ze zbyt dużą powierzchnią ataku'],
    cost: 'Potencjalna utrata przychodów lub możliwości biznesowych'
  },
];

// ── Scenariusze CIA (gra "wrzuć do właściwego koszyka") ────────────────────

export const CIA_SCENARIOS = [
  {
    text: 'Haker wykradł bazę danych klientów i opublikował ją w internecie.',
    answer: 'C',
    explanation: 'Naruszono Poufność (Confidentiality) - dane trafiły do nieuprawnionych osób. Klienci, których dane zostały ujawnione, mogą stać się ofiarami phishingu lub kradzieży tożsamości.'
  },
  {
    text: 'Atakujący podmienił fakturę w systemie - zmienił numer konta bankowego.',
    answer: 'I',
    explanation: 'Naruszono Integralność (Integrity) - dane zostały zmodyfikowane bez autoryzacji. Faktura jest teraz fałszywa, a przelew trafi do atakującego zamiast do dostawcy.'
  },
  {
    text: 'Atak DDoS spowodował, że strona banku była niedostępna przez 4 godziny.',
    answer: 'A',
    explanation: 'Naruszono Dostępność (Availability) - system nie działał gdy był potrzebny. Klienci nie mogli wykonać przelewów, bank stracił przychody i reputację.'
  },
  {
    text: 'Pracownik wysłał poufny raport na swój prywatny adres e-mail przed odejściem z firmy.',
    answer: 'C',
    explanation: 'Naruszono Poufność - tajemnice handlowe lub dane osobowe trafiły poza kontrolę organizacji. To klasyczny przykład zagrożenia wewnętrznego (insider threat).'
  },
  {
    text: 'Ransomware zaszyfrował wszystkie pliki na serwerach - nikt nie może pracować.',
    answer: 'A',
    explanation: 'Naruszono Dostępność - dane istnieją, ale są zaszyfrowane i niedostępne. Nowoczesny ransomware (double extortion) może też naruszać Poufność przez wcześniejszą eksfiltrację danych.'
  },
  {
    text: 'Złośliwy kod zmienił wyniki badań krwi w systemie szpitalnym.',
    answer: 'I',
    explanation: 'Naruszono Integralność - dane medyczne są nieprawdziwe. Lekarz podejmujący decyzje na podstawie zmanipulowanych wyników może wyrządzić pacjentowi poważną krzywdę. To scenariusz o krytycznych konsekwencjach.'
  },
  {
    text: 'Administrator przez pomyłkę usunął bazę danych produkcyjną i nie ma backupu.',
    answer: 'A',
    explanation: 'Naruszono Dostępność - i prawdopodobnie Integralność (dane utracone bezpowrotnie). Brak backupu to naruszenie podstawowych zasad BCP/DRP. Dostępność nie dotyczy tylko ataków - obejmuje też awarie i błędy ludzkie.'
  },
  {
    text: 'Atakujący przechwycił niezaszyfrowany ruch Wi-Fi i odczytał hasła pracowników.',
    answer: 'C',
    explanation: 'Naruszono Poufność - hasła, które miały być tajne, zostały przechwycone przez człowieka w środku (Man-in-the-Middle). Brak szyfrowania transmisji (TLS/HTTPS) lub użycie otwartej sieci Wi-Fi to klasyczna luka.'
  },
  {
    text: 'Firma nie może wystawić e-faktury bo system ERP padł w środku miesiąca.',
    answer: 'A',
    explanation: 'Naruszono Dostępność - procesy biznesowe są zablokowane. Nawet jeśli dane są bezpieczne i nienaruszone, niemożność korzystania z systemu ma bezpośrednie skutki finansowe i operacyjne.'
  },
  {
    text: 'Programista przypadkowo wrzucił klucze API do publicznego repozytorium GitHub.',
    answer: 'C',
    explanation: 'Naruszono Poufność - tajne klucze dostępowe trafiły do publicznej domeny. Każdy, kto je znajdzie (boty skanują GitHub w czasie rzeczywistym), może uzyskać dostęp do systemów lub danych organizacji. Klucze należy natychmiast unieważnić.'
  },
];

// ── Scenariusze ryzyka (gra "dobierz odpowiedź") ───────────────────────────

export const RISK_SCENARIOS = [
  {
    risk: 'Możliwość włamania przez nieaktualne oprogramowanie z krytyczną podatnością',
    correctResponse: 'obniżać',
    explanation: 'Aktualizacja oprogramowania (patching) bezpośrednio obniża prawdopodobieństwo eksploitacji podatności. To klasyczne i najtańsze działanie mitygacyjne - ignorowanie aktualizacji to jedno z największych zaniedbań bezpieczeństwa.',
    alternatives: 'Można też rozważyć dodatkowe mitygacje jak segmentacja sieci lub WAF jako środki tymczasowe do czasu aktualizacji.'
  },
  {
    risk: 'Ryzyko finansowe ataku ransomware - koszt odtworzenia szacowany na 5 mln PLN',
    correctResponse: 'przenosić',
    explanation: 'Ubezpieczenie cybernetyczne przenosi finansowe skutki ataku na ubezpieczyciela. Oczywiście powinno towarzyszyć temu też obniżanie ryzyka (backup, EDR), ale dla ryzyk o dużej ekspozycji finansowej transfer jest kluczowym elementem strategii.',
    alternatives: 'Mitygacja (backup, EDR, MFA) + transfer (ubezpieczenie) to najlepsza kombinacja dla ransomware.'
  },
  {
    risk: 'Bardzo stary system Legacy bez wsparcia producenta, którego wymiana kosztuje 10 mln PLN',
    correctResponse: 'akceptować',
    explanation: 'Gdy koszt mitygacji (wymiana systemu) jest nieproporcjonalny do ryzyka, lub gdy wymiana jest technicznie niemożliwa (np. sterowanie maszyną przemysłową), formalna akceptacja ryzyka z dokumentacją jest właściwą odpowiedzią. Należy też rozważyć kompensujące kontrole (segmentacja, monitoring).',
    alternatives: 'Jeśli ryzyko jest zbyt wysokie do akceptacji - rozważ unikanie (wyłączenie systemu) lub maksymalną izolację jako mitygację.'
  },
  {
    risk: 'Planowane wdrożenie aplikacji, która wymaga przetwarzania danych medycznych w niezbadanym środowisku chmurowym',
    correctResponse: 'unikać',
    explanation: 'Rezygnacja z wdrożenia w niezabezpieczonym środowisku eliminuje ryzyko. Dane medyczne podlegają surowym regulacjom (RODO, NIS2) - wdrożenie w środowisku, którego bezpieczeństwo nie zostało zweryfikowane, może prowadzić do katastrofy regulacyjnej i reputacyjnej.',
    alternatives: 'Alternatywnie: przeprowadź ocenę bezpieczeństwa chmury i wdrożenie dopiero po jej zaliczeniu (mitygacja).'
  },
  {
    risk: 'Ryzyko, że pracownik biurowy może przypadkowo kliknąć w phishingowy link',
    correctResponse: 'obniżać',
    explanation: 'Szkolenia antyphishingowe, filtrowanie poczty, MFA i EDR bezpośrednio redukują prawdopodobieństwo i skutki udanego phishingu. Tego ryzyka nie da się całkowicie wyeliminować (błąd ludzki zawsze istnieje), ale można je znacząco obniżyć wielowarstwową ochroną.',
    alternatives: 'Zero Risk nie istnieje - celem jest obniżenie do akceptowalnego poziomu. MFA jest szczególnie skuteczne bo nawet jeśli pracownik poda hasło, konto pozostaje chronione.'
  },
];
