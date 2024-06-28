export const todayStart = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const todayEnd = () => {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date;
};

const formatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

export const formatDate = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return formatter.format(date).replace(',', ' à');
};

export const toDatetimeLocalValue = (date) => date.toISOString().slice(0, 16);
