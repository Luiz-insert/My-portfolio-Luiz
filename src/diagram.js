// Fluxograma simples de arquitetura (SVG inline, herda as cores do tema).
const box = (x, y, w, h, title, sub) => `
  <g class="node">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" />
    <text x="${x + w / 2}" y="${y + h / 2 - (sub ? 4 : -4)}" text-anchor="middle" class="t">${title}</text>
    ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 14}" text-anchor="middle" class="s">${sub}</text>` : ''}
  </g>`

export const diagram = `
<svg viewBox="0 0 480 440" role="img" aria-label="Fluxograma de arquitetura: usuário, front-end, API, banco de dados e workers de automação, dentro da nuvem">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
    </marker>
  </defs>

  <rect class="cloud" x="10" y="110" width="460" height="320" />
  <text x="24" y="132" class="s">CLOUD · AWS · DOCKER · CI/CD</text>

  ${box(170, 10, 140, 44, 'Usuário')}
  ${box(140, 150, 200, 54, 'Front-end', 'React · Next.js')}
  ${box(140, 248, 200, 54, 'API', 'Node.js · FastAPI')}
  ${box(30, 352, 160, 58, 'Banco de dados', 'PostgreSQL · MongoDB')}
  ${box(290, 352, 160, 58, 'Workers RPA', 'Python · C# · UiPath')}

  <g class="flow" marker-end="url(#arrow)">
    <path d="M240 54 V148" marker-end="url(#arrow)" />
    <path d="M240 204 V246" marker-end="url(#arrow)" />
    <path d="M240 302 V327 H110 V350" marker-end="url(#arrow)" />
    <path d="M240 302 V327 H370 V350" marker-end="url(#arrow)" />
  </g>
</svg>`
