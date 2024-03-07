import "dotenv/config" // .env is in windows with database 
import pkg from 'pg'

const { Pool } = pkg;

export const pg = new Pool({
    allowExitOnIdle: true
});
