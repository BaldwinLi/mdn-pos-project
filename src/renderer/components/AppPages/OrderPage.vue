<template>
    <div id="wrapper">
        <el-row :gutter="1" class="tac" style="overflow: hidden;">
            <el-col :span="1">
                <el-menu default-active="0" style="height: 100%;width:15%;position: absolute;" class="el-menu-vertical-demo" theme="dark">
                    <el-menu-item style="font-size:1.3rem" v-for="(item, index) in items" :item="item" :key="item.id" :index="index.toString()" @click="switchMenu($event, index)">{{item.title}}</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="25">
                <div class="row row-narrow">
                    <product-card v-for="good in goods.goods" :key="good.id" :kind="goods.id" :good="good" @transPro="getAddPro"></product-card>
                </div>
            </el-col>
            <el-col :span="8">
                <el-menu style="height: 100%;width:15%;position: absolute;right:0;" class="el-menu-vertical-demo">
                    <div style="height:85%; overflow-x:hidden;overflow-y: scroll">
                        <el-menu-item v-for="(item, index) in selected" v-on:click="deleteProduct(index)" :item="item" :key="item.id" :index="index.toString()">
                            ￥{{item.price}}
                            <img class="row-image" :src="item.selectedImage">{{item.name}}
                            <img src="src/renderer/assets/delete.png" style="position: absolute;left: 15rem;top: 1.3rem;" @click="deleteProduct(index)">
                        </el-menu-item>
                    </div>
                    <div style="height:15%">
                        <p style="margin: 1rem;">合计金额：￥{{sumPrice  + '.00'}}</p>
                        <el-button class="menu-btn" type="primary" @click="openPayDialog">订单结算</el-button>
                        <el-button class="menu-btn" style="margin-left:2rem" @click="cancel">取消订单</el-button>
                    </div>
                </el-menu>
            </el-col>
        </el-row>

        <el-dialog title="订单结算" :visible.sync="payDialogVisible">
            <p style="margin: 2rem;">合计金额：￥{{sumPrice  + '.00'}}</p>
            <el-button class="menu-btn" @click="toPay('alipay')"><img class="btn-icon" src="src/renderer/assets/Alipay.jpg">支付宝</el-button>
            <el-button class="menu-btn" @click="toPay('weichat')"><img class="btn-icon" src="src/renderer/assets/weichat.jpg">微信</el-button>
            <el-button class="menu-btn" @click="toPay('unionpay')"><img class="btn-icon" src="src/renderer/assets/UnionPay.png">银联卡</el-button>
            <el-button class="menu-btn"  @click="toPay('cash')">现金支付</el-button>
            <div style="margin-bottom: 4rem;"></div>
        </el-dialog>

        <el-dialog title="结算" :visible.sync="posDialogVisible" size="small">
            <p style="height: 5rem;margin-left: 2rem;line-height: 2rem;">
                <el-button style="display: inline-block; width:25%;margin-top: 2rem;" class="menu-btn" type="primary">向其他POS同步数据</el-button>
                <label style="display: inline-block; width:7%; margin: 2rem; margin-right: 0">数据内容</label>
                <el-input style="display: inline-block; width:25%; margin: 2rem;" placeholder="请输入数据"></el-input>
            </p>
            <p style="height: 5rem;margin-left: 2rem;line-height: 2rem;">
                <el-button style="display: inline-block; width:25%;margin-top: 2rem;" class="menu-btn" type="primary">读取扫描枪数据</el-button>
                <label style="display: inline-block; width:7%; margin: 2rem;margin-right: 0">扫描结果</label>
                <label style="display: inline-block; width:25%; margin: 2rem;">3321239855</label>
            </p>
            <p style="height: 5rem;margin-left: 3rem;line-height: 2rem;">
                <label style="display: inline-block; width:15%; margin: 2rem; margin-right: 0">打开/关闭钞箱</label>
                <el-switch style="display: inline-block; margin: 2rem;" v-model="isOpen" on-color="#13ce66" off-color="#ff4949"></el-switch>
            </p>
            <div style="margin-bottom: 4rem;"></div>
        </el-dialog>
    </div>
</template>

<script>
import ProductCard from './ProductCard'

function requestPay (type, detail, csb) {
  window.Vue.http.post('src/sw_cache/orderFormRecords.json', detail)
    .then(function (response) {
      csb && csb('success', response)
    })
    .catch(function (error) {
      //   sendMessage(detail).then(function () {
      //     csb && csb('success', error)
      //   })
      debugger
      csb && csb('success', error)
    })
}

// function sendMessage (message) {
//   return new Promise(function (resolve, reject) {
//     var messageChannel = new MessageChannel()
//     messageChannel.port1.onmessage = function (event) {
//       if (event.data.error) {
//         reject(event.data.error)
//       } else {
//         resolve(event.data)
//       }
//     }
//     navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2])
//   })
// }

export default {
  name: 'order-page',
  data () {
    return {
      items: [],
      goods: {},
      selected: [],
      sumPrice: 0,
      payDialogVisible: false,
      posDialogVisible: false,
      isOpen: false
    }
  },
  components: { ProductCard },
  methods: {
    switchMenu (event, index) {
      this.goods = this.items[index]
    },
    getAddPro (pro) {
      pro.selectedImage = 'src/renderer/assets/' + pro.kind + '/' + pro.id + '.png'
      this.selected.push(pro)
      this.sumPrice += parseFloat(pro.price)
    },
    cancel () {
      if (this.selected.length > 0) {
        this.$confirm('您已经选择过了多款商品，确定要取消所有订单？', '提 示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '订单取消成功!'
          })
          this.selected = []
          this.sumPrice = 0
        })
      } else {
        this.$alert('您还没有选择具体商品，请选择至少一款商品。', '提 示', {
          confirmButtonText: '确定'
        })
      }
    },
    openPayDialog () {
      if (this.selected.length > 0) {
        this.payDialogVisible = true
      } else {
        this.$alert('您还没有选择具体商品，请选择至少一款商品。', '提 示', {
          confirmButtonText: '确定'
        })
      }
    },
    deleteProduct (index) {
      this.sumPrice -= parseFloat(this.selected[index].price)
      this.selected.splice(index, 1)
    },
    toPay (type) {
      let scope = this
      let orderDetail = {
        sum: scope.sumPrice,
        date_uuid: Date.now(),
        list: scope.selected
      }
      requestPay(type, orderDetail, function (result, res) {
        if (result === 'success') {
          scope.$message({
            type: 'success',
            message: '支付成功!'
          })
          scope.payDialogVisible = false
          scope.posDialogVisible = true
          scope.selected = []
        } else {
          scope.$message.error('支付失败!\n' + res)
        }
      })
    }
  },
  created () {
    let scope = this

    this.$http.get('src/dummay.json')
      .then(function (response) {
        scope.items = response.data
        scope.goods = scope.items[0]
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
    background: radial-gradient( ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, .9) 100%);
    height: 100vh;
    /* padding: 60px 80px; */
    width: 100vw;
}

#logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
}

main {
    display: flex;
    justify-content: space-between;
}

main>div {
    flex-basis: 50%;
}

.left-side {
    display: flex;
    flex-direction: column;
}

.welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
}

.title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
}

.title.alt {
    font-size: 18px;
    margin-bottom: 10px;
}

.doc p {
    color: black;
    margin-bottom: 10px;
}

.doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
}

.doc button.alt {
    color: #42b983;
    background-color: transparent;
}

.tac {
    height: 100%;
    width: 100%;
}

.row {

    margin-left: -15px;
    margin-right: -15px;
}

.row-narrow {
    margin-left: -5px;
    margin-right: -5px;
    height: 100%;
    width: 65%;
    position: absolute;
    left: 350px;
    overflow-y: scroll;
}

row:before {
    display: table;
    content: " ";
}

.row:after {
    clear: both;
    
}

.row-image {
    height: 2rem;
    margin: 1rem;
}

.btn-icon {
    height: 1rem;
}

.menu-btn {
    margin-left: 2rem;
    height: 2.5rem;
    float: left;
}
</style>
