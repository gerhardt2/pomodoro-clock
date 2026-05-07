# Pomodoro Clock ⏱

> Timer de produtividade baseado na Técnica Pomodoro — com anel de progresso animado, transição automática de fases e configurações persistentes.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-red?style=flat-square)](https://SEU-USUARIO.github.io/pomodoro-clock)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## Demonstração

> 📸 _Adicione um GIF ou screenshot depois de construir o projeto_

---

## Funcionalidades

- Sessões de foco de 25 minutos com pausas curtas (5 min) e longas (15 min)
- Anel SVG animado mostrando o progresso da sessão atual
- Transição automática entre fases após cada sessão
- Contador de ciclos (a cada 4 sessões → pausa longa)
- Notificação sonora ao fim de cada sessão (Web Audio API)
- Título da aba do navegador atualizado em tempo real
- Modal de configurações para personalizar as durações
- Configurações salvas no `localStorage`
- Design responsivo para mobile e desktop

---

## Técnica Pomodoro

| Fase | Duração padrão | Quando ocorre |
|---|---|---|
| Foco | 25 min | A cada sessão |
| Pausa curta | 5 min | Após sessões 1, 2 e 3 |
| Pausa longa | 15 min | Após cada 4ª sessão |

---

## Tecnologias

- **HTML5** semântico com atributos `aria` para acessibilidade
- **CSS3** com custom properties, transições e `font-variant-numeric`
- **JavaScript ES6+** — módulos nativos, `async/await`, `setInterval`
- **Web Audio API** — notificação sonora sem arquivos externos
- **localStorage** — persistência de configurações entre sessões

---

## Arquitetura

O projeto segue o princípio de **separação de responsabilidades**:

```
src/js/
├── state.js    # Fonte única de verdade (fase, tempo, ciclos)
├── timer.js    # Engine do countdown (setInterval)
├── ui.js       # Renderização do DOM e anel SVG
├── storage.js  # Persistência com localStorage
└── app.js      # Orquestrador — conecta todos os módulos
```

---

## Rodando localmente

```bash
git clone https://github.com/SEU-USUARIO/pomodoro-clock.git
cd pomodoro-clock

# Abra com Live Server (VS Code) ou qualquer servidor local
# IMPORTANTE: precisa de um servidor HTTP por usar ES Modules (import/export)
# Abrir index.html diretamente pelo sistema de arquivos não vai funcionar
```

---

## O que aprendi

- Gerenciamento de estado em JavaScript puro sem frameworks
- Animação de SVG com `stroke-dashoffset` e `stroke-dasharray`
- Uso de `setInterval` e `clearInterval` de forma segura
- Separação de módulos com `import`/`export` nativos do JavaScript
- Web Audio API para sons sem arquivos externos
- Persistência de dados com `localStorage`

---

## Melhorias planejadas

- [ ] Histórico de sessões do dia
- [ ] Notificações do sistema com `Notification API`
- [ ] Tema escuro automático
- [ ] Sons customizáveis (chuva, lo-fi, silêncio)
- [ ] Estatísticas semanais

---

## Licença

MIT © [Seu Nome](https://github.com/SEU-USUARIO)

---

> Projeto desenvolvido como parte do meu portfólio de desenvolvimento front-end.  
> Inspirado em [florinpop17/app-ideas](https://github.com/florinpop17/app-ideas).
