<template>
  <el-dialog :title="title" :visible="visible" :close-on-click-modal="false" width="800px" @close="closeVisble">
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="设备类别" prop="device_category">
              <el-select v-model="ruleForm.device_category" placeholder="请选择设备类别" style="width: 100%">
                <el-option key="PC" label="PC" value="PC" />
                <el-option key="Laptop" label="Laptop" value="Laptop" />
                <el-option key="Network" label="Network" value="Network" />
                <el-option key="Monitor" label="Monitor" value="Monitor" />
                <el-option key="Pad" label="Pad" value="Pad" />
                <el-option key="iMac" label="iMac" value="iMac" />
                <el-option key="Mobile" label="Mobile" value="Mobile" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号" prop="device_code">
              <el-input v-model="ruleForm.device_code" placeholder="设备编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="ruleForm.brand" placeholder="品牌" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备名称" prop="device_name">
              <el-input v-model="ruleForm.device_name" placeholder="设备名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备型号" prop="device_model">
              <el-input v-model="ruleForm.device_model" placeholder="设备型号" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- line -->
        <!-- line -->
        <el-row
          v-if="ruleForm.device_category === 'PC' || ruleForm.device_category === 'Monitor' || ruleForm.device_category === 'Pad' || ruleForm.device_category === 'iMac' || ruleForm.device_category === 'Mobile'"
          :gutter="20"
        >
          <el-col :span="12">
            <el-form-item label="CPU">
              <el-input v-model="ruleForm.cpu" placeholder="CPU" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运存">
              <el-input v-model="ruleForm.mem" placeholder="运存" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="ruleForm.device_category === 'Pad' || ruleForm.device_category === 'Mobile'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="核数">
              <el-input v-model="ruleForm.core" placeholder="核数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="ruleForm.device_category === 'PC' || ruleForm.device_category === 'Monitor' || ruleForm.device_category === 'Pad' || ruleForm.device_category === 'iMac' || ruleForm.device_category === 'Mobile'"
          :gutter="20"
        >
          <el-col :span="12">
            <el-form-item label="GPU">
              <el-input v-model="ruleForm.gpu" placeholder="gpu" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="储存容量">
              <el-input v-model="ruleForm.volume" placeholder="储存容量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="ruleForm.device_category === 'PC' || ruleForm.device_category === 'Monitor' || ruleForm.device_category === 'Pad' || ruleForm.device_category === 'iMac' || ruleForm.device_category === 'Mobile'"
          :gutter="20"
        >
          <el-col :span="12">
            <el-form-item label="操作系统">
              <el-input v-model="ruleForm.os" placeholder="操作系统" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="ruleForm.device_category === 'Pad' || ruleForm.device_category === 'Mobile'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="系统版本">
              <el-input v-model="ruleForm.version" placeholder="系统版本" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="屏幕尺寸">
              <el-input v-model="ruleForm.screen_size" placeholder="屏幕尺寸" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="ruleForm.device_category === 'Pad' || ruleForm.device_category === 'Mobile'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="分辨率">
              <el-input v-model="ruleForm.resolution" placeholder="分辨率" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="屏幕比">
              <el-input v-model="ruleForm.aspect_ratio" placeholder="屏幕比" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- line -->
        <!-- line -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="MAC地址1">
              <el-input v-model="ruleForm.mac_address_1" placeholder="MAC地址1" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="MAC地址2">
              <el-input v-model="ruleForm.mac_address_2" placeholder="MAC地址2" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="购买日期" prop="purchase_date">
              <el-date-picker
                v-model="ruleForm.purchase_date"
                style="width: 300px;"
                type="date"
                placeholder="购买日期"
                format="yyyy 年 MM 月"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="零售商" prop="retailer">
              <el-input v-model="ruleForm.retailer" placeholder="零售商" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="购买价格" prop="purchase_price">
              <el-input-number v-model="ruleForm.purchase_price" placeholder="购买价格" style="width: 200px;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="增值税价格" prop="vat">
              <el-input-number v-model="ruleForm.vat" placeholder="增值税价格" style="width: 200px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="保修日期(月)" prop="warranty_period">
              <el-input-number v-model="ruleForm.warranty_period" placeholder="保修日期" style="width: 200px;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="位置">
              <el-input v-model="ruleForm.site" placeholder="位置" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="title === '编辑设备'" :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="ruleForm.device_status" placeholder="状态">
                <el-option v-for="item in DECVICESTATUS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="是否可申领">
              <el-radio-group v-model="ruleForm.is_apply">
                <el-radio :label="0"> 可申领 </el-radio>
                <el-radio :label="1"> 不可申领 </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeVisble">取 消</el-button>
      <el-button type="primary" @click="checkBtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addDevice, deviceDetail, editDevice } from '@/api/property'
import { DECVICESTATUS } from '@/utils/const'
export default {
  name: 'PutFrom',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '设备录入'
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      DECVICESTATUS,
      ruleForm: {
        'device_code': '', // 设备编码
        'device_category': 'PC', // 设备分类(PC,Laptop,iMac,Mobile,Pad,Monitor,Network)
        'brand': '', // 品牌
        'device_name': '', // 设备名称
        'device_model': '', // 设备型号
        'device_status': 'Free', // 设备状态
        'shared_device': '', // 公共资产(是,否)
        'cpu': '',
        'gpu': '',
        'mem': '', // 内存
        'volume': '', // 存储容量
        'os': '', // (Windows,Linux,iOS,Android,Mac)
        'core': '', // 核心
        'version': '', // 版本
        'screen_size': '', // 屏幕尺寸
        'resolution': '', // 分辨率
        'aspect_ratio': '', // 屏幕比
        'mac_address_1': '', // MAC地址1
        'mac_address_2': '', // MAC地址2
        'retailer': '', // 零售商
        'purchase_price': 0, // 购买价格
        'purchase_date': '', // 购买日期
        'vat': 0, // 增值税金额
        'warranty_period': 0, // 保修期限（月）
        'site': '', // 位置
        'is_apply': 1 // 是否可申领
      },
      rules: {
        device_code: [{ required: true, message: '请输入设备编号', trigger: 'blur' }],
        device_category: [{ required: true, message: '请选择设备类别', trigger: 'change' }],
        brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
        device_name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        device_model: [{ required: true, message: '请输入设备型号', trigger: 'blur' }],
        purchase_date: [{ required: true, message: '请选择购买日期', trigger: 'change' }],
        retailer: [{ required: true, message: '请输入零售商', trigger: 'blur' }],
        purchase_price: [{ required: true, message: '请输入购买价格', trigger: 'blur' }],
        vat: [{ required: true, message: '请输入增值说价格', trigger: 'blur' }],
        warranty_period: [{ required: true, message: '请输入保修日期', trigger: 'change' }]
      }
    }
  },
  watch: {
    visible: {
      handler(value) {
        if (value && this.id) {
          this.init()
        }
      }
    }
  },
  methods: {
    async init() {
      if (this.id) {
        const res = await deviceDetail(this.id)
        if (res.ret === 0) {
          this.ruleForm = res.data
        }
      }
    },
    async checkBtn() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.checkFun()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async checkFun() {
      if (this.title === '设备录入') {
        this.addFun()
      } else {
        this.editFun()
      }
    },
    async addFun() {
      const res = await addDevice(this.ruleForm)
      if (res.ret === 0) {
        this.$emit('success')
      }
    },
    async editFun() {
      const res = await editDevice(this.ruleForm)
      if (res.ret === 0) {
        this.$emit('success')
      }
    },
    closeVisble() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.ruleForm = {
        'device_code': '', // 设备编码
        'device_category': 'PC', // 设备分类(PC,Laptop,iMac,Mobile,Pad,Monitor,Network)
        'brand': '', // 品牌
        'device_name': '', // 设备名称
        'device_model': '', // 设备型号
        'device_status': 'Free', // 设备状态
        'shared_device': '', // 公共资产(是,否)
        'cpu': '',
        'gpu': '',
        'mem': '', // 内存
        'volume': '', // 存储容量
        'os': '', // (Windows,Linux,iOS,Android,Mac)
        'core': '', // 核心
        'version': '', // 版本
        'screen_size': '', // 屏幕尺寸
        'resolution': '', // 分辨率
        'aspect_ratio': '', // 屏幕比
        'mac_address_1': '', // MAC地址1
        'mac_address_2': '', // MAC地址2
        'retailer': '', // 零售商
        'purchase_price': 0, // 购买价格
        'purchase_date': '', // 购买日期
        'vat': 0, // 增值税金额
        'warranty_period': 0, // 保修期限（月）
        'site': '', // 位置
        'is_apply': 1 // 是否可申领
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.contract-from {
  .el-dialog__header {
    padding: 0;
  }
  .el-input-number {
    text-align: left!important;
  }
}
</style>
