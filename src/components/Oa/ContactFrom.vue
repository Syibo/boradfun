<template>
  <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%" :show-close="false" @close="open">
    <span slot="title" class="dialog-title">
      <div class="dialog-title-left">
        {{ title }}
      </div>
      <div class="dialog-title-right">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
      </div>
    </span>
    <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
      <Label :title="'基本信息'" />
      <el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同类型" prop="contract_type">
              <el-select v-model="ruleForm.contract_type" placeholder="请选择合同类型" style="width: 100%">
                <el-option key="劳动合同" label="劳动合同" value="劳动合同" />
                <el-option key="劳务合同" label="劳务合同" value="劳务合同" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签约方" prop="contract_party">
              <el-autocomplete
                v-model="ruleForm.contract_party"
                style="width: 100%"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入签约方"
                @select="handleSelect"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="签约主体" prop="contract_main">
              <el-select v-model="ruleForm.contract_main" placeholder="请选择签约主体" style="width: 100%">
                <el-option key="宁波比浮" label="宁波比浮" value="宁波比浮" />
                <el-option key="上海游因" label="上海游因" value="上海游因" />
                <el-option key="上海比程" label="上海比程" value="上海比程" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同开始日期" prop="contract_start_date">
              <el-date-picker
                v-model="ruleForm.contract_start_date"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同结束日期" prop="contract_end_date">
              <el-date-picker
                v-model="ruleForm.contract_end_date"
                style="width: 100%"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="试用期（月）" prop="trial_period">
              <el-input-number v-model="ruleForm.trial_period" :min="0" controls-position="right" class="num-inp" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年假" prop="annual_leave">
              <el-input v-model="ruleForm.annual_leave" placeholder="请输入年假" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同状态" prop="status">
              <el-select v-model="ruleForm.status" placeholder="请输入合同状态" style="width: 100%">
                <el-option key="已签" label="已签" value="已签" />
                <el-option key="未签" label="未签" value="未签" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="电子版合同">
              <el-upload
                class="upload-demo"
                :headers="myHeaders"
                name="file"
                :action="`${api}/v1/file/upload?bucket=contract`"
                :on-success="oneUpload"
                :show-file-list="false"
              >
                <el-button v-if="ruleForm.soft_copy === ''" icon="el-icon-upload" size="small" type="text">上传文件</el-button>
                <el-button v-else icon="el-icon-upload" size="small" type="text">{{ ruleForm.soft_copy }}</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="合同扫描件">
              <el-upload
                class="upload-demo"
                :headers="myHeaders"
                name="file"
                :action="`${api}/v1/file/upload?bucket=contract`"
                :on-success="oneUploadScanned"
                :show-file-list="false"
              >
                <el-button v-if="ruleForm.scanned_copy === ''" icon="el-icon-upload" size="small" type="text">上传文件</el-button>
                <el-button v-else icon="el-icon-upload" size="small" type="text">{{ ruleForm.scanned_copy }}</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: 'ContactFrom',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
