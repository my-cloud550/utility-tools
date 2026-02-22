(function () {
  function buildKoreanArticle(title) {
    return [
      `${title} 도구는 단순히 값을 한 번 계산하는 용도로 끝나지 않고, 반복적으로 의사결정을 내릴 때 기준을 세우는 데 도움이 됩니다. 먼저 입력값의 단위를 정확히 확인한 뒤 기본값으로 1회 계산을 실행해 결과 구조를 파악하세요. 그다음 현실적인 여러 시나리오(보수적/중간/공격적)를 나눠 같은 항목을 다시 계산하면, 숫자의 변화 폭과 민감도를 훨씬 명확하게 이해할 수 있습니다.`,
      `활용 방법은 다음 순서가 좋습니다. ① 현재 상태의 기준값을 입력해 결과를 저장하고, ② 바꾸고 싶은 조건을 한 가지씩만 수정하여 재계산하고, ③ 각 결과 차이를 메모해 비교표를 만드세요. 이 과정을 거치면 감으로 판단하던 문제를 데이터 기반으로 정리할 수 있습니다. 특히 예산 관리, 건강 관리, 학습 계획, 시간 관리처럼 일상에서 반복되는 주제일수록 작은 차이가 누적되어 큰 효과를 만들기 때문에, 정기적으로 같은 형식으로 기록하는 습관이 중요합니다.`,
      `주의할 점도 있습니다. 계산 결과는 참고 지표이며 개인의 실제 상황(환경, 목표, 제약조건)을 모두 대변하지는 않습니다. 따라서 결과를 절대값으로 받아들이기보다, 방향을 잡는 기준선으로 활용하는 것이 안전합니다. 가능하면 주 1회 또는 월 1회 같은 고정 주기로 다시 계산해 추세를 확인하고, 필요하면 전문가 상담이나 공신력 있는 자료와 함께 교차 검증하세요. UtilityBox는 이런 반복 점검을 빠르게 수행하도록 설계되어 있어, 같은 입력 구조로 꾸준히 비교·관리하기에 적합합니다.`
    ].join('\n\n');
  }

  function buildEnglishArticle(title) {
    return [
      `The ${title} tool is most useful when you treat it as an ongoing decision aid, not a one-time calculator. Start by entering a clean baseline input and run one calculation to understand how the result is structured. Then test multiple realistic scenarios (conservative, expected, and aggressive) with small controlled changes. This helps you understand sensitivity and range instead of relying on a single number.`,
      `A practical workflow is: (1) capture your current baseline, (2) change one variable at a time, and (3) compare the output differences in a short note. This turns vague assumptions into measurable comparisons. It is especially effective for recurring topics such as budgeting, health tracking, productivity planning, and time management, where small improvements compound over time.`,
      `Remember that calculated outputs are guidance, not absolute truth. Real-world constraints, personal context, and data quality can all affect outcomes. Use the results as a directional reference, then validate with trusted sources or professional advice when needed. Re-check at a fixed cadence (weekly or monthly) to monitor trend changes and keep your decisions consistent.`
    ].join('\n\n');
  }

  function inject() {
    if (!window.__UBOX_PAGE__ || document.getElementById('ubox-info-article')) return;
    var page = window.__UBOX_PAGE__;
    if (!page.tool) return;

    var container = document.querySelector('main .max-w-2xl, main .max-w-5xl');
    if (!container) return;

    var h1 = container.querySelector('h1');
    var title = h1 ? h1.textContent.trim() : (page.tool + ' tool');
    var isKo = page.lang === 'ko';
    var articleText = isKo ? buildKoreanArticle(title) : buildEnglishArticle(title);

    var section = document.createElement('section');
    section.id = 'ubox-info-article';
    section.className = 'mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm';

    var heading = document.createElement('h2');
    heading.className = 'text-xl font-bold text-slate-800 dark:text-slate-100 mb-3';
    heading.textContent = isKo ? (title + ' 활용 가이드') : ('Practical Guide: ' + title);

    var body = document.createElement('p');
    body.className = 'text-sm leading-7 text-slate-600 dark:text-slate-300 whitespace-pre-line';
    body.textContent = articleText;

    section.appendChild(heading);
    section.appendChild(body);
    container.appendChild(section);
  }

  function lockOuterScrollForAppPages() {
    if (!window.__UBOX_PAGE__) return;
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  }

  lockOuterScrollForAppPages();

  var attempts = 0;
  var timer = setInterval(function () {
    inject();
    attempts += 1;
    if (document.getElementById('ubox-info-article') || attempts > 30) {
      clearInterval(timer);
    }
  }, 200);
})();
