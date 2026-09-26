"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { calculateReadTime, markdownToHtml } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder = "Start writing your story here..." }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  // Active command states for toolbar highlighting
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    blockquote: false,
    h1: false,
    h2: false,
    h3: false,
  });

  // Initialize and synchronize HTML content safely
  useEffect(() => {
    if (!editorRef.current) return;
    const initialHtml = markdownToHtml(value);
    if (editorRef.current.innerHTML !== initialHtml && editorRef.current !== document.activeElement) {
      editorRef.current.innerHTML = initialHtml;
    }
  }, [value]);

  // Update active format indicators on selection change
  const updateActiveFormats = useCallback(() => {
    if (isCodeView || !editorRef.current) return;
    try {
      const parentBlock = document.queryCommandValue("formatBlock")?.toLowerCase() || "";
      setActiveFormats({
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline: document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        insertOrderedList: document.queryCommandState("insertOrderedList"),
        blockquote: parentBlock === "blockquote",
        h1: parentBlock === "h1",
        h2: parentBlock === "h2",
        h3: parentBlock === "h3",
      });
    } catch {
      // Ignore in unsupported environments
    }
  }, [isCodeView]);

  const handleInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    onChange(html);
    updateActiveFormats();
  };

  const executeCmd = (command: string, value: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleFormatBlock = (tag: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand("formatBlock", false, `<${tag}>`);
    handleInput();
  };

  // Open Link Dialog and remember user selection
  const openLinkDialog = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      setSavedSelection(range.cloneRange());
      setLinkText(range.toString());
    } else {
      setSavedSelection(null);
      setLinkText("");
    }
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const applyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    let targetUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(targetUrl) && !targetUrl.startsWith("/")) {
      targetUrl = `https://${targetUrl}`;
    }

    if (editorRef.current) {
      editorRef.current.focus();
      const sel = window.getSelection();

      if (savedSelection && sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection);
      }

      if (linkText.trim() && savedSelection && savedSelection.collapsed) {
        // Insert link with custom text
        const anchor = document.createElement("a");
        anchor.href = targetUrl;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.className = "text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer";
        anchor.textContent = linkText.trim();
        savedSelection.insertNode(anchor);
      } else {
        // Wrap selected text
        document.execCommand("createLink", false, targetUrl);
        // Style all anchors in selection
        const anchors = editorRef.current.querySelectorAll("a");
        anchors.forEach((a) => {
          if (a.href === targetUrl || a.getAttribute("href") === targetUrl) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.className = "text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer";
          }
        });
      }

      handleInput();
    }

    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
    setSavedSelection(null);
  };

  const removeLink = () => {
    executeCmd("unlink");
  };

  // Keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        executeCmd("bold");
      } else if (e.key === "i" || e.key === "I") {
        e.preventDefault();
        executeCmd("italic");
      } else if (e.key === "u" || e.key === "U") {
        e.preventDefault();
        executeCmd("underline");
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        openLinkDialog();
      }
    }
  };

  // Calculate live word count and read time
  const strippedText = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = strippedText ? strippedText.split(" ").length : 0;
  const readTimeStr = calculateReadTime(value);

  return (
    <div className="flex flex-col border border-white/[0.1] rounded-2xl bg-[#0f131d] overflow-hidden shadow-2xl transition-all">
      {/* Sticky Dark WYSIWYG Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 sm:p-2.5 bg-[#141926]/95 backdrop-blur-md border-b border-white/[0.08] text-slate-300 select-none">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-white/[0.08]">
          <button
            type="button"
            onClick={() => executeCmd("undo")}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <span className="material-symbols-outlined text-[19px]">undo</span>
          </button>
          <button
            type="button"
            onClick={() => executeCmd("redo")}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <span className="material-symbols-outlined text-[19px]">redo</span>
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-white/[0.08]">
          <button
            type="button"
            onClick={() => handleFormatBlock("p")}
            className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
              !activeFormats.h1 && !activeFormats.h2 && !activeFormats.h3 && !activeFormats.blockquote
                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
            }`}
            title="Paragraph Text"
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => handleFormatBlock("h2")}
            className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
              activeFormats.h2
                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => handleFormatBlock("h3")}
            className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
              activeFormats.h3
                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30"
                : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
            }`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Inline Formatting (Bold, Italic, Underline, Strike) */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-white/[0.08]">
          <button
            type="button"
            onClick={() => executeCmd("bold")}
            className={`p-1.5 rounded-lg transition-all ${
              activeFormats.bold
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title="Bold (Ctrl+B) — Visual bold text"
          >
            <span className="material-symbols-outlined text-[19px]">format_bold</span>
          </button>
          <button
            type="button"
            onClick={() => executeCmd("italic")}
            className={`p-1.5 rounded-lg transition-all ${
              activeFormats.italic
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title="Italic (Ctrl+I)"
          >
            <span className="material-symbols-outlined text-[19px]">format_italic</span>
          </button>
          <button
            type="button"
            onClick={() => executeCmd("underline")}
            className={`p-1.5 rounded-lg transition-all ${
              activeFormats.underline
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title="Underline (Ctrl+U)"
          >
            <span className="material-symbols-outlined text-[19px]">format_underlined</span>
          </button>
          <button
            type="button"
            onClick={() => executeCmd("strikeThrough")}
            className={`p-1.5 rounded-lg transition-all ${
              activeFormats.strikeThrough
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title="Strikethrough"
          >
            <span className="material-symbols-outlined text-[19px]">strikethrough_s</span>
          </button>
        </div>

        {/* Lists & Blockquote */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-white/[0.08]">
          <button
            type="button"
            onClick={() => executeCmd("insertUnorderedList")}
            className={`p-1.5 rounded-lg transition-all ${
              activeFormats.insertUnorderedList
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title="Bullet List"
          >
            <span className="material-symbols-outlined text-[19px]">format_list_bulleted</span>
          </button>
          <button
            type="button"
            onClick={() => executeCmd("insertOrderedList")}
            className={`p-1.5 rounded-lg transition-all ${
              activeFormats.insertOrderedList
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title="Numbered List"
          >
            <span className="material-symbols-outlined text-[19px]">format_list_numbered</span>
          </button>
          <button
            type="button"
            onClick={() => handleFormatBlock("blockquote")}
            className={`p-1.5 rounded-lg transition-all ${
              activeFormats.blockquote
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title="Blockquote"
          >
            <span className="material-symbols-outlined text-[19px]">format_quote</span>
          </button>
        </div>

        {/* Interactive Link & Unlink */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-white/[0.08]">
          <button
            type="button"
            onClick={openLinkDialog}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-300 hover:text-indigo-400 transition-colors"
            title="Insert Link (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-[19px]">link</span>
          </button>
          <button
            type="button"
            onClick={removeLink}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-rose-400 transition-colors"
            title="Remove Link"
          >
            <span className="material-symbols-outlined text-[19px]">link_off</span>
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 px-1.5 border-r border-white/[0.08]">
          <button
            type="button"
            onClick={() => executeCmd("justifyLeft")}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
            title="Align Left"
          >
            <span className="material-symbols-outlined text-[19px]">format_align_left</span>
          </button>
          <button
            type="button"
            onClick={() => executeCmd("justifyCenter")}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
            title="Align Center"
          >
            <span className="material-symbols-outlined text-[19px]">format_align_center</span>
          </button>
        </div>

        {/* Clear formatting */}
        <div className="flex items-center gap-0.5 px-1.5">
          <button
            type="button"
            onClick={() => executeCmd("removeFormat")}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
            title="Clear Formatting"
          >
            <span className="material-symbols-outlined text-[19px]">format_clear</span>
          </button>
        </div>

        {/* Mode Toggle: Visual vs HTML */}
        <div className="ml-auto flex items-center">
          <button
            type="button"
            onClick={() => setIsCodeView(!isCodeView)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
              isCodeView
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-white"
            }`}
            title="Toggle between Visual Editor and HTML Code"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isCodeView ? "visibility" : "code"}
            </span>
            <span>{isCodeView ? "Visual View" : "HTML View"}</span>
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="relative min-h-[520px] p-6 sm:p-8 bg-[#0a0d14] text-slate-200">
        {isCodeView ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-[520px] bg-transparent text-amber-300/90 font-mono text-sm leading-relaxed p-0 border-none outline-none resize-none focus:ring-0"
            placeholder="Edit raw HTML..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onKeyUp={updateActiveFormats}
            onMouseUp={updateActiveFormats}
            onKeyDown={handleKeyDown}
            data-placeholder={placeholder}
            className="rich-text-surface min-h-[520px] outline-none text-base sm:text-lg leading-relaxed text-slate-200 empty:before:content-[attr(data-placeholder)] empty:before:text-slate-600 empty:before:pointer-events-none"
          />
        )}
      </div>

      {/* Real-Time Word Count & Calculated Reading Time Bar */}
      <div className="px-6 py-3 bg-[#111520] border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-slate-500">article</span>
            <strong className="text-slate-300 font-semibold">{wordCount}</strong> words
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-indigo-400">schedule</span>
            <strong className="text-indigo-300 font-semibold">{readTimeStr}</strong>
          </span>
        </div>
        <div className="text-[11px] text-slate-500 hidden sm:block">
          Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-slate-400">Ctrl+B</kbd> for bold, <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-slate-400">Ctrl+I</kbd> for italic, <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-slate-400">Ctrl+K</kbd> for links
        </div>
      </div>

      {/* Clean Interactive Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#131824] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">link</span>
                Insert Link
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={applyLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Link Text (Optional if text selected)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Visit our resource..."
                  className="w-full px-3.5 py-2 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Destination URL *
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or /about"
                  className="w-full px-3.5 py-2 bg-[#0a0d14] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">check</span>
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
