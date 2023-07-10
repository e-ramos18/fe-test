<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mt-8">Home</h2>
      <div class="px-8 py-6">
        <Button
          label="Login"
          classes="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-2"
          :onClick="() => redirectTo('login')"
        />
        <Button
          label="Register"
          classes="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
          :onClick="() => redirectTo('register')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/shared/Button.vue";
export default {
  components: {
    Button,
  },
  methods: {
    redirectTo(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>

<style>
/* Add component-specific styles and Tailwind CSS classes here */
</style>
