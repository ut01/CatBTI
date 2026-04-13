import { shuffle, insertAtRandom, insertAfter } from './utils.js'

/**
 * 答题控制器
 */
export function createQuiz(questions, config, onComplete) {
  const mainQuestions = shuffle(questions.main)
  const gate = config.catnipGate || config.drinkGate
  const catnipGateQ1 = questions.special.find((q) => q.id === gate.questionId)
  const catnipGateQ2 = questions.special.find((q) => q.id === 'catnip_gate_q2' || q.id === 'drink_gate_q2')

  let queue = insertAtRandom(mainQuestions, catnipGateQ1)
  let current = 0
  let answers = {}
  let isCatnipHigh = false

  const els = {
    fill: document.getElementById('progress-fill'),
    text: document.getElementById('progress-text'),
    qText: document.getElementById('question-text'),
    options: document.getElementById('options'),
  }

  function totalCount() {
    return queue.length
  }

  function updateProgress() {
    const pct = (current / totalCount()) * 100
    els.fill.style.width = pct + '%'
    els.text.textContent = `${current} / ${totalCount()}`
  }

  function renderQuestion() {
    const q = queue[current]
    els.qText.textContent = q.text

    els.options.innerHTML = ''
    q.options.forEach((opt) => {
      const btn = document.createElement('button')
      btn.className = 'btn btn-option'
      btn.textContent = opt.label
      btn.addEventListener('click', () => selectOption(q, opt))
      els.options.appendChild(btn)
    })

    updateProgress()
  }

  function selectOption(question, option) {
    answers[question.id] = option.value

    const nipVal = gate.nipTriggerValue ?? gate.drunkTriggerValue

    // 猫薄荷门：若选薄荷激光局（值同 gate.triggerValue），插入追问
    if (question.id === gate.questionId && option.value === gate.triggerValue) {
      queue = insertAfter(queue, question.id, catnipGateQ2)
    }

    // 猫薄荷彩蛋（SIAMNIP）检测
    if ((question.id === 'catnip_gate_q2' || question.id === 'drink_gate_q2') && option.value === nipVal) {
      isCatnipHigh = true
    }

    current++
    if (current >= totalCount()) {
      onComplete(answers, isCatnipHigh)
    } else {
      renderQuestion()
    }
  }

  function start() {
    current = 0
    answers = {}
    isCatnipHigh = false
    queue = insertAtRandom(shuffle(questions.main), catnipGateQ1)
    renderQuestion()
  }

  return { start, renderQuestion }
}
