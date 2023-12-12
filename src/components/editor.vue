<template>
    <div>
        <div style="border: 1px solid #ccc;">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 400px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="onCreated" @onChange="onChange" @onDestroyed="onDestroyed" @onMaxLength="onMaxLength"
                @onFocus="onFocus" @onBlur="onBlur" @customAlert="customAlert" @customPaste="customPaste" />
        </div>
        <el-button style="float:right" @click.stop="getEditorHtml">提交</el-button>
    </div>
</template>
<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uoloadFiles, addNewsOfEditor } from '@/api'


export default Vue.extend({
    name: 'editor',
    components: { Editor, Toolbar },
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    watch: {
        title(newV, oldV) {
            this.news_title = newV
        }
    },
    data() {
        return {
            news_title: '',
            news_imageList:[],
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
                        // server: process.env.VUE_APP_API_URL + '/news/upload',
                        withCredentials: true,
                        fieldName: '新闻图片',
                        // base64LimitSize: 1024 * 1024 * 20, // 20MB 小于该值就插入 base64 格式（而不    上传），默认为 0
                        customUpload: async (file, insertFn) => {  // TS 语法
                            // file 即选中的文件
                            // 自己实现上传，并得到图片 url alt href
                            let formData = new FormData();
                            formData.append('files', file);
                            let res = await uoloadFiles(formData)
                            // 最后插入图片
                            // console.log(res);
                            let { url, alt, href } = res.data.data
                            insertFn(url, alt, href)
                            this.collectImageList(url)
                        }
                    },
                }
                // 其他属性...
            }
        }
    },
    methods: {
        getEditorHtml() {
            let resHtml = this.editor.getHtml();  // 获取文章html结构（带有内联样式）
            this.SubmitFormData(resHtml)
        },
        // 向父组件传递图片数据
        collectImageList(imageUrl) {
            this.$emit('collectImageList', imageUrl);
            // this.news_imageList.push(imageUrl)
        },
        onCreated(editor) {
            this.editor = Object.seal(editor)
            // console.log('onCreated', editor)
        },
        onChange(editor) {
            // console.log('onChange', editor.children)
        },
        // onDestroyed(editor) { console.log('onDestroyed', editor) },
        // onMaxLength(editor) { console.log('onMaxLength', editor) },
        // onFocus(editor) { console.log('onFocus', editor) },
        // onBlur(editor) { console.log('onBlur', editor) },
        customAlert(info, type) { window.alert(`customAlert in Vue demo\n${type}:\n${info}`) },
        customPaste(editor, event, callback) {
            console.log('ClipboardEvent 粘贴事件对象', event)
            // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
            // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
            // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

            // 自定义插入内容
            // editor.insertText('xxx')

            // 返回 false ，阻止默认粘贴行为
            event.preventDefault()
            callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

            // 返回 true ，继续默认的粘贴行为
            // callback(true)
        },
        // 提交数据
        async SubmitFormData(formData) {
            // console.log('SubmitFormData', formData);

            // console.log(this.news_title);
           
            this.$emit('childEvent',res.data)
        }

    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
