// server/api/auth/login.post.js
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const { username, password, role } = body;

  // Validasi input
  if (!username || !password || !role) {
    return {
      success: false,
      message: 'Semua field harus diisi'
    };
  }

  try {
    // Koneksi ke PostgreSQL database belajar_nuxt
    const dbConfig = {
      host: 'localhost',
      port: 5432,
      database: 'belajar_nuxt', // Nama database Anda
      user: 'postgres', // Ganti dengan username PostgreSQL Anda
      password: 'password', // Ganti dengan password PostgreSQL Anda
    };

    // Query untuk mencari user di tabel users
    const userQuery = `
      SELECT id, username, password, role 
      FROM users 
      WHERE username = $1 AND role = $2
    `;

    const userResult = await queryDatabase(userQuery, [username, role], dbConfig);
    
    if (userResult.rows.length === 0) {
      return {
        success: false,
        message: 'User tidak ditemukan'
      };
    }

    const user = userResult.rows[0];

    // Verifikasi password
    if (password !== user.password) {
      return {
        success: false,
        message: 'Password salah'
      };
    }

    // Simpan data login ke tabel login_history (jika ada)
    try {
      const loginHistoryQuery = `
        INSERT INTO login_history (user_id, username, role, login_time, ip_address, user_agent)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;

      const clientIP = getClientIP(event);
      const userAgent = getHeader(event, 'user-agent');

      await queryDatabase(loginHistoryQuery, [
        user.id,
        user.username,
        user.role,
        new Date().toISOString(),
        clientIP,
        userAgent
      ], dbConfig);
    } catch (historyError) {
      console.log('Tabel login_history tidak ada, skip logging');
    }

    // Generate token
    const token = generateToken(user);

    return {
      success: true,
      message: 'Login berhasil',
      user: {
        id: user.id,
        username: user.username,
        name: user.username, // Karena tidak ada kolom name, pakai username
        role: user.role,
        login_time: new Date().toISOString()
      },
      token: token
    };

  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan server: ' + error.message
    };
  }
});

// Helper function untuk koneksi database
async function queryDatabase(query, params, dbConfig) {
  // Gunakan dynamic import untuk pg
  const { Client } = await import('pg');
  
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query(query, params);
    return result;
  } finally {
    await client.end();
  }
}

function getClientIP(event) {
  return getHeader(event, 'x-forwarded-for') || 
         getHeader(event, 'x-real-ip') || 
         'unknown';
}

function generateToken(user) {
  return Buffer.from(JSON.stringify({
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000)
  })).toString('base64');
}