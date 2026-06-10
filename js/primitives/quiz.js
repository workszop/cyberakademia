/**
 * Quiz - multiple choice questions with score tracking
 * data: { questions: [{question, options: [], correct: 0|1|2|3, explanation}] }
 * onResult(correct, total)
 */

export function initQuiz(container, data, onResult) {
  if (!container) return;
  container.innerHTML = '';

  if (!data || !data.questions || data.questions.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-muted text-center';
    empty.textContent = 'Brak pytań w quizie.';
    container.appendChild(empty);
    return;
  }

  const questions = data.questions;
  const total = questions.length;
  let current = 0;
  let score = 0;
  let answered = false;

  // ── Wrapper ───────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'quiz-wrapper';
  container.appendChild(wrapper);

  // ── Progress bar ──────────────────────────────────────────
  const progressWrapper = document.createElement('div');
  progressWrapper.className = 'quiz-progress-wrapper';

  const progressLabel = document.createElement('div');
  progressLabel.className = 'quiz-progress-label';

  const progressTrack = document.createElement('div');
  progressTrack.className = 'quiz-progress-track';
  const progressFill = document.createElement('div');
  progressFill.className = 'quiz-progress-fill';
  progressTrack.appendChild(progressFill);

  progressWrapper.appendChild(progressLabel);
  progressWrapper.appendChild(progressTrack);
  wrapper.appendChild(progressWrapper);

  // ── Card ──────────────────────────────────────────────────
  const card = document.createElement('div');
  card.className = 'quiz-card';
  wrapper.appendChild(card);

  function renderQuestion() {
    answered = false;
    card.innerHTML = '';
    card.classList.remove('fade-in');
    void card.offsetWidth; // trigger reflow for animation restart
    card.classList.add('fade-in');

    // Progress label
    progressLabel.textContent = `Pytanie ${current + 1} / ${total}`;
    progressFill.style.width = `${((current) / total) * 100}%`;

    const q = questions[current];

    // Question number badge
    const badge = document.createElement('div');
    badge.className = 'quiz-question-badge';
    badge.textContent = `${current + 1}`;
    card.appendChild(badge);

    // Question text
    const questionEl = document.createElement('div');
    questionEl.className = 'quiz-question-text';
    questionEl.textContent = q.question;
    card.appendChild(questionEl);

    // Options
    const optionsEl = document.createElement('div');
    optionsEl.className = 'quiz-options';
    card.appendChild(optionsEl);

    const optionLetters = ['A', 'B', 'C', 'D'];

    (q.options || []).forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.setAttribute('data-index', idx);

      const letter = document.createElement('span');
      letter.className = 'quiz-option-letter';
      letter.textContent = optionLetters[idx] || String(idx + 1);

      const text = document.createElement('span');
      text.className = 'quiz-option-text';
      text.textContent = optText;

      btn.appendChild(letter);
      btn.appendChild(text);
      optionsEl.appendChild(btn);

      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const isCorrect = idx === q.correct;
        if (isCorrect) score++;

        // Disable all buttons and mark
        const allBtns = optionsEl.querySelectorAll('.quiz-option');
        allBtns.forEach((b, i) => {
          b.disabled = true;
          if (i === q.correct) {
            b.classList.add('correct');
          } else if (i === idx && !isCorrect) {
            b.classList.add('incorrect');
          }
        });

        // Explanation
        if (q.explanation) {
          const expEl = document.createElement('div');
          expEl.className = `quiz-explanation ${isCorrect ? 'quiz-explanation--correct' : 'quiz-explanation--incorrect'} slide-up`;
          const expText = document.createElement('span');
          expText.textContent = q.explanation;
          expEl.appendChild(expText);
          card.appendChild(expEl);
        }

        // Advance after delay
        setTimeout(() => {
          current++;
          if (current < total) {
            renderQuestion();
          } else {
            progressLabel.textContent = `Pytanie ${total} / ${total}`;
            progressFill.style.width = '100%';
            showSummary();
            if (typeof onResult === 'function') onResult(score, total);
          }
        }, 1800);
      });
    });
  }

  // ── Summary ───────────────────────────────────────────────
  function showSummary() {
    card.innerHTML = '';
    card.classList.remove('fade-in');
    void card.offsetWidth;
    card.classList.add('fade-in');

    const pct = Math.round((score / total) * 100);

    let gradeText, gradeClass;
    if (pct >= 90) {
      gradeText = 'Doskonale!';
      gradeClass = 'quiz-grade--excellent';
    } else if (pct >= 75) {
      gradeText = 'Bardzo dobrze!';
      gradeClass = 'quiz-grade--good';
    } else if (pct >= 60) {
      gradeText = 'Dobrze';
      gradeClass = 'quiz-grade--ok';
    } else if (pct >= 40) {
      gradeText = 'Wymagasz powtórki';
      gradeClass = 'quiz-grade--review';
    } else {
      gradeText = 'Trzeba więcej ćwiczyć';
      gradeClass = 'quiz-grade--poor';
    }

    const summary = document.createElement('div');
    summary.className = 'quiz-summary';

    const gradeEl = document.createElement('div');
    gradeEl.className = `quiz-grade ${gradeClass}`;
    gradeEl.textContent = gradeText;
    summary.appendChild(gradeEl);

    const scoreEl = document.createElement('div');
    scoreEl.className = 'quiz-final-score';
    scoreEl.innerHTML = `<span class="quiz-score-number">${score}</span> / ${total}`;
    summary.appendChild(scoreEl);

    const pctEl = document.createElement('div');
    pctEl.className = 'quiz-final-pct';
    pctEl.textContent = `${pct}% poprawnych odpowiedzi`;
    summary.appendChild(pctEl);

    // Retry button
    const retryBtn = document.createElement('button');
    retryBtn.className = 'quiz-retry-btn btn-primary';
    retryBtn.textContent = 'Spróbuj ponownie';
    retryBtn.addEventListener('click', () => {
      current = 0;
      score = 0;
      answered = false;
      renderQuestion();
    });
    summary.appendChild(retryBtn);

    card.appendChild(summary);
  }

  // Start
  renderQuestion();
}
