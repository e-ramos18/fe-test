<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="text-center">
      <h2 v-if="user" class="text-3xl font-bold mb-4">
        Welcome, {{ user.username }}
      </h2>
      <div class="flex space-x-4 justify-center">
        <button
          v-if="isAdmin"
          @click="redirectTo('view-records')"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          View Records
        </button>
        <button
          v-else
          @click="unsubscribe"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Unsubscribe
        </button>
        <button
          @click="logout"
          class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getCurrentUser, isAdmin, doLogout } from "../services/auth";

export default {
  data() {
    return {
      user: null,
      isAdmin: false,
    };
  },
  mounted() {
    this.user = getCurrentUser();
    this.isAdmin = isAdmin(this.user);
  },
  methods: {
    redirectTo(route) {
      this.$router.push(`/${route}`);
    },
    unsubscribe() {
      // Perform unsubscribe logic
      // Redirect or show a confirmation message
    },
    logout() {
      // Clear any authentication-related data (cookies)
      doLogout().then(() => {
        Cookies.remove("token");
        Cookies.remove("user");
        this.redirectTo(""); // Redirect to the login page
      });
    },
  },
};
</script>

<style>
/* Add component-specific styles here */
</style>
