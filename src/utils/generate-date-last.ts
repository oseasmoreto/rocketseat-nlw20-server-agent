/**
 * Gera uma data aleatória posterior ao momento atual.
 * @returns {Date} Uma data futura aleatória.
 */
export function generateDateLast(): { minDate: Date; maxDate: Date } {
  const now = new Date();
  const future = new Date(now);
  future.setDate(now.getDate() - 30); // até 30 dias no futuro
  return { minDate: now, maxDate: future };
}
