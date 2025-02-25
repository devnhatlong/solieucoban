<template>
  <input :id="id" :class="class"/>
</template>
<script>
  
   export default {
    name: 'MyDatePicker',
    props: ['id', 'modelValue', 'class'],
    emits: ['update:modelValue','update:id'],
    setup(props){

    },
    data() {
     
      return {
        datepicker: null,   

        config: {
          uiLibrary: 'bootstrap5',
          format: DEFAULT_DATE_FORMAT.toLowerCase(),
          value: this.modelValue?this.modelValue:moment().format(DEFAULT_DATE_FORMAT),
          change: this.onchange
        },
        
      }
    },
    created() {
    },
    mounted() {          
      if(!this.datepicker){              
        this.$nextTick(function () {               
          this.datepicker = $("#" + this.id).datepicker(this.config);
        })
      }
      
    },
    unmounted() {   
        this.datepicker.destroy();
    },

    methods: {   
      onchange(e) {
        this.$emit('update:modelValue', this.datepicker.value())
      }
    },
    computed:{
      setId(id_param){
        this.$emit('update:id', id_param);
      }
    }
  }
</script>