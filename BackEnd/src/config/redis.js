const {createClient}=require('redis');
const redisClient = createClient({
    username: 'default',
    password: 'lBFoRywmWPxTFA7E0FUPlkMD9P3EMRJd', // error de rha tha env me we will see
    socket: {
        host:'redis-13157.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13157,
    }
});
module.exports=redisClient;