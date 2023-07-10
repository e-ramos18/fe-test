<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-4xl bg-white rounded-lg shadow-md p-8 overflow-auto">
      <h2 class="text-3xl font-bold text-center mb-8">View Records</h2>
      <div v-if="loading" class="flex justify-center items-center h-48">
        <div
          class="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"
        ></div>
      </div>
      <div v-else-if="users.length > 0">
        <div class="overflow-auto">
          <table class="w-full table-auto">
            <thead>
              <tr>
                <th class="py-4 px-6 bg-gray-200 text-left">User Name</th>
                <th class="py-4 px-6 bg-gray-200 text-left">Email</th>
                <th class="py-4 px-6 bg-gray-200 text-left">Phone</th>
                <th class="py-4 px-6 bg-gray-200 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-b">
                <td class="py-4 px-6">{{ user.username }}</td>
                <td class="py-4 px-6">{{ user.email }}</td>
                <td class="py-4 px-6">{{ user.phone_number }}</td>
                <td class="py-4 px-6">
                  <div class="flex justify-center md:justify-start">
                    <button
                      @click="openModal('edit', user)"
                      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 md:mr-2"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteUser(users, user.id)"
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 disabled:opacity-50"
                      :class="{ disabled: user.role === 'admin' }"
                      :disabled="user.role === 'admin'"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="text-center">
        <p>No records found.</p>
      </div>
      <div class="flex justify-center mt-6">
        <Button
          label="Go Back"
          classes="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          :onClick="goBack"
        />
      </div>
    </div>

    <!-- Modal for Edit User -->
    <modal v-if="showModal" @close="closeModal">
      <h2 class="text-2xl font-bold mb-4">{{ modalTitle }}</h2>
      <form @submit.prevent="updateUser" class="max-w-md mx-auto">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="modalUser.username"
            required
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="modalUser.email"
            required
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-700 font-bold mb-2"
            >Phone</label
          >
          <input
            type="tel"
            id="phone"
            v-model="modalUser.phone_number"
            required
            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div class="flex justify-center">
          <Button
            label="Save"
            classes="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            :onClick="updateUser"
          />
          <Button
            label="Cancel"
            classes="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2"
            :onClick="closeModal"
          />
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import axios from "../services/axiosConfig";
import Modal from "../components/Modal.vue";
import Button from "../components/shared/Button.vue";

export default {
  components: {
    Modal,
    Button,
  },
  setup() {
    const users = ref([]);
    const router = useRouter();
    const loading = ref(false);
    const showModal = ref(false);
    const modalType = ref("");
    const modalUser = ref(null);
    const modalTitle = ref("");

    const fetchUsers = async () => {
      loading.value = true;

      try {
        const response = await axios.get("/users");
        users.value = response.data;
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        loading.value = false;
      }
    };

    const openModal = (type, user) => {
      modalType.value = type;
      modalUser.value = Object.assign({}, user);
      modalTitle.value = "Edit User";
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      modalType.value = "";
      modalUser.value = null;
      modalTitle.value = "";
    };

    const updateUser = () => {
      const { id, username, email, phone_number } = modalUser.value;
      const userToUpdate = {
        username,
        email,
        phone_number,
      };

      axios
        .put(`/users/${id}`, userToUpdate)
        .then((response) => {
          const updatedUser = response.data;
          const index = users.value.findIndex(
            (user) => user.id === updatedUser.id
          );
          if (index !== -1) {
            users.value.splice(index, 1, updatedUser);
          }
          toast.info("Updated Successfully.", {
            autoClose: 1000,
          });
          closeModal();
        })
        .catch((error) => {
          console.error("Failed to update user:", error);
        });
    };

    async function deleteUser(users, userId) {
      try {
        const res = await axios.delete(`/users/${userId}`);
        // Remove the deleted user from the users array
        const index = users.findIndex((user) => user.id === userId);
        if (index !== -1) {
          users.splice(index, 1);
        }
        toast.success(res.data.message, { autoClose: 1000 });
      } catch (error) {
        console.error("Failed to delete user:", error);
        toast.error("Failed to delete user", { autoClose: 1000 });
      }
    }

    const goBack = () => {
      // Access the router using the useRouter() function
      router.back();
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      loading,
      showModal,
      modalType,
      modalUser,
      modalTitle,
      openModal,
      closeModal,
      updateUser,
      deleteUser,
      goBack,
    };
  },
};
</script>

<style>
/* Add component-specific styles and Tailwind CSS classes here */
.modal {
  display: none;
}

.modal.is-open {
  display: flex;
}

.modal .absolute {
  z-index: 40;
}

.modal .bg-gray-800 {
  opacity: 0.5;
}

.modal .bg-white {
  width: 500px;
  max-width: 90vw;
}

input[type="text"],
input[type="email"],
input[type="tel"] {
  @apply w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

button {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded;
}

button.secondary {
  @apply bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded;
}
</style>
