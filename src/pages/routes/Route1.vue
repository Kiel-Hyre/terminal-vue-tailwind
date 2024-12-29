<template>
  <DashboardLayout>
    <template #main>
      <div class="px-2 sm:px-4 lg:px-2 pb-4 w-full mx-none max-w-full">
        <div>
          <h1 class="text-xl font-semibold text-gray-800 dark:text-yellow-200 mb-4">Captured Values</h1>
          <ul class="list-disc pl-6">
            <li v-for="(value, index) in capturedValues" :key="index" class="text-gray-800 dark:text-white">
              {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #footer></template>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import { ref, onMounted } from 'vue';

export default {
  name: 'Route1',
  components: {
    DashboardLayout,
  },
  setup() {
    const inputRef = ref(null); // Input reference
    const capturedValues = ref([]); // List of captured values

    const handleKeydown = (event) => {
      if (event.key === 'Enter' && inputRef.value) {
        const inputValue = inputRef.value.value.trim(); // Get and trim input value
        if (inputValue) {
          capturedValues.value.push(inputValue); // Add non-empty value to the list
          inputRef.value.value = ''; // Clear input
        }
      }
    };

    onMounted(() => {
      const footerInput = document.querySelector("input[placeholder='Control ->']"); // Select input in layout
      if (footerInput) {
        footerInput.addEventListener('keydown', handleKeydown); // Attach keydown event
        footerInput.placeholder = 'Enter a value'; // Update the placeholder dynamically
        inputRef.value = footerInput; // Set the input reference
      }
    });

    return {
      capturedValues,
    };
  },
};
</script>
