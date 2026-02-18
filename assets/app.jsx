const { useState, useMemo } = React;

function Icon({ children, className = "" }) {
  return (
    <svg
      className={`w-5 h-5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {children}
    </svg>
  );
}

const NAV = [
  {
    title: "텍스트 도구",
    items: [
      { id: "wordCounter", name: "글자 수 세기", href: "/tools/word-counter/", icon: (
        <Icon><path d="M4 6h16M4 12h10M4 18h16" /></Icon>
      )},
      { id: "case", name: "대소문자 변환", href: "/#case", icon: (
        <Icon><path d="M4 19V5h6a3 3 0 0 1 0 6H4m10-6h6m-6 14V5" /></Icon>
      )},
    ],
  },
  {
    title: "계산 도구",
    items: [
      { id: "percent", name: "만능 퍼센트 계산", href: "/#percent", icon: (
        <Icon><path d="M19 5L5 19" /><path d="M7 7h.01" /><path d="M17 17h.01" /></Icon>
      )},
      { id: "discount", name: "할인율 계산", href: "/#discount", icon: (
        <Icon><path d="M20 12v7a2 2 0 0 1-2 2H7l-4-4V5a2 2 0 0 1 2-2h7" /><path d="M18 2v6" /><path d="M15 5h6" /></Icon>
      )},
      { id: "unit", name: "단위 변환", href: "/#unit", icon: (
        <Icon><path d="M7 7h10" /><path d="M7 17h10" /><path d="M9 7v10" /><path d="M15 7v10" /></Icon>
      )},
    ],
  },
  {
    title: "미디어 도구",
    items: [
      { id: "image", name: "이미지 용량 줄이기", href: "/#image", icon: (
        <Icon><path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" /><path d="M3 15l4-4a2 2 0 0 1 3 0l3 3" /><path d="M14 14l1-1a2 2 0 0 1 3 0l3 3" /><path d="M14 7h.01" /></Icon>
      )},
      { id: "color", name: "색상 코드 변환기", href: "/#color", icon: (
        <Icon><path d="M12 3v2" /><path d="M12 19v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M3 12h2" /><path d="M19 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /><path d="M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8z" /></Icon>
      )},
    ],
  },
  {
    title: "시간 관리",
    items: [
      { id: "stopwatch", name: "스톱워치", href: "/#stopwatch", icon: (
        <Icon><path d="M10 2h4" /><path d="M12 14l2-2" /><path d="M12 8v4" /><path d="M8 4l1.5 1.5" /><circle cx="12" cy="14" r="8" /></Icon>
      )},
      { id: "pomodoro", name: "포모도로 타이머", href: "/#pomodoro", icon: (
        <Icon><path d="M12 7v5l3 3" /><circle cx="12" cy="12" r="9" /></Icon>
      )},
      { id: "dday", name: "D-Day 계산기", href: "/#dday", icon: (
        <Icon><path d="M8 2v4" /><path d="M16 2v4" /><path d="M3 8h18" /><path d="M5 8v14h14V8" /><path d="M8 12h8" /></Icon>
      )},
    ],
  },
];

function Sidebar({ activeId }) {
  return (
    <aside className="w-[280px] shrink-0 border-r bg-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            ⬚
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">UtilityBox</div>
            <div className="text-sm text-slate-500 mt-0.5">스마트 툴 모음</div>
          </div>
        </div>
      </div>

      <nav className="px-4 pb-6">
        {NAV.map((group) => (
          <div key={group.title} className="mb-6">
            <div className="px-3 text-xs font-semibold text-slate-500 mb-2">
              {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={[
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition",
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    <span className={isActive ? "text-white" : "text-slate-500"}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-6 pb-8">
        <div className="border-t pt-6">
          <div className="text-xs font-semibold text-slate-500 mb-2">보안</div>
          <div className="text-sm text-slate-600">
            모든 도구는 브라우저에서 로컬로 실행됩니다.
          </div>
        </div>

        <div className="mt-6 rounded-xl border p-4 text-sm text-slate-700 flex items-center justify-between">
          <span className="text-slate-600">Language: 한국어</span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
      </div>
    </aside>
  );
}

function StatCard({ label, value, tone = "bg-slate-50" }) {
  return (
    <div className={`rounded-2xl ${tone} px-6 py-5 text-center`}>
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function WordCounterTool() {
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
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <textarea
          className="w-full h-48 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none resize-none"
          placeholder="텍스트를 입력하거나 붙여넣으세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard label="공백 포함" value={stats.withSpace} tone="bg-blue-50" />
          <StatCard label="공백 제외" value={stats.noSpace} tone="bg-indigo-50" />
          <StatCard label="단어 수" value={stats.words} tone="bg-emerald-50" />
          <StatCard label="줄 수" value={stats.lines} tone="bg-amber-50" />
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-1.5 self-stretch bg-blue-600 rounded-full" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-blue-700">
                ?
              </span>
              활용 꿀팁
            </div>
            <div className="mt-3 text-slate-800 font-semibold">
              자소서.블로그 필수.글자 수 세기
            </div>
            <p className="mt-2 text-slate-600 leading-relaxed">
              네이버 글자수세기와 동일한 기준으로 공백 포함 글자 수와 공백 제외 글자 수를 정확하게 계산합니다.
              자기소개서(자소서) 작성, 블로그 포스팅, 리포트 작성 시 500자, 1000자 제한을 맞출 때 자주 쓰입니다.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["#글자수세기", "#공백포함", "#공백제외", "#자소서글자수", "#블로그글자수"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const cards = [
    {
      title: "글자 수 세기",
      desc: "공백 포함/제외, 단어/줄까지 한 번에.",
      href: "/tools/word-counter/",
    },
    {
      title: "대소문자 변환",
      desc: "준비중 (URL은 /#case 로 임시 연결).",
      href: "/#case",
    },
    {
      title: "퍼센트 계산",
      desc: "준비중 (URL은 /#percent 로 임시 연결).",
      href: "/#percent",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          스마트 툴 모음
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
          UtilityBox 도구 모음
        </h1>
        <p className="mt-2 text-slate-600">
          각 도구는 고유 링크로 운영됩니다. (예: /tools/word-counter/)
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((c) => (
          <a key={c.title} href={c.href} className="rounded-3xl border bg-white p-7 shadow-sm hover:shadow transition">
            <div className="text-lg font-extrabold text-slate-900">{c.title}</div>
            <div className="mt-2 text-slate-600">{c.desc}</div>
            <div className="mt-4 text-sm font-semibold text-blue-700">열기 →</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function App() {
  // 각 페이지(index.html)에서 window.__PAGE__ 로 지정
  const page = (window.__PAGE__ || "").trim();

  // 페이지별 활성 메뉴 선택
  const activeId = page === "wordCounter" ? "wordCounter" : "home";

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex">
        <Sidebar activeId={activeId === "home" ? "wordCounter" : "wordCounter"} />
        <main className="flex- composed w-full">
          <div className="w-full max-w-5xl mx-auto px-6 py-10">
            <div className="hidden md:block text-center text-slate-400 text-sm mb-8">
              Display Ad (Responsive)
            </div>

            {page === "wordCounter" ? (
              <>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                  텍스트 도구
                </div>
                <h1 className="mt-3 text-4xl font-extrabold text-slate-900">글자 수 세기</h1>
                <div className="mt-8">
                  <WordCounterTool />
                </div>
              </>
            ) : (
              <Home />
            )}

            <footer className="mt-14 text-center text-slate-500 text-sm">
              © 2026 Utility Box. All tools run locally in your browser.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
