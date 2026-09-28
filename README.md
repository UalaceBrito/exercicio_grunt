# ⚙️ Exercício Grunt — Automação Front-end

> Projeto acadêmico profissional demonstrando pipeline completo de build com Grunt, LESS e JavaScript.

## 📋 Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Estrutura](#estrutura)
- [Instalação](#instalação)
- [Scripts](#scripts)
- [Pipeline de build](#pipeline-de-build)
- [Requisitos do exercício](#requisitos-do-exercício)

---

## 🎯 Sobre

Projeto desenvolvido para o exercício da EBAC, aplicando automação front-end com **Grunt**:

- ✅ Compilação de **LESS** → CSS
- ✅ Minificação de **JavaScript**
- ✅ Minificação de **CSS** e **HTML**
- ✅ **ESLint** para qualidade de código
- ✅ **Sourcemaps** para debug
- ✅ **LiveReload** com servidor local

---

## 🛠 Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Node.js | ≥ 18 | Runtime |
| Grunt | ^1.6.3 | Task runner |
| LESS | ^4.x | Pré-processador CSS |
| UglifyJS | ^3.x | Minificação JS |
| ESLint | ^8.x | Lint JavaScript |

---

## 📁 Estrutura

```
exercicio-grunt/
├── src/
│   ├── less/estilo.less
│   └── js/script.js
├── dist/                    # artefatos gerados pelo build
│   ├── css/
│   ├── js/
│   └── index.html
├── .eslintrc.json
├── .gitignore
├── Gruntfile.js
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Instalação

```bash
# Clonar
git clone <url-do-repo>
cd exercicio-grunt

# Instalar dependências
npm install

# Gerar build
npm run build
```

O build também pode ser aberto diretamente em `dist/index.html`. Para iniciar o
servidor local com LiveReload, use `npm run serve`.

---

## 📜 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Gera todos os arquivos de produção em `dist/` |
| `npm run serve` | Build + servidor local com LiveReload (`http://localhost:9000`) |
| `npm run dev` | Build + watch (sem servidor) |
| `npm run lint` | Executa ESLint |
| `npm run clean` | Remove a pasta `dist/` |

---

## 🔄 Pipeline de build

```
clean:dist
  → clean:temp
  → eslint
  → less:development   (com sourcemap)
  → cssmin             (gera estilo.min.css)
  → concat             (concatena JS)
  → uglify             (minifica JS)
  → copy:html           (ajusta caminhos para dist/)
  → htmlmin            (minifica HTML)
```

---

## ✅ Requisitos do exercício

| # | Requisito | Status |
|---|-----------|--------|
| 1 | Criar arquivo `Gruntfile.js` | ✅ |
| 2 | Compilação do LESS (`src/less/estilo.less` → `dist/css/`) | ✅ |
| 3 | Compressão de JavaScript (`src/js/script.js` → `dist/js/script.min.js`) | ✅ |
| 4 | Criar branch `exercicio_grunt` | ✅ |
| 5 | Armazenar o `Gruntfile.js` nesta branch | ✅ |
| 6 | Enviar o link do repositório na plataforma | ⬇️ |

---

## 📄 Licença

ISC — Projeto acadêmico EBAC.