import { useState, useEffect } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['inicio', 'nosotros', 'cursos', 'sucursales', 'contacto'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('inicio')}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${scrolled ? 'bg-blue-600' : 'bg-white'} transition-colors`}>
                  <svg className={`w-6 h-6 ${scrolled ? 'text-white' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div>
                  <h1 className={`text-lg font-bold leading-tight ${scrolled ? 'text-gray-900' : 'text-white'} transition-colors`}>
                    Connections
                  </h1>
                  <p className={`text-xs font-medium ${scrolled ? 'text-blue-600' : 'text-blue-200'} transition-colors`}>
                    English School
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'cursos', label: 'Cursos' },
                { id: 'sucursales', label: 'Sucursales' },
                { id: 'contacto', label: 'Contacto' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                    activeSection === item.id
                      ? scrolled ? 'text-blue-600' : 'text-white'
                      : scrolled ? 'text-gray-600' : 'text-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contacto')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg"
              >
                Inscribite
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t">
            <div className="px-4 py-4 space-y-3">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'cursos', label: 'Cursos' },
                { id: 'sucursales', label: 'Sucursales' },
                { id: 'contacto', label: 'Contacto' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
          </div>
          {/* Pattern overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">Inscripciones abiertas 2026</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Conectá con el
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                mundo a través
              </span>
              del inglés
            </h1>
            
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              Más de 15 años formando estudiantes en Neuquén. Metodología comunicativa, 
              grupos reducidos y docentes certificados para alcanzar tus objetivos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('cursos')}
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:scale-105"
              >
                Ver nuestros cursos
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all backdrop-blur-sm"
              >
                Contactanos
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { number: '15+', label: 'Años de experiencia' },
              { number: '2', label: 'Sucursales' },
              { number: '500+', label: 'Alumnos por año' },
              { number: '100%', label: 'Docentes certificados' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Sobre nosotros</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6 leading-tight">
                Tu camino hacia el dominio del inglés
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                En <strong>Connections English School</strong> creemos que aprender inglés es mucho más que 
                memorizar vocabulario. Es abrir puertas, crear conexiones y acceder a oportunidades 
                que transforman vidas.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Con dos sucursales estratégicamente ubicadas en la ciudad de Neuquén, ofrecemos un 
                ambiente cálido y profesional donde cada alumno avanza a su ritmo, con el acompañamiento 
                de docentes altamente capacitados.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🎯', title: 'Metodología comunicativa', desc: 'Aprendé haciendo, hablando y viviendo el idioma' },
                  { icon: '👥', title: 'Grupos reducidos', desc: 'Atención personalizada para cada alumno' },
                  { icon: '📚', title: 'Material actualizado', desc: 'Contenido moderno y relevante' },
                  { icon: '🏆', title: 'Certificación', desc: 'Preparación para exámenes internacionales' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h3>
                  <ul className="space-y-4">
                    {[
                      'Docentes con formación en lingüística y didáctica',
                      'Sistema de evaluación continuo y personalizado',
                      'Actividades extracurriculares en inglés',
                      'Horarios flexibles mañana, tarde y noche',
                      'Tecnología aplicada al aprendizaje',
                      'Ubicaciones céntricas y accesibles',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blue-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Nuestros cursos</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Programas para todos los niveles
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Desde principiantes hasta avanzado. Encontrá el curso que se adapte a tus objetivos y ritmo de aprendizaje.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                level: 'Principiante',
                levels: 'A1 - A2',
                color: 'from-green-400 to-emerald-500',
                description: 'Empezá desde cero o reforzá tus bases. Aprendé las estructuras fundamentales del inglés.',
                features: ['Vocabulario esencial', 'Gramática básica', 'Pronunciación', 'Comprensión auditiva'],
              },
              {
                level: 'Intermedio',
                levels: 'B1 - B2',
                color: 'from-blue-500 to-indigo-600',
                description: 'Desarrollá fluidez y confianza. Expandí tu vocabulario y dominá estructuras complejas.',
                features: ['Conversación fluida', 'Escritura académica', 'Expresiones idiomáticas', 'Preparación FCE'],
              },
              {
                level: 'Avanzado',
                levels: 'C1 - C2',
                color: 'from-purple-500 to-violet-600',
                description: 'Perfeccioná tu inglés al máximo nivel. Dominio completo del idioma.',
                features: ['Inglés profesional', 'Preparación CAE/CPE', 'Debates y presentaciones', 'Inglés de negocios'],
              },
              {
                level: 'Niños',
                levels: '4 a 11 años',
                color: 'from-orange-400 to-red-500',
                description: 'Aprendizaje divertido y dinámico para los más pequeños a través de juegos y actividades.',
                features: ['Juegos interactivos', 'Canciones y stories', 'Actividades creativas', 'Grupos por edad'],
              },
              {
                level: 'Teenagers',
                levels: '12 a 17 años',
                color: 'from-cyan-400 to-blue-500',
                description: 'Programa especial para adolescentes con contenido relevante y dinámico para su edad.',
                features: ['Contenido actual', 'Preparación KET/PET', 'Proyectos grupales', 'Tecnología educativa'],
              },
              {
                level: 'Business English',
                levels: 'Profesional',
                color: 'from-gray-700 to-gray-900',
                description: 'Inglés especializado para el mundo laboral. Comunicate con seguridad en cualquier contexto profesional.',
                features: ['Presentaciones', 'Emails y reportes', 'Negociaciones', 'Vocabulario sectorial'],
              },
            ].map((course, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{course.level}</h3>
                      <p className="text-white/80 text-sm mt-1">{course.levels}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <ul className="space-y-2">
                    {course.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollToSection('contacto')}
                    className="mt-6 w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 py-3 rounded-xl font-medium transition-all text-sm"
                  >
                    Más información
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Horarios</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Horarios flexibles para vos
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ofrecemos clases en diversos horarios para que puedas organizarte según tu disponibilidad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                time: 'Mañana',
                hours: '8:00 - 12:00',
                icon: '🌅',
                description: 'Ideal para quienes prefieren empezar el día productivamente.',
              },
              {
                time: 'Tarde',
                hours: '14:00 - 18:00',
                icon: '☀️',
                description: 'Perfecto para estudiantes y profesionales con horarios matutinos.',
              },
              {
                time: 'Noche',
                hours: '18:00 - 21:30',
                icon: '🌙',
                description: 'La mejor opción para quienes trabajan o estudian durante el día.',
              },
            ].map((schedule, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{schedule.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{schedule.time}</h3>
                <p className="text-blue-600 font-semibold mb-3">{schedule.hours}</p>
                <p className="text-gray-500 text-sm">{schedule.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="sucursales" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Sucursales</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
              Dos sucursales en Neuquén
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Encontrá la sede más cerca de vos. Ambas sucursales cuentan con las mismas instalaciones y calidad de enseñanza.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Sucursal 1 */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Sucursal Centro</h3>
                      <p className="text-blue-200 text-sm">Zona céntrica</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="text-gray-900 font-medium">Salta 285, Neuquén</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <a href="tel:2994042105" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">
                        299 404-2105
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horarios</p>
                      <p className="text-gray-900 font-medium">Lunes a Viernes: 8:00 - 21:30</p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/Salta+285+Neuquén"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 rounded-xl font-medium transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ver en Google Maps
                </a>
              </div>
            </div>

            {/* Sucursal 2 */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Sucursal Oeste</h3>
                      <p className="text-purple-200 text-sm">Zona residencial</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dirección</p>
                      <p className="text-gray-900 font-medium">Rodhe 150, Neuquén</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <a href="tel:2995067544" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                        299 506-7544
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horarios</p>
                      <p className="text-gray-900 font-medium">Lunes a Viernes: 8:00 - 21:30</p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/Rodhe+150+Neuquén"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 rounded-xl font-medium transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Contacto</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Completá el formulario y nos pondremos en contacto con vos para brindarte toda la información que necesitás.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="299..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sucursal de interés</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-600">
                    <option value="">Seleccioná una sucursal</option>
                    <option value="salta">Salta 285 - Centro</option>
                    <option value="rodhe">Rodhe 150 - Oeste</option>
                    <option value="ambas">Cualquiera de las dos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder="Contanos qué te gustaría saber..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg"
                >
                  Enviar consulta
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white h-full">
                <h3 className="text-xl font-bold mb-6">Información de contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Teléfonos</p>
                      <p className="font-medium">299 404-2105</p>
                      <p className="font-medium">299 506-7544</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Direcciones</p>
                      <p className="font-medium">Salta 285</p>
                      <p className="font-medium">Rodhe 150</p>
                      <p className="text-blue-200 text-sm mt-1">Neuquén, Argentina</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Horarios de atención</p>
                      <p className="font-medium">Lunes a Viernes</p>
                      <p className="text-blue-200">8:00 - 21:30 hs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Redes sociales</p>
                      <p className="font-medium">@connections.english</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full translate-y-1/2"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ¡Empezá a hablar inglés hoy!
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Las inscripciones están abiertas. No esperes más para dar el primer paso hacia tus sueños. 
            Te esperamos en cualquiera de nuestras dos sucursales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:2994042105"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Llamanos ahora
            </a>
            <a
              href="https://wa.me/542994042105"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Connections</h3>
                  <p className="text-blue-400 text-xs font-medium">English School</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Formando estudiantes de inglés en Neuquén desde hace más de 15 años. 
                Tu mejor opción para aprender inglés de manera efectiva y divertida.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Enlaces rápidos</h4>
              <ul className="space-y-3">
                {['Inicio', 'Nosotros', 'Cursos', 'Sucursales', 'Contacto'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📍</span> Salta 285 - Tel: 299 404-2105
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> Rodhe 150 - Tel: 299 506-7544
                </li>
                <li className="flex items-center gap-2">
                  <span>🕐</span> Lun a Vie: 8:00 - 21:30
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Connections English School. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://wa.me/542994042105" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
