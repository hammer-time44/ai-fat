# AI FAT Prep

BCSE306L Artificial Intelligence: module priorities and FAT question papers.

## Features

| Page | What you get |
| --- | --- |
| **ai** (home) | Module-wise priorities for M1–M7 with the marks distribution. Click a topic name to jump to its questions. |
| **fat** | The five question papers (B1, D1, D2, E1, E2), one tab per paper. |
| **topic-wise** | Pick a module (marks shown on each tab, topic-wise only), then **All** or a single topic to see every question asked on it, laid out like the fat page. **Open** jumps to the question in its paper. |
| **imp** | Important-topics notice. |

Also:

- **View / Study** toggle. Study mode adds tick boxes and progress bars, saved in your browser.
- **Search** (press `/`) across topics and questions on the home, fat and topic-wise pages. In topic-wise it also matches question text.
- **Light / dark** theme, remembered between visits.
- **Offline** after the first visit (service worker).
- On the fat, topic-wise and imp pages the buttons for switching pages stay hidden and fade in as your mouse gets close.

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `←` `→` | Home (View and Study mode): previous / next module. Topic-wise: previous / next topic (starts at **All**). |
| `Esc` or `Backspace` | Back to the main (home) page from fat, topic-wise or imp. |
| `/` | Focus search. |
| `Esc` | In the search box: clear it. |

Arrow keys stop at the first and last item and are ignored while typing in search.

## Project Structure

```
ai-fat/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   └── api.js
│   ├── data/
│   │   ├── modules.json
│   │   ├── papers.json
│   │   └── topics.json
│   ├── sw.js
│   └── favicon.svg
├── scripts/
│   ├── dev-server.js
│   └── check.js
├── vercel.json
├── package.json
├── .gitignore
└── .editorconfig
```

## How to Run

Requires Node.js 16 or newer. There is nothing to install.

```bash
npm start
```

Then open http://localhost:3000. Run `npm test` before deploying to check the data and links.

## Editing the Data

- `papers.json` – the question papers.
- `modules.json` – module titles, marks and priorities. A topic's optional `link` names the topic-wise topic it opens.
- `topics.json` – topic-wise mapping. Each topic lists references like `B1-Q1(a)` (paper, question, optional part).

`npm test` fails if any reference or link points at something that doesn't exist.
