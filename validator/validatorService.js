const LUHN_MOD = 10;

function validateToken(token) {
  const cleanedToken = token.replace(/-/g, "");
  let sum = 0;
  for (let i = 0; i < cleanedToken.length; i++) {
    let digit = parseInt(cleanedToken[i], 10);
    if ((cleanedToken.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % LUHN_MOD === 0;
}

module.exports = { validateToken };
