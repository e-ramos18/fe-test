<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-bold text-center mt-8">Register</h2>
      <form class="px-8 py-6" @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
            >User Name</label
          >
          <input
            v-model="name"
            type="text"
            id="name"
            class="border border-gray-300 rounded-md py-2 px-3 w-full"
            placeholder="Enter your name"
          />
        </div>
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
            for="phone_number"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Phone Number</label
          >
          <input
            v-model="phone_number"
            id="phone_number"
            class="border border-gray-300 rounded-md py-2 px-3 w-full"
            placeholder="Enter your phone number"
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
        <div class="mb-4">
          <label
            for="confirmPassword"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="border border-gray-300 rounded-md py-2 px-3 w-full"
            placeholder="Confirm your password"
          />
        </div>
        <Button
          label="Register"
          classes="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        />
      </form>
      <div class="text-center px-8 py-4">
        <a @click="redirectTo('login')" class="text-blue-500 hover:underline"
          >Already have an account? Login</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { doRegister } from "../services/auth";
import Button from "../components/shared/Button.vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    register() {
      // Perform registration logic
      doRegister({
        username: this.name,
        email: this.email,
        phone_number: this.phone_number,
        password: this.password,
        password_confirmation: this.confirmPassword,
      }).then((res) => {
        toast.success(res.data.message, {
          autoClose: 1000,
        }); // ToastOptions
        this.clearForm();
      });
    },
    redirectTo(route) {
      this.$router.push(`/${route}`);
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.phone_number = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
};
</script>

<style>
/* Add component-specific styles and Tailwind CSS classes here */
</style>
