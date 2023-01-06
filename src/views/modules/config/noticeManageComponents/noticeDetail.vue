<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import { editNoticeApi, getNoticeImgApi } from '@/api/modules/config/notice'
import type { UploadProps, UploadUserFile } from 'element-plus'

type Props = {
  type: 'detail' | 'edit',
  noticeItem: any
}
const props = withDefaults(defineProps<Props>(), {
  type: 'detail',
})

const emits = defineEmits<{
  (e: 'cancelSet'): void,
  (e: 'afterSet'): void
}>()

const loading = ref(false);
const type = ref<'detail' | 'edit'>('detail');
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

const changeType = () => {
  // formData.img.pop();
  // type.value = 'edit';
  ElMessage({
    type: 'info',
    message: '直接删了重写吧'
  })
}

const confirm = () => {
  ElMessageBox.confirm('确定要更改该公告么', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    loading.value = true;
    const params = {
      img: formData.img[0].raw,
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        id: props.noticeItem.id,
        text: formData.text,
      }
    }
    
    editNoticeApi(params, config).then(res => {
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
        message: '修改失败'
      });
      loading.value = false;
    })
  }).catch(() => {

  })
}

const initState = () => {
  type.value = props.type;
  formData.text = props.noticeItem.text;
  loading.value = true;
  const params = {
    id: props.noticeItem.id
  }
  const config = {
    responseType: 'blob'
  }
  getNoticeImgApi(params, config).then(res => {
    const img = {
      name: Math.random() + '.' + res.type.split('/')[1],
      type: res.type,
      size: res.size,
      url: window.URL.createObjectURL(res)
    }
    formData.img.push(img)
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '图片获取失败或该公告没有图片，更改公告可能会覆盖原有图片'
    });
  }).finally(() => {
    loading.value = false;
  })
}

onMounted(() => {
  initState();
})
</script>

<template>
  <div class="createNotice-box" v-loading="loading">
    <el-form :model="formData">
      <el-form-item label="标题">
        <el-input :value="'假装可以写标题'" disabled/>
      </el-form-item>
      <el-form-item label="内容">
        <el-input :disabled="type === 'detail'" :autosize="{ minRows: 2, maxRows: 6 }" v-model="formData.text" type="textarea"/>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          :disabled="type === 'detail'"
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
      <el-button type="primary" @click="changeType" v-if="type==='detail'">修改</el-button>
      <el-button type="primary" @click="confirm" v-if="type==='edit'">确认</el-button>
      
    </footer>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image"/>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
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