function syncSlider(val) {
  var n = parseInt(val);
  if (!isNaN(n)) {
    document.getElementById("cd4-slider").value = Math.min(n, 1200);
  }
}
function syncInput(val) {
  document.getElementById("cd4-input").value = val;
}

var vaccines = [
  {
    name: "HPV",
    type: "inativada",
    note: "Segura em qualquer CD4",
    cd4Min: 0,
    alwaysOk: true,
  },
  {
    name: "Hepatite B",
    type: "inativada",
    note: "Checar Anti-HBs após vacinação",
    cd4Min: 0,
    alwaysOk: true,
  },
  {
    name: "Hepatite A",
    type: "inativada",
    note: "Testar Anti-HAV antes",
    cd4Min: 0,
    alwaysOk: true,
  },
  {
    name: "Pneumocócica (PCV13 + PPSV23)",
    type: "inativada",
    note: "Prioritária em PVHIV",
    cd4Min: 0,
    alwaysOk: true,
  },
  {
    name: "Influenza (inativada IM)",
    type: "inativada",
    note: "Dose anual — nunca usar LAIV",
    cd4Min: 0,
    alwaysOk: true,
  },
  {
    name: "dTpa / dT (Tétano/Difteria)",
    type: "inativada",
    note: "Seguir calendário adulto",
    cd4Min: 0,
    alwaysOk: true,
  },
  {
    name: "Meningocócica ACWY",
    type: "inativada",
    note: "Recomendada para PVHIV",
    cd4Min: 0,
    alwaysOk: true,
  },
  {
    name: "Tríplice Viral — MMR",
    type: "viva",
    note: "Contraindicada com CD4 < 200",
    cd4Min: 200,
  },
  {
    name: "Varicela",
    type: "viva",
    note: "Apenas se CD4 ≥ 200 e soronegativo",
    cd4Min: 200,
  },
  {
    name: "Febre Amarela",
    type: "viva",
    note: "CD4 ≥ 200 e avaliação individual",
    cd4Min: 350,
  },
  {
    name: "Dengue (Qdenga)",
    type: "viva",
    note: "Evitar — avaliar com especialista",
    cd4Min: 999,
  },
];

function calcCD4() {
  var raw = document.getElementById("cd4-input").value;
  var cd4 = parseInt(raw);
  if (isNaN(cd4) || cd4 < 0) {
    alert("Por favor, informe um valor de CD4 válido.");
    return;
  }

  var banner = document.getElementById("calc-banner");
  var bannerCd4 = document.getElementById("calc-banner-cd4");
  var bannerMsg = document.getElementById("calc-banner-msg");
  var bannerSvg = document.getElementById("calc-banner-svg");
  var list = document.getElementById("calc-vac-list");
  var result = document.getElementById("calc-result");

  banner.className = "calc-result-banner";
  bannerCd4.textContent = "CD4: " + cd4 + " células/mm³";

  if (cd4 >= 500) {
    banner.classList.add("safe");
    bannerMsg.textContent =
      "Boa imunidade — vacinas vivas permitidas com avaliação.";
    bannerSvg.innerHTML =
      '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>';
  } else if (cd4 >= 200) {
    banner.classList.add("caution");
    bannerMsg.textContent =
      "Imunidade moderada — vacinas vivas com cautela; priorizar inativadas.";
    bannerSvg.innerHTML =
      '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>';
  } else {
    banner.classList.add("danger");
    bannerMsg.textContent =
      "Imunossupressão grave — vacinas vivas CONTRAINDICADAS.";
    bannerSvg.innerHTML =
      '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>';
  }

  list.innerHTML = "";
  vaccines.forEach(function (v) {
    var item = document.createElement("div");
    item.className = "calc-vac-item";
    var statusClass, statusLabel;

    if (v.alwaysOk) {
      statusClass = "ok";
      statusLabel = "✓ Indicada";
    } else if (cd4 >= v.cd4Min) {
      statusClass = "warn";
      statusLabel = "⚠ Com avaliação";
    } else {
      statusClass = "no";
      statusLabel = "✗ Contraindicada";
    }

    item.classList.add(statusClass);
    item.innerHTML =
      '<div class="calc-vac-dot"></div>' +
      '<span><span class="calc-vac-name">' +
      v.name +
      "</span>" +
      (v.type === "viva"
        ? '<em style="font-size:10.5px;opacity:0.65;font-style:normal;">(viva)</em>'
        : "") +
      " — " +
      v.note +
      "</span>" +
      '<span class="calc-vac-note">' +
      statusLabel +
      "</span>";
    list.appendChild(item);
  });

  result.classList.add("show");
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.getElementById("cd4-input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") calcCD4();
});
