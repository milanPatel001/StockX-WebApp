export async function registerUser(req: any) {
  const options: RequestInit = {
    method: "POST",
    //url: process.env.DEV_API_URL + "/api/users",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch(process.env.DEV_API_URL + "/api/users", options);

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function loginUser(req: any) {
  const options: RequestInit = {
    method: "POST",
    //url: process.env.DEV_API_URL + "/api/login",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch(process.env.DEV_API_URL + "/api/login", options);

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function loginUserUsingId(uid: string) {
  const options: RequestInit = {
    method: "POST",
    //url: `${process.env.DEV_API_URL}/api/login/${uid}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    //body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch(
    `${process.env.DEV_API_URL}/api/login/${uid}`,
    options
  );

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function verifyToken(tokenId: string) {
  const options: RequestInit = {
    method: "POST",
    //url: process.env.DEV_API_URL + "/api/login",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tokenId}`,
    },
    body: JSON.stringify({ hello: "world" }),
    cache: "no-store",
  };

  const res = await fetch(process.env.DEV_API_URL + "/api/login", options);

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function addToWatchlist(uid: string, req: any) {
  const options: RequestInit = {
    method: "POST",
    //url: `${process.env.DEV_API_URL}/api/watchlist/${uid}/add`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(req),
    cache: "no-store",
  };

  const res = await fetch(
    `${process.env.DEV_API_URL}/api/watchlist/${uid}/add`,
    options
  );

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function removeFromWatchlist(uid: string, symbol: string) {
  const options: RequestInit = {
    method: "POST",
    // url: `${process.env.DEV_API_URL}/api/watchlist/${uid}/remove/${symbol}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  const res = await fetch(
    `${process.env.DEV_API_URL}/api/watchlist/${uid}/remove/${symbol}`,
    options
  );

  if (res.status == 401 || res.status == 400) return { failed: true };

  const data = await res.json();

  return data;
}

export async function getAllWatchedStocks(uid: string) {
  const res = await fetch(`${process.env.DEV_API_URL}/api/watchlist/${uid}`);
  const data = await res.json();
  return data;
}

export async function stockInWatchlist(uid: string, symbol: string) {
  const res = await fetch(
    `${process.env.DEV_API_URL}/api/watchlist/${uid}/${symbol}`
  );
  const data = await res.json();
  return data;
}
