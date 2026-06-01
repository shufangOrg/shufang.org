/**
 * Fix CE - fix composition for CJK-English mixed web posts.
 * https://github.com/jsntn/fix-ce
 *
 * @version  1.0
 * @author   Jason TIAN (https://jsntn.com)
 *
 * Usage:
 *   <script src="/js/fix-ce.js" data-target="post"></script>
 */

(function() {
  var script = document.currentScript;
  var targetId = script.dataset.target || script.src.replace(/^[^\?]+\??/, '').split('id=')[1];
  if (!targetId) return;

  var el = document.getElementById(targetId);
  if (!el) return;

  // Full CJK range: Unified, Extension A, Radicals, Compatibility,
  // Hiragana, Katakana, Hangul, CJK Punctuation, Fullwidth forms
  var CJK = '\u2e80-\u9fff\uf900-\ufaff\u3040-\u30ff\u31f0-\u31ff\uac00-\ud7af\u3000-\u303f\uff00-\uffef';
  var PUNCT = '\u0021\u0029\u002e\u003f';

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, CODE: 1, PRE: 1, TEXTAREA: 1, KBD: 1 };

  function walkTextNodes(node, fn) {
    if (SKIP_TAGS[node.nodeName]) return;
    if (node.nodeType === 3) {
      fn(node);
    } else {
      for (var i = 0; i < node.childNodes.length; i++) {
        walkTextNodes(node.childNodes[i], fn);
      }
    }
  }

  function fixText(text) {
    var cjk = '[' + CJK + ']';
    var nonCjk = '[^' + CJK + ']';
    var punct = '[' + PUNCT + ']';

    // Fix curly quotes to straight in English context

    // \u201cword\u201d or \u2018word\u2019 (letters/numbers wrapped in curly quotes)
    text = text.replace(new RegExp('\u201c([a-zA-Z0-9]+)\u201d', 'g'), '"$1"');
    text = text.replace(new RegExp('\u2018([a-zA-Z0-9]+)\u2019', 'g'), "'$1'");

    // Apostrophes between letters: let\u2019s, don\u2019t
    text = text.replace(new RegExp('([a-zA-Z])[\u2018\u2019]([a-zA-Z])', 'g'), "$1'$2");

    // Single quotes adjacent to non-CJK: done\u2019 or \u2018start
    text = text.replace(new RegExp('([a-zA-Z]' + punct + '?)[\u2018\u2019](' + nonCjk + ')', 'g'), "$1'$2");
    text = text.replace(new RegExp('(' + nonCjk + ')[\u2018\u2019]([a-zA-Z])', 'g'), "$1'$2");
    text = text.replace(new RegExp('(' + nonCjk + ')[\u2018\u2019](' + nonCjk + ')', 'g'), "$1'$2");

    // Double quotes adjacent to non-CJK
    text = text.replace(new RegExp('([a-zA-Z]' + punct + '?)[\u201c\u201d](' + nonCjk + ')', 'g'), '$1"$2');
    text = text.replace(new RegExp('(' + nonCjk + ')[\u201c\u201d]([a-zA-Z])', 'g'), '$1"$2');
    text = text.replace(new RegExp('(' + nonCjk + ')[\u201c\u201d](' + nonCjk + ')', 'g'), '$1"$2');

    // Add space between CJK and Latin/numbers
    text = text.replace(new RegExp('([a-zA-Z0-9])(' + cjk + ')', 'g'), '$1 $2');
    text = text.replace(new RegExp('(' + cjk + ')([a-zA-Z0-9])', 'g'), '$1 $2');

    return text;
  }

  walkTextNodes(el, function(node) {
    var result = fixText(node.nodeValue);
    if (result !== node.nodeValue) {
      node.nodeValue = result;
    }
  });
})();
