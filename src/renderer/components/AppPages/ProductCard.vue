<template>
  <div class="product-card--standard">
    <div class="panel panel-default panel-product">
      <div class="panel-body">
        <img :src="url" class="img-block">
        <h5 class="product-title" style="height: 38px;">{{product.name}}</h5>
      </div>
      <div class="panel-footer">
        <div class="row">
          <div class="col-xs-6">
            <div class="product-details">
              <div class="product-cost">
                <span class="starting-price">¥{{product.price}}</span>起
              </div>
              <div class="product-nutritional-info">
              </div>
            </div>
          </div>
          <div class="product-controls">
            <a class="btn btn-block action-create btn-red" @click="addProduct(product)">添加</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-card',
  data () {
    return {
      product: this.good,
      prodKind: this.kind,
      url: 'src/renderer/assets/' + this.kind + '/' + this.good.id + '.png'
      // url: ''
    }
  },
  methods: {
    addProduct (pro) {
      pro.kind = this.prodKind
      this.$emit('transPro', pro)
    }
  },
  props: ['good', 'kind']
}
</script>

<style scoped>
.product-card--standard {
  position: relative;
  min-height: 1px;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  width: 33.33333333%;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.panel-default {
  border-color: #ddd;
}

.panel-product {
  margin-bottom: 20px;
  border-color: #ddd;
  font-family: "Flama Condensed Medium", "SimHei", "Microsoft YaHei", "STXihei", "σìÄµûçτ╗åΘ╗æ", sans-serif;
}

.panel-body {
  position: relative;
  padding: 15px;
}

.panel-body:before {
  box-sizing: border-box;
  content: " ";
  display: table;
}

.panel-body:after {
  box-sizing: border-box;
  clear: both;
  content: " ";
  display: table;
}

.img-block {
  height: 15rem;
  width: 20rem;
  display: block;
  max-width: 100%;
  border: 0;
  vertical-align: middle;
  box-sizing: border-box;
}

.h5,
h5 {
  font-family: "Flama Condensed Medium", "SimHei", "Microsoft YaHei", "STXihei", "σìÄµûçτ╗åΘ╗æ", sans-serif;
  font-weight: 500;
  line-height: 1.1;
  color: #3d3d3d;
  margin-top: 10px;
  font-size: 1.125rem;
  display: block;
  font-size: 0.83em;
  -webkit-margin-before: 1.67em;
  -webkit-margin-after: 1.67em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
}

.product-title {
  margin-bottom: 0;
  text-align: center;
}

.panel-footer {
  height: 5rem;
  border-top-color: #F3F3F3;
  background-size: 100%;
  background-image: linear-gradient(#f3f3f3, #fff 15px, #fff);
  background-clip: padding-box;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  position: relative;
  box-sizing: border-box;
}

.panel-footer:last-child {
  border-radius: 0 0 4px 4px;
}

.col-xs-6 {
  box-sizing: border-box;
  float: left;
  position: relative;
  min-height: 1px;
  width: 50%;
  padding-left: 5px;
  padding-right: 5px;
}

.panel-product .product-details,
.panel-product .product-details i {
  line-height: 1.15;
  box-sizing: border-box;
}

.panel-product .product-cost {
  color: #44900c;
  font-size: 20px;
  font-size: 1.25rem;
  white-space: nowrap;
  box-sizing: border-box;
}

*,
 :after,
 :before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.product-controls {
  padding-left: 5px;
  padding-right: 5px;
  float: left;
}

.panel-product .product-controls {
  width: 50%;
  text-align: right;
}

.btn {
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 2px;
  user-select: none;
  text-transform: uppercase;
  font-family: "Flama Condensed Medium", "SimHei", "Microsoft YaHei", "STXihei", "σìÄµûçτ╗åΘ╗æ", sans-serif;
}

.btn-red {
  background-color: #ec4c34;
  border-width: 1px;
  background-size: 100%;
  color: #fff!important;
  border-color: transparent;
  background-image: linear-gradient(#ec4c34, #d21920);
}

.btn-block {
  display: block;
  width: 100%;
}

a {
  background: 0 0;
  color: #35b6f9;
  text-decoration: none;
}

.row {
  height: 70%;
  margin: 1rem;
}
</style>
