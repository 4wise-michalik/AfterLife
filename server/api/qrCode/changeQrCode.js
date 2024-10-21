import sql from 'mssql';

const config = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event); 
    let pool;
    try {
        pool = await sql.connect(config);
        const result = await pool.request().query(` IF EXISTS (SELECT 1 FROM memoryPages WHERE user_id=${body.id})
                                                    BEGIN
                                                        UPDATE memoryPages
                                                        SET link='${body.link}'
                                                        WHERE user_id=${body.id};
                                                    END
                                                    ELSE
                                                    BEGIN
                                                        INSERT INTO memoryPages (user_id, link)
                                                        VALUES (${body.id}, '${body.link}');
                                                    END
                                                    `);
        if (result.rowsAffected[0] === 0){
            return { success: false };
        }
        else {
            return { success: true };
        }
    } catch (error) {
        console.error('Database error:', error);
        return {
        success: false,
        error: 'Database connection failed',
        };
    } finally {
        if (pool) pool.close();
    }
});
