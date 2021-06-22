export default {
  // 数字小于10前面添加0
  addZero: function (num) {
    if (num < 10) {
      return '0' + num
    }
    return num
  },
  // 格式化日期和时间
  formatDateTime: function (date) {
    if (!date) {
      return ''
    }
    var D = new Date(date)
    return D.getFullYear() + '-' + this.addZero(D.getMonth() + 1) + '-' + this.addZero(D.getDate())
  },
  // 格式化日期到月
  formatDateMonth: function (date) {
    if (!date) {
      return ''
    }
    var D = new Date(date)
    return D.getFullYear() + '-' + this.addZero(D.getMonth() + 1)
  },
  // 格式化日期到分
  formatDateMinute: function (date) {
    if (!date) {
      return ''
    }
    var D = new Date(date)
    return D.getFullYear() + '-' + this.addZero(D.getMonth() + 1) + '-' + this.addZero(D.getDate()) + ' ' + this.addZero(D.getHours()) + ':' + this.addZero(D.getMinutes())
  },
  // 格式化日期到秒
  formatDateHour: function (date) {
    if (!date) {
      return ''
    }
    var D = new Date(date)
    return D.getFullYear() + '-' + this.addZero(D.getMonth() + 1) + '-' + this.addZero(D.getDate()) + ' ' + this.addZero(D.getHours()) + ':' + this.addZero(D.getMinutes()) + ':' + this.addZero(D.getSeconds())
  },
}