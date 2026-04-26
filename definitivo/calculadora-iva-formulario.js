function calcularIVA() {
  // Obtener valores
  const valor = parseFloat(document.getElementById('valor-input').value);
  const porcentaje = parseFloat(document.getElementById('iva-porcentaje').value) || 19;
  const tipo = document.querySelector('input[name="iva-tipo"]:checked').value;

  // Validar
  if (isNaN(valor) || valor <= 0) {
    alert('Por favor ingresa un valor válido');
    return;
  }

  let valorSinIVA, valorIVA, valorTotal;

  if (tipo === 'incluido') {
    // IVA ya incluido en el valor
    valorTotal = valor;
    valorIVA = valor - (valor / (1 + porcentaje / 100));
    valorSinIVA = valor - valorIVA;
  } else {
    // IVA no incluido, hay que agregarlo
    valorSinIVA = valor;
    valorIVA = valor * (porcentaje / 100);
    valorTotal = valor + valorIVA;
  }

  // Mostrar resultados
  document.getElementById('valor-sin-iva').textContent = formatCurrency(valorSinIVA);
  document.getElementById('valor-iva').textContent = formatCurrency(valorIVA);
  document.getElementById('valor-total').textContent = formatCurrency(valorTotal);
  
  document.getElementById('resultados').style.display = 'block';
}

function formatCurrency(value) {
  return '$' + value.toLocaleString('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Permitir calcular con Enter
document.getElementById('valor-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    calcularIVA();
  }
});