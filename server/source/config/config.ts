import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'admin';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'admin';
const MONGO_HOST = process.env.MONGO_HOST || `mongodb:27017`;
const MONGO_DATABASE = process.env.MONGO_DATABASE || undefined;
const DATABASE_TYPE = process.env.DATABASE_TYPE || 'local';

const SPOTIFY = {
    client_id: process.env.SPOTIFY_CLIENT_ID || '',
    client_secret: process.env.SPOTIFY_CLIENT_SECRET || ''
};

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    database: MONGO_DATABASE,
    database_type: DATABASE_TYPE,
    url: `mongodb${DATABASE_TYPE === 'atlas' ? '+srv' : ''}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE || ''}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER,
    spotify: SPOTIFY
};

export default config;
