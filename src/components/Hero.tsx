import { useState } from 'react'
import type { Translation } from '../types/i18n'

interface HeroProps {
  t: Translation
}

export function Hero({ t }: HeroProps) {
  const [profileImgError, setProfileImgError] = useState(false)
  const [aiImgError, setAiImgError] = useState(false)

  return (
    // Section is always dark — the hero is a standalone dark-mode statement
    // regardless of the site's light/dark toggle. Background: near-black with
    // a faint green tint so the mint accents feel grounded.
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      style={{ background: '#090e0c' }}
    >

      {/* ── Ambient radial glow (top-left) ───────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
      />

      {/* ── Ambient radial glow (bottom-right) ───────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }}
      />

      {/* ── 3D perspective grid ───────────────────────────────────────────── */}
      {/* The grid is rotated on the X-axis to give a "floor" perspective.
          A mask fades it at the edges so it blends into the dark background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: '-40%',
            right: '-40%',
            height: '60%',
            backgroundImage: `
              linear-gradient(rgba(52, 211, 153, 0.13) 1px, transparent 1px),
              linear-gradient(90deg, rgba(52, 211, 153, 0.13) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
            transform: 'perspective(480px) rotateX(68deg)',
            transformOrigin: 'center top',
            // Fade edges so the grid dissolves naturally into the background
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 25%, black 65%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 25%, black 65%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative max-w-5xl w-full mx-auto py-24 md:py-32">

        {/* Glassmorphism card — semi-transparent dark panel with blurred backdrop
            and a glowing mint border that ties it to the grid aesthetic.      */}
        <div
          className="relative rounded-3xl p-8 md:p-12"
          style={{
            background: 'rgba(9, 22, 16, 0.70)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(52, 211, 153, 0.22)',
            boxShadow:
              '0 0 0 1px rgba(52,211,153,0.06), 0 0 60px rgba(52,211,153,0.08), 0 30px 80px rgba(0,0,0,0.6)',
          }}
        >

          {/* Two-column layout: text left, avatar right */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">

            {/* ── Left: text block ─────────────────────────────────────── */}
            <div>

              {/* "Available" pulse indicator */}
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: '#6ee7b7' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: '#34d399' }}
                  />
                </span>
                <p
                  className="text-sm font-medium tracking-wide uppercase"
                  style={{ color: '#6ee7b7' }}
                >
                  {t.hero.greeting}
                </p>
              </div>

              {/* Name — gradient from white through mint */}
              <h1
                className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-4 pb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #ffffff 0%, #a7f3d0 45%, #d1fae5 100%)',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 6s ease infinite',
                }}
              >
                Daniel Geigert
              </h1>

              <h2
                className="text-xl md:text-2xl font-medium mb-6"
                style={{ color: '#94a3b8' }}
              >
                {t.hero.role}
              </h2>

              <p
                className="text-base md:text-lg max-w-xl leading-relaxed mb-10"
                style={{ color: '#7a8fa0' }}
              >
                {t.hero.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Primary CTA — solid mint gradient with soft glow */}
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105 hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: '#ffffff',
                    boxShadow: '0 0 22px rgba(52,211,153,0.3)',
                  }}
                >
                  {t.hero.cta_projects}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Secondary CTA — ghost button with mint border */}
                <a
                  href="#contact"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    border: '1px solid rgba(52, 211, 153, 0.35)',
                    color: '#6ee7b7',
                    background: 'rgba(52, 211, 153, 0.05)',
                  }}
                >
                  {t.hero.cta_contact}
                </a>
              </div>
            </div>

            {/* ── Right: flippable round avatar ──────────────────────── */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-72 h-72 md:w-80 md:h-80">

                {/* Soft mint glow behind the avatar */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full blur-2xl opacity-25"
                  style={{ background: 'radial-gradient(circle, #34d399, transparent 70%)' }}
                />

                {/* Offset shadow disc */}
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-full opacity-15"
                  style={{ background: '#34d399' }}
                />

                {/* 3D flip container — hover triggers the Y rotation */}
                <div
                  className="relative w-full h-full group"
                  style={{ perspective: '800px' }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front face: real photo */}
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        border: '2px solid rgba(52, 211, 153, 0.45)',
                        boxShadow: '0 0 32px rgba(52,211,153,0.22)',
                      }}
                    >
                      {profileImgError ? (
                        <div
                          className="w-full h-full rounded-full flex items-center justify-center"
                          style={{ background: '#064e3b' }}
                        >
                          <span className="text-7xl font-bold text-white tracking-tight select-none">
                            DG
                          </span>
                        </div>
                      ) : (
                        <img
                          src="/profile_pic.jpeg"
                          alt="Daniel Geigert"
                          className="w-full h-full object-cover"
                          onError={() => setProfileImgError(true)}
                        />
                      )}
                    </div>

                    {/* Back face: AI photo */}
                    <div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        border: '2px solid rgba(52, 211, 153, 0.45)',
                        boxShadow: '0 0 32px rgba(52,211,153,0.22)',
                      }}
                    >
                      {aiImgError ? (
                        <div
                          className="w-full h-full rounded-full flex flex-col items-center justify-center gap-2"
                          style={{ background: '#022c22' }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: '#6ee7b7' }}
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span style={{ color: '#6ee7b7' }} className="text-xs">
                            AI photo coming soon
                          </span>
                        </div>
                      ) : (
                        <img
                          src="/profile-ai.png"
                          alt="Daniel Geigert — AI version"
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center -15px' }}
                          onError={() => setAiImgError(true)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex items-center gap-3" style={{ color: '#374151' }}>
            <div className="w-8 h-px" style={{ background: '#1f2937' }} />
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg
              className="animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  )
}
