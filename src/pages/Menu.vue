<template>
  <DashboardLayout>
    <template #main>
      <div class="px-2 sm:px-4 lg:px-2 pb-4 w-full mx-none max-w-full">
        <div class="grid grid-cols-12 gap-4 mt-2">
          <div v-for="item in dummyItems" :key="item.code"
            class="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white/90 dark:bg-black shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-2 py-1">
              <header class="flex justify-between items-start w-full">
                <h2
                  class="text-lg font-semibold text-gray-800 dark:text-yellow-200 truncate overflow-hidden whitespace-nowrap max-w-xs">
                  {{ item.code }} <span class="text-white font-thin">{{ item.label }}</span>
                </h2>
              </header>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Route: {{ item.route }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer></template>
  </DashboardLayout>
</template>
<script>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Menu',
  components: {
    DashboardLayout,
  },
  setup() {
    const router = useRouter();
    const inputRef = ref(null); // Input reference

    const handleKeydown = (event) => {
      if (event.key === 'Enter' && inputRef.value) {
        const inputValue = inputRef.value.value.trim(); // Get input value
        const matchedItem = dummyItems.value.find((item) => item.code === inputValue); // Find matching code

        if (matchedItem) {
          router.push(matchedItem.route); // Navigate to route
          inputRef.value.value = ''; // Clear input
        }
      }
    };

    const dummyItems = ref(
      Array.from({ length: 20 }, (_, i) => {
        const code = (i + 1).toString().padStart(2, '0'); // Generate code: '01', '02', ...
        return {
          route: `/route-${code}`,
          label: `Dummy Item ${code}`,
          code,
        };
      })
    );

    onMounted(() => {
      const footerInput = document.querySelector("input[placeholder='Control ->']"); // Select input in layout
      if (footerInput) {
        footerInput.addEventListener('keydown', handleKeydown); // Attach keydown event
        footerInput.placeholder = 'Input the Correct Route Code [Press Enter]'
        inputRef.value = footerInput; // Set the input reference
      }
    });

    return {
      dummyItems,
    };
  },
};
</script>