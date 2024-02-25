import "dotenv/config"
import pkg from 'pg'

const { Pool } = pkg;

export const pg = new Pool({
    allowExitOnIdle: true
});
