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
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${hidden ? 'is-hidden' : ''}`} id="topo">
      <a className="brand" href="#topo" aria-label="Dra. Aline Campos Reis, voltar ao topo">
        <span>Dra. Aline Campos<small>PEDIATRA</small></span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="#servicos">Serviços</a>
        <a href="#sobre">Sobre</a>
        <a href="#local">Local</a>
      </nav>
      <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
        Agendar <span className="desktop-only">pelo WhatsApp</span> <ArrowDiagonal />
      </a>
    </header>
  );
}

function HeroIllustration() {
  return (
    <figure className="hero-illustration" aria-label="Ilustração representativa">
      <svg viewBox="0 0 400 320" role="img" aria-label="Adulto e criança sentados juntos lendo um livro">
        <rect width="400" height="320" fill="#EAF1F2" rx="16" />
        <circle cx="320" cy="60" r="28" fill="#F0C5AA" opacity="0.4" />
        <circle cx="60" cy="260" r="42" fill="#245B73" opacity="0.08" />
        <path d="M80 250 Q120 220 160 245 T260 240" fill="none" stroke="#245B73" strokeWidth="2" opacity="0.2" />
        {/* Adult */}
        <circle cx="165" cy="125" r="22" fill="#F0C5AA" />
        <path d="M143 160 Q140 210 145 245 L185 245 Q190 210 187 160 Z" fill="#245B73" />
        <path d="M145 245 L140 285" stroke="#245B73" strokeWidth="10" strokeLinecap="round" />
        <path d="M185 245 L190 285" stroke="#245B73" strokeWidth="10" strokeLinecap="round" />
        <path d="M143 170 Q125 185 130 210" stroke="#F0C5AA" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M187 170 Q205 185 200 210" stroke="#F0C5AA" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* Child */}
        <circle cx="245" cy="155" r="17" fill="#F0C5AA" />
        <path d="M228 180 Q226 215 229 240 L261 240 Q264 215 262 180 Z" fill="#245B73" opacity="0.85" />
        <path d="M229 240 L226 270" stroke="#245B73" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
        <path d="M261 240 L264 270" stroke="#245B73" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
        {/* Book */}
        <rect x="180" y="190" width="60" height="40" rx="3" fill="#FAFBF8" stroke="#243740" strokeWidth="2" />
        <path d="M210 190 L210 230" stroke="#243740" strokeWidth="1.5" />
        <line x1="190" y1="200" x2="205" y2="200" stroke="#243740" strokeWidth="2" opacity="0.4" />
        <line x1="190" y1="208" x2="205" y2="208" stroke="#243740" strokeWidth="2" opacity="0.4" />
        <line x1="215" y1="200" x2="230" y2="200" stroke="#243740" strokeWidth="2" opacity="0.4" />
        <line x1="215" y1="208" x2="230" y2="208" stroke="#243740" strokeWidth="2" opacity="0.4" />
      </svg>
      <figcaption>Ilustração representativa</figcaption>
    </figure>
  );
}

function Hero() {
  return (
    <section className="hero" aria-label="Apresentação">
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
      <HeroIllustration />
    </section>
  );
}

function Services() {
  const reduceMotion = useReducedMotion();
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' as const } },
  };
  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.25 + 0.3, duration: 0.35 },
    }),
  };
  return (
    <section className="services section-shell" id="servicos" aria-label="Serviços">
      <div className="section-header">
        <span className="section-eyebrow">O que fazemos</span>
        <h2>Da gestação à infância.</h2>
        <p>Acompanhamento contínuo para famílias do Rio de Janeiro, com foco em escuta ativa e acolhimento.</p>
      </div>
      <div className="services-track">
        <svg className="track-line" viewBox="0 0 4 300" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M2 0 L2 300"
            stroke="#245B73"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 6"
            initial={reduceMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={lineVariants}
          />
        </svg>
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
                custom={index}
                initial={reduceMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={markerVariants}
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

function About() {
  return (
    <section className="about section-shell" id="sobre" aria-label="Sobre a médica">
      <div className="about-inner">
        <div className="about-copy">
          <span className="section-eyebrow">Sobre</span>
          <h2>Dra. Aline Campos Reis</h2>
          <p>
            Pediatra com residência em Pediatria pelo Hospital Geral Roberto Santos (HGRS) em Salvador, mestra em Medicina pela UFRJ e docente de Medicina na UNESA.
          </p>
          <p>
            Mais de 12 anos de atuação clínica, incluindo experiência em emergências pediátricas e atendimentos na Amazônia. Atende em português, espanhol e inglês.
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
        <About />
        <Location />
      </main>
      <Footer />
    </>
  );
}
