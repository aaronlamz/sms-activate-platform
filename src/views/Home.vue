<template>
  <div class="home-wrapper">
    <!-- 顶部蓝色Banner -->
    <header class="header-banner">
      <div class="banner-content">
        <h1>闪电接码</h1>
        <p>接码短信平台集合实卡短信接码</p>
      </div>
    </header>

    <!-- 联系客服 & 常见问题区域 -->
    <div class="top-blocks">
      <el-card class="contact-card">
        <div class="contact-header">
          <el-button type="text" icon="el-icon-service" @click="onContact"> 联系客服 </el-button>
        </div>
        <p class="contact-desc">
          任何项目都能审批码，可注册任何APP/网站，SIM卡可复接。
          具体的资费请先少量测试，售后联系客服。
        </p>
      </el-card>

      <el-card class="faq-card">
        <div class="faq-header" @click="onFAQClick">
          <i class="el-icon-bell"></i>
          <span>常见问题</span>
        </div>
      </el-card>
    </div>

    <!-- Tabs 区域（接码、发短信、打电话、充值、我的） -->
    <el-tabs v-model="activeTab" class="main-tabs">
      <!-- 接码 Tab -->
      <el-tab-pane label="接码" name="jiema">
        <div class="tab-content">
          <el-form label-width="90px">
            <el-form-item label="运营商：">
              <el-select v-model="jiemaForm.carrier" placeholder="请选择运营商">
                <el-option label="国内接码" value="国内接码"></el-option>
                <el-option label="海外接码" value="海外接码"></el-option>
              </el-select>
              <span style="margin-left: 20px">归属地：</span>
              <el-select v-model="jiemaForm.location" placeholder="不限" style="width: 120px">
                <el-option label="不限" value="不限"></el-option>
                <el-option label="北京" value="北京"></el-option>
                <el-option label="上海" value="上海"></el-option>
                <!-- 更多选项... -->
              </el-select>
            </el-form-item>

            <el-form-item label="项目类：">
              <el-select v-model="jiemaForm.projectType" placeholder="请选择项目">
                <el-option label="全业务(任何项目都能接)----0.60 USDT" value="all"></el-option>
                <el-option label="某业务1" value="type1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="指定号码：">
              <el-input v-model="jiemaForm.phonePrefix" placeholder="输入号段(例:152,188)" />
            </el-form-item>
          </el-form>

          <!-- 操作按钮组 -->
          <div class="btn-group">
            <el-button type="primary" @click="onGetNumber">获取号码</el-button>
            <el-button @click="onBlockNumber">拉黑号码</el-button>
            <el-button type="danger" @click="onReleaseNumber">释放号码</el-button>
          </div>

          <!-- 结果展示 -->
          <div class="result-box">
            <el-form label-width="90px">
              <el-form-item label="手机号码：">
                <span>{{ jiemaResult.phone || '请先取号' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(jiemaResult.phone)"
                  >复制</el-button
                >
              </el-form-item>
              <el-form-item label="验 证 码：">
                <span>{{ jiemaResult.code || '等待获取验证码' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(jiemaResult.code)"
                  >复制</el-button
                >
              </el-form-item>
              <el-form-item label="短信内容：">
                <span>{{ jiemaResult.smsContent || '等待获取短信内容' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(jiemaResult.smsContent)"
                  >复制</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>

      <!-- 发短信 Tab -->
      <el-tab-pane label="发短信" name="faduanxin">
        <div class="tab-content">
          <el-form label-width="90px">
            <el-form-item label="运营商：">
              <el-select v-model="faduanxinForm.carrier" placeholder="请选择运营商">
                <el-option label="国内接码" value="国内接码"></el-option>
                <el-option label="海外接码" value="海外接码"></el-option>
              </el-select>
              <span style="margin-left: 20px">归属地：</span>
              <el-select v-model="faduanxinForm.location" placeholder="不限" style="width: 120px">
                <el-option label="不限" value="不限"></el-option>
                <el-option label="北京" value="北京"></el-option>
                <el-option label="上海" value="上海"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="项目类：">
              <el-select v-model="faduanxinForm.projectType" placeholder="请选择项目">
                <el-option label="全业务(任何项目都能接)----0.60 USDT" value="all"></el-option>
                <el-option label="某业务1" value="type1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="指定号码：">
              <el-input v-model="faduanxinForm.phonePrefix" placeholder="例: 152, 188" />
            </el-form-item>
          </el-form>
          <div class="btn-group">
            <el-button type="primary" @click="onGetNumberSMS">获取号码</el-button>
            <el-button @click="onBlockNumberSMS">拉黑号码</el-button>
            <el-button type="danger" @click="onReleaseNumberSMS">释放号码</el-button>
          </div>

          <!-- 发短信额外功能 -->
          <div class="result-box">
            <el-form label-width="90px">
              <el-form-item label="手机号码：">
                <span>{{ faduanxinResult.phone || '请先取号' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(faduanxinResult.phone)"
                  >复制</el-button
                >
              </el-form-item>
              <el-form-item label="发送号码：">
                <el-input v-model="faduanxinForm.sendTo" placeholder="请输入收短信号码" />
                <el-button size="mini" @click="onPasteNumber">粘贴</el-button>
              </el-form-item>
              <el-form-item label="短信内容：">
                <el-input v-model="faduanxinForm.smsText" placeholder="请输入短信内容" />
                <el-button type="primary" size="mini" @click="onSendSMS">发送</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>

      <!-- 打电话 Tab -->
      <el-tab-pane label="打电话" name="dadianhua">
        <div class="tab-content">
          <!-- 使用 el-timeline 将各步骤分成多个节点 -->
          <el-timeline>
            <!-- 第一步：选择 虚拟号/实体号 -->
            <el-timeline-item>
              <!-- 时间戳标题，可自定义文字 -->
              <div class="el-timeline-item__timestamp is-top">虚拟号/实体号</div>
              <!-- 内容区 -->
              <div class="el-timeline-item__content">
                <el-card class="is-always-shadow">
                  <div class="el-card__body">
                    <el-radio-group v-model="callForm.type">
                      <el-radio label="虚拟号">虚拟号</el-radio>
                      <el-radio label="实体号">实体号</el-radio>
                    </el-radio-group>
                  </div>
                </el-card>
              </div>
            </el-timeline-item>

            <!-- 第二步：号码归属地 -->
            <el-timeline-item>
              <div class="el-timeline-item__timestamp is-top">号码归属地</div>
              <div class="el-timeline-item__content">
                <el-card class="is-always-shadow">
                  <div class="el-card__body">
                    <el-select
                      v-model="callForm.location"
                      placeholder="CN/中国 +86"
                      style="width: 80%"
                    >
                      <el-option label="CN/中国 +86" value="CN+86"></el-option>
                      <el-option label="US/美国 +1" value="US+1"></el-option>
                      <el-option label="HK/香港 +852" value="HK+852"></el-option>
                      <!-- ...其他选项 -->
                    </el-select>
                  </div>
                </el-card>
              </div>
            </el-timeline-item>

            <!-- 第三步：租期 -->
            <el-timeline-item>
              <div class="el-timeline-item__timestamp is-top">租期</div>
              <div class="el-timeline-item__content">
                <el-card class="is-always-shadow">
                  <div class="el-card__body">
                    <el-radio-group v-model="callForm.rentPeriod">
                      <el-radio label="日租">日租</el-radio>
                      <el-radio label="周租">周租</el-radio>
                      <el-radio label="月租">月租</el-radio>
                      <el-radio label="季租">季租</el-radio>
                    </el-radio-group>
                  </div>
                </el-card>
              </div>
            </el-timeline-item>

            <!-- 第四步：套餐 -->
            <el-timeline-item>
              <div class="el-timeline-item__timestamp is-top">套餐</div>
              <div class="el-timeline-item__content">
                <el-card class="is-always-shadow">
                  <div class="el-card__body">
                    <el-radio-group v-model="callForm.packageType">
                      <el-radio label="隐私电话">隐私电话</el-radio>
                      <el-radio label="隐私短信">隐私短信</el-radio>
                    </el-radio-group>
                  </div>
                </el-card>
              </div>
            </el-timeline-item>
          </el-timeline>

          <!-- 底部：费用 + 购买按钮 -->
          <p class="estimate-fee">预计费用：{{ callForm.estimatedFee }} USDT</p>
          <el-button type="primary" @click="onBuyNumber" style="width: 100%"> 立即购买 </el-button>
        </div>
      </el-tab-pane>

      <!-- 充值 Tab -->
      <el-tab-pane label="充值" name="chongzhi">
        <div class="tab-content">
          <p>今日USDT汇率1U等于7.3 RMB平台余额</p>
          <p>充值金额/价格关系：</p>
          <ul>
            <li>单次充值10 USDT: 平台余额73</li>
            <li>单次充值20 USDT: 赠送百分之1</li>
            <li>单次充值50 USDT: 赠送百分之2</li>
            <li>单次充值100 USDT: 赠送百分之5</li>
            <li>单次充值500 USDT: 赠送百分之10</li>
          </ul>
          <p>仅限单次充值赠送，充值后自动到账。</p>

          <el-form label-width="90px">
            <el-form-item label="充值金额：">
              <el-input v-model="chongzhiForm.amount" placeholder="请先输入充值金额" />
              <span>USDT</span>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="onRecharge">充值</el-button>
        </div>
      </el-tab-pane>

      <!-- 我的 Tab -->
      <el-tab-pane label="我的" name="wode">
        <div class="tab-content">
          <el-card class="user-card">
            <div class="user-info">
              <img src="https://via.placeholder.com/60" alt="avatar" class="avatar" />
              <div class="user-text">
                <p class="username">{{ userInfo.username }}</p>
                <span v-if="userInfo.vip" class="vip-badge">VIP</span>
              </div>
            </div>
          </el-card>

          <el-card class="menu-card">
            <ul class="menu-list">
              <li>
                <span>账户余额</span>
                <span>{{ userInfo.balance }} RMB</span>
              </li>
              <li @click="onAPI">
                <span>API文档</span>
                <span>点击查看 ></span>
              </li>
              <li @click="onLogs">
                <span>使用记录</span>
                <span>点击查看 ></span>
              </li>
              <li @click="onLogout">
                <span>退出</span>
              </li>
            </ul>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeTab: 'jiema', // 默认进入接码
      // 接码
      jiemaForm: {
        carrier: '国内接码',
        location: '不限',
        projectType: 'all',
        phonePrefix: '',
      },
      jiemaResult: {
        phone: '',
        code: '',
        smsContent: '',
      },
      // 发短信
      faduanxinForm: {
        carrier: '国内接码',
        location: '不限',
        projectType: 'all',
        phonePrefix: '',
        sendTo: '',
        smsText: '',
      },
      faduanxinResult: {
        phone: '',
      },
      // 打电话
      callForm: {
        type: '虚拟号',
        location: 'CN+86',
        rentPeriod: '日租',
        packageType: '隐私电话',
        estimatedFee: 0.315,
      },
      // 充值
      chongzhiForm: {
        amount: '',
      },
      // 我的
      userInfo: {
        username: 'xabc123456',
        vip: true,
        balance: 0,
      },
    }
  },
  methods: {
    // 联系客服
    onContact() {
      this.$message.info('联系客服：可弹出客服二维码或聊天窗口')
    },
    // 常见问题
    onFAQClick() {
      this.$message.info('跳转到常见问题页面或弹窗')
    },

    // 接码 Tab
    onGetNumber() {
      this.jiemaResult.phone = '188****8888'
      this.$message.success('已获取号码')
    },
    onBlockNumber() {
      this.$message.warning('号码已拉黑')
    },
    onReleaseNumber() {
      this.jiemaResult.phone = ''
      this.jiemaResult.code = ''
      this.jiemaResult.smsContent = ''
      this.$message.success('号码已释放')
    },
    onCopy(content) {
      if (!content) {
        this.$message.warning('暂无可复制内容')
        return
      }
      // 实际可使用 Clipboard API 等
      this.$message.success(`已复制：${content}`)
    },

    // 发短信 Tab
    onGetNumberSMS() {
      this.faduanxinResult.phone = '188****0000'
      this.$message.success('已获取号码')
    },
    onBlockNumberSMS() {
      this.$message.warning('号码已拉黑')
    },
    onReleaseNumberSMS() {
      this.faduanxinResult.phone = ''
      this.faduanxinForm.sendTo = ''
      this.faduanxinForm.smsText = ''
      this.$message.success('号码已释放')
    },
    onPasteNumber() {
      this.faduanxinForm.sendTo = this.faduanxinResult.phone
    },
    onSendSMS() {
      if (!this.faduanxinForm.sendTo || !this.faduanxinForm.smsText) {
        this.$message.error('请输入发送号码和短信内容')
        return
      }
      this.$message.success('短信发送成功')
    },

    // 打电话 Tab
    onBuyNumber() {
      this.$message.success(`成功购买${this.callForm.type}，租期：${this.callForm.rentPeriod}`)
    },

    // 充值 Tab
    onRecharge() {
      if (!this.chongzhiForm.amount) {
        this.$message.error('请先输入充值金额')
        return
      }
      this.$message.success(`充值${this.chongzhiForm.amount} USDT成功！`)
      this.chongzhiForm.amount = ''
    },

    // 我的 Tab
    onAPI() {
      this.$message.info('查看API文档...')
    },
    onLogs() {
      this.$message.info('查看使用记录...')
    },
    onLogout() {
      this.$message.success('退出成功')
      // 可跳转到登录：this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.home-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 顶部蓝色Banner */
.header-banner {
  background: #0052d9; /* 可自定义渐变: linear-gradient(135deg, #00aaff, #7f00ff) */
  color: #fff;
  text-align: center;
  padding: 30px 20px;
}
.banner-content h1 {
  margin: 0;
  font-size: 28px;
}
.banner-content p {
  margin: 5px 0 0;
  font-size: 14px;
}

/* 联系客服 & 常见问题区域 */
.top-blocks {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 10px 0 10px;
}
.contact-card,
.faq-card {
  padding: 15px;
}
.contact-header {
  margin-bottom: 10px;
}
.contact-desc {
  margin: 0;
  font-size: 13px;
  color: #666;
}
.faq-header {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 14px;
}

/* Tabs 主容器 */
.main-tabs {
  margin: 10px;
  background: #fff;
}

/* 每个 Tab 内的内容 */
.tab-content {
  padding: 20px;
}

/* 按钮组 */
.btn-group {
  margin: 15px 0;
  display: flex;
  gap: 10px;
}

/* 结果展示区 */
.result-box {
  margin-top: 15px;
  background: #fafafa;
  padding: 15px;
  border: 1px solid #ebebeb;
}

/* 打电话 Tab */
.estimate-fee {
  margin: 20px 0;
  font-weight: bold;
}

/* 我的 Tab */
.user-card {
  margin-bottom: 15px;
}
.user-info {
  display: flex;
  align-items: center;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.user-text {
  margin-left: 10px;
}
.username {
  font-size: 16px;
  margin: 0;
}
.vip-badge {
  background-color: gold;
  color: #333;
  padding: 2px 6px;
  border-radius: 3px;
  margin-left: 5px;
  font-size: 12px;
}

/* 我的 -> 菜单列表 */
.menu-card {
  padding: 10px;
}
.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.menu-list li {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
</style>
