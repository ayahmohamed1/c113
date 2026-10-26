'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import type { GiftData } from '@/lib/giftData'

interface Props {
  data: GiftData
}

// قلوب خلفية ناعمة تطير بشكل مستمر وسلس بدون استهلاك للمعالج
const BACKGROUND_HEARTS = [
  { id: 1, left: '6%', size: 26, duration: '6.5s', delay: '0s', sway: '20px', rot: '12deg', emoji: '🩷', opacity: 0.75 },
  { id: 2, left: '14%', size: 30, duration: '8s', delay: '2.5s', sway: '-25px', rot: '-15deg', emoji: '💖', opacity: 0.8 },
  { id: 3, left: '22%', size: 20, duration: '7s', delay: '1s', sway: '15px', rot: '10deg', emoji: '✨', opacity: 0.7 },
  { id: 4, left: '30%', size: 28, duration: '9s', delay: '3.5s', sway: '-30px', rot: '-20deg', emoji: '💕', opacity: 0.85 },
  { id: 5, left: '38%', size: 24, duration: '6.2s', delay: '0.5s', sway: '25px', rot: '18deg', emoji: '🩷', opacity: 0.7 },
  { id: 6, left: '48%', size: 32, duration: '7.8s', delay: '4s', sway: '-15px', rot: '-10deg', emoji: '🎈', opacity: 0.75 },
  { id: 7, left: '56%', size: 26, duration: '8.5s', delay: '1.8s', sway: '20px', rot: '14deg', emoji: '💖', opacity: 0.8 },
  { id: 8, left: '64%', size: 22, duration: '6.8s', delay: '3s', sway: '-20px', rot: '-12deg', emoji: '✨', opacity: 0.7 },
  { id: 9, left: '72%', size: 28, duration: '7.5s', delay: '0.8s', sway: '30px', rot: '20deg', emoji: '🩷', opacity: 0.85 },
  { id: 10, left: '80%', size: 24, duration: '8.2s', delay: '2.2s', sway: '-25px', rot: '-16deg', emoji: '💕', opacity: 0.75 },
  { id: 11, left: '88%', size: 30, duration: '7.2s', delay: '4.5s', sway: '15px', rot: '12deg', emoji: '💖', opacity: 0.8 },
  { id: 12, left: '94%', size: 22, duration: '6.5s', delay: '1.5s', sway: '-18px', rot: '-14deg', emoji: '🩷', opacity: 0.7 },
  { id: 13, left: '18%', size: 26, duration: '8.7s', delay: '5s', sway: '22px', rot: '15deg', emoji: '💗', opacity: 0.75 },
  { id: 14, left: '84%', size: 28, duration: '7.6s', delay: '3.8s', sway: '-22px', rot: '-18deg', emoji: '✨', opacity: 0.7 },
  { id: 15, left: '50%', size: 34, duration: '9.2s', delay: '2s', sway: '18px', rot: '10deg', emoji: '💖', opacity: 0.8 },
]

export default function GiftClient({ data }: Props) {
  // حالة شمعة الكيك
  const [isCakeBlown, setIsCakeBlown] = useState(false)

  // حالة سؤال Forever
  const [hasSaidYes, setHasSaidYes] = useState(false)
  const [noCount, setNoCount] = useState(0)

  // معرض الذكريات
  const [isAlbumOpen, setIsAlbumOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const momentsImages = ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic3.jpg', '/images/pic4.jpg']

  // احتفال الكونفيتي
  const confettiRef = useRef<HTMLCanvasElement | null>(null)
  const confettiAnimRef = useRef<number | null>(null)

  // تفاعلات قلوب النقر واللمس
  const [clickHearts, setClickHearts] = useState<{ id: number; x: number; y: number; emoji: string; burstX: number; burstY: number; rot: number; size: number }[]>([])

  // التمرير السلس بين الأقسام
  const scrollTo = (id: string) => {
    const targetId = id === 'song' ? 'video' : id
    const el = document.getElementById(targetId) || document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // دالة إطلاق الكونفيتي
  const launchConfetti = useCallback(() => {
    const canvas = confettiRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces: any[] = []
    const colors = ['#f472b6', '#fbcfe8', '#db2777', '#fda4af', '#fff', '#e2e8f0']
    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 5,
        vy: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      })
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of pieces) {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.vy += 0.05
        if (p.y < canvas.height + 20) alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore()
      }
      if (alive) confettiAnimRef.current = requestAnimationFrame(animate)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    if (confettiAnimRef.current) cancelAnimationFrame(confettiAnimRef.current)
    confettiAnimRef.current = requestAnimationFrame(animate)
  }, [])

  // تفجير قلوب عند لمس الشاشة
  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    let clientX = 0
    let clientY = 0
    if ('touches' in e) {
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else return
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const emojis = ['💖', '🩷', '💕', '💗', '✨']
    const newHearts: typeof clickHearts = []
    const count = 5 + Math.floor(Math.random() * 3)

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
      const distance = 35 + Math.random() * 45
      newHearts.push({
        id: Date.now() + Math.random() + i,
        x: clientX,
        y: clientY,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        burstX: Math.cos(angle) * distance,
        burstY: -Math.abs(Math.sin(angle) * distance) - (25 + Math.random() * 45),
        rot: (Math.random() - 0.5) * 40,
        size: 18 + Math.random() * 12
      })
    }

    setClickHearts(prev => [...prev.slice(-20), ...newHearts])
  }, [])

  useEffect(() => {
    if (clickHearts.length === 0) return
    const timer = setTimeout(() => {
      setClickHearts([])
    }, 1300)
    return () => clearTimeout(timer)
  }, [clickHearts])

  return (
    <div className="gift-page" onClick={handlePageClick}>
      {/* إطار الشاشة الفخم */}
      <div className="corners-overlay">
        <div className="corner tl"></div><div className="corner tr"></div>
        <div className="corner bl"></div><div className="corner br"></div>
      </div>
      <div className="side-text left">BIRTHDAY • CELEBRATION</div>
      <div className="side-text right">WITH LOVE • FOR YOU</div>

      {/* كانفاس الكونفيتي في المقدمة */}
      <canvas ref={confettiRef} id="confetti-canvas" style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }} />

      {/* قلوب خلفية مستمرة بدون تهنيج */}
      <div className="letter-hearts-container" aria-hidden="true">
        {BACKGROUND_HEARTS.map((h) => (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: h.left,
              fontSize: `${h.size}px`,
              ['--duration' as any]: h.duration,
              ['--delay' as any]: h.delay,
              ['--sway-x' as any]: h.sway,
              ['--rot' as any]: h.rot,
              ['--max-opacity' as any]: h.opacity,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* قلوب النقر التفاعلية */}
      {clickHearts.map((ch) => (
        <span
          key={ch.id}
          className="click-heart-burst"
          style={{
            left: `${ch.x}px`,
            top: `${ch.y}px`,
            fontSize: `${ch.size}px`,
            ['--burst-x' as any]: `${ch.burstX}px`,
            ['--burst-y' as any]: `${ch.burstY}px`,
            ['--burst-rot' as any]: `${ch.rot}deg`,
          }}
        >
          {ch.emoji}
        </span>
      ))}

      {/* شريط تنقل سريع عائم أسفل الشاشة */}
      <nav className="floating-navbar" aria-label="Quick jump">
        <button onClick={() => scrollTo('intro')} title="Home">✨</button>
        <button onClick={() => scrollTo('cake')} title="The Cake">🎂</button>
        <button onClick={() => scrollTo('letter')} title="Message">💌</button>
        <button onClick={() => scrollTo('moments')} title="Moments">📸</button>
        <button onClick={() => scrollTo('video')} title="Video">🎬</button>
        <button onClick={() => scrollTo('date')} title="Question">💍</button>
      </nav>

      {/* أعلام الزينة أعلى الصفحة */}
      <BuntingSVG />

      {/* ── 1. SECTION: HERO / INTRO ── */}
      <section id="intro" className="gift-section" style={{ minHeight: '92vh', paddingTop: '80px' }}>
        <div className="content-wrapper">
          <p className="subtitle">✦ Something special is waiting ✦</p>
          <h1 className="gift-title">A Gift <br /><span>just for You</span></h1>
          <div className="crown-icon">👑</div>
          <div className="dots">• • •</div>
          <p className="description">
            "Today is a day as beautiful as you are. I've prepared a little digital surprise to celebrate your special moment."
          </p>
          <button className="btn-primary" onClick={() => scrollTo('cake')}>
            ابدأ الاحتفال 🎁
          </button>
          <div
            onClick={() => scrollTo('cake')}
            style={{
              marginTop: '35px',
              color: '#f472b6',
              cursor: 'pointer',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>اسحب للاستكشاف</span>
            <span style={{ fontSize: '1.3rem' }}>↓</span>
          </div>
        </div>
      </section>

      <div className="section-divider">✦ • 🎂 • ✦</div>

      {/* ── 2. SECTION: THE CAKE ── */}
      <section id="cake" className="gift-section">
        <div className="content-wrapper">
          <div className="svg-container">
            <div className="cake-glow"></div>
            {!isCakeBlown ? <CakeLitSVG /> : <CakeBlownSVG />}
          </div>

          {!isCakeBlown ? (
            <>
              <h2 className="gift-title">Make a wish, <span>{data.name}</span> 👑</h2>
              <p className="description">
                Take a deep breath, make a heartfelt wish, and blow out the candle!
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  setIsCakeBlown(true)
                  setTimeout(launchConfetti, 100)
                }}
              >
                اطفئ الشمعة 🎈
              </button>
            </>
          ) : (
            <>
              <h2 className="gift-title" style={{ marginBottom: '1rem' }}>Happy Birthday, habiby! 🎂</h2>
              <p className="description">
                May all your wishes and dreams come true this year! ✨
              </p>
              <button className="btn-secondary" onClick={() => setIsCakeBlown(false)}>
                أشعلها مجدداً ✨
              </button>
            </>
          )}
        </div>
      </section>

      <div className="section-divider">✦ • 💌 • ✦</div>

      {/* ── 3. SECTION: THE LETTER ── */}
      <section id="letter" className="gift-section">
        <div className="content-wrapper">
          <div className="letter-card">
            <div className="top-accent-sq"></div>

            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 14px auto',
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2.5px solid #f472b6',
              boxShadow: '0 0 20px rgba(244, 114, 182, 0.5)',
              background: '#1a050c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              clipPath: 'path("M60 105 C 60 105, 5 65, 5 32 C 5 15, 20 6, 36 6 C 48 6, 56 15, 60 24 C 64 15, 72 6, 84 6 C 100 6, 115 15, 115 32 C 115 65, 60 105, 60 105 Z")'
            }}>
              <Image
                src="/images/pic1.jpg"
                alt="Letter Special Photo"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>

            <h2 className="letter-title" style={{ marginTop: '0', color: '#f472b6' }}>To my favorite person,</h2>

            <div className="letter-scroll-area">
              <div className="letter-body" style={{ color: '#f472b6' }}>{data.message}</div>
              <div className="letter-divider"><span>✦</span></div>
              <div className="signature" style={{ color: '#f472b6' }}>
                <p>With all my love,</p>
                <p>{data.senderName || 'your love'} ✨</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">✦ • 📸 • ✦</div>

      {/* ── 4. SECTION: OUR MEMORIES ── */}
      <section id="moments" className="gift-section">
        <div className="content-wrapper">
          <h2 className="gift-title" style={{ fontStyle: 'italic', marginBottom: '0.2rem' }}>Our Memories</h2>
          <p className="subtitle" style={{ color: '#94a3b8', marginBottom: '1.2rem' }}>
            {isAlbumOpen ? `Photo ${currentPhotoIndex + 1} of ${momentsImages.length}` : 'Special Photo Album 📖'}
          </p>

          {!isAlbumOpen ? (
            /* Album Cover */
            <div
              onClick={() => setIsAlbumOpen(true)}
              className="polaroid-card"
              style={{
                width: '100%',
                maxWidth: '310px',
                background: '#1c0710',
                border: '2px solid #50152d',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(219, 39, 119, 0.35)',
                margin: '0 auto',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
            >
              <div style={{ width: '100%', height: '340px', position: 'relative', borderRadius: '10px', overflow: 'hidden', marginBottom: '12px' }}>
                <Image
                  src="/images/cover.jpg"
                  alt="Moments Cover"
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>

              <p style={{ color: '#f472b6', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                اضغط ليفتح الألبوم 📖
              </p>
            </div>
          ) : (
            /* محتوى الألبوم بعد الفتح */
            <div style={{ width: '100%', animation: 'fadeIn 0.5s ease' }}>
              <div className="polaroid-card" style={{ width: '100%', maxWidth: '300px', margin: '0 auto 1.2rem auto', padding: '12px', background: '#1c0710' }}>
                <div className="polaroid-pin"></div>
                <div className="polaroid-img-wrapper" style={{ width: '100%', height: '320px', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                  <Image src={momentsImages[currentPhotoIndex]} alt={`ذكرى ${currentPhotoIndex + 1}`} fill style={{ objectFit: 'cover' }} unoptimized />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', marginBottom: '1.2rem' }}>
                <button
                  onClick={() => setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : momentsImages.length - 1))}
                  style={{
                    background: '#381322',
                    border: '1px solid #f472b6',
                    color: '#fbcfe8',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  →
                </button>
                <button
                  onClick={() => setCurrentPhotoIndex((prev) => (prev < momentsImages.length - 1 ? prev + 1 : 0))}
                  style={{
                    background: '#381322',
                    border: '1px solid #f472b6',
                    color: '#fbcfe8',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  ←
                </button>
              </div>

              {/* مصغرات الصور للانتقال السريع */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1.2rem' }}>
                {momentsImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      border: currentPhotoIndex === idx ? '2px solid #f472b6' : '1px solid #50152d',
                      transform: currentPhotoIndex === idx ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s',
                      boxShadow: currentPhotoIndex === idx ? '0 0 10px rgba(244, 114, 182, 0.5)' : 'none',
                      opacity: currentPhotoIndex === idx ? 1 : 0.6
                    }}
                  >
                    <Image src={img} alt={`مصغرة ${idx + 1}`} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                ))}
              </div>

              <button
                className="btn-secondary"
                style={{ margin: '0 auto', fontSize: '0.85rem', padding: '0.5rem 1.4rem' }}
                onClick={() => setIsAlbumOpen(false)}
              >
                ← العودة لغلاف الألبوم 📖
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="section-divider">✦ • 🎬 • ✦</div>

      {/* ── 5. SECTION: OUR VIDEO ── */}
      <section id="video" className="gift-section" style={{ position: 'relative' }}>
        <span id="song" style={{ position: 'absolute', top: 0, opacity: 0, pointerEvents: 'none' }} />
        <div className="content-wrapper">
          <h2 className="gift-title" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
            a video for you
          </h2>

          <div className="video-card-container">
            <div className="video-player-card">
              <div className="polaroid-pin" style={{ top: '-10px' }}></div>
              <div className="video-frame">
                <video
                  src={data.videoUrl || "/video.mp4"}
                  controls
                  playsInline
                  preload="metadata"
                >
                  متصفحك لا يدعم تشغيل هذا الفيديو.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">✦ • 💍 • ✦</div>

      {/* ── 6. SECTION: THE QUESTION ── */}
      <section id="date" className="gift-section">
        <div className="content-wrapper">
          <p className="subtitle">✦ IMPORTANT QUESTION ✦</p>
          <h1 className="gift-title">Will you stay with me forever?</h1>

          {!hasSaidYes ? (
            <>
              <div className="svg-container" style={{ position: 'relative', width: '180px', height: '180px', margin: '15px auto' }}>
                <Image src="/images/bear-ask.jpg" alt="هل ستبقى معي؟" fill style={{ objectFit: 'cover', borderRadius: '50%' }} unoptimized />
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                <button
                  className="btn-primary"
                  style={{
                    fontSize: `${1 + noCount * 0.12}rem`,
                    padding: `${0.8 + noCount * 0.1}rem ${2 + noCount * 0.15}rem`
                  }}
                  onClick={() => {
                    setHasSaidYes(true)
                    setTimeout(launchConfetti, 100)
                  }}
                >
                  أكيد! ❤️
                </button>
                <button
                  className="secret-link"
                  style={{
                    padding: '0.8rem 1.5rem',
                    background: '#0d0407',
                    borderRadius: '8px',
                    border: '1px solid #451325',
                    margin: 0
                  }}
                  onClick={() => setNoCount(noCount + 1)}
                >
                  {['لا', 'عشاني؟ 🥺', 'بجد؟!', 'متأكد؟! 🤔', 'كنت عارفة إنك هتقول أه!'][Math.min(noCount, 4)]}
                </button>
              </div>
            </>
          ) : (
            <div style={{ marginTop: '10px' }}>
              <Sparkles />
              <div className="svg-container" style={{ position: 'relative', width: '190px', height: '190px', margin: '15px auto' }}>
                <Image src="/images/bear-hug.gif" alt="Yay!" fill style={{ objectFit: 'cover', borderRadius: '50%' }} unoptimized />
              </div>
              <h2 className="gift-title" style={{ color: '#f472b6', fontSize: '2.2rem', marginTop: '10px' }}>
                Knew you would say yes! ❤️
              </h2>
              <p className="description" style={{ color: '#fbcfe8', fontSize: '1.05rem', margin: '10px auto' }}>
                Forever & always with you babe 💍✨
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: 'center', padding: '40px 15px 110px 15px', position: 'relative', zIndex: 20 }}>
        <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>👑</div>
        <p style={{ color: '#f472b6', fontStyle: 'italic', fontSize: '1.1rem' }}>
          صُنع بكل حبي لك يا هشام ❤️
        </p>
        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', letterSpacing: '0.15em' }}>
          FOREVER & ALWAYS
        </p>
        <button
          onClick={() => scrollTo('intro')}
          className="btn-secondary"
          style={{ marginTop: '22px', padding: '0.5rem 1.8rem', fontSize: '0.85rem' }}
        >
          ↑ العودة للبداية
        </button>
      </footer>
    </div>
  )
}

// =============================================
// HELPER COMPONENTS & PURE SVGS
// =============================================

function Sparkles() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <span key={i} style={{
          position: 'absolute', width: '3px', height: '3px', background: '#fff', borderRadius: '50%',
          top: `${10 + (i * 12) % 80}%`, left: `${5 + (i * 13) % 90}%`,
          boxShadow: '0 0 10px #f472b6', opacity: 0.6
        }} />
      ))}
    </div>
  )
}

function BuntingSVG() {
  return (
    <svg width="100%" height="80" viewBox="0 0 800 80" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, zIndex: 30, opacity: 0.8, pointerEvents: 'none' }}>
      <line x1="0" y1="20" x2="800" y2="20" stroke="#50152d" strokeWidth="2" />
      {[...Array(10)].map((_, i) => (
        <polygon key={i} points={`${30 + i * 80},20 ${60 + i * 80},20 ${45 + i * 80},60`} fill={i % 2 === 0 ? "#db2777" : "#f472b6"} />
      ))}
    </svg>
  )
}

function CakeLitSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="100" cy="180" rx="75" ry="10" fill="#0d0407" />
      <path d="M40 130 H160 V175 C160 178 150 180 100 180 C50 180 40 178 40 175 V130 Z" fill="#381322" />
      <rect x="55" y="90" width="90" height="40" rx="4" fill="#831843" />
      <rect x="70" y="55" width="60" height="35" rx="4" fill="#db2777" />
      <circle cx="50" cy="130" r="5" fill="#f472b6" /><circle cx="80" cy="130" r="5" fill="#f472b6" /><circle cx="110" cy="130" r="5" fill="#f472b6" /><circle cx="140" cy="130" r="5" fill="#f472b6" />
      <rect x="96" y="25" width="8" height="30" rx="1" fill="#fbcfe8" />
      <line x1="96" y1="35" x2="104" y2="30" stroke="#f472b6" strokeWidth="2" />
      <g style={{ animation: 'pulse 1s infinite alternate', transformOrigin: '100px 22px' }}>
        <path d="M100 8 C92 18 92 26 100 30 C108 26 108 18 100 8 Z" fill="#facc15" />
      </g>
    </svg>
  )
}

function CakeBlownSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="100" cy="180" rx="75" ry="10" fill="#0d0407" />
      <path d="M40 130 H160 V175 C160 178 150 180 100 180 C50 180 40 178 40 175 V130 Z" fill="#381322" />
      <rect x="55" y="90" width="90" height="40" rx="4" fill="#831843" />
      <rect x="70" y="55" width="60" height="35" rx="4" fill="#db2777" />
      <rect x="96" y="25" width="8" height="30" rx="1" fill="#fbcfe8" />
      <path d="M100 20 Q 95 10 100 0 T 100 -10" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function EnvelopeSVG() {
  return (
    <svg viewBox="0 0 280 180" fill="none" style={{ width: '100%', height: '100%' }}>
      <rect width="280" height="180" rx="12" fill="#0d0407" stroke="#50152d" strokeWidth="1.5" />
      <rect x="25" y="15" width="230" height="90" rx="6" fill="#f4f4f5" />
      <line x1="45" y1="35" x2="235" y2="35" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="45" y1="55" x2="190" y2="55" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="45" y1="75" x2="140" y2="75" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M0 180 L140 85 L280 180 Z" fill="#1f0a13" />
      <path d="M0 0 L140 85 L0 180 Z" fill="#14040a" />
      <path d="M280 0 L140 85 L280 180 Z" fill="#14040a" />
      <path d="M0 0 L140 105 L280 0 Z" fill="#381322" />
      <circle cx="140" cy="105" r="22" fill="#0d0407" stroke="#f472b6" strokeWidth="1.5" />
      <circle cx="140" cy="105" r="18" fill="#f472b6" />
      <path d="M140 112 C140 112 131 102 127 106 C123 110 128 118 140 125 C152 118 157 110 153 106 C149 102 140 112 140 112 Z" fill="#ffffff" />
    </svg>
  )
}