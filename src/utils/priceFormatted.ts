export function PriceFormatted(price: number) {
  const priceTotalFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100);

  return priceTotalFormatted;
}
// Taxa from send products
export function ShippingFee() {
  const shippingFeeFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(50);

  return shippingFeeFormatted;
}