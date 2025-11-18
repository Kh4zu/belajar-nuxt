<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg p-6 rounded-xl w-full max-w-sm">

      <h2 class="text-2xl font-bold mb-4 text-center text-[#009879]">
        Login
      </h2>

      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="border w-full mb-3 px-3 py-2 rounded"
      />

      <select
        v-model="role"
        class="border w-full mb-3 px-3 py-2 rounded"
      >
        <option disabled value="">Pilih Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button
        @click="loginNow"
        class="bg-[#009879] w-full py-2 rounded text-white hover:bg-[#00BFA6] transition"
      >
        Login
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useRouter } from "vue-router";

const username = ref("");
const role = ref("");

const userStore = useUserStore();
const router = useRouter();

function loginNow() {
  if (!username.value || !role.value) {
    alert("Isi username dan pilih role!");
    return;
  }

  userStore.login(username.value, role.value);

  alert("Login Berhasil!");
  router.push("/");
}
</script>
