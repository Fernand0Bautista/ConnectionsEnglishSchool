/**
 * Connections English School - Interactive Scripts 2026
 * Sede Salta (Salta 285 - 299 4042105) & Sede Rodhe (Rodhe 150 - 299 5067544)
 * Neuquén Capital
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Midnight Academy vs Soft Pearl)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('ces_theme');

  // If user previously selected light theme, apply it
  if (savedTheme === 'light') {
    document.body.classList.add('theme-light');
    if (themeToggle) {
      themeToggle.innerHTML = '☀️';
      themeToggle.setAttribute('aria-label', 'Cambiar al tema oscuro');
      themeToggle.setAttribute('aria-pressed', 'true');
    }
  } else {
    if (themeToggle) {
      themeToggle.innerHTML = '🌙';
      themeToggle.setAttribute('aria-label', 'Cambiar al tema claro');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      const isLight = document.body.classList.contains('theme-light');
      themeToggle.innerHTML = isLight ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isLight ? 'Cambiar al tema oscuro' : 'Cambiar al tema claro');
      themeToggle.setAttribute('aria-pressed', String(isLight));
      localStorage.setItem('ces_theme', isLight ? 'light' : 'dark');
    });
  }

  // 2. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  // 3. Floating WhatsApp Multi-Branch Popover
  const waTrigger = document.getElementById('waTrigger');
  const waPopover = document.getElementById('waPopover');

  if (waTrigger && waPopover) {
    waTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = waPopover.classList.toggle('active');
      waTrigger.setAttribute('aria-expanded', String(isOpen));
      waPopover.setAttribute('aria-hidden', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!waPopover.contains(e.target) && !waTrigger.contains(e.target)) {
        waPopover.classList.remove('active');
        waTrigger.setAttribute('aria-expanded', 'false');
        waPopover.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // 4. Interactive Sede Switcher Buttons
  const sedeToggleBtns = document.querySelectorAll('.sede-toggle-btn');
  const saltaCard = document.querySelector('.salta-card');
  const rodheCard = document.querySelector('.rodhe-card');

  if (sedeToggleBtns.length > 0) {
    sedeToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sedeToggleBtns.forEach(b => b.classList.remove('active'));
        sedeToggleBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        const targetSede = btn.getAttribute('data-sede');

        if (targetSede === 'all') {
          if (saltaCard) saltaCard.style.display = 'flex';
          if (rodheCard) rodheCard.style.display = 'flex';
        } else if (targetSede === 'salta') {
          if (saltaCard) saltaCard.style.display = 'flex';
          if (rodheCard) rodheCard.style.display = 'none';
        } else if (targetSede === 'rodhe') {
          if (saltaCard) saltaCard.style.display = 'none';
          if (rodheCard) rodheCard.style.display = 'flex';
        }
      });
    });
  }

  // 5. Interactive Audio Pronunciation (Web Speech API)
  const listenBtns = document.querySelectorAll('.phrase-btn-listen');
  if ('speechSynthesis' in window) {
    listenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToSpeak = btn.getAttribute('data-phrase');
        if (!textToSpeak) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        const originalText = btn.innerHTML;
        btn.innerHTML = '🔊 Escuchando...';
        btn.style.background = '#ff6b00';
        btn.style.color = '#ffffff';

        utterance.onend = () => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.color = '';
        };

        utterance.onerror = () => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.color = '';
        };

        window.speechSynthesis.speak(utterance);
      });
    });
  } else {
    listenBtns.forEach(btn => {
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
      btn.title = 'La reproducción de audio no está disponible en este navegador';
    });
  }

  // 6. Course Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory.includes(filterCategory)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherButton = otherItem.querySelector('.faq-question');
            if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
          }
        });

        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
        questionBtn.setAttribute('aria-expanded', String(!isActive));
      });
    }
  });

  // 8. Interactive Level Diagnostic Quiz with Dynamic Progress Bar
  const quizSteps = document.querySelectorAll('.quiz-step');
  const nextBtns = document.querySelectorAll('.quiz-next-btn');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizResultScore = document.getElementById('quizScore');
  const quizResultTitle = document.getElementById('quizTitle');
  const quizResultDesc = document.getElementById('quizDesc');
  const quizWaSalta = document.getElementById('quizWaSalta');
  const quizWaRodhe = document.getElementById('quizWaRodhe');
  const quizResetBtn = document.getElementById('quizResetBtn');

  let currentStep = 1;
  const userAnswers = {};

  const correctAnswers = {
    q1: 'b',
    q2: 'c',
    q3: 'b'
  };

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const qName = `q${currentStep}`;
      const selectedOption = document.querySelector(`input[name="${qName}"]:checked`);

      if (!selectedOption) {
        alert('Por favor seleccioná una opción para continuar.');
        return;
      }

      userAnswers[qName] = selectedOption.value;

      const currentStepEl = document.getElementById(`step-${currentStep}`);
      if (currentStepEl) {
        currentStepEl.classList.remove('active');
      }

      currentStep++;

      if (currentStep <= 3) {
        const nextStepEl = document.getElementById(`step-${currentStep}`);
        if (nextStepEl) {
          nextStepEl.classList.add('active');
        }
        if (quizProgressFill) {
          quizProgressFill.style.width = `${(currentStep / 3) * 100}%`;
        }
      } else {
        if (quizProgressFill) {
          quizProgressFill.style.width = '100%';
        }
        calculateQuizResult();
        const resultStepEl = document.getElementById('step-result');
        if (resultStepEl) {
          resultStepEl.classList.add('active');
        }
      }
    });
  });

  function calculateQuizResult() {
    let score = 0;
    if (userAnswers.q1 === correctAnswers.q1) score++;
    if (userAnswers.q2 === correctAnswers.q2) score++;
    if (userAnswers.q3 === correctAnswers.q3) score++;

    let levelName = '';
    let levelDetail = '';

    if (score === 3) {
      levelName = 'Nivel Intermedio / Avanzado (B1 - B2)';
      levelDetail = '¡Excelente base gramatical y léxica! Estás listo para afianzar fluidez conversacional en grupos avanzados o preparar exámenes internacionales (Cambridge First o CAE).';
    } else if (score === 2) {
      levelName = 'Nivel Pre-Intermedio (A2 - B1)';
      levelDetail = 'Tenés muy buenos conocimientos fundamentales. Con nuestro enfoque comunicativo vas a ganar soltura y confianza para hablar con total naturalidad.';
    } else {
      levelName = 'Nivel Principiante / Elemental (A1)';
      levelDetail = '¡El mejor momento para empezar es hoy! Nuestras clases dinámicas te van a llevar paso a paso para que hables inglés desde el primer día sin miedos ni trabas.';
    }

    if (quizResultScore) quizResultScore.textContent = `Resultado: ${score} de 3 respuestas correctas`;
    if (quizResultTitle) quizResultTitle.textContent = levelName;
    if (quizResultDesc) quizResultDesc.textContent = levelDetail;

    const msgSalta = encodeURIComponent(`Hola Connections English School! Hice el test express en su web y obtuve: ${levelName} (${score}/3 aciertos). Quisiera coordinar una entrevista de nivelación en la Sede Salta 285.`);
    const msgRodhe = encodeURIComponent(`Hola Connections English School! Hice el test express en su web y obtuve: ${levelName} (${score}/3 aciertos). Quisiera coordinar una entrevista de nivelación en la Sede Rodhe 150.`);

    if (quizWaSalta) {
      quizWaSalta.href = `https://wa.me/5492994042105?text=${msgSalta}`;
    }
    if (quizWaRodhe) {
      quizWaRodhe.href = `https://wa.me/5492995067544?text=${msgRodhe}`;
    }
  }

  if (quizResetBtn) {
    quizResetBtn.addEventListener('click', () => {
      currentStep = 1;
      const radios = document.querySelectorAll('.quiz-option-label input[type="radio"]');
      radios.forEach(r => r.checked = false);
      Object.keys(userAnswers).forEach(key => delete userAnswers[key]);

      if (quizProgressFill) {
        quizProgressFill.style.width = '33.3%';
      }

      quizSteps.forEach(step => step.classList.remove('active'));
      const firstStep = document.getElementById('step-1');
      if (firstStep) firstStep.classList.add('active');
    });
  }

  // 9. Contact Form handling with Branch routing
  const contactForm = document.getElementById('contactForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');

  // Course CTAs prefill the contact form so the WhatsApp message is specific.
  const courseCtas = document.querySelectorAll('.course-cta');
  courseCtas.forEach(cta => {
    cta.addEventListener('click', () => {
      const course = cta.getAttribute('data-course');
      const courseSelect = document.getElementById('formCourse');
      const messageField = document.getElementById('formMessage');

      if (courseSelect && course) {
        const matchingOption = [...courseSelect.options].find(option =>
          option.textContent.toLowerCase().includes(course.toLowerCase()) ||
          option.value.toLowerCase().includes(course.toLowerCase())
        );
        if (matchingOption) courseSelect.value = matchingOption.value;
      }
      if (messageField && course) {
        messageField.value = `Me interesa solicitar una clase de prueba de ${course}. Quisiera consultar horarios disponibles.`;
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const branch = document.getElementById('formBranch').value;
      const course = document.getElementById('formCourse').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !phone) {
        alert('Por favor completá tu nombre y teléfono de contacto.');
        return;
      }

      let targetPhone = '5492994042105'; // Salta
      let branchName = 'Sede Salta (Salta 285)';

      if (branch === 'rodhe') {
        targetPhone = '5492995067544';
        branchName = 'Sede Rodhe (Rodhe 150)';
      }

      const waText = encodeURIComponent(
        `¡Hola Connections English School!\nMi nombre es: ${name}\nTeléfono: ${phone}\nSede de preferencia: ${branchName}\nCurso de interés: ${course}\nConsulta: ${message || 'Quisiera recibir información sobre vacantes y aranceles.'}`
      );

        window.open(`https://wa.me/${targetPhone}?text=${waText}`, '_blank');

      if (formSuccessBanner) {
        formSuccessBanner.style.display = 'block';
        contactForm.reset();
        formSuccessBanner.focus();
      }
    });
  }
});
