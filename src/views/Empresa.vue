<template>
  <div class="empresa">
    <h1>Empresa {{this.id}}</h1>
  </div>
</template>

<script>
export default {
  name: "Empresa",
  props: ['id'],
};
</script>