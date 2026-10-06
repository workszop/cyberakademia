/**
 * GLOSSARY - słownik akronimów cyberbezpieczeństwa
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

export const GLOSSARY = {
  APT: {
    full: 'Advanced Persistent Threat',
    short: 'Zaawansowany, długotrwały atak celowany, często sponsorowany przez państwo.',
    long: 'APT (Advanced Persistent Threat) to zaawansowany, długotrwały atak celowany wymierzony w konkretną organizację. Atakujący penetruje sieć, ukrywa się przez miesiące lub lata i eksfiltruje dane. Często stoją za nim grupy sponsorowane przez państwa, np. Fancy Bear (Rosja) i Lazarus Group (Korea Północna).'
  },
  BCP: {
    full: 'Business Continuity Plan',
    short: 'Plan zapewnienia ciągłości działania organizacji podczas poważnych zakłóceń.',
    long: 'BCP (Business Continuity Plan) to dokument opisujący, jak organizacja ma działać podczas poważnych zakłóceń: awarii, ataku cybernetycznego, klęski żywiołowej. Wskazuje krytyczne procesy, alternatywne sposoby ich prowadzenia i priorytety odtwarzania. Uzupełnia go DRP (Disaster Recovery Plan), skupiony na odtwarzaniu systemów IT.'
  },
  DRP: {
    full: 'Disaster Recovery Plan',
    short: 'Plan odtwarzania systemów IT po poważnej awarii lub ataku.',
    long: 'DRP (Disaster Recovery Plan) to szczegółowy plan techniczny odtwarzania systemów informatycznych po katastrofie, awarii lub ataku. Określa cele RTO (Recovery Time Objective, maksymalny czas odtworzenia) i RPO (Recovery Point Objective, maksymalna utrata danych). DRP jest techniczną częścią szerszego BCP.'
  },
  CIA: {
    full: 'Confidentiality, Integrity, Availability',
    short: 'Triada bezpieczeństwa (Poufność, Integralność, Dostępność), podstawa cyberbezpieczeństwa.',
    long: 'Triada CIA to trzy podstawowe właściwości, które ma zapewnić ochrona informacji: Confidentiality (Poufność), czyli dane dostępne tylko dla uprawnionych; Integrity (Integralność), czyli dane niezmienione bez autoryzacji; Availability (Dostępność), czyli systemy dostępne, gdy są potrzebne. Każdy incydent cyberbezpieczeństwa narusza co najmniej jedną z tych właściwości.'
  },
  CISO: {
    full: 'Chief Information Security Officer',
    short: 'Dyrektor ds. bezpieczeństwa informacji, odpowiedzialny za strategię i zarządzanie cyberbezpieczeństwem.',
    long: 'CISO (Chief Information Security Officer) to dyrektor ds. bezpieczeństwa informacji, odpowiadający za całościową strategię cyberbezpieczeństwa organizacji, zarządzanie ryzykiem, zgodność z przepisami i budowanie kultury bezpieczeństwa. Raportuje do zarządu lub CEO. Różni się od DPO: CISO odpowiada za całe bezpieczeństwo IT, DPO wyłącznie za ochronę danych osobowych.'
  },
  CERT: {
    full: 'Computer Emergency Response Team',
    short: 'Zespół reagowania na incydenty komputerowe, krajowy lub sektorowy.',
    long: 'CERT (Computer Emergency Response Team) to zespół specjalistów reagujących na incydenty bezpieczeństwa. W Polsce funkcjonują CERT Polska (NASK), CERT GOV PL (ABW) i CERT MON (wojsko). Termin jest często używany zamiennie z CSIRT, choć formalnie CSIRT to nowsze określenie stosowane w regulacjach UE.'
  },
  CSIRT: {
    full: 'Computer Security Incident Response Team',
    short: 'Zespół reagowania na incydenty bezpieczeństwa, odpowiednik CERT w terminologii NIS2.',
    long: 'CSIRT (Computer Security Incident Response Team) to zespół zajmujący się przyjmowaniem zgłoszeń o incydentach, ich analizą i koordynowaniem reagowania. Dyrektywa NIS2 i ustawa o KSC posługują się tym terminem w odniesieniu do krajowych struktur (CSIRT NASK, CSIRT GOV, CSIRT MON). Organizacje objęte KSC muszą zgłaszać poważne incydenty do właściwego CSIRT.'
  },
  DLP: {
    full: 'Data Loss Prevention',
    short: 'System zapobiegający wyciekom danych: monitoruje i blokuje nieautoryzowany transfer.',
    long: 'DLP (Data Loss Prevention) to narzędzia i polityki zapobiegające nieautoryzowanemu transferowi wrażliwych danych poza organizację. Monitorują ruch sieciowy, pocztę e-mail, urządzenia USB i chmurę. DLP pomaga spełnić wymagania RODO dotyczące ochrony danych osobowych i chroni przed zagrożeniami wewnętrznymi (insider threats).'
  },
  DORA: {
    full: 'Digital Operational Resilience Act',
    short: 'Unijne rozporządzenie o operacyjnej odporności cyfrowej sektora finansowego.',
    long: 'DORA (Digital Operational Resilience Act) to rozporządzenie UE 2022/2554, które od 17 stycznia 2025 roku obowiązuje cały sektor finansowy UE: banki, ubezpieczycieli, firmy inwestycyjne, giełdy, a także ich dostawców ICT. Definiuje 5 filarów: zarządzanie ryzykiem ICT, zarządzanie incydentami, testy odporności (TLPT), ryzyko dostawców i wymianę informacji.'
  },
  DPO: {
    full: 'Data Protection Officer',
    short: 'Inspektor Ochrony Danych, wymagany przez RODO w wielu organizacjach.',
    long: 'DPO (Data Protection Officer), po polsku Inspektor Ochrony Danych (IOD), to funkcja obowiązkowa dla wielu organizacji zgodnie z RODO. DPO doradza w sprawach ochrony danych osobowych, monitoruje zgodność z RODO i jest punktem kontaktowym dla organu nadzorczego (UODO). Ważne: DPO ≠ CISO, to dwie różne funkcje z różnym zakresem odpowiedzialności.'
  },
  EDR: {
    full: 'Endpoint Detection and Response',
    short: 'Zaawansowana ochrona stacji roboczych: wykrywa zagrożenia na urządzeniach końcowych i na nie reaguje.',
    long: 'EDR (Endpoint Detection and Response) to następca klasycznego antywirusa. Monitoruje zachowanie procesów na stacjach roboczych i serwerach, wykrywa anomalie i umożliwia szybką reakcję: izolację urządzenia, zebranie dowodów, usunięcie zagrożenia. Przykłady: CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne. EDR jest częścią szerszej koncepcji XDR.'
  },
  XDR: {
    full: 'Extended Detection and Response',
    short: 'Rozszerzone wykrywanie i reagowanie: łączy dane z sieci, chmury i urządzeń końcowych.',
    long: 'XDR (Extended Detection and Response) rozszerza EDR o dane z sieci (NDR), poczty, chmury i aplikacji. Daje analitykowi SOC jednolity obraz zagrożeń w całej infrastrukturze. Koreluje zdarzenia z różnych źródeł, przez co ogranicza zmęczenie alertami. Przykłady: Microsoft Defender XDR, Palo Alto Cortex XDR, CrowdStrike Falcon XDR.'
  },
  NDR: {
    full: 'Network Detection and Response',
    short: 'Wykrywanie zagrożeń w ruchu sieciowym, uzupełniające EDR o widoczność sieci.',
    long: 'NDR (Network Detection and Response) analizuje ruch sieciowy w poszukiwaniu anomalii i oznak włamania. Wykrywa zagrożenia, które omijają ochronę na urządzeniach końcowych, np. ruch lateralny wewnątrz sieci albo komunikację z serwerami C2. NDR jest częścią architektury XDR i uzupełnia EDR o widoczność sieci.'
  },
  MDR: {
    full: 'Managed Detection and Response',
    short: 'Zarządzane wykrywanie i reagowanie: outsourcing funkcji SOC do zewnętrznego dostawcy.',
    long: 'MDR (Managed Detection and Response) to usługa, w której zewnętrzny dostawca (MSSP) przejmuje operacyjne funkcje SOC: monitorowanie, wykrywanie zagrożeń i reagowanie na incydenty. MDR łączy technologię (SIEM, EDR, XDR) z zespołem ludzkich analityków. MDR jest dla organizacji, które nie chcą lub nie mogą budować własnego SOC.'
  },
  IAM: {
    full: 'Identity and Access Management',
    short: 'Zarządzanie tożsamością i dostępem: kto ma dostęp, do czego, kiedy i jak.',
    long: 'IAM (Identity and Access Management) to zestaw procesów i technologii do zarządzania tożsamościami cyfrowymi i uprawnieniami dostępu. Obejmuje uwierzytelnianie (kto to jest?), autoryzację (co może robić?) i audyt (co robił?). IAM wdraża zasadę minimalnych uprawnień (least privilege) i jest podstawą Zero Trust. Przykłady: Microsoft Entra ID, Okta, SailPoint.'
  },
  PAM: {
    full: 'Privileged Access Management',
    short: 'Zarządzanie dostępem uprzywilejowanym: szczególna kontrola kont administratorów.',
    long: 'PAM (Privileged Access Management) to wyspecjalizowana część IAM skupiona na kontach z podwyższonymi uprawnieniami: administratorów systemów, baz danych i sieci. Przechowuje hasła w sejfie (vault), wymusza MFA, nagrywa sesje i rotuje hasła. Konta uprzywilejowane to najcenniejszy cel atakujących: przejęcie jednego konta administratora daje dostęp do całej infrastruktury.'
  },
  IDS: {
    full: 'Intrusion Detection System',
    short: 'System wykrywania włamań: monitoruje sieć i generuje alarmy, ale nie blokuje ruchu.',
    long: 'IDS (Intrusion Detection System) to system pasywny, który monitoruje ruch sieciowy lub logi systemowe i generuje alarmy, gdy wykryje podejrzane wzorce. W przeciwieństwie do IPS nie blokuje ruchu, tylko informuje. Stosuje się go, gdy blokowanie jest zbyt ryzykowne (np. w środowiskach przemysłowych), albo jako uzupełnienie IPS dla szerszej widoczności.'
  },
  IPS: {
    full: 'Intrusion Prevention System',
    short: 'System zapobiegania włamaniom: aktywnie blokuje podejrzany ruch sieciowy.',
    long: 'IPS (Intrusion Prevention System) to aktywna wersja IDS: wykrywa podejrzany ruch i blokuje go w czasie rzeczywistym. Zwykle jest wbudowany w NGFW albo działa jako osobne urządzenie w sieci. IPS chroni przed exploitami znanych podatności, skanowaniem portów i atakami brute-force. Wymaga dokładnego strojenia, by nie blokować legalnego ruchu.'
  },
  ISMS: {
    full: 'Information Security Management System',
    short: 'System zarządzania bezpieczeństwem informacji zgodny z normą ISO/IEC 27001.',
    long: 'ISMS (Information Security Management System) to udokumentowany system zarządzania bezpieczeństwem informacji zgodny z normą ISO/IEC 27001. Obejmuje polityki, procedury, role, procesy i kontrole techniczne. Opiera się na cyklu ciągłego doskonalenia PDCA (Plan-Do-Check-Act). Certyfikacja ISO 27001 potwierdza, że organizacja ma wdrożony i audytowany ISMS.'
  },
  KSC: {
    full: 'Krajowy System Cyberbezpieczeństwa',
    short: 'Polski system wdrażający dyrektywę NIS2, który określa obowiązki podmiotów kluczowych i ważnych.',
    long: 'KSC (Krajowy System Cyberbezpieczeństwa) to polska ustawa implementująca dyrektywę NIS2. Nowelizacja KSC 2.0 weszła w życie 3 kwietnia 2026 roku. Ustawa dzieli podmioty na kluczowe i ważne, nakłada obowiązki wdrożenia SZBI, szacowania ryzyka, zgłaszania incydentów do CSIRT oraz audytów (podmioty kluczowe co najmniej raz na 3 lata). Za naruszenia grożą kary do 10 mln EUR lub 2% przychodów (podmioty kluczowe) i do 7 mln EUR lub 1,4% przychodów (podmioty ważne).'
  },
  MFA: {
    full: 'Multi-Factor Authentication',
    short: 'Uwierzytelnianie wieloskładnikowe: samo hasło nie wystarcza, potrzebny jest drugi czynnik.',
    long: 'MFA (Multi-Factor Authentication) wymaga potwierdzenia tożsamości co najmniej dwoma różnymi czynnikami: coś, co wiesz (hasło), coś, co masz (telefon, token), coś, czym jesteś (biometria). MFA to jedna z najskuteczniejszych i najtańszych kontroli bezpieczeństwa: mocno ogranicza skuteczność ataków na konta z użyciem wykradzionych haseł. Wymagają go NIS2, DORA i standardy branżowe.'
  },
  MSSP: {
    full: 'Managed Security Service Provider',
    short: 'Dostawca zarządzanych usług bezpieczeństwa: zewnętrzny SOC na wynajem.',
    long: 'MSSP (Managed Security Service Provider) to firma zewnętrzna świadcząca usługi bezpieczeństwa: monitoring 24/7, zarządzanie SIEM, MDR, zarządzanie podatnościami i reagowanie na incydenty. Umożliwia małym i średnim organizacjom dostęp do ekspertów bezpieczeństwa bez budowania własnego SOC. Przy wyborze najważniejsze są SLA (czas reakcji) i zapisy umowy dotyczące dostępu do danych.'
  },
  NIS2: {
    full: 'Network and Information Security Directive 2',
    short: 'Unijna dyrektywa o bezpieczeństwie sieci i systemów informacyjnych, która zastąpiła NIS z 2016 r.',
    long: 'NIS2 (Dyrektywa 2022/2555) to unijna dyrektywa, która znacznie poszerzyła obowiązki z zakresu cyberbezpieczeństwa w porównaniu z pierwotną NIS. Objęła nowe sektory (produkcja, poczta, wodociągi), rozszerzyła kategorie podmiotów i zaostrzyła wymogi: wdrożenie SZBI, szacowanie ryzyka, zgłaszanie incydentów w 24h/72h, zarządzanie ryzykiem dostawców. Polska wdrożyła ją nowelizacją KSC, która weszła w życie 3.04.2026.'
  },
  NIST: {
    full: 'National Institute of Standards and Technology',
    short: 'Amerykańska agencja standaryzacji, twórca NIST CSF i SP 800-53.',
    long: 'NIST (National Institute of Standards and Technology) to amerykańska agencja federalna opracowująca standardy i wytyczne dla cyberbezpieczeństwa. Najważniejsze publikacje: NIST Cybersecurity Framework (CSF) 2.0, NIST SP 800-53 (katalog kontroli), NIST SP 800-171. W Polsce nie są obowiązkowe, ale na świecie służą jako punkt odniesienia i są podstawą wielu certyfikacji branżowych.'
  },
  CSF: {
    full: 'Cybersecurity Framework',
    short: 'Ramowy model NIST do zarządzania ryzykiem cyberbezpieczeństwa, oparty na 6 funkcjach.',
    long: 'NIST CSF (Cybersecurity Framework) to powszechnie stosowany model zarządzania ryzykiem cyberbezpieczeństwa, opracowany przez NIST. Wersja 2.0 (2024) definiuje 6 funkcji: Govern (Zarządzaj), Identify (Identyfikuj), Protect (Chroń), Detect (Wykrywaj), Respond (Reaguj), Recover (Odtwarzaj). CSF nie zależy od branży ani wielkości organizacji i dobrze sprawdza się jako punkt wyjścia do budowy programu cyberbezpieczeństwa.'
  },
  RODO: {
    full: 'Rozporządzenie o Ochronie Danych Osobowych',
    short: 'Polska nazwa GDPR, unijnego rozporządzenia o ochronie danych osobowych.',
    long: 'RODO to polska nazwa GDPR (General Data Protection Regulation), czyli rozporządzenia UE 2016/679 o ochronie danych osobowych. Obowiązuje od maja 2018 roku i nakłada obowiązki na organizacje przetwarzające dane osób z UE: podstawa prawna przetwarzania, prawa osób i odpowiednie środki techniczne i organizacyjne. Administrator zgłasza naruszenie do UODO bez zbędnej zwłoki, w miarę możliwości do 72 h od stwierdzenia, chyba że jest mało prawdopodobne ryzyko naruszenia praw lub wolności osób. Powiadomienie osób dotyczy wysokiego ryzyka, z wyjątkami z art. 34. Kary do 20 mln EUR lub 4% obrotu.'
  },
  GDPR: {
    full: 'General Data Protection Regulation',
    short: 'Unijne rozporządzenie o ochronie danych osobowych, w Polsce znane jako RODO.',
    long: 'GDPR (General Data Protection Regulation): patrz RODO. To rozporządzenie UE 2016/679, obowiązujące od 25 maja 2018 roku. Nakłada wymagania ochrony danych osobowych na wszystkie organizacje przetwarzające dane mieszkańców UE, niezależnie od siedziby firmy. Najważniejsze zasady: privacy by design, privacy by default, prawo do bycia zapomnianym, przenoszalność danych.'
  },
  SIEM: {
    full: 'Security Information and Event Management',
    short: 'Mózg SOC: zbiera logi z całej infrastruktury, koreluje zdarzenia i generuje alarmy.',
    long: 'SIEM (Security Information and Event Management) to centralne narzędzie SOC, które zbiera logi i zdarzenia z całej infrastruktury (serwery, sieć, aplikacje, chmura), koreluje je w czasie rzeczywistym i generuje alarmy, gdy wzorzec wskazuje na zagrożenie. Analogia: centrala, do której spływa obraz ze wszystkich kamer i sygnały z czujników i która włącza alarm, gdy coś nie pasuje. Przykłady: Splunk, Microsoft Sentinel, IBM QRadar, Elastic SIEM.'
  },
  SOAR: {
    full: 'Security Orchestration, Automation and Response',
    short: 'Automatyzacja reagowania na incydenty: SOAR wykonuje powtarzalne zadania za analityka.',
    long: 'SOAR (Security Orchestration, Automation and Response) to platforma integrująca narzędzia bezpieczeństwa i automatyzująca powtarzalne zadania reagowania na incydenty. Gdy SIEM wykryje phishing, SOAR może automatycznie: zablokować adres IP, poddać kwarantannie e-mail, utworzyć zgłoszenie (ticket) i powiadomić analityka. SOAR zdejmuje z analityków proste, rutynowe działania. Przykłady: Palo Alto XSOAR, Splunk SOAR, Microsoft Sentinel Playbooks.'
  },
  SOC: {
    full: 'Security Operations Center',
    short: 'Centrum operacji bezpieczeństwa: zespół, który 24/7 monitoruje zagrożenia i na nie reaguje.',
    long: 'SOC (Security Operations Center) to wyspecjalizowany zespół (lub centrum) odpowiedzialny za ciągły monitoring, wykrywanie i reagowanie na incydenty bezpieczeństwa. SOC pracuje 24/7/365, korzysta z SIEM, SOAR, EDR i innych narzędzi. Tworzą go ludzie (analitycy L1/L2/L3), procesy (playbooki, IR) i technologia. Organizacja może mieć własny SOC, zlecić go MSSP lub wybrać model hybrydowy.'
  },
  TLPT: {
    full: 'Threat-Led Penetration Testing',
    short: 'Zaawansowany test penetracyjny oparty na aktualnym wywiadzie o zagrożeniach, wymagany przez DORA.',
    long: 'TLPT (Threat-Led Penetration Testing) to zaawansowana forma testu penetracyjnego, w której scenariusze ataków są oparte na aktualnym wywiadzie o zagrożeniach (threat intelligence) specyficznych dla testowanej organizacji i sektora. DORA wymaga, by największe instytucje finansowe przeprowadzały TLPT co 3 lata. W UE obowiązuje standard TIBER-EU. Test angażuje red team (atakujący) i blue team (obrońcy).'
  },
  WAF: {
    full: 'Web Application Firewall',
    short: 'Zapora chroniąca aplikacje webowe przed atakami SQL injection, XSS i innymi.',
    long: 'WAF (Web Application Firewall) to wyspecjalizowana zapora, która stoi przed aplikacjami webowymi i chroni je przed atakami warstwy aplikacji: SQL injection, Cross-Site Scripting (XSS), CSRF i innymi. Analizuje ruch HTTP/HTTPS i blokuje złośliwe żądania. WAF może być sprzętowy, programowy lub chmurowy (np. AWS WAF, Cloudflare WAF, F5). Wymagany dla aplikacji przetwarzających dane wrażliwe.'
  },
  NGFW: {
    full: 'Next-Generation Firewall',
    short: 'Zapora nowej generacji: łączy tradycyjny firewall z IPS, analizą aplikacji i odszyfrowywaniem SSL.',
    long: 'NGFW (Next-Generation Firewall) to zapora sieciowa łącząca klasyczną filtrację pakietów z zaawansowanymi funkcjami: głęboką inspekcją pakietów (DPI), IPS, identyfikacją aplikacji (nie tylko portów), odszyfrowywaniem SSL/TLS i filtrowaniem URL. Przykłady: Palo Alto Networks, Fortinet FortiGate, Cisco Firepower. W nowoczesnej infrastrukturze NGFW zastąpił tradycyjne firewalle.'
  },
  VPN: {
    full: 'Virtual Private Network',
    short: 'Wirtualna sieć prywatna: szyfrowany tunel do bezpiecznego zdalnego dostępu.',
    long: 'VPN (Virtual Private Network) tworzy przez internet szyfrowany tunel, który umożliwia bezpieczny zdalny dostęp do zasobów organizacji. Klasyczny VPN (site-to-site lub client-to-site) zapewnia dostęp do całej sieci korporacyjnej po uwierzytelnieniu. W modelu Zero Trust zastępuje go ZTNA (Zero Trust Network Access), które daje dostęp tylko do konkretnych aplikacji, a nie do całej sieci.'
  },
  ISO: {
    full: 'International Organization for Standardization',
    short: 'Organizacja normalizacyjna, wydawca norm ISO/IEC 27001 i innych standardów bezpieczeństwa.',
    long: 'ISO (International Organization for Standardization) to globalna organizacja opracowująca normy techniczne. W cyberbezpieczeństwie najważniejsza jest rodzina ISO/IEC 27000: norma 27001 (wymagania dla ISMS), 27002 (dobre praktyki kontroli), 27005 (zarządzanie ryzykiem). Certyfikacja ISO/IEC 27001 to jedyna powszechnie uznawana certyfikacja systemu zarządzania bezpieczeństwem informacji. Wymaga audytu przeprowadzonego przez akredytowaną jednostkę certyfikującą.'
  },
};
