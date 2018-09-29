export default {
    width: state => state.win_content.width,
    height: state => state.win_content.height,
    sliderWidth: (state) => {
        return state.slidebar.width;
    },
    avatarPic: (state) => {
        return state.avatarPic;
    }
}