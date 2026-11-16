import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const whatsappUrl = 'https://wa.me/5521998710606';
const phone = '(21) 99871-0606';
const address = 'Rua do Catete, 311, sala 1116 — Edifício São Luiz';
const neighborhood = 'Catete, Rio de Janeiro/RJ';
const crm = 'CRM 52.1036866 · RQE 23196';

const services = [
  {
    title: 'Pré-natal pediátrico',
    description: 'A partir das 28 semanas de gestação. Orientações sobre amamentação, vacinação, triagem neonatal e os primeiros cuidados com o bebê.',
  },
  {
    title: 'Puericultura',
    description: 'Acompanhamento regular do crescimento e do desenvolvimento neuropsicomotor, social e emocional da criança.',
  },
  {
    title: 'Pediatria geral',
    description: 'Consultas pediátricas para avaliação, prevenção, orientação e tratamento de doenças infantis.',
  },
];

function ArrowDiagonal() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const button = menuButtonRef.current;
    if (!menu) return;
    const focusables = Array.from(menu.querySelectorAll<HTMLElement>('a, button'));
    focusables[0]?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab' || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      button?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`site-header ${hidden ? 'is-hidden' : ''}`} id="topo">
      <a className="brand" href="#inicio" aria-label="Dra. Aline Campos Reis, voltar ao topo">
        <span>Dra. Aline Campos<small>PEDIATRA</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        <a href="#servicos">Serviços</a>
        <a href="#consultorio">Consultório</a>
        <a href="#sobre">Sobre</a>
        <a href="#local">Local</a>
      </nav>
      <div className="header-actions">
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          Agendar <span className="desktop-only">pelo WhatsApp</span> <ArrowDiagonal />
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className="menu-burger" aria-hidden="true" />
        </button>
      </div>
      {menuOpen && (
        <div ref={menuRef} id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#consultorio" onClick={closeMenu}>Consultório</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#local" onClick={closeMenu}>Local</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Agendar pelo WhatsApp</a>
        </div>
      )}
    </header>
  );
}

function HeroPhoto() {
  return (
    <figure className="hero-photo">
      <img
        src={`/images/aline-portrait.jpg`}
        alt="Dra. Aline Campos Reis, pediatra, sorrindo em retrato profissional"
        width="520"
        height="640"
        loading="eager"
        decoding="async"
      />
    </figure>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-label="Apresentação">
      <div className="hero-copy">
        <p className="hero-eyebrow">Pediatria no Catete, Rio de Janeiro</p>
        <h1>Cuidado pediátrico desde o pré-natal.</h1>
        <p className="hero-lead">
          Pré-natal pediátrico, puericultura e pediatria geral para acompanhar o crescimento e o desenvolvimento infantil.
        </p>
        <div className="hero-credential">{crm}</div>
        <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
          Agendar pelo WhatsApp <ArrowDiagonal />
        </a>
      </div>
      <HeroPhoto />
    </section>
  );
}

function Services() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="services section-shell" id="servicos" aria-label="Serviços">
      <div className="section-header">
        <span className="section-eyebrow">O que fazemos</span>
        <h2>Da gestação à infância.</h2>
        <p>Acompanhamento contínuo para famílias do Rio de Janeiro, com foco em escuta ativa e acolhimento.</p>
      </div>
      <div className="services-track">
        <motion.svg
          className="track-line"
          viewBox="0 0 4 300"
          preserveAspectRatio="none"
          aria-hidden="true"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <line x1="2" y1="0" x2="2" y2="300" stroke="#245B73" strokeWidth="2" strokeDasharray="6 6" />
        </motion.svg>
        <div className="services-list">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              className="service-card"
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.12, duration: 0.35 }}
            >
              <motion.span
                className="service-marker"
                initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.25 + 0.3, duration: 0.35 }}
              >
                0{index + 1}
              </motion.span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const officePhotos = [
  { src: `/images/consultorio-recepcao.jpg`, alt: 'Recepção do consultório com cadeira suspensa e decoração acolhedora' },
  { src: `/images/consultorio-mesa.jpg`, alt: 'Mesa de atendimento pediátrico com balança infantil' },
  { src: `/images/consultorio-brinquedoteca.jpg`, alt: 'Espaço infantil com tapete colorido e brinquedos' },
  { src: `/images/consultorio-quadros.jpg`, alt: 'Quadros decorativos com frases sobre afeto e brincar' },
  { src: `/images/consultorio-brinquedos.jpg`, alt: 'Prateleira com brinquedos e ursinho de pelúcia' },
  { src: `/images/consultorio-estrelas.jpg`, alt: 'Parede decorada com estrelas douradas' },
];

function Office() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="office section-shell" id="consultorio" aria-label="O consultório">
      <div className="section-header">
        <span className="section-eyebrow">Espaço</span>
        <h2>O consultório.</h2>
        <p>Ambiente pensado para acolher crianças e famílias, com área de espera, consultório e espaço de brincar.</p>
      </div>
      <div className="office-grid">
        {officePhotos.map((photo, index) => (
          <motion.figure
            key={photo.src}
            className={`office-card office-card-${index}`}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

const patientPhotos = [
  `/images/pediatria-1.jpg`,
  `/images/pediatria-2.jpg`,
  `/images/pediatria-3.jpg`,
];

function Testimonial() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="testimonial section-shell" aria-label="Depoimento">
      <motion.div
        className="testimonial-inner"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        <div className="testimonial-stars" aria-label="5 estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
            </svg>
          ))}
        </div>
        <blockquote>
          “Excelente pediatra. Desde o primeiro contato muito atenciosa, explica tudo com calma e sempre disponível para tirar dúvidas. Recomendo demais.”
        </blockquote>
        <cite>Gabriel Viriato</cite>
        <div className="testimonial-photos" aria-label="Fotos de pacientes">
          {patientPhotos.map((src, i) => (
            <img key={src} src={src} alt={`Foto de paciente ${i + 1}`} loading="lazy" decoding="async" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-shell" id="sobre" aria-label="Sobre a médica">
      <div className="about-inner">
        <div className="about-copy">
          <span className="section-eyebrow">Sobre</span>
          <h2>Dra. Aline Campos Reis</h2>
          <p>
            Pediatra formada pela Universidade do Estado do Amazonas, com residência médica em Pediatria pelo Hospital Geral Roberto Santos (HGRS) em Salvador. Possui mestrado em Medicina pela Universidade Federal do Rio de Janeiro (UFRJ) e atua como docente de Medicina na UNESA.
          </p>
          <p>
            Ao longo de mais de 12 anos de prática clínica, acumulou experiência em emergências pediátricas, atendimentos na Amazônia e acompanhamento ambulatorial de crianças e adolescentes. Atende em português, espanhol e inglês, recebendo famílias do Rio de Janeiro e de fora do país.
          </p>
          <p>
            Seu trabalho é pautado pela escuta ativa, pela medicina baseada em evidências e por um olhar acolhedor para cada família.
          </p>
          <div className="credential-block">{crm}</div>
        </div>
        <div className="about-facts">
          <div className="fact">
            <strong>Residência</strong>
            <span>HGRS — Salvador</span>
          </div>
          <div className="fact">
            <strong>Mestrado</strong>
            <span>UFRJ</span>
          </div>
          <div className="fact">
            <strong>Docência</strong>
            <span>UNESA</span>
          </div>
          <div className="fact">
            <strong>Idiomas</strong>
            <span>PT · ES · EN</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="location section-shell" id="local" aria-label="Local e contato">
      <div className="location-inner">
        <div className="location-copy">
          <span className="section-eyebrow">Atendimento</span>
          <h2>Consultório no Catete.</h2>
          <address>
            {address}<br />
            {neighborhood}
          </address>
          <p className="location-hours">Segunda a sábado, das 9h às 20h.</p>
          <p className="location-note">Agendamento exclusivamente pelo WhatsApp.</p>
          <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Agendar pelo WhatsApp <ArrowDiagonal />
          </a>
        </div>
        <div className="location-card">
          <div className="location-detail">
            <span>Telefone</span>
            <a href={`tel:+55${phone.replace(/\D/g, '')}`}>{phone}</a>
          </div>
          <div className="location-detail">
            <span>WhatsApp</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">{phone}</a>
          </div>
          <div className="location-detail">
            <span>Instagram</span>
            <a href="https://www.instagram.com/alinecampos.pediatra" target="_blank" rel="noreferrer">@alinecampos.pediatra</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Dra. Aline Campos Reis</strong>
        <span>Pediatra · {crm}</span>
      </div>
      <p>
        {address}, {neighborhood}<br />
        Atendimento de segunda a sábado, das 9h às 20h.
      </p>
      <a href={whatsappUrl} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowDiagonal /></a>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#servicos">Pular para os serviços</a>
      <Header />
      <main>
        <Hero />
        <Services />
        <Office />
        <Testimonial />
        <About />
        <Location />
      </main>
      <Footer />
    </>
  );
}
