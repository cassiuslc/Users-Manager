
<template v-slot:item.email="{ value }">
    <v-chip>
        <a id="emailDestaque" :href="'mailto:' + value">{{ value }}</a>
    </v-chip>
</template>
  
  <script>
  export default {
    props: {
      value: String
    }
  }
  </script>
  