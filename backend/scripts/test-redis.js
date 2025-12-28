const Redis = require('ioredis');

async function testRedisConnection() {
    console.log('Testing Redis connection...');

    const redis = new Redis({
        host: 'localhost',
        port: 6380,
        retryStrategy: (times) => {
            console.log(`Retry attempt: ${times}`);
            return Math.min(times * 50, 2000);
        },
    });

    try {
        // Test ping
        const pong = await redis.ping();
        console.log(`Ping response: ${pong}`);

        // Test set/get
        await redis.set('test:key', 'Hello Redis!');
        const value = await redis.get('test:key');
        console.log(`Get value: ${value}`);

        // Test queue operations
        await redis.lpush('test:queue', JSON.stringify({ id: 1, data: 'test' }));
        const queueLength = await redis.llen('test:queue');
        console.log(`Queue length: ${queueLength}`);

        // Cleanup
        await redis.del('test:key', 'test:queue');

        console.log('All Redis tests passed!');
        process.exit(0);
    } catch (error) {
        console.error('Redis connection failed:', error.message);
        process.exit(1);
    } finally {
        await redis.quit();
    }
}

testRedisConnection();