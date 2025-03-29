<template>
  <div class="home-wrapper">
    <!-- 联系客服 & 常见问题区域 -->
    <div class="top-blocks">
      <div class="service-btn" @click="onContact">
        <div class="left">
          <!-- <i class="el-icon-service"></i> -->
          <img
            width="20px"
            src="data:image/png;base64,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"
          />
          <span>联系客服</span>
        </div>
        <div class="right">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- <div class="faq-btn" @click="onFAQClick">
        <i class="el-icon-warning"></i>
        <span>常见问题</span>
      </div> -->
    </div>
    <!-- API 内容 -->
    <div data-v-aa8ae1d0="" class="view2" style="padding-top: 10px">
      <div data-v-aa8ae1d0="" class="el-page-header" style="margin: 15px">
        <div class="el-page-header__left" @click="goBack">
          <i class="el-icon-back"></i>
          <div class="el-page-header__title">返回</div>
        </div>
        <div class="el-page-header__content">API文档</div>
      </div>
      <div data-v-aa8ae1d0="" class="tablebox">
        <h3 data-v-aa8ae1d0="">一、登录账号</h3>
        <p data-v-aa8ae1d0="">传参方式：Get</p>
        <p data-v-aa8ae1d0="">请求参数：</p>
        <div
          data-v-aa8ae1d0=""
          class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition"
          style="width: 100%"
        >
          <div class="hidden-columns">
            <div data-v-aa8ae1d0=""></div>
            <div data-v-aa8ae1d0=""></div>
            <div data-v-aa8ae1d0=""></div>
            <div data-v-aa8ae1d0=""></div>
            <div data-v-aa8ae1d0=""></div>
          </div>
          <div class="el-table__header-wrapper">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="el-table__header"
              style="width: 856px"
            >
              <colgroup>
                <col name="el-table_1_column_1" width="60" />
                <col name="el-table_1_column_2" width="180" />
                <col name="el-table_1_column_3" width="180" />
                <col name="el-table_1_column_4" width="218" />
                <col name="el-table_1_column_5" width="218" />
                <col name="gutter" width="0" />
              </colgroup>
              <thead class="has-gutter">
                <tr class="">
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_1_column_1 is-center is-leaf el-table__cell"
                  >
                    <div class="cell">序号</div>
                  </th>
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_1_column_2 is-center is-leaf el-table__cell"
                  >
                    <div class="cell">参数名</div>
                  </th>
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_1_column_3 is-center is-leaf el-table__cell"
                  >
                    <div class="cell">含义</div>
                  </th>
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_1_column_4 is-center is-leaf el-table__cell"
                  >
                    <div class="cell">类型</div>
                  </th>
                  <th
                    colspan="1"
                    rowspan="1"
                    class="el-table_1_column_5 is-center is-leaf el-table__cell"
                  >
                    <div class="cell">说明</div>
                  </th>
                  <th class="el-table__cell gutter" style="width: 0px; display: none"></th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="el-table__body-wrapper is-scrolling-none">
            <table
              cellspacing="0"
              cellpadding="0"
              border="0"
              class="el-table__body"
              style="width: 856px"
            >
              <colgroup>
                <col name="el-table_1_column_1" width="60" />
                <col name="el-table_1_column_2" width="180" />
                <col name="el-table_1_column_3" width="180" />
                <col name="el-table_1_column_4" width="218" />
                <col name="el-table_1_column_5" width="218" />
              </colgroup>
              <tbody>
                <tr class="el-table__row">
                  <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center el-table__cell">
                    <div class="cell"><div>1</div></div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_1_column_2 is-center el-table__cell">
                    <div class="cell">username</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_1_column_3 is-center el-table__cell">
                    <div class="cell">用户名</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_1_column_4 is-center el-table__cell">
                    <div class="cell">String</div>
                  </td>
                  <td rowspan="1" colspan="1" class="el-table_1_column_5 is-center el-table__cell">
                    <div class="cell">必填</div>
                  </td>
                </tr>
                <!---->
              </tbody>
            </table>
            <!----><!---->
          </div>
          <!----><!----><!----><!---->
          <div class="el-table__column-resize-proxy" style="display: none"></div>
        </div>
      </div>
      <div data-v-aa8ae1d0="" class="el-divider el-divider--horizontal"><!----></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'API',
  data() {
    return {
      isMobile: false,
      isIOS: false,
    }
  },
  methods: {
    goBack() {
      window.location.href = '/'
    },
    // 检测移动设备
    checkMobileDevice() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      this.isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      )
      this.isIOS = /iphone|ipad|ipod/i.test(userAgent.toLowerCase())
    },
    // 联系客服
    onContact() {
      // this.$message.info('联系客服：可弹出客服二维码或聊天窗口')
      window.location.href = '/'
    },
  },
}
</script>

<style scoped>
.el-page-header {
  display: flex;
  line-height: 24px;
}
.tablebox {
  padding: 30px;
}
.tablebox p {
  margin: 10px 0;
}

.view2 {
  width: 1000px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 20px;
}

.home-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px 15px;
}

/* 内容区域容器 */
.home-wrapper > * {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

/* 移动端适配 */
@media screen and (max-width: 800px) {
  .home-wrapper > * {
    max-width: 100%;
  }
}

/* 顶部按钮区域 */
.top-blocks {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}
.service-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 15px;
  background: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
}
.service-btn .left {
  display: flex;
  align-items: center;
  gap: 5px;
}
.service-btn i {
  font-size: 16px;
}
.service-btn span {
  font-size: 14px;
  color: #005cc1;
}
.service-btn .right {
  color: #005cc1;
}
.faq-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 0 30px;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}
.faq-btn .left {
  display: flex;
  align-items: center;
  gap: 5px;
}

.faq-btn span {
  font-size: 14px;
  color: #005cc1;
}

/* 提示文本 */
.tip-text {
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

/* Tabs容器 */
.tabs-wrapper {
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  min-height: 600px;
}

/* 表单样式 */
.jiema-form {
  padding-bottom: 15px;
}
.jiema-form .form-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.jiema-form .form-item .label {
  min-width: 85px;
  font-size: 14px;
  text-align: right;
  padding-right: 12px;
}
.jiema-form-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 12px;
  position: relative;
  margin-bottom: 15px;
}
.jiema-form-row::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #ebeef5;
}
.jiema-form-row:last-child::after {
  display: none;
}

/* 所有输入框和选择框统一宽度 */
.jiema-form-row :deep(.el-select),
.jiema-form-row:first-child :deep(.el-input) {
  width: 230px;
}
.row-pj :deep(.el-select) {
  width: 100%;
}

/* 底部边框 */
.border-bottom {
  width: 100%;
  height: 1px;
  background-color: #ebeef5;
  margin: 15px 0;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .jiema-form {
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
  .jiema-form-row :deep(.el-col-8) {
    width: 100%;
  }
  .jiema-form-row :deep(.el-col-16) {
    width: 100%;
  }
  .jiema-form :deep(.el-input) {
    width: 100%;
  }
  .jiema-form :deep(.el-select) {
    width: 73%;
  }
  .jiema-form .form-item .label {
    min-width: 85px;
  }
  .spcial-number :deep(.el-input) {
    width: 73%;
  }
}

/* 按钮组 */
.btn-group {
  display: flex;
  margin: 15px 0;
  justify-content: space-around;
}

.btn-group :deep(.el-button.is-plain) {
  background: #ecf5ff;
  border-color: #b3d8ff;
  color: #409eff;
}
.btn-group :deep(.el-button.is-plain:hover) {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}

/* 结果列表 */
.result-list {
  padding: 15px 15%;
}
/* 移动端 */
@media screen and (max-width: 768px) {
  .result-list {
    padding: 15px 5%;
  }
}

.result-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
  width: 100%;
}

.result-item .label {
  width: 70px;
  color: #606266;
  font-size: 14px;
}
.result-item .value {
  flex: 1;
  color: #909399;
  font-size: 14px;
  margin-right: 10px;
}

/* 调整Element UI组件样式 */
:deep(.el-tabs__nav-wrap) {
  padding: 0 15px;
}
:deep(.el-tabs__item) {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}

/* 发短信模块特定样式 */
.result-list .result-item .value .el-input {
  width: 100%;
  margin-right: 10px;
}

.result-list .result-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
}

.result-list .result-item .label {
  min-width: 85px;
  font-size: 14px;
  color: #606266;
  text-align: right;
  padding-right: 12px;
}

.result-list .result-item .value {
  flex: 1;
  display: flex;
  align-items: center;
}

.result-list .result-item .el-button {
  margin-left: 10px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .result-list .result-item {
    flex-direction: column;
    align-items: stretch;
  }

  .result-list .result-item .label {
    text-align: left;
    margin-bottom: 8px;
  }

  .result-list .result-item .value {
    margin-bottom: 8px;
  }

  .result-list .result-item .el-button {
    width: 100%;
    margin-left: 0;
    margin-top: 8px;
  }
}

/* 打电话模块样式 */
.call-setting-group {
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 15px;
}

.timeline-card {
  border: 1px solid #e4e7ed;
}

.setting-title {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.setting-content {
  display: flex;
  align-items: center;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

.radio-group.rent-period {
  flex-wrap: nowrap;
  justify-content: space-between;
}
.radio-item-noarea {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  justify-content: flex-start;
  margin-bottom: 10px;
  background: none;
}
.radio-item-noarea .active {
  color: #409eff;
  background-color: unset;
}
.radio-item {
  /* display: flex; */
  /* align-items: center; */
  padding: 12px 20px 12px 10px;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100px;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.radio-item.active {
  border-color: #409eff;
  background-color: #f0f7ff;
}

.radio-circle {
  width: 18px;
  height: 18px;
  border: 1px solid #dcdfe6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.radio-item.active .radio-circle {
  border-color: #409eff;
}

.radio-inner {
  width: 10px;
  height: 10px;
  background-color: #409eff;
  border-radius: 50%;
}

.radio-label {
  font-size: 20px;
  color: #606266;
  font-weight: 500;
}

.radio-item.active .radio-label {
  color: #409eff;
}
.radio-item-noarea.active .radio-label {
  color: #409eff;
}

.area-select {
  width: 100%;
}

.call-footer {
  margin-top: 25px;
}

.fee-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.buy-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 4px;
}

.card-wrapper {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.el-radio-group {
  display: flex;
}

.el-radio-group .el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0px;
}

@media screen and (max-width: 768px) {
  .radio-label {
    font-size: 14px;
  }
  .el-radio-group {
    display: block;
  }
  .radio-group.rent-period {
    flex-wrap: wrap;
  }

  .radio-item {
    flex: 1 1 calc(50% - 10px);
    min-width: 0;
  }
}

/* 充值页面样式 */
.chongzhi-wrapper {
  max-width: 644px;
  margin: 0 auto;
  font-size: 14px;
}
/* input框 只有底部border，覆盖样式 */
.chongzhi-wrapper :deep(.el-input__inner) {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
}

.chongzhi-wrapper p {
  text-align: center;
}
.recharge-list {
  list-style: none;
  padding: 0;
  text-align: center;
}

.recharge-list li {
  padding: 10px 0;
  cursor: pointer;
}

.recharge-list li:hover {
  color: #409eff;
}

.recharge-input {
  margin: 20px 0;
}

.recharge-input .input-wrapper {
  display: flex;
  align-items: center;
}

.recharge-input .label {
  min-width: 90px;
  text-align: right;
}

.recharge-input .el-input {
  flex: 1;
}

.recharge-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  margin-top: 20px;
}

/* 平台公告弹窗样式 */
.announcement-dialog >>> .el-dialog {
  border-radius: 8px;
  margin-top: 10vh !important;
  max-width: 500px;
}

.announcement-dialog >>> .el-dialog__header {
  text-align: left;
  padding: 15px 20px;
  position: relative;
}

.announcement-dialog >>> .el-dialog__title {
  font-size: 18px;
  font-weight: bold;
}

.announcement-dialog >>> .el-dialog__headerbtn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 16px;
}

.announcement-content {
  min-height: 150px;
  /* padding: 0 20px; */
}

.announcement-content p {
  margin: 15px 0;
  line-height: 1.6;
  font-size: 17px;
}

.announcement-dialog >>> .el-dialog__footer {
  text-align: right;
  padding: 15px 20px;
}

.announcement-dialog >>> .el-button {
  padding: 10px 20px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .announcement-dialog >>> .el-dialog {
    width: 90% !important;
    margin: 15vh auto !important;
    border-radius: 12px;
    overflow: hidden;
    max-height: 70vh;
  }

  .announcement-dialog >>> .el-dialog__header {
    padding: 12px 15px;
  }

  .announcement-dialog >>> .el-dialog__title {
    font-size: 16px;
  }

  .announcement-dialog >>> .el-dialog__headerbtn {
    top: 12px;
    right: 15px;
    font-size: 18px;
  }

  .announcement-dialog >>> .el-dialog__headerbtn .el-dialog__close {
    font-weight: bold;
  }

  .announcement-content {
    min-height: 120px;
    /* padding: 0 15px; */
    max-height: 50vh;
    overflow-y: auto;
  }

  .announcement-content p {
    margin: 12px 0;
    font-size: 14px;
  }

  .announcement-dialog >>> .el-dialog__footer {
    padding: 12px 15px;
  }

  .announcement-dialog >>> .el-button {
    padding: 8px 15px;
    font-size: 13px;
  }
}

/* 用户信息卡片样式 */
.user-info-wrapper {
  width: 644px;
  margin: 0 auto;
  padding: 20px 10px;
}
.user-card {
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 15px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-text {
  display: flex;
  align-items: center;
}

.username {
  font-size: 17px;
  font-weight: 700;
  margin: 0;
  margin-right: 10px;
}

.vip-badge {
  background: #8b4513;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* 菜单卡片样式 */
.menu-card {
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  color: #333;
  font-size: 14px;
}

/* .menu-list li:last-child {
  border-bottom: none;
} */

.menu-list li:hover {
  background-color: #f5f7fa;
}

.menu-list li span:last-child {
  color: #999;
}

.menu-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .user-info-wrapper {
    width: auto;
    margin: 0 auto;
    padding: 10px;
  }
  .user-card,
  .menu-card {
    margin: 10px;
  }

  .user-info {
    padding: 12px;
  }

  .avatar {
    width: 50px;
    height: 50px;
  }

  .username {
    font-size: 17px;
    font-weight: 700;
  }

  .menu-list li {
    padding: 12px;
  }
}
</style>
