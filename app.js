(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 3, 2) * 90}ms`;
    observer.observe(el);
  });

  document.querySelectorAll('.js-checkout').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.fbq) {
        fbq('trackCustom', 'CheckoutLinkClick', {
          content_name: 'Método 72 + 40 — Alho Negro Sem Erro',
          value: 37.90,
          currency: 'BRL'
        });
      }
    });
  });

  const lab = document.querySelector('.scroll-lab');
  const object = document.getElementById('scroll-object');
  const front = object && object.querySelector('.object-front');
  const mid = object && object.querySelector('.object-mid');
  const back = object && object.querySelector('.object-back');
  const day = document.getElementById('scroll-day');
  const title = document.getElementById('scroll-title');
  const copy = document.getElementById('scroll-text');
  const fill = document.getElementById('scroll-meter-fill');
  const states = [
    ['72 h', 'Valide a panela', 'Observe temperatura, estabilidade e vedação antes de colocar o primeiro alho.'],
    ['Dia 0', 'Comece com clareza', 'Prepare, registre e inicie o lote com os parâmetros certos desde o começo.'],
    ['Dia 20', 'Leia os sinais', 'Compare aroma, cor e textura com os marcos esperados no meio do processo.'],
    ['Dia 40', 'Decida pelo ponto', 'Finalize com critérios claros — sem abrir a panela por ansiedade e sem depender de sorte.']
  ];
  let currentState = -1;
  function updateScrollLab(){
    if(!lab || !object) return;
    const rect = lab.getBoundingClientRect();
    const range = Math.max(1, lab.offsetHeight - innerHeight);
    const p = Math.max(0, Math.min(1, -rect.top / range));
    const tilt = -11 + p * 22;
    object.style.transform = `rotateX(${4 - p * 8}deg) rotateY(${tilt}deg) translateY(${Math.sin(p * Math.PI) * -18}px)`;
    front.style.transform = `translate3d(0,0,${p * 42}px) rotateY(${p * 2}deg)`;
    mid.style.transform = `translate3d(${20 + p * 42}px,${-14 - p * 20}px,${-70 + p * 8}px) rotateY(${-6 + p * 8}deg)`;
    back.style.transform = `translate3d(${38 + p * 74}px,${-28 - p * 34}px,${-130 + p * 12}px) rotateY(${-10 + p * 13}deg)`;
    fill.style.transform = `scaleX(${p})`;
    const nextState = Math.min(states.length - 1, Math.floor(p * states.length));
    if(nextState !== currentState){
      currentState = nextState;
      day.textContent = states[nextState][0]; title.textContent = states[nextState][1]; copy.textContent = states[nextState][2];
    }
  }
  addEventListener('scroll', updateScrollLab, {passive:true});
  updateScrollLab();
})();
