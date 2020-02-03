import redis from 'redis';

const { REDIS_HOST, REDIS_PORT } = process.env;
const connectionOpts = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

const redisClient = redis.createClient(connectionOpts);

redisClient.on('connect', () => {
  console.log('Redis server connected');
});

redisClient.on('error', (err) => {
  console.log('Redis not connected', err);
});

export const set = (key, value) => new Promise((resolve, reject) => {
  redisClient.set(key, value, (err) => {
    if (err) reject(err);
    else resolve();
  });
})

export const get = (key) => new Promise((resolve, reject) => {
  redisClient.get(key, (err, value) => {
    if (err) reject(err);
    else resolve(value);
  });
});
