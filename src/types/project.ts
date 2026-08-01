export type StatusProjekta =
  | 'U pripremi'
  | 'U izgradnji'
  | 'Završen'
  | 'Stagnira'
  | 'Odobren'
  | 'Podnesen zahtjev';

export type Valuta = 'EUR' | 'USD' | 'HRK' | 'GBP' | 'CHF';

export type StatusPrihoda =
  | 'Odobreno'
  | 'Ugovoreno'
  | 'Osigurano'
  | 'Podnesen zahtjev'
  | 'U pregovorima'
  | 'Odbijeno'
  | 'Na čekanju';

export type KategorijaRashoda =
  | 'Oprema'
  | 'Građevina'
  | 'Infrastruktura'
  | 'Administracija'
  | 'Usluge'
  | 'Rezerva'
  | 'Marketing'
  | 'Ostalo';

export interface Prihod {
  izvor: string;
  iznos: number;
  status: StatusPrihoda | string;
}

export interface Rashod {
  stavka: string;
  iznos: number;
  kategorija: KategorijaRashoda | string;
}

export interface Financije {
  ukupni_budzet: number;
  valuta: Valuta;
  prihodi: Prihod[];
  rashodi: Rashod[];
}

export interface ClanTima {
  ime: string;
  uloga: string;
  kontakt: string;
}

export interface Dokument {
  naziv: string;
  url: string;
}

export interface Fotografija {
  url: string;
  alt: string;
  opis?: string;
}

export interface EULogo {
  url: string;
  naziv_institucije: string;
  alt: string;
  web?: string;
}

export interface Partner {
  naziv: string;
  logo?: string;
  web?: string;
  uloga: string;
  drzava?: string;
}

export interface Kontakt {
  email: string;
  telefon: string;
}

export interface Projekt {
  id: string;
  poddomena: string;
  naziv: string;
  opis: string;
  lokacija: string;
  status: StatusProjekta;
  pocetak: string;
  zavrsetak: string;
  vlasnik: string;
  kontakt: Kontakt;
  financije: Financije;
  tim: ClanTima[];
  dokumenti?: Dokument[];
  logo_projekta?: string;
  fotografije: Fotografija[];
  eu_logoi?: EULogo[];
  partneri?: Partner[];
}

export interface ProjektiData {
  $schema?: string;
  projekti: Projekt[];
}
