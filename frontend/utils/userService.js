import http from "./httpService";

export function registerUser(req) {
  return http.post("http://localhost:3000/api/users", req);
}

export function loginUser(req) {
  return http.post("http://localhost:3000/api/login", req);
}

export function loginUserUsingId(uid) {
  return http.post("http://localhost:3000/api/login/" + uid);
}

export function verifyToken(tokenId) {
  return http.post(
    "http://localhost:3000/api/login/",
    { hello: "world" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenId,
      },
    }
  );
}

export function addToWatchlist(uid, req) {
  return http.post("http://localhost:3000/api/watchlist/" + uid + "/add", req);
}

export function removeFromWatchlist(uid, symbol) {
  return http.post(
    "http://localhost:3000/api/watchlist/" + uid + "/remove/" + symbol
  );
}

export function getAllWatchedStocks(uid) {
  return http.get("http://localhost:3000/api/watchlist/" + uid);
}

export function stockInWatchlist(uid, symbol) {
  return http.get("http://localhost:3000/api/watchlist/" + uid + "/" + symbol);
}
