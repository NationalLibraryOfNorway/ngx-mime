import { HelpIntl } from './help-intl';

export class HelpIntlNoNb extends HelpIntl {
  override helpLabel = 'Hjelp';
  override line1 =
    '<strong>PIL VENSTRE</strong> eller <strong>PAGE UP</strong>: Gå til forrige side';
  override line2 =
    '<strong>PIL HØYRE</strong> eller <strong>PAGE DOWN</strong>: Gå til neste side';
  override line3 = '<strong>HOME</strong>: Gå til første side';
  override line4 = '<strong>END</strong>: Gå til siste side';
  override line5 =
    '<strong>C</strong>: Slår innholdsfanen på, og viser mer informasjon/metadata om objektet. (Lukk med <strong>ESC</strong>-tasten.)';
  override line6 =
    '<strong>S</strong>: Åpner søkefeltet for søk i objektet. (Lukk med <strong>ESC</strong>-tasten.)';
  override line7 = '<strong>N</strong>: Går til neste treff i objektet';
  override line8 = '<strong>P</strong>: Går til forrige treff i objektet';
  override line9 =
    '<strong>F</strong>: Fullskjerm av og på (Lukk med <strong>F</strong> eller <strong>ESC</strong>-tasten.)';
  override line10 = '<strong>R</strong>: Rotér 90°';
  override line11 =
    '<strong>T</strong>: Vis/skjul optisk gjenkjent tekst (for innhold som kan vises).';
  override line12 = '<strong>Shift-S</strong>: Tøm søk i tekst';
}
