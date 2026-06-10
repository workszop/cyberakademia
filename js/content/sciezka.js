/**
 * SCIEZKA - 7 kroków "od czego zacząć" (ścieżka wdrożenia)
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 *
 * Załącznik praktyczny: jak organizacja powinna wdrażać cyberbezpieczeństwo
 * krok po kroku, we właściwej kolejności.
 */

export const STEPS = [
  {
    n: 1,
    name: 'Zdiagnozuj status regulacyjny',
    icon: '🔍',
    description: 'Czy podlegamy NIS2/KSC i/lub DORA? Sprawdź sektor (kody PKD), wielkość podmiotu, wyjątki.',
    detail: 'Decydują: sektor (kody PKD - np. energia: 35.1x, transport: 49-52, zdrowie: 86-87, IT: 62-63), wielkość (podmioty kluczowe: 250+ pracowników lub 50+ mln EUR obrotu; podmioty ważne: 50+ pracowników lub 10+ mln EUR; wyjątki np. MSSP/rejestry domen od 10 pracowników / 2 mln EUR) i specjalne wykluczenia (organy bezpieczeństwa narodowego, organy ścigania). Ostateczna kwalifikacja wymaga analizy ustawy lub porady prawnej. Istnieją bezpłatne testery weryfikacji po numerze NIP.',
    badge: null,
    tools: ['Tester NIP (strona UKNF/CERT Polska)', 'Analiza ustawy o KSC', 'Analiza DORA dla sektora finansowego', 'Porada prawna dla skomplikowanych przypadków'],
    keyQuestions: [
      'W jakich sektorach PKD działa firma?',
      'Ile pracowników? Jaki roczny obrót?',
      'Czy jesteśmy dostawcą ICT dla sektora finansowego? (DORA)',
      'Czy przetwarzamy dane osobowe? (zawsze RODO)'
    ],
    output: 'Dokument statusu regulacyjnego: lista obowiązujących regulacji, kategoria podmiotu (kluczowy/ważny/nieobjęty), harmonogram terminów.',
    regulatoryLink: 'NIS2/KSC, DORA, RODO - każda z nich ma inne kryteria zakresu i różne terminy.'
  },
  {
    n: 2,
    name: 'Przeprowadź ocenę ryzyka i lukę (gap analysis)',
    icon: '📊',
    description: 'Zidentyfikuj aktywa, zagrożenia i obecny poziom bezpieczeństwa. Porównaj z wymaganiami.',
    detail: 'Gap analysis to ocena różnicy między obecnym stanem bezpieczeństwa a wymaganym. Krok 1: Inwentaryzacja aktywów - co mamy do ochrony (systemy, dane, procesy). Krok 2: Ocena zagrożeń - co nam grozi (ransomware, phishing, insider, APT). Krok 3: Ocena obecnych kontroli - co już mamy (polityki, narzędzia, procesy). Krok 4: Identyfikacja luk - czego brakuje vs. wymagania NIS2/DORA/ISO 27001. Krok 5: Priorytetyzacja - co naprawić najpierw (wg. ryzyka i wymagań regulacyjnych).',
    badge: null,
    tools: ['Framework ISO/IEC 27001 (wymagania SZBI)', 'NIST CSF 2.0 (ocena dojrzałości)', 'CIS Controls v8 (techniczne baseline)', 'Zewnętrzny audyt/konsultant (obiektywna ocena)'],
    keyQuestions: [
      'Jakie mamy aktywa krytyczne (systemy, dane)?',
      'Co już robimy dobrze w zakresie bezpieczeństwa?',
      'Jakie są największe luki vs. wymagania NIS2/DORA?',
      'Co jest największym ryzykiem dla naszej działalności?'
    ],
    output: 'Raport gap analysis: lista luk z priorytetami, macierz ryzyk (prawdopodobieństwo × skutek), rekomendacje działań.',
    regulatoryLink: 'NIS2/KSC wymaga regularnego (min. co 2 lata) szacowania ryzyka. Gap analysis to punkt startowy dla wdrożenia SZBI.'
  },
  {
    n: 3,
    name: 'Zbuduj strukturę zarządzania (governance)',
    icon: '👔',
    description: 'Powołaj CISO (lub odpowiedzialną osobę), zdefiniuj role, uzyskaj zaangażowanie zarządu.',
    detail: 'NIS2 i DORA wprost wymagają zaangażowania zarządu w cyberbezpieczeństwo - to nie jest opcjonalne. Minimalne kroki: (1) Powołanie osoby odpowiedzialnej za cyberbezpieczeństwo (CISO lub manager bezpieczeństwa - zależnie od wielkości). (2) Formalne przypisanie ról i odpowiedzialności (RACI). (3) Zatwierdzenie polityki bezpieczeństwa przez zarząd. (4) Regularne raportowanie zarządowi (np. kwartalny raport stanu bezpieczeństwa). (5) Szkolenie zarządu z cyberbezpieczeństwa (wymagane przez NIS2). (6) Powołanie DPO (jeśli wymagany przez RODO).',
    badge: null,
    tools: ['Wzór polityki bezpieczeństwa informacji', 'Szablon RACI dla ról bezpieczeństwa', 'Materiały szkoleniowe dla zarządu', 'Wzór raportu bezpieczeństwa dla zarządu'],
    keyQuestions: [
      'Kto odpowiada za cyberbezpieczeństwo (z imienia i nazwiska)?',
      'Czy zarząd rozumie swoje obowiązki wg NIS2/DORA?',
      'Czy DPO jest wymagany i czy jest powołany?',
      'Jak bezpieczeństwo jest raportowane do zarządu?'
    ],
    output: 'Powołany CISO/manager bezpieczeństwa, zatwierdzona polityka bezpieczeństwa, RACI ról bezpieczeństwa, harmonogram raportowania do zarządu.',
    regulatoryLink: 'NIS2 Art. 20: zarząd zatwierdza środki zarządzania ryzykiem i odpowiada osobiście. DORA: zarząd odpowiada za framework zarządzania ryzykiem ICT.'
  },
  {
    n: 4,
    name: 'Wdróż SZBI i kluczowe kontrole techniczne',
    icon: '⚙️',
    description: 'System Zarządzania Bezpieczeństwem Informacji + podstawowe „cyber hygiene”: MFA, backup, EDR, patching.',
    detail: 'Wdrożenie SZBI to największy krok - wymaga czasu i zasobów. Priorytetyzuj „cyber hygiene” z natychmiastowym efektem: (1) MFA wszędzie - szczególnie konta admin, poczta, VPN, aplikacje biznesowe. (2) Backup 3-2-1 z testami odtwarzania. (3) EDR zamiast antywirusa na wszystkich stacjach i serwerach. (4) Zarządzanie podatnościami - regularny patching z SLA (krytyczne: 24-72h). (5) Segmentacja sieci - minimum podział sieć użytkowników / serwery / sieć zarządzania. (6) Polityki: hasła, BYOD, praca zdalna, klasyfikacja danych. Równocześnie: dokumentacja SZBI wg ISO 27001 (polityki, procedury, rejestry ryzyk, aktywa).',
    badge: 'Fundament',
    tools: ['Microsoft Defender for Endpoint / inny EDR', 'Rozwiązanie MFA (Microsoft Authenticator, Duo)', 'System backupu (Veeam, Azure Backup)', 'Skaner podatności (Tenable, Qualys)', 'CIS Controls IG1 jako minimalna lista kontrolna'],
    keyQuestions: [
      'Czy MFA jest włączone dla wszystkich kont administracyjnych?',
      'Czy backup jest regularnie testowany (test odtwarzania)?',
      'Czy mamy aktualny rejest aktywów (hardware + software)?',
      'Ile czasu zajmuje nam wdrożenie krytycznego patcha?'
    ],
    output: 'Wdrożone podstawowe kontrole (MFA, EDR, backup), udokumentowany SZBI (polityki, procedury), rejestr aktywów i ryzyk.',
    regulatoryLink: 'KSC 2.0: termin wdrożenia SZBI - 12 miesięcy od wejścia w życie ustawy (3.04.2027). ISO 27001 certyfikacja może potwierdzać spełnienie wymagań.'
  },
  {
    n: 5,
    name: 'Uruchom monitoring i reagowanie na incydenty',
    icon: '🚨',
    description: 'SOC lub MSSP/MDR, playbooki IR, procesy zgłaszania incydentów do CSIRT/KNF.',
    detail: 'Bez monitoringu organizacja jest ślepa na ataki - wymagania regulacyjne (zgłoszenie w 24h/72h/4h) są niemożliwe do spełnienia bez procesu IR. Kroki: (1) Wybór modelu SOC: własny (duże organizacje), MSSP/MDR (MŚP, szybki start), hybrydowy (przejściowo). (2) Konfiguracja SIEM (lub zapewnienie przez MSSP). (3) Wdrożenie SOAR dla automatyzacji podstawowych odpowiedzi. (4) Opracowanie playbooków IR dla minimum: ransomware, phishing/BEC, kradzież danych, atak DDoS. (5) Procedury zgłaszania incydentów do CSIRT (NIS2) lub KNF (DORA) z przypisanymi rolami i wzorami zgłoszeń. (6) Kontakt z właściwym CSIRT - warto nawiązać przed incydentem, nie podczas.',
    badge: null,
    tools: ['SIEM (Microsoft Sentinel, Splunk lub przez MSSP)', 'SOAR (opcjonalnie na początku)', 'Playbooki IR (szablony ENISA, CERT Polska)', 'Wzory zgłoszeń incydentów do CSIRT NASK/GOV', 'Retainer z firmą Incident Response (na wypadek poważnego ataku)'],
    keyQuestions: [
      'Kto monitoruje alerty bezpieczeństwa poza godzinami pracy?',
      'Ile czasu zajmie nam wykrycie ataku (MTTD)?',
      'Czy wiemy jak zgłosić incydent do CSIRT w 24h?',
      'Czy mamy playbooka dla ransomware - co robić krok po kroku?'
    ],
    output: 'Działający monitoring 24/7 (własny lub MSSP), playbooki IR dla kluczowych scenariuszy, procedury zgłaszania incydentów z przypisanymi rolami.',
    regulatoryLink: 'NIS2/KSC: wczesne ostrzeżenie do CSIRT w 24h, pełne zgłoszenie w 72h. DORA: powiadomienie regulatora (KNF) w 4h dla poważnych incydentów ICT.'
  },
  {
    n: 6,
    name: 'Zarządzaj ryzykiem dostawców i łańcuchem dostaw',
    icon: '🔗',
    description: 'Ocena bezpieczeństwa kluczowych dostawców ICT, wymogi w umowach, nadzór, exit plans.',
    detail: 'NIS2 i DORA wprost wymagają zarządzania ryzykiem dostawców - inspiracją był atak SolarWinds (2020). Kroki: (1) Inwentaryzacja dostawców ICT - kto ma dostęp do systemów lub danych? (2) Klasyfikacja wg. krytyczności - kluczowi (np. dostawca ERP, chmura) vs. standardowi. (3) Ocena bezpieczeństwa kluczowych dostawców - kwestionariusz, certyfikaty (ISO 27001), wyniki audytów. (4) Wymogi bezpieczeństwa w umowach - klauzule: prawo do audytu, SLA bezpieczeństwa, obowiązek informowania o incydentach, plany wyjścia (exit plan). (5) Monitoring ciągły - regularne przeglądy, powiadomienia o incydentach u dostawcy. (6) Dla sektora finansowego (DORA): szczególna uwaga na koncentrację ryzyka (zbyt wiele zależności od jednego dostawcy chmury).',
    badge: null,
    tools: ['Rejestr dostawców z oceną ryzyka (Excel/GRC)', 'Kwestionariusz bezpieczeństwa dostawców', 'Standardowe klauzule bezpieczeństwa w umowach ICT', 'Platforma GRC (opcjonalnie) - ServiceNow, OneTrust'],
    keyQuestions: [
      'Kto z dostawców ma dostęp do naszych krytycznych systemów lub danych?',
      'Czy wiemy jakie jest bezpieczeństwo naszego dostawcy ERP/chmury?',
      'Co robimy gdy kluczowy dostawca przestanie działać (exit plan)?',
      'Czy umowy z dostawcami ICT zawierają klauzule bezpieczeństwa?'
    ],
    output: 'Rejestr dostawców z klasyfikacją ryzyka, wymagania bezpieczeństwa w umowach kluczowych dostawców, procedura oceny nowych dostawców.',
    regulatoryLink: 'NIS2/KSC Art. 21 pkt 2d: bezpieczeństwo łańcucha dostaw jako obowiązkowy element SZBI. DORA Art. 28-44: zarządzanie ryzykiem zewnętrznych dostawców ICT - jedno z 5 filarów.'
  },
  {
    n: 7,
    name: 'Testuj, audytuj i ciągle doskonalej',
    icon: '🔄',
    description: 'Regularne testy penetracyjne, audyt SZBI, ćwiczenia kryzysowe, aktualizacja planów po wnioskach.',
    detail: 'Cyberbezpieczeństwo to nie projekt z końcem - to ciągły proces doskonalenia. (1) Testy penetracyjne: minimum raz w roku dla systemów krytycznych, przy każdej istotnej zmianie infrastruktury. Zewnętrzni testerzy, zakres zgodny z ryzykiem, wnioski wdrażane z SLA. (2) Audyt SZBI: wewnętrzny (co rok) i zewnętrzny (certyfikacja ISO 27001 co 3 lata lub wymagany przez KSC). (3) Ćwiczenia tabletop: symulacje kryzysowe z zarządem (scenariusze: ransomware, wyciek danych, DDoS) - minimum raz w roku. (4) Testy odtwarzania DR: minimum raz w roku dla krytycznych systemów - czy backup naprawdę działa? (5) TLPT: dla sektora finansowego objętego DORA - co 3 lata. (6) Lessons learned: po każdym incydencie, ćwiczeniu lub audycie - wnioski przekładają się na aktualizacje polityk, playbooków, konfiguracji.',
    badge: 'Ciągłe doskonalenie',
    tools: ['Firmy oferujące testy penetracyjne (CREST/OSCE certified)', 'Standard TIBER-EU dla TLPT (sektor finansowy)', 'Szablony ćwiczeń tabletop (ENISA, BSI)', 'Narzędzia skanowania podatności (Tenable, Qualys)', 'Platforma GRC do śledzenia wniosków i remediation'],
    keyQuestions: [
      'Kiedy ostatnio testowaliśmy czy możemy odtworzyć dane z backupu?',
      'Czy zarząd wie co robić w przypadku ataku ransomware (ćwiczenie tabletop)?',
      'Kiedy ostatni test penetracyjny? Czy wnioski zostały wdrożone?',
      'Jak długo trwałoby przywrócenie naszego systemu ERP po awarii?'
    ],
    output: 'Raporty z testów penetracyjnych z udokumentowanymi wnioskami, certyfikacja ISO 27001 (opcjonalnie), wyniki ćwiczeń tabletop, zaktualizowane plany i playbooki.',
    regulatoryLink: 'KSC 2.0: audyt obowiązkowy 24 miesiące od wejścia w życie (do 3.04.2028), następnie co 2 lata. DORA: TLPT co 3 lata dla instytucji istotnych. NIS2: regularne przeglądy i testy skuteczności środków.'
  },
];

// ── Mapa priorytetów ("quick wins" vs. długoterminowe) ─────────────────────

export const PRIORITY_MAP = {
  quickWins: [
    {
      action: 'Włącz MFA dla wszystkich kont administracyjnych i poczty e-mail',
      effort: 'Niski',
      impact: 'Bardzo wysoki - eliminuje 99% ataków na przejęte hasła',
      cost: 'Często bezpłatne (wbudowane w Microsoft 365, Google Workspace)',
      timeToComplete: '1-2 tygodnie'
    },
    {
      action: 'Przetestuj odtwarzanie z backupu',
      effort: 'Niski',
      impact: 'Wysoki - dowiesz się czy backup naprawdę działa zanim będzie potrzebny',
      cost: 'Czas IT',
      timeToComplete: '1 dzień'
    },
    {
      action: 'Wdróż EDR na stacjach roboczych i serwerach',
      effort: 'Średni',
      impact: 'Bardzo wysoki - wykrywa i blokuje nowoczesne ataki które antywirus przepuszcza',
      cost: 'Licencja per endpoint (np. Microsoft Defender for Endpoint jest wliczony w M365 E5)',
      timeToComplete: '2-4 tygodnie'
    },
    {
      action: 'Zidentyfikuj kogo obejmują regulacje (NIS2/KSC, DORA)',
      effort: 'Niski',
      impact: 'Wysoki - bez tego nie wiesz jakie masz terminy i kary',
      cost: 'Czas prawnika lub CISO',
      timeToComplete: '1-2 tygodnie'
    },
    {
      action: 'Opracuj listę kluczowych dostawców ICT z dostępem do sieci/danych',
      effort: 'Niski',
      impact: 'Średni - punkt startowy zarządzania ryzykiem łańcucha dostaw',
      cost: 'Czas IT i zakupów',
      timeToComplete: '1 tydzień'
    },
  ],
  longTerm: [
    {
      action: 'Wdrożenie pełnego SZBI wg ISO/IEC 27001',
      effort: 'Bardzo wysoki',
      impact: 'Bardzo wysoki - fundament dojrzałego programu bezpieczeństwa',
      cost: 'Kilkadziesiąt-kilkaset tysięcy PLN (zależnie od wielkości)',
      timeToComplete: '12-24 miesiące'
    },
    {
      action: 'Uruchomienie SOC (własnego lub MSSP)',
      effort: 'Wysoki',
      impact: 'Bardzo wysoki - monitoring 24/7, szybkie wykrycie ataków',
      cost: 'SOC własny: kilka mln PLN rocznie; MSSP: od kilkudziesięciu tys. PLN miesięcznie',
      timeToComplete: '3-12 miesięcy'
    },
    {
      action: 'Wdrożenie Zero Trust Architecture',
      effort: 'Bardzo wysoki',
      impact: 'Bardzo wysoki - fundamentalna zmiana modelu bezpieczeństwa',
      cost: 'Zależy od skali - transformacja wieloletnia',
      timeToComplete: '2-5 lat (stopniowe wdrożenie)'
    },
    {
      action: 'Certyfikacja ISO/IEC 27001',
      effort: 'Wysoki',
      impact: 'Wysoki - zewnętrzna weryfikacja skuteczności SZBI, akceptowana przez regulatorów',
      cost: 'Audyt certyfikacyjny: od kilku do kilkudziesięciu tys. PLN',
      timeToComplete: '12-18 miesięcy po wdrożeniu SZBI'
    },
  ],
};
