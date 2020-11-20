<template>
  <div>
    <vts-statistic-require></vts-statistic-require>
    <br>
    <vts-statistic-sample></vts-statistic-sample>
    <br>
    <vts-statistic-api-key></vts-statistic-api-key>
  </div>
</template>

<script>
import VtsStatisticRequire from "@/views/VtsStatisticRequire";
import VtsStatisticSample from "@/views/VtsStatisticSample";
import VtsStatisticApiKey from "@/views/VtsStatisticApiKey";

export default {
  name: "VtsDashBoard",
  props: [],
  components:{
    VtsStatisticRequire,
    VtsStatisticSample,
    VtsStatisticApiKey,
  },
  data(){
    return {
    }
  },
  computed:{

  },
  methods: {
  },
  created(){

  },
  mounted(){
  },
}
</script>

<style scoped>

</style>