<template>
  <div class="flex h-screen items-center justify-center bg-black text-white">
    <div class="w-full max-w-sm p-8 rounded-xl border text-left">
      <h2 class="text-3xl font-semibold mb-6">
        Welcome
      </h2>
      <form @submit.prevent="handleLogin">
        <div v-if="successMessage" class="mb-4 p-2 text-green-500 bg-green-100 rounded-md">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="mb-4 p-2 text-red-500 bg-red-100 rounded-md">
          {{ errorMessage }}
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-bold">Username:</label>
          <div class="border-b border-gray-500 text-lg">
            <input ref="usernameInput" v-model="username" type="text" maxlength="3"
              class="bg-transparent border-none outline-none text-white w-full inline-block"
              @input="toUpperCase('username')" />
          </div>
        </div>
        <div class="mb-4">
          <label class="block mb-2 font-bold">Password:</label>
          <div class="border-b border-gray-500 text-lg">
            <input ref="passwordInput" type="text" maxlength="3"
              class="bg-transparent border-none outline-none text-white w-full inline-block" :value="maskedPassword"
              @input="handlePasswordInput" disabled />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const username = ref("");
    const password = ref(""); // Stores the actual password
    const maskedPassword = ref(""); // Displays the masked password
    const usernameInput = ref(null);
    const passwordInput = ref(null);
    const errorMessage = ref(null);
    const successMessage = ref(null);

    const handleLogin = () => {
      // Ensure both username and password are checked in uppercase
      if (username.value === "ADM" && password.value === "ADM") {
        showSuccessMessage("Successfully logged in.");
      } else {
        showErrorMessage("Incorrect username or password.");
        resetInputs();
      }
    };

    const toUpperCase = (field) => {
      if (field === "username") {
        username.value = username.value.toUpperCase();
        if (username.value.length === 3) {
          nextTick(() => {
            passwordInput.value.removeAttribute("disabled");
            passwordInput.value.focus();
          });
        }
      }
    };

    const handlePasswordInput = (event) => {
      const inputChar = event.target.value.slice(-1); // Get the last typed character
      if (password.value.length < 3) {
        password.value += inputChar.toUpperCase(); // Store the uppercase value in the password
        maskedPassword.value += "*"; // Display asterisks
      }
      if (password.value.length === 3) {
        handleLogin();
      }
    };

    const showSuccessMessage = (message) => {
      successMessage.value = message;
      setTimeout(() => {
        successMessage.value = null;
        localStorage.setItem("token", "123");
        router.push("/menu");
      }, 1000); // Display the message for 2 seconds before redirecting
    };

    const showErrorMessage = (message) => {
      errorMessage.value = message;
      setTimeout(() => {
        errorMessage.value = null;
      }, 3000); // Display the message for 3 seconds
    };

    const resetInputs = () => {
      username.value = "";
      password.value = "";
      maskedPassword.value = "";
      nextTick(() => {
        passwordInput.value.setAttribute("disabled", true);
        usernameInput.value.focus();
      });
    };

    const enforceFocus = (event) => {
      if (
        document.activeElement !== usernameInput.value &&
        document.activeElement !== passwordInput.value
      ) {
        event.preventDefault();
        if (username.value.length < 3) {
          usernameInput.value.focus();
        } else {
          passwordInput.value.focus();
        }
      }
    };

    onMounted(() => {
      nextTick(() => {
        usernameInput.value.focus();
      });
      document.addEventListener("mousedown", enforceFocus);
      document.addEventListener("focusin", enforceFocus);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("mousedown", enforceFocus);
      document.removeEventListener("focusin", enforceFocus);
    });

    return {
      username,
      password,
      maskedPassword,
      handleLogin,
      toUpperCase,
      handlePasswordInput,
      usernameInput,
      passwordInput,
      errorMessage,
      successMessage,
    };
  },
};
</script>
