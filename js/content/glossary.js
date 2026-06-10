/**
 * GLOSSARY - słownik akronimów cyberbezpieczeństwa
 * Źródło: "Cyberbezpieczeństwo w organizacjach - przewodnik porządkujący"
 */

export const GLOSSARY = {
  APT: {
    full: 'Advanced Persistent Threat',
    short: 'Zaawansowany, długotrwały atak celowany - często sponsorowany przez państwo.',
    long: 'APT (Advanced Persistent Threat) to zaawansowany, długotrwały atak celowany wymierzony w konkretną organizację. Atakujący penetruje sieć, ukrywa się przez miesiące lub lata i eksfiltruje dane. Często stoją za nimi grupy sponsorowane przez państwa - np. Fancy Bear (Rosja), Lazarus Group (Korea Północna).'
  },
  BCP: {
    full: 'Business Continuity Plan',
    short: 'Plan zapewnienia ciągłości działania organizacji podczas poważnych zakłóceń.',
    long: 'BCP (Business Continuity Plan) to dokument opisujący, jak organizacja będzie funkcjonować podczas poważnych zakłóceń - awarii, ataku cybernetycznego, klęski żywiołowej. Definiuje krytyczne procesy, alternatywne sposoby ich realizacji i priorytety odtwarzania. Uzupełnieniem BCP jest DRP (Disaster Recovery Plan) skupiający się na odtwarzaniu systemów IT.'
  },
  DRP: {
    full: 'Disaster Recovery Plan',
    short: 'Plan odtwarzania systemów IT po poważnej awarii lub ataku.',
    long: 'DRP (Disaster Recovery Plan) to szczegółowy plan techniczny odtwarzania systemów informatycznych po katastrofie, awarii lub ataku. Określa cele RTO (Recovery Time Objective - maksymalny czas odtworzenia) i RPO (Recovery Point Objective - maksymalna utrata danych). DRP jest techniczną częścią szerszego BCP.'
  },
  CIA: {
    full: 'Confidentiality, Integrity, Availability',
    short: 'Triada bezpieczeństwa: Poufność, Integralność, Dostępność - fundament cyberbezpieczeństwa.',
    long: 'CIA Triad to trzy podstawowe właściwości, które ochrona informacji powinna zapewnić: Confidentiality (Poufność) - dane dostępne tylko dla uprawnionych, Integrity (Integralność) - dane niezmienione bez autoryzacji, Availability (Dostępność) - systemy dostępne gdy są potrzebne. Każdy incydent cyberbezpieczeństwa narusza co najmniej jedną z tych właściwości.'
  },
  CISO: {
    full: 'Chief Information Security Officer',
    short: 'Dyrektor ds. bezpieczeństwa informacji - odpowiada za strategię i zarządzanie cyberbezpieczeństwem.',
    long: 'CISO (Chief Information Security Officer) to dyrektor ds. bezpieczeństwa informacji, odpowiadający za całościową strategię cyberbezpieczeństwa organizacji, zarządzanie ryzykiem, zgodność z przepisami i budowanie kultury bezpieczeństwa. Raportuje do zarządu lub CEO. Różni się od DPO - CISO odpowiada za całe bezpieczeństwo IT, DPO wyłącznie za ochronę danych osobowych.'
  },
  CERT: {
    full: 'Computer Emergency Response Team',
    short: 'Zespół reagowania na incydenty komputerowe - krajowy lub sektorowy.',
    long: 'CERT (Computer Emergency Response Team) to zespół specjalistów reagujących na incydenty bezpieczeństwa. W Polsce funkcjonują CERT Polska (NASK), CERT GOV PL (ABW) i CERT MON (wojsko). Termin jest często używany zamiennie z CSIRT, choć formalnie CSIRT to nowsze określenie stosowane w regulacjach UE.'
  },
  CSIRT: {
    full: 'Computer Security Incident Response Team',
    short: 'Zespół reagowania na incydenty bezpieczeństwa - odpowiednik CERT w nomenklaturze NIS2.',
    long: 'CSIRT (Computer Security Incident Response Team) to zespół zajmujący się przyjmowaniem zgłoszeń o incydentach, ich analizą i koordynowaniem reagowania. Dyrektywa NIS2 i ustawa o KSC posługują się tym terminem w odniesieniu do krajowych struktur (CSIRT NASK, CSIRT GOV, CSIRT MON). Organizacje objęte KSC mają obowiązek zgłaszania poważnych incydentów do właściwego CSIRT.'
  },
  DLP: {
    full: 'Data Loss Prevention',
    short: 'System zapobiegający wyciekowi danych – monitoruje i blokuje nieautoryzowany transfer.',
    long: 'DLP (Data Loss Prevention) to narzędzia i polityki zapobiegające nieautoryzowanemu transferowi wrażliwych danych poza organizację. Monitorują ruch sieciowy, pocztę e-mail, urządzenia USB i chmurę. DLP wspiera realizację wymagań RODO dotyczących ochrony danych osobowych i chroni przed zagrożeniami wewnętrznymi (insider threats).'
  },
  DORA: {
    full: 'Digital Operational Resilience Act',
    short: 'Unijne rozporządzenie o operacyjnej odporności cyfrowej sektora finansowego.',
    long: 'DORA (Digital Operational Resilience Act) to rozporządzenie UE 2022/2554, które od 17 stycznia 2025 roku obowiązuje cały sektor finansowy UE: banki, ubezpieczycieli, firmy inwestycyjne, giełdy, a także ich dostawców ICT. Definiuje 5 filarów: zarządzanie ryzykiem ICT, zarządzanie incydentami, testy odporności (TLPT), ryzyko dostawców i wymianę informacji.'
  },
  DPO: {
    full: 'Data Protection Officer',
    short: 'Inspektor Ochrony Danych - wymagany przez RODO w wielu organizacjach.',
    long: 'DPO (Data Protection Officer), po polsku Inspektor Ochrony Danych (IOD), to funkcja obowiązkowa dla wielu organizacji zgodnie z RODO. DPO doradza w kwestiach ochrony danych osobowych, monitoruje zgodność z RODO i jest punktem kontaktowym dla organu nadzorczego (UODO). Ważne: DPO ≠ CISO - to zupełnie różne funkcje o różnych zakresach odpowiedzialności.'
  },
  EDR: {
    full: 'Endpoint Detection and Response',
    short: 'Zaawansowana ochrona stacji roboczych - wykrywa i reaguje na zagrożenia na urządzeniach końcowych.',
    long: 'EDR (Endpoint Detection and Response) to następca klasycznego antywirusa. Monitoruje zachowanie procesów na stacjach roboczych i serwerach, wykrywa anomalie i umożliwia szybką reakcję - izolację urządzenia, zebranie dowodów, usunięcie zagrożenia. Przykłady: CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne. EDR jest elementem szerszej koncepcji XDR.'
  },
  XDR: {
    full: 'Extended Detection and Response',
    short: 'Rozszerzone wykrywanie i reagowanie - integruje dane z sieci, chmury i urządzeń końcowych.',
    long: 'XDR (Extended Detection and Response) rozszerza EDR o dane z sieci (NDR), poczty, chmury i aplikacji. Daje analitykowi SOC jednolity obraz zagrożeń w całej infrastrukturze. Redukuje zmęczenie alertami przez korelację zdarzeń z różnych źródeł. Przykłady: Microsoft Defender XDR, Palo Alto Cortex XDR, CrowdStrike Falcon XDR.'
  },
  NDR: {
    full: 'Network Detection and Response',
    short: 'Wykrywanie zagrożeń w ruchu sieciowym - uzupełnienie EDR o widoczność sieci.',
    long: 'NDR (Network Detection and Response) analizuje ruch sieciowy w poszukiwaniu anomalii i oznak włamania. Wykrywa zagrożenia, które omijają ochronę na urządzeniach końcowych - np. ruch lateralny wewnątrz sieci czy komunikację z serwerami C2. NDR jest elementem architektury XDR i uzupełnia EDR o widoczność na poziomie sieci.'
  },
  MDR: {
    full: 'Managed Detection and Response',
    short: 'Zarządzane wykrywanie i reagowanie - outsourcing funkcji SOC do zewnętrznego dostawcy.',
    long: 'MDR (Managed Detection and Response) to usługa, w której zewnętrzny dostawca (MSSP) przejmuje operacyjne funkcje SOC: monitorowanie, wykrywanie zagrożeń i reagowanie na incydenty. MDR łączy technologię (SIEM, EDR, XDR) z zespołem ludzkich analityków. To rozwiązanie dla organizacji, które nie chcą lub nie mogą budować własnego SOC.'
  },
  IAM: {
    full: 'Identity and Access Management',
    short: 'Zarządzanie tożsamością i dostępem - kto może, do czego, kiedy i jak.',
    long: 'IAM (Identity and Access Management) to framework procesów i technologii zarządzających tożsamościami cyfrowymi i uprawnieniami dostępu. Obejmuje uwierzytelnianie (kto to jest?), autoryzację (co może robić?) i audyt (co robił?). IAM realizuje zasadę minimalnych uprawnień (least privilege) i jest fundamentem Zero Trust. Przykłady: Microsoft Entra ID, Okta, SailPoint.'
  },
  PAM: {
    full: 'Privileged Access Management',
    short: 'Zarządzanie dostępem uprzywilejowanym - specjalna kontrola kont administratorów.',
    long: 'PAM (Privileged Access Management) to wyspecjalizowany element IAM skupiony na kontach z podwyższonymi uprawnieniami: administratorów systemów, baz danych, sieci. Przechowuje hasła w sejfie (vault), wymusza MFA, nagrywa sesje i rotuje hasła. Konta uprzywilejowane to najcenniejszy cel atakujących - przejęcie jednego konta admin daje dostęp do całej infrastruktury.'
  },
  IDS: {
    full: 'Intrusion Detection System',
    short: 'System wykrywania włamań - monitoruje sieć i generuje alarmy, ale nie blokuje.',
    long: 'IDS (Intrusion Detection System) to system pasywny, który monitoruje ruch sieciowy lub logi systemowe i generuje alarmy gdy wykryje podejrzane wzorce. W przeciwieństwie do IPS nie blokuje ruchu - tylko informuje. Stosowany gdy blokowanie jest zbyt ryzykowne (np. środowiska przemysłowe) lub jako uzupełnienie IPS dla szerszej widoczności.'
  },
  IPS: {
    full: 'Intrusion Prevention System',
    short: 'System zapobiegania włamaniom - aktywnie blokuje podejrzany ruch sieciowy.',
    long: 'IPS (Intrusion Prevention System) to aktywna wersja IDS - nie tylko wykrywa, ale też blokuje podejrzany ruch w czasie rzeczywistym. Zazwyczaj wbudowany w NGFW lub jako osobne urządzenie w sieci. IPS chroni przed exploitami znanych podatności, skanowaniem portów i atakami brute-force. Wymaga dokładnego strojenia, by nie blokować legalnego ruchu.'
  },
  ISMS: {
    full: 'Information Security Management System',
    short: 'System Zarządzania Bezpieczeństwem Informacji - framework według ISO/IEC 27001.',
    long: 'ISMS (Information Security Management System) to udokumentowany system zarządzania bezpieczeństwem informacji zgodny z normą ISO/IEC 27001. Obejmuje polityki, procedury, role, procesy i kontrole techniczne. Opiera się na cyklu PDCA (Plan-Do-Check-Act) - ciągłe doskonalenie. Certyfikacja ISO 27001 potwierdza, że organizacja ma wdrożony i audytowany ISMS.'
  },
  KSC: {
    full: 'Krajowy System Cyberbezpieczeństwa',
    short: 'Polski system wdrażający dyrektywę NIS2 - określa obowiązki operatorów usług kluczowych.',
    long: 'KSC (Krajowy System Cyberbezpieczeństwa) to polska ustawa implementująca dyrektywę NIS2. Nowelizacja KSC 2.0 wchodzi w życie 3 kwietnia 2026 roku. Ustawa dzieli podmioty na kluczowe i ważne, nakłada obowiązki wdrożenia SZBI, szacowania ryzyka, zgłaszania incydentów do CSIRT oraz regularnych audytów. Za naruszenia grożą kary do 10 mln EUR lub 2% światowego obrotu.'
  },
  MFA: {
    full: 'Multi-Factor Authentication',
    short: 'Uwierzytelnianie wieloskładnikowe – samo hasło nie wystarcza, potrzebny drugi czynnik.',
    long: 'MFA (Multi-Factor Authentication) wymaga potwierdzenia tożsamości co najmniej dwoma różnymi czynnikami: coś co wiesz (hasło), coś co masz (telefon, token), coś czym jesteś (biometria). MFA jest jedną z najskuteczniejszych i najtańszych kontroli bezpieczeństwa – znacząco ogranicza skuteczność ataków na konta wynikających z wykradzionych haseł. Wymagane przez NIS2, DORA i standardy branżowe.'
  },
  MSSP: {
    full: 'Managed Security Service Provider',
    short: 'Dostawca zarządzanych usług bezpieczeństwa - zewnętrzny SOC na wynajem.',
    long: 'MSSP (Managed Security Service Provider) to firma zewnętrzna świadcząca usługi bezpieczeństwa: monitoring 24/7, zarządzanie SIEM, MDR, zarządzanie podatnościami i reagowanie na incydenty. Umożliwia małym i średnim organizacjom dostęp do ekspertów bezpieczeństwa bez budowania własnego SOC. Kluczowe kwestie to SLA (czas reakcji) i zapisy UMOWY dotyczące dostępu do danych.'
  },
  NIS2: {
    full: 'Network and Information Security Directive 2',
    short: 'Unijna dyrektywa o bezpieczeństwie sieci i systemów informacyjnych - zastąpiła NIS z 2016 r.',
    long: 'NIS2 (Dyrektywa 2022/2555) to unijna dyrektywa, która znacząco rozszerzyła zakres obowiązków cyberbezpieczeństwa w stosunku do pierwotnej NIS. Objęła nowe sektory (produkcja, poczta, wodociągi), rozszerzyła kategorie podmiotów i zaostrzymy wymogi - wdrożenie SZBI, szacowanie ryzyka, zgłaszanie incydentów w 24h/72h, zarządzanie ryzykiem dostawców. Polska implementuje ją przez nowelizację KSC (termin: 3.04.2026).'
  },
  NIST: {
    full: 'National Institute of Standards and Technology',
    short: 'Amerykańska agencja standaryzacji - twórca NIST CSF i SP 800-53.',
    long: 'NIST (National Institute of Standards and Technology) to amerykańska agencja federalna opracowująca standardy i wytyczne dla cyberbezpieczeństwa. Najważniejsze publikacje: NIST Cybersecurity Framework (CSF) 2.0, NIST SP 800-53 (katalog kontroli), NIST SP 800-171. Choć są to standardy nieobowiązkowe w Polsce, stanowią globalną referencję i są podstawą wielu certyfikacji branżowych.'
  },
  CSF: {
    full: 'Cybersecurity Framework',
    short: 'Ramowy model NIST do zarządzania ryzykiem cyberbezpieczeństwa - 6 funkcji.',
    long: 'NIST CSF (Cybersecurity Framework) to powszechnie stosowany model zarządzania ryzykiem cyberbezpieczeństwa, opracowany przez NIST. Wersja 2.0 (2024) definiuje 6 funkcji: Govern (Zarządzaj), Identify (Identyfikuj), Protect (Chroń), Detect (Wykrywaj), Respond (Reaguj), Recover (Odtwarzaj). CSF jest niezależny od branży i wielkości organizacji, stanowi dobry punkt startowy dla budowania programu cyberbezpieczeństwa.'
  },
  RODO: {
    full: 'Rozporządzenie o Ochronie Danych Osobowych',
    short: 'Polskie określenie GDPR - regulacja ochrony danych osobowych w UE.',
    long: 'RODO to polska nazwa GDPR (General Data Protection Regulation) - rozporządzenia UE 2016/679 o ochronie danych osobowych. Obowiązuje od maja 2018 roku i nakłada obowiązki na wszystkie organizacje przetwarzające dane osób z UE: podstawa prawna przetwarzania, prawa osób, obowiązek zgłaszania naruszeń do UODO w 72h, wdrożenie odpowiednich środków technicznych i organizacyjnych. Kary do 20 mln EUR lub 4% obrotu.'
  },
  GDPR: {
    full: 'General Data Protection Regulation',
    short: 'Unijne rozporządzenie o ochronie danych osobowych - w Polsce znane jako RODO.',
    long: 'GDPR (General Data Protection Regulation) - patrz RODO. To rozporządzenie UE 2016/679 obowiązujące od 25 maja 2018 roku, nakładające kompleksowe wymagania ochrony danych osobowych na wszystkie organizacje przetwarzające dane mieszkańców UE, niezależnie od siedziby firmy. Kluczowe zasady: privacy by design, privacy by default, prawo do bycia zapomnianym, przenoszalność danych.'
  },
  SIEM: {
    full: 'Security Information and Event Management',
    short: 'Mózg SOC - zbiera logi i koreluje zdarzenia z całej infrastruktury, generując alarmy.',
    long: 'SIEM (Security Information and Event Management) to centralne narzędzie SOC, które zbiera logi i zdarzenia z całej infrastruktury (serwery, sieć, aplikacje, chmura), koreluje je w czasie rzeczywistym i generuje alarmy gdy wzorzec wskazuje na zagrożenie. Analogia: centrala, do której spływają wszystkie kamery i czujniki i która zapala alarm gdy coś nie pasuje. Przykłady: Splunk, Microsoft Sentinel, IBM QRadar, Elastic SIEM.'
  },
  SOAR: {
    full: 'Security Orchestration, Automation and Response',
    short: 'Automatyzacja reagowania na incydenty - SOAR wykonuje powtarzalne zadania zamiast analityka.',
    long: 'SOAR (Security Orchestration, Automation and Response) to platforma integrująca narzędzia bezpieczeństwa i automatyzująca powtarzalne zadania reagowania na incydenty. Gdy SIEM wykryje phishing, SOAR może automatycznie: zablokować adres IP, poddać kwarantannie e-mail, stworzyć ticket i powiadomić analityka. SOAR „odciąża” analityków od prostych, rutynowych działań. Przykłady: Palo Alto XSOAR, Splunk SOAR, Microsoft Sentinel Playbooks.'
  },
  SOC: {
    full: 'Security Operations Center',
    short: 'Centrum operacji bezpieczeństwa - zespół monitorujący i reagujący na zagrożenia 24/7.',
    long: 'SOC (Security Operations Center) to wyspecjalizowany zespół (lub centrum) odpowiedzialny za ciągły monitoring, wykrywanie i reagowanie na incydenty bezpieczeństwa. SOC pracuje 24/7/365, korzysta z SIEM, SOAR, EDR i innych narzędzi. Tworzą go ludzie (analitycy L1/L2/L3), procesy (playbooki, IR) i technologia. Organizacja może mieć własny SOC, outsourcować go do MSSP lub wybrać model hybrydowy.'
  },
  TLPT: {
    full: 'Threat-Led Penetration Testing',
    short: 'Zaawansowany test penetracyjny oparty na aktualnym wywiadzie o zagrożeniach - wymagany przez DORA.',
    long: 'TLPT (Threat-Led Penetration Testing) to zaawansowana forma testu penetracyjnego, w której scenariusze ataków są oparte na aktualnym wywiadzie o zagrożeniach (threat intelligence) specyficznych dla testowanej organizacji i sektora. DORA wymaga przeprowadzania TLPT co 3 lata przez największe instytucje finansowe. W UE obowiązuje standard TIBER-EU. Test angażuje red team (atakujący) i blue team (obrońcy).'
  },
  WAF: {
    full: 'Web Application Firewall',
    short: 'Zapora chroniąca aplikacje webowe przed atakami SQL injection, XSS i innymi.',
    long: 'WAF (Web Application Firewall) to specjalizowana zapora stojąca przed aplikacjami webowymi i chroniąca je przed atakami warstwy aplikacji: SQL injection, Cross-Site Scripting (XSS), CSRF i innymi. Analizuje ruch HTTP/HTTPS i blokuje złośliwe żądania. WAF może być sprzętowy, programowy lub chmurowy (np. AWS WAF, Cloudflare WAF, F5). Wymagany dla aplikacji przetwarzających dane wrażliwe.'
  },
  NGFW: {
    full: 'Next-Generation Firewall',
    short: 'Zapora nowej generacji - łączy tradycyjny firewall z IPS, analizą aplikacji i SSL.',
    long: 'NGFW (Next-Generation Firewall) to zapora sieciowa łącząca klasyczną filtrację pakietów z zaawansowanymi funkcjami: inspekcją głęboką pakietów (DPI), IPS, identyfikacją aplikacji (nie tylko portów), odszyfrowywaniem SSL/TLS i filtrowaniem URL. Przykłady: Palo Alto Networks, Fortinet FortiGate, Cisco Firepower. NGFW zastąpił tradycyjne firewalle w nowoczesnych infrastrukturach.'
  },
  VPN: {
    full: 'Virtual Private Network',
    short: 'Wirtualna sieć prywatna - szyfrowany tunel dla bezpiecznego zdalnego dostępu.',
    long: 'VPN (Virtual Private Network) tworzy szyfrowany tunel przez internet, umożliwiając bezpieczny zdalny dostęp do zasobów organizacji. Klasyczny VPN (site-to-site lub client-to-site) zapewnia dostęp do całej sieci korporacyjnej po uwierzytelnieniu. W modelu Zero Trust zastępowany jest przez rozwiązania ZTNA (Zero Trust Network Access), które dają dostęp tylko do konkretnych aplikacji, nie całej sieci.'
  },
  ISO: {
    full: 'International Organization for Standardization',
    short: 'Organizacja standaryzacyjna - wydawca norm ISO/IEC 27001 i innych standardów bezpieczeństwa.',
    long: 'ISO (International Organization for Standardization) to globalna organizacja opracowująca normy techniczne. W cyberbezpieczeństwie kluczowa jest rodzina ISO/IEC 27000: norma 27001 (ISMS - wymagania), 27002 (dobre praktyki kontroli), 27005 (zarządzanie ryzykiem). Certyfikacja ISO/IEC 27001 to jedyna powszechnie uznawana certyfikacja systemu zarządzania bezpieczeństwem informacji - wymaga audytu przez akredytowaną jednostkę certyfikującą.'
  },
};
