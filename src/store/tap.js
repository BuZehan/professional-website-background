export default {
    namespaced: true,
    state: {
        IsCollapse: false, //左侧菜单栏
        tapList: [ //header 面包屑
            {
                icon: "menu",
                label: "首页",
                name: "home",
                path: "/",
                url: "Home/Home"
            }
        ],
        //menu 菜单栏
        Menus: []
    },
    mutations: {
        //左侧菜单栏
        CHANG_ISCOLLAPSE(state) {
            state.IsCollapse = !state.IsCollapse
        },
        //面包屑---breadcrumb
        SET_BREADCRUMB(state, value) {
            //判断添加的是否为首页
            if (value.name !== 'home') {
                let index = state.tapList.findIndex(item => item.name === value.name);
                //如果不存在 则将添加到tapList当中
                if (index == -1) {
                    state.tapList.push(value)
                }
            }
        },
        //操作删除Tag
        CHANGE_TAGS(state, data) {
            console.log(data)
            const result = state.tapList.findIndex(val => val.name === data.item.name)
            state.tapList.splice(result, 1)
        },
        //设置menu数据
        SET_ROUTE_MENU(state, data) {
            state.Menus = data.menu
                //将列表存储于localStorage中 防止页面刷新Store数据丢失
            localStorage.setItem("MENUS", JSON.stringify(data.menu))
        },
        //动态路由注册
        ADD_MENU(state, router) {
            if (!localStorage.getItem("TOKEN")) return
            let menu = JSON.parse(localStorage.getItem("MENUS"))
                //组装动态路由的数据
            let RoutesArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () =>
                            import (`@/views/children/news/${item.url}`)
                        return item
                    })
                    RoutesArray.push(...item.children)
                } else {
                    item.component = () =>
                        import (`@/views/children/${item.url}`)
                    RoutesArray.push(item)
                }
            });
            localStorage.setItem("ROUTES", JSON.stringify(RoutesArray))
            RoutesArray.forEach(item => {
                router.addRoute("main", item)
            })
        }
    },
    actions: {

    }

}