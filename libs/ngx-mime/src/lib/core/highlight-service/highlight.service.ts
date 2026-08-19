import { Injectable } from '@angular/core';
import { Hit } from './../../core/models/hit';

@Injectable()
export class HighlightService {
  highlightSelectedHit(id: number): void {
    document
      .querySelectorAll('mark.selectedHit')
      .forEach((el) => el.classList.remove('selectedHit'));

    document
      .querySelectorAll(`mark[data-id="${id}"]`)
      .forEach((el) => el.classList.add('selectedHit'));
  }

  highlight(
    html: string,
    currentIndex: number,
    hits?: Hit[] | undefined,
  ): string {
    if (!html || !hits?.length) return html ?? '';

    for (const hit of hits) {
      if (hit.index === currentIndex) {
        html = this.markHtml(html, hit.match, hit.id);
      }
    }
    return html;
  }

  /**
   * Replace ONLY the first occurrence that is NOT already inside <mark>.
   * Matches the (normalized) pattern literally, including punctuation and spaces.
   */
  private markHtml(html: string, pattern: string, id?: number): string {
    if (!html || !pattern) return html;

    const normalized = this.normalizePattern(pattern);
    if (!normalized) return html;

    const re = this.buildPhraseRegex(pattern);

    // Use DOM so we can skip text already inside <mark> (true "node" behavior)
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const root = doc.body;

    const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node: Node) => {
        const text = node.nodeValue ?? '';
        if (!text) return NodeFilter.FILTER_REJECT;

        // ✅ don't replace nodes already inside a mark
        if ((node.parentElement as Element | null)?.closest('mark')) {
          return NodeFilter.FILTER_REJECT;
        }

        re.lastIndex = 0;
        return re.test(text)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });

    const textNode = walker.nextNode() as Text | null;
    if (!textNode) return html;

    const text = textNode.nodeValue ?? '';
    re.lastIndex = 0;
    const m = re.exec(text);
    if (!m) return html;

    const start = m.index;
    const end = start + m[0].length;

    const frag = doc.createDocumentFragment();
    if (start > 0) frag.append(text.slice(0, start));

    const mark = doc.createElement('mark');
    if (id != null) mark.setAttribute('data-id', String(id));
    mark.textContent = m[0];
    frag.append(mark);

    if (end < text.length) frag.append(text.slice(end));

    textNode.parentNode?.replaceChild(frag, textNode);

    return root.innerHTML;
  }

  private normalizePattern(pattern: string): string {
    // Keep original behavior: if it starts with ", remove only that first char
    const cleaned = pattern.charAt(0) === '"' ? pattern.substring(1) : pattern;
    return cleaned;
  }

  private buildPhraseRegex(pattern: string): RegExp {
    // original behavior: drop only leading quote
    let cleaned = pattern.charAt(0) === '"' ? pattern.substring(1) : pattern;

    // detect trailing whitespace (very common in ALTO hits)
    const hasTrailingWs = /\s$/.test(cleaned);

    // keep the core phrase without trailing whitespace
    cleaned = cleaned.replace(/\s+$/, '');

    // escape metacharacters, but keep whitespace handling separate
    const escaped = cleaned.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');

    // flexible whitespace inside the phrase
    let phrase = escaped.replace(/\s+/g, '\\s+');

    // ✅ if match had trailing whitespace, allow it OR allow punctuation immediately
    if (hasTrailingWs) {
      phrase += `(?:\\s+)?`;
    }

    const WORD = `[\\p{L}\\p{N}_]`;
    return new RegExp(`(?<!${WORD})${phrase}(?!${WORD})`, 'u');
  }
}
