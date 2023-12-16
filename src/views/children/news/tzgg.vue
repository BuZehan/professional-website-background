<template>
  <div id="User">
    <div class="manage">
      <el-dialog title="公告管理" :visible.sync="dialogVisible">
        <div id="Forms">
          <el-form ref="form" :rules="rules" :model="form" label-width="100px" width="55%" size="mini"
            :before-close="handleColse">
            <!-- 公告标题 -->
            <el-form-item style="width: 200px" prop="news_title" label="公告标题">
              <el-input placeholder="请输入公告标题" v-model="form.news_title"></el-input>
            </el-form-item>
            <!-- 公告内容 -->
            <el-form-item prop="news_content" label="公告内容" style="width: 800px !important;">
              <el-input type="textarea" placeholder="请输入公告内容" v-model="form.news_content"></el-input>
            </el-form-item>
            <el-form-item style="width: 800px !important;">
              <el-upload class="upload-demo" ref="upload" :action="''" :multiple="true" :limit="9"
                :before-remove="handleRemove" :file-list="fileList" list-type="picture" :auto-upload="false"
                :http-request="uploadFiles">
                <el-button size="small" type="primary">点击上传图片</el-button>
                <div slot="tip" class="el-upload__tip">最多上传9张图片</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle" size="mini">取 消</el-button>
          <el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>

      <div class="manage-header">
        <el-button @click="handleAdd" type="primary" size="mini">
          +新增
        </el-button>
        <el-form :inline="true" :model="userForm" class="demo-form-inline">
          <el-form-item>
            <el-input size="mini" v-model="userForm.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="searchUser" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格数据 -->
      <div class="manger">
        <template>
          <el-table height="400px" :data="tableData" style="width: 100%">
            <el-table-column prop="news_title" label="公告标题"   :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="news_content" label="公告内容" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="release_time" label="发布时间" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <div style="display: flex;"><template v-for="(item, index) in scope.row.images">
                    <el-image :preview-src-list="scope.row.images" v-if="item" :src="item"
                      style="width: 40px;margin:0 4px;" />
                  </template></div>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleChange(scope.row)">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 分页器 -->
        <div class="elPagination">
          <el-pagination layout="prev, pager, next" :total='total' :page-size="5" @current-change="changePage">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>
 
<script>
import { getNotification, addNotification, editNotification, deleteNotification, uoloadFiles } from "@/api";
export default {
  name: "tzgg",
  data() {
    return {
      dialogVisible: false,
      form: {
        news_title: "",
        news_content: "",
      },
      rules: {
        news_title: [{ required: true, message: "请输入公告标题" }],
        addr: [{ required: true, message: "请输入公告内容" }],
      },
      tableData: [],
      modelState: 0, //新增用户和编辑用户的状态控制
      total: 0,
      pageData: {
        page: 1,//当前页码
        limit: 6//当前页码数据条数
      },
      userForm: {
        name: ''
      },
      fileList: [],
      fileData: null
    };
  },
  methods: {
    uploadFiles(res) {
      // 向formData对象中添加要上传的文件
      this.fileData = this.fileData ? this.fileData : new FormData();
      this.fileData.append('files', res.file)
      console.log("files:", res);
    },
    //点击表单提交操作
    handleSubmit() {
      this.$refs.form.validate((bool, obj) => {
        if (bool) {
          //表单数据完整 进行执行
          if (this.modelState == 0) {
            //modelState 为0 添加用户
            this.$refs.upload.submit();
            this.fileData = this.fileData ? this.fileData : new FormData();
            this.fileData.append("formData", JSON.stringify(this.form))
            this.form = {
              news_title: "",
              news_content: "",
            }
            addNotification(this.fileData).then((res) => {
              //成功添加 再次获取列表数据
              if (res.data.code === 200) {
                // setTimeout(() => {
                this.getNotificationList()
                this.fileData = new FormData();
                // }, 1000);
              }
            });
          } else {
            try {
              this.$refs.upload.submit();
              this.fileData = this.fileData ? this.fileData : new FormData();
              this.fileData.append("formData", JSON.stringify(this.form))
              editNotification(this.fileData).then(res => {
                if (res.data.code === 200) {
                  this.getNotificationList()
                  this.fileData = new FormData();
                }
              }).catch(err => console.log(err));
            } catch (error) {
              console.log(error);
            }

          }
          this.handleColse(); //关闭弹窗
        }
      });
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.form.images = fileList
    },
    handleColse() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancle() {
      this.handleColse();
    },
    //获取news数据
    async getNotificationList() {
      let res = await getNotification({ ...this.userForm, ...this.pageData });
      this.tableData = res.data.list.map(item => {
        return {
          id: item.id,
          images: item.notificationImage.map(img => img.image_path),
          news_title: item.news_title,
          news_content: item.news_content,
          release_time: item.release_time,
        };
      });
      this.total = res.data.total || 0
    },
    //添加公告
    handleAdd() {
      this.fileList = []
      this.form = {
        news_title: "",
        news_content: "",
      }
      this.modelState = 0;
      this.dialogVisible = true;
    },
    //修改公告信息
    async handleChange(row) {
      this.modelState = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
      this.fileList = row.images.filter(obj => obj).map(item => {
        return {
          url: item,
          name: row.news_title,
        }
      })

    },
    //删除数据操作
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteNotification({ id: row.id }).then(() => {
          this.getNotificationList();
        });
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //点击分页器
    changePage(val) {
      this.pageData.page = val
      this.getNotificationList()
    },
    //查询用户信息
    searchUser() {
      this.getNotificationList()
    }
  },
  mounted() {
    this.getNotificationList();
  },
  computed: {

  }
};
</script>
<style>
.el-tooltip__popper {
  max-width: 20%
}
</style>
<style scoped lang="less">
.el-form {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.el-tooltip__popper {
  max-width: 20%
}

.el-form-item {
  width: 280px !important;
}

.manage-header {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.manger {
  width: 90%;
  margin: 0 auto;
  position: relative;
}

.elPagination {
  right: 20px;
  position: absolute;
  margin-top: 50px;
}

.demo-form-inline {
  margin-left: 50px;

  .btn {
    width: 80px !important;
  }
}
</style>
 