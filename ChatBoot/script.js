/* ══════════════════════════════════════════════
   FLUXO DE DIÁLOGO — Árvore de triagem
   Cada nó: { id, msg, options?, next?, result? }
══════════════════════════════════════════════ */
const FLOW = {
  start: {
    msg: "Olá! 👋 Sou o assistente digital de saúde do PET Saúde Digital.\n\nEstou aqui para ajudar você a entender quais formas de prevenção são mais indicadas para o seu perfil.\n\n<strong>Suas respostas são 100% anônimas.</strong> Vamos começar?",
    options: [
      { label: "Sim, vamos começar!", next: "q_ativo" },
      { label: "Quero saber mais antes", next: "saiba_mais" }
    ]
  },
 
  saiba_mais: {
    msg: "Claro! Este é um serviço de <strong>triagem orientativa</strong> — não substitui consulta médica.\n\nAs perguntas são sobre comportamentos e exposições de risco para te ajudar a entender se a <strong>PrEP</strong> (Profilaxia Pré-Exposição ao HIV), a <strong>PEP</strong> ou outros métodos podem ser indicados para você.\n\nNenhuma resposta é salva. Ao fechar, tudo é apagado.",
    options: [
      { label: "Entendi, vamos começar!", next: "q_ativo" },
      { label: "Sair", next: "sair" }
    ]
  },
 
  sair: {
    msg: "Tudo bem! Se precisar, é só voltar. Cuide-se. 💚",
    options: []
  },
 
  q_ativo: {
    progress: 15,
    msg: "Nos últimos <strong>6 meses</strong>, você teve relações sexuais?",
    options: [
      { label: "Sim", next: "q_preservativo" },
      { label: "Não", next: "desfecho_baixo_risco" }
    ]
  },
 
  q_preservativo: {
    progress: 30,
    msg: "Nessas relações, você usou <strong>preservativo em todas elas</strong>?",
    options: [
      { label: "Sim, sempre", next: "q_multiplos_sem" },
      { label: "Às vezes / nunca", next: "q_multiplos" }
    ]
  },
 
  q_multiplos_sem: {
    progress: 45,
    msg: "Você teve relações com <strong>mais de uma pessoa parceira</strong> nos últimos 6 meses?",
    options: [
      { label: "Sim", next: "q_parceiro_status" },
      { label: "Não, apenas uma", next: "q_parceiro_status_fixo" }
    ]
  },
 
  q_multiplos: {
    progress: 45,
    msg: "Você teve relações <strong>sem preservativo</strong> com múltiplas pessoas parceiras?",
    options: [
      { label: "Sim", next: "q_pep" },
      { label: "Só com uma parceria fixa", next: "q_parceiro_status_fixo" }
    ]
  },
 
  q_parceiro_status_fixo: {
    progress: 60,
    msg: "Você sabe o <strong>status sorológico</strong> (resultado do teste de HIV) da sua parceria?",
    options: [
      { label: "Sim, é negativo e em tratamento", next: "desfecho_baixo_risco" },
      { label: "Sim, é positivo sem tratamento", next: "desfecho_prep_indicado" },
      { label: "Não sei / não testou", next: "q_pep" }
    ]
  },
 
  q_parceiro_status: {
    progress: 60,
    msg: "Alguma de suas parcerias é <strong>soropositiva para HIV</strong> ou tem status desconhecido?",
    options: [
      { label: "Sim", next: "desfecho_prep_indicado" },
      { label: "Não / não sei", next: "q_pep" }
    ]
  },
 
  q_pep: {
    progress: 75,
    msg: "Você já fez uso da <strong>PEP</strong> (profilaxia pós-exposição) mais de uma vez nos últimos 12 meses?",
    options: [
      { label: "Sim", next: "desfecho_prep_indicado" },
      { label: "Não", next: "q_ist" }
    ]
  },
 
  q_ist: {
    progress: 88,
    msg: "Você teve alguma <strong>IST</strong> (infecção sexualmente transmissível, como sífilis, gonorreia ou clamídia) nos últimos 6 meses?",
    options: [
      { label: "Sim", next: "desfecho_prep_indicado" },
      { label: "Não", next: "desfecho_prevencao_combinada" }
    ]
  },
 
  /* ── Desfechos ── */
  desfecho_prep_indicado: {
    progress: 100,
    msg: "Com base nas suas respostas, a <strong>PrEP pode ser indicada para você</strong>.",
    result: {
      type: "positive",
      title: "PrEP pode ser uma ótima aliada",
      body: "Você apresenta critérios de elegibilidade para a PrEP. Procure o HEHA ou a Unidade de Saúde mais próxima para avaliação médica gratuita. O SUS oferece a PrEP sem custo.\n\n📍 HEHA — Hospital Escola Dr. Helvio Auto\n📞 Ligue para a unidade e informe que quer agendar avaliação para PrEP."
    },
    options: [
      { label: "O que é a PrEP?", next: "info_prep" },
      { label: "Onde encontrar a PrEP em Maceió?", next: "info_locais_prep" },
      { label: "Como chegar ao HEHA?", next: "info_heha" },
      { label: "Recomeçar triagem", next: "start" }
    ]
  },
 
  desfecho_prevencao_combinada: {
    progress: 100,
    msg: "Seu perfil atual indica <strong>risco moderado</strong>. A prevenção combinada é a melhor estratégia para você.",
    result: {
      type: "info",
      title: "Prevenção combinada é o caminho",
      body: "Você usa preservativo, o que é ótimo! Para maior proteção, combine com testagem regular para HIV e ISTs (recomendada a cada 3–6 meses) e conheça outros métodos.\n\nA testagem rápida gratuita está disponível no HEHA e nas UBSs."
    },
    options: [
      { label: "Onde testar gratuitamente?", next: "info_testagem" },
      { label: "Outros métodos de prevenção", next: "info_outros" },
      { label: "Recomeçar triagem", next: "start" }
    ]
  },
 
  desfecho_baixo_risco: {
    progress: 100,
    msg: "Com base nas suas respostas, você apresenta <strong>baixo risco atual</strong>.",
    result: {
      type: "info",
      title: "Continue se cuidando",
      body: "Manter o uso regular de preservativo é fundamental. Mesmo com baixo risco, a testagem periódica para HIV e ISTs é recomendada.\n\nSe sua situação mudar, você pode refazer a triagem a qualquer momento."
    },
    options: [
      { label: "Onde testar gratuitamente?", next: "info_testagem" },
      { label: "Recomeçar triagem", next: "start" }
    ]
  },
 
  /* ── Informativos ── */
  info_prep: {
    msg: "A <strong>PrEP (Profilaxia Pré-Exposição)</strong> é um medicamento antirretroviral tomado diariamente por pessoas HIV negativas que apresentam risco substancial de infecção.\n\nQuando tomada corretamente, reduz o risco de infecção pelo HIV em mais de <strong>99%</strong>. É gratuita pelo SUS.",
    options: [
      { label: "Como conseguir a PrEP?", next: "info_heha" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
 
  info_heha: {
    msg: "O <strong>HEHA</strong> (Hospital Escola Dr. Helvio Auto) dispensa PrEP e realiza acompanhamento gratuito.\n\n📍 Rua Cônego Fernando Lyra, s/n — Trapiche da Barra, Maceió-AL\n🕐 Segunda a sexta, horário comercial\n\nLeve RG e Cartão SUS. Não é preciso encaminhamento para solicitar avaliação de PrEP.",
    options: [
      { label: "Contato do SAE", next: "info_sae" },
      { label: "Outros métodos", next: "info_outros" },
      { label: "Recomeçar triagem", next: "start" }
    ]
  },
 
  info_locais_prep: {
    msg: "A PrEP está disponível <strong>gratuitamente pelo SUS</strong> em vários locais de Maceió:\n\n📍 <strong>PAM Salgadinho</strong> — Bloco I (Poço)\n📍 <strong>UBS Telessaúde Caetés</strong> (Benedito Bentes)\n📍 <strong>URS Hamilton Falcão</strong> (Benedito Bentes)\n📍 <strong>UBS Tereza Barbosa</strong> (Eustáquio Gomes)\n📍 <strong>UBS Felício Napoleão</strong> (Aldeia do Índio)\n📍 <strong>UBS José Araújo</strong> (Jacintinho)\n📍 <strong>Clínica da Família Dr. João Fireman</strong> (Jacintinho)\n📍 <strong>UBS Osvaldo Brandão Vilela</strong> (Ponta da Terra)\n📍 <strong>SAE Dr. Marcelo Constant</strong> (Trapiche)\n📍 <strong>HEHA</strong> — Hospital Escola Dr. Helvio Auto (Trapiche da Barra)\n\nProcure a unidade mais próxima de você! Leve RG e Cartão SUS.",
    options: [
      { label: "Contato do SAE (Trapiche)", next: "info_sae" },
      { label: "Como chegar ao HEHA?", next: "info_heha" },
      { label: "Recomeçar triagem", next: "start" }
    ]
  },

  info_sae: {
    msg: "O <strong>SAE</strong> (Serviço de Assistência Especializada Dr. Marcelo Constant) atende pacientes com HIV/Aids, hepatites B e C e HTLV.\n\n📞 (82) 3315-3244\n📍 Rua Cônego Fernando Lyra, nº 10 — Trapiche da Barra, Maceió-AL\n🕐 Segunda a sexta, das 7h às 18h\n\nO atendimento é feito por equipe multiprofissional: médicos infectologistas, enfermeira, psicóloga, nutricionista e assistentes sociais.\n\n⚠️ É necessário agendamento prévio.",
    options: [
      { label: "Outros locais de PrEP em Maceió", next: "info_locais_prep" },
      { label: "Como chegar ao HEHA?", next: "info_heha" },
      { label: "Recomeçar triagem", next: "start" }
    ]
  },
 
  info_testagem: {
    msg: "A testagem rápida gratuita para HIV, sífilis e hepatites está disponível em:\n\n• <strong>HEHA</strong> — Rua Cônego Fernando Lyra, s/n, Trapiche da Barra, Maceió-AL\n• <strong>UBSs</strong> — Unidades Básicas de Saúde do seu bairro\n• <strong>CTA</strong> — Centro de Testagem e Aconselhamento\n\nO resultado sai em minutos. Não precisa agendar na maioria dos locais.",
    options: [
      { label: "Recomeçar triagem", next: "start" }
    ]
  },
 
  info_outros: {
    msg: "A <strong>prevenção combinada</strong> usa vários métodos juntos:\n\n🔵 Preservativo masculino e feminino\n🟢 PrEP (para quem tem risco substancial)\n🟡 PEP (após exposição de risco)\n🟣 Testagem regular para HIV e ISTs\n🟤 Vacinação (hepatite B, HPV)\n\nConverse com um profissional de saúde para montar seu plano.",
    options: [
      { label: "Recomeçar triagem", next: "start" }
    ]
  }
};
 
/* ══════════════════════════════════════════════
   ESTADO
══════════════════════════════════════════════ */
let currentNode = "start";
let chatHistory = [];
let isTyping = false;
 
/* ══════════════════════════════════════════════
   INICIALIZAÇÃO
══════════════════════════════════════════════ */
function startChat() {
  document.getElementById("splash").classList.add("hide");
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    restoreOrInit();
  }, 500);
}
 
function restoreOrInit() {
  const saved = localStorage.getItem("pet_chat_node");
  if (saved && FLOW[saved]) {
    currentNode = saved;
    const savedHistory = localStorage.getItem("pet_chat_history");
    if (savedHistory) {
      chatHistory = JSON.parse(savedHistory);
      renderHistory();
    }
    showNode(currentNode, false);
  } else {
    showNode("start");
  }
}
 
/* ══════════════════════════════════════════════
   RENDERIZAÇÃO DE HISTÓRICO
══════════════════════════════════════════════ */
function renderHistory() {
  const el = document.getElementById("messages");
  el.innerHTML = "";
  chatHistory.forEach(item => {
    if (item.type === "bot") {
      appendBotBubble(item.text, item.result, false);
    } else {
      appendUserBubble(item.text, false);
    }
  });
}
 
/* ══════════════════════════════════════════════
   FLUXO PRINCIPAL
══════════════════════════════════════════════ */
function showNode(nodeId, animate = true) {
  const node = FLOW[nodeId];
  if (!node) return;
  currentNode = nodeId;
 
  if (typeof node.progress !== "undefined") {
    const pf = document.getElementById('progress-fill');
    pf.style.width = node.progress + '%';
    document.getElementById('progress-bar').setAttribute('aria-valuenow', node.progress);
  }
 
  hideQuickReplies();
 
  if (animate) {
    showTyping();
    const delay = 800 + (node.msg.length * 1.5);
    setTimeout(() => {
      removeTyping();
      appendBotBubble(node.msg, node.result);
      chatHistory.push({ type: "bot", text: node.msg, result: node.result || null });
      saveState();
      setTimeout(() => showOptions(node), 300);
    }, Math.min(delay, 2200));
  } else {
    appendBotBubble(node.msg, node.result, false);
    showOptions(node, false);
  }
}
 
function showOptions(node, animate = true) {
  if (!node.options || node.options.length === 0) return;
 
  const area = document.getElementById("quick-area");
  const grid = document.getElementById("qr-grid");
  grid.innerHTML = "";
 
  if (node.options.length === 1) {
    grid.className = "qr-grid single";
  } else {
    grid.className = "qr-grid";
  }
 
  node.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "qr-btn" + (opt.danger ? " danger" : "");
    btn.textContent = opt.label;
    btn.onclick = () => selectOption(opt);
    grid.appendChild(btn);
  });
 
  area.style.display = "flex";
  scrollBottom();
}
 
function selectOption(opt) {
  hideQuickReplies();
  appendUserBubble(opt.label);
  chatHistory.push({ type: "user", text: opt.label });
  saveState();
  setTimeout(() => showNode(opt.next), 200);
}
 
/* ══════════════════════════════════════════════
   TEXTO LIVRE
══════════════════════════════════════════════ */
function sendFreeText() {
  const txt = document.getElementById("txt");
  const val = txt.value.trim();
  if (!val) return;
  txt.value = "";
  txt.style.height = "";
 
  appendUserBubble(val);
  chatHistory.push({ type: "user", text: val });
  saveState();
 
  hideQuickReplies();
  showTyping();
 
  setTimeout(() => {
    removeTyping();
    const reply = getFreeReply(val);
    appendBotBubble(reply);
    chatHistory.push({ type: "bot", text: reply });
    const node = FLOW[currentNode];
    if (node && node.options && node.options.length > 0) {
      setTimeout(() => showOptions(node), 300);
    }
  }, 900);
}
 
function getFreeReply(text) {
  const t = text.toLowerCase();
  if (t.includes("prep") || t.includes("profilax"))
    return "A PrEP (Profilaxia Pré-Exposição) é um medicamento tomado diariamente por pessoas HIV negativas com risco substancial de infecção. Quando usada corretamente, reduz o risco de HIV em mais de 99%. É gratuita pelo SUS em vários locais de Maceió: PAM Salgadinho (Poço), UBS Telessaúde Caetés e URS Hamilton Falcão (Benedito Bentes), UBS Tereza Barbosa (Eustáquio Gomes), UBS Felício Napoleão (Aldeia do Índio), UBS José Araújo e Clínica da Família Dr. João Fireman (Jacintinho), UBS Osvaldo Brandão Vilela (Ponta da Terra), SAE Dr. Marcelo Constant e HEHA (Trapiche).";
  if (t.includes("pep"))
    return "A PEP (Profilaxia Pós-Exposição) deve ser iniciada em até 72h após uma exposição de risco. Quanto antes, mais eficaz. Procure uma UPA ou o HEHA imediatamente se precisar — é gratuita pelo SUS.";
  if (t.includes("hiv") || t.includes("aids"))
    return "O HIV é um vírus que afeta o sistema imunológico. Com tratamento adequado, pessoas vivendo com HIV têm qualidade de vida plena. A PrEP previne a infecção em pessoas HIV negativas. Testagem gratuita disponível no HEHA e UBSs.";
  if (t.includes("sifil") || t.includes("gonor") || t.includes("clam") || t.includes("ist") || t.includes("dst"))
    return "ISTs como sífilis, gonorreia e clamídia têm tratamento eficaz pelo SUS. A testagem regular é fundamental — recomendada a cada 3 a 6 meses. Disponível gratuitamente no HEHA e nas UBSs de Maceió.";
  if (t.includes("sae") || t.includes("assistência especializada") || t.includes("marcelo constant"))
    return "O SAE (Serviço de Assistência Especializada Dr. Marcelo Constant) atende pacientes com HIV/Aids, hepatites B e C e HTLV. Fica na Rua Cônego Fernando Lyra, nº 10, Trapiche da Barra, Maceió-AL. Funciona de segunda a sexta, das 7h às 18h. Telefone: (82) 3315-3244. É necessário agendamento prévio.";
  if (t.includes("heha") || t.includes("hospital") || t.includes("helvio"))
    return "O HEHA (Hospital Escola Dr. Helvio Auto) fica na Rua Cônego Fernando Lyra, s/n, Trapiche da Barra, Maceió-AL. Oferece PrEP, PEP, testagem rápida e acompanhamento, tudo gratuito pelo SUS. O SAE funciona de segunda a sexta, das 7h às 18h: (82) 3315-3244.";
  if (t.includes("camisinha") || t.includes("preservativo") || t.includes("condom"))
    return "O preservativo continua sendo o método mais eficaz contra HIV e outras ISTs. Use em todas as relações. Disponível gratuitamente nas UBSs e no HEHA.";
  if (t.includes("test") || t.includes("exame"))
    return "A testagem rápida para HIV, sífilis e hepatites é gratuita e o resultado sai em minutos. Disponível no HEHA (Trapiche da Barra, Maceió-AL) e nas Unidades Básicas de Saúde do seu bairro, sem necessidade de agendamento na maioria dos locais.";
  if (t.includes("anoni") || t.includes("privacidade") || t.includes("dado") || t.includes("seguro"))
    return "Sim! Este assistente é 100% anônimo. Nenhuma resposta sua é enviada a servidores externos ou armazenada. Tudo funciona localmente no seu navegador. Ao clicar em 'Limpar', todo o histórico é apagado.";
  return "Entendi sua mensagem! Para que eu possa te orientar melhor, use as opções de resposta abaixo ou refaça as perguntas da triagem. Se tiver dúvidas sobre PrEP, PEP, testagem ou o HEHA, pode digitar essas palavras que te respondo.";
}
 
/* ══════════════════════════════════════════════
   HELPERS DE DOM
══════════════════════════════════════════════ */
function appendBotBubble(text, result, animate = true) {
  const el = document.getElementById("messages");
  const row = document.createElement("div");
  row.className = "msg-row bot";
 
  const av = document.createElement("div");
  av.className = "msg-av";
  av.textContent = "🤖";
 
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "82%";
 
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (!animate) bubble.style.animation = "none";
  bubble.innerHTML = text.replace(/\n/g, "<br>");
  wrap.appendChild(bubble);
 
  if (result) {
    const card = document.createElement("div");
    card.className = "result-card " + result.type;
    card.innerHTML = `<h3>${result.title}</h3>${result.body.replace(/\n/g, "<br>")}`;
    wrap.appendChild(card);
  }
 
  row.appendChild(av);
  row.appendChild(wrap);
  el.appendChild(row);
  scrollBottom();
}
 
function appendUserBubble(text, animate = true) {
  const el = document.getElementById("messages");
  const row = document.createElement("div");
  row.className = "msg-row user";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (!animate) bubble.style.animation = "none";
  bubble.textContent = text;
  row.appendChild(bubble);
  el.appendChild(row);
  scrollBottom();
}
 
function showTyping() {
  if (isTyping) return;
  isTyping = true;
  const el = document.getElementById("messages");
  const row = document.createElement("div");
  row.className = "typing-row";
  row.id = "typing";
 
  const av = document.createElement("div");
  av.className = "msg-av"; av.textContent = "🤖";
 
  const bub = document.createElement("div");
  bub.className = "typing-bubble";
  bub.innerHTML = "<div class='dot'></div><div class='dot'></div><div class='dot'></div>";
 
  row.appendChild(av); row.appendChild(bub);
  el.appendChild(row);
  scrollBottom();
}
 
function removeTyping() {
  isTyping = false;
  const t = document.getElementById("typing");
  if (t) t.remove();
}
 
function hideQuickReplies() {
  document.getElementById("quick-area").style.display = "none";
}
 
function scrollBottom() {
  const el = document.getElementById("messages");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  });
}
 
/* ══════════════════════════════════════════════
   PERSISTÊNCIA (Anonimato garantido)
══════════════════════════════════════════════ */
function saveState() {
  try {
    localStorage.setItem("pet_chat_node", currentNode);
    localStorage.setItem("pet_chat_history", JSON.stringify(chatHistory.slice(-30)));
  } catch(e) {}
}
 
function clearChat() {
  if (!confirm("Limpar todo o histórico desta conversa?")) return;
  try {
    localStorage.removeItem("pet_chat_node");
    localStorage.removeItem("pet_chat_history");
  } catch(e) {}
  chatHistory = [];
  currentNode = "start";
  document.getElementById("messages").innerHTML = "";
  document.getElementById("progress-fill").style.width = "0%";
  hideQuickReplies();
  showNode("start");
}
 
/* ══════════════════════════════════════════════
   TEXTAREA AUTO-RESIZE
══════════════════════════════════════════════ */
const txt = document.getElementById("txt");
txt.addEventListener("input", function() {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 100) + "px";
});
txt.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendFreeText();
  }
});