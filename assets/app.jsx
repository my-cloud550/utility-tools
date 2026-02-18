const { useState, useMemo } = React;

const translations = {
  ko: {
    wordCounter: {
      placeholder: "텍스트를 입력하거나 붙여넣으세요...",
      withSpace: "공백 포함",
      noSpace: "공백 제외",
      words: "단어 수",
      lines: "줄 수",
    },
  },
};

const WordCounter = ({ t }) => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const charWithSpace = text.length;
    const charNoSpace = text.replace(/\s/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const lines = text === "" ? 0 : text.split(/\n/).length;
    return { charWithSpace, charNoSpace, words, lines };
  }, [text]);

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.wordCounter.placeholder}
        className="w-full h-48 p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none resize-none"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
          <div className="text-xl font-bold">{stats.charWithSpace}</div>
          <div className="text-xs opacity-70">{t.wordCounter.withSpace}</div>
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-700">
          <div className="text-xl font-bold">{stats.charNoSpace}</div>
          <div className="text-xs opacity-70">{t.wordCounter.noSpace}</div>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
          <div className="text-xl font-bold">{stats.words}</div>
          <div className="text-xs opacity-70">{t.wordCounter.words}</div>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl text-amber-700">
          <div className="text-xl font-bold">{stats.lines}</div>
          <div className="text-xs opacity-70">{t.wordCounter.lines}</div>
        </div>
      </div>
    </div>
  );
};

window.UBOX = { translations, WordCounter };
