const { useMemo, useState } = React;

/* helpers */
function clampNum(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}
function formatNum(n) {
  if (!Number.isFinite(n)) return "0";
  const abs = Math.abs(n);
  if (abs !== 0 && abs < 0.000001) return n.toExponential(6);
  return String(Math.round(n * 1000000) / 1000000);
}
function copyToClipboard(text) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).catch(() => {});
}
function detectTool() {
  if (window.__TOOL__) return window.__TOOL__;
  const p = window.location.pathname || "/";
  const m = p.match(/^\/tools\/([^/]+)\/?/);
  if (m && m[1]) return m[1];
  return "word-counter";
}

/* inline icons */
function Icon({ name, className = "w-5 h-5" }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "text":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 6h16" />
          <path d="M4 12h10" />
          <path d="M4 18h16" />
        </svg>
      );
    case "case":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 20V7" />
          <path d="M4 7h6" />
          <path d="M10 7v13" />
          <path d="M14 20V4" />
          <path d="M14 4h6" />
          <path d="M20 4v16" />
        </svg>
      );
    case "percent":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M19 5L5 19" />
          <circle cx="7" cy="7" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/* layout shell */
function Shell({ activeKey, children }) {
  const nav = [
    {
      title: "텍스트 도구",
      items: [
        { key: "word-counter", label: "글자 수 세기", href: "/tools/word-counter/", icon: "text" },
        { key: "case-converter", label: "대소문자 변환", href: "/tools/case-converter/", icon: "case" },
      ],
    },
    {
      title: "계산 도구",
      items: [
        { key: "percent-calculator", label: "만능 퍼센트 계산", href: "/tools/percent-calculator/", icon: "percent" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <aside className="w-[280px] shrink-0 border-r border-slate-200 bg-white min-h-screen sticky top-0">
          <div className="p-5">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 grid place-items-center">
                <div className="w-5 h-5 bg-white/90 rounded-sm" />
              </div>
              <div>
                <div className="text-lg font-extrabold tracking-tight">UtilityBox</div>
                <div className="text-xs text-slate-500 mt-0.5">스마트 툴 모음</div>
              </div>
            </a>
          </div>

          <nav className="px-3 pb-6">
            {nav.map((sec) => (
              <div key={sec.title} className="mb-6">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500">{sec.title}</div>
                <div className="space-y-1">
                  {sec.items.map((it) => {
                    const active = it.key === activeKey;
                    return (
                      <a
                        key={it.key}
                        href={it.href}
                        className={
                          "flex items-center gap-3 px-3 py-2 rounded-xl transition " +
                          (active
                            ? "bg-slate-900 text-white shadow-sm"
                            : "text-slate-700 hover:bg-slate-100")
                        }
                      >
                        <Icon name={it.icon} className={"w-5 h-5 " + (active ? "text-white" : "text-slate-500")} />
                        <span className="text-sm font-medium">{it.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-6 pb-6 text-xs text-slate-500">모든 도구는 브라우저에서 로컬로 실행됩니다.</div>
        </aside>

        <main className="flex-1">
          <div className="max-w-[980px] mx-auto px-6 py-8">{children}</div>
          <footer className="py-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Utility Box. All tools run locally in your browser.
          </footer>
        </main>
      </div>
    </div>
  );
}

function PageHeader({ badge, title, desc }) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold">
        {badge}
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight">{title}</h1>
      {desc ? <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p> : null}
    </div>
  );
}
function Card({ children }) {
  return <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">{children}</div>;
}
function Field({ label, children }) {
  return (
    <div>
      <div className="text-xs font-semibold text-slate-500 mb-2">{label}</div>
      {children}
    </div>
  );
}

/* Word Counter (kept for routing compatibility) */
function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const withSpace = text.length;
    const noSpace = text.replace(/\s/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const lines = text === "" ? 0 : text.split(/\n/).length;
    return { withSpace, noSpace, words, lines };
  }, [text]);

  return (
    <div className="space-y-6">
      <PageHeader badge="텍스트 도구" title="글자 수 세기" desc="공백 포함/제외 글자 수, 단어 수, 줄 수를 빠르게 계산합니다." />
      <Card>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트를 입력하거나 붙여넣으세요..."
          className="w-full h-40 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none resize-none"
        />
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-center">
            <div className="text-xl font-black">{stats.withSpace}</div>
            <div className="text-xs text-slate-600 mt-1">공백 포함</div>
          </div>
          <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4 text-center">
            <div className="text-xl font-black">{stats.noSpace}</div>
            <div className="text-xs text-slate-600 mt-1">공백 제외</div>
          </div>
          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-center">
            <div className="text-xl font-black">{stats.words}</div>
            <div className="text-xs text-slate-600 mt-1">단어 수</div>
          </div>
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-center">
            <div className="text-xl font-black">{stats.lines}</div>
            <div className="text-xs text-slate-600 mt-1">줄 수</div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => copyToClipboard(text)}>
            전체 복사
          </button>
          <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200" onClick={() => setText("")}>
            비우기
          </button>
        </div>
      </Card>
    </div>
  );
}

/* Case Converter */
function toTitleCase(str) {
  return str.toLowerCase().replace(/\b([a-z])/g, (m, p1) => p1.toUpperCase());
}
function toSentenceCase(str) {
  const s = str.toLowerCase();
  return s.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (m) => m.toUpperCase());
}
function toggleCase(str) {
  let out = "";
  for (const ch of str) {
    const up = ch.toUpperCase();
    const low = ch.toLowerCase();
    out += ch === up ? low : up;
  }
  return out;
}
function CaseConverter() {
  const [text, setText] = useState("");
  const preview = useMemo(() => {
    return {
      up: text.toUpperCase(),
      low: text.toLowerCase(),
      title: toTitleCase(text),
      sentence: toSentenceCase(text),
      toggle: toggleCase(text),
    };
  }, [text]);

  const actions = [
    { label: "대문자", value: preview.up },
    { label: "소문자", value: preview.low },
    { label: "제목형", value: preview.title },
    { label: "문장형", value: preview.sentence },
    { label: "토글", value: preview.toggle },
  ];

  return (
    <div className="space-y-6">
      <PageHeader badge="텍스트 도구" title="대소문자 변환" desc="영문 텍스트를 대문자/소문자/제목형/문장형/토글로 즉시 변환합니다." />
      <Card>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="영문 텍스트를 입력하거나 붙여넣으세요..."
          className="w-full h-40 p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none resize-none"
        />
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => copyToClipboard(text)}>
            원문 복사
          </button>
          <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200" onClick={() => setText("")}>
            비우기
          </button>
        </div>
      </Card>

      <div className="grid gap-4">
        {actions.map((a) => (
          <Card key={a.label}>
            <div className="flex items-center justify-between gap-3">
              <div className="font-bold">{a.label}</div>
              <button className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => setText(a.value)}>
                적용
              </button>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-500 mb-2">미리보기</div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 whitespace-pre-wrap break-words min-h-[72px]">
                {a.value || <span className="text-slate-400">입력하면 변환 결과가 보입니다.</span>}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200" onClick={() => copyToClipboard(a.value)}>
                결과 복사
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* Percent Calculator */
function PercentCalculator() {
  const [tab, setTab] = useState("part"); // part | ratio | change | addsub | reverse

  const [a1, setA1] = useState("");
  const [p1, setP1] = useState("");
  const resultPart = useMemo(() => (clampNum(a1) * clampNum(p1)) / 100, [a1, p1]);

  const [a2, setA2] = useState("");
  const [b2, setB2] = useState("");
  const resultRatio = useMemo(() => {
    const A = clampNum(a2);
    const B = clampNum(b2);
    if (B === 0) return NaN;
    return (A / B) * 100;
  }, [a2, b2]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const resultChange = useMemo(() => {
    const A = clampNum(from);
    const B = clampNum(to);
    if (A === 0) return NaN;
    return ((B - A) / A) * 100;
  }, [from, to]);

  const [base, setBase] = useState("");
  const [pct, setPct] = useState("");
  const [mode, setMode] = useState("add");
  const resultAddSub = useMemo(() => {
    const A = clampNum(base);
    const P = clampNum(pct);
    const k = mode === "add" ? 1 + P / 100 : 1 - P / 100;
    return A * k;
  }, [base, pct, mode]);

  const [finalPrice, setFinalPrice] = useState("");
  const [pctR, setPctR] = useState("");
  const [modeR, setModeR] = useState("discount");
  const resultReverse = useMemo(() => {
    const F = clampNum(finalPrice);
    const P = clampNum(pctR);
    const k = modeR === "discount" ? 1 - P / 100 : 1 + P / 100;
    if (k === 0) return NaN;
    return F / k;
  }, [finalPrice, pctR, modeR]);

  const TabBtn = ({ id, label }) => {
    const active = tab === id;
    return (
      <button
        onClick={() => setTab(id)}
        className={
          "px-4 py-2 rounded-xl text-sm font-semibold transition " +
          (active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")
        }
      >
        {label}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader badge="계산 도구" title="만능 퍼센트 계산" desc="A의 B%, A는 B의 몇 %, 증감률, 할인/할증, 원가 역산까지 한 번에 계산합니다." />

      <div className="flex flex-wrap gap-2">
        <TabBtn id="part" label="A의 B%" />
        <TabBtn id="ratio" label="A는 B의 몇 %" />
        <TabBtn id="change" label="증감률" />
        <TabBtn id="addsub" label="할인/할증 적용" />
        <TabBtn id="reverse" label="원가 역산" />
      </div>

      {tab === "part" && (
        <Card>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="A (기준값)">
              <input value={a1} onChange={(e) => setA1(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 200" />
            </Field>
            <Field label="B (%)">
              <input value={p1} onChange={(e) => setP1(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 15" />
            </Field>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">결과</div>
            <div className="text-2xl font-black mt-1">{formatNum(resultPart)}</div>
            <button className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => copyToClipboard(formatNum(resultPart))}>결과 복사</button>
          </div>
        </Card>
      )}

      {tab === "ratio" && (
        <Card>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="A (부분값)">
              <input value={a2} onChange={(e) => setA2(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 30" />
            </Field>
            <Field label="B (전체값)">
              <input value={b2} onChange={(e) => setB2(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 120" />
            </Field>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">결과(%)</div>
            <div className="text-2xl font-black mt-1">{Number.isFinite(resultRatio) ? `${formatNum(resultRatio)}%` : "0%"}</div>
            <button className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => copyToClipboard(Number.isFinite(resultRatio) ? `${formatNum(resultRatio)}%` : "0%")}>결과 복사</button>
          </div>
        </Card>
      )}

      {tab === "change" && (
        <Card>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="A (변경 전)">
              <input value={from} onChange={(e) => setFrom(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 100" />
            </Field>
            <Field label="B (변경 후)">
              <input value={to} onChange={(e) => setTo(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 135" />
            </Field>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">증감률(%)</div>
            <div className="text-2xl font-black mt-1">{Number.isFinite(resultChange) ? `${formatNum(resultChange)}%` : "0%"}</div>
            <div className="text-sm text-slate-600 mt-1">{Number.isFinite(resultChange) ? (resultChange >= 0 ? "증가" : "감소") : "기준값(A)이 0이면 계산이 불가합니다."}</div>
            <button className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => copyToClipboard(Number.isFinite(resultChange) ? `${formatNum(resultChange)}%` : "0%")}>결과 복사</button>
          </div>
        </Card>
      )}

      {tab === "addsub" && (
        <Card>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="A (기준값)">
              <input value={base} onChange={(e) => setBase(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 50000" />
            </Field>
            <Field label="퍼센트(%)">
              <input value={pct} onChange={(e) => setPct(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 10" />
            </Field>
            <Field label="모드">
              <div className="flex gap-2">
                <button className={"flex-1 px-4 py-3 rounded-2xl text-sm font-semibold " + (mode === "add" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")} onClick={() => setMode("add")}>할증(+)</button>
                <button className={"flex-1 px-4 py-3 rounded-2xl text-sm font-semibold " + (mode === "sub" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")} onClick={() => setMode("sub")}>할인(-)</button>
              </div>
            </Field>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">결과</div>
            <div className="text-2xl font-black mt-1">{formatNum(resultAddSub)}</div>
            <button className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => copyToClipboard(formatNum(resultAddSub))}>결과 복사</button>
          </div>
        </Card>
      )}

      {tab === "reverse" && (
        <Card>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="최종 가격(할인/할증 후)">
              <input value={finalPrice} onChange={(e) => setFinalPrice(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 90000" />
            </Field>
            <Field label="퍼센트(%)">
              <input value={pctR} onChange={(e) => setPctR(e.target.value)} inputMode="decimal" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none" placeholder="예: 10" />
            </Field>
            <Field label="모드">
              <div className="flex gap-2">
                <button className={"flex-1 px-4 py-3 rounded-2xl text-sm font-semibold " + (modeR === "discount" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")} onClick={() => setModeR("discount")}>할인 후</button>
                <button className={"flex-1 px-4 py-3 rounded-2xl text-sm font-semibold " + (modeR === "markup" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200")} onClick={() => setModeR("markup")}>할증 후</button>
              </div>
            </Field>
          </div>
          <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">원가(역산 결과)</div>
            <div className="text-2xl font-black mt-1">{Number.isFinite(resultReverse) ? formatNum(resultReverse) : "0"}</div>
            <button className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:opacity-90" onClick={() => copyToClipboard(Number.isFinite(resultReverse) ? formatNum(resultReverse) : "0")}>결과 복사</button>
          </div>
        </Card>
      )}
    </div>
  );
}

/* Router */
function App() {
  const tool = useMemo(() => detectTool(), []);
  let content = null;
  if (tool === "word-counter") content = <WordCounter />;
  else if (tool === "case-converter") content = <CaseConverter />;
  else if (tool === "percent-calculator") content = <PercentCalculator />;
  else content = <WordCounter />;
  return <Shell activeKey={tool}>{content}</Shell>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
