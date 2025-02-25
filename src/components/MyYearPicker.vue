<template>
  <input type="text" readonly class="yearpicker form-control text-end" value="" :id="id" />
</template>
<script>

  export default {
    name: 'MyYearPicker',
    props: ['id', 'modelValue'],
    emits: ['update:modelValue', 'update:id'],
    setup(props) {

    },
    data() {
      return {
        yearpicker: null,
        config: {
          autoHide: true,
          year: null,
          startYear: null,
          endYear: null,
          itemTag: 'li',
          selectedClass: 'selected',
          disabledClass: 'disabled',
          hideClass: 'hide',
          highlightedClass: 'highlighted',         
          onChange: this.onchange
        },
      }
    },
    created() {
    },
    mounted() {
      if (!this.yearpicker) {
        this.$nextTick(function () {
          this.yearpicker = $("#" + this.id).yearpicker(this.config);
          $("#" + this.id).val(this.modelValue);
          console.log(this.modelValue);
        })
      }
    },
    unmounted() {
      //this.yearpicker.destroy();
    },

    methods: {
      onchange(e) {
        if($("#" + this.id).val().length==0){
          return;
        }
        this.$emit('update:modelValue',  $("#" + this.id).val())
      }
    },
    computed: {
      setId(id_param) {
        this.$emit('update:id', id_param);
      }
    }
  }
</script>