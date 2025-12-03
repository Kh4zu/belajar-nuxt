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
        <p><strong>Nama:</strong> {{ currentUser.name }}</p>
        <p><strong>Username:</strong> {{ currentUser.username }}</p>
        <p><strong>Role:</strong> {{ currentUser.role }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <button @click="logout" class="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>

    <!-- Overlay Login/Register -->
    <div v-if="!isLoggedIn" class="fixed inset-0 bg-gray-100 bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div class="bg-white shadow-lg p-6 rounded-xl w-full max-w-md">
        <!-- Toggle Login/Register -->
        <div class="flex mb-6 border-b">
          <button 
            @click="isRegister = false"
            class="flex-1 py-3 font-semibold transition"
            :class="isRegister ? 'text-gray-500' : 'text-[#009879] border-b-2 border-[#009879]'"
          >
            Login
          </button>
          <button 
            @click="isRegister = true"
            class="flex-1 py-3 font-semibold transition"
            :class="!isRegister ? 'text-gray-500' : 'text-[#009879] border-b-2 border-[#009879]'"
          >
            Register
          </button>
        </div>

        <h2 class="text-2xl font-bold mb-6 text-center text-[#009879]">
          {{ isRegister ? 'Daftar Akun Baru' : 'Login Greenomi' }}
        </h2>

        <!-- Form Register -->
        <form v-if="isRegister" @submit.prevent="registerNow" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
            <input v-model="registerForm.name" type="text" placeholder="Masukkan nama lengkap" class="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username *</label>
            <input v-model="registerForm.username" type="text" placeholder="Pilih username" class="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input v-model="registerForm.email" type="email" placeholder="email@example.com" class="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password *</label>
            <input v-model="registerForm.password" type="password" placeholder="Masukkan password" class="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password *</label>
            <input v-model="registerForm.confirmPassword" type="password" placeholder="Konfirmasi password" class="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" required />
          </div>

          <button type="submit" :disabled="!isRegisterValid || loading" class="w-full py-2 rounded text-white transition flex items-center justify-center" :class="{'bg-[#009879] hover:bg-[#00BFA6]': isRegisterValid && !loading,'bg-gray-400 cursor-not-allowed': !isRegisterValid || loading}">
            <span v-if="loading">Loading...</span>
            <span v-else>Daftar Sekarang</span>
          </button>
        </form>

        <!-- Form Login -->
        <form v-else @submit.prevent="loginNow" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username / Email</label>
            <input v-model="loginForm.usernameOrEmail" type="text" placeholder="Masukkan username atau email" class="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input v-model="loginForm.password" type="password" placeholder="Masukkan password" class="border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#009879]" required />
          </div>

          <button type="submit" :disabled="!isLoginValid || loading" class="w-full py-2 rounded text-white transition flex items-center justify-center" :class="{'bg-[#009879] hover:bg-[#00BFA6]': isLoginValid && !loading,'bg-gray-400 cursor-not-allowed': !isLoginValid || loading}">
            <span v-if="loading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <p v-if="error" class="text-red-500 text-sm mt-3 text-center">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const isRegister = ref(false);
const loading = ref(false);
const error = ref("");
const isLoggedIn = ref(false);
const currentUser = ref({});

// Form data
const loginForm = ref({ usernameOrEmail: "", password: "" });
const registerForm = ref({ name: "", username: "", email: "", password: "", confirmPassword: "" });

// Validasi
const isLoginValid = computed(() => loginForm.value.usernameOrEmail.trim() !== "" && loginForm.value.password.trim() !== "");
const isRegisterValid = computed(() => {
  return registerForm.value.name.trim() !== "" &&
         registerForm.value.username.trim() !== "" &&
         registerForm.value.email.trim() !== "" &&
         registerForm.value.password.trim() !== "" &&
         registerForm.value.confirmPassword.trim() !== "" &&
         registerForm.value.password === registerForm.value.confirmPassword;
});

// Cek session
onMounted(() => {
  const userData = localStorage.getItem('current_user');
  if (userData) {
    currentUser.value = JSON.parse(userData);
    isLoggedIn.value = true;
  }
});

// Register
async function registerNow() {
  error.value = "";
  loading.value = true;

  try {
    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerForm.value.name,
        username: registerForm.value.username,
        email: registerForm.value.email,
        password: registerForm.value.password,
        confirmPassword: registerForm.value.confirmPassword
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registrasi gagal");

    localStorage.setItem('current_user', JSON.stringify(data.user));
    currentUser.value = data.user;
    isLoggedIn.value = true;

    setTimeout(() => redirectBasedOnRole(data.user.role), 1500);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Login
async function loginNow() {
  error.value = "";
  loading.value = true;

  try {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginForm.value.usernameOrEmail, password: loginForm.value.password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login gagal");

    localStorage.setItem('current_user', JSON.stringify(data.user));
    currentUser.value = data.user;
    isLoggedIn.value = true;

    setTimeout(() => redirectBasedOnRole(data.user.role), 1500);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// Logout
function logout() {
  localStorage.removeItem('current_user');
  isLoggedIn.value = false;
  currentUser.value = {};
  loginForm.value = { usernameOrEmail: "", password: "" };
  registerForm.value = { name: "", username: "", email: "", password: "", confirmPassword: "" };
  alert('Logout berhasil!');
}

// Redirect role
function redirectBasedOnRole(role) {
  const routes = { admin: '/admin', user: '/' };
  window.location.href = routes[role] || '/';
}
</script>

<style scoped>
body { margin: 0; font-family: Arial, sans-serif; }
</style>