export async function registerUser(req) {
  const options = {
    method: "POST",
    url: "http://localhost:3000/api/users",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch("http://localhost:3000/api/users", options);

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function loginUser(req) {
  const options = {
    method: "POST",
    url: "http://localhost:3000/api/login",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch("http://localhost:3000/api/login", options);

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function loginUserUsingId(uid) {
  const options = {
    method: "POST",
    url: `http://localhost:3000/api/login/${uid}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    //body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch(`http://localhost:3000/api/login/${uid}`, options);

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function verifyToken(tokenId) {
  const options = {
    method: "POST",
    url: "http://localhost:3000/api/login",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tokenId}`,
    },
    body: JSON.stringify({ hello: "world" }),
    cache: "no-store",
  };

  const res = await fetch("http://localhost:3000/api/login", options);

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function addToWatchlist(uid, req) {
  const options = {
    method: "POST",
    url: `http://localhost:3000/api/watchlist/${uid}/add`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch(
    `http://localhost:3000/api/watchlist/${uid}/add`,
    options
  );

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function removeFromWatchlist(uid, symbol) {
  const options = {
    method: "POST",
    url: `http://localhost:3000/api/watchlist/${uid}/remove/${symbol}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  const res = await fetch(
    `http://localhost:3000/api/watchlist/${uid}/remove/${symbol}`,
    options
  );

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function getAllWatchedStocks(uid) {
  const res = await fetch(`http://localhost:3000/api/watchlist/${uid}`);
  const data = await res.json();
  return data;
}

export async function stockInWatchlist(uid, symbol) {
  const res = await fetch(
    `http://localhost:3000/api/watchlist/${uid}/${symbol}`
  );
  const data = await res.json();
  return data;
}
