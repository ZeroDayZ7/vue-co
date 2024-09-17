<template>
  <div>
    <h1>Dodaj użytkownika</h1>
    <form @submit.prevent="submitForm">
      <table>
        <tr>
          <td><label for="first_name">Imię:</label></td>
          <td><input v-model="form.first_name" type="text" id="first_name" required /></td>
          <td><label for="last_name">Nazwisko:</label></td>
          <td><input v-model="form.last_name" type="text" id="last_name" required /></td>
        </tr>
        <tr>
          <td><label for="pesel">PESEL:</label></td>
          <td><input v-model="form.pesel" type="text" id="pesel" required /></td>
          <td><label for="postcode">Kod:</label></td>
          <td><input v-model="form.postcode" type="text" id="postcode" required /></td>
        </tr>
        <tr>
          <td><label for="city">Miejscowość:</label></td>
          <td><input v-model="form.city" type="text" id="city" required /></td>
          <td><label for="street">Ulica:</label></td>
          <td><input v-model="form.street" type="text" id="street" required /></td>
        </tr>
        <tr>
          <td><label for="building_no">Nr Budynku:</label></td>
          <td><input v-model="form.building_no" type="text" id="building_no" required /></td>
          <td><label for="apartment_no">Nr Mieszkania:</label></td>
          <td><input v-model="form.apartment_no" type="text" id="apartment_no" /></td>
        </tr>
        <tr>
          <td><label for="hire_date">Data zatrudnienia:</label></td>
          <td><input v-model="form.hire_date" type="date" id="hire_date" required /></td>
          <td><label for="contract_type">Typ umowy:</label></td>
          <td>
            <select v-model="form.contract_type" id="contract_type" @change="onContractTypeChange" required>
              <option value="czasokreslony">Czas określony</option>
              <option value="czasnieokreslony">Czas nieokreślony</option>
              <option value="zlecenie">Zlecenie</option>
            </select>
          </td>
        </tr>
        <tr v-if="form.contract_type === 'czasokreslony'">
          <td><label for="contract_start">Data rozpoczęcia:</label></td>
          <td><input v-model="form.contract_start" type="date" id="contract_start" required /></td>
          <td><label for="contract_end">Data zakończenia:</label></td>
          <td><input v-model="form.contract_end" type="date" id="contract_end" required /></td>
        </tr>
        <tr>
          <td><label for="hourly_rate">Stawka godzinowa:</label></td>
          <td><input v-model="form.hourly_rate" type="number" step="0.01" id="hourly_rate" /></td>
          <td><label for="salary">Wynagrodzenie miesięczne:</label></td>
          <td><input v-model="form.salary" type="number" step="0.01" id="salary" /></td>
        </tr>
        <tr>
          <td colspan="4" style="text-align: center;">
            <button type="submit">Dodaj</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  first_name: '',
  last_name: '',
  pesel: '',
  postcode: '',
  city: '',
  street: '',
  building_no: '',
  apartment_no: '',
  hire_date: '',
  contract_type: '',
  contract_start: '',
  contract_end: '',
  hourly_rate: '',
  salary: ''
});

const onContractTypeChange = () => {
  if (form.value.contract_type !== 'czasokreslony') {
    form.value.contract_start = '';
    form.value.contract_end = '';
  }
};

const submitForm = async () => {
  try {
    await axios.post('/add_user', form.value);
    alert('Użytkownik został dodany.');
    form.value = {
      first_name: '',
      last_name: '',
      pesel: '',
      postcode: '',
      city: '',
      street: '',
      building_no: '',
      apartment_no: '',
      hire_date: '',
      contract_type: '',
      contract_start: '',
      contract_end: '',
      hourly_rate: '',
      salary: ''
    };
  } catch (error) {
    console.error('Błąd podczas dodawania użytkownika:', error);
    alert('Wystąpił błąd.');
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 10px;
}

td {
  padding: 8px;
}

label {
  display: inline-block;
  min-width: 120px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
