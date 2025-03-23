<template>
  <header class="header-banner">
    <div class="banner-content">
      <img class="icon" src="@/assets/imgs/logo.png" alt="icon" />
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderBanner',
  props: {
    title: {
      type: String,
      default: '闪电接码',
    },
    subtitle: {
      type: String,
      default: '接码短信平台集合实卡短信接码',
    },
  },
}
</script>

<style scoped>
.header-banner {
  height: 260px;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;
  padding-top: 40px;
  background-image: linear-gradient(0deg, #005cc1, #273eb2);
}
.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 70px;
}
.banner-content h1 {
  margin: 20px 0;
  font-size: 36px;
}
.banner-content p {
  font-size: 20px;
}
</style>
