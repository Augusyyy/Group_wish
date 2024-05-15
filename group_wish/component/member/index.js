// component/member/index.js
import {getAllTeamMember} from '../../api/member';
Component({

    /**
     * 组件的属性列表
     */
    properties: {
      memberPart: {
        type: Array,
        value: []
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
      keyword: '',
      memberList: [],
      memberString: [],
    },

    ready() {
      this.setMemberList();
    },

    /**
     * 组件的方法列表
     */
    methods: {
      setMemberList: function() {
        let that = this;
        let {keyword} = that.data;
        getAllTeamMember({page:1, limit: 9999, keyword: keyword})
          .then(function(res) {
            that.setData({
              memberList: res.list
            })
          })
          .catch(function(res) {

          })
      },

      inputChange: function(e) {
        this.setData({
          keyword: e.detail
        })
      },

      inputSearch: function() {
        this.setMemberList();
      },

      onChange: function(e) {
        let detail = e.detail;
        let memberString = [];
        let {memberList} = this.data;
        memberList.forEach(function(item) {
          if (detail.indexOf(item.id + '') > -1) {
            memberString.push(item.name);
          }
        });
        this.setData({
          memberPart: e.detail,
          memberString: memberString
        });
      },
      
      toggle: function(e) {
        const {index} = e.currentTarget.dataset;
        const checkbox = this.selectComponent(`.checkboxes-${index}`);
        checkbox.toggle();
      },

      memberCancel: function() {
        this.triggerEvent('cancelEvent', {});
      },

      memberConfirm: function() {
        let {memberPart, memberString} = this.data;
        this.triggerEvent('confirmEvent', {ids: memberPart, names: memberString});
      }
    }
})