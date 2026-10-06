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
    description: 'Dostęp do danych mają tylko uprawnieni.',
    violationExample: 'Naruszenie = wyciek danych. Haker wykradł bazę klientów. Pracownik wysłał poufny dokument na prywatny e-mail.',
    controls: ['Szyfrowanie danych przechowywanych i przesyłanych', 'Kontrola dostępu (IAM, PAM)', 'MFA', 'DLP', 'Klasyfikacja danych'],
    questions: ['Kto może czytać te dane?', 'Czy dane są zaszyfrowane?', 'Czy dostęp jest logowany?']
  },
  I: {
    id: 'I',
    name: 'Integrity',
    namePL: 'Integralność',
    description: 'Dane nie zostały niepostrzeżenie zmienione.',
    violationExample: 'Naruszenie = sfałszowany przelew, podmieniona faktura. Atakujący zmienił numer konta bankowego w systemie finansowym.',
    controls: ['Podpisy cyfrowe i sumy kontrolne', 'Kontrola wersji i logi zmian', 'Separacja obowiązków', 'Weryfikowane kopie zapasowe', 'SIEM do wykrywania zmian'],
    questions: ['Czy ktoś mógł zmienić te dane?', 'Czy zmiany są logowane?', 'Jak weryfikujemy autentyczność?']
  },
  A: {
    id: 'A',
    name: 'Availability',
    namePL: 'Dostępność',
    description: 'System jest dostępny wtedy, gdy jest potrzebny.',
    violationExample: 'Naruszenie = ransomware, który blokuje firmę, albo atak DDoS. Szpital niedostępny przez tydzień po zaszyfrowaniu serwerów.',
    controls: ['Redundancja systemów (HA)', 'Backup 3-2-1 z testami odtwarzania', 'DRP i BCP', 'Ochrona DDoS (CDN)', 'Monitoring dostępności'],
    questions: ['Co się stanie, gdy system przestanie działać?', 'Jak szybko możemy go odtworzyć?', 'Czy kopie zapasowe działają?']
  },
};

// ── Odpowiedzi na ryzyko ────────────────────────────────────────────────────

export const RISK_RESPONSES = [
  {
    id: 'obniżać',
    name: 'Obniżaj ryzyko (Mitigate)',
    description: 'Wdrożenie kontroli technicznych lub organizacyjnych, które zmniejszają prawdopodobieństwo zagrożenia albo jego skutki. Ryzyko pozostaje, ale na akceptowalnym poziomie.',
    whenToUse: 'Gdy ryzyko przekracza apetyt na ryzyko organizacji, ale kontrole mogą je zmniejszyć do akceptowalnego poziomu. Najczęstsza i zalecana odpowiedź.',
    examples: ['Wdrożenie MFA redukuje ryzyko przejęcia kont', 'Aktualizacja oprogramowania redukuje ryzyko wykorzystania podatności', 'Szkolenia zmniejszają ryzyko phishingu', 'Kopie zapasowe redukują skutki ransomware'],
    cost: 'Umiarkowany: inwestycja w kontrole bezpieczeństwa'
  },
  {
    id: 'przenosić',
    name: 'Przenoś ryzyko (Transfer)',
    description: 'Przeniesienie finansowych skutków ryzyka na zewnętrzny podmiot przez ubezpieczenie lub umowy z dostawcami. Ryzyko nadal istnieje, ale skutki finansowe pokrywa ktoś inny.',
    whenToUse: 'Gdy ryzyko ma niskie prawdopodobieństwo, ale wysokie skutki finansowe, albo gdy mitygacja kosztuje więcej niż ubezpieczenie. Ubezpieczenie cybernetyczne staje się standardem.',
    examples: ['Polisa ubezpieczenia cybernetycznego', 'Klauzule SLA i kary umowne dla dostawców', 'Outsourcing odpowiedzialności do MSSP', 'Umowy o odpowiedzialności z dostawcami chmury'],
    cost: 'Koszt składki ubezpieczeniowej lub dodatkowych klauzul umownych'
  },
  {
    id: 'akceptować',
    name: 'Akceptuj ryzyko (Accept)',
    description: 'Świadoma decyzja, że organizacja nie podejmuje dalszych działań wobec danego ryzyka. Akceptuje możliwe skutki, bo ryzyko mieści się w apetycie na ryzyko albo mitygacja kosztowałaby więcej niż potencjalna strata.',
    whenToUse: 'Gdy ryzyko ma niskie prawdopodobieństwo i/lub niskie skutki albo gdy koszt kontroli jest nieproporcjonalny. Wymaga formalnej decyzji zarządu i dokumentacji. Nie jest to ignorowanie ryzyka!',
    examples: ['Akceptacja ryzyka przestarzałej maszyny produkcyjnej, której wymiana jest niemożliwa', 'Ryzyko incydentów niskoprawdopodobnych o małych skutkach', 'Ryzyko poniżej zdefiniowanego progu akceptacji'],
    cost: 'Brak dodatkowych kosztów, ale wymaga świadomej decyzji i dokumentacji'
  },
  {
    id: 'unikać',
    name: 'Unikaj ryzyka (Avoid)',
    description: 'Zaprzestanie działalności lub procesu, który generuje ryzyko. Ryzyko znika razem ze swoim źródłem. Zwykle oznacza to rezygnację z czegoś.',
    whenToUse: 'Gdy ryzyko jest zbyt wysokie, a inne metody nie zmniejszą go skutecznie, albo gdy działalność jest niezgodna z regulacjami. Stosowane rzadko, bo eliminuje też potencjalną wartość biznesową.',
    examples: ['Rezygnacja z uruchamiania aplikacji w niezabezpieczonym środowisku chmurowym', 'Zaprzestanie przetwarzania określonej kategorii wrażliwych danych', 'Nierozwijanie produktu ze zbyt dużą powierzchnią ataku'],
    cost: 'Potencjalna utrata przychodów lub możliwości biznesowych'
  },
];

// ── Scenariusze CIA (przykłady naruszeń w kolumnach triady) ─────────────────

export const CIA_SCENARIOS = [
  {
    text: 'Haker wykradł bazę danych klientów i opublikował ją w internecie.',
    answer: 'C',
    explanation: 'Naruszono Poufność (Confidentiality): dane trafiły do nieuprawnionych osób. Klienci, których dane ujawniono, mogą paść ofiarą phishingu lub kradzieży tożsamości.'
  },
  {
    text: 'Atakujący podmienił fakturę w systemie: zmienił numer konta bankowego.',
    answer: 'I',
    explanation: 'Naruszono Integralność (Integrity): dane zmieniono bez autoryzacji. Faktura jest teraz fałszywa, a przelew trafi do atakującego zamiast do dostawcy.'
  },
  {
    text: 'Atak DDoS spowodował, że strona banku była niedostępna przez cztery godziny.',
    answer: 'A',
    explanation: 'Naruszono Dostępność (Availability): system nie działał, gdy był potrzebny. Klienci nie mogli wykonać przelewów, bank stracił przychody i reputację.'
  },
  {
    text: 'Pracownik wysłał poufny raport na swój prywatny adres e-mail przed odejściem z firmy.',
    answer: 'C',
    explanation: 'Naruszono Poufność: tajemnice handlowe lub dane osobowe trafiły poza kontrolę organizacji. To klasyczny przykład zagrożenia wewnętrznego.'
  },
  {
    text: 'Ransomware zaszyfrował wszystkie pliki na serwerach i nikt nie może pracować.',
    answer: 'A',
    explanation: 'Naruszono Dostępność: dane istnieją, ale są zaszyfrowane i niedostępne. Nowoczesny ransomware (podwójne wymuszenie) może też naruszać Poufność przez wcześniejszą eksfiltrację danych.'
  },
  {
    text: 'Złośliwy kod zmienił wyniki badań krwi w systemie szpitalnym.',
    answer: 'I',
    explanation: 'Naruszono Integralność: dane medyczne są nieprawdziwe. Lekarz, który podejmuje decyzje na podstawie zmanipulowanych wyników, może wyrządzić pacjentowi poważną krzywdę.'
  },
  {
    text: 'Administrator przez pomyłkę usunął bazę danych produkcyjną i nie ma backupu.',
    answer: 'A',
    explanation: 'Naruszono Dostępność, a prawdopodobnie także Integralność (dane utracone bezpowrotnie). Brak backupu narusza podstawowe zasady BCP/DRP. Dostępność mogą naruszyć zarówno ataki, jak i awarie czy błędy ludzkie.'
  },
  {
    text: 'Atakujący przechwycił niezaszyfrowany ruch Wi-Fi i odczytał hasła pracowników.',
    answer: 'C',
    explanation: 'Naruszono Poufność: atakujący w roli pośrednika (Man-in-the-Middle) przechwycił hasła, które miały być tajne. Brak szyfrowania transmisji (TLS/HTTPS) lub korzystanie z otwartej sieci Wi-Fi to klasyczna luka.'
  },
  {
    text: 'Firma nie może wystawić e-faktury, ponieważ system ERP przestał działać w środku miesiąca.',
    answer: 'A',
    explanation: 'Naruszono Dostępność: procesy biznesowe są zablokowane. Nawet jeśli dane są bezpieczne i nienaruszone, przestój systemu ma bezpośrednie skutki finansowe i operacyjne.'
  },
  {
    text: 'Programista przypadkowo umieścił klucze API w publicznym repozytorium GitHub.',
    answer: 'C',
    explanation: 'Naruszono Poufność: tajne klucze dostępowe stały się publicznie dostępne. Każdy, kto je znajdzie (boty skanują GitHub w czasie rzeczywistym), może dostać się do systemów lub danych organizacji. Klucze trzeba natychmiast unieważnić.'
  },
];

// ── Scenariusze ryzyka (przykłady przy strategiach odpowiedzi) ─────────────

export const RISK_SCENARIOS = [
  {
    risk: 'Możliwość włamania przez nieaktualne oprogramowanie z krytyczną podatnością',
    correctResponse: 'obniżać',
    explanation: 'Aktualizowanie zabezpieczeń (zarządzanie poprawkami) bezpośrednio obniża prawdopodobieństwo wykorzystania podatności. To klasyczne i najtańsze działanie mitygacyjne. Ignorowanie aktualizacji to jedno z największych zaniedbań bezpieczeństwa.',
  },
  {
    risk: 'Ryzyko finansowe ataku ransomware: koszt odtworzenia szacowany na 5 mln PLN',
    correctResponse: 'przenosić',
    explanation: 'Ubezpieczenie cybernetyczne przenosi finansowe skutki ataku na ubezpieczyciela. Powinno mu towarzyszyć obniżanie ryzyka (backup, EDR), ale przy dużej ekspozycji finansowej transfer jest ważną częścią strategii.',
  },
  {
    risk: 'Bardzo stary system odziedziczony bez wsparcia producenta, którego wymiana kosztuje 10 mln PLN',
    correctResponse: 'akceptować',
    explanation: 'Gdy koszt mitygacji (wymiana systemu) jest nieproporcjonalny do ryzyka lub gdy wymiana jest technicznie niemożliwa (np. sterowanie maszyną przemysłową), formalna akceptacja ryzyka z dokumentacją jest właściwą odpowiedzią. Należy też rozważyć kontrole uzupełniające (segmentacja, monitoring).',
  },
  {
    risk: 'Planowane wdrożenie aplikacji, która wymaga przetwarzania danych medycznych w niezbadanym środowisku chmurowym',
    correctResponse: 'unikać',
    explanation: 'Rezygnacja z wdrożenia w niezabezpieczonym środowisku eliminuje ryzyko. Dane medyczne podlegają surowym regulacjom (RODO, NIS2), a wdrożenie w środowisku o niezweryfikowanym bezpieczeństwie może mieć poważne skutki regulacyjne i reputacyjne.',
  },
  {
    risk: 'Ryzyko, że pracownik biurowy przypadkowo kliknie link phishingowy',
    correctResponse: 'obniżać',
    explanation: 'Szkolenia antyphishingowe, filtrowanie poczty, MFA i EDR bezpośrednio redukują prawdopodobieństwo i skutki udanego phishingu. Tego ryzyka nie da się całkowicie wyeliminować (błąd ludzki zawsze istnieje), ale wielowarstwowa ochrona mocno je obniża.',
  },
];
