import './style.css'
import { diagram } from './diagram.js'
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

document.querySelector('#app').innerHTML = `
  <nav class="nav">
    <a class="logo" href="#topo">${profile.name}</a>
    <div class="nav-actions">
      <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
      <button id="theme-toggle" type="button" aria-label="Alternar tema claro/escuro"></button>
    </div>
  </nav>

  <div class="intro">
  <header class="hero" id="topo">
    <img class="avatar" src="${profile.photo}" alt="Foto de ${profile.name}" />
    <div>
      <p class="role">${profile.role}</p>
      <h1>${profile.name}</h1>
      <p class="bio">${profile.bio}</p>
      <a class="btn" href="#vitrine">Ver projetos ↓</a>
    </div>
  </header>

  <ul class="stats">
    ${stats.map((s) => `<li><strong>${s.value}</strong><span>${s.label}</span></li>`).join('')}
  </ul>
  </div>

  <main>
    <section id="sobre">
      <h2><span>01</span> Sobre e Contato</h2>
      <div class="about-wrap">
      <div class="about">
        <p class="lead">${about}</p>
        <p class="info-line"><a href="mailto:${profile.email}">${profile.email}</a> · ${profile.location}</p>
        <ul class="contacts">
          ${contacts
            .map(
              (c) => `
            <li><a href="${c.url}" target="_blank" rel="noopener noreferrer">
              <img src="${c.icon}" alt="" width="20" height="20" />${c.label}
            </a></li>`,
            )
            .join('')}
        </ul>
      </div>
      <figure class="diagram">${diagram}</figure>
      </div>
    </section>

    <section id="vitrine">
      <h2><span>02</span> Vitrine</h2>
      <form class="filters" id="filters" autocomplete="off">
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
        <button type="reset" class="clear">Limpar</button>
      </form>
      <ul class="showcase" id="showcase">
        ${showcase
          .map(
            (p, i) => `
          <li data-skills="${p.skills.join('|')}">
            <a class="project" href="${p.url}" target="_blank" rel="noopener noreferrer">
              <span class="idx">${pad(i)}</span>
              <h3>${p.name}</h3>
              <p>${p.description}</p>
              <ul class="tags">${p.skills.map((t) => `<li>${t}</li>`).join('')}</ul>
              <span class="go">Abrir ↗</span>
            </a>
          </li>`,
          )
          .join('')}
      </ul>
      <p class="empty" id="empty" hidden>Nenhum projeto com essa habilidade.</p>
    </section>

    <section id="experiencia">
      <h2><span>03</span> Experiência</h2>
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
      <h2><span>04</span> Formação</h2>
      <ul class="edu">
        ${education
          .map((e) => `<li><span class="note">${e.note}</span><h3>${e.title}</h3><p>${e.place}</p></li>`)
          .join('')}
      </ul>
      <ul class="tags langs">${languages.map((l) => `<li>${l}</li>`).join('')}</ul>
    </section>
  </main>

  <footer>
    <span>© ${new Date().getFullYear()} ${profile.fullName}</span>
    <a href="#topo">Voltar ao topo ↑</a>
  </footer>
`

const filters = document.querySelector('#filters')
const cards = [...document.querySelectorAll('#showcase > li')]
const empty = document.querySelector('#empty')
const texts = cards.map((c) => c.textContent.toLowerCase())

const applyFilters = () => {
  const data = new FormData(filters)
  const q = String(data.get('q') || '').trim().toLowerCase()
  const selected = [...data.entries()].filter(([k, v]) => k.startsWith('skill-') && v).map(([, v]) => v)
  let visible = 0
  cards.forEach((c, i) => {
    const has = c.dataset.skills.split('|')
    const show = (!q || texts[i].includes(q)) && selected.every((sk) => has.includes(sk))
    c.hidden = !show
    if (show) visible++
  })
  empty.hidden = visible > 0
}

filters.addEventListener('input', applyFilters)
filters.addEventListener('reset', () => setTimeout(applyFilters))
filters.addEventListener('submit', (e) => e.preventDefault())
const root = document.documentElement
const toggle = document.querySelector('#theme-toggle')
const paintToggle = () => {
  toggle.innerHTML = root.dataset.theme === 'dark' ? sunIcon : moonIcon
}
toggle.addEventListener('click', () => {
  root.classList.add('theme-switching')
  setTimeout(() => root.classList.remove('theme-switching'), 450)
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', root.dataset.theme)
  paintToggle()
})
paintToggle()
