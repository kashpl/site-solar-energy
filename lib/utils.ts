export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatCurrencyFromDigits(value: string) {
  const digits = onlyDigits(value);
  if (!digits) {
    return "";
  }

  const amount = Number(digits) / 100;
  return formatCurrency(amount);
}

export function parseCurrency(value: string) {
  const digits = onlyDigits(value);
  return digits ? Number(digits) / 100 : 0;
}

export function maskWhatsApp(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function scrollToSection(id: string) {
  const element = document.querySelector(id);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}
