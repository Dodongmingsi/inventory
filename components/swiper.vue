]<template>
  <body>
  <div class="slider">
    <div class="slides">
      <!--radio buttons start-->
      <input type="radio" name="radio-btn" id="radio1">
      <input type="radio" name="radio-btn" id="radio2">
      <input type="radio" name="radio-btn" id="radio3">
      <input type="radio" name="radio-btn" id="radio4">
      <input type="radio" name="radio-btn" id="radio5">
      <!--radio buttons end-->

      <!--slide images start-->
      <div class="slide first">
        <img src="/images/fandb.jpg" alt="Food and Beverages">
      </div>
      <div class="slide">
        <img src="/images/hande.jpg" alt="">
      </div>
      <div class="slide">
        <img src="/images/handp.jpg" alt="">
      </div>
      <div class="slide">
        <img src="/images/handw.jpg" alt="">
      </div>
      <div class="slide">
        <img src="/images/bandg.jpg" alt="">
      </div>
      <!--slide images end-->

      <!--automatic nav start-->
      <div class="nav-auto">
        <div class="auto-btn1"></div>
        <div class="auto-btn2"></div>
        <div class="auto-btn3"></div>
        <div class="auto-btn4"></div>
        <div class="auto-btn5"></div>
      </div>
      <!--automatic nav end-->

      <!--manual nav start-->
      <div class="nav-manual">
        <label for="radio1" class="manual-btn"></label>
        <label for="radio2" class="manual-btn"></label>
        <label for="radio3" class="manual-btn"></label>
        <label for="radio4" class="manual-btn"></label>
        <label for="radio5" class="manual-btn"></label>
      </div>
    

      <!--manual nav end-->
    </div>
  </div>
</body>
</template>

<script>
export default {
  mounted() {
    let counter = 1;
    setInterval(() => {
      document.getElementById('radio' + counter).checked = true;
      counter++;
      if (counter > 5) {
        counter = 1;
      }
    }, 5000);
  },
};
</script>

<style scoped>
body{
  margin: 0;
  padding: 0;
  height: 100vh ;
  display: flex;
  justify-content: center;
  align-items: center;
  background: teal-200;
}

.slider{
  width: full;
  height: full;
  border-radius: 10px;
  overflow: hidden;
}

.slides{
  width: full;
  height: full;
  display: flex;
}

.slide input{
  display: none;
}

.slide{
  width: full;
  transition: 2s;
}

.slide img{
  width: full;
  height: full;
}

/* css for manual slide nav*/
.nav-manual{
position: absolute;
width: full;
margin-top: -40px;
display: flex;
justify-content: center;
}

.manual-btn{
  border: 2px solid teal-300;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: 1s;
}
.manual-btn:not(:last-child){
  margin-right: 40px;
}

.manual-btn:hover{
  background: emerald-100;
}

#radio1:checked ~ .first{
  margin-left: 0 ;
}

#radio2:checked ~ .first{
  margin-left: -20%;
}

#radio3:checked ~ .first{
  margin-left: -40%;
}

#radio4:checked ~ .first{
  margin-left:-60%;
}

#radio5:checked ~ .first{
  margin-left: -80% ;
}

/*css for auto nav*/

.nav-auto{
  position: absolute;
  display: flex;
  width: full;
  justify-content: center;
  margin-top: 460px;
}

.nav-auto div{
  border: 2px solid teal-300;
  padding: 5px;
  border-radius: 10px;
  transition: 1s;
}

.nav-auto div:not(:last-child){
  margin-right: 40px;

}

#radio1:checked ~ .nav-auto .auto-btn1{
  background: emerald-100;
}

#radio2:checked ~ .nav-auto .auto-btn2{
  background: emerald-100;
}

#radio3:checked ~ .nav-auto .auto-btn3{
  background: emerald-100;
}

#radio4:checked ~ .nav-auto .auto-btn4{
  background: emerald-100;
}

#radio5:checked ~ .nav-auto .auto-btn5{
  background: emerald-100;
}
</style>