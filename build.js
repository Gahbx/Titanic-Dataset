const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5

// Ocean Gradient palette
const NAVY = "21295C";
const DEEPBLUE = "065A82";
const TEAL = "1C7293";
const WHITE = "FFFFFF";
const ICEBLUE = "D6E8F0";
const GREY = "5A6B75";
const LIGHTBG = "F7FAFB";

const FONT_HEAD = "Cambria";
const FONT_BODY = "Calibri";

function darkBg(slide) {
  slide.background = { color: NAVY };
}
function lightBg(slide) {
  slide.background = { color: WHITE };
}

function footer(slide, pageLabel) {
  slide.addText(pageLabel, {
    x: 12.1, y: 7.15, w: 1.0, h: 0.3,
    fontFace: FONT_BODY, fontSize: 10, color: GREY, align: "right",
  });
}

function sectionTitle(slide, kicker, title) {
  slide.addText(kicker.toUpperCase(), {
    x: 0.6, y: 0.4, w: 8, h: 0.35, fontFace: FONT_BODY, fontSize: 13,
    color: TEAL, bold: true, charSpacing: 2, isTextBox: true,
  });
  slide.addText(title, {
    x: 0.6, y: 0.72, w: 12.0, h: 0.75, fontFace: FONT_HEAD, fontSize: 30,
    color: NAVY, bold: true, isTextBox: true,
  });
}

function iconCircle(slide, x, y, d, color, glyph, glyphColor, glyphSize) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color }, line: { type: "none" } });
  slide.addText(glyph, {
    x: x - 0.05, y: y, w: d + 0.1, h: d, align: "center", valign: "middle",
    fontFace: FONT_BODY, fontSize: glyphSize || 20, color: glyphColor || WHITE, bold: true, isTextBox: true,
  });
}

// ---------- SLIDE 1: TITLE ----------
{
  const s = pres.addSlide();
  darkBg(s);
  // decorative circles motif
  s.addShape("ellipse", { x: 10.6, y: -1.3, w: 4.5, h: 4.5, fill: { color: DEEPBLUE, transparency: 60 }, line: { type: "none" } });
  s.addShape("ellipse", { x: 11.8, y: 4.6, w: 3.2, h: 3.2, fill: { color: TEAL, transparency: 55 }, line: { type: "none" } });
  s.addShape("ellipse", { x: -1.2, y: 5.3, w: 3.0, h: 3.0, fill: { color: TEAL, transparency: 65 }, line: { type: "none" } });

  s.addText("ANALYTICAL METHODS · 2025", {
    x: 0.9, y: 1.35, w: 8, h: 0.4, fontFace: FONT_BODY, fontSize: 13, color: ICEBLUE,
    bold: true, charSpacing: 2, isTextBox: true,
  });
  s.addText("Detecção eletroquímica multicomponente\nde metabólitos por Machine Learning", {
    x: 0.9, y: 1.8, w: 10.5, h: 2.0, fontFace: FONT_HEAD, fontSize: 38, color: WHITE, bold: true,
    isTextBox: true, lineSpacingMultiple: 1.08,
  });
  s.addText("Classificação e predição de concentração de ácido úrico (UA), dopamina (DA)\ne ácido ascórbico (AA) em soluções com picos eletroquímicos sobrepostos", {
    x: 0.9, y: 3.75, w: 10.0, h: 0.9, fontFace: FONT_BODY, fontSize: 16, color: ICEBLUE, italic: true,
    isTextBox: true, lineSpacingMultiple: 1.2,
  });

  s.addShape("line", { x: 0.9, y: 4.85, w: 3.2, h: 0, line: { color: TEAL, width: 2 } });

  s.addText("Shen, Zhang, Xue, Zhang & Zhu · Beijing Information Science and Technology University", {
    x: 0.9, y: 5.05, w: 10.5, h: 0.4, fontFace: FONT_BODY, fontSize: 13, color: ICEBLUE, isTextBox: true,
  });
  s.addText("Apresentação baseada no artigo · DOI: 10.1039/d5ay00431d", {
    x: 0.9, y: 6.6, w: 8, h: 0.4, fontFace: FONT_BODY, fontSize: 11, color: GREY, isTextBox: true,
  });
}

// ---------- SLIDE 2: O PROBLEMA ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "O problema", "Picos eletroquímicos sobrepostos");

  s.addText(
    "UA, DA e AA são metabólitos com forte ligação a doenças, mas suas propriedades\nredox são muito parecidas — o que gera sobreposição de picos na DPV.",
    { x: 0.6, y: 1.55, w: 7.1, h: 0.9, fontFace: FONT_BODY, fontSize: 15, color: GREY, isTextBox: true, lineSpacingMultiple: 1.25 }
  );

  const rows = [
    ["Sobreposição de picos", "Dificulta distinguir qual componente está presente e medir sua concentração individual."],
    ["Soluções tradicionais são caras", "Modificar o eletrodo (grafeno, polímeros, nanocompósitos) melhora a seletividade, mas eleva custo, tempo e complexidade operacional."],
    ["Ausência de modelo unificado", "Faltava uma abordagem que fizesse análise qualitativa (quais componentes) e quantitativa (quanto de cada) ao mesmo tempo, sem eletrodo modificado."],
  ];
  let y = 2.65;
  rows.forEach((r, i) => {
    iconCircle(s, 0.6, y, 0.5, DEEPBLUE, String(i + 1), WHITE, 18);
    s.addText(r[0], { x: 1.35, y: y - 0.05, w: 5.6, h: 0.35, fontFace: FONT_BODY, fontSize: 15, bold: true, color: NAVY, isTextBox: true });
    s.addText(r[1], { x: 1.35, y: y + 0.32, w: 5.7, h: 0.75, fontFace: FONT_BODY, fontSize: 12.5, color: GREY, isTextBox: true, lineSpacingMultiple: 1.15 });
    y += 1.32;
  });

  // right visual: overlapping circles representing overlapping peaks
  s.addShape("ellipse", { x: 8.3, y: 2.3, w: 2.6, h: 2.6, fill: { color: DEEPBLUE, transparency: 35 }, line: { type: "none" } });
  s.addShape("ellipse", { x: 9.6, y: 2.3, w: 2.6, h: 2.6, fill: { color: TEAL, transparency: 35 }, line: { type: "none" } });
  s.addShape("ellipse", { x: 8.95, y: 3.4, w: 2.6, h: 2.6, fill: { color: NAVY, transparency: 35 }, line: { type: "none" } });
  s.addText("AA", { x: 8.3, y: 2.85, w: 2.6, h: 0.5, align: "center", fontFace: FONT_BODY, bold: true, fontSize: 16, color: NAVY, isTextBox: true });
  s.addText("DA", { x: 9.6, y: 2.85, w: 2.6, h: 0.5, align: "center", fontFace: FONT_BODY, bold: true, fontSize: 16, color: WHITE, isTextBox: true });
  s.addText("UA", { x: 8.95, y: 4.0, w: 2.6, h: 0.5, align: "center", fontFace: FONT_BODY, bold: true, fontSize: 16, color: WHITE, isTextBox: true });
  s.addText("Picos que se confundem\nno mesmo intervalo de potencial", {
    x: 7.9, y: 6.15, w: 4.3, h: 0.7, align: "center", fontFace: FONT_BODY, fontSize: 12, italic: true, color: GREY, isTextBox: true,
  });

  footer(s, "2");
}

// ---------- SLIDE 3: OBJETIVO ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Objetivo do estudo", "Usar Machine Learning como alternativa à modificação de eletrodo");

  const cards = [
    ["Classificar", "Identificar quais componentes (UA, DA e/ou AA) estão presentes em uma solução desconhecida — tarefa de classificação."],
    ["Quantificar", "Prever a concentração de cada componente presente na mistura — tarefa de regressão multi-saída."],
    ["Simplificar", "Fazer isso com eletrodo de carbono comum (sem modificação química), reduzindo custo e complexidade do sensor."],
  ];
  let x = 0.6;
  cards.forEach((c, i) => {
    s.addShape("roundRect", { x, y: 2.0, w: 3.95, h: 3.3, rectRadius: 0.12, fill: { color: LIGHTBG }, line: { color: ICEBLUE, width: 1 } });
    iconCircle(s, x + 0.35, 2.4, 0.7, DEEPBLUE, ["1", "2", "3"][i], WHITE, 24);
    s.addText(c[0], { x: x + 0.3, y: 3.3, w: 3.4, h: 0.5, fontFace: FONT_HEAD, fontSize: 19, bold: true, color: NAVY, isTextBox: true });
    s.addText(c[1], { x: x + 0.3, y: 3.85, w: 3.4, h: 1.3, fontFace: FONT_BODY, fontSize: 13, color: GREY, isTextBox: true, lineSpacingMultiple: 1.2 });
    x += 4.2;
  });

  s.addText("Meta: um único fluxo de análise (“Sistema de Predição Multicomponente”) capaz de responder “o quê” e “quanto”, ao mesmo tempo.", {
    x: 0.6, y: 5.55, w: 12.1, h: 0.6, fontFace: FONT_BODY, italic: true, fontSize: 14, color: TEAL, isTextBox: true,
  });

  footer(s, "3");
}

// ---------- SLIDE 4: MATERIAIS E CONFIGURAÇÃO EXPERIMENTAL ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Metodologia · Parte 1", "Materiais e configuração experimental");

  s.addText("Reagentes e eletrodos", { x: 0.6, y: 1.6, w: 6, h: 0.4, fontFace: FONT_BODY, fontSize: 16, bold: true, color: DEEPBLUE, isTextBox: true });
  const mat = [
    "Pós de AA, UA e DA (fornecedores químicos da China)",
    "Solução tampão 1×PBS, 0,1 mol L⁻¹",
    "Água deionizada",
    "Eletrodo de trabalho e contra-eletrodo em pasta de carbono",
    "Eletrodo de referência Ag/AgCl",
  ];
  s.addText(mat.map((t, i) => ({ text: t, options: { bullet: { code: "2022" }, breakLine: i < mat.length - 1, color: GREY, fontSize: 13.5 } })), {
    x: 0.6, y: 2.05, w: 6.1, h: 2.2, fontFace: FONT_BODY, isTextBox: true, lineSpacingMultiple: 1.3,
  });

  s.addText("Sistema de detecção (DPV)", { x: 0.6, y: 4.35, w: 6, h: 0.4, fontFace: FONT_BODY, fontSize: 16, bold: true, color: DEEPBLUE, isTextBox: true });
  const dpv = [
    "Potenciostato portátil EmStat Pico (3 eletrodos) + software PSTrace 5.8",
    "Faixa de potencial: −1 V a 1 V · passo: 0,01 V · varredura: 0,25 V/s",
  ];
  s.addText(dpv.map((t, i) => ({ text: t, options: { bullet: { code: "2022" }, breakLine: i < dpv.length - 1, color: GREY, fontSize: 13.5 } })), {
    x: 0.6, y: 4.8, w: 6.1, h: 1.2, fontFace: FONT_BODY, isTextBox: true, lineSpacingMultiple: 1.3,
  });

  // right stat callouts
  const stats = [
    ["728", "soluções testadas"],
    ["8", "níveis de concentração\n(50–1000 µmol/L)"],
    ["3", "componentes:\nUA · DA · AA"],
  ];
  let sy = 1.75;
  stats.forEach((st) => {
    s.addShape("roundRect", { x: 8.35, y: sy, w: 4.3, h: 1.5, rectRadius: 0.1, fill: { color: NAVY } });
    s.addText(st[0], { x: 8.55, y: sy + 0.12, w: 1.6, h: 1.25, fontFace: FONT_HEAD, fontSize: 40, bold: true, color: WHITE, valign: "middle", isTextBox: true });
    s.addText(st[1], { x: 10.1, y: sy + 0.12, w: 2.4, h: 1.25, fontFace: FONT_BODY, fontSize: 13, color: ICEBLUE, valign: "middle", isTextBox: true, lineSpacingMultiple: 1.15 });
    sy += 1.7;
  });

  footer(s, "4");
}

// ---------- SLIDE 5: FLUXO METODOLÓGICO ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Metodologia · Parte 2", "Fluxo de processamento e modelagem");

  const steps = [
    ["Aquisição", "Curvas DPV de soluções únicas, binárias e ternárias"],
    ["Suavização", "Filtro Savitzky-Golay remove ruído mantendo os picos"],
    ["Normalização", "Min-Max, por escala linear entre atributos"],
    ["Seleção de atributos", "SelectKBest (f_classif) para classificação; feature_importances para regressão"],
    ["Modelagem", "5 classificadores + 2 regressores (multi-saída)"],
  ];

  let x = 0.6;
  const w = 2.36;
  steps.forEach((st, i) => {
    const color = i % 2 === 0 ? DEEPBLUE : TEAL;
    s.addShape("roundRect", { x, y: 2.1, w: w - 0.15, h: 2.9, rectRadius: 0.1, fill: { color: LIGHTBG }, line: { color: ICEBLUE, width: 1 } });
    iconCircle(s, x + (w - 0.15) / 2 - 0.3, 2.35, 0.6, color, String(i + 1), WHITE, 20);
    s.addText(st[0], { x: x + 0.08, y: 3.15, w: w - 0.3, h: 0.6, align: "center", fontFace: FONT_BODY, bold: true, fontSize: 13.5, color: NAVY, isTextBox: true });
    s.addText(st[1], { x: x + 0.08, y: 3.75, w: w - 0.3, h: 1.15, align: "center", fontFace: FONT_BODY, fontSize: 10.5, color: GREY, isTextBox: true, lineSpacingMultiple: 1.15 });
    if (i < steps.length - 1) {
      s.addText("→", { x: x + w - 0.2, y: 2.9, w: 0.35, h: 0.5, align: "center", fontFace: FONT_BODY, fontSize: 22, bold: true, color: TEAL, isTextBox: true });
    }
    x += w;
  });

  s.addText("Os dois ramos (classificação e regressão) usam a mesma curva pré-processada, mas seleções de atributos distintas, e são avaliados em conjunto.", {
    x: 0.6, y: 5.45, w: 12.1, h: 0.7, fontFace: FONT_BODY, italic: true, fontSize: 13, color: GREY, isTextBox: true, lineSpacingMultiple: 1.2,
  });

  footer(s, "5");
}

// ---------- SLIDE 6: DATASET ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Metodologia · Dataset", "728 soluções cobrindo todas as combinações");

  s.addText(
    "Foram usadas 8 concentrações-gradiente (50, 100, 200, 400, 500, 600, 800 e 1000 µmol/L) para cada componente, " +
    "combinadas de forma cruzada para gerar soluções únicas, binárias (UA+AA, UA+DA, DA+AA) e ternárias (UA+DA+AA), " +
    "resultando em 7 categorias de solução e 728 amostras no total.",
    { x: 0.6, y: 1.6, w: 12.1, h: 1.1, fontFace: FONT_BODY, fontSize: 14, color: GREY, isTextBox: true, lineSpacingMultiple: 1.3 }
  );

  const cats = [
    ["Único componente", "3 categorias", "UA · DA · AA"],
    ["Binário", "3 categorias", "UA+AA · UA+DA · DA+AA"],
    ["Ternário", "1 categoria", "UA + DA + AA"],
  ];
  let x = 0.6;
  cats.forEach((c) => {
    s.addShape("roundRect", { x, y: 3.0, w: 3.95, h: 1.9, rectRadius: 0.1, fill: { color: DEEPBLUE } });
    s.addText(c[0], { x: x + 0.25, y: 3.15, w: 3.5, h: 0.4, fontFace: FONT_BODY, bold: true, fontSize: 15, color: WHITE, isTextBox: true });
    s.addText(c[1], { x: x + 0.25, y: 3.55, w: 3.5, h: 0.5, fontFace: FONT_HEAD, bold: true, fontSize: 22, color: ICEBLUE, isTextBox: true });
    s.addText(c[2], { x: x + 0.25, y: 4.15, w: 3.5, h: 0.6, fontFace: FONT_BODY, fontSize: 12, color: ICEBLUE, isTextBox: true });
    x += 4.2;
  });

  s.addText("Divisão treino/teste: 70% / 30%  ·  219 amostras de teste no total", {
    x: 0.6, y: 5.15, w: 12.1, h: 0.5, fontFace: FONT_BODY, bold: true, fontSize: 14, color: NAVY, isTextBox: true,
  });
  s.addText("Faixas fisiológicas de referência: UA ≈ 65–670 µmol/L · AA ≈ 50–80 µmol/L · DA ≈ 0,1–20 µmol/L em fluidos corporais.", {
    x: 0.6, y: 5.65, w: 12.1, h: 0.6, fontFace: FONT_BODY, italic: true, fontSize: 12, color: GREY, isTextBox: true,
  });

  footer(s, "6");
}

// ---------- SLIDE 7: MODELOS DE CLASSIFICAÇÃO + GRÁFICO ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Resultados · Classificação", "ANN foi o modelo mais preciso (94,06%)");

  s.addText("5 algoritmos testados para identificar quais componentes estão na solução (7 classes):", {
    x: 0.6, y: 1.55, w: 6.0, h: 0.6, fontFace: FONT_BODY, fontSize: 13, color: GREY, isTextBox: true, lineSpacingMultiple: 1.2,
  });

  const models = [
    ["ANN", "Rede neural artificial — melhor desempenho geral"],
    ["SVM", "Hiperplano de máxima margem"],
    ["KNN", "Vizinhos mais próximos"],
    ["RF", "Floresta aleatória de árvores"],
    ["NB", "Naive Bayes — pior desempenho"],
  ];
  let y = 2.25;
  models.forEach((m) => {
    s.addText(m[0], { x: 0.6, y, w: 1.0, h: 0.5, fontFace: FONT_HEAD, bold: true, fontSize: 15, color: DEEPBLUE, isTextBox: true });
    s.addText(m[1], { x: 1.65, y: y + 0.03, w: 4.6, h: 0.5, fontFace: FONT_BODY, fontSize: 11.5, color: GREY, isTextBox: true });
    y += 0.72;
  });

  s.addChart(pres.ChartType.bar, [
    {
      name: "Acurácia (%)",
      labels: ["NB", "RF", "KNN", "SVM", "ANN"],
      values: [78.1, 88.5, 89.0, 91.6, 94.1],
    },
  ], {
    x: 6.9, y: 1.6, w: 5.9, h: 4.5,
    barDir: "col",
    chartColors: [TEAL],
    showTitle: true, title: "Acurácia de classificação (conjunto de teste)", titleFontFace: FONT_BODY, titleFontSize: 13, titleColor: NAVY,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 11, dataLabelColor: NAVY, dataLabelFormatCode: "0.0",
    catAxisLabelFontFace: FONT_BODY, catAxisLabelColor: GREY, catAxisLabelFontSize: 12,
    valAxisLabelFontFace: FONT_BODY, valAxisLabelColor: GREY, valAxisMinVal: 0, valAxisMaxVal: 100,
    valGridLine: { color: ICEBLUE, size: 1 }, catGridLine: { style: "none" },
    showLegend: false,
  });
  s.addText("Valores aproximados a partir dos erros reportados em 219 amostras de teste (Fig. 6).", {
    x: 6.9, y: 6.15, w: 5.9, h: 0.4, fontFace: FONT_BODY, italic: true, fontSize: 10, color: GREY, isTextBox: true,
  });

  footer(s, "7");
}

// ---------- SLIDE 8: MODELOS DE REGRESSÃO + GRÁFICO ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Resultados · Regressão", "XGBoost teve o melhor ajuste (R² médio de 96,2%)");

  s.addText(
    "Depois de saber quais componentes estão presentes, os modelos de regressão preveem a concentração de cada um " +
    "(MultiOutputRegressor, já que são 3 valores correlacionados simultâneos).",
    { x: 0.6, y: 1.55, w: 6.0, h: 1.0, fontFace: FONT_BODY, fontSize: 13, color: GREY, isTextBox: true, lineSpacingMultiple: 1.25 }
  );

  const rstats = [
    ["XGBoost", "96,2%", "R² médio (melhor modelo)"],
    ["Random Forest", "95,9%", "R² médio (0,3 p.p. abaixo)"],
    ["UA (XGBoost)", "98,4%", "componente mais previsível"],
  ];
  let y = 2.7;
  rstats.forEach((r) => {
    s.addShape("roundRect", { x: 0.6, y, w: 5.7, h: 0.95, rectRadius: 0.08, fill: { color: LIGHTBG }, line: { color: ICEBLUE, width: 1 } });
    s.addText(r[1], { x: 0.75, y: y + 0.08, w: 1.6, h: 0.8, fontFace: FONT_HEAD, bold: true, fontSize: 24, color: DEEPBLUE, valign: "middle", isTextBox: true });
    s.addText(r[0], { x: 2.4, y: y + 0.08, w: 3.7, h: 0.4, fontFace: FONT_BODY, bold: true, fontSize: 13, color: NAVY, isTextBox: true });
    s.addText(r[2], { x: 2.4, y: y + 0.45, w: 3.7, h: 0.4, fontFace: FONT_BODY, fontSize: 11, color: GREY, isTextBox: true });
    y += 1.1;
  });

  s.addChart(pres.ChartType.bar, [
    { name: "XGBoost", labels: ["AA", "DA", "UA"], values: [93.9, 96.3, 98.4] },
    { name: "Random Forest", labels: ["AA", "DA", "UA"], values: [93.3, 95.2, 97.3] },
  ], {
    x: 6.9, y: 1.6, w: 5.9, h: 4.5,
    barDir: "col", barGrouping: "clustered",
    chartColors: [DEEPBLUE, TEAL],
    showTitle: true, title: "R² por componente", titleFontFace: FONT_BODY, titleFontSize: 13, titleColor: NAVY,
    showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 9.5, dataLabelColor: NAVY, dataLabelFormatCode: "0.0",
    catAxisLabelFontFace: FONT_BODY, catAxisLabelColor: GREY, catAxisLabelFontSize: 12,
    valAxisLabelFontFace: FONT_BODY, valAxisLabelColor: GREY, valAxisMinVal: 80, valAxisMaxVal: 100,
    valGridLine: { color: ICEBLUE, size: 1 }, catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendFontFace: FONT_BODY, legendFontSize: 11, legendColor: GREY,
  });

  footer(s, "8");
}

// ---------- SLIDE 9: TABELA COMPARATIVA (Table 1 do artigo) ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Resultados · Síntese", "Quando usar cada modelo (Tabela 1 do artigo)");

  const header = ["Modelo", "Tarefa ideal", "Ponto forte", "Limitação"];
  const data = [
    ["ANN\n(classificação)", "Classificação multicomponente (separar UA, AA, DA)", "Modelagem não linear e extração automática de atributos", "Alta exigência de dados"],
    ["RF\n(classif./regressão)", "Regressão e análise de importância de atributos em amostras pequenas", "Resistente a overfitting e interpretável", "Fraco em sinais contínuos; maior custo computacional"],
    ["XGBoost\n(regressão)", "Predição de concentração de alta precisão", "Eficiente, flexível, com regularização", "Sensível a hiperparâmetros; consome mais memória"],
  ];

  const rows = [header.map((h) => ({ text: h, options: { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: 12.5, align: "left" } }))];
  data.forEach((r, i) => {
    const fill = i % 2 === 0 ? LIGHTBG : WHITE;
    rows.push(r.map((c, j) => ({
      text: c,
      options: { color: j === 0 ? DEEPBLUE : GREY, bold: j === 0, fill: { color: fill }, fontSize: 11.5, align: "left", valign: "middle" },
    })));
  });

  s.addTable(rows, {
    x: 0.6, y: 1.65, w: 12.1, h: 4.4,
    colW: [2.1, 3.7, 3.4, 2.9],
    fontFace: FONT_BODY,
    border: { type: "solid", color: ICEBLUE, pt: 0.75 },
    autoPage: false,
    valign: "middle",
    rowH: [0.6, 1.25, 1.25, 1.25],
  });

  s.addText("Fonte: adaptado da Tabela 1 do artigo original.", {
    x: 0.6, y: 6.25, w: 8, h: 0.4, fontFace: FONT_BODY, italic: true, fontSize: 10.5, color: GREY, isTextBox: true,
  });

  footer(s, "9");
}

// ---------- SLIDE 10: PONTOS FORTES ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Avaliação crítica", "Pontos fortes do estudo");

  const strengths = [
    ["Sem modificação de eletrodo", "Usa eletrodo de carbono comum, reduzindo custo, tempo e complexidade frente às abordagens da literatura (ex.: nanocompósitos, grafeno dopado)."],
    ["Alta acurácia nas duas tarefas", "94,06% de acurácia na classificação (ANN) e 96,2% de R² médio na regressão (XGBoost)."],
    ["Dataset grande e sistemático", "728 soluções cobrindo combinações únicas, binárias e ternárias, em 8 concentrações-gradiente."],
    ["Abordagem qualitativa + quantitativa integrada", "Combina classificação (o quê) e regressão (quanto) num único fluxo de análise."],
    ["Pipeline de pré-processamento robusto", "Suavização Savitzky-Golay, normalização Min-Max e seleção de atributos reduzem ruído e dimensionalidade."],
    ["Comparação ampla de algoritmos", "Cinco classificadores testados e comparados com múltiplas métricas (acurácia, precisão, recall, F1)."],
  ];

  let x = 0.6, y = 1.6;
  strengths.forEach((st, i) => {
    if (i === 3) { x = 6.9; y = 1.6; }
    iconCircle(s, x, y, 0.42, TEAL, "✓", WHITE, 16);
    s.addText(st[0], { x: x + 0.6, y: y - 0.06, w: 5.4, h: 0.35, fontFace: FONT_BODY, bold: true, fontSize: 13.5, color: NAVY, isTextBox: true });
    s.addText(st[1], { x: x + 0.6, y: y + 0.28, w: 5.4, h: 0.85, fontFace: FONT_BODY, fontSize: 11, color: GREY, isTextBox: true, lineSpacingMultiple: 1.2 });
    y += 1.6;
  });

  footer(s, "10");
}

// ---------- SLIDE 11: PONTOS FRACOS ----------
{
  const s = pres.addSlide();
  lightBg(s);
  sectionTitle(s, "Avaliação crítica", "Limitações do estudo");

  const weaknesses = [
    ["Forte desbalanceamento de classes", "Apenas 8 amostras por classe para soluções únicas, contra 512 para a solução ternária — prejudicou o RF e possivelmente outros modelos."],
    ["Dataset pequeno para uma ANN", "728 amostras é um volume moderado para redes neurais; há risco de overfitting mesmo com bom desempenho no teste."],
    ["Só soluções sintéticas (PBS)", "Não há validação em amostras biológicas reais (urina, soro, suor), que têm mais interferentes químicos."],
    ["Sem validação cruzada explícita", "O estudo usa um único split treino/teste (70/30), sem k-fold ou repetição para checar estabilidade dos resultados."],
    ["ANN pouco interpretável", "O melhor modelo de classificação é o mais “caixa-preta”, dificultando explicar por que uma amostra foi classificada de certa forma."],
    ["Sem comparação de limite de detecção (LOD)", "Não é comparado o LOD desta abordagem com o de sensores modificados da literatura, deixando em aberto se há perda de sensibilidade."],
  ];

  let x = 0.6, y = 1.6;
  weaknesses.forEach((w, i) => {
    if (i === 3) { x = 6.9; y = 1.6; }
    iconCircle(s, x, y, 0.42, "B85042", "!", WHITE, 16);
    s.addText(w[0], { x: x + 0.6, y: y - 0.06, w: 5.4, h: 0.35, fontFace: FONT_BODY, bold: true, fontSize: 13.5, color: NAVY, isTextBox: true });
    s.addText(w[1], { x: x + 0.6, y: y + 0.28, w: 5.4, h: 0.95, fontFace: FONT_BODY, fontSize: 11, color: GREY, isTextBox: true, lineSpacingMultiple: 1.2 });
    y += 1.6;
  });

  footer(s, "11");
}

// ---------- SLIDE 12: CONCLUSÃO ----------
{
  const s = pres.addSlide();
  darkBg(s);
  s.addShape("ellipse", { x: -1.5, y: -1.5, w: 4.5, h: 4.5, fill: { color: DEEPBLUE, transparency: 60 }, line: { type: "none" } });
  s.addShape("ellipse", { x: 11.5, y: 5.2, w: 3.5, h: 3.5, fill: { color: TEAL, transparency: 55 }, line: { type: "none" } });

  s.addText("CONCLUSÃO", { x: 0.9, y: 0.7, w: 6, h: 0.4, fontFace: FONT_BODY, fontSize: 13, color: ICEBLUE, bold: true, charSpacing: 2, isTextBox: true });
  s.addText("Um Sistema de Predição\nMulticomponente (ANN + XGBoost)", {
    x: 0.9, y: 1.1, w: 9.5, h: 1.5, fontFace: FONT_HEAD, fontSize: 32, bold: true, color: WHITE, isTextBox: true, lineSpacingMultiple: 1.1,
  });

  const concl = [
    "Classifica (ANN, 94,06%) e quantifica (XGBoost, R² = 96,2%) UA, DA e AA em soluções com picos sobrepostos.",
    "Elimina a necessidade de eletrodos modificados, reduzindo custo e complexidade do sensor.",
    "Mostra que machine learning pode substituir engenharia de material por engenharia de dados na detecção eletroquímica.",
    "Próximo passo natural: validar com amostras biológicas reais e balancear melhor as classes do dataset.",
  ];
  s.addText(concl.map((t, i) => ({ text: t, options: { bullet: { code: "2022" }, breakLine: i < concl.length - 1, color: ICEBLUE, fontSize: 15 } })), {
    x: 0.9, y: 2.85, w: 10.8, h: 3.5, fontFace: FONT_BODY, isTextBox: true, lineSpacingMultiple: 1.4,
  });

  footer(s, "12");
}

pres.writeFile({ fileName: "/home/claude/pptx_work/output.pptx" }).then(() => {
  console.log("done");
});
