<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mt-8">Login</h2>
      <form class="px-8 py-6" @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="border border-gray-300 rounded-md py-2 px-3 w-full"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-4">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="border border-gray-300 rounded-md py-2 px-3 w-full"
            placeholder="Enter your password"
          />
        </div>
        <Button
          label="Login"
          classes="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        />
      </form>
      <div class="text-center px-8 py-4">
        <a @click="redirectTo('register')" class="text-blue-500 hover:underline"
          >Create an Account</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { doLogin } from "../services/auth";
import Button from "../components/shared/Button.vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const credentials = {
        email: this.email,
        password: this.password,
      };

      const response = await doLogin(credentials);
      if (response) {
        toast.success(response.data.message, {
          autoClose: 1000,
        }); // ToastOptions
        this.redirectTo("welcome");
      }
    },
    redirectTo(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>

<style>
/* Add component-specific styles and Tailwind CSS classes here */
</style>
