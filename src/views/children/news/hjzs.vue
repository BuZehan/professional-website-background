<template>
    <div id="User">
        <div class="manage">
            <el-dialog title="证书管理" :visible.sync="dialogVisible">
                <div id="Forms">
                    <el-form ref="form" :rules="rules" :model="form" label-width="100px" width="55%" size="mini"
                        :before-close="handleColse">
                        <!-- 证书标题 -->
                        <el-form-item style="width: 200px" prop="news_title" label="证书标题">
                            <el-input placeholder="请输入证书标题" v-model="form.news_title"></el-input>
                        </el-form-item>
                        <!-- 证书内容 -->
                        <el-form-item prop="news_content" label="证书内容" style="width: 800px !important;">
                            <el-input type="textarea" placeholder="请输入证书内容" v-model="form.news_content"></el-input>
                        </el-form-item>
                        <!-- 证书分类 -->
                        <!-- <el-form-item label="证书分类">
                            <el-radio-group v-model="form.type">
                                <el-radio style="margin-top: 5px;" label="学院证书" />
                                <el-radio style="margin-top: 5px;" label="教师证书" />
                                <el-radio style="margin-top: 5px;" label="学生证书" />
                            </el-radio-group>
                        </el-form-item> -->
                        <el-form-item label="证书分类" prop="type">
                            <el-radio-group v-model="form.type">
                                <el-radio label="学院证书"></el-radio>
                                <el-radio label="教师证书"></el-radio>
                                <el-radio label="学生证书"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item style="width: 800px !important;">
                            <el-upload class="upload-demo" ref="upload" :action="''" :multiple="true" :limit="1"
                                :before-remove="handleRemove" :file-list="fileList" list-type="text" :auto-upload="false"
                                :http-request="uploadFiles">
                                <el-button size="small" type="primary">点击上传1份证书附件</el-button>
                                <div slot="tip" class="el-upload__tip">
                                    附件（pdf、doc、图片等）
                                </div>
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
                <el-button @click="handleAdd" type="primary" style="margin-top: 8px;" size="mini">
                    +新增
                </el-button>
                <el-form :inline="true" :model="filterDataForm" class="demo-form-inline">
                    <el-form-item>
                        <!-- <el-input size="mini" v-model="filterDataForm.type" placeholder="请输入名称"></el-input> -->
                        <el-checkbox-group style="width:400px;" v-model="filterDataForm.type">
                            <el-checkbox label="学院证书" name="type" />
                            <el-checkbox label="教师证书" name="type" />
                            <el-checkbox label="学生证书" name="type" />
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="searchFilterData" size="mini">筛选/查询</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 表格数据 -->
            <div class="manger">
                <template>
                    <el-table height="500px" :data="tableData" style="width: 100%">
                        <el-table-column prop="news_title" label="证书标题" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="news_content" label="证书内容" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="release_time" label="发布时间" :show-overflow-tooltip="true"> </el-table-column>
                        <el-table-column prop="type" label="证书类型"> </el-table-column>
                        <el-table-column label="证书文件">
                            <template slot-scope="scope">
                                <div style="display: flex;">
                                    <template v-for="(item, index) in scope.row.images">
                                        <a style="text-decoration: none;color: #333; display:flex;"
                                            :href="scope.row.images[0]" target="_blank"
                                            v-if="fileType.includes(scope.row.images[0].match(/\.([^.]+)$/)[1])">
                                            <!-- {{ scope.row.images[0].match(/\.([^.]+)$/)[1] }} -->
                                            附件
                                            <el-image style="width: 16px;height: 17px;margin-top: 2px;" :src="linkIcon" />
                                        </a>
                                        <el-image v-else :preview-src-list="scope.row.images" :src="item"
                                            style="width: 40px;margin:0 4px;" />
                                    </template>
                                </div>
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
                    <el-pagination layout="prev, pager, next" :page-size="5" :total='total'  @current-change="changePage">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>
   
<script>
import { getHonor, addHonor, editHonor, deleteHonor, uoloadFiles } from "@/api";
export default {
    name: "hjzs",
    data() {
        return {
            linkIcon: require('@/assets/link.png'),
            fileType: ['pdf', 'doc', 'docx'],
            dialogVisible: false,
            form: {
                news_title: "",
                news_content: "",
                file_name: '',
                type: ""
            },
            rules: {
                news_title: [{ required: true, message: "请输入标题" }],
                news_content: [{ required: true, message: "请输入新闻内容" }],
                type: [
                    { required: true, message: '选择证书类型', trigger: 'change' }
                ],
            },
            tableData: [],
            modelState: 0, //新增用户和编辑用户的状态控制
            total: 0,
            pageData: {
                page: 1,//当前页码
                limit: 5//当前页码数据条数
            },
            filterDataForm: {
                type: ["学生证书", "教师证书", "学院证书"]
            },
            fileList: [],
            fileData: null
        };
    },
    methods: {
        uploadFiles(res) {
            // 向formData对象中添加要上传的文件
            console.log(res.file);
            this.fileData = this.fileData ? this.fileData : new FormData();
            this.fileData.append('files', res.file)
            this.form.file_name = res.file.name
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
                    console.log(this.form.file_name);

                        if(!this.form.file_name) {
                            this.$message.error("请上传文件")
                            return
                        }
                        this.fileData = this.fileData ? this.fileData : new FormData();
                        this.fileData.append("formData", JSON.stringify(this.form))
                        this.form = {
                            news_title: "",
                            news_content: "",
                        }
                        addHonor(this.fileData).then((res) => {
                            //成功添加 再次获取列表数据
                            if (res.data.code === 200) {
                                // setTimeout(() => {
                                this.getHonorList()
                                this.fileData = new FormData();
                                // }, 1000);
                            }
                        });
                    } else {
                        try {
                            this.$refs.upload.submit();
                            this.fileData = this.fileData ? this.fileData : new FormData();
                            this.fileData.append("formData", JSON.stringify(this.form))
                            editHonor(this.fileData).then(res => {
                                if (res.data.code === 200) {
                                    this.getHonorList()
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
        async getHonorList() {
            let res = await getHonor({ ...this.filterDataForm, ...this.pageData });
            this.tableData = res.data.list.map(item => {
                return {
                    id: item.id,
                    images: item.honorImage.map(img => img.image_path),
                    news_title: item.news_title,
                    news_content: item.news_content,
                    release_time: item.release_time,
                    file_name: item.honorImage.map(img => img.image_name),
                    type: item.type,
                };
            });
            console.log(res);
            this.total = res.data.total
        },
        //添加新闻
        handleAdd() {
            this.fileList = []
            this.form = {
                news_title: "",
                news_content: "",
                type: '',
                file_name: "",
            }
            this.fileData = null;
            this.modelState = 0;
            this.dialogVisible = true;
        },
        //修改新闻信息
        async handleChange(row) {
            this.modelState = 1;
            this.dialogVisible = true;
            this.form = JSON.parse(JSON.stringify(row));
            this.fileList = row.images.filter(obj => obj).map((item, i) => {
                console.log(item, row);
                return {
                    url: item,
                    name: row.file_name[i] || 'null',
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
                deleteHonor({ id: row.id }).then(() => {
                    this.getHonorList();
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
            this.getHonorList()
        },
        //查询用户信息
        searchFilterData() {
            this.getHonorList()
        }
    },
    mounted() {
        this.getHonorList();
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
    align-items: flex-start;
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

    /deep/ .el-checkbox {
        margin-right: 10px;
    }

    .btn {
        width: 80px !important;
    }
}
</style>
   