import { HelpIntl } from './help-intl';

export class HelpIntlLt extends HelpIntl {
  override helpLabel = 'Pagalba';
  override line1 =
    '<strong>RODYKLĖ KAIRĖN</strong> arba <strong>PAGE UP</strong>: Buvęs puslapis';
  override line2 =
    '<strong>RODYKLĖ DEŠINĖN</strong> arba <strong>PAGE DOWN</strong>: Kitas puslapis';
  override line3 = '<strong>HOME</strong>: Pirmas puslapis';
  override line4 = '<strong>END</strong>: Paskutinis puslapis';
  override line5 =
    '<strong>C</strong>: Rodyti daugiau informacijos apie objektą. (Uždarykite su <strong>ESC</strong>.)';
  override line6 =
    '<strong>S</strong>: Paieška objekto viduje. (Uždarykite su <strong>ESC</strong>.)';
  override line7 = '<strong>N</strong>: Kitas rezultatas';
  override line8 = '<strong>P</strong>: Buvęs rezultatas';
  override line9 =
    '<strong>F</strong>: Pilno ekrano režimas (Uždarykite su <strong>F</strong> arba <strong>ESC</strong>.)';
  override line10 = '<strong>R</strong>: Pasukti 90 laipsnių';
  override line11 =
    '<strong>T</strong>:  Rodyti/slėpti optiškai atpažįstamą tekstą (turiniui, kurį galima rodyti).';
  override line12 = '<strong>Shift-S</strong>: Ištuštinkite teksto paiešką';
}
