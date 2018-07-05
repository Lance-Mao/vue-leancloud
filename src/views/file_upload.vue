<template lang="html">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">文件上传</span>
        </div>
        <div>
            <label>File
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
            <button v-on:click="submitFile()">Submit</button>
        </div>
        <div>
            <!-- 显示上传文件列表 -->
        </div>
    </el-card>
</template>

<script>
let _this
export default {
  data () {
    return {
      file: ''
    }
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    submitFile () {
      _this = this
      if (this.file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        _this.$message.error('请上传符合格式的文件')
        return false
      }
      let fileData = new this.$AV.File(this.file.name, this.file)
      fileData.save().then(function (file) {
        console.log(file.get('url'))
        console.log(file, '文件信息')
        // id:5b27c002a22b9d003a5d51d9
        let excelFileData = _this.$AV.Object.createWithoutData('ExcelFileData', '5b27c002a22b9d003a5d51d9')
        excelFileData.set('file', file)
        excelFileData.save()
        _this.$message('文件上传成功')

        // 调用云函数
        _this.$AV.Cloud.run('updateSignInData', {}).then(data => {
          console.log(data)
        }, err => {
          console.log(err)
        })
      }, err => {
        _this.$message.error('文件上传失败')
        console.log(err)
      })
    }
  }
}
</script>
