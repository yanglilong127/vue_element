export default {
    //设置页面内容区域宽高
    SET_WIN_CONTENT(state, obj){
        state.win_content = obj;
    },
    SET_LEFT_COLLAPSE(state){
        state.isCollapse = !state.isCollapse;
    },
    //改变菜单宽度
    HANDLE_LEFT_MENU(state){
        if(state.sidebar.opened){//true
            state.sidebar.width = '35px'
        }else{
            state.sidebar.width = '180px'
        }
        state.sidebar.opened = !state.sidebar.opened
    },
    DROP_NAME(state){
        state.isDropname = !state.isDropname;
    },
    //设置头像
    SET_AVATAR(state, imgData){
        state.avatarPic = imgData;
    }
}