import { useState, useEffect, useRef, useCallback } from "react";

// ════════════════════════════════════════════════════════════════════
//  SITE COMPLETO
//  Seção 0 — NOSSOS NÚMEROS: bolhas de clientes convergem com o scroll
//  Seção 1 — O TIME: roda multidisciplinar (auto-avanço por scroll)
//  Seção 2 — COMO TRABALHAMOS: morph dos círculos para os 5 pilares
// ════════════════════════════════════════════════════════════════════

export default function Site() {
  return (
    <>
      <NossosNumeros />
      <SecoesRodaPilares />
    </>
  );
}

// ─── helpers compartilhados ──────────────────────────────────────────
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInQuad = (t) => t * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// ─── auto-avanço estilo fullpage (compartilhado) ─────────────────────
// Um gesto de scroll dentro da seção pinada dispara um tween até a
// outra ponta do track; nas extremidades o scroll é liberado.
function useScrollAutoAvanco(ref) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animating = false;
    let touchY = null;

    const tweenTo = (targetY, dur = 1400) => {
      animating = true;
      const startY = window.scrollY;
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / dur);
        window.scrollTo(0, startY + (targetY - startY) * easeInOut(t));
        if (t < 1) requestAnimationFrame(step);
        else animating = false;
      };
      requestAnimationFrame(step);
    };

    const medidas = () => {
      const el = ref.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      return {
        prog: clamp01(-rect.top / Math.max(1, total)),
        inside: rect.top <= 1 && rect.bottom >= window.innerHeight - 1,
        topo: window.scrollY + rect.top,
        total,
      };
    };

    const disparar = (direcao, ev, m) => {
      if (animating) {
        ev.preventDefault();
        return;
      }
      if (direcao > 0 && m.prog < 0.999) {
        ev.preventDefault();
        tweenTo(m.topo + m.total);
      } else if (direcao < 0 && m.prog > 0.001) {
        ev.preventDefault();
        tweenTo(m.topo);
      }
    };

    const onWheel = (ev) => {
      const m = medidas();
      if (!m || !m.inside) return;
      disparar(ev.deltaY, ev, m);
    };
    const onTouchStart = (ev) => {
      touchY = ev.touches[0].clientY;
    };
    const onTouchMove = (ev) => {
      const m = medidas();
      if (!m || !m.inside || touchY === null) return;
      if (animating) {
        ev.preventDefault();
        return;
      }
      const dy = touchY - ev.touches[0].clientY; // >0 = gesto para baixo
      if (Math.abs(dy) < 12) return;
      touchY = null;
      disparar(dy, ev, m);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [ref]);
}

// ════════════════════════════════════════════════════════════════════
//  SEÇÃO 0: NOSSOS NÚMEROS
// ════════════════════════════════════════════════════════════════════

const WAVE_START = 0.6;
const WAVE_GAP = 1.6;
const DESIGN_WIDTH = 800;

// Disposição replicando a tela de referência (x/y em % do canvas).
const BUBBLES = [
  // onda 0 — âncoras grandes
  { id: "caixa",    label: "CAIXA",          x: 25, y: 75, size: 240, wave: 0, featured: true },
  { id: "rededor",  label: "REDE D'OR",      x: 80, y: 82, size: 285, wave: 0, featured: true },
  { id: "ambev",    label: "ambev",          x: 87, y: 36, size: 210, wave: 0, featured: true },
  { id: "raras",    label: "RarasNation",    x: 60, y: 33, size: 150, wave: 0 },
  { id: "imobo",    label: "IMOBO",          x: 20, y: 52, size: 140, wave: 0 },
  { id: "ahazou",   label: "ahazou",         x: 58, y: 54, size: 80,  wave: 0 },
  { id: "gam",      label: "GAM",            x: 50, y: 90, size: 100, wave: 0 },

  // onda 1
  { id: "sefaz",    label: "SEFAZ-CE",       x: 76, y: 11, size: 100, wave: 1 },
  { id: "omd",      label: "OMD",            x: 44, y: 29, size: 100, wave: 1 },
  { id: "oi",       label: "oi",             x: 40, y: 48, size: 150, wave: 1 },
  { id: "studio",   label: "STUDIO360",      x: 68, y: 50, size: 70,  wave: 1 },

  // onda 2
  { id: "syngenta", label: "syngenta",       x: 60, y: 16, size: 65,  wave: 2 },
  { id: "espaco",   label: "Espaço Junior",  x: 53, y: 68, size: 115, wave: 2 },
  { id: "formula",  label: "FÓRMULA ANIMAL", x: 93, y: 10, size: 90,  wave: 2 },
].map((b) => ({ ...b, delay: WAVE_START + b.wave * WAVE_GAP }));

const STATS = [
  { value: "+600",  label: "soluções\ndesenvolvidas", delay: 0.1 },
  { value: "+120",  label: "clientes\natendidos",     delay: 0.25 },
  { value: "+300%", label: "aumento de\nperformance", delay: 0.4 },
  { value: "+20",   label: "anos de\nexperiência",    delay: 0.55 },
];

function NossosNumeros() {
  const pinRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const [inView, setInView] = useState(false);
  // progresso do scrub + alvo da convergência (centro da TELA,
  // convertido para coordenadas % do canvas das bolhas)
  const [scrub, setScrub] = useState({ p: 0, tx: 50, ty: 50 });

  // um gesto de scroll toca a convergência inteira e entrega na seção de baixo
  useScrollAutoAvanco(pinRef);

  useEffect(() => {
    const el = pinRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = pinRef.current;
      const canvas = canvasRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = clamp01(-rect.top / scrollable);

      // centro da viewport → % dentro do canvas das bolhas
      let tx = 50;
      let ty = 50;
      if (canvas) {
        const c = canvas.getBoundingClientRect();
        if (c.width > 0 && c.height > 0) {
          tx = ((window.innerWidth / 2 - c.left) / c.width) * 100;
          ty = ((window.innerHeight / 2 - c.top) / c.height) * 100;
        }
      }
      setScrub({ p, tx, ty });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const { p, tx, ty } = scrub;
  const pConverge = easeInQuad(p);
  const contentY = -easeOutCubic(p) * 120;
  const contentOpacity = 1 - clamp01(p * 1.6);

  return (
    <div className="nn-root">
      <style>{cssBolhas}</style>

      <div ref={pinRef} className="nn-pin-wrapper">
        <div className="nn-stage" style={{ pointerEvents: p > 0.9 ? "none" : "auto" }}>
          <div className={`nn-slide ${inView ? "is-visible" : ""}`}>
            <div
              className="nn-content"
              style={{ transform: `translateY(${contentY}%)`, opacity: contentOpacity }}
            >
              <p className="nn-eyebrow anim fade-up" style={{ "--d": "0s" }}>
                NOSSOS NÚMEROS
              </p>
              <h2 className="nn-title anim fade-up" style={{ "--d": "0.08s" }}>
                Operação real,<br />métricas<br />verificáveis
              </h2>
              <div className="nn-stats">
                {STATS.map((s) => (
                  <div key={s.value} className="anim fade-up" style={{ "--d": `${s.delay + 0.5}s` }}>
                    <div className="nn-stat-value">{s.value}</div>
                    <div className="nn-stat-label">
                      {s.label.split("\n").map((l) => (
                        <div key={l}>{l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="nn-canvas" ref={canvasRef}>
              {BUBBLES.map((b) => (
                <div
                  key={b.id}
                  className="nn-pos"
                  style={{
                    left: `${lerp(b.x, tx, pConverge)}%`,
                    top: `${lerp(b.y, ty, pConverge)}%`,
                    width: `${(b.size / DESIGN_WIDTH) * 100}%`,
                  }}
                >
                  <div
                    className="nn-converge"
                    style={{
                      transform: `scale(${1 - pConverge})`,
                      opacity: 1 - clamp01(pConverge * 1.15),
                    }}
                  >
                    <div
                      className="nn-bubble anim pop-in"
                      style={{
                        "--d": `${b.delay}s`,
                        "--fs": `${b.size / (b.featured ? 7.5 : 8.5)}px`,
                        fontWeight: b.featured ? 700 : 500,
                      }}
                    >
                      <span className="nn-bubble-inner">{b.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cssBolhas = `
  @keyframes nnPopIn {
    0%   { transform: scale(0);    opacity: 0; }
    60%  { transform: scale(1.08); opacity: 1; }
    80%  { transform: scale(0.97); }
    100% { transform: scale(1);    opacity: 1; }
  }
  @keyframes nnFadeUp {
    from { transform: translateY(14px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes nnFloat {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-5%); }
  }

  .nn-slide .anim { opacity: 0; }
  .nn-slide.is-visible .pop-in {
    animation: nnPopIn 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--d);
  }
  .nn-slide.is-visible .pop-in .nn-bubble-inner {
    animation: nnFloat 5s ease-in-out infinite;
    animation-delay: calc(var(--d) + 2s);
  }
  .nn-slide.is-visible .fade-up {
    animation: nnFadeUp 0.9s ease-out forwards;
    animation-delay: var(--d);
  }

  @media (prefers-reduced-motion: reduce) {
    .nn-slide .anim, .nn-slide.is-visible .anim {
      animation: none !important;
      opacity: 1;
      transform: none;
    }
    .nn-slide.is-visible .pop-in .nn-bubble-inner { animation: none !important; }
  }

  .nn-root {
    background: #3b3b3b; /* mesmo fundo das seções O Time / Como Trabalhamos */
    font-family: 'Montserrat', 'Segoe UI', system-ui, sans-serif;
  }

  .nn-pin-wrapper {
    height: 250vh;
    position: relative;
  }

  .nn-stage {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100dvh;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 2; /* bolhas convergem por cima da seção O Time que sobe atrás */
  }

  /* sem painel: a seção é full-bleed, integrada ao fundo */
  .nn-slide {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: minmax(260px, 32%) 1fr;
  }

  .nn-content {
    padding: clamp(28px, 5vw, 64px);
    z-index: 2;
    display: flex;
    flex-direction: column;
    will-change: transform, opacity;
  }

  .nn-eyebrow {
    color: #00FCCE;
    font-size: 12px;
    letter-spacing: 0.2em;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }
  .nn-title {
    color: #fff;
    font-size: clamp(24px, 3.4vw, 42px);
    line-height: 1.18;
    font-weight: 700;
    margin: 12px 0 0;
  }
  .nn-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(20px, 3.5vh, 32px) 18px;
    margin-top: auto;
    padding-top: 28px;
    padding-bottom: clamp(8px, 2vh, 24px);
  }
  .nn-stat-value {
    color: #00FCCE;
    font-size: clamp(20px, 2.4vw, 30px);
    font-weight: 800;
  }
  .nn-stat-label {
    color: #cfd4d7;
    font-size: clamp(11px, 1.2vw, 13px);
    margin-top: 4px;
    line-height: 1.35;
  }

  .nn-canvas {
    position: relative;
    container-type: inline-size;
  }
  .nn-pos {
    position: absolute;
    transform: translate(-50%, -50%);
    aspect-ratio: 1 / 1;
  }
  .nn-converge {
    position: absolute;
    inset: 0;
    will-change: transform, opacity;
  }
  .nn-bubble {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #2c3236, #1e2326 75%);
    box-shadow: 0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
    color: #f2f4f5;
    letter-spacing: 0.06em;
    user-select: none;
  }
  .nn-bubble-inner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8%;
    font-size: clamp(8px, calc(var(--fs) / 9.6 * 1cqw), 26px);
  }

  @media (max-width: 720px) {
    .nn-slide {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }
    .nn-content {
      padding: 24px 20px 8px;
    }
    .nn-stats {
      margin-top: 0;
      padding-top: 24px;
      padding-bottom: 0;
    }
    .nn-canvas { width: 100%; }
  }
`;

// ════════════════════════════════════════════════════════════════════
//  SEÇÕES 1 e 2: O TIME (roda) → COMO TRABALHAMOS (pilares)
// ════════════════════════════════════════════════════════════════════

// ─── Seção 1: roda multidisciplinar ──────────────────────────────────
const SECOES = [
  {
    id: "dev",
    label: "Desenvolvimento",
    side: "right",
    itens: ["Java", "Ruby", "Node", "Python", "dotNet", "React", "React Native", "Flutter"],
  },
  {
    id: "produto",
    label: "Produto & Projetos",
    side: "left",
    itens: ["UX/UI", "Refinamento de backlog", "Sprints cadenciados", "Sistema de acompanhamento"],
  },
  {
    id: "arq",
    label: "Arquitetura & Liderança",
    side: "right",
    itens: ["Padrões de arquitetura", "Decisões de stack", "Governança técnica", "Desenho estrutural"],
  },
  {
    id: "devops",
    label: "DevOps, Dados & IA",
    side: "left",
    itens: ["Infra em AWS", "Azure e Google Cloud", "CI/CD", "Engenharia de dados", "BI e aplicação de IA"],
  },
];

// ─── Seção 2: cinco pilares ──────────────────────────────────────────
const PILARES = [
  { num: "01", titulo: "Visão de negócio", desc: "Cada decisão técnica tem justificativa operacional por trás" },
  { num: "02", titulo: "Estruturação operacional", desc: "Organizamos fluxos e integrações antes mesmo de programar" },
  { num: "03", titulo: "Arquitetura escalável", desc: "Projetos desenhados para crescer sem dor técnica" },
  { num: "04", titulo: "Tecnologia + estratégia", desc: "Stack escolhida em função do problema, não da moda" },
  { num: "05", titulo: "Relacionamento próximo", desc: "Pontos focais nominais e cadência previsível" },
];

const INTERVALO_MS = 5200;

// Cada círculo ocupa um "slot" final (0–4, esquerda→direita / cima→baixo).
// Início (trevo): slot0=oeste, slot1=norte, slot2=novo (nasce no centro),
// slot3=leste, slot4=sul. Assim o 5º círculo surge no meio e termina no meio.
const SLOT_SECAO = [1, 0, null, 2, 3]; // índice em SECOES de cada slot (null = círculo novo)

// Gradiente direcional do trevo: escuro no lado voltado ao centro
const GRAD_DIR = [
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.40) 100%)", // oeste → escuro à direita
  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.40) 100%)", // norte → escuro embaixo
  "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.32) 100%)", // novo
  "linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.40) 100%)", // leste → escuro à esquerda
  "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.40) 100%)", // sul → escuro em cima
];


function SecoesRodaPilares() {
  const trackRef = useRef(null);
  const [p, setP] = useState(0); // progresso de scroll 0→1 dentro do track
  const [vp, setVp] = useState({ w: 1200, h: 800 });
  const [ativo, setAtivo] = useState(0);

  // viewport
  useEffect(() => {
    const upd = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  // progresso de scroll (rAF para suavidade)
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const top = el.getBoundingClientRect().top;
        setP(clamp01(-top / Math.max(1, total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // auto-avanço: um gesto de scroll toca a transição inteira (hook compartilhado)
  useScrollAutoAvanco(trackRef);

  // ciclo automático da seção 1 (para quando a morph começa)
  useEffect(() => {
    if (p > 0.12) return;
    const t = setInterval(() => setAtivo((a) => (a + 1) % SECOES.length), INTERVALO_MS);
    return () => clearInterval(t);
  }, [p]);

  // ── geometria ──────────────────────────────────────────────────────
  const isMobile = vp.w < 820;
  const W = isMobile ? Math.min(vp.w * 0.9, vp.h * 0.46) : Math.min(636, vp.w * 0.52, vp.h * 0.62);
  const C = { x: vp.w / 2, y: isMobile ? vp.h * 0.42 : vp.h * 0.55 };
  const r0 = W * 0.23; // raio das pétalas (opostas se tangenciam: d = r)

  // fases da animação por scroll
  const morphT = easeInOut(clamp01((p - 0.28) / 0.42)); // 0.28→0.70: arrasta e cresce
  const fade1 = 1 - clamp01(p / 0.2); //              0→0.20: textos da seção 1 somem
  const headFade2 = clamp01((p - 0.6) / 0.2); //      0.60→0.80: título da seção 2

  // posições iniciais (trevo) e finais (linha/coluna) de cada slot
  const startPos = [
    { x: C.x - r0, y: C.y }, // oeste
    { x: C.x, y: C.y - r0 }, // norte
    { x: C.x, y: C.y }, //      novo (centro)
    { x: C.x + r0, y: C.y }, // leste
    { x: C.x, y: C.y + r0 }, // sul
  ];
  const endPos = isMobile
    ? PILARES.map((_, i) => ({ x: vp.w / 2, y: vp.h * (0.225 + 0.152 * i) }))
    : PILARES.map((_, i) => ({ x: vp.w * (0.12 + 0.19 * i), y: vp.h * 0.6 }));
  const r1 = vp.w * 0.115; // raio final no desktop
  const rectW = vp.w * 0.86; // retângulo final no mobile
  const rectH = vp.h * 0.135;

  const secao = SECOES[ativo];
  const labelFont = Math.max(11, Math.min(20, W * 0.0315));

  const renderLabel = (label) =>
    label.includes("&") ? (
      <>
        {label.split("&")[0].trim()} &<br />
        {label.split("&")[1].trim()}
      </>
    ) : (
      label
    );

  return (
    <div ref={trackRef} className="sp-track">
      <style>{cssRoda}</style>

      <div className="sp-sticky">
        {/* fundo escurece conforme entra na seção 2 */}
        <div className="sp-dark" style={{ opacity: morphT * 0.85 }} />

        {/* esfera externa da seção 1 */}
        <div
          className="sp-sphere"
          style={{ left: C.x - W / 2, top: C.y - W / 2, width: W, height: W, opacity: fade1 }}
        />

        {/* círculos compartilhados — interpolam do trevo para a linha (desktop)
            ou para retângulos arredondados empilhados (mobile) */}
        {startPos.map((s, i) => {
          const e = endPos[i];
          const x = lerp(s.x, e.x, morphT);
          const y = lerp(s.y, e.y, morphT);
          const w = isMobile ? lerp(2 * r0, rectW, morphT) : 2 * lerp(r0, r1, morphT);
          const h = isMobile ? lerp(2 * r0, rectH, morphT) : w;
          const br = isMobile ? lerp(r0, 18, morphT) : w / 2;
          const pilar = PILARES[i];
          const t = clamp01((p - (0.66 + i * 0.045)) / 0.2); // stagger do texto
          return (
            <div
              key={i}
              className="sp-circle"
              style={{
                left: x - w / 2,
                top: y - h / 2,
                width: w,
                height: h,
                borderRadius: br,
                background: GRAD_DIR[i],
                opacity: i === 2 ? morphT : 1, // o 5º círculo nasce durante a morph
              }}
            >
              {/* sombreamento final (uniforme) entra por cima do direcional */}
              <div className="sp-circle-final" style={{ borderRadius: br, opacity: morphT }} />

              {/* conteúdo do pilar, dentro do círculo/retângulo */}
              <div
                className={`sp-pilar ${isMobile ? "sp-pilar--row" : ""}`}
                style={{ opacity: t, transform: `translateY(${(1 - t) * 14}px)` }}
              >
                <span className="sp-badge">{pilar.num}</span>
                <div className="sp-pilar-texto">
                  <h3>{pilar.titulo}</h3>
                  <div className="sp-divider" />
                  <p>{pilar.desc}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* ───── SEÇÃO 1: textos ───── */}
        <div className="sp-sec1" style={{ opacity: fade1, pointerEvents: fade1 > 0.4 ? "auto" : "none" }}>
          <header className="sp-head">
            <p className="sp-eyebrow">O TIME</p>
            <h2 className="sp-title">Time interno e multidisciplinar</h2>
            <p className="sp-sub">Sem terceirização do core técnico</p>
          </header>

          {/* rótulos centralizados nas pétalas */}
          {SLOT_SECAO.map((si, slot) =>
            si === null ? null : (
              <button
                key={SECOES[si].id}
                className={`sp-label ${si === ativo ? "is-active" : ""}`}
                style={{ left: startPos[slot].x, top: startPos[slot].y, fontSize: labelFont }}
                onClick={() => setAtivo(si)}
              >
                {renderLabel(SECOES[si].label)}
              </button>
            )
          )}

          {/* linha conectora */}
          {!isMobile && (
            <div
              key={`c-${secao.id}`}
              className={`sp-conn sp-conn--${secao.side}`}
              style={{
                top: C.y,
                left: secao.side === "right" ? C.x + W / 2 - 12 : C.x - W / 2 - 78,
              }}
            />
          )}

          {/* listas: laterais no desktop, abaixo no mobile */}
          {isMobile ? (
            <div className="sp-mlist" style={{ top: C.y + W / 2 + 10 }}>
              <Checklist key={secao.id} itens={secao.itens} align="left" />
            </div>
          ) : (
            <>
              <div
                className="sp-side"
                style={{ left: 24, width: C.x - W / 2 - 110, justifyContent: "flex-end", opacity: secao.side === "left" ? 1 : 0 }}
              >
                {secao.side === "left" && <Checklist key={secao.id} itens={secao.itens} align="right" />}
              </div>
              <div
                className="sp-side"
                style={{ left: C.x + W / 2 + 86, width: C.x - W / 2 - 110, opacity: secao.side === "right" ? 1 : 0 }}
              >
                {secao.side === "right" && <Checklist key={secao.id} itens={secao.itens} align="left" />}
              </div>
            </>
          )}

          {/* indicadores */}
          <div className="sp-dots" role="tablist" aria-label="Quadrantes">
            {SECOES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === ativo}
                aria-label={s.label}
                className={`sp-dot ${i === ativo ? "is-active" : ""}`}
                onClick={() => setAtivo(i)}
              />
            ))}
          </div>
        </div>

        {/* ───── SEÇÃO 2: cinco pilares ───── */}
        <header
          className="sp-head"
          style={{ opacity: headFade2, transform: `translateY(${(1 - headFade2) * 18}px)` }}
        >
          <p className="sp-eyebrow">COMO TRABALHAMOS</p>
          <h2 className="sp-title">
            Cinco pilares aplicados em
            <br />
            todos os projetos
          </h2>
        </header>
      </div>
    </div>
  );
}

// Lista com entrada item a item (stagger)
// align "left"  → texto à esquerda, ✓ antes do texto
// align "right" → texto à direita, ✓ no fim
function Checklist({ itens, align }) {
  const tickNoFim = align === "right";
  return (
    <ul className={`sp-check sp-check--${align}`}>
      {itens.map((item, i) => (
        <li key={item} style={{ animationDelay: `${0.25 + i * 0.16}s` }}>
          {!tickNoFim && <span className="sp-tick sp-tick--start">✓</span>}
          {item}
          {tickNoFim && <span className="sp-tick sp-tick--end">✓</span>}
        </li>
      ))}
    </ul>
  );
}

const cssRoda = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  .sp-track {
    position: relative;
    height: 340vh; /* duração da animação de scroll */
    /* sobe por baixo do trecho final das bolhas: enquanto elas convergem,
       O Time já aparece atrás, alinhando exatamente quando elas somem */
    margin-top: -100vh;
    background: #3b3b3b;
    font-family: 'Montserrat', sans-serif;
  }
  .sp-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }
  .sp-dark { position: absolute; inset: 0; background: #101114; }

  /* ── círculos ── */
  .sp-sphere {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.20) 100%);
  }
  .sp-circle { position: absolute; border-radius: 50%; }
  .sp-circle-final {
    position: absolute; inset: 0; border-radius: 50%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.30) 100%);
  }

  /* ── cabeçalhos ── */
  .sp-head { position: absolute; top: 5vh; left: 0; right: 0; text-align: center; pointer-events: none; }
  .sp-eyebrow { color: #00FCCE; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; margin: 0 0 10px; text-transform: uppercase; }
  .sp-title { color: #fff; font-size: clamp(24px, 4vw, 42px); font-weight: 700; margin: 0 0 8px; line-height: 1.2; }
  .sp-sub { color: #cfcfcf; font-size: clamp(14px, 2vw, 18px); margin: 0; }

  /* ── rótulos das pétalas ── */
  .sp-label {
    position: absolute;
    transform: translate(-50%, -50%);
    border: none; cursor: pointer;
    background: none;
    color: #ffffff;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
    padding: 6px;
  }
  .sp-label.is-active {
    background: var(--Gradient, linear-gradient(180deg, #00FCCE 0%, #0085DD 100%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .sp-label:focus-visible { outline: 2px solid #00FCCE; outline-offset: 2px; border-radius: 4px; }

  /* ── linha conectora ── */
  .sp-conn {
    position: absolute; height: 1px; width: 90px;
    animation: sp-grow 0.7s ease both;
  }
  .sp-conn--right {
    background: linear-gradient(90deg, rgba(0,252,206,0.8), rgba(0,252,206,0.08));
    transform-origin: left center;
  }
  .sp-conn--left {
    background: linear-gradient(270deg, rgba(0,252,206,0.8), rgba(0,252,206,0.08));
    transform-origin: right center;
  }
  @keyframes sp-grow { from { transform: scaleX(0); opacity: 0; } }

  /* ── listas laterais ── */
  .sp-side {
    position: absolute; top: 50%;
    transform: translateY(-50%);
    display: flex;
    transition: opacity 0.35s ease;
  }
  .sp-mlist { position: absolute; left: 0; right: 0; display: flex; justify-content: center; }
  .sp-mlist .sp-check li { font-size: clamp(15px, 4.2vw, 20px); margin: 6px 0; }

  .sp-check { list-style: none; margin: 0; padding: 0; }
  .sp-check li {
    color: #F0F3F4;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(16px, 2vw, 28px);
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 8px 0;
    opacity: 0;
    animation: sp-item-in 0.55s cubic-bezier(.2,.7,.3,1) both;
  }
  .sp-check--left { text-align: left; }
  .sp-check--right { text-align: right; }
  .sp-check--right li { animation-name: sp-item-in-right; }
  .sp-check--center { text-align: center; }
  .sp-tick { color: #ffffff; font-weight: 700; }
  .sp-tick--start { margin-right: 10px; }
  .sp-tick--end { margin-left: 10px; }

  @keyframes sp-item-in { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: none; } }
  @keyframes sp-item-in-right { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }

  /* ── dots ── */
  .sp-dots {
    position: absolute; right: 18px; top: 50%;
    transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 14px;
  }
  .sp-dot {
    width: 7px; height: 7px; border-radius: 50%;
    border: none; padding: 0; cursor: pointer;
    background: #6f6f6f;
    transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
  }
  .sp-dot.is-active {
    background: #00FCCE;
    box-shadow: 0 0 10px rgba(0,252,206,0.8);
    transform: scale(1.35);
  }

  /* ── seção 2: pilares (dentro dos círculos/retângulos) ── */
  .sp-pilar {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 12%;
    pointer-events: none;
  }
  .sp-badge {
    display: inline-flex; align-items: center; justify-content: center;
    flex: none;
    width: 32px; height: 32px; border-radius: 50%;
    border: 1px solid #00FCCE;
    background: rgba(8, 18, 20, 0.6);
    color: #fff; font-size: 11px; font-weight: 700;
    margin-bottom: 10px;
  }
  .sp-pilar-texto { min-width: 0; }
  .sp-pilar h3 {
    color: #F0F3F4;
    font-size: clamp(12px, 1.35vw, 18px);
    font-weight: 700;
    line-height: 1.3;
    margin: 0 0 8px;
  }
  .sp-divider { width: 56%; height: 1px; background: rgba(240,243,244,0.18); margin: 0 auto 8px; }
  .sp-pilar p {
    color: rgba(240, 243, 244, 0.78);
    font-size: clamp(10px, 1.05vw, 14px);
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
  }

  /* mobile: retângulo arredondado com badge à esquerda e texto à direita */
  .sp-pilar--row {
    flex-direction: row;
    text-align: left;
    gap: 14px;
    padding: 12px 20px;
  }
  .sp-pilar--row .sp-badge { margin: 0; }
  .sp-pilar--row .sp-divider { display: none; }
  .sp-pilar--row h3 { margin: 0 0 4px; font-size: 15px; }
  .sp-pilar--row p { font-size: 13px; }
`;
