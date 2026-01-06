const form = document.getElementById("form-simulador");
const btnLimpar = document.getElementById("btn-limpar");

const secResultado = document.getElementById("resultado");
const spanValorCompra = document.getElementById("res-valor-compra");
const spanTaxa = document.getElementById("res-taxa");
const spanParcelas = document.getElementById("res-parcelas");
const spanParcela = document.getElementById("res-parcela");
const spanTotal = document.getElementById("res-total");
const spanJuros = document.getElementById("res-juros");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const valor = parseFloat(document.getElementById("valor").value);
  const taxa = parseFloat(document.getElementById("taxa").value);
  const parcelas = parseInt(document.getElementById("parcelas").value, 10);

  if (isNaN(valor) || isNaN(taxa) || isNaN(parcelas) || valor <= 0 || taxa < 0 || parcelas <= 0) {
    alert("Preencha todos os campos com valores válidos.");
    return;
  }


  // Taxa em porcentagem (decimal) 
  
  const i = taxa / 100; // ex: 2.5% -> 0.025
  const n = parcelas;
  const p = valor;

  let valorParcela;
  let total;
  let totalJuros;

  if (i === 0) {
    // Sem juros 
    valorParcela = p / n;
    total = p;
    totalJuros = 0;
  } else {
    // Fórmula da prestação fixa: PMT = P * [ i * (1+i)^n ] / [ (1+i)^n - 1 ]
    const fator = Math.pow(1 + i, n);
    valorParcela = p * (i * fator) / (fator - 1);
    total = valorParcela * n;
    totalJuros = total - p;
  }

  
  // Formatar em R$ 
  
  const formatBRL = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  spanValorCompra.textContent = formatBRL(p);
  spanTaxa.textContent = taxa.toFixed(2) + " % ao mês";
  spanParcelas.textContent = n + (n === 1 ? " parcela" : " parcelas");
  spanParcela.textContent = formatBRL(valorParcela);
  spanTotal.textContent = formatBRL(total);
  spanJuros.textContent = formatBRL(totalJuros);

  secResultado.classList.remove("escondido");
});

btnLimpar.addEventListener("click", function () {
  form.reset();
  secResultado.classList.add("escondido");
});
