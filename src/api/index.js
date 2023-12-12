import request from '@/utils/request'
//  ********** ElementUI ***********
// 新闻动态接口
export const reqData = () => request.get('/home/getData')
//获取新闻数据 
export const getNews = (data) => request("/news/getNews", "get", data)
//添加新闻
export const addNews = (data, params) => request("/news/add", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
//上传文件
export const uoloadFiles = (data) => request("/news/upload", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
//编辑新闻
export const editNews = (data) => request("/news/editNews", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
//删除新闻数据
export const delNews = (data) => request("/news/delNews", "post", data)
//登录接口
export const getMenu = (data) => request("/auth/login", "post", data)
// 获取验证码
export const getCode = (data) => request("/auth/code", "get")

// 通知公告接口
//添加公告
export const addNotification = (data, params) => request("/notification/add", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 获取公告
export const getNotification = (data) => request("/notification/getNotification", "get", data)
// 编辑公告
export const editNotification = (data) => request("/notification/editNotification", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 删除公告
export const deleteNotification = (data) => request("/notification/delNotification", "post", data)

// 获奖证书接口
//添加证书
export const addHonor = (data, params) => request("/honor/add", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 获取证书
export const getHonor = (data) => request("/honor/getHonor", "get", data)
// 编辑证书
export const editHonor = (data) => request("/honor/editHonor", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 删除证书
export const deleteHonor = (data) => request("/honor/delHonor", "post", data)


// 数据展示接口
// 新闻动态
export const getShowData = (data) => request("/news/getNewsCount", "get", data)
// 通知公告
export const getShowDataForTzgg = (data) => request("/notification/getNotificationCount", "get", data)
// 获奖证书
export const getShowDataForHjzs = (data) => request("/honor/getHonorCount", "get", data)
// Banner轮播图
export const getShowDataForBanner = (data) => request("/swiper/getBannerCount", "get", data)
// 校友
export const getShowDataForAlumni = (data) => request("/stu/getAlumniCount", "get", data)
// 教师
export const getShowDataForTeacher = (data) => request("/teacher/getTeacherCount", "get", data)


// Banner接口
//添加Banner
export const addBanner = (data, params) => request("/swiper/add", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 获取Banner
export const getBanner = (data) => request("/swiper/getBanner", "get", data)
// 编辑Banner
export const editBanner = (data) => request("/swiper/editBanner", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 删除Banner
export const delBanner = (data) => request("/swiper/delBanner", "post", data)


// 学生接口
//添加学生信息
export const addStu = (data, params) => request("/stu/add", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 获取学生信息
export const getStu = (data) => request("/stu/getStu", "get", data)
// 编辑学生信息
export const editStu = (data) => request("/stu/editStu", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 删除学生信息
export const delStu = (data) => request("/stu/delStu", "post", data)

// 教师接口
//添加学生信息
export const addTeacher = (data, params) => request("/teacher/add", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 获取学生信息
export const getTeacher = (data) => request("/teacher/getTeacher", "get", data)
// 编辑学生信息
export const editTeacher = (data) => request("/teacher/editTeacher", "post", data, { headers: { 'Content-Type': 'multipart/form-data' } })
// 删除学生信息
export const delTeacher = (data) => request("/teacher/delTeacher", "post", data)

//  **********  wangEditor  ***********
export const addNewsOfEditor = (stringData) => request("/news/add", "post", stringData)
export const editNewsOfEditor = (stringData) => request("/news/editNews", "post", stringData)