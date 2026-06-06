export const brazilianCities = [
  "Fortaleza/CE",
  "Aquiraz/CE",
  "Sobral/CE",
  "Caucaia/CE",
  "Maracanaú/CE",
  "Eusébio/CE",
  "Juazeiro do Norte/CE",
  "Crato/CE",
  "Iguatu/CE",
  "Quixadá/CE",
  "Canindé/CE",
  "Jaboatão dos Guararapes/PE",
  "Recife/PE",
  "Olinda/PE",
  "Paulista/PE",
  "Caruaru/PE",
  "Petrolina/PE",
  "Salvador/BA",
  "Feira de Santana/BA",
  "São Paulo/SP",
  "Rio de Janeiro/RJ",
  "Belo Horizonte/MG",
  "Brasília/DF",
  "Curitiba/PR",
  "Florianópolis/SC",
  "Foz do Iguaçu/PR",
  "Franca/SP"
];

export function normalizeCitySearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function getCitySuggestions(query: string, limit = 7) {
  const normalizedQuery = normalizeCitySearch(query);

  if (!normalizedQuery) {
    return [];
  }

  return brazilianCities
    .filter((city) => normalizeCitySearch(city).startsWith(normalizedQuery))
    .slice(0, limit);
}
