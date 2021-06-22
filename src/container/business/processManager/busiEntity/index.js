import { BusiManager } from './applyLeave/index';
import { LeaveBusi } from './LeaveBusi/index';
import { BusiManagerTodoDetail } from './applyLeave/todoDetail';
import { BusiManagerTestTodoDetail } from './applyLeave/todoDetailTest';
import { LeaveBusiTodoDetail } from './LeaveBusi/todoDetail';
import { CounterSign2 } from './CounterSign2/index';
import { TimerEmail } from './TimerEmail/index';

// triggerPointAndPostilControled:控制流程启动点和批注是否自己决定其位置，true是自己控制,false和不传是走之前的固定位置的，新加的功能建议都写true，然后在自己页面通过this.props.triggerPointComponent和this.props.postil获取使用，个别需要单独配置的在triggerPointAndPostilControledAloneObj中单独定义为false，例如：
// triggerPointAndPostilControledAloneObj = {'BusiManagerTodoDetail':false}
let triggerPointAndPostilControled = true,
    triggerPointAndPostilControledAloneObj = { BusiManagerTodoDetail: true }
export {
    CounterSign2,
    BusiManager,
    BusiManagerTodoDetail,
    TimerEmail,
    triggerPointAndPostilControled,
    triggerPointAndPostilControledAloneObj,
    LeaveBusi,
    LeaveBusiTodoDetail,
    BusiManagerTestTodoDetail,
};
