export default {
    set_win_content: ({commit, getters}, obj) => {
        commit('SET_WIN_CONTENT', obj);
    },
    //折叠菜单
    setLeftCollapse: ({commit, getters}) => {
        commit('SET_LEFT_COLLAPSE');
    },
    //改变菜单宽度
    handleLeftMenu: ({commit, getters}) =>{
        commit('HANDLE_LEFT_MENU');
    },
    //隐藏单一菜单名称
    dropName: ({commit, getters}) =>{
        commit('DROP_NAME');
    },
    //设置个人头像
    setAvatar: ({commit, getters}, imgData) => {
        commit('SET_AVATAR', imgData);
    }
}