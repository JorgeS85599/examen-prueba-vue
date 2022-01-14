<template>
  <form
    @submit.prevent="addOffer(newOffer.empresa)"
    @reset="cancelar"
    role="form"
  >
    <fieldset>
      <legend>{{ this.editando ? "Editar" : "Nueva" }} oferta</legend>
      <!-- Aquí los inputs y botones del form -->
      <div v-if="this.editando" class="form-group">
        <label for="newoffer-id" id="newoffer-id-label">Id: </label><br />
        <input
          type="number"
          id="newoffer-id-input"
          name="newoffer-id"
          disabled
          v-model.number="newOffer.id"
          class="form-control"
        /><br />
      </div>
      <div class="form-group">
        <label for="newoffer-empresa">Empresa: </label><br />
        <select
          name="newoffer-empresa"
          v-model="newOffer.empresa"
          class="form-control"
        >
          <option selected>--- Selecciona empresa ---</option>
          <option
            v-for="(empresa, key) in empresas"
            :key="key"
            :value="empresa.id"
          >
            {{ empresa.nombre }}
          </option></select
        ><br />
      </div>
      <div class="form-group">
        <label for="newoffer-nombre">Nombre: </label><br />
        <input
          type="text"
          id="newoffer-nombre"
          name="newoffer-nombre"
          v-model="newOffer.nombre"
          class="form-control"
        /><br />
      </div>
      <div class="form-group">
        <label for="newoffer-contrato" id="newoffer-contrato-label"
          >Contrato: </label
        ><br />
        <input
          type="text"
          id="newoffer-contrato-input"
          name="newoffer-contrato"
          v-model="newOffer.contrato"
          class="form-control"
        /><br />
      </div>
      <div class="form-group">
        <label for="newoffer-contacto" id="newoffer-contacto-label"
          >Contacto: </label
        ><br />
        <input
          type="text"
          id="newoffer-contacto-input"
          name="newoffer-contacto"
          v-model="newOffer.contacto"
          class="form-control"
        /><br />
      </div>
      <div class="form-group">
        <label for="newoffer-contrato" id="newoffer-contrato-label"
          >Email:</label
        ><br />
        <input
          type="email"
          id="newoffer-email-input"
          name="newoffer-email"
          v-model="newOffer.email"
          class="form-control"
        /><br />
      </div>
      <button type="submit" class="btn btn-default btn-primary">
        {{ this.editando ? "Editar" : "Añadir" }}
      </button>
      <button type="reset" class="btn btn-danger">Cancelar</button>
    </fieldset>
  </form>
</template>

<script>
import api from "../service/API";
export default {
  name: "offer-form",
  props: ["id"],
  data() {
    return {
      newOffer: {
        id: "",
        empresa: "",
        nombre: "",
        contrato: "",
        contacto: "",
        email: "",
      },
      editando: false,
    };
  },
  computed: {
    empresas() {
      return this.$store.state.empresas;
    },
  },
  methods: {
    addOffer(id) {
      if (this.id) {
        api.ofertas
          .modify(this.newOffer)
          .then(() => {
            this.newOffer = {};
            this.$router.push("/ofertas/" + id);
          })
          .catch((error) =>
            console.error(
              "Error: " + (error.statusText || error.message || error)
            )
          );
      } else {
        api.ofertas
          .create(this.newOffer)
          .then(() => {
            this.newOffer = {};
            this.$router.push("/ofertas/" + id);
          })
          .catch((error) =>
            console.error(
              "Error: " + (error.statusText || error.message || error)
            )
          );
      }
    },
    loadOffer() {
      api.ofertas
        .getOne(this.id)
        .then((response) => (this.newOffer = response.data))
        .catch((error) =>
          console.error(
            "Error: " + (error.statusText || error.message || error)
          )
        );
    },
    cancelar() {
      this.$router.push("/empresas");
    },
  },
  mounted() {
    if (this.id) {
      this.editando = true;
      this.loadOffer();
    }
  },
};
</script>