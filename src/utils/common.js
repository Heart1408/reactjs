export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString("ascii")
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function isExpired(token) {
  const dateNow = new Date();
  const expTime = parseJwt.exp;

  return expTime < dateNow.getTime();
}

export function formatPrice(price) {
  return price.toLocaleString("vi-VN");
}
