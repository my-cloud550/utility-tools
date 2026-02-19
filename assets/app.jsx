
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
                ad: "광고 영역"
            },
            en: {
                title: "Utility Box",
                subtitle: "Essential Web Tools",
                categories: { text: "Text", math: "Math", media: "Media", time: "Time", security: "Security", fun: "Fun", health: "Health" },
                tools: { text: "Word Counter", case: "Case Converter", percent: "Percent Calc", discount: "Discount Calc", image: "Image Converter", color: "Color Converter", unit: "Unit Converter", stopwatch: "Stopwatch", pomodoro: "Pomodoro", dday: "D-Day", password: "Password", lotto: "Lotto", bmi: "BMI Calculator" },
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

        // --- Main App & Routing ---
        
const TOOL_SLUGS = {
  "text": "word-counter",
  "case": "case-converter",
  "percent": "percent-calculator",
  "discount": "discount-calculator",
  "image": "image-converter",
  "color": "color-converter",
  "unit": "unit-converter",
  "stopwatch": "stopwatch",
  "pomodoro": "pomodoro-timer",
  "dday": "dday-calculator",
  "password": "password-generator",
  "lotto": "lotto-generator",
  "bmi": "bmi-calculator"
};

const TOOL_META = {
  text: { icon: "file-text", category: "text" },
  case: { icon: "type", category: "text" },
  percent: { icon: "percent", category: "math" },
  discount: { icon: "tag", category: "math" },
  image: { icon: "image", category: "media" },
  color: { icon: "palette", category: "media" },
  unit: { icon: "ruler", category: "math" },
  stopwatch: { icon: "timer", category: "time" },
  pomodoro: { icon: "hourglass", category: "time" },
  dday: { icon: "calendar-days", category: "time" },
  password: { icon: "key-round", category: "security" },
  lotto: { icon: "dice-5", category: "fun" },
  bmi: { icon: "activity", category: "health" },
};


const getPathForTool = (lang, toolId) => {
  if (!toolId || toolId === "home") return `/${lang}/`;
  const slug = TOOL_SLUGS[toolId];
  return slug ? `/${lang}/tools/${slug}/` : `/${lang}/`;
};

const getToolIdFromSlug = (slug) => {
  for (const [id, s] of Object.entries(TOOL_SLUGS)) {
    if (s === slug) return id;
  }
  return null;
};


const HELP = {
  ko: {
    text: {
      tips: ["공백 포함/제외 기준을 먼저 정해두면 결과 비교가 쉬워요.", "제목·본문을 나눠서 붙여 넣으면 길이 조절이 빨라요.", "출력값을 복사해 원고 검수 체크리스트에 바로 붙여두세요."],
      steps: ["텍스트를 붙여 넣습니다.", "원하는 카운트 기준(글자/단어/문장)을 확인합니다.", "필요하면 결과를 복사해 활용합니다."],
      faq: [
        { q: "공백을 빼고 글자 수만 볼 수 있나요?", a: "가능합니다. 공백 포함/제외 값이 모두 표시됩니다." },
        { q: "특수문자도 글자 수에 포함되나요?", a: "네. 기본적으로 입력된 문자를 그대로 카운트합니다." },
        { q: "긴 글도 처리되나요?", a: "브라우저에서 처리하므로 일반적인 블로그/원고 길이는 충분히 가능합니다." }
      ],
    },
    case: {
      tips: ["영문 제목은 Title Case로, 코드/변수명은 lower/upper로 정리하면 깔끔해요.", "대량 변환은 줄바꿈 포함 그대로 붙여 넣는 게 좋아요.", "변환 후 오탈자만 마지막에 한 번 더 훑으면 실수 줄어듭니다."],
      steps: ["텍스트를 입력합니다.", "원하는 변환 옵션을 선택합니다.", "변환 결과를 복사합니다."],
      faq: [
        { q: "한글도 바뀌나요?", a: "한글은 대소문자 개념이 없어 그대로 유지됩니다." },
        { q: "문장 단위 Title Case가 되나요?", a: "영문 기준으로 단어 첫 글자를 기준으로 처리합니다." },
        { q: "원본 서식이 깨지나요?", a: "줄바꿈/공백은 최대한 유지한 채로 변환합니다." }
      ],
    },
    percent: {
      tips: ["기준값(분모)을 먼저 고정하면 실수가 줄어듭니다.", "전일 대비/주간 대비는 기준 날짜를 함께 메모해두세요.", "결과를 소수점 몇 자리로 쓸지 통일하면 보고서가 깔끔해요."],
      steps: ["기준값과 비교값을 입력합니다.", "퍼센트(증감/비율) 계산 버튼을 누릅니다.", "필요한 자리수로 반올림해 사용합니다."],
      faq: [
        { q: "증가율과 비율 계산이 다른가요?", a: "증가율은 (변화/기준)이고, 비율은 (부분/전체)입니다." },
        { q: "0이 들어가면 어떻게 되나요?", a: "기준값이 0이면 나눗셈이 불가해 계산이 제한됩니다." },
        { q: "마이너스 값도 되나요?", a: "가능합니다. 변화 방향을 그대로 반영합니다." }
      ],
    },
    discount: {
      tips: ["할인율·할인 후 금액을 둘 다 적어두면 검증이 쉬워요.", "쿠폰/적립은 순서에 따라 달라질 수 있어요.", "부가세 포함 가격인지 먼저 확인하세요."],
      steps: ["정가를 입력합니다.", "할인율 또는 할인 금액을 입력합니다.", "할인 후 가격을 확인합니다."],
      faq: [
        { q: "할인율과 할인금액 중 하나만 넣어도 되나요?", a: "네. 하나만 입력해도 계산됩니다." },
        { q: "복수 할인(10% 후 10%)도 되나요?", a: "현재는 단일 할인 기준입니다. 순차 할인은 단계별로 계산해 주세요." },
        { q: "반올림 기준은?", a: "표시 자릿수 기준으로 반올림됩니다." }
      ],
    },
    image: {
      tips: ["용량 줄이기는 품질(quality)과 해상도(리사이즈)를 함께 보세요.", "배경 투명(알파) 필요하면 PNG/WebP를 추천해요.", "변환 후 미리보기로 깨짐 여부를 꼭 확인하세요."],
      steps: ["이미지를 업로드합니다.", "원하는 포맷/옵션을 선택합니다.", "변환 후 다운로드합니다."],
      faq: [
        { q: "업로드한 이미지가 서버로 전송되나요?", a: "브라우저에서 처리되도록 구성되어 전송하지 않는 방식입니다." },
        { q: "WebP는 어디에 좋나요?", a: "웹에서 용량 대비 화질이 좋아 페이지 속도 개선에 유리합니다." },
        { q: "대량 변환도 되나요?", a: "브라우저 성능에 따라 가능하지만, 너무 많으면 나눠서 진행하는 게 좋아요." }
      ],
    },
    color: {
      tips: ["브랜드 컬러는 HEX로 고정해두면 협업이 쉬워요.", "RGB↔HEX 변환 후 실제 화면에서 톤이 맞는지 확인하세요.", "대비(contrast) 체크까지 같이 하면 가독성이 좋아집니다."],
      steps: ["HEX/RGB 값을 입력합니다.", "변환 버튼을 누릅니다.", "결과 값을 복사합니다."],
      faq: [
        { q: "3자리 HEX도 지원하나요?", a: "일반적으로 6자리 HEX를 기준으로 안내합니다." },
        { q: "알파값(투명도)도 되나요?", a: "기본은 RGB/HEX 중심이며, RGBA는 일부 환경에서만 표시됩니다." },
        { q: "색상 코드가 왜 다르게 보이죠?", a: "모니터 색감/프로파일 차이로 보이는 톤이 달라질 수 있습니다." }
      ],
    },
    unit: {
      tips: ["cm↔inch 같은 자주 쓰는 변환은 즐겨찾기 해두면 편해요.", "정밀도가 필요한 작업은 소수점 자릿수를 늘려 확인하세요.", "단위 혼용 문서는 변환 후 표기 단위를 통일하세요."],
      steps: ["변환할 값을 입력합니다.", "원 단위와 목표 단위를 선택합니다.", "변환 결과를 확인합니다."],
      faq: [
        { q: "어떤 단위를 지원하나요?", a: "길이/무게/온도 등 자주 쓰는 단위를 중심으로 제공합니다." },
        { q: "소수점 표시를 바꿀 수 있나요?", a: "입력값과 결과값을 필요에 맞게 반올림해 사용하면 됩니다." },
        { q: "온도 변환은 공식이 다른가요?", a: "네. 온도는 단순 비율이 아니라 변환 공식이 적용됩니다." }
      ],
    },
    stopwatch: {
      tips: ["랩(구간) 기록은 운동/업무 측정에 유용해요.", "백그라운드 탭에서는 브라우저가 느려질 수 있어요.", "측정 목적에 따라 초 단위/분 단위를 맞춰보세요."],
      steps: ["시작을 누릅니다.", "필요하면 랩을 기록합니다.", "정지/리셋으로 마무리합니다."],
      faq: [
        { q: "새로고침하면 기록이 남나요?", a: "일반적으로는 초기화됩니다." },
        { q: "모바일에서도 되나요?", a: "대부분의 모바일 브라우저에서 동작합니다." },
        { q: "정확도는 어떤가요?", a: "브라우저 타이머 기반으로 일반적인 측정에 충분합니다." }
      ],
    },
    pomodoro: {
      tips: ["25/5가 기본이지만, 본인 리듬에 맞게 50/10도 좋아요.", "휴식 시간에 화면을 완전히 끄면 회복이 빨라요.", "하루 목표 횟수를 작게 잡고 꾸준히 쌓는 게 핵심입니다."],
      steps: ["집중/휴식 시간을 설정합니다.", "시작을 누르고 한 세션을 완료합니다.", "세션 기록을 확인합니다."],
      faq: [
        { q: "세션이 끝나면 알림이 오나요?", a: "브라우저 환경에 따라 알림이 제한될 수 있습니다." },
        { q: "자동으로 다음 세션으로 넘어가나요?", a: "설정에 따라 수동/자동을 선택할 수 있습니다." },
        { q: "장시간 사용해도 되나요?", a: "가능하지만 중간에 스트레칭을 권장합니다." }
      ],
    },
    dday: {
      tips: ["D-100 같은 이벤트는 미리 캘린더에도 같이 저장하세요.", "음력/양력, 타임존 기준을 먼저 확인하세요.", "기념일은 반복 설정까지 함께 관리하면 편합니다."],
      steps: ["기준 날짜를 선택합니다.", "D-day(또는 D+일수)를 확인합니다.", "필요하면 결과를 복사합니다."],
      faq: [
        { q: "오늘이 D+0인가요?", a: "계산 방식에 따라 D-day 표기가 달라질 수 있어요." },
        { q: "시간까지 포함되나요?", a: "기본은 날짜 기준입니다." },
        { q: "반복 기념일도 되나요?", a: "기본은 단일 날짜 계산입니다." }
      ],
    },
    password: {
      tips: ["12자 이상 + 대/소문자 + 숫자 + 특수문자 조합을 추천해요.", "서비스마다 비밀번호를 재사용하지 마세요.", "가능하면 2단계 인증도 함께 켜세요."],
      steps: ["길이와 포함 옵션을 선택합니다.", "생성 버튼을 누릅니다.", "비밀번호를 복사해 사용합니다."],
      faq: [
        { q: "생성한 비밀번호가 저장되나요?", a: "브라우저에서 생성되며 별도로 저장하지 않는 방식입니다." },
        { q: "특수문자 제외도 되나요?", a: "옵션에서 끌 수 있습니다." },
        { q: "추천 길이는?", a: "일반적으로 12~16자 이상을 권장합니다." }
      ],
    },
    lotto: {
      tips: ["연속 번호/패턴에 집착하면 오히려 선택이 편향될 수 있어요.", "자동/반자동 섞어서 즐기면 스트레스가 줄어요.", "당첨 확률은 동일하니 재미로만 접근하세요."],
      steps: ["게임 수(세트)를 선택합니다.", "생성 버튼을 누릅니다.", "번호를 복사하거나 저장합니다."],
      faq: [
        { q: "중복 번호가 나오나요?", a: "한 세트 안에서는 중복 없이 생성됩니다." },
        { q: "보너스 번호도 나오나요?", a: "기본은 6개 번호 생성입니다." },
        { q: "과거 당첨 데이터 기반인가요?", a: "무작위 생성 방식입니다." }
      ],
    },
    bmi: {
      tips: ["BMI는 참고 지표이고 체지방률/근육량도 함께 보세요.", "키는 cm/체중은 kg 기준으로 입력하세요.", "같은 BMI라도 체형에 따라 느낌이 달라질 수 있어요."],
      steps: ["키와 몸무게를 입력합니다.", "계산 버튼을 누릅니다.", "결과 범위를 확인합니다."],
      faq: [
        { q: "BMI가 높으면 무조건 비만인가요?", a: "근육량이 많은 경우 BMI가 높게 나올 수 있어요." },
        { q: "청소년도 같은 기준인가요?", a: "연령별 기준이 다를 수 있어 참고용으로 보세요." },
        { q: "소수점 입력도 되나요?", a: "네. 더 정확한 계산을 위해 소수점 입력이 가능합니다." }
      ],
    },
  },
  en: {
    text: {
      tips: ["Decide whether spaces count before comparing results.", "Paste title/body separately to adjust length faster.", "Copy the numbers into your checklist for quick review."],
      steps: ["Paste your text.", "Check the metrics you need (chars/words/sentences).", "Copy the result if needed."],
      faq: [
        { q: "Can I count without spaces?", a: "Yes. Both with-space and without-space counts are shown." },
        { q: "Do symbols count as characters?", a: "Yes. Input is counted as-is." },
        { q: "Does it handle long text?", a: "Typical blog/article lengths work fine in the browser." }
      ],
    },
    case: {
      tips: ["Use Title Case for headings and lower/upper for code/variables.", "Bulk convert by keeping line breaks intact.", "Do a quick final scan for typos after conversion."],
      steps: ["Enter text.", "Pick a conversion option.", "Copy the output."],
      faq: [
        { q: "Does it change non-Latin scripts?", a: "Scripts without case (e.g., Korean) stay unchanged." },
        { q: "Is Title Case sentence-aware?", a: "It follows common word-based Title Case rules." },
        { q: "Will formatting break?", a: "Line breaks and spaces are preserved as much as possible." }
      ],
    },
    percent: {
      tips: ["Lock the baseline first to avoid mistakes.", "Note the comparison period (day/week) next to the value.", "Standardize decimal places across reports."],
      steps: ["Enter baseline and comparison values.", "Run the calculation.", "Round to your preferred precision."],
      faq: [
        { q: "Rate vs. ratio—what’s the difference?", a: "Rate is change/baseline; ratio is part/whole." },
        { q: "What if baseline is 0?", a: "Division by zero isn’t allowed, so calculation is limited." },
        { q: "Are negative values supported?", a: "Yes—direction is reflected in the result." }
      ],
    },
    discount: {
      tips: ["Keep both discount rate and final price to double-check.", "Stacked coupons can depend on order.", "Confirm whether prices include tax."],
      steps: ["Enter the original price.", "Enter a discount rate or amount.", "Check the final price."],
      faq: [
        { q: "Do I need both rate and amount?", a: "No—either one works." },
        { q: "Can it do sequential discounts?", a: "This version is single-step. Calculate sequentially per step." },
        { q: "How is rounding handled?", a: "Rounding follows the displayed precision." }
      ],
    },
    image: {
      tips: ["For smaller files, balance quality and resize together.", "Need transparency? Prefer PNG/WebP.", "Always preview to check artifacts."],
      steps: ["Upload an image.", "Choose format/options.", "Convert and download."],
      faq: [
        { q: "Is my image uploaded to a server?", a: "It’s designed to process in the browser (no upload) when possible." },
        { q: "Why WebP?", a: "Great quality-to-size ratio for web performance." },
        { q: "Batch convert?", a: "Possible, but split into smaller batches for stability." }
      ],
    },
    color: {
      tips: ["Keep brand colors fixed in HEX for collaboration.", "After converting, verify the look on real screens.", "Check contrast for readability."],
      steps: ["Enter HEX or RGB.", "Convert.", "Copy the result."],
      faq: [
        { q: "3-digit HEX support?", a: "Guidance is based on standard 6-digit HEX." },
        { q: "Alpha channel supported?", a: "Focus is RGB/HEX; RGBA may be limited by context." },
        { q: "Why does it look different?", a: "Displays and color profiles can vary." }
      ],
    },
    unit: {
      tips: ["Bookmark frequent conversions like cm↔inch.", "Increase decimals for precision work.", "Standardize units after converting mixed docs."],
      steps: ["Enter a value.", "Select from/to units.", "Read the converted result."],
      faq: [
        { q: "Which units are supported?", a: "Common units for length/weight/temperature, etc." },
        { q: "Can I change decimals?", a: "Round the result to the precision you need." },
        { q: "Temperature conversion differs?", a: "Yes—temperature uses formulas, not simple ratios." }
      ],
    },
    stopwatch: {
      tips: ["Lap splits help for workouts and task timing.", "Background tabs may reduce timer accuracy.", "Match the unit (sec/min) to your goal."],
      steps: ["Press Start.", "Record laps if needed.", "Stop/Reset to finish."],
      faq: [
        { q: "Will refresh keep time?", a: "Typically it resets." },
        { q: "Works on mobile?", a: "Yes on most mobile browsers." },
        { q: "How accurate is it?", a: "Browser-timer accuracy is sufficient for everyday timing." }
      ],
    },
    pomodoro: {
      tips: ["25/5 is standard, but 50/10 can work better for some.", "Use breaks to fully rest your eyes.", "Keep daily targets small and consistent."],
      steps: ["Set focus/break durations.", "Run a full session.", "Check your session count."],
      faq: [
        { q: "Do I get notifications?", a: "Browser notification behavior varies by device/settings." },
        { q: "Auto-advance sessions?", a: "You can choose manual vs. auto depending on settings." },
        { q: "Safe for long use?", a: "Yes—take short stretches between sessions." }
      ],
    },
    dday: {
      tips: ["For milestones like D-100, also save it in your calendar.", "Confirm timezone and calendar rules.", "Manage recurring anniversaries separately."],
      steps: ["Pick a target date.", "See D-day / D+ count.", "Copy the result if needed."],
      faq: [
        { q: "Is today D+0?", a: "It depends on counting rules and inclusivity." },
        { q: "Does it include time?", a: "Default is date-based." },
        { q: "Recurring dates?", a: "This is for a single date calculation." }
      ],
    },
    password: {
      tips: ["Use 12+ chars with mixed types.", "Never reuse passwords across services.", "Enable 2FA whenever possible."],
      steps: ["Choose length and options.", "Generate.", "Copy and use."],
      faq: [
        { q: "Is it stored anywhere?", a: "Generated in the browser without saving by default." },
        { q: "Can I exclude symbols?", a: "Yes—toggle the option off." },
        { q: "Recommended length?", a: "Usually 12–16+ characters." }
      ],
    },
    lotto: {
      tips: ["Avoid overfitting patterns—random is random.", "Mix auto and semi-auto for fun.", "Treat it as entertainment only."],
      steps: ["Choose how many sets.", "Generate.", "Copy or save the numbers."],
      faq: [
        { q: "Any duplicates in a set?", a: "No—each set has unique numbers." },
        { q: "Bonus number included?", a: "Default is 6 numbers per set." },
        { q: "Based on past results?", a: "No—pure random generation." }
      ],
    },
    bmi: {
      tips: ["BMI is a reference—also consider body fat and muscle.", "Enter height in cm and weight in kg.", "Same BMI can feel different by body composition."],
      steps: ["Enter height and weight.", "Calculate.", "Check the category range."],
      faq: [
        { q: "High BMI always means obesity?", a: "Not necessarily—muscular people can score higher." },
        { q: "Same thresholds for teens?", a: "Age-based standards can differ; treat as reference." },
        { q: "Can I use decimals?", a: "Yes—for more accurate results." }
      ],
    },
  },
};

const TOOL_COMPONENTS = {
  text: WordCounter,
  case: CaseConverter,
  percent: PercentCalculator,
  discount: DiscountCalculator,
  image: ImageTools,
  color: ColorConverter,
  unit: UnitConverter,
  stopwatch: Stopwatch,
  pomodoro: Pomodoro,
  dday: DDay,
  password: PasswordGenerator,
  lotto: Lotto,
  bmi: BMICalculator,
};

function ToolPage({ tool, t, lang }) {
  const ToolComp = TOOL_COMPONENTS[tool.id];
  const help = (HELP[lang] && HELP[lang][tool.id]) ? HELP[lang][tool.id] : null;
  const seo = (t.seo && t.seo[tool.id]) ? t.seo[tool.id] : {};

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="mt-1 h-10 w-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
          <Icon name={tool.icon} size={18} />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {tool.name}
          </h1>
          {seo.subtitle ? (
            <p className="mt-1 text-sm sm:text-base text-slate-600">{seo.subtitle}</p>
          ) : (
            <p className="mt-1 text-sm sm:text-base text-slate-600">{tool.description}</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardContent>
            {ToolComp ? <ToolComp t={t} /> : <div className="text-slate-600">Tool not found.</div>}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{lang === "ko" ? "꿀팁" : "Tips"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                {(help && help.tips ? help.tips : []).map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{lang === "ko" ? "사용방법" : "How to use"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
                {(help && help.steps ? help.steps : []).map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(help && help.faq ? help.faq : []).map((qa, i) => (
                  <details key={i} className="rounded-xl border border-slate-200 p-3">
                    <summary className="cursor-pointer text-sm font-medium text-slate-900">
                      {qa.q}
                    </summary>
                    <div className="mt-2 text-sm text-slate-700">{qa.a}</div>
                  </details>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const PAGE = window.__PAGE__ || {};
  const lang = PAGE.lang === "en" ? "en" : "ko";
  const initialTool = PAGE.toolId || null; // null => landing

  const t = translations[lang];
  const ui = {
    searchTools: lang === "ko" ? "도구 검색" : "Search tools",
    searchPlaceholder: lang === "ko" ? "검색어를 입력하세요" : "Type to search",
    categories: lang === "ko" ? "카테고리" : "Categories",
    tools: lang === "ko" ? "도구" : "Tools",
    allTools: lang === "ko" ? "전체" : "All",
  };
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const toolEntries = Object.keys(TOOL_META).map((id) => {
    const name = t.tools[id] || id;
    const description = (t.seo && t.seo[id] && (t.seo[id].subtitle || t.seo[id].desc)) ? (t.seo[id].subtitle || t.seo[id].desc) : "";
    return {
      id,
      name,
      description,
      icon: TOOL_META[id].icon,
      category: TOOL_META[id].category,
    };
  });

  const categories = [
    { id: "all", name: ui.allTools },
    ...Object.entries(t.categories || {}).map(([id, name]) => ({ id, name }))
  ];

  const filteredTools = toolEntries.filter(tool => {
    const matchesQuery = !query || (tool.name + " " + tool.description).toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const activeTool = initialTool ? toolEntries.find(tl => tl.id === initialTool) : null;

  const onOpenTool = (toolId) => {
    const href = getPathForTool(lang, toolId);
    window.location.href = href;
  };

  const onSwitchLanguage = () => {
    const otherLang = lang === "ko" ? "en" : "ko";
    const href = getPathForTool(otherLang, initialTool);
    window.location.href = href;
  };

  useEffect(() => {
    // Update title on client as well (HTML head is already static for SEO)
    const title = PAGE.seoTitle || document.title;
    if (title) document.title = title;
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a href={`/${lang}/`} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">U</div>
            <div>
              <div className="text-lg font-semibold leading-tight">UBoxTools</div>
              <div className="text-sm text-slate-600 leading-tight">
                {lang === "ko" ? "빠르고 깔끔한 웹 도구 모음" : "Fast, clean web tools"}
              </div>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchLanguage}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              aria-label="Switch language"
            >
              {lang === "ko" ? "English" : "한국어"}
            </button>
            <a
              href="https://uboxtools.com/"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Home
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <div className="text-sm font-semibold text-slate-900">{ui.searchTools}</div>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                <Icon name="search" size={18} className="text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-semibold text-slate-900">{ui.categories}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={[
                      "rounded-full px-3 py-1 text-xs font-medium border",
                      activeCategory === cat.id
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    ].join(" ")}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">{ui.tools}</div>
                <a href={`/${lang}/`} className="text-xs text-slate-500 hover:text-slate-800">
                  {lang === "ko" ? "도구모음" : "Dashboard"}
                </a>
              </div>

              <div className="space-y-2">
                {filteredTools.map(tool => {
                  const href = getPathForTool(lang, tool.id);
                  const active = activeTool?.id === tool.id;
                  return (
                    <a
                      key={tool.id}
                      href={href}
                      className={[
                        "group flex items-start gap-3 rounded-2xl border p-3 transition",
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      ].join(" ")}
                    >
                      <div className={[
                        "mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl",
                        active ? "bg-white/10" : "bg-slate-900 text-white"
                      ].join(" ")}>
                        <Icon name={tool.icon} size={18} className={active ? "text-white" : "text-white"} />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{tool.name}</div>
                        <div className={[
                          "mt-0.5 line-clamp-2 text-xs",
                          active ? "text-white/80" : "text-slate-600"
                        ].join(" ")}>{tool.description}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>

          <main className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            {!activeTool ? (
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {lang === "ko" ? "도구모음" : "Tools dashboard"}
                </h1>
                <p className="mt-2 text-slate-600">
                  {lang === "ko"
                    ? "자주 쓰는 유틸리티를 한 곳에서. 사이드바 검색이나 카테고리로 빠르게 찾아보세요."
                    : "All your frequently-used utilities in one place. Use search and categories to find tools quickly."
                  }
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {toolEntries.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => onOpenTool(tool.id)}
                      className="text-left rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-slate-900 flex items-center justify-center">
                          <Icon name={tool.icon} size={18} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-semibold">{tool.name}</div>
                          <div className="mt-0.5 line-clamp-2 text-sm text-slate-600">{tool.description}</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>{(t.categories && t.categories[tool.category]) ? t.categories[tool.category] : tool.category}</span>
                        <span className="flex items-center gap-1">
                          {lang === "ko" ? "열기" : "Open"} <Icon name="arrow-right" size={14} className="text-slate-500" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icon name="sparkles" size={16} className="text-slate-700" />
                    {lang === "ko" ? "SEO 팁" : "SEO tip"}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {lang === "ko"
                      ? "각 도구는 /ko/tools/... 또는 /en/tools/... 고유 URL로 분리돼서 검색엔진에 개별 페이지로 잡힙니다."
                      : "Each tool has its own URL under /ko/tools/... or /en/tools/... so search engines can index pages individually."
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <ToolPage tool={activeTool} t={t} lang={lang} />
              </div>
            )}
          </main>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-500">
          © 2026 UBoxTools
        </footer>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
