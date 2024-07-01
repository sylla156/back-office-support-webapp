export function formatNationalPhoneNumber(phoneNumber) {
  let i = phoneNumber.length % 2;
  const chunks = [];

  chunks.push(i ? phoneNumber[0] : '');
  while (i < phoneNumber.length) {
    chunks.push(phoneNumber.substring(i, i + 2));
    i += 2;
  }

  return chunks.join(' ');
}

export function formatPhoneNumber(countryCode, nationalNumber) {
  return `+${countryCode} ${formatPhoneNumber(nationalNumber)}`;
}
