import React, { useState, useEffect, useRef } from 'react';
import { Users, GraduationCap, Trash2, Copy, Check, Send, ArrowLeft, Sparkles, RefreshCw, QrCode } from 'lucide-react';

const QUESTION = '이번 수업을 신청하게 된 이유는 무엇인가요?';
const SUBTITLE = '무엇을 보고 이 프로그램을 신청하셨나요?';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@300;400;700&family=Caveat:wght@400;600;700&family=Gowun+Dodum&family=Nanum+Pen+Script&display=swap');

:root {
  --paper: #FAF5EB;
  --paper-2: #F3EBD9;
  --paper-3: #E8DFC8;
  --ink: #221E18;
  --ink-2: #6A5F4E;
  --accent: #C84D30;
  --accent-2: #A13B22;
  --blue: #3B6B8C;
  --green: #5E7547;
  --yellow: #E8B847;
}

.font-hand { font-family: 'Gaegu', 'Nanum Pen Script', cursive; }
.font-display { font-family: 'Gaegu', 'Caveat', cursive; font-weight: 700; letter-spacing: -0.01em; }
.font-body { font-family: 'Gowun Dodum', 'Gaegu', sans-serif; }
.font-caveat { font-family: 'Caveat', cursive; }

.bg-paper { background-color: var(--paper); }
.bg-paper-2 { background-color: var(--paper-2); }
.bg-paper-3 { background-color: var(--paper-3); }
.bg-ink { background-color: var(--ink); }
.bg-accent { background-color: var(--accent); }
.bg-accent-2 { background-color: var(--accent-2); }
.bg-blue-ink { background-color: var(--blue); }
.bg-yellow-ink { background-color: var(--yellow); }
.text-ink { color: var(--ink); }
.text-ink-2 { color: var(--ink-2); }
.text-accent { color: var(--accent); }
.text-paper { color: var(--paper); }
.text-blue-ink { color: var(--blue); }
.border-ink { border-color: var(--ink); }
.border-ink-2 { border-color: var(--ink-2); }
.border-accent { border-color: var(--accent); }

.paper-bg {
  background-color: var(--paper);
  background-image:
    radial-gradient(circle at 15% 25%, rgba(200, 77, 48, 0.04) 0%, transparent 45%),
    radial-gradient(circle at 85% 75%, rgba(59, 107, 140, 0.035) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, rgba(232, 184, 71, 0.025) 0%, transparent 60%);
}

.paper-grain {
  background-image:
    repeating-linear-gradient(0deg, rgba(34, 30, 24, 0.012) 0px, transparent 1px, transparent 2px, rgba(34, 30, 24, 0.012) 3px),
    repeating-linear-gradient(90deg, rgba(34, 30, 24, 0.012) 0px, transparent 1px, transparent 2px, rgba(34, 30, 24, 0.012) 3px);
}

.card-paper {
  background-color: #FEFCF7;
  box-shadow:
    0 1px 2px rgba(34, 30, 24, 0.08),
    0 8px 20px rgba(34, 30, 24, 0.12),
    inset 0 0 0 1px rgba(34, 30, 24, 0.04);
}

.btn-ink {
  background-color: var(--ink);
  color: var(--paper);
  transition: all 0.2s ease;
  box-shadow: 3px 3px 0 var(--accent);
}
.btn-ink:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--accent);
}
.btn-ink:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--accent);
}
.btn-ink:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-paper {
  background-color: #FEFCF7;
  color: var(--ink);
  border: 2px solid var(--ink);
  transition: all 0.2s ease;
  box-shadow: 3px 3px 0 var(--ink);
}
.btn-paper:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--ink);
}
.btn-paper:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--ink);
}

@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.7) translateY(20px) rotate(var(--final-rot, 0deg)); }
  50% { opacity: 1; transform: scale(1.05) translateY(-4px) rotate(var(--final-rot, 0deg)); }
  100% { opacity: 1; transform: scale(1) translateY(0) rotate(var(--final-rot, 0deg)); }
}
.animate-pop-in { animation: pop-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

@keyframes gentle-float {
  0%, 100% { transform: translateY(0) rotate(var(--final-rot, 0deg)); }
  50% { transform: translateY(-3px) rotate(calc(var(--final-rot, 0deg) + 0.3deg)); }
}
.hover-float:hover { animation: gentle-float 2s ease-in-out infinite; }

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}
.draw-line path { stroke-dasharray: 300; stroke-dashoffset: 300; animation: draw-line 1.2s ease-out forwards; }

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
.spin-slow { animation: spin-slow 2s linear infinite; }

.scrollbar-paper::-webkit-scrollbar { width: 10px; height: 10px; }
.scrollbar-paper::-webkit-scrollbar-track { background: var(--paper-2); }
.scrollbar-paper::-webkit-scrollbar-thumb { background: var(--ink-2); border-radius: 5px; }
.scrollbar-paper::-webkit-scrollbar-thumb:hover { background: var(--ink); }

.tape {
  position: absolute;
  width: 60px;
  height: 18px;
  background: rgba(232, 184, 71, 0.55);
  top: -8px;
  left: 50%;
  margin-left: -30px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

input::placeholder, textarea::placeholder { color: var(--ink-2); opacity: 0.6; }
`;

// Rough underline SVG
const RoughUnderline = ({ color = 'var(--accent)' }) => (
  <svg className="draw-line" viewBox="0 0 300 12" preserveAspectRatio="none" style={{ width: '100%', height: '12px' }}>
    <path
      d="M 5 7 Q 40 2, 80 6 T 160 5 Q 200 8, 240 4 T 295 6"
      stroke={color}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

// ============ MAIN APP ============
export default function SketchSurvey() {
  const [mode, setMode] = useState('landing'); // 'landing' | 'teacher' | 'student'
  const [answers, setAnswers] = useState([]);
  const [studentText, setStudentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Inject styles once
  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = STYLES;
    document.head.appendChild(s);
    document.body.style.margin = '0';
    document.body.style.fontFamily = "'Gowun Dodum', sans-serif";
    return () => { try { document.head.removeChild(s); } catch(e){} };
  }, []);

  // Poll answers in teacher mode
  useEffect(() => {
    if (mode !== 'teacher') return;
    loadAnswers();
    const iv = setInterval(loadAnswers, 2500);
    return () => clearInterval(iv);
  }, [mode]);

  async function loadAnswers() {
    try {
      const res = await window.storage.list('ans:', true);
      if (!res || !res.keys) { setAnswers([]); return; }
      const loaded = [];
      for (const key of res.keys) {
        try {
          const r = await window.storage.get(key, true);
          if (r && r.value) loaded.push(JSON.parse(r.value));
        } catch(e){}
      }
      loaded.sort((a, b) => a.timestamp - b.timestamp);
      setAnswers(loaded);
    } catch (e) { console.error(e); }
  }

  async function handleSubmit() {
    const t = studentText.trim();
    if (!t || submitting) return;
    setSubmitting(true);
    const id = Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const seed = Math.floor(Math.random() * 100000);
    // 영어 프롬프트 프레이밍 + 한글 키워드 → Pollinations가 더 좋은 스케치를 생성함
    const promptText = `cute simple pencil doodle sketch, minimalist black line drawing on plain white paper, hand-drawn illustration depicting: ${t}, no text, no letters, no words, kawaii style, centered composition`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=512&height=512&nologo=true&seed=${seed}`;
    const rotation = (Math.random() * 7) - 3.5;
    const answer = { id, text: t, imageUrl, timestamp: Date.now(), rotation };
    try {
      await window.storage.set(`ans:${id}`, JSON.stringify(answer), true);
      setSubmitted(true);
      setStudentText('');
    } catch (e) { console.error(e); alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.'); }
    setSubmitting(false);
  }

  async function clearAll() {
    if (!window.confirm('모든 답변을 삭제하시겠어요? (되돌릴 수 없습니다)')) return;
    try {
      const res = await window.storage.list('ans:', true);
      if (res && res.keys) {
        for (const key of res.keys) {
          try { await window.storage.delete(key, true); } catch(e){}
        }
      }
      setAnswers([]);
    } catch (e) { console.error(e); }
  }

  function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => { alert('링크: ' + url); });
  }

  // ============ LANDING ============
  if (mode === 'landing') {
    return (
      <div className="min-h-screen paper-bg paper-grain flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-10">
            <div className="inline-block text-accent font-caveat text-3xl mb-2 transform -rotate-2">
              ~ 스케치 설문 ~
            </div>
            <h1 className="font-display text-ink text-6xl md:text-7xl mb-2 leading-none">
              그림으로 만나는<br/>
              <span className="text-accent">우리 반 이야기</span>
            </h1>
            <div className="max-w-sm mx-auto">
              <RoughUnderline />
            </div>
            <p className="font-body text-ink-2 text-lg mt-5">
              답변이 워드클라우드 대신 <span className="font-hand text-ink font-bold text-xl">그림</span>으로 나타납니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setMode('teacher')}
              className="card-paper p-8 text-left border-2 border-ink transition-all hover:-translate-y-1 hover:shadow-2xl group"
              style={{ borderRadius: '4px' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-ink text-paper p-3" style={{ borderRadius: '4px' }}>
                  <GraduationCap size={28} strokeWidth={2} />
                </div>
                <span className="font-caveat text-accent text-2xl transform rotate-3">projector!</span>
              </div>
              <h2 className="font-display text-3xl text-ink mb-2">교사 화면</h2>
              <p className="font-body text-ink-2 text-sm leading-relaxed">
                수업 중 프로젝터 · 큰 화면에 띄우세요.<br/>
                학생들이 답변하면 실시간으로 그림이 등장합니다.
              </p>
            </button>

            <button
              onClick={() => setMode('student')}
              className="card-paper p-8 text-left border-2 border-ink transition-all hover:-translate-y-1 hover:shadow-2xl group"
              style={{ borderRadius: '4px' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-accent text-paper p-3" style={{ borderRadius: '4px' }}>
                  <Users size={28} strokeWidth={2} />
                </div>
                <span className="font-caveat text-blue-ink text-2xl transform -rotate-2">on phone!</span>
              </div>
              <h2 className="font-display text-3xl text-ink mb-2">학생 참여</h2>
              <p className="font-body text-ink-2 text-sm leading-relaxed">
                각자 휴대폰 · 노트북으로 접속해서<br/>
                답변을 제출하는 화면입니다.
              </p>
            </button>
          </div>

          <div className="text-center mt-10 font-caveat text-ink-2 text-xl">
            선택하면 시작됩니다 ↑
          </div>
        </div>
      </div>
    );
  }

  // ============ STUDENT VIEW ============
  if (mode === 'student') {
    return (
      <div className="min-h-screen paper-bg paper-grain flex items-start md:items-center justify-center p-4 md:p-6">
        <div className="max-w-lg w-full">
          <button
            onClick={() => { setMode('landing'); setSubmitted(false); }}
            className="font-hand text-ink-2 flex items-center gap-1 mb-4 hover:text-ink text-lg"
          >
            <ArrowLeft size={18} /> 처음으로
          </button>

          {!submitted ? (
            <div className="card-paper p-7 md:p-9 border-2 border-ink relative" style={{ borderRadius: '4px' }}>
              <div className="tape" />
              <div className="font-caveat text-accent text-xl mb-1 transform -rotate-1">
                Question ✏️
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-2 leading-tight">
                {QUESTION}
              </h2>
              <p className="font-body text-ink-2 text-sm mb-6">{SUBTITLE}</p>

              <div className="mb-5">
                <textarea
                  value={studentText}
                  onChange={(e) => setStudentText(e.target.value)}
                  placeholder="예: 친구가 추천해줘서, AI에 관심이 있어서, 포스터에 있는 로봇 그림이 멋져서..."
                  maxLength={60}
                  rows={3}
                  className="w-full font-hand text-xl bg-paper-2 border-2 border-ink p-4 resize-none focus:outline-none focus:border-accent text-ink"
                  style={{ borderRadius: '4px' }}
                />
                <div className="flex justify-between mt-1 font-body text-xs text-ink-2">
                  <span>짧고 구체적일수록 재미있는 그림이 나와요</span>
                  <span>{studentText.length} / 60</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!studentText.trim() || submitting}
                className="btn-ink w-full py-4 font-display text-2xl flex items-center justify-center gap-2"
                style={{ borderRadius: '4px' }}
              >
                {submitting ? (
                  <><RefreshCw className="spin-slow" size={20} /> 제출 중...</>
                ) : (
                  <><Send size={20} /> 제출하기</>
                )}
              </button>
            </div>
          ) : (
            <div className="card-paper p-9 border-2 border-ink text-center relative" style={{ borderRadius: '4px' }}>
              <div className="tape" />
              <div className="inline-block mb-4 p-4 bg-paper-2 rounded-full">
                <Sparkles size={40} className="text-accent" />
              </div>
              <h2 className="font-display text-4xl text-ink mb-3">제출 완료!</h2>
              <p className="font-body text-ink-2 mb-1">답변이 그림으로 만들어지고 있어요.</p>
              <p className="font-caveat text-accent text-xl mb-7">앞 화면을 확인해보세요 ✨</p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-paper px-6 py-3 font-hand text-lg"
                style={{ borderRadius: '4px' }}
              >
                답변 하나 더 제출하기
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============ TEACHER VIEW ============
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(currentUrl)}&bgcolor=FAF5EB&color=221E18&margin=10`;

  return (
    <div className="min-h-screen paper-bg paper-grain">
      {/* Header */}
      <header className="border-b-2 border-ink bg-paper-2" style={{ borderBottomStyle: 'dashed' }}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-3 flex-wrap">
          <button
            onClick={() => setMode('landing')}
            className="font-hand text-ink-2 flex items-center gap-1 hover:text-ink text-base"
          >
            <ArrowLeft size={16} /> 메뉴
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQR(!showQR)}
              className="btn-paper px-3 py-2 font-hand text-sm flex items-center gap-2"
              style={{ borderRadius: '4px' }}
            >
              <QrCode size={16} /> {showQR ? 'QR 숨기기' : 'QR 보이기'}
            </button>
            <button
              onClick={copyLink}
              className="btn-paper px-3 py-2 font-hand text-sm flex items-center gap-2"
              style={{ borderRadius: '4px' }}
            >
              {copied ? <><Check size={16} /> 복사됨</> : <><Copy size={16} /> 링크 복사</>}
            </button>
            <button
              onClick={clearAll}
              className="btn-paper px-3 py-2 font-hand text-sm flex items-center gap-2"
              style={{ borderRadius: '4px' }}
              disabled={answers.length === 0}
            >
              <Trash2 size={16} /> 전체 삭제
            </button>
          </div>
        </div>
      </header>

      {/* Question */}
      <div className="max-w-7xl mx-auto px-5 pt-8 pb-4">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="font-caveat text-accent text-2xl mb-1 transform -rotate-1 inline-block">
              오늘의 질문 ✏️
            </div>
            <h1 className="font-display text-ink text-4xl md:text-5xl lg:text-6xl leading-tight mb-2">
              {QUESTION}
            </h1>
            <div className="max-w-md">
              <RoughUnderline />
            </div>
            <p className="font-body text-ink-2 mt-3 text-base">{SUBTITLE}</p>
          </div>

          {showQR && (
            <div className="card-paper p-4 border-2 border-ink text-center" style={{ borderRadius: '4px' }}>
              <div className="font-hand text-ink text-sm mb-2 font-bold">📱 QR로 참여하기</div>
              <img src={qrUrl} alt="QR code" className="w-40 h-40 mx-auto" />
              <div className="font-caveat text-accent text-lg mt-1">scan me!</div>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2 font-hand text-ink-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>실시간 수신 중 · 총 <span className="font-bold text-ink">{answers.length}</span>개의 답변</span>
        </div>
      </div>

      {/* Gallery */}
      <main className="max-w-7xl mx-auto px-5 pb-16">
        {answers.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-7 pt-6">
            {answers.map((ans, i) => (
              <SketchCard key={ans.id} answer={ans} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ============ SKETCH CARD ============
function SketchCard({ answer, index }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const rot = answer.rotation || 0;

  return (
    <div
      className="card-paper p-3 hover-float relative animate-pop-in"
      style={{
        '--final-rot': `${rot}deg`,
        transform: `rotate(${rot}deg)`,
        animationDelay: `${Math.min(index * 40, 600)}ms`,
        borderRadius: '3px',
      }}
    >
      <div className="aspect-square bg-paper-2 relative overflow-hidden" style={{ borderRadius: '2px' }}>
        {!loaded && !failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 border-[3px] border-ink border-t-transparent rounded-full spin-slow" />
            <div className="font-caveat text-ink-2 text-base">그리는 중...</div>
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <div className="font-hand text-ink-2 text-center text-sm">
              🎨<br/>이미지를 불러올 수 없어요
            </div>
          </div>
        )}
        <img
          src={answer.imageUrl}
          alt={answer.text}
          className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>
      <div className="mt-2 px-1 pb-1 text-center font-hand text-ink leading-tight" style={{ fontSize: '1.05rem' }}>
        "{answer.text}"
      </div>
    </div>
  );
}

// ============ EMPTY STATE ============
function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="inline-block mb-6 relative">
        <svg viewBox="0 0 200 140" className="w-40 h-28">
          {/* simple sketch of paper + pencil */}
          <g stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 30 30 L 140 30 L 140 120 L 30 120 Z" fill="#FEFCF7"/>
            <path d="M 45 55 L 125 55" />
            <path d="M 45 70 L 115 70" />
            <path d="M 45 85 L 120 85" />
            <path d="M 45 100 L 100 100" />
            {/* pencil */}
            <g transform="translate(130,85) rotate(35)">
              <rect x="0" y="0" width="50" height="10" fill="var(--yellow)" />
              <polygon points="50,0 60,5 50,10" fill="#FEFCF7" />
              <polygon points="57,3 60,5 57,7" fill="var(--ink)" />
            </g>
          </g>
        </svg>
      </div>
      <h3 className="font-display text-3xl text-ink mb-2">답변을 기다리고 있어요</h3>
      <p className="font-body text-ink-2 max-w-md mx-auto mb-6">
        학생들이 답변을 제출하면 여기에 그림으로 나타납니다.<br/>
        상단의 <span className="font-hand text-ink font-bold">📱 QR 보이기</span> 또는 <span className="font-hand text-ink font-bold">🔗 링크 복사</span> 버튼으로 학생들에게 참여 링크를 공유해 보세요.
      </p>
      <div className="inline-block font-caveat text-accent text-2xl transform -rotate-2">
        ↑ 참여 링크 공유하기
      </div>
    </div>
  );
}
