const redis = require('redis');

// Create a global variable to hold the Redis client instance
let redisClient = null;

// Function to connect to Redis once
const radisClient = async () => {
  if (redisClient) return redisClient; // If Redis client is already connected, return the instance

  console.log('Redis URL:', process.env.REDIS_URL)
  redisClient = redis.createClient({
    url: process.env.REDIS_URL, // Default Redis URL
    socket: {
    tls: true, // for Upstash
    rejectUnauthorized: false,
  }
  });

  redisClient.on('error', (err) => console.error('Redis Error:', err));

  try {
    await redisClient.connect();  // Connect to Redis
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }

  return redisClient;
};

module.exports = { radisClient };

