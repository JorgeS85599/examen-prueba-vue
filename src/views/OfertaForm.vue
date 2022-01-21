<template>
  <div>
    <h1>{{ editando ? "Editar" : "Nueva" }} oferta</h1>
    <validation-observer v-slot="{ handleSubmit }">
      <form
        novalidate
        @submit.prevent="handleSubmit(addOffer)"
        @reset="cancelar"
        role="form"
      >
        <fieldset>
          
          <!-- Aquí los inputs y botones del form -->
          <div v-if="editando" class="form-group">
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
            <validation-provider v-slot="{ errors }" rules="required">
              <label for="newoffer-empresa">Empresa: </label><br />
              <select
                name="newoffer-empresa"
                v-model="newOffer.empresa"
                class="form-control"
                required
              >
                <option selected>--- Selecciona empresa ---</option>
                <option
                  v-for="(empresa, key) in empresas"
                  :key="key"
                  :value="empresa.id"
                >
                  {{ empresa.nombre }}
                </option></select
              ><span>{{ errors[0] }}</span>
              <br />
            </validation-provider>
          </div>

          <div class="form-group">
            <validation-provider
              v-slot="{ errors }"
              rules="required|min:10|max:50"
            >
              <label for="newoffer-nombre">Nombre: </label><br />
              <input
                type="text"
                id="newoffer-nombre"
                name="newoffer-nombre"
                v-model="newOffer.nombre"
                class="form-control"
                autofocus
                minLength="10"
                maxLength="50"
                required
              /><span>{{ errors[0] }}</span
              ><br />
            </validation-provider>
          </div>

          <div class="form-group">
            <validation-provider v-slot="{ errors }" rules="required">
              <label for="newoffer-contrato" id="newoffer-contrato-label"
                >Contrato: </label
              ><br />
              <input
                type="text"
                id="newoffer-contrato-input"
                name="newoffer-contrato"
                v-model="newOffer.contrato"
                class="form-control"
              /><span>{{ errors[0] }}</span
              ><br />
            </validation-provider>
          </div>

          <div class="form-group">
            <validation-provider v-slot="{ errors }" rules="required">
              <label for="newoffer-contacto" id="newoffer-contacto-label"
                >Contacto: </label
              ><br />
              <input
                type="text"
                id="newoffer-contacto-input"
                name="newoffer-contacto"
                v-model="newOffer.contacto"
                class="form-control"
                required
              /><span>{{ errors[0] }}</span
              ><br />
            </validation-provider>
          </div>

          <div class="form-group">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <label for="newoffer-contrato" id="newoffer-contrato-label"
                >Email:</label
              ><br />
              <input
                type="email"
                id="newoffer-email-input"
                name="newoffer-email"
                v-model="newOffer.email"
                class="form-control"
                required
              /><span>{{ errors[0] }}</span
              ><br />
            </validation-provider>
          </div>
          <button type="submit" class="btn btn-default btn-primary">
            {{ editando ? "Editar" : "Añadir" }}
          </button>
          <button type="reset" class="btn btn-danger">Cancelar</button>
        </fieldset>
      </form>
    </validation-observer>
  </div>  
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required, min, max, email } from "vee-validate/dist/rules";
extend("required", required);
extend("min", min);
extend("max", max);
extend("email", email);

import api from "../service/API";
export default {
  name: "offer-form",
  props: ["id"],
  components: {
    ValidationProvider,
    ValidationObserver
  },
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
    addOffer() {
      if (this.id) {
        api.ofertas
          .modify(this.newOffer)
          .then(() => {
            this.$router.push("/ofertas/" + this.newOffer.empresa);
            this.newOffer = {};
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
            this.$router.push("/ofertas/" + this.newOffer.empresa);
            this.newOffer = {};
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