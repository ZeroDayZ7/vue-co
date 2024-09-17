<template>
  <div>
    <h1>Lista użytkowników</h1>

    <!-- Search bar and filters -->
    <div class="search-filter">
      <input v-model="searchQuery" type="text" placeholder="Szukaj..." />
      <select v-model="searchBy">
        <option value="last_name">Nazwisko</option>
        <option value="first_name">Imię</option>

      </select>
      <button @click="searchUsers">Szukaj</button>
    </div>

    <!-- Pagination settings -->
    <div class="pagination-settings">
      <label for="itemsPerPage">Ilość na stronę:</label>
      <select v-model="itemsPerPage" id="itemsPerPage">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>

    <!-- Users table -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Staż</th>
          <th>Czas do końca umowy</th>
          <th>Akcje</th>
          <th>Aktywny</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.tenure }}</td>
          <td>{{ user.time_remaining }}</td>
          <td>
            <button @click="editUser(user.id)">Edytuj</button>
            <button @click="deleteUser(user.id)">Usuń</button>
            <button @click="releaseUser(user.id)">Zwolnij</button>
            <button @click="generateContract(user.id)">Wygeneruj umowę</button>
          </td>
          <td class="ct">
            <span :style="{ color: user.isActive ? 'green' : 'red' }" class="status-dot">
              ●
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination controls -->
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Poprzednia</button>
      <span>Strona {{ currentPage }} z {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Następna</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const users = ref([
  { id: 1, first_name: 'Jan', last_name: 'Kowalski', tenure: '125 dni', time_remaining: '250 dni', isActive: true },
  { id: 2, first_name: 'Anna', last_name: 'Nowak', tenure: '1 rok 13 dni', time_remaining: '150 dni' },
  { id: 3, first_name: 'Piotr', last_name: 'Wiśniewski', tenure: '90 dni', time_remaining: '100 dni' },
  { id: 4, first_name: 'Maria', last_name: 'Zielińska', tenure: '2 lata 5 dni', time_remaining: 'Brak limitu' },
  { id: 5, first_name: 'Katarzyna', last_name: 'Szymańska', tenure: '75 dni', time_remaining: '200 dni' },
  { id: 6, first_name: 'Tomasz', last_name: 'Wójcik', tenure: '3 lata', time_remaining: 'Brak limitu' },
  { id: 7, first_name: 'Michał', last_name: 'Kowalczyk', tenure: '150 dni', time_remaining: '100 dni' },
  { id: 8, first_name: 'Agnieszka', last_name: 'Kamińska', tenure: '200 dni', time_remaining: '50 dni' },
  { id: 9, first_name: 'Paweł', last_name: 'Lewandowski', tenure: '1 rok 30 dni', time_remaining: 'Brak limitu' },
  { id: 10, first_name: 'Jacek', last_name: 'Zając', tenure: '300 dni', time_remaining: '125 dni' }
]);

const searchQuery = ref('');
const searchBy = ref('last_name');
const itemsPerPage = ref(10);
const currentPage = ref(1);

// Filtered users based on search query and search field
const filteredUsers = computed(() => {
  if (searchQuery.value === '') return users.value;
  return users.value.filter(user =>
    user[searchBy.value].toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Paginated users based on current page and items per page
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

// Total pages calculation
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
});

// Pagination controls
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Action handlers
const editUser = (id: number) => {
  alert(`Edytuj użytkownika o ID: ${id}`);
};

const deleteUser = (id: number) => {
  alert(`Usuń użytkownika o ID: ${id}`);
};

const releaseUser = (id: number) => {
  alert(`Zwolnij użytkownika o ID: ${id}`);
};

const generateContract = (id: number) => {
  alert(`Wygeneruj umowę dla użytkownika o ID: ${id}`);
};

// Search action on button click
const searchUsers = () => {
  currentPage.value = 1; // Reset to first page when search is triggered
};
</script>

<style scoped>
.status-dot {
  font-size: 24px;
}

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.pagination-settings {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 3px;
}

th {
  /* background-color: #f2f2f2; */
  text-align: left;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
