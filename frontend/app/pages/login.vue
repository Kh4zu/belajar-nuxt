<template>
  <div>
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 w-full h-16 bg-green-500 text-white flex items-center px-6 z-40 shadow-md">
      <h1 class="text-xl font-bold">Greenomi</h1>
      <ul class="ml-auto flex gap-4">
        <li><a href="#" class="hover:underline">Home</a></li>
        <li><a href="#" class="hover:underline">About</a></li>
        <li><a href="#" class="hover:underline">Contact</a></li>
      </ul>
    </nav>

    <!-- Konten Halaman -->
    <div class="pt-16 p-6">
      <h2 class="text-2xl font-bold mb-4">Selamat datang di Greenomi!</h2>
      <p>Ini konten halaman. Tapi kamu tidak bisa klik apa-apa sebelum login.</p>
      
      <!-- Tampilkan data user setelah login -->
      <div v-if="isLoggedIn" class="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Informasi User:</h3>
        <p><strong>Nama:</strong> {{ currentUser.Name }}</p>
        <p><strong>Username:</strong> {{ currentUser.Username }}</p>
        <p><strong>Role:</strong> {{ currentUser.Role }}</p>
        <p><strong>Email:</strong> {{ currentUser.Email }}</p>
        <button @click="logout" class="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>

    <!-- Overlay Login -->
    <div v-if="!isLoggedIn" class="fixed inset-0 bg-gray-100 bg-opacity-95 flex items-center justify-center z-50">
      <div class="bg-white shadow-lg p-6 rounded-xl w-full max-w-sm">

        <h2 class="text-2xl font-bold mb-6 text-center text-[#009879]">
          Login Greenomi
        </h2>

        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="border w-full mb-3 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border w-full mb-3 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]"
        />

        <select
          v-model="role"
          class="border w-full mb-4 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]"
        >
          <option disabled value="">Pilih Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>

        <button
          @click="loginNow"
          :disabled="!isFormValid || loading"
          class="w-full py-2 rounded text-white transition flex items-center justify-center"
          :class="{
            'bg-[#009879] hover:bg-[#00BFA6]': isFormValid && !loading,
            'bg-gray-400 cursor-not-allowed': !isFormValid || loading
          }"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Login</span>
        </button>

        <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>

        <!-- Info Login -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm font-semibold mb-2">Informasi Login Default:</p>
          <p class="text-xs text-gray-600 mb-1"><strong>Admin:</strong> admin / admin123</p>
          <p class="text-xs text-gray-600 mb-1"><strong>Manager:</strong> manager / manager123</p>
          <p class="text-xs text-gray-600 mb-1"><strong>Staff IT:</strong> staff_it / staff123</p>
          
          <p class="text-sm font-semibold mt-3 mb-2 text-green-600">User Baru (Dari Admin):</p>
          <p class="text-xs text-gray-600">Gunakan username & password yang dibuat admin</p>
          <p class="text-xs text-gray-600">Role sesuai yang dipilih saat pembuatan user</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const username = ref("");
const password = ref("");
const role = ref("");
const error = ref("");
const loading = ref(false);
const isLoggedIn = ref(false);
const currentUser = ref({});

// Cek apakah user sudah login
onMounted(() => {
  const userData = localStorage.getItem('current_user');
  if (userData) {
    currentUser.value = JSON.parse(userData);
    isLoggedIn.value = true;
  }
});

const isFormValid = computed(() => {
  return username.value.trim() !== "" && password.value.trim() !== "" && role.value !== "";
});

async function loginNow() {
  error.value = "";
  loading.value = true;

  if (!isFormValid.value) {
    error.value = "Isi semua kolom!";
    loading.value = false;
    return;
  }

  try {
    // 1. Authenticate user menggunakan database dari localStorage
    const userData = await authenticateUser(username.value, password.value, role.value);
    
    // 2. Simpan data user ke localStorage untuk session
    localStorage.setItem('current_user', JSON.stringify(userData));
    currentUser.value = userData;
    isLoggedIn.value = true;
    
    // 3. Rekap SEMUA user login ke database
    await saveUserLoginToDatabase(userData);
    
    // 4. Tampilkan notifikasi sukses
    showSuccessNotification(userData);
    
    // 5. Redirect ke halaman sesuai role setelah 2 detik
    setTimeout(() => {
      redirectBasedOnRole(userData.Role);
    }, 2000);
    
  } catch (err) {
    error.value = err.message || "Login gagal";
  } finally {
    loading.value = false;
  }
}

// FIXED: Fungsi authentication yang menggunakan database dari localStorage
async function authenticateUser(username, password, role) {
  // Ambil data users dari localStorage (sama dengan yang di admin)
  const storedUsers = localStorage.getItem('greenomi_users');
  let usersDatabase = [];
  
  if (storedUsers) {
    usersDatabase = JSON.parse(storedUsers);
  } else {
    // Jika tidak ada data, gunakan default users
    usersDatabase = [
      {
        id: '1',
        name: 'Administrator System',
        username: 'admin',
        email: 'admin@greenomi.com',
        password: 'admin123',
        role: 'admin',
        department: 'IT',
        status: 'active',
        lastLogin: '2024-01-20T10:30:00Z',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Budi Santoso',
        username: 'manager',
        email: 'budi.manager@greenomi.com',
        password: 'manager123',
        role: 'manager',
        department: 'Management',
        status: 'active',
        lastLogin: '2024-01-20T09:15:00Z',
        createdAt: '2024-01-02T00:00:00Z'
      },
      {
        id: '3',
        name: 'Sari Indah',
        username: 'staff_it',
        email: 'sari.it@greenomi.com',
        password: 'staff123',
        role: 'staff',
        department: 'IT',
        status: 'active',
        lastLogin: '2024-01-19T16:45:00Z',
        createdAt: '2024-01-03T00:00:00Z'
      }
    ];
    localStorage.setItem('greenomi_users', JSON.stringify(usersDatabase));
  }

  // Simulasi delay network
  await new Promise(resolve => setTimeout(resolve, 800));

  // Cari user yang sesuai
  const user = usersDatabase.find(u => 
    u.username === username && 
    u.password === password && 
    u.role === role &&
    u.status === 'active' // Pastikan user aktif
  );

  if (!user) {
    throw new Error("Username, password, atau role salah! Atau user tidak aktif.");
  }

  // Update last login time di database
  const updatedUsers = usersDatabase.map(u => {
    if (u.id === user.id) {
      return { ...u, lastLogin: new Date().toISOString() };
    }
    return u;
  });
  localStorage.setItem('greenomi_users', JSON.stringify(updatedUsers));

  return {
    id: user.id,
    Username: user.username,
    Password: user.password,
    Role: user.role,
    Name: user.name,
    Email: user.email,
    Department: user.department,
    Status: user.status,
    LoginTime: new Date().toISOString(),
    SessionId: generateSessionId(),
    IPAddress: "192.168.1.100",
    UserAgent: navigator.userAgent,
    isLoggedIn: true
  };
}

// Fungsi untuk redirect berdasarkan role
function redirectBasedOnRole(role) {
  const routes = {
    'admin': '/admin',
    'manager': '/manager',
    'staff': '/staff',
    'user': '/'
  }
  
  const targetRoute = routes[role] || '/'
  navigateTo(targetRoute);
}

// Fungsi untuk menampilkan notifikasi sukses
function showSuccessNotification(userData) {
  // Buat elemen notifikasi
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm';
  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <p class="font-semibold">Login Berhasil!</p>
        <p class="text-sm">Kamu masuk sebagai <strong>${userData.Role}</strong></p>
        <p class="text-xs mt-1">Mengarahkan ke halaman utama...</p>
      </div>
    </div>
  `;
  
  // Tambahkan ke body
  document.body.appendChild(notification);
  
  // Hapus notifikasi setelah 3 detik
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Simpan data login SEMUA user ke database
async function saveUserLoginToDatabase(userData) {
  // Simulasi database (localStorage sebagai contoh)
  const loginHistory = JSON.parse(localStorage.getItem('user_login_history') || '[]');
  
  const loginRecord = {
    userId: userData.Username,
    userName: userData.Name,
    userRole: userData.Role,
    userDepartment: userData.Department,
    loginTime: new Date().toISOString(),
    sessionId: userData.SessionId,
    ipAddress: userData.IPAddress,
    status: "success"
  };
  
  // Tambahkan ke history
  loginHistory.push(loginRecord);
  
  // Simpan ke "database"
  localStorage.setItem('user_login_history', JSON.stringify(loginHistory));
  
  console.log('📊 Data login direkap ke database:', loginRecord);
  
  // Juga simpan ke statistics
  updateLoginStatistics(userData.Role, userData.Department);
}

// Update statistics login
function updateLoginStatistics(role, department) {
  const stats = JSON.parse(localStorage.getItem('login_statistics') || '{}');
  
  // Update total login
  stats.totalLogins = (stats.totalLogins || 0) + 1;
  
  // Update by role
  if (!stats.byRole) stats.byRole = {};
  stats.byRole[role] = (stats.byRole[role] || 0) + 1;
  
  // Update by department
  if (!stats.byDepartment) stats.byDepartment = {};
  stats.byDepartment[department] = (stats.byDepartment[department] || 0) + 1;
  
  // Last login time
  stats.lastLogin = new Date().toISOString();
  
  localStorage.setItem('login_statistics', JSON.stringify(stats));
}

// Generate session ID
function generateSessionId() {
  return Math.random().toString(36).substr(2, 12) + Date.now().toString(36);
}

// Logout function
function logout() {
  // Simpan logout time ke database
  const loginHistory = JSON.parse(localStorage.getItem('user_login_history') || '[]');
  if (loginHistory.length > 0 && currentUser.value.SessionId) {
    const lastLogin = loginHistory.find(login => login.sessionId === currentUser.value.SessionId);
    if (lastLogin) {
      lastLogin.logoutTime = new Date().toISOString();
      lastLogin.sessionDuration = Math.floor((new Date(lastLogin.logoutTime) - new Date(lastLogin.loginTime)) / 1000);
      localStorage.setItem('user_login_history', JSON.stringify(loginHistory));
    }
  }
  
  localStorage.removeItem('current_user');
  isLoggedIn.value = false;
  currentUser.value = {};
  username.value = "";
  password.value = "";
  role.value = "";
  
  alert('Logout berhasil!');
}

// Fungsi untuk melihat rekap data (bisa dipanggil di console)
function viewLoginHistory() {
  const history = JSON.parse(localStorage.getItem('user_login_history') || '[]');
  const stats = JSON.parse(localStorage.getItem('login_statistics') || '{}');
  
  console.log('📈 Login History:', history);
  console.log('📊 Login Statistics:', stats);
  
  return { history, stats };
}

// Expose function untuk debugging
defineExpose({
  viewLoginHistory
});
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>