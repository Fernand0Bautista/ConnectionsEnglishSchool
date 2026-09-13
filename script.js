/**
 * Connections English School - Interactive Scripts
 * Sede Salta (Salta 285 - 299 4042105) & Sede Rodhe (Rodhe 150 - 299 5067544)
 * Neuquén Capital
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Floating WhatsApp Multi-Branch Popover
  const waTrigger = document.getElementById('waTrigger');
  const waPopover = document.getElementById('waPopover');

  if (waTrigger && waPopover) {
    waTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      waPopover.classList.toggle('active');
    });

    // Close popover when clicking anywhere else on page
    document.addEventListener('click', (e) => {
      if (!waPopover.contains(e.target) && !waTrigger.contains(e.target)) {
        waPopover.classList.remove('active');
      }
    });
  }

  // 3. Course Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const courseCards = document.querySelectorAll('.course-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
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

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });

  // 5. Interactive Level Diagnostic Quiz
  const quizSteps = document.querySelectorAll('.quiz-step');
  const nextBtns = document.querySelectorAll('.quiz-next-btn');
  const quizResultScore = document.getElementById('quizScore');
  const quizResultTitle = document.getElementById('quizTitle');
  const quizResultDesc = document.getElementById('quizDesc');
  const quizWaSalta = document.getElementById('quizWaSalta');
  const quizWaRodhe = document.getElementById('quizWaRodhe');
  const quizResetBtn = document.getElementById('quizResetBtn');

  let currentStep = 1;
  const userAnswers = {};

  // Correct answers: Q1: b, Q2: c, Q3: b
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

      // Advance step
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
      } else {
        // Calculate result step
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

    // Update WhatsApp links with prefilled test result
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
      // Reset radio buttons
      const radios = document.querySelectorAll('.quiz-option-label input[type="radio"]');
      radios.forEach(r => r.checked = false);

      quizSteps.forEach(step => step.classList.remove('active'));
      const firstStep = document.getElementById('step-1');
      if (firstStep) firstStep.classList.add('active');
    });
  }

  // 6. Contact Form handling with Branch routing
  const contactForm = document.getElementById('contactForm');
  const formSuccessBanner = document.getElementById('formSuccessBanner');

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

      // Branch selection routing
      let targetPhone = '5492994042105'; // Default Salta
      let branchName = 'Sede Salta (Salta 285)';

      if (branch === 'rodhe') {
        targetPhone = '5492995067544';
        branchName = 'Sede Rodhe (Rodhe 150)';
      }

      const waText = encodeURIComponent(
        `¡Hola Connections English School!\nMi nombre es: ${name}\nTeléfono: ${phone}\nSede de preferencia: ${branchName}\nCurso de interés: ${course}\nConsulta: ${message || 'Quisiera recibir información sobre vacantes y aranceles.'}`
      );

      // Open WhatsApp chat directly in a new tab
      window.open(`https://wa.me/${targetPhone}?text=${waText}`, '_blank');

      if (formSuccessBanner) {
        formSuccessBanner.style.display = 'block';
        contactForm.reset();
      }
    });
  }
});
