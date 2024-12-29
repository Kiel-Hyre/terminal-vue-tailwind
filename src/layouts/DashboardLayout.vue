<template>
  <div class="flex h-screen overflow-hidden">
    <div class="relative flex flex-col flex-1 overflow-hidden">

      <header class="fixed w-full h-12 bg-white dark:bg-black">
        <div class="px-2 dark:bg-black">
          <div class="flex items-center justify-between h-12 lg:border-b border-gray-200 dark:border-gray-700/60">
            <div class="flex">
              <p>
                <span class="text-base font-semibold">Menu</span><span
                  class="text-xs mt-1 text-yellow-700 dark:text-yellow-300">
                  [Ctrl
                  + M]</span>
              </p>
              <hr class="mx-2 w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
              <p>
                <span class="text-base font-semibold">Quit</span><span
                  class="text-xs mt-1 text-yellow-700 dark:text-yellow-300">
                  [Ctrl
                  + Q]</span>
              </p>
              <hr class="mx-2 w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
              <p>
                <span class="text-sm font-semibold">Toggle Fullscreen</span><span
                  class="text-xs mt-1 text-yellow-700 dark:text-yellow-300">
                  [F11]</span>
              </p>
              <hr class="mx-2 w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
              <p>
                <span class="text-base font-semibold">Escape Fullscreen</span><span
                  class="text-xs mt-1 text-yellow-700 dark:text-yellow-300">
                  [Esc]</span>
              </p>
              <hr class="mx-2 w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
              <p>
                <span class="text-sm font-semibold">Dark/Light Mode</span><span
                  class="text-xs mt-1 text-yellow-700 dark:text-yellow-300">
                  [Ctrl + B]</span>
              </p>
              <hr class="mx-2 w-px h-6 bg-gray-200 dark:bg-gray-700/60 border-none" />
              <p>
                <span class="text-sm font-semibold">Scroll Up/Dwn</span><span
                  class="text-xs mt-1 text-yellow-700 dark:text-yellow-300">
                  [ArrwUp] / [ArrwDwn]</span>
              </p>
            </div>
          </div>
          <slot name="header"></slot>
        </div>
      </header>

      <!-- Main Content -->
      <main class="grow my-16 overflow-y-auto disabled-section" ref="mainContent" tabindex="-1">
        <slot name="main"></slot>

        <!-- Footer -->
        <footer
          class="fixed bottom-0 w-full h-16 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 disabled-section">
          <div class="px-2 sm:px-2 lg:px-2 h-full flex items-center">
            <div class="flex">
              <input ref="footerInput" type="text" placeholder="Control ->"
                class="w-96 h-10 px-2 border dark:bg-black dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-3 focus:ring-green-200"
                @keydown="handleKeydown" />
            </div>
            <slot name="footer"></slot>
          </div>
        </footer>
      </main>
      <!-- <div v-if="showFullscreenPrompt" class="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
        <button class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
          @click="requestFullscreen">
          Enter Fullscreen Mode
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router for navigation
import { useDark } from "@vueuse/core";


export default {
  name: 'DashboardLayout',
  components: {
  },
  setup() {
    const sidebarOpen = ref(false);
    const mainContent = ref(null);
    const footerInput = ref(null);
    const showFullscreenPrompt = ref(true); // Show the prompt initially
    const router = useRouter(); // Router instance

    const disableTabKey = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Completely block the Tab key
      }
    };

    let isDark = useDark({
      selector: 'html',
    })

    const handleGlobalKeydown = (event) => {
      if (!mainContent.value) return;

      const scrollContainer = mainContent.value;

      if (event.key === 'ArrowUp') {
        scrollContainer.scrollTop -= 50; // Scroll up by 50px
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        scrollContainer.scrollTop += 50; // Scroll down by 50px
        event.preventDefault();
      } else if (event.ctrlKey && (event.key === 'm' || event.key === 'M')) {
        router.push('/menu'); // Navigate to /menu
      } else if (event.ctrlKey && event.key === 'q' || event.key === 'Q') {
        logout(); // Call the logout function
      } else if (event.ctrlKey && (event.key === 'b' || event.key === 'B')) {
        isDark.value = !isDark.value; // Toggle dark mode
      }
    };

    const lockFocus = (event) => {
      if (footerInput.value && event.target !== footerInput.value) {
        footerInput.value.focus(); // Force focus back to the input
        event.preventDefault();
      }
    };

    const logout = () => {
      localStorage.removeItem('token'); // Remove the token from localStorage
      localStorage.removeItem('user'); // Remove the token from localStorage
      router.push('/'); // Navigate to login page
    };

    const requestFullscreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
        showFullscreenPrompt.value = false; // Hide the prompt on success
      } catch (error) {
        console.error(`Fullscreen request failed: ${error.message}`);
      }
    };

    onMounted(() => {
      document.addEventListener('mousedown', lockFocus); // Prevent mouse click navigation
      document.addEventListener('keydown', handleGlobalKeydown); // Global key handling
      document.addEventListener('keydown', disableTabKey); // Disable Tab key
      if (footerInput.value) footerInput.value.focus(); // Initial focus
      // requestFullscreen();
    });

    onBeforeUnmount(() => {
      document.removeEventListener('mousedown', lockFocus);
      document.removeEventListener('keydown', handleGlobalKeydown);
      document.removeEventListener('keydown', disableTabKey);
    });

    return {
      sidebarOpen,
      mainContent,
      footerInput,
      showFullscreenPrompt,
      requestFullscreen,
    };
  },
};
</script>



<style>
/* Slick scrollbar styles in gray */
::-webkit-scrollbar {
  width: 8px;
  /* Width of the scrollbar */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #b0b0b0, #808080);
  /* Gray gradient for the thumb */
  border-radius: 4px;
  /* Rounded corners for the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #808080, #505050);
  /* Darker gray on hover */
}

::-webkit-scrollbar-track {
  background: #e0e0e0;
  /* Light gray track */
  border-radius: 4px;
  /* Rounded corners for the track */
}

.disabled-section {
  pointer-events: none;
  /* Prevent tab focus */
  user-select: none;
  /* Prevents text selection */
}

header[tabindex="-1"],
main[tabindex="-1"] {
  outline: none;
  pointer-events: none;
}
</style>
