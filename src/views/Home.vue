<template>
  <div class="home-wrapper">
    <!-- 平台公告弹窗 -->
    <el-dialog
      title="平台公告"
      :visible.sync="showAnnouncement"
      :width="isMobile ? '95%' : '400px'"
      :fullscreen="false"
      :show-close="true"
      custom-class="announcement-dialog"
      :append-to-body="true"
      center
    >
      <div class="announcement-content">
        <p>本网站接码号全部实卡接码,接码率可以达到百分之98,不成功不扣费,欢迎大家使用!</p>
        <p>本平台对注册来的小号都是首卡,收到验证码则订单服务完成!</p>
        <p>所有业务均来对接第三方平台！本站无自营业务!</p>
        <p>全球接码短信平台,接码、短信代发一体化接码平台</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showAnnouncement = false">确认</el-button>
      </span>
    </el-dialog>

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

    <!-- 提示文本 -->
    <div class="tip-text">
      任何项目都能审批码，可注册任何APP/网站，SIM卡可复接。 具体的资费请先少量测试，售后联系客服。
    </div>

    <!-- Tabs 区域（接码、发短信、打电话、充值、我的） -->
    <div class="tabs-wrapper">
      <div class="faq-btn" @click="onFAQClick">
        <div class="left">
          <!-- <i class="el-icon-service"></i> -->
          <img
            width="20px"
            src="data:image/png;base64,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"
          />
          <span>常见问题</span>
        </div>
        <div class="right"></div>
      </div>
      <el-tabs v-model="activeTab" class="main-tabs">
        <!-- 接码 Tab -->
        <el-tab-pane label="接码" name="jiema">
          <div class="tab-content">
            <el-form :model="jiemaForm" class="jiema-form">
              <el-row :gutter="24" class="jiema-form-row">
                <el-col :span="8">
                  <div class="form-item">
                    <span class="label">运营商：</span>
                    <el-select v-model="jiemaForm.carrier" placeholder="请选择运营商">
                      <el-option label="国内接码" value="1"></el-option>
                      <el-option label="海外接码" value="2"></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="form-item">
                    <span class="label">归属地：</span>
                    <el-select v-model="jiemaForm.location" placeholder="不限">
                      <!-- <el-option label="不限" value="不限"></el-option> -->
                      <el-option
                        v-for="item in jiemaForm.carrier === '1' ? locationList1 : locationList2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="jiema-form-row row-pj">
                <el-col :span="16">
                  <div class="form-item">
                    <span class="label">项目类：</span>
                    <el-select v-model="jiemaForm.projectType" placeholder="请选择项目">
                      <el-option
                        v-for="item in itemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id.toString()"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="jiema-form-row spcial-number">
                <el-col :span="16">
                  <div class="form-item">
                    <span class="label">指定号码：</span>
                    <el-input
                      v-model="jiemaForm.phonePrefix"
                      placeholder="输入号码或号段前3位或（例：152、188） 可不填"
                    />
                  </div>
                </el-col>
              </el-row>
            </el-form>
            <div class="border-bottom"></div>
            <!-- 操作按钮组 -->
            <div class="btn-group">
              <el-button type="primary" plain @click="onGetNumber">获取号码</el-button>
              <el-button type="primary" plain @click="onBlockNumber">拉黑号码</el-button>
              <el-button type="primary" plain @click="onReleaseNumber">释放号码</el-button>
            </div>

            <!-- 结果展示 -->
            <div class="result-list">
              <div class="result-item">
                <span class="label">手机号码：</span>
                <span class="value">{{ jiemaResult.phone || '请先取号' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(jiemaResult.phone)"
                  >复制</el-button
                >
              </div>
              <div class="result-item">
                <span class="label">验证码：</span>
                <span class="value">{{ jiemaResult.code || '等待获取验证码' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(jiemaResult.code)"
                  >复制</el-button
                >
              </div>
              <div class="result-item">
                <span class="label">短信内容：</span>
                <span class="value">{{ jiemaResult.smsContent || '等待获取短信内容' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(jiemaResult.smsContent)"
                  >复制</el-button
                >
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 发短信 Tab -->
        <el-tab-pane label="发短信" name="faduanxin">
          <div class="tab-content">
            <el-form :model="faduanxinForm" class="jiema-form">
              <el-row :gutter="24" class="jiema-form-row">
                <el-col :span="8">
                  <div class="form-item">
                    <span class="label">运营商：</span>
                    <el-select v-model="faduanxinForm.carrier" placeholder="请选择运营商">
                      <el-option label="国内接码" value="国内接码"></el-option>
                      <el-option label="海外接码" value="海外接码"></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="form-item">
                    <span class="label">归属地：</span>
                    <el-select v-model="faduanxinForm.location" placeholder="不限">
                      <el-option label="不限" value="不限"></el-option>
                      <el-option
                        v-for="item in faduanxinForm.carrier === '国内接码'
                          ? locationList1
                          : locationList2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="jiema-form-row row-pj">
                <el-col :span="16">
                  <div class="form-item">
                    <span class="label">项目类：</span>
                    <el-select v-model="faduanxinForm.projectType" placeholder="请选择项目">
                      <el-option
                        v-for="item in itemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id.toString()"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="jiema-form-row spcial-number">
                <el-col :span="16">
                  <div class="form-item">
                    <span class="label">指定号码：</span>
                    <el-input
                      v-model="faduanxinForm.phonePrefix"
                      placeholder="输入号码或号段前3位或（例：152、188） 可不填"
                    />
                  </div>
                </el-col>
              </el-row>
            </el-form>
            <div class="border-bottom"></div>
            <!-- 操作按钮组 -->
            <div class="btn-group">
              <el-button type="primary" plain @click="onGetNumberSMS">获取号码</el-button>
              <el-button type="primary" plain @click="onBlockNumberSMS">拉黑号码</el-button>
              <el-button type="primary" plain @click="onReleaseNumberSMS">释放号码</el-button>
            </div>

            <!-- 结果展示 -->
            <div class="result-list">
              <div class="result-item">
                <span class="label">手机号码：</span>
                <span class="value">{{ faduanxinResult.phone || '请先取号' }}</span>
                <el-button type="primary" size="mini" @click="onCopy(faduanxinResult.phone)"
                  >复制</el-button
                >
              </div>
              <div class="result-item">
                <span class="label">发送号码：</span>
                <span class="value">
                  <el-input v-model="faduanxinForm.sendTo" placeholder="请输入收短信号码" />
                </span>
                <el-button type="primary" size="mini" @click="onPasteNumber">粘贴</el-button>
              </div>
              <div class="result-item">
                <span class="label">短信内容：</span>
                <span class="value">
                  <el-input v-model="faduanxinForm.smsText" placeholder="请输入短信内容" />
                </span>
                <el-button type="primary" size="mini" @click="onSendSMS">发送</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 打电话 Tab -->
        <el-tab-pane label="打电话" name="dadianhua">
          <div class="tab-content">
            <!-- 虚拟号/实体号 (保持卡片样式) -->
            <div class="card-wrapper">
              <div class="call-setting-group">
                <div class="setting-content">
                  <div class="radio-group">
                    <div
                      class="radio-item-noarea"
                      :class="{ active: callForm.type === '虚拟号' }"
                      @click="callForm.type = '虚拟号'"
                    >
                      <div class="radio-circle">
                        <div class="radio-inner" v-if="callForm.type === '虚拟号'"></div>
                      </div>
                      <span class="radio-label">虚拟号</span>
                    </div>
                    <div
                      class="radio-item-noarea"
                      :class="{ active: callForm.type === '实体号' }"
                      @click="callForm.type = '实体号'"
                    >
                      <div class="radio-circle">
                        <div class="radio-inner" v-if="callForm.type === '实体号'"></div>
                      </div>
                      <span class="radio-label">实体号</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 其他行恢复时间线样式 -->
              <el-timeline>
                <!-- 号码归属地 -->
                <el-timeline-item>
                  <div class="el-timeline-item__timestamp is-top">号码归属地</div>
                  <div class="el-timeline-item__content">
                    <el-card class="is-always-shadow timeline-card">
                      <div class="el-card__body">
                        <el-select
                          v-model="callForm.location"
                          placeholder="CN/中国 +86"
                          style="width: 80%"
                        >
                          <el-option
                            v-for="country in countryList"
                            :key="country.ID"
                            :label="country.name"
                            :value="
                              country.name.split('/')[0] + '+' + country.name.split('+')[1].trim()
                            "
                          ></el-option>
                        </el-select>
                      </div>
                    </el-card>
                  </div>
                </el-timeline-item>

                <!-- 租期 -->
                <el-timeline-item>
                  <div class="el-timeline-item__timestamp is-top">租期</div>
                  <div class="el-timeline-item__content">
                    <el-card class="is-always-shadow timeline-card">
                      <div class="el-card__body">
                        <el-radio-group v-model="callForm.rentPeriod">
                          <el-radio class="radio-item" label="日租">日租</el-radio>
                          <el-radio class="radio-item" label="周租">周租</el-radio>
                          <el-radio class="radio-item" label="月租">月租</el-radio>
                          <el-radio class="radio-item" label="季租">季租</el-radio>
                        </el-radio-group>
                      </div>
                    </el-card>
                  </div>
                </el-timeline-item>

                <!-- 套餐 -->
                <el-timeline-item>
                  <div class="el-timeline-item__timestamp is-top">套餐</div>
                  <div class="el-timeline-item__content">
                    <el-card class="is-always-shadow timeline-card">
                      <div class="el-card__body">
                        <el-radio-group v-model="callForm.packageType">
                          <el-radio class="radio-item" label="隐私电话">隐私电话</el-radio>
                          <el-radio class="radio-item" label="隐私短信">隐私短信</el-radio>
                        </el-radio-group>
                      </div>
                    </el-card>
                  </div>
                </el-timeline-item>
              </el-timeline>

              <!-- 底部：费用 + 购买按钮 -->
              <div class="call-footer">
                <p class="fee-text">预计费用：{{ callForm.estimatedFee }} USDT</p>
                <el-button type="primary" class="buy-button" @click="onBuyNumber"
                  >立即购买</el-button
                >
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 充值 Tab -->
        <el-tab-pane label="充值" name="chongzhi">
          <div class="tab-content">
            <div class="chongzhi-wrapper">
              <p>今日USDT汇率1U等于7.3 RMB平台余额</p>
              <p>充值金额/价格关系：</p>
              <ul class="recharge-list">
                <li @click="selectRechargeAmount(10)">单次充值10 USDT：平台余额73</li>
                <li @click="selectRechargeAmount(20)">单次充值20 USDT：赠送百分之1</li>
                <li @click="selectRechargeAmount(50)">单次充值50 USDT：赠送百分之2</li>
                <li @click="selectRechargeAmount(100)">单次充值100 USDT：赠送百分之5</li>
                <li @click="selectRechargeAmount(500)">单次充值500 USDT：赠送百分之10</li>
              </ul>
              <p>仅限单次充值赠送，充值完毕平台自动赠送到平台余额。</p>

              <div class="recharge-input">
                <div class="input-wrapper">
                  <span class="label">充值金额：</span>
                  <el-input v-model="chongzhiForm.amount" placeholder="请先输入充值金额" />
                  <span>USDT</span>
                </div>
              </div>

              <el-button type="primary" class="recharge-button" @click="onRecharge">充值</el-button>
            </div>
          </div>
        </el-tab-pane>

        <!-- 我的 Tab -->
        <el-tab-pane label="我的" name="wode">
          <div class="tab-content">
            <div class="user-info-wrapper">
              <el-card class="user-card">
                <div class="user-info">
                  <img src="@/assets/imgs/user.png" alt="avatar" class="avatar" />
                  <div class="user-text">
                    <p class="username">{{ userInfo.username }}</p>
                    <img
                      v-if="userInfo.vip"
                      src="@/assets/imgs/vip.png"
                      alt="vip"
                      class="vip"
                      width="40px"
                    />
                  </div>
                </div>
              </el-card>

              <el-card class="menu-card">
                <ul class="menu-list">
                  <li>
                    <div class="menu-item-left">
                      <img src="@/assets/imgs/icon/icon-1.png" alt="balance" class="menu-icon" />
                      <span>账户余额</span>
                    </div>
                    <span>{{ userInfo.balance }} RMB</span>
                  </li>
                  <li @click="onAPI">
                    <div class="menu-item-left">
                      <img src="@/assets/imgs/icon/icon-2.png" alt="api" class="menu-icon" />
                      <span>API文档</span>
                    </div>
                    <span>点击查看 ></span>
                  </li>
                  <li @click="onLogs">
                    <div class="menu-item-left">
                      <img src="@/assets/imgs/icon/icon-3.png" alt="logs" class="menu-icon" />
                      <span>使用记录</span>
                    </div>
                    <span>点击查看 ></span>
                  </li>
                  <li @click="onLogout">
                    <div class="menu-item-left">
                      <img src="@/assets/imgs/icon/icon-4.png" alt="logout" class="menu-icon" />
                      <span>退出</span>
                    </div>
                  </li>
                </ul>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import itemList from './itemList.json'
import countryList from './countryList.json'

export default {
  name: 'Home',
  data() {
    return {
      locationList1: [
        {
          id: 1,
          name: '不限',
        },
        {
          id: 2,
          name: '河北',
        },
        {
          id: 3,
          name: '山西',
        },
        {
          id: 4,
          name: '辽宁',
        },
        {
          id: 5,
          name: '吉林',
        },
        {
          id: 6,
          name: '黑龙江',
        },
        {
          id: 7,
          name: '江苏',
        },
        {
          id: 8,
          name: '浙江',
        },
        {
          id: 9,
          name: '安徽',
        },
        {
          id: 10,
          name: '福建',
        },
        {
          id: 11,
          name: '江西',
        },
        {
          id: 12,
          name: '山东',
        },
        {
          id: 13,
          name: '河南',
        },
        {
          id: 14,
          name: '湖北',
        },
        {
          id: 15,
          name: '湖南',
        },
        {
          id: 16,
          name: '广东',
        },
        {
          id: 17,
          name: '海南',
        },
        {
          id: 18,
          name: '四川',
        },
        {
          id: 19,
          name: '贵州',
        },
        {
          id: 20,
          name: '云南',
        },
        {
          id: 21,
          name: '陕西',
        },
        {
          id: 22,
          name: '甘肃',
        },
        {
          id: 23,
          name: '青海',
        },
        {
          id: 24,
          name: '北京',
        },
        {
          id: 25,
          name: '天津',
        },
        {
          id: 26,
          name: '上海',
        },
        {
          id: 27,
          name: '重庆',
        },
        {
          id: 28,
          name: '内蒙古',
        },
        {
          id: 29,
          name: '广西',
        },
        {
          id: 30,
          name: '西藏',
        },
        {
          id: 31,
          name: '宁夏',
        },
        {
          id: 32,
          name: '新疆',
        },
        {
          id: 33,
          name: '香港',
        },
        {
          id: 34,
          name: '澳门',
        },
        {
          id: 35,
          name: '台湾',
        },
      ],
      locationList2: [
        {
          id: 1,
          name: '美国',
        },
        {
          id: 2,
          name: '日本',
        },
        {
          id: 4,
          name: '韩国',
        },
        {
          id: 5,
          name: '印度',
        },
        {
          id: 6,
          name: '德国',
        },
        {
          id: 7,
          name: '英国',
        },
        {
          id: 9,
          name: '新加坡',
        },
        {
          id: 11,
          name: '澳大利亚',
        },
        {
          id: 13,
          name: '法国',
        },
        {
          id: 16,
          name: '伊拉克',
        },
        {
          id: 17,
          name: '印尼',
        },
        {
          id: 18,
          name: '俄罗斯',
        },
        {
          id: 21,
          name: '阿根廷',
        },
        {
          id: 22,
          name: '阿拉伯联合酋长国',
        },
        {
          id: 23,
          name: '阿曼',
        },
        {
          id: 31,
          name: '白俄罗斯',
        },
        {
          id: 33,
          name: '冰岛',
        },
        {
          id: 44,
          name: '刚果民主共和国',
        },
        {
          id: 50,
          name: '加拿大',
        },
        {
          id: 55,
          name: '老挝',
        },
        {
          id: 60,
          name: '缅甸',
        },
        {
          id: 61,
          name: '摩洛哥',
        },
        {
          id: 67,
          name: '尼日利亚',
        },
        {
          id: 68,
          name: '挪威',
        },
        {
          id: 70,
          name: '塞尔维亚',
        },
        {
          id: 72,
          name: '沙特阿拉伯',
        },
        {
          id: 78,
          name: '坦桑尼亚',
        },
        {
          id: 80,
          name: '土耳其',
        },
        {
          id: 85,
          name: '新西兰',
        },
        {
          id: 86,
          name: '牙买加',
        },
        {
          id: 88,
          name: '伊朗',
        },
        {
          id: 91,
          name: '卡塔尔',
        },
        {
          id: 95,
          name: '葡萄牙',
        },
        {
          id: 96,
          name: '阿富汗',
        },
        {
          id: 97,
          name: '埃及',
        },
        {
          id: 98,
          name: '埃塞俄比亚',
        },
        {
          id: 99,
          name: '爱尔兰',
        },
        {
          id: 100,
          name: '爱沙尼亚',
        },
        {
          id: 102,
          name: '巴基斯坦',
        },
        {
          id: 105,
          name: '巴西',
        },
        {
          id: 107,
          name: '比利时',
        },
        {
          id: 108,
          name: '波兰',
        },
        {
          id: 112,
          name: '朝鲜',
        },
        {
          id: 113,
          name: '丹麦',
        },
        {
          id: 118,
          name: '菲律宾',
        },
        {
          id: 120,
          name: '芬兰',
        },
        {
          id: 125,
          name: '格鲁吉亚',
        },
        {
          id: 126,
          name: '古巴',
        },
        {
          id: 128,
          name: '哈萨克斯坦',
        },
        {
          id: 130,
          name: '荷兰',
        },
        {
          id: 133,
          name: '柬埔寨',
        },
        {
          id: 134,
          name: '捷克',
        },
        {
          id: 136,
          name: '科索沃',
        },
        {
          id: 138,
          name: '克罗地亚',
        },
        {
          id: 141,
          name: '黎巴嫩',
        },
        {
          id: 142,
          name: '立陶宛',
        },
        {
          id: 147,
          name: '罗马尼亚',
        },
        {
          id: 149,
          name: '马尔代夫',
        },
        {
          id: 151,
          name: '马来西亚',
        },
        {
          id: 155,
          name: '蒙古',
        },
        {
          id: 156,
          name: '孟加拉国',
        },
        {
          id: 157,
          name: '秘鲁',
        },
        {
          id: 160,
          name: '摩纳哥',
        },
        {
          id: 161,
          name: '墨西哥',
        },
        {
          id: 162,
          name: '南非',
        },
        {
          id: 165,
          name: '瑞典',
        },
        {
          id: 166,
          name: '瑞士',
        },
        {
          id: 167,
          name: '萨尔瓦多',
        },
        {
          id: 172,
          name: '斯洛伐克',
        },
        {
          id: 173,
          name: '斯洛文尼亚',
        },
        {
          id: 174,
          name: '斯威士兰',
        },
        {
          id: 175,
          name: '苏丹',
        },
        {
          id: 179,
          name: '泰国',
        },
        {
          id: 180,
          name: '汤加',
        },
        {
          id: 181,
          name: '突尼斯',
        },
        {
          id: 184,
          name: '委内瑞拉',
        },
        {
          id: 185,
          name: '乌克兰',
        },
        {
          id: 186,
          name: '乌拉圭',
        },
        {
          id: 188,
          name: '希腊',
        },
        {
          id: 190,
          name: '叙利亚',
        },
        {
          id: 191,
          name: '也门',
        },
        {
          id: 192,
          name: '意大利',
        },
        {
          id: 194,
          name: '越南',
        },
        {
          id: 195,
          name: '赞比亚',
        },
        {
          id: 196,
          name: '智利',
        },
        {
          id: 197,
          name: '中非共和国',
        },
        {
          id: 200,
          name: '西班牙',
        },
        {
          id: 201,
          name: '以色列',
        },
        {
          id: 202,
          name: '厄瓜多尔',
        },
        {
          id: 203,
          name: '阿塞拜疆',
        },
        {
          id: 207,
          name: '斯里兰卡',
        },
        {
          id: 208,
          name: '巴布新几内亚',
        },
        {
          id: 204,
          name: '中国香港',
        },
        {
          id: 205,
          name: '中国澳门',
        },
        {
          id: 206,
          name: '中国台湾',
        },
      ],
      activeTab: 'jiema', // 默认进入接码
      // 接码
      jiemaForm: {
        carrier: '1',
        location: '不限',
        projectType: '1', // 默认选择全业务
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
        projectType: '1', // 默认选择全业务
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
        balance: 0, // 用户余额，后续从接口获取
      },
      showAnnouncement: false,
      isMobile: false,
      isIOS: false,
      itemList: itemList, // 添加项目列表数据
      countryList: countryList,
    }
  },
  methods: {
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
    // 常见问题
    onFAQClick() {
      // this.$message.info('跳转到常见问题页面或弹窗')
      window.location.href = '/'
    },

    // TODO: 获取用户余额接口
    async getUserBalance() {
      // 这里后续接入实际的余额查询接口
      // const res = await api.getUserBalance()
      // this.userInfo.balance = res.data.balance
      this.userInfo.balance = 0 // 目前mock为0，强制用户去充值
    },

    // 检查余额是否充足
    checkBalance() {
      const requiredBalance = 0.6 // 假设每次获取号码需要0.6 USDT
      return new Promise((resolve, reject) => {
        if (this.userInfo.balance < requiredBalance) {
          this.$confirm('余额不足', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: false,
            type: 'warning',
            center: true,
          })
            .then(() => {
              this.activeTab = 'chongzhi'
              reject(new Error('余额不足'))
            })
            .catch(() => {
              reject(new Error('用户取消'))
            })
        } else {
          resolve()
        }
      })
    },

    // 接码 Tab
    async onGetNumber() {
      try {
        await this.checkBalance()
        this.jiemaResult.phone = '188****8888'
        this.$message.success('已获取号码')
      } catch (error) {
        // 余额不足或用户取消的情况已在checkBalance中处理
        return
      }
    },
    onBlockNumber() {
      if (!this.jiemaResult.phone) {
        this.$confirm('未获取手机号码', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false,
          center: true,
        })
        return
      }
      this.$message.warning('号码已拉黑')
    },
    onReleaseNumber() {
      if (!this.jiemaResult.phone) {
        this.$confirm('未获取手机号码', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false,
          center: true,
        })
        return
      }
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
    async onGetNumberSMS() {
      try {
        await this.checkBalance()
        this.faduanxinResult.phone = '188****0000'
        this.$message.success('已获取号码')
      } catch (error) {
        // 余额不足或用户取消的情况已在checkBalance中处理
        return
      }
    },
    onBlockNumberSMS() {
      if (!this.faduanxinResult.phone) {
        this.$confirm('请先获取手机号码', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false,
          center: true,
        })
        return
      }
      this.$message.warning('号码已拉黑')
    },
    onReleaseNumberSMS() {
      if (!this.faduanxinResult.phone) {
        this.$confirm('请先获取手机号码', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false,
          center: true,
        })
        return
      }
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
    selectRechargeAmount(amount) {
      this.chongzhiForm.amount = amount
      this.$message.success(`已选择充值金额：${amount} USDT`)
    },
    onRecharge() {
      // 判断用户是否登录
      if (!localStorage.getItem('smsToken')) {
        this.$confirm('请先登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showCancelButton: false,
          type: 'warning',
        })
          .then(() => {
            // 用户点击确认，跳转到登录页面
            this.$router.push('/login')
          })
          .catch(() => {
            // 用户点击取消，停留在当前页面
            this.$message({
              type: 'info',
              message: '已取消跳转',
            })
          })
        return
      }

      if (!this.chongzhiForm.amount) {
        this.$message.error('请先输入充值金额')
        return
      }
      // 使用process.env.BASE_URL获取publicPath
      const baseUrl = process.env.BASE_URL || '/'
      // 跳转到支付页面，并传递充值金额参数
      window.location.href = `${baseUrl}payment/index.html?price=${this.chongzhiForm.amount}`
    },

    // 我的 Tab
    onAPI() {
      this.$message.info('查看API文档...')
    },
    onLogs() {
      this.$message.info('查看使用记录...')
    },
    onLogout() {
      // 清除登录状态和用户信息
      localStorage.removeItem('smsToken')
      localStorage.removeItem('userInfo')
      this.$message.success('退出成功')
      // 跳转到登录页面
      this.$router.push('/login')
    },
  },
  watch: {
    // 监听标签页切换
    activeTab(newVal) {
      if (newVal === 'wode') {
        // 检查是否登录
        if (!localStorage.getItem('smsToken')) {
          this.$confirm('请先登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: false,
            type: 'warning',
          })
            .then(() => {
              // 用户点击确认，跳转到登录页面
              this.$router.push('/login')
            })
            .catch(() => {
              // 用户点击取消，切换回接码tab
              this.activeTab = 'jiema'
              this.$message({
                type: 'info',
                message: '已取消跳转',
              })
            })
        }
      }
    },
    // 监听运营商变化
    'jiemaForm.carrier'(newVal) {
      // 重置归属地选择
      this.jiemaForm.location = '不限'
    },
    'faduanxinForm.carrier'(newVal) {
      // 重置归属地选择
      this.faduanxinForm.location = '不限'
    },
  },
  created() {
    // 检测设备类型
    this.checkMobileDevice()
    // 页面加载时显示公告弹窗
    this.showAnnouncement = true

    // 从 localStorage 获取用户信息
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
    }

    // 如果直接访问"我的"页面，检查登录状态
    if (this.activeTab === 'wode' && !localStorage.getItem('smsToken')) {
      this.activeTab = 'jiema' // 未登录时默认显示接码页面
    }
  },
}
</script>

<style scoped>
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
  padding: 12px 0;
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
  display: flex;
  align-items: center;
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
    padding: 0 15px;
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

.menu-list li:last-child {
  border-bottom: none;
}

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
