<template>
    <div class="product-info">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-5">TẠO BIỂU MẪU</h3>
            <router-link to="/product">Trở về</router-link>
        </div>
        
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Tên biểu mẫu</label>
                <div class="col-sm-9">
                    <input type="text"
                           class="form-control"
                           v-model="bieumau.tenBieuMau"
                           @blur="validate()"
                           v-bind:class="{'is-invalid': errors.tenbieumau}"
                           />
                    <div class="invalid-feedback text-left" v-if="errors.tenbieumau">{{ errors.tenbieumau }}</div>
                </div>
                </div>
                <!--<div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Price</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" 
                        v-model="product.price" 
                        @blur="validate()"
                        v-bind:class="{'is-invalid': errors.price}"
                        />
                 <div class="invalid-feedback text-left" v-if="errors.price">{{ errors.price }}</div>
                    </div>
                </div>-->
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Mô tả</label>
                    <div class="col-sm-9">
                        <textarea class="form-control" rows="3" v-model="bieumau.moTa"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9 text-left">
                        <button type="submit" class="btn btn-primary">Save</button> &nbsp;
                        <button type="reset" class="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'bieumauForm',
        
        data(){
            return{
                errors:{
                    tenbieumau:'',                  
                    mota:'',
                },
                bieumau:{
                    tenBieuMau:'',                   
                    moTa:'',
                }
            }
        },
        created(){
            let mabieumau = this.$route.params.id
            if(mabieumau){
                this.getBieuMau(mabieumau)
            }
            

        },
        methods:{
            validate(){
                this.errors = {
                    tenbieumau:'',                 
                    mota:'',
                }
                var isValid = true;
                if(!this.bieumau.tenBieuMau){
                    this.errors.tenbieumau = 'Tên biểu mẫu là bắt buộc';  
                    isValid = false;     
                }
                /*if(!this.product.price){
                    this.errors.price = 'Product price is required!';       
                }else if(!this.isNumber(this.product.price)){
                    this.errors.price = 'Product price must be number!';   
                }*/
                return isValid;
            },
            isNumber(value){
                return /^\d*$/.test(value)
            },
            save(){
               
                if(this.validate()){
                    this.$request.post('https://localhost:5001/api/BieuMau', this.bieumau).then(res =>{
                        if(res.data.success){
                            this.$router.push({name:'bieumau.list'})
                            return
                        }
                        else{
                            alert("Something went wrong");
                        }
                    })
                }
                
                
            },
            getBieuMau(mabieumau){
                this.$request.get(`https://localhost:5001/api/BieuMau/${mabieumau}`).then(res=>{
  
                    this.bieumau = res.data
                })
            }
        }

    }
</script>