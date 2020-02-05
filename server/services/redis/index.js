import Redis from 'ioredis';

const { REDIS_HOST, REDIS_PORT } = process.env;

const redis = new Redis(REDIS_PORT, REDIS_HOST);

redis.connect(() => {
  console.log('Redis server connected');
});

redis.on('error', (err) => {
  console.log('Redis not connected', err);
});

export default redis;
