import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../../data/glossary';
import type { GlossaryItem } from '../../types/glossary';
import { GlossaryPopup } from './GlossaryPopup';

interface SmartTextProps {
  text: string;
  className?: string;
  onOpenFullGlossary?: (termId?: string) => void;
}

// Build a sorted list of all search terms / aliases (longest first so multi-word terms like "pot odds" take precedence)
interface AliasMapping {
  alias: string;
  item: GlossaryItem;
}

const ALL_ALIASES: AliasMapping[] = [];
GLOSSARY_ITEMS.forEach((item) => {
  // Add main term
  ALL_ALIASES.push({ alias: item.id.toLowerCase(), item });
  item.aliases.forEach((alias) => {
    if (!ALL_ALIASES.some((a) => a.alias === alias.toLowerCase())) {
      ALL_ALIASES.push({ alias: alias.toLowerCase(), item });
    }
  });
});

// Sort longest aliases first
ALL_ALIASES.sort((a, b) => b.alias.length - a.alias.length);

// Escape string for regex
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Build single regex with word boundary support that works well with accents
// Spanish word boundary: not preceded or followed by alphanumeric or accented characters
const regexPattern = ALL_ALIASES.map((a) => escapeRegExp(a.alias)).join('|');
const KEYWORD_REGEX = new RegExp(`(?<=^|[^a-záéíóúüñ0-9])(${regexPattern})(?=[^a-záéíóúüñ0-9]|$)`, 'iu');

interface WordSpanProps {
  word: string;
  item: GlossaryItem;
  onOpenFullGlossary?: (termId?: string) => void;
}

export const InteractiveGlossaryWord: React.FC<WordSpanProps> = ({
  word,
  item,
  onOpenFullGlossary,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="inline-flex items-baseline text-emerald-300 font-semibold border-b-2 border-dotted border-emerald-400/80 hover:border-emerald-300 hover:text-emerald-200 transition-all cursor-help px-0.5 rounded hover:bg-emerald-500/10"
        title={`Término de poker: ${item.term}. Haz clic para ver qué significa.`}
      >
        <span>{word}</span>
        <span className="text-[10px] ml-0.5 text-emerald-400/70 select-none">?</span>
      </button>

      {isOpen && (
        <GlossaryPopup
          item={item}
          onClose={() => setIsOpen(false)}
          onOpenFullGlossary={onOpenFullGlossary}
          position="top"
        />
      )}
    </span>
  );
};

export const SmartText: React.FC<SmartTextProps> = ({
  text,
  className = '',
  onOpenFullGlossary,
}) => {
  if (!text) return null;

  // Split text by the matched keywords
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  // Track occurrences so we don't highlight the exact same term 10 times in a short paragraph
  const highlightedTermsCount: Record<string, number> = {};

  while (remaining.length > 0) {
    const match = remaining.match(KEYWORD_REGEX);
    if (!match || match.index === undefined) {
      parts.push(remaining);
      break;
    }

    const matchIndex = match.index;
    const matchedWord = match[0];

    // Push the text before the match
    if (matchIndex > 0) {
      parts.push(remaining.substring(0, matchIndex));
    }

    // Find the item
    const lower = matchedWord.toLowerCase();
    const aliasObj = ALL_ALIASES.find((a) => a.alias === lower);

    if (aliasObj) {
      const termId = aliasObj.item.id;
      const count = highlightedTermsCount[termId] || 0;

      // Limit to 2 highlights per term per text block to keep reading clean
      if (count < 2) {
        highlightedTermsCount[termId] = count + 1;
        parts.push(
          <InteractiveGlossaryWord
            key={`gw-${keyIdx++}`}
            word={matchedWord}
            item={aliasObj.item}
            onOpenFullGlossary={onOpenFullGlossary}
          />
        );
      } else {
        parts.push(matchedWord);
      }
    } else {
      parts.push(matchedWord);
    }

    remaining = remaining.substring(matchIndex + matchedWord.length);
  }

  return <span className={className}>{parts}</span>;
};
