import { createElement, useLayoutEffect, useRef, useState } from 'react'
import { DeviceFrame } from './components/DeviceFrame'
import './App.css'

import heroScreen from './assets/main.png'
import logoWhite from './assets/ico_logo_W.svg'
import screenMap from './assets/image_main01.png'
import screenTreasure from './assets/image_main02.png'
import screenPoints from './assets/image_main03.png'
import screenQr from './assets/image_main04.png'
import screenManage from './assets/image_main05.png'
import screenDashboard from './assets/image_main06.png'
import bannerBg from './assets/banner.png'
import appIconUser from './assets/ico_logo.png'
import appIconMerchant from './assets/ico_logo_merchant.png'
import appstoreIcon from './assets/ico_appstore.svg'
import appstoreIconWhite from './assets/ico_appstore_W.svg'
import gpIcon from './assets/ico_googleplay.svg'

const travelerShowcase = [
  {
    id: 'map',
    img: screenMap,
    title: '실시간 지도',
    desc: (
      <>
        가맹점·보물상자를 지도에 표시해요.
        <br />
        실시간 위치로 근처 매장과 보물상자를 찾아요.
      </>
    ),
    alt: '실시간 지도 — 가맹점·보물상자 화면',
  },
  {
    id: 'treasure',
    img: screenTreasure,
    title: '보물상자',
    desc: (
      <>
        망치로 보물상자를 열고
        <br />
        경품 뽑기·이벤트 보상을 받을 수 있어요.
      </>
    ),
    alt: '보물상자 화면',
  },
  {
    id: 'lotto',
    img: screenPoints,
    title: '로또함',
    desc: (
      <>
        로또 번호를 수집하고, 6개를 완성해 복권을 받아요.
        <br />
        회차별 당첨금과 추첨일을 확인할 수 있어요.
      </>
    ),
    alt: '로또함 화면',
  },
]

const merchantShowcase = [
  {
    id: 'map',
    img: screenQr,
    title: 'QR 스캔',
    desc: (
      <>
        여행객 앱의 QR을 스캔해
        <br />
        유효기간과 중복 사용을 확인하고 혜택을 제공해요.
      </>
    ),
    alt: 'QR 스캔 화면',
  },
  {
    id: 'treasure',
    img: screenManage,
    title: 'MY',
    desc: (
      <>
        MY에서 가맹점 정보를 조회하고
        <br />
        QR 스캔도 할 수 있어요.
      </>
    ),
    alt: 'MY — 가맹점 정보·QR 화면',
  },
  {
    id: 'lotto',
    img: screenDashboard,
    title: '통계 · 대시보드',
    desc: (
      <>
        방문·매출 등 지표를 한눈에 보고
        <br />
        운영 현황을 점검해요.
      </>
    ),
    alt: '통계 · 대시보드 화면',
  },
]

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => setVisible(true)

    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.92 && rect.bottom > -40) {
      show()
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show()
            obs.unobserve(el)
            break
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}

function Reveal({ as: As = 'div', className = '', delay = 0, style, children, ...rest }) {
  const [ref, visible] = useReveal()
  const revealClass = `reveal${visible ? ' reveal--visible' : ''}`
  const merged = [revealClass, className].filter(Boolean).join(' ')
  const mergedStyle =
    delay > 0 || style
      ? {
          ...(style && typeof style === 'object' ? style : {}),
          ...(delay > 0 ? { '--reveal-delay': `${delay}ms` } : {}),
        }
      : undefined
  return createElement(As, { ref, className: merged, style: mergedStyle, ...rest }, children)
}

function StoreButtons({ className = '', variant = 'light' }) {
  const mod =
    variant === 'dark'
      ? 'store-buttons--dark'
      : variant === 'ghost'
        ? 'store-buttons--ghost'
        : variant === 'cta'
          ? 'store-buttons--cta'
          : ''
  const appStoreSrc = variant === 'ghost' ? appstoreIconWhite : appstoreIcon
  return (
    <div className={`store-buttons ${mod} ${className}`.trim()}>
      <a className="store-buttons__btn" href="#" aria-label="Google Play에서 다운로드">
        <img
          className="store-buttons__store-ico"
          src={gpIcon}
          alt=""
          width={20}
          height={20}
        />
        Google Play
      </a>
      <a className="store-buttons__btn" href="#" aria-label="App Store에서 다운로드">
        <img
          className="store-buttons__store-ico"
          src={appStoreSrc}
          alt=""
          width={20}
          height={20}
        />
        App Store
      </a>
    </div>
  )
}

function PointBanner({
  point,
  title,
  children,
  iconSrc,
  iconAlt,
  pillBadge,
  iconVariant,
  bannerVariant,
}) {
  const withPill = Boolean(pillBadge)
  const headerClass = [
    'point-banner',
    withPill && 'point-banner--traveler',
    withPill && bannerVariant === 'merchant' && 'point-banner--merchant',
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <header className={headerClass}>
      <div className="point-banner__inner">
        <div className="point-banner__copy">
          {pillBadge ? (
            <span className="point-banner__pill">{pillBadge}</span>
          ) : (
            <span className="point-banner__label">{point}</span>
          )}
          <h2 className="point-banner__title">{title}</h2>
          {children}
        </div>
        <div
          className={`point-banner__icon-slot${iconVariant === 'orange-tile' ? ' point-banner__icon-slot--orange-tile' : ''}`}
        >
          <img
            className={`point-banner__app-icon${iconVariant === 'orange-tile' ? ' point-banner__app-icon--on-orange' : ''}`}
            src={iconSrc}
            alt={iconAlt}
          />
        </div>
      </div>
    </header>
  )
}

function ShowcaseCellCopy({ title, desc }) {
  return (
    <div className="showcase__copy">
      <h3 className="showcase__heading">{title}</h3>
      {desc ? <p className="showcase__sub">{desc}</p> : null}
    </div>
  )
}

function ShowcaseCell({ item, scrollReveal, revealDelay = 0 }) {
  const inner = (
    <>
      <ShowcaseCellCopy title={item.title} desc={item.desc} />
      <DeviceFrame src={item.img} alt={item.alt} size="showcase" />
    </>
  )
  if (scrollReveal) {
    return (
      <Reveal as="div" className="showcase__cell" delay={revealDelay}>
        {inner}
      </Reveal>
    )
  }
  return <div className="showcase__cell">{inner}</div>
}

function ShowcaseGrid({ items, tone = 'light', scrollReveal = false }) {
  const travelerApp = tone === 'traveler-app'
  const revealStagger = 100
  return (
    <div className={`showcase${travelerApp ? ' showcase--traveler-app' : ''}`}>
      <div className="showcase__row showcase__row--pair">
        {items.slice(0, 2).map((item, i) => (
          <ShowcaseCell
            key={item.id}
            item={item}
            scrollReveal={scrollReveal}
            revealDelay={scrollReveal ? i * revealStagger : 0}
          />
        ))}
      </div>
      <div className="showcase__row showcase__row--single">
        <ShowcaseCell
          item={items[2]}
          scrollReveal={scrollReveal}
          revealDelay={scrollReveal ? 2 * revealStagger : 0}
        />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="landing">
      <header className="hero">
        <div className="hero__shell">
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="hero__kicker hero__copy-in hero__copy-in--1">
                여행지 가맹 혜택과 로또 당첨 기회를 잇는
              </p>
              <h1 className="hero__title hero__copy-in hero__copy-in--2">여행 멤버십 플랫폼,</h1>
              <p className="hero__logo-wrap hero__copy-in hero__copy-in--3">
                <img className="hero__logo" src={logoWhite} alt="썸티요" />
              </p>
              <p className="hero__lead hero__copy-in hero__copy-in--4">
                여행객용·가맹점주용 앱은 따로 제공됩니다.
                <br />
                스토어에서 맞는 앱을 골라 설치해 주세요.
              </p>
              <StoreButtons className="hero__stores" variant="ghost" />
              <nav className="hero__anchors" aria-label="앱 소개 섹션">
                <a className="hero__anchor" href="#user-app">
                  여행객용 앱 소개
                </a>
                <span className="hero__anchor-sep" aria-hidden="true">
                  |
                </span>
                <a className="hero__anchor" href="#merchant-app">
                  가맹점주용 앱 소개
                </a>
              </nav>
            </div>
            <div className="hero__visual">
              <div className="hero__visual-wrap">
                <img
                  className="hero__shot"
                  src={heroScreen}
                  alt="썸티요 앱 홈 화면"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section id="user-app" className="section-block">
          <PointBanner
            pillBadge="TRAVELER APP"
            title="여행객용 앱"
            iconSrc={appIconUser}
            iconAlt="썸티요 앱 아이콘"
          >
            <div className="point-banner__desc">
              <p>
                지도·보물상자·로또·여행권까지
                <br />
                여행 혜택을 한 앱에서 이용해요.
              </p>
            </div>
          </PointBanner>
          <div className="section-block__body">
            <ShowcaseGrid items={travelerShowcase} scrollReveal />
          </div>
        </section>

        <section id="merchant-app" className="section-block">
          <PointBanner
            pillBadge="MERCHANT APP"
            title="가맹점주용 앱"
            iconSrc={appIconMerchant}
            iconAlt="썸티요 가맹점 앱 아이콘"
            bannerVariant="merchant"
          >
            <div className="point-banner__desc">
              <p>
                스캔·통계·내 매장까지
                <br />
                가맹점 운영을 한 앱에서 확인해요.
              </p>
            </div>
          </PointBanner>
          <div className="section-block__body">
            <ShowcaseGrid items={merchantShowcase} scrollReveal />
          </div>
        </section>
      </main>

      <section id="download" className="cta-parallax" aria-labelledby="cta-parallax-title">
        <div className="cta-parallax__bg" style={{ backgroundImage: `url(${bannerBg})` }} aria-hidden="true" />
        <div className="cta-parallax__overlay" aria-hidden="true" />
        <div className="cta-parallax__inner">
          <h2 id="cta-parallax-title" className="cta-parallax__title">
            앱 다운로드
          </h2>
          <p className="cta-parallax__lead">
            여행객용과 가맹점주용은 앱이 서로 달라요.
            <br />
            해당 스토어 버튼으로 설치해 주세요.
          </p>
          <div className="cta-parallax__grid">
            <article className="cta-glass">
              <div className="cta-glass__head">
                <div className="cta-glass__copy">
                  <h3 className="cta-glass__title">여행객용 썸타요</h3>
                  <p className="cta-glass__sub">지도·보물상자·여행권·로또함</p>
                </div>
                <img
                  className="cta-glass__icon"
                  src={appIconUser}
                  alt=""
                  width={72}
                  height={72}
                />
              </div>
              <StoreButtons className="cta-glass__stores" variant="cta" />
            </article>
            <article className="cta-glass">
              <div className="cta-glass__head">
                <div className="cta-glass__copy">
                  <h3 className="cta-glass__title">가맹점주용 썸타요</h3>
                  <p className="cta-glass__sub">스캔·통계·내 매장</p>
                </div>
                <img
                  className="cta-glass__icon"
                  src={appIconMerchant}
                  alt=""
                  width={72}
                  height={72}
                />
              </div>
              <StoreButtons className="cta-glass__stores" variant="cta" />
            </article>
          </div>
        </div>
      </section>

      <footer id="site-footer" className="footer">
        <div className="footer__inner">
          <div className="footer__row">
            <p className="footer__links">
              <a href="#">이용약관</a>
              <span className="footer__sep"> </span>
              <a href="#">개인정보처리방침</a>
            </p>
            <p className="footer__copy">© {new Date().getFullYear()} 썸타요. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
