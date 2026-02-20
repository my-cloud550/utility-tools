const { useState, useEffect, useRef, useCallback, useMemo } = React;

        // --- Data & Translations ---
        const translations = {
            ko: {
                title: "Utility Box",
                subtitle: "생활 필수 웹 도구 모음",
                categories: { text: "텍스트 도구", math: "계산 도구", media: "미디어 도구", time: "시간 관리", security: "보안", fun: "재미", health: "건강 관리" },
                tools: {
                    text: "글자 수 세기",
                    case: "대소문자 변환",
                    percent: "만능 퍼센트 계산",
                    discount: "할인율 계산",
                    compound: "복리 계산기",
                    dca: "분할매수 평균단가",
                    pnl: "손익/수익률 계산",
                    image: "이미지 용량 줄이기",
                    color: "색상 코드 변환기",
                    unit: "단위 변환",
                    stopwatch: "스톱워치",
                    pomodoro: "포모도로 타이머",
                    dday: "D-Day 계산기",
                    password: "비밀번호 생성",
                    lotto: "로또 번호 추첨",
                    bmi: "BMI 비만도 계산"
                },
                seo: {
                    text: { 
                        title: "📝 자소서/블로그 필수! 글자 수 세기", 
                        desc: "네이버 글자수세기와 동일한 기준으로 공백 포함 글자 수와 공백 제외 글자 수를 정확하게 계산합니다. 자기소개서(자소서) 작성, 블로그 포스팅, 리포트 작성 시 500자, 1000자 제한을 맞출 때 필수적인 도구입니다.", 
                        tags: ["#글자수세기", "#공백포함", "#공백제외", "#자소서글자수", "#블로그글자수"] 
                    },
                    case: { 
                        title: "🔠 개발자를 위한 대소문자 변환기", 
                        desc: "영어 텍스트를 대문자(UPPERCASE), 소문자(lowercase)로 변환하는 것은 물론, 프로그래밍 변수 명명 규칙인 스네이크 케이스(snake_case), 케밥 케이스(kebab-case), 파스칼 케이스(PascalCase), 카멜 케이스(camelCase)로 한 번에 변환할 수 있습니다.", 
                        tags: ["#대소문자변환", "#스네이크케이스", "#케밥케이스", "#파스칼케이스", "#카멜케이스"] 
                    },
                    bmi: { 
                        title: "⚖️ 나의 비만도 확인, BMI 계산기", 
                        desc: "신장(cm)과 체중(kg)만 입력하면 BMI(체질량지수)를 계산하여 저체중, 정상, 과체중, 비만 여부를 알려드립니다. 나의 비만도를 확인하고 건강 관리를 시작해보세요.", 
                        tags: ["#BMI계산기", "#비만도계산기", "#체질량지수", "#다이어트"] 
                    },
                    percent: { 
                        title: "🧮 엑셀 없이 쓰는 퍼센트 계산기", 
                        desc: "전체값에서 일부값의 비율, 기준값이 변했을 때의 증감율(수익률), 할인율 등을 간편하게 계산하세요. 주식 수익률 계산, 연봉 인상률, 전년 대비 성장률 등 복잡한 퍼센트 계산을 해결해 드립니다.", 
                        tags: ["#퍼센트계산기", "#수익률계산", "#증감율", "#비율계산", "#할인율계산"] 
                    },
                    image: { 
                        title: "🖼️ 화질 저하 없는 이미지 WebP 변환", 
                        desc: "JPG, PNG, JPEG 등 다양한 이미지 파일을 구글이 개발한 차세대 웹 이미지 포맷인 WebP로 변환하여 용량을 획기적으로 줄여보세요. PNG WebP 변환, JPG WebP 변환을 통해 웹사이트 로딩 속도를 개선하고 SEO 점수를 높일 수 있습니다.", 
                        tags: ["#이미지변환", "#WebP변환", "#JPGtoWebP", "#PNGtoWebP", "#이미지용량줄이기"] 
                    },
                    color: { 
                        title: "🎨 디자이너 필수! 색상 코드 변환기", 
                        desc: "HEX 코드를 입력하면 RGB, HSL, CMYK, HSV 값으로 즉시 변환해드립니다. 컬러 피커를 사용하여 원하는 색상을 찾고, 각종 색상 코드를 간편하게 복사하여 디자인 작업에 활용하세요.", 
                        tags: ["#색상변환", "#HEXtoRGB", "#CMYK변환", "#HSV변환", "#컬러피커"] 
                    },
                    discount: { 
                        title: "🛍️ 쇼핑 필수템 할인 계산기", 
                        desc: "쇼핑할 때 20%, 30% 세일이 적용되면 실제 가격은 얼마일까요? 할인율과 할인 금액, 그리고 최종 가격을 한눈에 확인하세요.", 
                        tags: ["#할인계산기", "#세일가격", "#할인금액", "#할인율"] 
                    },
                    compound: {
                        title: "📈 적립식까지 한 번에, 복리 계산기",
                        desc: "원금, 월 적립, 연 수익률, 기간을 입력하면 복리로 불어나는 최종 금액과 총 납입·총 이자를 계산합니다. 주식·코인 적립식 투자 시뮬레이션에 유용합니다.",
                        tags: ["#복리계산기", "#적립식", "#투자시뮬레이션", "#연수익률", "#월적립"]
                    },
                    dca: {
                        title: "🪙 분할매수 평균단가 계산기 (DCA)",
                        desc: "매수 내역을 추가해 평균단가, 총 수량, 총 투자금을 계산하고 현재가 기준 손익과 수익률까지 확인하세요. 코인·주식 분할매수에 딱 맞는 도구입니다.",
                        tags: ["#분할매수", "#평균단가", "#DCA", "#코인", "#주식"]
                    },
                    pnl: {
                        title: "💹 손익(P/L)·수익률 계산기",
                        desc: "매수가, 현재가/매도가, 수량, 수수료를 입력하면 손익과 수익률, 손익분기점까지 빠르게 계산합니다. 포지션 손익을 간단히 정리해보세요.",
                        tags: ["#손익계산", "#수익률계산", "#손익분기점", "#주식", "#코인"]
                    },
                    unit: { 
                        title: "📏 만능 단위 변환기", 
                        desc: "길이(cm, inch), 무게(kg, lb), 온도(섭씨, 화씨) 등 헷갈리는 단위를 간편하게 변환하세요. 평수 계산, 인치 센티 변환, 화씨 섭씨 변환 등 실생활에 필요한 모든 단위를 지원합니다.", 
                        tags: ["#단위변환기", "#평수계산", "#인치센치", "#화씨섭씨"] 
                    },
                    stopwatch: { 
                        title: "⏱️ 온라인 스톱워치", 
                        desc: "공부 시간 측정, 운동 세트 간 휴식, 요리 타이머 등 정확한 시간 측정이 필요할 때 사용하세요. 별도 앱 설치 없이 브라우저에서 바로 실행되는 정밀 스톱워치입니다.", 
                        tags: ["#스톱워치", "#타이머", "#공부시간측정", "#운동타이머"] 
                    },
                    pomodoro: { 
                        title: "🍅 집중력 향상 뽀모도로 타이머", 
                        desc: "25분 집중하고 5분 휴식하는 뽀모도로 기법을 적용한 타이머입니다. 공부나 업무 효율을 극대화하고 싶다면 지금 바로 집중 타이머를 시작해보세요.", 
                        tags: ["#뽀모도로타이머", "#공부타이머", "#집중력향상", "#시간관리"] 
                    },
                    dday: { 
                        title: "📅 D-Day 디데이 계산기", 
                        desc: "수능, 자격증 시험, 기념일, 전역일 등 중요한 날짜까지 며칠이 남았는지(D-), 혹은 며칠이 지났는지(D+) 계산해보세요. 날짜수 계산, 디데이 카운터 기능으로 소중한 날을 관리하세요.", 
                        tags: ["#디데이계산기", "#날짜계산", "#기념일계산", "#수능디데이"] 
                    },
                    password: { 
                        title: "🔒 강력한 비밀번호 생성기", 
                        desc: "해킹으로부터 안전한 강력한 비밀번호를 생성하세요. 대소문자, 숫자, 특수문자를 조합하여 무작위 비밀번호를 만듭니다. 개인정보 보호를 위한 필수 도구입니다.", 
                        tags: ["#비밀번호생성", "#랜덤비밀번호", "#보안", "#패스워드생성기"] 
                    },
                    lotto: { 
                        title: "🍀 로또 번호 생성기", 
                        desc: "이번 주 로또 예상 번호가 고민되시나요? 순수한 무작위 확률로 로또 번호를 추첨해 드립니다. 재미로 보는 행운의 숫자 조합을 확인해보세요.", 
                        tags: ["#로또번호생성", "#로또추첨", "#행운의번호", "#로또예상"] 
                    }
                },
                // ... (Existing translations) ...
                wordCounter: { placeholder: "텍스트를 입력하거나 붙여넣으세요...", withSpace: "공백 포함", noSpace: "공백 제외", words: "단어 수", lines: "줄 수" },
                case: { placeholder: "변환할 영어 텍스트를 입력하세요...", copy: "복사", copied: "완료!", formats: { upper: "대문자 (UPPER)", lower: "소문자 (lower)", camel: "카멜 (camelCase)", pascal: "파스칼 (PascalCase)", snake: "스네이크 (snake_case)", kebab: "케밥 (kebab-case)" } },
                bmi: { height: "신장 (cm)", weight: "체중 (kg)", result: "나의 BMI", status: { under: "저체중", normal: "정상", over: "과체중", obese: "비만" }, guide: "* BMI 체질량지수 기준" },
                percent: { title: "퍼센트 계산", label1: "전체값의", label2: "%는?", label3: "값은", type1: "비율 계산", type2: "기준값 계산", type3: "증감율" },
                image: { drop: "이미지를 이곳에 드래그하거나 클릭하세요", converting: "변환 중...", download: "다운로드", quality: "화질 설정", original: "원본", converted: "변환됨" },
                color: { hex: "HEX 코드", rgb: "RGB (R, G, B)", hsl: "HSL (H, S, L)", cmyk: "CMYK (C, M, Y, K)", hsv: "HSV (H, S, V)", picker: "색상 선택", copy: "복사", copied: "완료!" },
                discount: { price: "원래 가격", rate: "할인율 (%)", saved: "할인 금액", final: "최종 가격" },
                compound: { principal: "원금", monthly: "월 적립", rate: "연 수익률 (%)", years: "기간 (년)", final: "최종 금액", contrib: "총 납입", interest: "총 이자", table: "연도별 추이", year: "연도", balance: "잔액", totalContrib: "누적 납입" },
                dca: { mode: "입력 방식", byAmount: "금액 기준", byQty: "수량 기준", add: "매수 추가", price: "가격", qty: "수량", amount: "금액", remove: "삭제", avg: "평균단가", totalQty: "총 수량", totalInvest: "총 투자금", currentPrice: "현재가", pnl: "손익", roi: "수익률" },
                pnl: { buy: "매수가", sell: "현재가/매도가", qty: "수량", fee: "수수료 (%)", profit: "손익", roi: "수익률", breakeven: "손익분기점" },
                unit: { 
                    input: "입력값", 
                    result: "변환값", 
                    types: { length: "길이", weight: "무게", temp: "온도" },
                    tempLabels: {
                        Celsius: "섭씨 (°C)", Fahrenheit: "화씨 (°F)", Newton: "뉴턴 (°N)", Delisle: "덜릴 (°De)", Kelvin: "켈빈 (K)", Reaumur: "열씨 (°R)", Rankine: "랭킨 (°Ra)", Romer: "로머 (°Rø)"
                    }
                },
                stopwatch: { start: "시작", stop: "정지", reset: "초기화" },
                pomodoro: { 
                    statusWork: "🔥 집중 시간", statusBreak: "☕ 휴식 시간", start: "시작", pause: "일시정지", reset: "리셋", 
                    switchWork: "집중 모드로", switchBreak: "휴식 모드로", setting: "시간 설정 (분)", labelWork: "집중", labelBreak: "휴식"
                },
                password: { length: "길이", numbers: "숫자 (0-9)", symbols: "특수문자 (!@#)", generate: "새로 생성", copied: "복사 완료!" },
                dday: { label: "날짜 선택", guide: "기념일이나 목표일을 선택하세요", isToday: "🎉 오늘입니다!", daysLeft: "일 남음", daysPast: "일 지남" },
                lotto: { btn: "번호 추첨하기", guide: "행운의 번호를 확인해보세요" },
                tipsTitle: "활용 꿀팁",
                ad: "광고 영역"
            },
            en: {
                title: "Utility Box",
                subtitle: "Essential Web Tools",
                categories: { text: "Text", math: "Math", media: "Media", time: "Time", security: "Security", fun: "Fun", health: "Health" },
                tools: { text: "Word Counter", case: "Case Converter", percent: "Percent Calc", discount: "Discount Calc", compound: "Compound Interest", dca: "DCA Avg Cost", pnl: "P/L Calculator", image: "Image Converter", color: "Color Converter", unit: "Unit Converter", stopwatch: "Stopwatch", pomodoro: "Pomodoro", dday: "D-Day", password: "Password", lotto: "Lotto", bmi: "BMI Calculator" },
                seo: {
                    text: { 
                        title: "📝 Character & Word Counter", 
                        desc: "Accurately count characters (with/without spaces), words, and lines. Essential for essays, blog posts (SEO), social media posts (Twitter, Instagram), and reports with character limits.", 
                        tags: ["#wordcount", "#charactercount", "#essayhelper", "#bloggingtools"] 
                    },
                    case: { 
                        title: "🔠 Case Converter for Developers", 
                        desc: "Easily convert text between UPPERCASE, lowercase, camelCase, PascalCase, snake_case, and kebab-case. A must-have tool for coders and writers.", 
                        tags: ["#caseconverter", "#camelCase", "#snake_case", "#kebab_case", "#PascalCase"] 
                    },
                    bmi: { 
                        title: "⚖️ BMI Calculator", 
                        desc: "Calculate your Body Mass Index (BMI) using height and weight to check if you are underweight, normal, overweight, or obese. Monitor your health simply.", 
                        tags: ["#bmicalculator", "#health", "#fitness", "#bodymassindex"] 
                    },
                    percent: { 
                        title: "🧮 Percentage Calculator", 
                        desc: "Calculate percentages, percentage increase/decrease, and find what percent one number is of another. Useful for calculating stock returns, sales tax, and tips.", 
                        tags: ["#percentagecalculator", "#math", "#finance", "#stockreturn"] 
                    },
                    image: { 
                        title: "🖼️ Image to WebP Converter", 
                        desc: "Convert JPG to WebP, PNG to WebP, and JPEG images to WebP format instantly in your browser. Reduce image file size for better website performance and SEO scores.", 
                        tags: ["#imagetowebp", "#pngtowebp", "#jpgtowebp", "#imageconverter", "#compression"] 
                    },
                    color: { 
                        title: "🎨 HEX to RGB/CMYK/HSV Converter", 
                        desc: "Convert between HEX, RGB, HSL, CMYK, and HSV color formats instantly. Use the color picker to find the perfect shade for your designs.", 
                        tags: ["#colorconverter", "#hextorgb", "#cmykconverter", "#hsvconverter", "#colorpicker"] 
                    },
                    discount: { 
                        title: "🛍️ Discount & Sale Calculator", 
                        desc: "Calculate the final price after discount. Enter the original price and discount percentage to see how much you save during shopping sales.", 
                        tags: ["#discountcalculator", "#shopping", "#sale", "#pricecheck"] 
                    },
                    compound: {
                        title: "📈 Compound Interest Calculator",
                        desc: "Calculate compound growth with optional monthly contributions. Great for long-term investing simulations in stocks or crypto.",
                        tags: ["#compoundinterest", "#investing", "#monthlycontribution", "#returns"]
                    },
                    dca: {
                        title: "🪙 DCA Average Cost Calculator",
                        desc: "Add your buys to get average cost, total quantity, total invested, and current profit/loss. Perfect for DCA plans.",
                        tags: ["#DCA", "#averagecost", "#crypto", "#stocks"]
                    },
                    pnl: {
                        title: "💹 Profit & Loss (P/L) Calculator",
                        desc: "Enter buy price, current/sell price, quantity, and fees to calculate P/L, ROI, and break-even quickly.",
                        tags: ["#profitloss", "#ROI", "#breakeven", "#trading"]
                    },
                    unit: { 
                        title: "📏 Universal Unit Converter", 
                        desc: "Convert between common units of length (cm to inch), weight (kg to lbs), and temperature (Celsius to Fahrenheit).", 
                        tags: ["#unitconverter", "#measurement", "#conversion"] 
                    },
                    stopwatch: { 
                        title: "⏱️ Online Stopwatch", 
                        desc: "A precise online stopwatch for timing study sessions, workouts, cooking, or any activity requiring time tracking.", 
                        tags: ["#stopwatch", "#timer", "#studytool", "#workouttimer"] 
                    },
                    pomodoro: { 
                        title: "🍅 Pomodoro Focus Timer", 
                        desc: "Boost productivity using the Pomodoro Technique. Work for 25 minutes and take a 5-minute break. Stay focused and efficient.", 
                        tags: ["#pomodoro", "#focustimer", "#productivity", "#timemanagement"] 
                    },
                    dday: { 
                        title: "📅 D-Day Counter", 
                        desc: "Calculate days remaining (D-) or days passed (D+) for anniversaries, exams, birthdays, and holidays.", 
                        tags: ["#ddaycounter", "#daysleft", "#anniversary", "#countdown"] 
                    },
                    password: { 
                        title: "🔒 Secure Password Generator", 
                        desc: "Generate strong, secure, and random passwords containing numbers and symbols to protect your accounts from hacking.", 
                        tags: ["#passwordgenerator", "#security", "#cybersecurity", "#strongpassword"] 
                    },
                    lotto: { 
                        title: "🍀 Lucky Lotto Number Generator", 
                        desc: "Generate random lucky numbers for lottery tickets. A fun tool to pick your numbers based on pure chance.", 
                        tags: ["#lotto", "#lottery", "#randomnumbers", "#lucky"] 
                    }
                },
                wordCounter: { placeholder: "Type here...", withSpace: "Chars", noSpace: "No Space", words: "Words", lines: "Lines" },
                case: { placeholder: "Enter text to convert...", copy: "Copy", copied: "Copied!", formats: { upper: "UPPERCASE", lower: "lowercase", camel: "camelCase", pascal: "PascalCase", snake: "snake_case", kebab: "kebab-case" } },
                bmi: { height: "Height (cm)", weight: "Weight (kg)", result: "Your BMI", status: { under: "Underweight", normal: "Normal", over: "Overweight", obese: "Obese" }, guide: "* Based on BMI Standard" },
                percent: { title: "Percent Calc", label1: "What is", label2: "% of?", label3: "Result", type1: "Percentage", type2: "Of Value", type3: "Change" },
                image: { drop: "Drag & Drop or Click", converting: "Converting...", download: "Download", quality: "Quality", original: "Original", converted: "Converted" },
                color: { hex: "HEX Code", rgb: "RGB (R, G, B)", hsl: "HSL (H, S, L)", cmyk: "CMYK (C, M, Y, K)", hsv: "HSV (H, S, V)", picker: "Pick Color", copy: "Copy", copied: "Copied!" },
                discount: { price: "Original Price", rate: "Discount (%)", saved: "You Save", final: "Final Price" },
                compound: { principal: "Principal", monthly: "Monthly Add", rate: "Annual Return (%)", years: "Years", final: "Final Balance", contrib: "Total Contrib.", interest: "Total Interest", table: "Year-by-Year", year: "Year", balance: "Balance", totalContrib: "Contrib. Total" },
                dca: { mode: "Input Mode", byAmount: "By Amount", byQty: "By Quantity", add: "Add Buy", price: "Price", qty: "Qty", amount: "Amount", remove: "Remove", avg: "Avg Cost", totalQty: "Total Qty", totalInvest: "Total Invested", currentPrice: "Current Price", pnl: "P/L", roi: "ROI" },
                pnl: { buy: "Buy Price", sell: "Current/Sell Price", qty: "Quantity", fee: "Fee (%)", profit: "Profit/Loss", roi: "ROI", breakeven: "Break-even Price" },
                unit: { 
                    input: "Input", result: "Result", types: { length: "Length", weight: "Weight", temp: "Temp" },
                    tempLabels: { Celsius: "Celsius (°C)", Fahrenheit: "Fahrenheit (°F)", Newton: "Newton (°N)", Delisle: "Delisle (°De)", Kelvin: "Kelvin (K)", Reaumur: "Réaumur (°R)", Rankine: "Rankine (°Ra)", Romer: "Rømer (°Rø)" }
                },
                stopwatch: { start: "Start", stop: "Stop", reset: "Reset" },
                pomodoro: { 
                    statusWork: "🔥 Focus Time", statusBreak: "☕ Break Time", start: "Start", pause: "Pause", reset: "Reset", 
                    switchWork: "Switch to Focus", switchBreak: "Switch to Break", setting: "Settings (min)", labelWork: "Focus", labelBreak: "Break"
                },
                password: { length: "Length", numbers: "Numbers", symbols: "Symbols", generate: "Generate", copied: "Copied!" },
                dday: { label: "Target Date", guide: "Select your target date", isToday: "🎉 It's Today!", daysLeft: "days left", daysPast: "days past" },
                lotto: { btn: "Draw Numbers", guide: "Check your lucky numbers" },
                tipsTitle: "Usage Tips",
                ad: "Ad Space"
            }
        };

        // --- Common Components ---
        // 🚀 안정적인 아이콘 렌더링 컴포넌트 (createIcons 방식 사용)
        const Icon = React.memo(({ name, size = 20, className = "" }) => {
            const iconRef = useRef(null);

            useEffect(() => {
                if (window.lucide && window.lucide.createIcons) {
                    window.lucide.createIcons({
                        root: iconRef.current ? iconRef.current.parentNode : document.body,
                        nameAttr: 'data-lucide',
                        attrs: {
                            class: className,
                            width: size,
                            height: size,
                            'stroke-width': 2
                        }
                    });
                }
            }, [name, size, className]);

            return (
                <span ref={iconRef} className="inline-flex items-center justify-center align-middle" style={{ width: size, height: size }}>
                    <i data-lucide={name} style={{ width: size, height: size, display: 'block' }}></i>
                </span>
            );
        });

        const Card = ({ children, className = "" }) => (
            <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-slide-up ${className}`}>{children}</div>
        );

        const Button = ({ children, onClick, variant = "primary", className = "", ...props }) => {
            const base = "px-5 py-2.5 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2 text-sm";
            const variants = {
                primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200",
                secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
                outline: "border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600",
                success: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200",
                danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200"
            };
            return <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`} {...props}>
                {children}
            </button>;
        };

        const InputGroup = ({ label, children }) => (
            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
                {children}
            </div>
        );

        // --- Tools Implementation ---

        // 13. Color Converter
        const ColorConverter = ({ t }) => {
            const [values, setValues] = useState({
                hex: '#3b82f6',
                rgb: '59, 130, 246',
                hsl: '217, 91%, 60%',
                cmyk: '76, 47, 0, 4',
                hsv: '217, 76%, 96%'
            });
            const [pickerColor, setPickerColor] = useState('#3b82f6');
            const [copied, setCopied] = useState(null);

            // --- Converters ---
            const rgbToHex = (r, g, b) => "#" + [r, g, b].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');

            const rgbToHsl = (r, g, b) => {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                if (max === min) { h = s = 0; } 
                else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
            };

            const rgbToCmyk = (r, g, b) => {
                let c = 1 - (r / 255);
                let m = 1 - (g / 255);
                let y = 1 - (b / 255);
                let k = Math.min(c, m, y);
                if (k === 1) return "0, 0, 0, 100";
                c = (c - k) / (1 - k);
                m = (m - k) / (1 - k);
                y = (y - k) / (1 - k);
                return `${Math.round(c * 100)}, ${Math.round(m * 100)}, ${Math.round(y * 100)}, ${Math.round(k * 100)}`;
            };

            const rgbToHsv = (r, g, b) => {
                r /= 255; g /= 255; b /= 255;
                let max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, v = max;
                let d = max - min;
                s = max === 0 ? 0 : d / max;
                if (max === min) { h = 0; } 
                else {
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%`;
            };

            // --- Parsers ---
            const parseRgb = (str) => {
                const m = str.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
                if(m) return { r: parseInt(m[1]), g: parseInt(m[2]), b: parseInt(m[3]) };
                return null;
            };

            // --- Update Handler ---
            const updateColors = (type, val) => {
                // Update input display immediately
                setValues(prev => ({ ...prev, [type]: val }));

                let r, g, b;

                try {
                    if (type === 'hex') {
                        if (!/^#?[0-9A-F]{6}$/i.test(val)) return;
                        const hex = val.replace('#', '');
                        r = parseInt(hex.substring(0, 2), 16);
                        g = parseInt(hex.substring(2, 4), 16);
                        b = parseInt(hex.substring(4, 6), 16);
                    } else if (type === 'rgb') {
                        const c = parseRgb(val);
                        if (!c) return;
                        ({r, g, b} = c);
                    } else if (type === 'hsl') {
                        const m = val.match(/(\d+)[,\s]+(\d+)%?[,\s]+(\d+)%?/);
                        if (!m) return;
                        let h = parseInt(m[1]), s = parseInt(m[2])/100, l = parseInt(m[3])/100;
                        const c = (1 - Math.abs(2 * l - 1)) * s;
                        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
                        const m_ = l - c / 2;
                        let r_, g_, b_;
                        if (0 <= h && h < 60) { r_ = c; g_ = x; b_ = 0; }
                        else if (60 <= h && h < 120) { r_ = x; g_ = c; b_ = 0; }
                        else if (120 <= h && h < 180) { r_ = 0; g_ = c; b_ = x; }
                        else if (180 <= h && h < 240) { r_ = 0; g_ = x; b_ = c; }
                        else if (240 <= h && h < 300) { r_ = x; g_ = 0; b_ = c; }
                        else { r_ = c; g_ = 0; b_ = x; }
                        r = Math.round((r_ + m_) * 255);
                        g = Math.round((g_ + m_) * 255);
                        b = Math.round((b_ + m_) * 255);
                    } else if (type === 'cmyk') {
                        const m = val.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
                        if (!m) return;
                        let c = parseInt(m[1])/100, m_ = parseInt(m[2])/100, y = parseInt(m[3])/100, k = parseInt(m[4])/100;
                        r = 255 * (1 - c) * (1 - k);
                        g = 255 * (1 - m_) * (1 - k);
                        b = 255 * (1 - y) * (1 - k);
                    } else if (type === 'hsv') {
                        const m = val.match(/(\d+)[,\s]+(\d+)%?[,\s]+(\d+)%?/);
                        if (!m) return;
                        let h = parseInt(m[1]), s = parseInt(m[2])/100, v = parseInt(m[3])/100;
                        let c = v * s;
                        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
                        let m_ = v - c;
                        let r_, g_, b_;
                        if (0 <= h && h < 60) { r_ = c; g_ = x; b_ = 0; }
                        else if (60 <= h && h < 120) { r_ = x; g_ = c; b_ = 0; }
                        else if (120 <= h && h < 180) { r_ = 0; g_ = c; b_ = x; }
                        else if (180 <= h && h < 240) { r_ = 0; g_ = x; b_ = c; }
                        else if (240 <= h && h < 300) { r_ = x; g_ = 0; b_ = c; }
                        else { r_ = c; g_ = 0; b_ = x; }
                        r = Math.round((r_ + m_) * 255);
                        g = Math.round((g_ + m_) * 255);
                        b = Math.round((b_ + m_) * 255);
                    } else if (type === 'picker') {
                        // val is hex from picker
                        const hex = val.replace('#', '');
                        r = parseInt(hex.substring(0, 2), 16);
                        g = parseInt(hex.substring(2, 4), 16);
                        b = parseInt(hex.substring(4, 6), 16);
                    }

                    // Clamp
                    r = Math.max(0, Math.min(255, Math.round(r)));
                    g = Math.max(0, Math.min(255, Math.round(g)));
                    b = Math.max(0, Math.min(255, Math.round(b)));

                    // Update derived values
                    const newHex = rgbToHex(r, g, b);
                    setPickerColor(newHex);
                    
                    setValues(prev => ({
                        hex: type === 'hex' ? val : newHex,
                        rgb: type === 'rgb' ? val : `${r}, ${g}, ${b}`,
                        hsl: type === 'hsl' ? val : rgbToHsl(r, g, b),
                        cmyk: type === 'cmyk' ? val : rgbToCmyk(r, g, b),
                        hsv: type === 'hsv' ? val : rgbToHsv(r, g, b)
                    }));

                } catch (e) {
                    // Ignore parse errors while typing
                }
            };

            const handleHexChange = (e) => {
                updateColors('hex', e.target.value);
            };

            const handlePickerChange = (e) => {
                updateColors('picker', e.target.value);
            };

            const copyToClipboard = (text, type) => {
                navigator.clipboard.writeText(text);
                setCopied(type);
                setTimeout(() => setCopied(null), 1500);
            };

            return (
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Preview & Picker */}
                        <div className="relative w-full md:w-1/3 aspect-square rounded-3xl shadow-inner border-4 border-white ring-1 ring-slate-100 overflow-hidden group">
                            <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: pickerColor }}></div>
                            <input 
                                type="color" 
                                value={pickerColor} 
                                onChange={handlePickerChange} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                {t.color.picker}
                            </div>
                        </div>

                        {/* Values */}
                        <div className="flex-1 w-full space-y-4">
                            {['hex', 'rgb', 'hsl', 'cmyk', 'hsv'].map((key) => (
                                <div key={key} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center group hover:border-blue-300 transition-all">
                                    <div className="flex-1 mr-4">
                                        <div className="text-xs font-bold text-slate-400 mb-1 uppercase">{t.color[key]}</div>
                                        <input
                                            type="text"
                                            value={values[key]}
                                            onChange={(e) => updateColors(key, e.target.value)}
                                            className="w-full font-mono text-slate-700 font-medium bg-transparent outline-none"
                                        />
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(values[key], key)} 
                                        className="text-slate-400 hover:text-blue-600 transition-colors p-2"
                                        title={t.color.copy}
                                    >
                                        {copied === key ? <span className="text-xs text-green-500 font-bold">{t.color.copied}</span> : <Icon name="copy" size={18} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        // 1. Image Converter
        const ImageTools = ({ t }) => {
            const [file, setFile] = useState(null);
            const [preview, setPreview] = useState(null);
            const [converted, setConverted] = useState(null);
            const [quality, setQuality] = useState(0.8);
            const [loading, setLoading] = useState(false);
            const canvasRef = useRef(null);
            const handleFile = (e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); setConverted(null); } };
            const convertToWebP = useCallback(() => {
                if (!file) return; setLoading(true); const img = new Image(); img.src = preview;
                img.onload = () => { const canvas = canvasRef.current; canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0); const dataUrl = canvas.toDataURL('image/webp', quality); setConverted(dataUrl); setLoading(false); };
            }, [file, preview, quality]);
            return (
                <div className="space-y-6">
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    {!file ? (
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl h-64 flex flex-col items-center justify-center text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                            <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                            <Icon name="image-plus" size={48} className="mb-4 text-slate-300" />
                            <p className="font-medium">{t.image.drop}</p>
                            <span className="text-xs mt-2 text-slate-400">JPG, PNG → WebP</span>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2"><span className="text-xs font-bold text-slate-400 uppercase">{t.image.original}</span><img src={preview} className="w-full h-48 object-contain bg-slate-100 rounded-xl border border-slate-200" /><div className="text-xs text-center text-slate-500">{(file.size / 1024).toFixed(1)} KB</div></div>
                                <div className="space-y-2"><span className="text-xs font-bold text-slate-400 uppercase">{t.image.converted}</span>{converted ? <><img src={converted} className="w-full h-48 object-contain bg-slate-100 rounded-xl border border-slate-200" /><div className="text-xs text-center text-blue-500 font-bold">{((converted.length * 3 / 4) / 1024).toFixed(1)} KB (Est.)</div></> : <div className="w-full h-48 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">Waiting...</div>}</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl space-y-4">
                                <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-600">{t.image.quality}: {Math.round(quality * 100)}%</span></div>
                                <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => setQuality(parseFloat(e.target.value))} className="w-full accent-blue-600" />
                                <div className="flex gap-3">
                                    <Button onClick={convertToWebP} className="flex-1">{loading ? t.image.converting : "WebP 변환하기"}</Button>
                                    {converted && <a href={converted} download={`converted_${Date.now()}.webp`} className="flex-1"><Button variant="success" className="w-full"><Icon name="download" size={18} className="mr-2 text-white" /> {t.image.download}</Button></a>}
                                    <Button variant="secondary" onClick={() => {setFile(null); setConverted(null);}}><Icon name="x" size={18} /></Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        const PercentCalculator = ({ t }) => {
            const [mode, setMode] = useState(0); const [val1, setVal1] = useState(''); const [val2, setVal2] = useState('');
            const result = useMemo(() => { const v1 = parseFloat(val1); const v2 = parseFloat(val2); if (isNaN(v1) || isNaN(v2)) return 0; if (mode === 0) return v1 * (v2 / 100); if (mode === 1) return (v1 / v2) * 100; if (mode === 2) return ((v2 - v1) / v1) * 100; return 0; }, [mode, val1, val2]);
            const modes = [{ label: t.percent.type1, desc: t.percent.label1 + " X " + t.percent.label2 }, { label: t.percent.type2, desc: "X " + t.percent.label2 + " Y?" }, { label: t.percent.type3, desc: "X → Y " + t.percent.type3 }];
            return (
                <div className="space-y-6">
                    <div className="flex p-1 bg-slate-100 rounded-xl overflow-x-auto">{modes.map((m, i) => (<button key={i} onClick={() => setMode(i)} className={`flex-1 py-2 px-3 text-xs md:text-sm font-bold rounded-lg whitespace-nowrap transition-all ${mode === i ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{m.label}</button>))}</div>
                    <div className="bg-slate-50 p-6 rounded-2xl text-center space-y-2"><p className="text-sm text-slate-500">{modes[mode].desc}</p></div>
                    <div className="flex flex-col md:flex-row items-center gap-4"><input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="A" className="flex-1 w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-mono text-lg text-center" /><span className="text-slate-400 font-bold">{mode === 2 ? "→" : "/"}</span><input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="B" className="flex-1 w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none font-mono text-lg text-center" /></div>
                    <div className="bg-blue-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-blue-200"><span className="text-blue-200 text-xs font-bold uppercase mb-1">{t.percent.label3}</span><div className="text-4xl font-bold font-mono">{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}<span className="text-xl ml-1 opacity-70">{mode === 0 ? "" : "%"}</span></div></div>
                </div>
            );
        };

        const WordCounter = ({ t }) => {
            const [text, setText] = useState('');
            const stats = { charWithSpace: text.length, charNoSpace: text.replace(/\s/g, '').length, words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length, lines: text === '' ? 0 : text.split(/\n/).length };
            return (
                <div className="space-y-4">
                    <textarea value={text} onChange={e => setText(e.target.value)} placeholder={t.wordCounter.placeholder} className="w-full h-48 p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 outline-none resize-none" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-700"><div className="text-xl font-bold">{stats.charWithSpace}</div><div className="text-xs opacity-70">{t.wordCounter.withSpace}</div></div>
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-700"><div className="text-xl font-bold">{stats.charNoSpace}</div><div className="text-xs opacity-70">{t.wordCounter.noSpace}</div></div>
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700"><div className="text-xl font-bold">{stats.words}</div><div className="text-xs opacity-70">{t.wordCounter.words}</div></div>
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-700"><div className="text-xl font-bold">{stats.lines}</div><div className="text-xs opacity-70">{t.wordCounter.lines}</div></div>
                    </div>
                </div>
            );
        };

        const DiscountCalculator = ({ t }) => {
            const [price, setPrice] = useState(''); const [discount, setDiscount] = useState('');
            const final = price && discount ? price - (price * (discount / 100)) : 0; const saved = price && discount ? price * (discount / 100) : 0;
            return (
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        <InputGroup label={t.discount.price}><input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xl font-bold text-slate-700" placeholder="0" /></InputGroup>
                        <InputGroup label={t.discount.rate}><div className="space-y-3"><div className="flex gap-2">{[10, 20, 30, 50].map(p => (<button key={p} onClick={() => setDiscount(p)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${discount === p ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{p}%</button>))}</div><input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xl font-bold text-slate-700" placeholder="0" /></div></InputGroup>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-center h-full"><div className="flex justify-between items-center text-slate-400"><span>{t.discount.saved}</span><span className="font-mono text-lg text-blue-400">-{saved.toLocaleString()}</span></div><div className="h-px bg-slate-700 my-4"></div><div><div className="text-slate-400 text-sm mb-1">{t.discount.final}</div><div className="text-4xl font-bold font-mono text-white">{final.toLocaleString()}</div></div></div>
                </div>
            );
        };

        const UnitConverter = ({ t }) => {
            const [category, setCategory] = useState('length'); const [val, setVal] = useState(''); const [from, setFrom] = useState('cm'); const [to, setTo] = useState('inch');
            const units = { length: ['cm', 'm', 'km', 'inch', 'ft', 'yard'], weight: ['kg', 'g', 'lb', 'oz'], temp: ['Celsius', 'Fahrenheit', 'Newton', 'Delisle', 'Kelvin', 'Reaumur', 'Rankine', 'Romer'] };
            const convert = () => {
                if(!val) return ''; const v = parseFloat(val);
                if(category === 'temp') { if (from === to) return v; let c; if (from === 'Celsius') c = v; else if (from === 'Fahrenheit') c = (v - 32) * 5/9; else if (from === 'Newton') c = v * 100/33; else if (from === 'Delisle') c = 100 - v * 2/3; else if (from === 'Kelvin') c = v - 273.15; else if (from === 'Reaumur') c = v * 5/4; else if (from === 'Rankine') c = (v - 491.67) * 5/9; else if (from === 'Romer') c = (v - 7.5) * 40/21; let r; if (to === 'Celsius') r = c; else if (to === 'Fahrenheit') r = c * 9/5 + 32; else if (to === 'Newton') r = c * 33/100; else if (to === 'Delisle') r = (100 - c) * 3/2; else if (to === 'Kelvin') r = c + 273.15; else if (to === 'Reaumur') r = c * 4/5; else if (to === 'Rankine') r = (c + 273.15) * 9/5; else if (to === 'Romer') r = c * 21/40 + 7.5; return r.toFixed(2); }
                const rates = { cm: 1, m: 100, km: 100000, inch: 2.54, ft: 30.48, yard: 91.44, g: 1, kg: 1000, lb: 453.592, oz: 28.3495 }; return ((v * rates[from]) / rates[to]).toFixed(4);
            };
            useEffect(() => { const defs = { length: ['cm', 'inch'], weight: ['kg', 'lb'], temp: ['Celsius', 'Fahrenheit'] }; setFrom(defs[category][0]); setTo(defs[category][1]); setVal(''); }, [category]);
            const getLabel = (u) => (category === 'temp' && t.unit.tempLabels && t.unit.tempLabels[u]) ? t.unit.tempLabels[u] : u;
            return (
                <div className="space-y-6">
                    <div className="flex p-1 bg-slate-100 rounded-xl">{Object.keys(units).map(c => (<button key={c} onClick={() => setCategory(c)} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg capitalize transition-all ${category === c ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>{t.unit.types[c]}</button>))}</div>
                    <div className="flex flex-col md:flex-row gap-4 items-center"><div className="flex-1 w-full space-y-2"><label className="text-xs font-bold text-slate-400 uppercase ml-1">{t.unit.input}</label><div className="flex gap-2"><input type="number" value={val} onChange={e => setVal(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-lg font-mono font-bold" placeholder="0" /><select value={from} onChange={e => setFrom(e.target.value)} className="p-4 rounded-xl bg-slate-100 font-bold text-slate-600 outline-none cursor-pointer max-w-[150px]">{units[category].map(u => <option key={u} value={u}>{getLabel(u)}</option>)}</select></div></div><Icon name="arrow-right" className="text-slate-300 hidden md:block" /><div className="flex-1 w-full space-y-2"><label className="text-xs font-bold text-slate-400 uppercase ml-1">{t.unit.result}</label><div className="flex gap-2"><div className="w-full p-4 rounded-xl bg-blue-50 border border-blue-100 text-lg font-mono font-bold text-blue-600 flex items-center">{val ? Number(convert()).toLocaleString() : '0'}</div><select value={to} onChange={e => setTo(e.target.value)} className="p-4 rounded-xl bg-slate-100 font-bold text-slate-600 outline-none cursor-pointer max-w-[150px]">{units[category].map(u => <option key={u} value={u}>{getLabel(u)}</option>)}</select></div></div></div>
                </div>
            );
        };

        
        // 📈 복리 계산기 (적립식 포함)
        const CompoundInterestCalculator = ({ t }) => {
            const n = (v) => {
                const x = parseFloat(String(v).replace(/,/g, ""));
                return Number.isFinite(x) ? x : 0;
            };
            const fmt = (v) => (Number.isFinite(v) ? v.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—");

            const [principal, setPrincipal] = useState("1000000");
            const [monthly, setMonthly] = useState("200000");
            const [rate, setRate] = useState("10");
            const [years, setYears] = useState("5");

            const P = n(principal);
            const M = n(monthly);
            const R = n(rate) / 100;
            const Y = Math.max(0, Math.min(200, Math.floor(n(years))));

            const months = Y * 12;
            let bal = P;
            let contrib = P;
            const rows = [];
            for (let m = 1; m <= months; m++) {
                bal = bal * (1 + R / 12) + M;
                contrib += M;
                if (m % 12 === 0) {
                    rows.push({
                        year: m / 12,
                        balance: bal,
                        contrib: contrib,
                    });
                }
            }
            const interest = bal - contrib;

            const copySummary = async () => {
                const text = [
                    `${t.tools.compound}`,
                    `${t.compound.principal}: ${fmt(P)}`,
                    `${t.compound.monthly}: ${fmt(M)}`,
                    `${t.compound.rate}: ${fmt(n(rate))}%`,
                    `${t.compound.years}: ${Y}`,
                    `${t.compound.final}: ${fmt(bal)}`,
                    `${t.compound.contrib}: ${fmt(contrib)}`,
                    `${t.compound.interest}: ${fmt(interest)}`,
                ].join("\n");
                try {
                    await navigator.clipboard.writeText(text);
                } catch (_) { }
            };

            return (
                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900">{t.tools.compound}</h2>
                        <p className="mt-1 text-sm text-slate-600">{t.seo?.compound?.desc || ""}</p>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.compound.principal}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-slate-400"
                                    value={principal} onChange={(e) => setPrincipal(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.compound.monthly}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-slate-400"
                                    value={monthly} onChange={(e) => setMonthly(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.compound.rate}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-slate-400"
                                    value={rate} onChange={(e) => setRate(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.compound.years}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-slate-400"
                                    value={years} onChange={(e) => setYears(e.target.value)} inputMode="numeric" />
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.compound.final}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(bal)}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.compound.contrib}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(contrib)}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.compound.interest}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(interest)}</div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <button onClick={copySummary}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50">
                                Copy
                            </button>
                            <span className="text-xs text-slate-500">{t.compound.table}</span>
                        </div>

                        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-50 text-slate-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left">{t.compound.year}</th>
                                        <th className="px-4 py-3 text-right">{t.compound.totalContrib}</th>
                                        <th className="px-4 py-3 text-right">{t.compound.balance}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 ? (
                                        <tr><td className="px-4 py-6 text-center text-slate-500" colSpan={3}>—</td></tr>
                                    ) : rows.map((r) => (
                                        <tr key={r.year} className="border-t border-slate-200">
                                            <td className="px-4 py-3">{r.year}</td>
                                            <td className="px-4 py-3 text-right">{fmt(r.contrib)}</td>
                                            <td className="px-4 py-3 text-right font-medium text-slate-900">{fmt(r.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        };

        // 🪙 분할매수(DCA) 평균단가 계산기
        const DCACalculator = ({ t }) => {
            const n = (v) => {
                const x = parseFloat(String(v).replace(/,/g, ""));
                return Number.isFinite(x) ? x : 0;
            };
            const fmt = (v) => (Number.isFinite(v) ? v.toLocaleString(undefined, { maximumFractionDigits: 8 }) : "—");

            const [mode, setMode] = useState("amount"); // amount | qty
            const [rows, setRows] = useState([{ price: "100", qty: "1", amount: "100" }]);
            const [currentPrice, setCurrentPrice] = useState("");

            const addRow = () => setRows((r) => [...r, { price: "", qty: "", amount: "" }]);
            const removeRow = (idx) => setRows((r) => r.filter((_, i) => i !== idx));
            const updateRow = (idx, key, val) => setRows((r) => r.map((it, i) => (i === idx ? { ...it, [key]: val } : it)));

            const parsed = rows
                .map((r) => {
                    const price = n(r.price);
                    const qty = mode === "qty" ? n(r.qty) : (price > 0 ? n(r.amount) / price : 0);
                    const amount = mode === "amount" ? n(r.amount) : price * qty;
                    return { price, qty, amount };
                })
                .filter((r) => r.price > 0 && r.qty > 0 && r.amount > 0);

            const totalQty = parsed.reduce((s, r) => s + r.qty, 0);
            const totalInvest = parsed.reduce((s, r) => s + r.amount, 0);
            const avgCost = totalQty > 0 ? totalInvest / totalQty : 0;

            const cp = n(currentPrice);
            const curValue = cp > 0 ? totalQty * cp : 0;
            const pnl = cp > 0 ? curValue - totalInvest : 0;
            const roi = totalInvest > 0 && cp > 0 ? (pnl / totalInvest) * 100 : 0;

            const copySummary = async () => {
                const text = [
                    `${t.tools.dca}`,
                    `${t.dca.totalInvest}: ${fmt(totalInvest)}`,
                    `${t.dca.totalQty}: ${fmt(totalQty)}`,
                    `${t.dca.avg}: ${fmt(avgCost)}`,
                    cp > 0 ? `${t.dca.currentPrice}: ${fmt(cp)}` : "",
                    cp > 0 ? `${t.dca.pnl}: ${fmt(pnl)}` : "",
                    cp > 0 ? `${t.dca.roi}: ${fmt(roi)}%` : "",
                ].filter(Boolean).join("\n");
                try { await navigator.clipboard.writeText(text); } catch (_) { }
            };

            return (
                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{t.tools.dca}</h2>
                                <p className="mt-1 text-sm text-slate-600">{t.seo?.dca?.desc || ""}</p>
                            </div>
                            <button onClick={copySummary}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50">
                                Copy
                            </button>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">{t.dca.mode}</span>
                            <button onClick={() => setMode("amount")}
                                className={"rounded-xl px-3 py-2 text-sm font-medium " + (mode === "amount" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50")}>
                                {t.dca.byAmount}
                            </button>
                            <button onClick={() => setMode("qty")}
                                className={"rounded-xl px-3 py-2 text-sm font-medium " + (mode === "qty" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50")}>
                                {t.dca.byQty}
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            {rows.map((r, idx) => (
                                <div key={idx} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-12">
                                    <div className="md:col-span-4">
                                        <label className="text-xs font-medium text-slate-600">{t.dca.price}</label>
                                        <input className="mt-1 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                            value={r.price} onChange={(e) => updateRow(idx, "price", e.target.value)} inputMode="decimal" />
                                    </div>

                                    {mode === "qty" ? (
                                        <div className="md:col-span-4">
                                            <label className="text-xs font-medium text-slate-600">{t.dca.qty}</label>
                                            <input className="mt-1 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                                value={r.qty} onChange={(e) => updateRow(idx, "qty", e.target.value)} inputMode="decimal" />
                                        </div>
                                    ) : (
                                        <div className="md:col-span-4">
                                            <label className="text-xs font-medium text-slate-600">{t.dca.amount}</label>
                                            <input className="mt-1 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                                value={r.amount} onChange={(e) => updateRow(idx, "amount", e.target.value)} inputMode="decimal" />
                                        </div>
                                    )}

                                    <div className="md:col-span-3">
                                        <div className="text-xs font-medium text-slate-600">{mode === "qty" ? t.dca.amount : t.dca.qty}</div>
                                        <div className="mt-3 text-sm font-semibold text-slate-900">
                                            {(() => {
                                                const price = n(r.price);
                                                if (price <= 0) return "—";
                                                if (mode === "qty") {
                                                    const qty = n(r.qty);
                                                    return fmt(price * qty);
                                                } else {
                                                    const amt = n(r.amount);
                                                    return fmt(amt / price);
                                                }
                                            })()}
                                        </div>
                                    </div>

                                    <div className="md:col-span-1 flex items-start justify-end">
                                        <button onClick={() => removeRow(idx)} disabled={rows.length === 1}
                                            className={"rounded-xl px-3 py-2 text-sm font-medium " + (rows.length === 1 ? "bg-slate-100 text-slate-400" : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50")}>
                                            {t.dca.remove}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={addRow}
                                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                                {t.dca.add}
                            </button>
                        </div>

                        <div className="mt-6 grid gap-3 md:grid-cols-4">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.dca.totalInvest}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(totalInvest)}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.dca.totalQty}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(totalQty)}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.dca.avg}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(avgCost)}</div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <label className="text-xs font-medium text-slate-600">{t.dca.currentPrice}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                    value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} inputMode="decimal" />
                            </div>
                        </div>

                        {cp > 0 && (
                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="text-xs font-medium text-slate-600">{t.dca.pnl}</div>
                                    <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(pnl)}</div>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="text-xs font-medium text-slate-600">{t.dca.roi}</div>
                                    <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(roi)}%</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        };

        // 💹 손익/수익률 계산기 (수수료 포함)
        const ProfitLossCalculator = ({ t }) => {
            const n = (v) => {
                const x = parseFloat(String(v).replace(/,/g, ""));
                return Number.isFinite(x) ? x : 0;
            };
            const fmt = (v) => (Number.isFinite(v) ? v.toLocaleString(undefined, { maximumFractionDigits: 8 }) : "—");

            const [buy, setBuy] = useState("100");
            const [sell, setSell] = useState("120");
            const [qty, setQty] = useState("1");
            const [fee, setFee] = useState("0");

            const B = n(buy);
            const S = n(sell);
            const Q = n(qty);
            const F = Math.max(0, n(fee)) / 100;

            const grossBuy = B * Q;
            const grossSell = S * Q;
            const feeCost = grossBuy * F + grossSell * F;
            const profit = grossSell - grossBuy - feeCost;
            const roi = grossBuy > 0 ? (profit / grossBuy) * 100 : 0;

            const breakeven = (B > 0 && (1 - F) > 0) ? (B * (1 + F) / (1 - F)) : 0;

            const copySummary = async () => {
                const text = [
                    `${t.tools.pnl}`,
                    `${t.pnl.buy}: ${fmt(B)}`,
                    `${t.pnl.sell}: ${fmt(S)}`,
                    `${t.pnl.qty}: ${fmt(Q)}`,
                    `${t.pnl.fee}: ${fmt(n(fee))}%`,
                    `${t.pnl.profit}: ${fmt(profit)}`,
                    `${t.pnl.roi}: ${fmt(roi)}%`,
                    `${t.pnl.breakeven}: ${fmt(breakeven)}`,
                ].join("\n");
                try { await navigator.clipboard.writeText(text); } catch (_) { }
            };

            return (
                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{t.tools.pnl}</h2>
                                <p className="mt-1 text-sm text-slate-600">{t.seo?.pnl?.desc || ""}</p>
                            </div>
                            <button onClick={copySummary}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50">
                                Copy
                            </button>
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.pnl.buy}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                    value={buy} onChange={(e) => setBuy(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.pnl.sell}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                    value={sell} onChange={(e) => setSell(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.pnl.qty}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                    value={qty} onChange={(e) => setQty(e.target.value)} inputMode="decimal" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">{t.pnl.fee}</label>
                                <input className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-slate-400"
                                    value={fee} onChange={(e) => setFee(e.target.value)} inputMode="decimal" />
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3 md:grid-cols-3">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.pnl.profit}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(profit)}</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.pnl.roi}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(roi)}%</div>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <div className="text-xs font-medium text-slate-600">{t.pnl.breakeven}</div>
                                <div className="mt-1 text-2xl font-semibold text-slate-900">{fmt(breakeven)}</div>
                            </div>
                        </div>

                        <div className="mt-3 text-xs text-slate-500">
                            * {t.pnl.fee} {t.lang === "ko" ? "는 매수/매도 양쪽에 적용됩니다." : "is applied on both buy & sell."}
                        </div>
                    </div>
                </div>
            );
        };
const Stopwatch = ({ t }) => {
            const [time, setTime] = useState(0); const [run, setRun] = useState(false);
            useEffect(() => { let animationFrameId; let lastTime = Date.now(); const animate = () => { if (run) { const now = Date.now(); const delta = now - lastTime; lastTime = now; setTime(prev => prev + delta); animationFrameId = requestAnimationFrame(animate); } }; if (run) { lastTime = Date.now(); animationFrameId = requestAnimationFrame(animate); } else { cancelAnimationFrame(animationFrameId); } return () => cancelAnimationFrame(animationFrameId); }, [run]);
            const fmt = (ms) => { const m = Math.floor(ms / 60000).toString().padStart(2,'0'); const s = Math.floor((ms % 60000) / 1000).toString().padStart(2,'0'); const cs = Math.floor((ms % 1000) / 10).toString().padStart(2,'0'); return { m, s, cs }; }; const { m, s, cs } = fmt(time);
            return (
                <div className="flex flex-col items-center py-6"><div className="text-7xl md:text-9xl font-mono font-bold text-slate-800 tracking-tighter flex items-end leading-none mb-10"><span>{m}</span><span className="text-slate-300 mx-1">:</span><span>{s}</span><span className="text-3xl md:text-5xl text-blue-500 mb-2 md:mb-4 ml-1">.{cs}</span></div><div className="flex gap-4"><Button onClick={() => setRun(!run)} variant={run ? "danger" : "primary"} className="w-32 py-4 text-lg"><Icon name={run ? "pause" : "play"} size={24} className="text-white" /> {run ? t.stopwatch.stop : t.stopwatch.start}</Button><Button onClick={() => { setRun(false); setTime(0); }} variant="secondary" className="w-32 py-4 text-lg"><Icon name="rotate-ccw" size={24} /> {t.stopwatch.reset}</Button></div></div>
            );
        };

        const Pomodoro = ({ t }) => {
            const [workTime, setWorkTime] = useState(25); const [breakTime, setBreakTime] = useState(5); const [left, setLeft] = useState(workTime * 60); const [active, setActive] = useState(false); const [isWork, setIsWork] = useState(true);
            const playAlarm = () => { try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5); gain.gain.setValueAtTime(0.5, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5); osc.start(); osc.stop(ctx.currentTime + 0.5); } catch (e) { console.error("Audio play failed", e); } };
            useEffect(() => { setLeft(isWork ? workTime * 60 : breakTime * 60); setActive(false); }, [workTime, breakTime]);
            useEffect(() => { let interval; if(active && left > 0) interval = setInterval(() => setLeft(l => l - 1), 1000); else if(left === 0 && active) { setActive(false); playAlarm(); } return () => clearInterval(interval); }, [active, left]);
            const toggleMode = () => { const next = !isWork; setIsWork(next); setActive(false); setLeft(next ? workTime * 60 : breakTime * 60); }; const reset = () => { setActive(false); setLeft(isWork ? workTime * 60 : breakTime * 60); };
            const format = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
            return (
                <div className="flex flex-col items-center py-6"><div className={`px-4 py-1.5 rounded-full text-sm font-bold mb-8 ${isWork ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>{isWork ? t.pomodoro.statusWork : t.pomodoro.statusBreak}</div><div className={`text-7xl md:text-9xl font-mono font-bold tracking-tighter mb-10 ${isWork ? 'text-rose-500' : 'text-emerald-500'}`}>{format(left)}</div><div className="flex gap-4 mb-8"><Button onClick={() => setActive(!active)} className={!isWork ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-500 hover:bg-rose-600"}>{active ? t.pomodoro.pause : t.pomodoro.start}</Button><Button onClick={reset} variant="secondary">{t.pomodoro.reset}</Button></div><div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200"><div className="text-xs font-bold text-slate-400 uppercase mb-3 text-center">{t.pomodoro.setting}</div><div className="flex gap-4"><div className="flex-1 space-y-1"><label className="text-xs text-slate-500 block text-center">{t.pomodoro.labelWork}</label><input type="number" value={workTime} onChange={e => setWorkTime(Number(e.target.value))} className="w-full p-2 text-center rounded-lg border border-slate-200 focus:border-blue-500 outline-none" /></div><div className="flex-1 space-y-1"><label className="text-xs text-slate-500 block text-center">{t.pomodoro.labelBreak}</label><input type="number" value={breakTime} onChange={e => setBreakTime(Number(e.target.value))} className="w-full p-2 text-center rounded-lg border border-slate-200 focus:border-blue-500 outline-none" /></div></div></div><button onClick={toggleMode} className="mt-6 text-sm text-slate-400 hover:text-slate-600 underline">{isWork ? t.pomodoro.switchBreak : t.pomodoro.switchWork}</button></div>
            );
        };

        const DDay = ({ t }) => {
            const [date, setDate] = useState(''); const [res, setRes] = useState(null);
            useEffect(() => { if (date) { const today = new Date(); today.setHours(0,0,0,0); const target = new Date(date); const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24)); setRes(diff); } }, [date]);
            return (
                <div className="grid md:grid-cols-2 gap-6 items-center"><div className="space-y-4"><InputGroup label={t.dday.label}><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none" /></InputGroup><p className="text-sm text-slate-400">{t.dday.guide}</p></div><div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg h-48">{res !== null ? <><div className="text-5xl font-bold mb-2">{res === 0 ? "D-Day" : res > 0 ? `D-${res}` : `D+${Math.abs(res)}`}</div><div className="text-blue-100 font-medium">{res === 0 ? t.dday.isToday : res > 0 ? t.dday.daysLeft : t.dday.daysPast}</div></> : <div className="text-blue-200">Select Date</div>}</div></div>
            );
        };

        const PasswordGenerator = ({ t }) => {
            const [len, setLen] = useState(12); const [opt, setOpt] = useState({ num: true, sym: true }); const [pw, setPw] = useState(''); const [copied, setCopied] = useState(false);
            const gen = () => { let c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; if(opt.num) c += "0123456789"; if(opt.sym) c += "!@#$%^&*()_+"; let res = ""; for(let i=0; i<len; i++) res += c[Math.floor(Math.random()*c.length)]; setPw(res); setCopied(false); };
            useEffect(gen, []); const copy = () => { navigator.clipboard.writeText(pw); setCopied(true); setTimeout(() => setCopied(false), 2000); };
            return (
                <div className="space-y-6"><div onClick={copy} className="group relative bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-2xl p-6 text-center transition-all shadow-lg active:scale-[0.99]"><div className="font-mono text-2xl md:text-3xl text-white break-all">{pw}</div><div className="absolute top-4 right-4 text-slate-400 opacity-0 group-hover:opacity-100"><Icon name={copied ? "check" : "copy"} size={20} className={copied ? "text-green-400" : ""} /></div></div><div className="bg-slate-50 p-6 rounded-2xl space-y-6"><InputGroup label={`${t.password.length}: ${len}`}><input type="range" min="6" max="32" value={len} onChange={e => setLen(e.target.value)} className="w-full accent-blue-600" /></InputGroup><div className="flex gap-4">{['num', 'sym'].map(k => (<label key={k} className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-blue-300 select-none"><input type="checkbox" checked={opt[k]} onChange={() => setOpt({...opt, [k]: !opt[k]})} className="accent-blue-600" /><span className="text-sm font-medium text-slate-600">{k === 'num' ? t.password.numbers : t.password.symbols}</span></label>))}</div><Button onClick={gen} className="w-full py-4"><Icon name="refresh-cw" size={18} className="mr-2 text-white" /> {t.password.generate}</Button></div></div>
            );
        };

        const Lotto = ({ t }) => {
            const [nums, setNums] = useState([]); const gen = () => { const s = new Set(); while(s.size < 6) s.add(Math.floor(Math.random()*45)+1); setNums([...s].sort((a,b)=>a-b)); }; const colors = (n) => { if(n<=10) return ['#facc15', '#ca8a04']; if(n<=20) return ['#60a5fa', '#2563eb']; if(n<=30) return ['#f87171', '#dc2626']; if(n<=40) return ['#94a3b8', '#475569']; return ['#4ade80', '#16a34a']; };
            return (
                <div className="flex flex-col items-center py-8"><div className="flex flex-wrap justify-center gap-3 mb-12 min-h-[64px]">{nums.length > 0 ? nums.map(n => (<div key={n} className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-bounce-short" style={{background: `linear-gradient(135deg, ${colors(n)[0]}, ${colors(n)[1]})`}}>{n}</div>)) : <div className="text-slate-300 font-bold text-xl flex items-center h-14">{t.lotto.guide}</div>}</div><Button onClick={gen} className="bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200 px-10 py-4 rounded-full text-lg"><Icon name="clover" className="mr-2 text-white" /> {t.lotto.btn}</Button></div>
            );
        };

        const BMICalculator = ({ t }) => {
            const [height, setHeight] = useState(''); const [weight, setWeight] = useState('');
            const bmi = useMemo(() => { const h = parseFloat(height); const w = parseFloat(weight); if (!h || !w) return 0; return w / ((h / 100) ** 2); }, [height, weight]);
            const getStatus = (b) => { if (b === 0) return { label: '-', color: 'bg-slate-100 text-slate-400' }; if (b < 18.5) return { label: t.bmi.status.under, color: 'bg-blue-100 text-blue-600' }; if (b < 23) return { label: t.bmi.status.normal, color: 'bg-green-100 text-green-600' }; if (b < 25) return { label: t.bmi.status.over, color: 'bg-orange-100 text-orange-600' }; return { label: t.bmi.status.obese, color: 'bg-red-100 text-red-600' }; };
            const status = getStatus(bmi);
            return (
                <div className="space-y-8"><div className="grid grid-cols-2 gap-6"><InputGroup label={t.bmi.height}><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-lg text-center" placeholder="cm" /></InputGroup><InputGroup label={t.bmi.weight}><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-lg text-center" placeholder="kg" /></InputGroup></div><div className="bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center"><div className="text-sm text-slate-500 mb-2 font-medium">{t.bmi.result}</div><div className="text-5xl font-bold text-slate-800 mb-4 font-mono">{bmi ? bmi.toFixed(2) : '0.00'}</div><span className={`px-4 py-1.5 rounded-full text-sm font-bold ${status.color}`}>{status.label}</span></div><p className="text-center text-xs text-slate-400">{t.bmi.guide}</p></div>
            );
        };

        const CaseConverter = ({ t }) => {
            const [text, setText] = useState(''); const [copiedIndex, setCopiedIndex] = useState(null);
            const conversions = useMemo(() => { if (!text) return []; const words = text.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w); return [{ id: 'upper', val: text.toUpperCase() }, { id: 'lower', val: text.toLowerCase() }, { id: 'camel', val: words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') }, { id: 'pascal', val: words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') }, { id: 'snake', val: words.join('_').toLowerCase() }, { id: 'kebab', val: words.join('-').toLowerCase() }]; }, [text]);
            const copy = (val, idx) => { navigator.clipboard.writeText(val); setCopiedIndex(idx); setTimeout(() => setCopiedIndex(null), 1500); };
            return (
                <div className="space-y-6"><textarea value={text} onChange={e => setText(e.target.value)} placeholder={t.case.placeholder} className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:border-blue-500 outline-none resize-none" /><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{conversions.map((item, idx) => (<div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col group hover:border-blue-200 transition-colors"><div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-slate-400 uppercase">{t.case.formats[item.id]}</span><button onClick={() => copy(item.val, idx)} className="text-slate-400 hover:text-blue-600 transition-colors">{copiedIndex === idx ? <span className="text-xs text-green-500 font-bold">{t.case.copied}</span> : <Icon name="copy" size={14} />}</button></div><div className="text-slate-700 font-mono text-sm break-all truncate">{item.val}</div></div>))}</div></div>
            );
        };

        // --- Path Routing Helpers (no #hash) ---
        const TOOL_SLUG = {"text": "word-counter", "case": "case-converter", "percent": "universal-percent", "discount": "discount-calculator", "bmi": "bmi-calculator", "unit": "unit-converter", "image": "image-tools", "color": "color-converter", "stopwatch": "stopwatch", "pomodoro": "pomodoro-timer", "dday": "dday-calculator", "password": "password-generator", "lotto": "lotto-picker", "compound": "compound-interest-calculator", "dca": "dca-average-cost-calculator", "pnl": "profit-loss-calculator"};
        const SLUG_TOOL = Object.fromEntries(Object.entries(TOOL_SLUG).map(([k,v]) => [v,k]));
        const parseRouteFromPath = () => {
            const parts = window.location.pathname.split('/').filter(Boolean);
            const lang = (parts[0] === 'en' || parts[0] === 'ko') ? parts[0] : 'ko';
            let tool = 'text';
            if (parts[1] === 'tools' && parts[2]) tool = SLUG_TOOL[parts[2]] || 'text';
            return { lang, tool };
        };
        const getInitialRoute = () => {
            const page = window.__UBOX_PAGE__ || null;
            if (page && page.tool) {
                return { lang: (page.lang === 'en' ? 'en' : 'ko'), tool: page.tool };
            }
            return parseRouteFromPath();
        };
        const makePath = (lang, toolId) => {
            const slug = TOOL_SLUG[toolId] || TOOL_SLUG.text;
            return `/${lang}/tools/${slug}/`;
        };

        // --- Main App & Routing ---
        const App = () => {
            const initialRoute = getInitialRoute();
            const [lang, setLang] = useState(initialRoute.lang);
            const [activeToolId, setActiveToolId] = useState(initialRoute.tool);
            const [menuOpen, setMenuOpen] = useState(false);
            const THEME_KEY = 'ubox_theme';
            const [theme, setTheme] = useState(() => {
                try {
                    const saved = localStorage.getItem(THEME_KEY);
                    if (saved === 'dark' || saved === 'light') return saved;
                } catch (e) {}
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                return prefersDark ? 'dark' : 'light';
            });

            const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

            useEffect(() => {
                const root = document.documentElement;
                if (theme === 'dark') root.classList.add('dark');
                else root.classList.remove('dark');
                try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
            }, [theme]);

            // Inject minimal dark-mode overrides for pages that don't use dark: classes
            useEffect(() => {
                const id = 'ubox-darkmode-css';
                if (document.getElementById(id)) return;
                const style = document.createElement('style');
                style.id = id;
                style.textContent = `
                  html.dark body { background-color:#0b1220; color:#e5e7eb; }
                  html.dark .bg-white { background-color:#0f172a !important; }
                  html.dark .bg-slate-50 { background-color:#0b1220 !important; }
                  html.dark .bg-slate-100 { background-color:rgba(148,163,184,.10) !important; }
                  html.dark .text-slate-900, html.dark .text-slate-800, html.dark .text-slate-700, html.dark .text-slate-600, html.dark .text-slate-500 { color:#e2e8f0 !important; }
                  html.dark .text-slate-400 { color:rgba(226,232,240,.65) !important; }
                  html.dark .border-slate-200, html.dark .border-slate-100 { border-color:rgba(148,163,184,.25) !important; }
                  html.dark .shadow-sm { box-shadow:0 1px 2px rgba(0,0,0,.35) !important; }
                  /* Form controls (inputs/textarea/select) */
                  html.dark input, html.dark textarea, html.dark select {
                    background-color: rgba(15,23,42,.92) !important;
                    color: #e5e7eb !important;
                    border-color: rgba(148,163,184,.35) !important;
                  }
                  html.dark input::placeholder, html.dark textarea::placeholder {
                    color: rgba(226,232,240,.45) !important;
                  }
                  /* Tailwind focus:bg-white on dark should not flip to white */
                  html.dark .focus\:bg-white:focus { background-color: rgba(15,23,42,.92) !important; }
                  html.dark .focus\:bg-slate-50:focus { background-color: rgba(15,23,42,.92) !important; }
                  /* Cards/prose blocks */
                  html.dark .prose { color: rgba(226,232,240,.92) !important; }
                  html.dark .prose h1, html.dark .prose h2, html.dark .prose h3, html.dark .prose h4 { color:#e5e7eb !important; }
                  html.dark .prose a { color:#93c5fd !important; }
                  html.dark .prose strong { color:#e5e7eb !important; }

                `;
                document.head.appendChild(style);
            }, []);


            // --- SEO: BreadcrumbList JSON-LD (auto, per tool page) ---
            useEffect(() => {
                try {
                    // Only for tool pages (these pages set window.__UBOX_PAGE__)
                    const page = window.__UBOX_PAGE__ || null;
                    if (!page || !page.tool) return;

                    const rootName = (lang === 'ko') ? '도구 모음' : 'Tool Directory';
                    const toolName = (translations?.[lang]?.tools?.[activeToolId]) || (translations?.[lang]?.title) || 'Tool';

                    const origin = window.location.origin || 'https://uboxtools.com';
                    const rootUrl = `${origin}/${lang}/`;
                    const slug = TOOL_SLUG[activeToolId] || TOOL_SLUG.text;
                    const toolUrl = `${origin}/${lang}/tools/${slug}/`;

                    const jsonLd = {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": rootName, "item": rootUrl },
                            { "@type": "ListItem", "position": 2, "name": toolName, "item": toolUrl }
                        ]
                    };

                    const id = "ubox-breadcrumb-jsonld";
                    let el = document.getElementById(id);
                    if (!el) {
                        el = document.createElement("script");
                        el.type = "application/ld+json";
                        el.id = id;
                        document.head.appendChild(el);
                    }
                    el.textContent = JSON.stringify(jsonLd);
                } catch (e) { /* ignore */ }
            }, [lang, activeToolId]);
            const [isIconReady, setIsIconReady] = useState(false); // 아이콘 로딩 상태
            const t = translations[lang] || translations.ko;
            const currentYear = 2026;

            useEffect(() => {
                const interval = setInterval(() => {
                    if (window.lucide) {
                        try { window.lucide.createIcons(); } catch (e) {}
                        setIsIconReady(true);
                        clearInterval(interval);
                    }
                }, 200);
                return () => clearInterval(interval);
            }, []);

            useEffect(() => {
                document.documentElement.lang = lang;
            }, [lang]);

            const tools = [
                { id: 'text', icon: 'type', cat: 'text', comp: WordCounter },
                { id: 'case', icon: 'case-sensitive', cat: 'text', comp: CaseConverter },
                { id: 'bmi', icon: 'activity', cat: 'health', comp: BMICalculator },
                { id: 'percent', icon: 'calculator', cat: 'math', comp: PercentCalculator },
                { id: 'discount', icon: 'percent', cat: 'math', comp: DiscountCalculator },
                { id: 'compound', icon: 'line-chart', cat: 'math', comp: CompoundInterestCalculator },
                { id: 'dca', icon: 'coins', cat: 'math', comp: DCACalculator },
                { id: 'pnl', icon: 'trending-up', cat: 'math', comp: ProfitLossCalculator },
                { id: 'unit', icon: 'arrow-left-right', cat: 'math', comp: UnitConverter },
                { id: 'image', icon: 'image-plus', cat: 'media', comp: ImageTools },
                { id: 'color', icon: 'palette', cat: 'media', comp: ColorConverter },
                { id: 'stopwatch', icon: 'timer', cat: 'time', comp: Stopwatch },
                { id: 'pomodoro', icon: 'clock', cat: 'time', comp: Pomodoro },
                { id: 'dday', icon: 'calendar', cat: 'time', comp: DDay },
                { id: 'password', icon: 'lock', cat: 'security', comp: PasswordGenerator },
                { id: 'lotto', icon: 'clover', cat: 'fun', comp: Lotto },
            ];

            const activeTool = tools.find(x => x.id === activeToolId) || tools[0];
            const ActiveComponent = activeTool.comp;
            const seo = t.seo[activeTool.id] || { title: activeTool.id, desc: "Tool description", tags: [] };

            return (
                <div className="flex h-screen bg-slate-50">
                    <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 md:static md:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                        <div className="p-6"><a href={`/${lang}/`} className="group inline-flex flex-col"><h1 className="text-2xl font-bold flex items-center gap-3 text-slate-800 group-hover:text-slate-900"><div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition"><Icon name="box" size={24} /></div>UtilityBox</h1><p className="text-xs text-slate-400 mt-2 ml-1 group-hover:text-slate-500 transition">스마트 툴 모음</p></a></div>
                        <nav className="flex-1 px-4 py-2 space-y-8 overflow-y-auto custom-scrollbar">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">{lang === 'ko' ? '홈' : 'Home'}</h3>
                                <div className="space-y-1">
                                    <a href={`/${lang}/`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-slate-100 text-slate-700">
                                        <Icon name="layout-grid" size={18} className="text-slate-400" />
                                        {lang === 'ko' ? '도구 모음' : 'Tool Directory'}
                                    </a>
                                </div>
                            </div>

                            {['text', 'math', 'media', 'time', 'security', 'fun', 'health'].map(cat => (
                                <div key={cat}>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">{t.categories[cat]}</h3>
                                    <div className="space-y-1">
                                        {tools.filter(x => x.cat === cat).map(item => (
                                            <a key={item.id} href={makePath(lang, item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeToolId === item.id ? 'bg-slate-800 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}><Icon name={item.icon} size={18} className={activeToolId === item.id ? 'text-blue-300' : 'text-slate-400'} />{t.tools[item.id]}</a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-slate-100 space-y-2">
                          <button onClick={toggleTheme} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
                            {lang === 'ko' ? (theme === 'dark' ? '라이트 모드' : '다크 모드') : (theme === 'dark' ? 'Light mode' : 'Dark mode')}
                          </button>
                          <button onClick={() => { window.location.href = makePath(lang === 'ko' ? 'en' : 'ko', activeToolId); }} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                            <Icon name="globe" size={16} />
                            {lang === 'ko' ? 'Language: 한국어' : 'Language: English'}
                          </button>
                        </div>
                    </aside>
                    {menuOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>}
                    <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                        <header className={`md:hidden backdrop-blur-md border-b p-4 flex justify-between items-center sticky top-0 z-20 ${theme === 'dark' ? 'bg-slate-900/70 border-slate-700' : 'bg-white/80 border-slate-200'} `}><span className="font-bold text-lg flex items-center gap-2"><Icon name="box" size={20} className="text-blue-600"/> {t.title}</span><div className="flex gap-2"><button onClick={() => { window.location.href = `/${lang}/`; }} className={`p-2 rounded-lg ${theme === \'dark\' ? \'bg-slate-800 text-slate-200\' : \'bg-slate-100 text-slate-600\'}`}><Icon name="home" size={20} /></button><button onClick={() => { window.location.href = makePath(lang === 'ko' ? 'en' : 'ko', activeToolId); }} className={`p-2 rounded-lg ${theme === \'dark\' ? \'bg-slate-800 text-slate-200\' : \'bg-slate-100 text-slate-600\'}`}><Icon name="globe" size={20} /></button><button onClick={toggleTheme} className={`p-2 rounded-lg ${theme === \'dark\' ? \'bg-slate-800 text-slate-200\' : \'bg-slate-100 text-slate-600\'}`} aria-label="toggle theme"><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} /></button><button onClick={() => setMenuOpen(true)} className={`p-2 rounded-lg ${theme === \'dark\' ? \'bg-slate-800 text-slate-200\' : \'bg-slate-100 text-slate-600\'}`}><Icon name="menu" size={20} /></button></div></header>
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                            <div className="max-w-2xl mx-auto pb-20">
                                <div className="mb-6 bg-slate-100 border-2 border-dashed border-slate-200 rounded-lg h-20 flex flex-col items-center justify-center text-slate-400 text-xs"><span className="font-bold">Google AdSense</span><span>Display Ad (Responsive)</span></div>
                                <div className="mb-6 animate-fade-in"><div className="flex items-center gap-2 mb-2"><span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">{t.categories[activeTool.cat]}</span></div><h1 className="text-3xl font-bold text-slate-900">{t.tools[activeTool.id]}</h1></div>
                                <Card className="min-h-[300px] mb-8"><ActiveComponent t={t} /></Card>
                                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-xl shadow-sm prose prose-slate max-w-none prose-sm"><h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2"><Icon name="lightbulb" size={18} className="text-blue-500" />{t.tipsTitle || (lang === "ko" ? "활용 꿀팁" : "Usage Tips")}</h3><h4 className="font-bold text-slate-700 m-0">{seo.title}</h4><p className="text-slate-600 mt-1">{seo.desc}</p><div className="flex flex-wrap gap-2 mt-3 not-prose">{seo.tags && seo.tags.map(tag => (<span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{tag}</span>))}</div></div>
                                <footer className="mt-12 text-center text-xs text-slate-400">&copy; {currentYear} Utility Box. All tools run locally in your browser.</footer>
                            </div>
                        </div>
                    </main>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    