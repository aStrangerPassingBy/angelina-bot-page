<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { createNoticeApi } from '@/api/modules/config/notice'
import type { UploadProps, UploadUserFile } from 'element-plus'

const emits = defineEmits<{
  (e: 'cancelSet'): void,
  (e: 'afterSet'): void
}>()

// const fileList = ref<UploadUserFile[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const dialogImageUrl = ref('');
const formData = reactive<{
  text: string,
  img: UploadUserFile[]
}>({
  text: '',
  img: []
});

const hasUpload = computed(() => {
  return formData.img.length > 0 ? 'none' : 'flex'
})
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log('handleRemove', uploadFile, uploadFiles)
}

const handleChange: UploadProps['onChange'] = (file: any, fileList: any) => {
  console.log('handleChange', file, fileList);
}

const confirm = () => {
  ElMessageBox.confirm('确定要提交该公告么', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    loading.value = true;
    const params = {
      // text: formData.text,
      img: formData.img[0].raw,
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        text: formData.text,
      }
    }
    console.log(config, 'config');
    
    createNoticeApi(params, config).then(res => {
      ElMessage({
        type: 'success',
        message: res.data.text
      });
      loading.value = false;
      emits('afterSet');
    }).catch(err => {
      console.log('upload', err);
      ElMessage({
        type: 'error',
        message: '创建失败'
      });
      loading.value = false;
    })
  }).catch(() => {

  })
}
</script>

<template>
  <div class="createNotice-box">
    <el-form :model="formData">
      <el-form-item label="标题">
        <el-input :value="'假装可以写标题'" disabled/>
      </el-form-item>
      <el-form-item label="内容">
        <el-input :autosize="{ minRows: 2, maxRows: 6 }" v-model="formData.text" type="textarea"/>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          v-model:file-list="formData.img"
          action="none"
          accept="image/jpeg,image/jpg,image/png"
          list-type="picture-card"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :auto-upload="false">
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <footer class="btn-box">
      <el-button @click="$emit('cancelSet')">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </footer>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>

<style scoped lang='scss'>
.createNotice-box {
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
:deep(.el-upload--picture-card) {
  display: v-bind(hasUpload);
}
</style>