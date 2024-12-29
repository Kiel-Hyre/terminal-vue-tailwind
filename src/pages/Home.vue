<template>
  <div class="flex h-screen items-center justify-center bg-black">
    <div class="w-full max-w-sm p-8 bg-black rounded-xl border text-center">
      <h2 class="text-3xl font-semibold text-white mb-6">
        Welcome
      </h2>
      <button
        class="w-full flex items-center justify-center gap-2 bg-white text-black font-medium px-4 py-2 rounded-md hover:bg-gray-100"
        @click="handleLogin">
        <span>Log In</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
          class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M6 3a1 1 0 0 1 1-1h7.5A1.5 1.5 0 0 1 16 3.5v9A1.5 1.5 0 0 1 14.5 14H7a1 1 0 0 1-1-1v-3a.5.5 0 0 1 1 0v3h7.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7v3a.5.5 0 0 1-1 0V3z" />
          <path fill-rule="evenodd"
            d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const handleLogin = () => {
      // Store the token in localStorage
      localStorage.setItem('token', '123');
      // Navigate to the /menu route
      router.push('/menu');
    };

    return { handleLogin };
  },
};
</script>
