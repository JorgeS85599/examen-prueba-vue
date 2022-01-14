<template>
  <div class="empresas">
    <h1>Listado de Empresas</h1>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Domicilio</th>
          <th>Localidad</th>
          <th>Contacto</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empresa, key) in empresas" :key="key">
          <td>{{ empresa.id }}</td>
          <td>{{ empresa.nombre }}</td>
          <td>{{ empresa.domicilio }}</td>
          <td>{{ empresa.localidad }}</td>
          <td>{{ empresa.contacto }}</td>
          <td>{{ empresa.email }}</td>
          <td>
            <button @click="viewEmpresa(empresa)" class="unitsup btn btn-secondary">
              <i class="bi bi-house"></i>
            </button>
            <button @click="viewOfertas(empresa)" class="unitsup btn btn-secondary">
              <i class="bi bi-receipt-cutoff"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Empresas",
  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },
  methods : {
    viewEmpresa(empresa) {
      this.$router.push('/viewEmpresa/'+ empresa.id)
    },
    viewOfertas(empresa) {
      this.$router.push('/ofertas/'+ empresa.id)
    }
  }
};
</script>