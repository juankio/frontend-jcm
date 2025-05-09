export function formatCurrenCy(value) {
  if (!value) return '$0';
  return `$${value.toLocaleString('es-CO')}`;
}

