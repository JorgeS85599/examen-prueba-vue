<template>
  <div class="ofertas">
    <h1>Listado de ofertas</h1>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Empresa</th>
          <th>Nombre</th>
          <th>Contrato</th>
          <th>Contacto</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(oferta, key) in ofertas" :key="key">
          <td>{{ oferta.id }}</td>
          <td>{{ empresa }}</td>
          <td>{{ oferta.nombre }}</td>
          <td>{{ oferta.contrato }}</td>
          <td>{{ oferta.contacto }}</td>
          <td>{{ oferta.email }}</td>
          <td>
            <button
              @click="viewEmpresa(oferta)"
              class="unitsup btn btn-secondary"
            >
              <i class="bi bi-building"></i>
            </button>
            <button
              @click="deleteOferta(oferta)"
              class="unitsup btn btn-secondary"
            >
              <i class="bi bi-trash"></i>
            </button>
            <button
              @click="editarOferta(oferta)"
              class="unitsup btn btn-secondary"
            >
              <i class="bi bi-pencil"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="anyadirOferta" class="btn btn-default btn-primary">
      Añadir oferta
    </button>
  </div>
</template>

<script>
import Api from "../service/API";
export default {
  name: "Ofertas",
  props: ["id"],
  data() {
    return {
      ofertas: [],
    };
  },
  mounted() {
    Api.ofertas
      .getAllById(this.id)
      .then((response) => (this.ofertas = response.data))
      .catch((error) => console.log(error));
  },
  computed: {
    empresa() {
      return this.$store.state.empresas.find((item) => (item.id = this.id))
        .nombre;
    },
  },
  methods: {
    viewEmpresa(oferta) {
      this.$router.push("/viewEmpresa/" + oferta.empresa);
    },
    deleteOferta(oferta) {
      Api.ofertas
        .delete(oferta.id)
        .then(this.ofertas.splice(this.ofertas.indexOf(oferta), 1))
        .catch((error) => console.log(error));
    },
    anyadirOferta() {
      this.$router.push("/newOffer");
    },
    editarOferta(oferta) {
      this.$router.push("/editOffer/" + oferta.id);
    },
  },
};
</script>