<template>
   <div id="User">
      <div class="manage">
         <!-- 校友编辑 -->
         <el-dialog title="校友内容编辑" :visible.sync="dialogVisible" top='5vh' :close-on-click-modal="false">
            <div id="Forms">
               <el-form ref="form" :rules="rules" :model="form" label-width="100px" width="100%" size="mini"
                  :before-close="handleColse">
                  <el-form-item  prop="title" label="新闻标题：">
                     <el-input placeholder="请输入标题" v-model="form.title"></el-input>
                   </el-form-item>
                  <div style="border: 1px solid #ccc;">
                     <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                        :mode="mode" />
                     <Editor style="height: 400px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig"
                        :mode="mode" @onCreated="onCreated" @onChange="onChange" @onDestroyed="onDestroyed"
                        @onMaxLength="onMaxLength" @onFocus="onFocus" @onBlur="onBlur" @customAlert="customAlert"
                        @customPaste="customPaste" />
                  </div>
               </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
               <el-button @click="cancle" size="mini">取 消</el-button>
               <el-button type="primary" size="mini" @click="handleSubmit">提 交</el-button>
            </div>
         </el-dialog>

         <div class="manage-header">
            <el-button @click="handleAdd" type="primary" size="mini">
               +新增
            </el-button>
         </div>

         <!-- 表格数据 -->
         <div class="manger">
            <template>
               <el-table height="500px" :data="tableData" style="width: 100%">
                  <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"> </el-table-column>
                  <!-- <el-table-column prop="content" label="校友内容" :show-overflow-tooltip="true"> </el-table-column> -->
                  <el-table-column prop="release_time" label="发布时间" :show-overflow-tooltip="true"> </el-table-column>
                  <el-table-column label="图片">
                     <template slot-scope="scope">
                        <div style="display: flex;"><template v-for="(item, index) in scope.row.imageList">
                              <el-image :preview-src-list="scope.row.imageList" v-if="item" :src="item"
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
               <el-pagination layout="prev, pager, next" :page-size="5" :total='total' @current-change="changePage">
               </el-pagination>
            </div>
         </div>

      </div>
   </div>
</template>
 
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { addStu, getStuOfEditor, editStuOfEditor, delStu, uoloadFilesForStu } from "@/api";
export default Vue.extend({
   name: "zydt",
   components: { Editor, Toolbar },
   data() {
      return {
         // 校友编辑
         dialogVisible: false,
         form: {
            title: "",
            editorData: "",
            imageList: []
         },
         rules: {
            title: [{ required: true, message: "请输入标题" }],
            addr: [{ required: true, message: "请输入校友内容" }],
         },
         tableData: [],
         modelState: 0, //新增用户和编辑用户的状态控制
         total: 0,
         pageData: {
            page: 1,//当前页码
            limit: 10//当前页码数据条数
         },
         editor: null,
         toolbarConfig: {     // 菜单栏配置
            toolbarKeys: [
               "uploadImage",  // 上传图片
            ]
         },
         html: '<p>hello</p>',
         toolbarConfig: {},
         editorConfig: { placeholder: '请输入内容...' },
         mode: 'default', // or 'simple'
         editorConfig: {
            MENU_CONF: {
               uploadImage: {
                  withCredentials: true,
                  fieldName: '校友图片',
                  // base64LimitSize: 1024 * 1024 * 10, // 20MB 小于该值就插入 base64 格式（而不    上传），默认为 0
                  customUpload: async (file, insertFn) => {  // TS 语法
                     // 自己实现上传，并得到图片 url alt href
                     let formData = new FormData();
                     formData.append('files', file);
                     let res = await uoloadFilesForStu(formData)
                     // 最后插入图片
                     console.log(res);
                     let { url, alt, href } = res.data.data
                     insertFn(url, alt, href)
                     this.form.imageList.push(url)
                  }
               },
            }
            // 其他属性...
         }

      };
   },
   methods: {

      uploadFiles(res) {
         // 向formData对象中添加要上传的文件
         this.fileData = this.fileData ? this.fileData : new FormData();
         this.fileData.append('files', res.file)
         // console.log("files:", res);
      },
      //点击表单提交操作
      handleSubmit() {
         this.$refs.form.validate(async (bool, obj) => {
            if (bool) {
               //表单数据完整 进行执行
               if (this.modelState == 0) {
                  //modelState 为0 添加用户
                  // 富文本编辑器
                  let resHtml = this.editor.getHtml();  // 获取文章html结构（带有内联样式）
                  console.log('获取文章html结构', resHtml);
                  this.form.editorData = resHtml
                  let res = await addStu(this.form)
                  console.log(res.data);
                  this.getNewsList()
               } else {
                  try {
                     let resHtml = this.editor.getHtml();  // 获取文章html结构（带有内联样式）
                     this.form.content = resHtml
                     editStuOfEditor(this.form).then(res => {
                        if (res.data.code === 200) {
                           this.getNewsList()
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
         this.form.imageList = fileList
      },
      handleColse() {
         this.$refs.form.resetFields();
         this.dialogVisible = false;
      },
      cancle() {
         this.handleColse();
      },
      //获取news数据
      async getNewsList() {
         let res = await getStuOfEditor({ ...this.pageData });
         // console.log(res.data);
         this.tableData = res.data.list.map(item => {
            // console.log(JSON.parse(item.image_list));
            let imageList = item.image_list ? JSON.parse(item.image_list) : [];
            // 匹配<img />标签的个数
            const imgCount = (item.content?.match(/<img\s.*?>/g) || []).length;
            // 匹配<img />标签的href链接
            const hrefList = item.content?.match(/<img\s.*?src="(.*?)".*?>/g)?.map(imgTag => {
               const hrefMatch = imgTag.match(/src="(.*?)"/);
               return hrefMatch ? hrefMatch[1] : '';
            });
         
            return {
               id: item.id,
               // imageList: hrefList?.filter(url => imageList.includes(url)),
               imageList: hrefList,
               title: item.title,
               content: item.content,
               release_time: item.release_time,
            };
         });
         this.total = res.data.total || 0
      },
      //添加校友
      handleAdd() {
         this.form = {
            title: "",
            editorData: "",
            imageList: []
         }
         this.html = ''
         this.modelState = 0;
         this.dialogVisible = true;
      },
      //修改校友信息
      async handleChange(row) {
         this.modelState = 1;
         this.dialogVisible = true;
         this.form = JSON.parse(JSON.stringify(row));
         this.html = row.content
         console.log(row, this.form);
      },
      //删除数据操作
      handleDelete(row) {
         this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
         })
            .then(() => {
               delStu({ id: row.id }).then(() => {
                  this.getNewsList();
                  this.$message({
                     type: "success",
                     message: "删除成功!",
                  });
               }).catch(e => console.log(e));

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
         this.getNewsList()
      },
      //查询用户信息
      searchUser() {
         this.getNewsList()
      },
      onCreated(editor) {
         this.editor = Object.seal(editor)
         // console.log('onCreated', editor)
      },
      onChange(editor) {
         console.log('onChange', editor.children)
      },
      onDestroyed(editor) { console.log('onDestroyed', editor) },
      onMaxLength(editor) { console.log('onMaxLength', editor) },
      onFocus(editor) { console.log('onFocus', editor) },
      onBlur(editor) { console.log('onBlur', editor) },
      customAlert(info, type) { window.alert(`customAlert in Vue demo\n${type}:\n${info}`) },
      customPaste(editor, event, callback) {
         console.log('ClipboardEvent 粘贴事件对象', event)
         // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
         const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
         // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

         // 自定义插入内容
         editor.insertText(text)

         // 返回 false ，阻止默认粘贴行为
         event.preventDefault()
         callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）
         // 返回 true ，继续默认的粘贴行为
         // callback(true)
      },
   },
   mounted() {
      this.getNewsList();
   },
   beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
   },
   computed: {

   },
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

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
   width: 100% !important;

}


.manage-header {
   width: 90%;
   margin: 0 auto;
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.manger {
   width: 100%;
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
 