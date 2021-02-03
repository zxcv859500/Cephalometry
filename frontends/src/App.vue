<template>
  <div id="app">
    <div class="header">
      <div class="header-box">
        <el-image
                style="width: 50px; height: 50px"
                :src="logo"
                class="logo-image"></el-image>
        <div
                class="page-header"
                title="랜드마크 검출 시스템">
          <p class="header-content">랜드마크 검출 시스템</p>
        </div>
      </div>
    </div>
    <div
            class="main"
            style="padding: 0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  const logo = require('./assets/logo.jpg');

export default {
  name: 'app',
  data() {
    return {
      logo
    }
  }
}
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .el-upload {
    width: 100%;
  }
  .el-menu {
    margin: 0;
  }
  #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .header {
    border-bottom: 1px solid #e4e4e5;
    margin-top: 5px;
    padding: 10px;
  }
  .header-box {
    display: flex;
    margin: auto;
    width: 65%;
  }
  .main {
    height: 1400px;
    padding: 0;
  }
  .page-header {
    font-size: 25px;
    font-family: "나눔스퀘어라운드 ExtraBold";
    color: #550b50;
  }
  .page-header {
    height: 60px;
    text-align: center;
  }
  .header-content {
    margin-top: 12px;
    margin-left: 10px;
  }
</style>
