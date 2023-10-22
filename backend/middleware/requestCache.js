const redisClient = require("../redisConfig");

const requestCache = async (req, res, next) => {
  const cacheKey = req.originalUrl;

  try {
    const data = await redisClient.GET(cacheKey);

    if (data !== null) {
      console.log("HIT");
      return res.status(200).send(JSON.parse(data));
    } else {
      // Data not in cache, proceed to the next middleware or route
      console.log("MISS");
      next();
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = requestCache;
