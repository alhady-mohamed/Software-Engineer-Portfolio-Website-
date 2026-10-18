import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Highlighter,
  Minus,
  Eye,
  Edit3,
  Sparkles,
  Columns,
  Check,
  Copy,
  Terminal,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
} from 'lucide-react';

interface RichDescriptionEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const RichDescriptionEditor: React.FC<RichDescriptionEditorProps> = ({
  value,
  onChange,
  label = 'Sharraxaad Dhammaystiran (Description)',
  placeholder = 'Sharrax ujeeddada mashruuca, dhibaatooyinka uu xalliyo, iyo natiijooyinkiisa...',
  required = false,
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'split'>('write');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Helper to wrap or insert text around current selection
  const insertFormatting = (
    prefix: string,
    suffix: string = '',
    defaultText: string = 'qoraal'
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const replacement = selectedText
      ? `${prefix}${selectedText}${suffix}`
      : `${prefix}${defaultText}${suffix}`;

    const newValue =
      value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newCursorStart = start + prefix.length;
      const newCursorEnd = newCursorStart + (selectedText ? selectedText.length : defaultText.length);
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
    }, 10);
  };

  // Helper to insert block line prefix (like Headings, Lists, Quotes)
  const insertBlockPrefix = (prefix: string, defaultText: string = 'Cinwaan') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const needsLeadingNewline = start > 0 && value[start - 1] !== '\n';
    const lead = needsLeadingNewline ? '\n' : '';

    const content = selectedText || defaultText;
    const replacement = `${lead}${prefix}${content}\n`;

    const newValue =
      value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newStart = start + lead.length + prefix.length;
      textarea.setSelectionRange(newStart, newStart + content.length);
    }, 10);
  };

  // Helper to apply text alignment (left, center, right, justify)
  const applyAlignment = (align: 'left' | 'center' | 'right' | 'justify') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let selectedText = value.substring(start, end);
    let targetStart = start;
    let targetEnd = end;

    // If no text is selected, capture the current line or paragraph under cursor
    if (!selectedText) {
      const prevNewline = value.lastIndexOf('\n', Math.max(0, start - 1));
      targetStart = prevNewline === -1 ? 0 : prevNewline + 1;
      let nextNewline = value.indexOf('\n', end);
      targetEnd = nextNewline === -1 ? value.length : nextNewline;
      selectedText = value.substring(targetStart, targetEnd);
    }

    // Clean any existing alignment tags from the target block
    const cleaned = (selectedText || 'Qoraalka la toosiyay')
      .replace(/<div align="(?:left|center|right|justify)">\n?/gi, '')
      .replace(/<\/div>\n?/gi, '')
      .trim();

    const replacement = `<div align="${align}">\n${cleaned}\n</div>\n`;

    const newValue =
      value.substring(0, targetStart) + replacement + value.substring(targetEnd);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const newStart = targetStart + `<div align="${align}">\n`.length;
      textarea.setSelectionRange(newStart, newStart + cleaned.length);
    }, 10);
  };

  // Helper to apply indentation (Indent right / Outdent left)
  const applyIndentation = (direction: 'indent' | 'outdent') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let selectedText = value.substring(start, end);
    let targetStart = start;
    let targetEnd = end;

    // If no text is selected, capture the current line or paragraph under cursor
    if (!selectedText) {
      const prevNewline = value.lastIndexOf('\n', Math.max(0, start - 1));
      targetStart = prevNewline === -1 ? 0 : prevNewline + 1;
      let nextNewline = value.indexOf('\n', end);
      targetEnd = nextNewline === -1 ? value.length : nextNewline;
      selectedText = value.substring(targetStart, targetEnd);
    }

    if (direction === 'indent') {
      const content = (selectedText || 'Qoraal la fogaaysiiyay (Indented)').trim();
      const replacement = `<div style="margin-left: 28px">\n${content}\n</div>\n`;
      const newValue =
        value.substring(0, targetStart) + replacement + value.substring(targetEnd);
      onChange(newValue);

      setTimeout(() => {
        textarea.focus();
        const newStart = targetStart + '<div style="margin-left: 28px">\n'.length;
        textarea.setSelectionRange(newStart, newStart + content.length);
      }, 10);
    } else {
      // Outdent: strip margin-left wrapper or leading indentation
      const cleaned = (selectedText || '')
        .replace(/<div style="margin-left:\s*\d+px">\n?/gi, '')
        .replace(/<\/div>\n?/gi, '')
        .replace(/^ {2,4}/gm, '')
        .replace(/^\t/gm, '')
        .trim();

      const newValue =
        value.substring(0, targetStart) + cleaned + value.substring(targetEnd);
      onChange(newValue);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(targetStart, targetStart + cleaned.length);
      }, 10);
    }
  };

  // Handle Tab and Shift+Tab key for quick indentation inside the textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        applyIndentation('outdent');
      } else {
        applyIndentation('indent');
      }
    }
  };

  // Insert structured professional case study template
  const handleInsertTemplate = () => {
    const template = `### 🌟 Dulmar Guud (Project Overview)
Mashruucani waa madal casri ah oo loogu talagalay in lagu xalliyo baahiyaha muhiimka ah ee macaamiisha iyo maamulka. Waxaa diiradda lagu saaray xawaare sarreeya, khibrad isticmaale oo fudud, iyo qaab-dhismeed sugan.

### 🎯 Ujeeddada & Dhibaatada la Xalliyay (The Challenge)
- **Deganaansho la'aan:** Nidaamyadii hore waxay ahaayeen kuwo tartiib ah oo adag in la isticmaalo.
- **Isku-xirnaanta Xogta:** Ma jirin meel dhexe oo si toos ah (real-time) looga maamulo xogta iyo dalabaadka.

### 💡 Xalka & Natiijooyinka (The Solution & Impact)
1. **Dhisid Casri ah:** Waxaa la adeegsaday teknoolojiyada ugu dambeysay si loo xaqiijiyo xawaare buuxa.
2. **Natiijada:** Waxay keentay koror 45% ah oo ku yimid hufnaanta shaqada iyo qanacsanaanta dadka isticmaala.

<div align="center">
> "Mashruucani wuxuu tusaale u yahay sida tignoolajiyada casriga ahi ay u fududeyn karto shaqada maalinlaha ah."
</div>
`;
    if (value.trim()) {
      if (window.confirm('Ma hubtaa inaad ku darto qaab-dhismeedkan diyaarsan? (Waxaa lagu dari doonaa xagga hoose)')) {
        onChange(`${value.trim()}\n\n${template}`);
      }
    } else {
      onChange(template);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  // Simple Markdown & HTML Alignment Renderer for Live Preview
  const renderMarkdown = (text: string) => {
    if (!text.trim()) {
      return (
        <div className="py-12 text-center text-slate-500 font-mono text-xs">
          Weli wax sharraxaad ah lama qorin. Isticmaal aaladaha kore si aad qoraalkaaga ugu bilowdo qaab qurxoon.
        </div>
      );
    }

    const lines = text.split('\n');
    let activeAlign: 'center' | 'right' | 'justify' | 'left' | null = null;
    let activeIndent = false;

    return (
      <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {lines.map((rawLine, idx) => {
          let line = rawLine;

          // Check if line opens an alignment block
          if (line.includes('<div align="center">')) {
            activeAlign = 'center';
            line = line.replace(/<div align="center">/g, '');
          } else if (line.includes('<div align="right">')) {
            activeAlign = 'right';
            line = line.replace(/<div align="right">/g, '');
          } else if (line.includes('<div align="justify">')) {
            activeAlign = 'justify';
            line = line.replace(/<div align="justify">/g, '');
          } else if (line.includes('<div align="left">')) {
            activeAlign = 'left';
            line = line.replace(/<div align="left">/g, '');
          }

          // Check if line opens an indent block
          if (line.includes('margin-left')) {
            activeIndent = true;
            line = line.replace(/<div style="margin-left:\s*\d+px">/g, '');
          }

          // Check if line closes a block
          let closedBlock = false;
          if (line.includes('</div>')) {
            closedBlock = true;
            line = line.replace(/<\/div>/g, '');
          }

          const alignClass =
            activeAlign === 'center'
              ? 'text-center'
              : activeAlign === 'right'
              ? 'text-right'
              : activeAlign === 'justify'
              ? 'text-justify'
              : activeAlign === 'left'
              ? 'text-left'
              : '';

          const indentClass = activeIndent
            ? 'pl-6 border-l-2 border-primary/40 my-1 bg-white/[0.01] rounded-r'
            : '';

          if (closedBlock) {
            activeAlign = null;
            activeIndent = false;
          }

          if (!line.trim() && !closedBlock) {
            return <div key={idx} className="h-2" />;
          }

          // Horizontal Rule
          if (line.trim() === '---' || line.trim() === '***') {
            return <hr key={idx} className="border-slate-700/80 my-4" />;
          }

          // Heading 1 (#)
          if (line.startsWith('# ')) {
            return (
              <h1
                key={idx}
                className={`text-xl sm:text-2xl font-extrabold text-white pt-2 pb-1 border-b border-primary/20 tracking-tight ${alignClass} ${indentClass}`}
              >
                {line.replace('# ', '')}
              </h1>
            );
          }

          // Heading 2 (##)
          if (line.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className={`text-lg sm:text-xl font-bold text-white pt-2 pb-1 tracking-tight text-primary flex items-center gap-2 ${alignClass} ${indentClass}`}
              >
                {line.replace('## ', '')}
              </h2>
            );
          }

          // Heading 3 (###)
          if (line.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className={`text-sm sm:text-base font-bold text-amber-400 pt-1 tracking-tight ${alignClass} ${indentClass}`}
              >
                {line.replace('### ', '')}
              </h3>
            );
          }

          // Blockquote (>)
          if (line.startsWith('> ')) {
            return (
              <blockquote
                key={idx}
                className={`border-l-4 border-primary pl-3.5 py-1.5 my-2 italic text-slate-300 bg-slate-900/60 rounded-r-xl ${alignClass} ${indentClass}`}
              >
                {line.replace('> ', '')}
              </blockquote>
            );
          }

          // Bullet List (- or *)
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const content = line.trim().replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className={`flex items-start gap-2 pl-2 ${alignClass} ${indentClass}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
              </div>
            );
          }

          // Numbered list (1. 2. etc)
          const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className={`flex items-start gap-2 pl-2 ${alignClass} ${indentClass}`}>
                <span className="font-mono text-primary font-bold text-[11px] shrink-0 mt-0.5">
                  {numMatch[1]}.
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(numMatch[2]) }} />
              </div>
            );
          }

          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Standard paragraph
          return (
            <p
              key={idx}
              className={`text-slate-300 ${alignClass} ${indentClass}`}
              dangerouslySetInnerHTML={{ __html: formatInline(line) }}
            />
          );
        })}
      </div>
    );
  };

  // Inline formatting parser (bold, italic, code, underline, mark, links)
  const formatInline = (str: string): string => {
    let out = str;
    out = out.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Markdown Links: [text](url)
    out = out.replace(
      /\[(.*?)\]\((https?:\/\/.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-white font-medium">$1</a>'
    );

    // Bold + Italic: ***text***
    out = out.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold italic text-white">$1</strong>');
    // Bold: **text**
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    // Italic: *text*
    out = out.replace(/\*(.*?)\*/g, '<em class="italic text-slate-200">$1</em>');
    // Strikethrough: ~~text~~
    out = out.replace(/~~(.*?)~~/g, '<del class="line-through text-slate-500">$1</del>');
    // Underline: <u>text</u> or <ins>text</ins>
    out = out.replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/g, '<u class="underline underline-offset-2">$1</u>');
    out = out.replace(/&lt;ins&gt;(.*?)&lt;\/ins&gt;/g, '<u class="underline underline-offset-2">$1</u>');
    // Inline Code: `text`
    out = out.replace(
      /`(.*?)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-primary text-[11px]">$1</code>'
    );
    // Highlight / Tag: ==text==
    out = out.replace(
      /==(.*?)==/g,
      '<mark class="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1 rounded font-medium">$1</mark>'
    );

    return out;
  };

  return (
    <div className="space-y-2">
      {/* Header bar: Label + View Tabs Toggle + Templates */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-semibold uppercase text-slate-300 flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-rose-400 font-bold">*</span>}
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 normal-case font-medium">
            <Sparkles size={11} /> Rich Typography & Word Tools
          </span>
        </label>

        {/* View mode toggle buttons (Write, Preview, Split) */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'write'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title="Qor / Wax ka beddel (Write Mode)"
          >
            <Edit3 size={13} />
            <span>Qor (Write)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-primary text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title="Muuji sida uu u ekaan doono (Live Preview)"
          >
            <Eye size={13} />
            <span>Hor-eeg (Preview)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'split'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title="Kala qaybi shaashadda (Split Editor & Live Preview)"
          >
            <Columns size={13} />
            <span>Split</span>
          </button>
        </div>
      </div>

      {/* Main Enclosed Card */}
      <div className="rounded-2xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-xl focus-within:border-primary transition-all">
        {/* Professional Formatting Ribbon (Tools Bar) */}
        <div className="p-2 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-1.5">
          {/* Left formatting tools group */}
          <div className="flex flex-wrap items-center gap-1">
            {/* Font Hierarchy (Headings) */}
            <div className="flex items-center bg-slate-950/70 p-0.5 rounded-lg border border-slate-800 mr-1">
              <button
                type="button"
                onClick={() => insertBlockPrefix('# ', 'Cinwaan Weyn 1')}
                title="Cinwaan Weyn (H1 Heading)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Heading1 size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertBlockPrefix('## ', 'Cinwaan Dhexe 2')}
                title="Cinwaan Dhexe (H2 Heading)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Heading2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertBlockPrefix('### ', 'Cinwaan Hoose 3')}
                title="Cinwaan Hoose (H3 Subheading)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Heading3 size={15} />
              </button>
            </div>

            {/* Font Styles (Bold, Italic, Underline, Strikethrough) */}
            <div className="flex items-center bg-slate-950/70 p-0.5 rounded-lg border border-slate-800 mr-1">
              <button
                type="button"
                onClick={() => insertFormatting('**', '**', 'Qoraal Dhumuc leh')}
                title="Qoraal Dhumuc leh (Bold - Ctrl+B)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-bold cursor-pointer"
              >
                <Bold size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('*', '*', 'Qoraal Qalloocan')}
                title="Qoraal Qalloocan (Italic - Ctrl+I)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors italic cursor-pointer"
              >
                <Italic size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<u>', '</u>', 'Qoraal Xariiqan')}
                title="Qoraal Hoosta ka Xariiqan (Underline)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Underline size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('~~', '~~', 'Qoraal Tirtiran')}
                title="Qoraal Dhexda laga Xariiqay (Strikethrough)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Strikethrough size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('==', '==', 'Qoraal la Iftiimiyay')}
                title="Iftiimi Qoraalka (Highlight Badge)"
                className="p-1.5 rounded text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Highlighter size={15} />
              </button>
            </div>

            {/* Paragraph Alignment & Indentation Group (Left, Center, Right, Justify, Indent, Outdent) */}
            <div className="flex items-center bg-slate-950/80 p-0.5 rounded-lg border border-primary/20 shadow-inner mr-1" title="Toosinta & Gelida Paragraph-ka (Alignment & Indentation)">
              <button
                type="button"
                onClick={() => applyAlignment('left')}
                title="Toosi Bidix (Align Left)"
                className="p-1.5 rounded text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <AlignLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => applyAlignment('center')}
                title="Toosi Dhexda (Align Center)"
                className="p-1.5 rounded text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <AlignCenter size={15} />
              </button>
              <button
                type="button"
                onClick={() => applyAlignment('right')}
                title="Toosi Midig (Align Right)"
                className="p-1.5 rounded text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <AlignRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => applyAlignment('justify')}
                title="Sim labada dhinac (Justify Text)"
                className="p-1.5 rounded text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <AlignJustify size={15} />
              </button>

              <div className="w-px h-4 bg-slate-800 mx-1" />

              <button
                type="button"
                onClick={() => applyIndentation('outdent')}
                title="Soo Dhowee Bidix / Ka noqo fogeynta (Decrease Indent / Outdent - Shift+Tab)"
                className="p-1.5 rounded text-slate-300 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Outdent size={15} />
              </button>
              <button
                type="button"
                onClick={() => applyIndentation('indent')}
                title="Fogeey Midig / Gelid (Increase Indent - Tab)"
                className="p-1.5 rounded text-slate-300 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Indent size={15} />
              </button>
            </div>

            {/* Paragraph & Lists (Bullet, Numbered, Quote, Divider) */}
            <div className="flex items-center bg-slate-950/70 p-0.5 rounded-lg border border-slate-800 mr-1">
              <button
                type="button"
                onClick={() => insertBlockPrefix('- ', 'Qodobka 1')}
                title="Liis Qodobo ah (Bullet List)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <List size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertBlockPrefix('1. ', 'Qodobka koowaad')}
                title="Liis Tirooyin ah (Numbered List)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ListOrdered size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertBlockPrefix('> ', 'Xigasho muhiim ah ama dulmar gaar ah...')}
                title="Xigasho / Quote Callout"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Quote size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertBlockPrefix('---\n', '')}
                title="Kala-sooce / Xariiq Jiifta (Horizontal Divider)"
                className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Minus size={15} />
              </button>
            </div>

            {/* Insert Elements: Link, Inline Code, Code Block */}
            <div className="flex items-center bg-slate-950/70 p-0.5 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => insertFormatting('[', '](https://example.com)', 'Magaca Link-ga')}
                title="Geli Link (Hyperlink)"
                className="p-1.5 rounded text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <LinkIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('`', '`', 'variableName')}
                title="Koodh Gaaban (Inline Code)"
                className="p-1.5 rounded text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors font-mono cursor-pointer"
              >
                <Code size={15} />
              </button>
              <button
                type="button"
                onClick={() => insertBlockPrefix('```typescript\n// Qor koodhkaaga halkan\n', '```')}
                title="Koodh Weyn (Code Block)"
                className="p-1.5 rounded text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Terminal size={15} />
              </button>
            </div>
          </div>

          {/* Right helper tools: Pre-made Template & Copy */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleInsertTemplate}
              title="Geli qaab-dhismeed diyaarsan oo xirfad leh (Overview, Challenge, Solution)"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 text-[11px] font-semibold transition-all cursor-pointer"
            >
              <Sparkles size={12} />
              <span className="hidden sm:inline">Qaab Diyaarsan</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              title="Koobiyeey sharraxaadda"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Viewport Editor Body */}
        {activeTab === 'write' && (
          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={9}
              required={required}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-transparent text-slate-100 text-xs sm:text-sm font-sans placeholder-slate-500 focus:outline-none resize-y min-h-[200px] leading-relaxed selection:bg-primary/30"
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="p-4 sm:p-5 bg-slate-950/60 min-h-[200px] max-h-[380px] overflow-y-auto">
            {renderMarkdown(value)}
          </div>
        )}

        {activeTab === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Editor Half */}
            <div className="relative">
              <div className="px-3 py-1 bg-slate-900/40 text-[10px] font-mono text-slate-400 border-b border-slate-800/80">
                EDITOR (Markdown & HTML)
              </div>
              <textarea
                ref={textareaRef}
                rows={9}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-transparent text-slate-100 text-xs font-mono placeholder-slate-500 focus:outline-none resize-y min-h-[200px] leading-relaxed"
              />
            </div>

            {/* Live Preview Half */}
            <div className="bg-slate-950/60 flex flex-col">
              <div className="px-3 py-1 bg-slate-900/40 text-[10px] font-mono text-emerald-400 border-b border-slate-800/80 flex items-center justify-between">
                <span>LIVE PREVIEW</span>
                <span className="text-slate-500">Live Typography</span>
              </div>
              <div className="p-4 overflow-y-auto max-h-[280px] flex-1">
                {renderMarkdown(value)}
              </div>
            </div>
          </div>
        )}

        {/* Footer info bar: Word & Character counts + Formatting Tips */}
        <div className="px-3.5 py-2 bg-slate-900/60 border-t border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>
              Ereyo (Words): <strong className="text-white font-mono">{wordCount}</strong>
            </span>
            <span>•</span>
            <span>
              Xuruufo (Chars): <strong className="text-white font-mono">{charCount}</strong>
            </span>
          </div>

          <div className="text-[10px] text-slate-500 font-mono hidden sm:block">
            Toosinta: Left, Center, Right, Justify • Gelid & Soo Dhoweyn: Indent / Outdent
          </div>
        </div>
      </div>
    </div>
  );
};
