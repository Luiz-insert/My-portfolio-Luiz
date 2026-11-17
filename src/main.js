import './style.css'
import { diagram } from './diagram.js'
import { drawBand, drawPortrait } from './dither.js'
import sunIcon from 'heroicons/24/outline/sun.svg?raw'
import moonIcon from 'heroicons/24/outline/moon.svg?raw'
import {
  profile,
  nav,
  stats,
  about,
  showcase,
  experience,
  skills,
  education,
  languages,
  contacts,
} from './data.js'

const pad = (n) => String(n + 1).padStart(2, '0')
const [firstName, ...rest] = profile.name.split(' ')
const lastName = rest.join(' ')
// Primeira frase da bio em tom suave, o resto em destaque.
const cut = profile.bio.indexOf('. ')
const bioLead = cut > -1 ? profile.bio.slice(0, cut + 1) : profile.bio
const bioStrong = cut > -1 ? profile.bio.slice(cut + 2) : ''

const arrow = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`

const sectionHead = (i, title, sub = '') => `
  <header class="sec-head">
    <span class="sec-idx">${pad(i)}</span>
    <h2>${title}</h2>
    ${sub ? `<p>${sub}</p>` : ''}
  </header>`

document.querySelector('#app').innerHTML = `
  <nav class="nav">
    <a class="logo" href="#topo">${profile.name}</a>
    <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
    <div class="nav-actions">
      <button id="theme-toggle" type="button" aria-label="Alternar tema claro/escuro"></button>
      <a class="btn btn-ghost btn-sm" href="mailto:${profile.email}">Fale comigo ${arrow}</a>
    </div>
  </nav>

  <div class="intro">
    <header class="hero" id="topo">
      <div class="hero-copy">
        <p class="eyebrow">${profile.role} · ${profile.location}</p>
        <h1><span>${firstName}</span><span class="accent indent">${lastName}.</span></h1>
        <p class="bio">${bioLead} ${bioStrong ? `<strong>${bioStrong}</strong>` : ''}</p>
        <div class="actions">
          <a class="btn btn-accent" href="#vitrine">Ver projetos ${arrow}</a>
          <a class="btn btn-ghost" href="#sobre">Sobre mim</a>
        </div>
      </div>
      <figure class="portrait">
        <img src="${profile.photo}" alt="Foto de ${profile.name}" />
        <canvas role="img" aria-label="Retrato de ${profile.name} em pontilhado"></canvas>
        <span class="corner tl"></span><span class="corner br"></span>
      </figure>
    </header>

    <ul class="stats">
      ${stats.map((s) => `<li><strong>${s.value}</strong><span>${s.label}</span></li>`).join('')}
    </ul>
  </div>

  <canvas class="band" aria-hidden="true"></canvas>

  <main>
    <section id="sobre">
      ${sectionHead(0, 'Sobre e Contato')}
      <div class="about-wrap">
        <div class="about">
          <p class="lead">${about}</p>
          <p class="info-line"><a href="mailto:${profile.email}">${profile.email}</a> · ${profile.location}</p>
          <ul class="contacts">
            ${contacts
              .map(
                (c) => `
              <li><a href="${c.url}" target="_blank" rel="noopener noreferrer">
                <img src="${c.icon}" alt="" width="18" height="18" />${c.label}
              </a></li>`,
              )
              .join('')}
          </ul>
        </div>
        <figure class="diagram panel">${diagram}</figure>
      </div>
    </section>

    <section id="vitrine">
      ${sectionHead(1, 'Vitrine', 'Projetos publicados. Filtre por habilidade ou procure pelo nome.')}
      <form class="filters panel" id="filters" autocomplete="off">
        <label class="field search">
          <span>Buscar</span>
          <input type="search" name="q" placeholder="Nome ou descrição" />
        </label>
        ${skills
          .map(
            (g) => `
          <label class="field">
            <span>${g.group}</span>
            <select name="skill-${g.group}">
              <option value="">Todas</option>
              ${g.items
                .map((i) => {
                  const n = showcase.filter((p) => p.skills.includes(i)).length
                  return `<option value="${i}" ${n ? '' : 'disabled'}>${i} (${n})</option>`
                })
                .join('')}
            </select>
          </label>`,
          )
          .join('')}
        <button type="reset" class="btn btn-ghost btn-sm clear">Limpar</button>
      </form>
      <div class="showroom" aria-roledescription="carrossel" aria-label="Projetos">
        <div class="sr-track" id="showcase" tabindex="0">
          ${showcase
            .map(
              (p, i) => `
            <article class="sr-slide" data-skills="${p.skills.join('|')}" aria-roledescription="slide" aria-label="${p.name}">
              <div class="project">
                <span class="idx">${pad(i)}</span>
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <ul class="tags">${p.skills.map((t) => `<li>${t}</li>`).join('')}</ul>
                <a class="btn btn-accent btn-sm" href="${p.url}" target="_blank" rel="noopener noreferrer">Abrir projeto ${arrow}</a>
              </div>
              <div class="sr-preview">
                <a class="sr-frame" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${p.name}" tabindex="-1">
                  <span class="sr-bar" aria-hidden="true"><i></i><i></i><i></i></span>
                  <span class="sr-view">
                    ${(p.images || [])
                      .map(
                        (img, k) =>
                          `<img class="sr-img ${img.kind}${k === 0 ? ' is-on' : ''}" src="${img.src}" alt="Captura ${k + 1} de ${p.name}" loading="lazy" />`,
                      )
                      .join('')}
                  </span>
                </a>
                ${
                  (p.images || []).length > 1
                    ? `<div class="sr-dots">${p.images
                        .map(
                          (_, k) =>
                            `<button type="button" class="${k === 0 ? 'is-on' : ''}" aria-label="Imagem ${k + 1} de ${p.images.length}"></button>`,
                        )
                        .join('')}</div>`
                    : ''
                }
              </div>
            </article>`,
            )
            .join('')}
        </div>
        <div class="sr-controls">
          <button type="button" class="sr-nav" id="sr-prev" aria-label="Projeto anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
          </button>
          <span class="sr-count" id="sr-count" aria-live="polite">01 / ${pad(showcase.length - 1)}</span>
          <div class="sr-progress" id="sr-progress"></div>
          <button type="button" class="sr-nav" id="sr-next" aria-label="Próximo projeto">${arrow}</button>
        </div>
      </div>
      <p class="empty" id="empty" hidden>Nenhum projeto com essa habilidade.</p>
    </section>

    <section id="experiencia">
      ${sectionHead(2, 'Experiência')}
      <ol class="timeline">
        ${experience
          .map(
            (e) => `
          <li>
            <span class="period">${e.period}</span>
            <div>
              <h3>${e.role}</h3>
              <p class="company">${e.company}</p>
              <ul class="points">${e.points.map((p) => `<li>${p}</li>`).join('')}</ul>
            </div>
          </li>`,
          )
          .join('')}
      </ol>
    </section>

    <section id="formacao">
      ${sectionHead(3, 'Formação')}
      <ul class="edu">
        ${education
          .map((e) => `<li><span class="note">${e.note}</span><h3>${e.title}</h3><p>${e.place}</p></li>`)
          .join('')}
      </ul>
      <ul class="tags langs">${languages.map((l) => `<li>${l}</li>`).join('')}</ul>
    </section>

    <section class="cta">
      <h2>Vamos construir algo juntos?</h2>
      <p>Aberto a projetos, automações e oportunidades full-stack.</p>
      <a class="btn btn-accent" href="mailto:${profile.email}">Enviar e-mail ${arrow}</a>
    </section>
  </main>

  <canvas class="band band-footer" aria-hidden="true"></canvas>

  <footer>
    <a class="logo" href="#topo">${profile.fullName}</a>
    <span>© ${new Date().getFullYear()}</span>
    <a href="#topo">Voltar ao topo ↑</a>
  </footer>
`

/* ---------- Showroom (vitrine) ---------- */
const track = document.querySelector('#showcase')
const slides = [...track.querySelectorAll('.sr-slide')]
const showroom = document.querySelector('.showroom')
const counter = document.querySelector('#sr-count')
const progress = document.querySelector('#sr-progress')
const prevBtn = document.querySelector('#sr-prev')
const nextBtn = document.querySelector('#sr-next')
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

const visibleSlides = () => slides.filter((s) => !s.hidden)
const currentIndex = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth))

const goTo = (i) => {
  const list = visibleSlides()
  if (!list.length) return
  const n = (i + list.length) % list.length
  track.scrollTo({ left: n * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
}

const renderProgress = () => {
  const list = visibleSlides()
  progress.innerHTML = list
    .map((s, i) => `<button type="button" aria-label="Ir para ${s.getAttribute('aria-label')}" data-i="${i}"></button>`)
    .join('')
}

const updateUi = () => {
  const list = visibleSlides()
  const i = Math.min(currentIndex(), list.length - 1)
  counter.textContent = list.length ? `${pad(i)} / ${pad(list.length - 1)}` : '00 / 00'
  ;[...progress.children].forEach((b, k) => b.classList.toggle('is-on', k === i))
  list.forEach((s, k) => s.classList.toggle('is-active', k === i))
  const single = list.length < 2
  prevBtn.disabled = single
  nextBtn.disabled = single
}

let scrollTimer
track.addEventListener('scroll', () => {
  clearTimeout(scrollTimer)
  scrollTimer = setTimeout(updateUi, 60)
})
prevBtn.addEventListener('click', () => goTo(currentIndex() - 1))
nextBtn.addEventListener('click', () => goTo(currentIndex() + 1))
progress.addEventListener('click', (e) => {
  const b = e.target.closest('button')
  if (b) goTo(Number(b.dataset.i))
})
track.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    goTo(currentIndex() + 1)
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    goTo(currentIndex() - 1)
  }
})
// mantém o slide alinhado quando a largura muda
new ResizeObserver(() => {
  track.scrollLeft = currentIndex() * track.clientWidth
}).observe(track)

// Carrossel de imagens dentro de cada slide
const showImage = (slide, k) => {
  const imgs = [...slide.querySelectorAll('.sr-img')]
  const dots = [...slide.querySelectorAll('.sr-dots button')]
  if (!imgs.length) return
  const n = (k + imgs.length) % imgs.length
  imgs.forEach((im, j) => im.classList.toggle('is-on', j === n))
  dots.forEach((d, j) => d.classList.toggle('is-on', j === n))
  slide.dataset.img = n
}

slides.forEach((slide) => {
  slide.querySelectorAll('.sr-dots button').forEach((d, k) => d.addEventListener('click', () => showImage(slide, k)))
})

let paused = false
showroom.addEventListener('mouseenter', () => (paused = true))
showroom.addEventListener('mouseleave', () => (paused = false))
showroom.addEventListener('focusin', () => (paused = true))
showroom.addEventListener('focusout', () => (paused = false))

if (!reduceMotion) {
  setInterval(() => {
    if (paused || document.hidden) return
    const active = track.querySelector('.sr-slide.is-active')
    if (active) showImage(active, Number(active.dataset.img || 0) + 1)
  }, 3500)
}

/* ---------- Filtros da vitrine ---------- */
const filters = document.querySelector('#filters')
const empty = document.querySelector('#empty')
const texts = slides.map((c) => c.querySelector('.project').textContent.toLowerCase())

const applyFilters = () => {
  const data = new FormData(filters)
  const q = String(data.get('q') || '').trim().toLowerCase()
  const selected = [...data.entries()].filter(([k, v]) => k.startsWith('skill-') && v).map(([, v]) => v)
  let visible = 0
  slides.forEach((c, i) => {
    const has = c.dataset.skills.split('|')
    const show = (!q || texts[i].includes(q)) && selected.every((sk) => has.includes(sk))
    c.hidden = !show
    if (show) visible++
  })
  empty.hidden = visible > 0
  showroom.hidden = visible === 0
  track.scrollLeft = 0
  renderProgress()
  updateUi()
}

renderProgress()
updateUi()

filters.addEventListener('input', applyFilters)
filters.addEventListener('reset', () => setTimeout(applyFilters))
filters.addEventListener('submit', (e) => e.preventDefault())

/* ---------- Dither ---------- */
const bandTop = document.querySelector('.band:not(.band-footer)')
const bandFooter = document.querySelector('.band-footer')
const portrait = document.querySelector('.portrait')
const photo = portrait.querySelector('img')
const photoCanvas = portrait.querySelector('canvas')

const paintPortrait = () => {
  if (!photo.complete || !photo.naturalWidth) return
  try {
    drawPortrait(photoCanvas, photo)
    portrait.classList.add('is-dithered')
  } catch {
    portrait.classList.remove('is-dithered') // sem canvas: fica a foto original
  }
}

const paintAll = () => {
  drawBand(bandTop)
  drawBand(bandFooter, { reverse: true })
  paintPortrait()
}

photo.addEventListener('load', paintPortrait)
new ResizeObserver(() => {
  drawBand(bandTop)
  drawBand(bandFooter, { reverse: true })
}).observe(document.body)
paintAll()

/* ---------- Tema ---------- */
const root = document.documentElement
const toggle = document.querySelector('#theme-toggle')
const paintToggle = () => {
  toggle.innerHTML = root.dataset.theme === 'dark' ? sunIcon : moonIcon
}
toggle.addEventListener('click', () => {
  root.classList.add('theme-switching')
  setTimeout(() => root.classList.remove('theme-switching'), 50)
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem('theme', root.dataset.theme)
  } catch {
    /* armazenamento bloqueado: o tema muda só nesta visita */
  }
  paintToggle()
  paintAll()
})
paintToggle()
