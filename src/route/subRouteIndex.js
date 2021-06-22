import React from 'react';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import asyncImport from '../util/asyncImport.js';
// 首页
import HomePage from './../container/business/home/index';

/* Pandora基线模块 子路由配置-start*/

// 系统管理-数据字典
const DictManage = asyncImport(() => import(/* webpackChunkName:'DictManage' */ './../container/business/systemManager/dictManage/index'));
const DictDetail = asyncImport(() => import(/* webpackChunkName:'DictDetail' */ './../container/business/systemManager/dictManage/detail'));
const CreateDict = asyncImport(() => import(/* webpackChunkName:'CreateDict' */ './../container/business/systemManager/dictManage/create'));
const EditDict = asyncImport(() => import(/* webpackChunkName:'EditDict' */ './../container/business/systemManager/dictManage/edit'));
// 系统管理-Function管理
const FuncManage = asyncImport(() => import(/* webpackChunkName:'FuncManage' */ './../container/business/systemManager/funcManage/index'));
const createFunc = asyncImport(() => import(/* webpackChunkName:'createFunc' */ './../container/business/systemManager/funcManage/create'));
const editFunc = asyncImport(() => import(/* webpackChunkName:'editFunc' */ './../container/business/systemManager/funcManage/edit'));
const funcDetail = asyncImport(() => import(/* webpackChunkName:'funcDetail' */ './../container/business/systemManager/funcManage/detail'));
// 系统管理-菜单管理
const menuManage = asyncImport(() => import(/* webpackChunkName:'menuManage' */ './../container/business/systemManager/menuManage/index'));
const createMenu = asyncImport(() => import(/* webpackChunkName:'createMenu' */ './../container/business/systemManager/menuManage/create'));
const editMenu = asyncImport(() => import(/* webpackChunkName:'editMenu' */ './../container/business/systemManager/menuManage/edit'));
const menuDetail = asyncImport(() => import(/* webpackChunkName:'menuDetail' */ './../container/business/systemManager/menuManage/detail'));
// 系统管理-机构管理
const OrganManage = asyncImport(() => import(/* webpackChunkName:'OrganManage' */ './../container/business/systemManager/organManage/index'));
const OrganDetail = asyncImport(() => import(/* webpackChunkName:'OrganDetail' */ './../container/business/systemManager/organManage/detail'));
const createOrgan = asyncImport(() => import(/* webpackChunkName:'createOrgan' */ './../container/business/systemManager/organManage/create'));
const editOrgan = asyncImport(() => import(/* webpackChunkName:'editOrgan' */ './../container/business/systemManager/organManage/edit'));
const OrganUserQuery = asyncImport(() => import(/* webpackChunkName:'OrganUserQuery' */ './../container/business/systemManager/organManage/orgUserQry'));
// 系统管理-权限管理
const PowerManage = asyncImport(() => import(/* webpackChunkName:'PowerManage' */ './../container/business/systemManager/powerManage/index'));
const powerDetail = asyncImport(() => import(/* webpackChunkName:'powerDetail' */ './../container/business/systemManager/powerManage/detail'));
const createPower = asyncImport(() => import(/* webpackChunkName:'powerDetail' */ './../container/business/systemManager/powerManage/create'));
const editPower = asyncImport(() => import(/* webpackChunkName:'editPower' */ './../container/business/systemManager/powerManage//edit'));
const configPower = asyncImport(() => import(/* webpackChunkName:'configPower' */ './../container/business/systemManager/powerManage/powerConfig'));
// 系统管理-角色管理
const RoleManage = asyncImport(() => import(/* webpackChunkName:'RoleManage' */ './../container/business/systemManager/roleManage/index'));
const DetailRole = asyncImport(() => import(/* webpackChunkName:'DetailRole' */ './../container/business/systemManager/roleManage/detail'));
const CreateRole = asyncImport(() => import(/* webpackChunkName:'CreateRole' */ './../container/business/systemManager/roleManage/create'));
const EditRole = asyncImport(() => import(/* webpackChunkName:'EditRole' */ './../container/business/systemManager/roleManage/edit'));
// 系统管理-用户管理
const UserManage = asyncImport(() => import(/* webpackChunkName:'UserManage' */ './../container/business/systemManager/userManage/index'));
const userDetail = asyncImport(() => import(/* webpackChunkName:'userDetail' */ './../container/business/systemManager/userManage/detail'));
const createUser = asyncImport(() => import(/* webpackChunkName:'createUser' */ './../container/business/systemManager/userManage/create'));
const UserEdit = asyncImport(() => import(/* webpackChunkName:'UserEdit' */ './../container/business/systemManager/userManage/edit'));
const userPasswordUpdate = asyncImport(() => import(/* webpackChunkName:'userPasswordUpdate' */ './../container/business/systemManager/userManage/passwordChange'));

// 模版管理-属性管理
const AttributeDef = asyncImport(() => import(/* webpackChunkName:'AttributeDef' */ './../container/business/tmplManage/attributeDef/index'));
const CreateAttribute = asyncImport(() => import(/* webpackChunkName:'CreateAttribute' */ './../container/business/tmplManage/attributeDef/create'));
const EditAttribute = asyncImport(() => import(/* webpackChunkName:'EditAttribute' */ './../container/business/tmplManage/attributeDef/edit'));
const AttributeDetail = asyncImport(() => import(/* webpackChunkName:'AttributeDetail' */ './../container/business/tmplManage/attributeDef/detail'));

// 模版管理-实体管理
const EntityQry = asyncImport(() => import(/* webpackChunkName:'EntityQry' */ './../container/business/tmplManage/entityDef/index'));
const EntityDetail = asyncImport(() => import(/* webpackChunkName:'EntityDetail' */ './../container/business/tmplManage/entityDef/detail'));
const EntityCreate = asyncImport(() => import(/* webpackChunkName:'EntityCreate' */ './../container/business/tmplManage/entityDef/create'));
const EntityUpdate = asyncImport(() => import(/* webpackChunkName:'EntityUpdate' */ './../container/business/tmplManage/entityDef/edit'));

// 流程管理-待签收任务
const IndexMyresults = asyncImport(() => import(/* webpackChunkName:'IndexMyresults' */ './../container/business/processManager/myResults/index'));
const DiagramMyresults = asyncImport(() => import(/* webpackChunkName:'DiagramMyresults' */ './../container/business/processManager/myResults/diagram'));
const TaskDetailMyresults = asyncImport(() => import(/* webpackChunkName:'TaskDetailMyresults' */ './../container/business/processManager/myResults/taskDetail'));
// 流程管理-待办任务
const MyTodoTaskQry = asyncImport(() => import(/* webpackChunkName:'MyTodoTaskQry' */ './../container/business/processManager/mytodotask/index'));
const MyTodoTaskDiagram = asyncImport(() => import(/* webpackChunkName:'MyTodoTaskDiagram' */ './../container/business/processManager/mytodotask/diagram'));
const MyTodoTaskTDetail = asyncImport(() => import(/* webpackChunkName:'MyTodoTaskTDetail' */ './../container/business/processManager/mytodotask/taskDetail'));
// 流程管理-已办任务
const IndexWaitpickup = asyncImport(() => import(/* webpackChunkName:'IndexWaitpickup' */ './../container/business/processManager/waitPickup/index.js'));
const DetailWaitpickup = asyncImport(() => import(/* webpackChunkName:'DetailWaitpickup' */ './../container/business/processManager/waitPickup/diagram.js'));
const CreateWaitpickup = asyncImport(() => import(/* webpackChunkName:'CreateWaitpickup' */ './../container/business/processManager/waitPickup/taskDetail.js'));
// 流程管理-部署信息管理
const IndexDeployInfoManage = asyncImport(() => import(/* webpackChunkName:'IndexDeployInfoManage' */ './../container/business/processManager/myFlow/deployInfoManage/index'));
const DetailDeployInfoManage = asyncImport(() => import(/* webpackChunkName:'DetailDeployInfoManage' */ './../container/business/processManager/myFlow/deployInfoManage/detail'));
const CreateDeployInfoManage = asyncImport(() => import(/* webpackChunkName:'CreateDeployInfoManage' */ './../container/business/processManager/myFlow/deployInfoManage/create'));
const EditDeployInfoManage = asyncImport(() => import(/* webpackChunkName:'EditDeployInfoManage' */ './../container/business/processManager/myFlow/deployInfoManage/edit'));
// 流程管理-我的流程
const FlowManage = asyncImport(() => import(/* webpackChunkName:'FlowManage' */ './../container/business/processManager/myFlow/flowmanage/index'));
const FlowManageDetail = asyncImport(() => import(/* webpackChunkName:'FlowManageDetail' */ './../container/business/processManager/myFlow/flowmanage/detail'));
const FlowManageCreate = asyncImport(() => import(/* webpackChunkName:'FlowManageCreate' */ './../container/business/processManager/myFlow/flowmanage/create'));
const FlowManageUpdate = asyncImport(() => import(/* webpackChunkName:'FlowManageUpdate' */ './../container/business/processManager/myFlow/flowmanage/edit'));
// 流程管理-业务API配置
const IndexBusiAPIManage = asyncImport(() => import(/* webpackChunkName:'IndexBusiAPIManage' */ './../container/business/processManager/myFlow/busiAPIManage/index.js'));
const DetailBusiAPIManage = asyncImport(() => import(/* webpackChunkName:'DetailBusiAPIManage' */ './../container/business/processManager/myFlow/busiAPIManage/detail.js'));
const CreateBusiAPIManage = asyncImport(() => import(/* webpackChunkName:'CreateBusiAPIManage' */ './../container/business/processManager/myFlow/busiAPIManage/create.js'));
const EditBusiAPIManage = asyncImport(() => import(/* webpackChunkName:'EditBusiAPIManage' */ './../container/business/processManager/myFlow/busiAPIManage/edit.js'));
// 流程管理-流程设计工作区
const ProcessModelListPage = asyncImport(() => import(/* webpackChunkName:'ProcessModelListPage' */ './../container/business/processManager/processDesigner/index.js'));
const ProcessModeler = asyncImport(() => import(/* webpackChunkName:'ProcessModeler' */ './../container/business/processManager/processDesigner/modeler.js'));
// 流程管理-业务Demo
const ProcessEntityIndex = asyncImport(() => import(/* webpackChunkName:'ProcessEntityIndex' */ './../container/business/processEntity/index'));
const ProcessEntityDetail = asyncImport(() => import(/* webpackChunkName:'ProcessEntityDetail' */ './../container/business/processEntity/detail'));
const ProcessEntityCreate = asyncImport(() => import(/* webpackChunkName:'ProcessEntityCreate' */ './../container/business/processEntity/create'));
const ProcessEntityEdit = asyncImport(() => import(/* webpackChunkName:'ProcessEntityEdit' */ './../container/business/processEntity/edit'));
// 流程管理-业务相关的待办任务
const BusiTodotaskIndex = asyncImport(() => import(/* webpackChunkName:'BusiTodotaskIndex' */ './../container/business/processManager/busiTodotask/index'));
const BusiTodotaskIndexTask = asyncImport(() => import(/* webpackChunkName:'BusiTodotaskIndexTask' */ './../container/business/processManager/busiTodotask/index_task'));
// 流程管理-业务相关的已办任务
const BusiDonetaskIndex = asyncImport(() => import(/* webpackChunkName:'BusiDonetaskIndex' */ './../container/business/processManager/busiDonetask/index'));
const BusiDonetaskIndexTask = asyncImport(() => import(/* webpackChunkName:'BusiDonetaskIndexTask' */ './../container/business/processManager/busiDonetask/index_task'));
// 流程管理-业务待办任务展示字段管理
const BusiProcConfIndex = asyncImport(() => import(/* webpackChunkName:'BusiProcConfIndex' */ './../container/business/processManager/busiProcConf/index.js'));
const BusiProcConfDetail = asyncImport(() => import(/* webpackChunkName:'BusiProcConfDetail' */ './../container/business/processManager/busiProcConf/detail.js'));
const BusiProcConfCreate = asyncImport(() => import(/* webpackChunkName:'BusiProcConfCreate' */ './../container/business/processManager/busiProcConf/create.js'));
const BusiProcConfEdit = asyncImport(() => import(/* webpackChunkName:'BusiProcConfEdit' */ './../container/business/processManager/busiProcConf/edit.js'));
// 请年假查询
const LeavebusiIndex = asyncImport(() => import(/* webpackChunkName:'LeavebusiIndex' */ './../container/business/leavebusi/index.js'));
const LeavebusiDetail = asyncImport(() => import(/* webpackChunkName:'LeavebusiDetail' */ './../container/business/leavebusi/detail.js'));
const LeavebusiCreate = asyncImport(() => import(/* webpackChunkName:'LeavebusiCreate' */ './../container/business/leavebusi/create.js'));
const LeavebusiEdit = asyncImport(() => import(/* webpackChunkName:'LeavebusiEdit' */ './../container/business/leavebusi/edit.js'));

// 流程管理-岗位相关的待办任务
const PostTodotaskIndex = asyncImport(() => import(/* webpackChunkName:'PostTodotaskIndex' */ './../container/business/processManager/postTodoTask/index'));
const PostTodotaskIndexTask = asyncImport(() => import(/* webpackChunkName:'PostTodotaskIndexTask' */ './../container/business/processManager/postTodoTask/index_task'));
const WaitPickupCreatePost = asyncImport(() => import(/* webpackChunkName:'WaitPickupCreatePost' */ './../container/business/processManager/postTodoTask/waitPickup/taskDetail'));

// 流程管理-岗位相关的已办任务
const PostDonetaskIndex = asyncImport(() => import(/* webpackChunkName:'PostDonetaskIndex' */ './../container/business/processManager/postDoneTask/index'));
const PostDonetaskIndexTask = asyncImport(() => import(/* webpackChunkName:'PostDonetaskIndexTask' */ './../container/business/processManager/postDoneTask/index_task'));

// 流程管理-角色相关待办任务
const RoleTodotaskIndex = asyncImport(() => import(/* webpackChunkName:'RoleTodotaskIndex' */ './../container/business/processManager/roleTodotask/index'));
const RoleTodotaskIndexTask = asyncImport(() => import(/* webpackChunkName:'RoleTodotaskIndexTask' */ './../container/business/processManager/roleTodotask/index_task'));
const WaitPickupCreateRole = asyncImport(() => import(/* webpackChunkName:'WaitPickupCreateRole' */ './../container/business/processManager/roleTodotask/waitPickup/taskDetail'));
// 流程管理-角色相关已办任务
const RoleDonetaskIndex = asyncImport(() => import(/* webpackChunkName:'RoleDonetaskIndex' */ './../container/business/processManager/roleDonetask/index'));
const RoleDonetaskIndexTask = asyncImport(() => import(/* webpackChunkName:'RoleDonetaskIndexTask' */ './../container/business/processManager/roleDonetask/index_task'));
// 富文本编辑器
import EditorDemo from './../container/business/richTextEditor/index.js';

/* Pandora基线模块路由配置-end*/
//code-generator-placeholder-start


//code-generator-placeholder-end
/* 应用系统 子路由配置-end*/

/******************************************框架外的系统管理*******************************************/

//用户关联模块和服务单元
const UserRelatedModule = asyncImport(() => import( './../container/business/systemManagerSelf/userRelated/module.js'));
const UserList = asyncImport(() => import( './../container/business/systemManagerSelf/userRelated/index.js'));
const UserRelatedSubModule = asyncImport(() => import( './../container/business/systemManagerSelf/userRelated/subModule.js'));

//模块和服务单元关联用户
const ModuleRelatedUserIndex = asyncImport(() => import( './../container/business/systemManagerSelf/relatedUser/module.js'));
const ModuleRelatedUser = asyncImport(() => import( './../container/business/systemManagerSelf/relatedUser/moduleRelatedUser.js'));
const SubModuleRelatedUserIndex = asyncImport(() => import( './../container/business/systemManagerSelf/relatedUser/subModule.js'));
const SubModuleRelatedUser = asyncImport(() => import( './../container/business/systemManagerSelf/relatedUser/subModuleRelatedUser.js'));

//页面元素管理
const PageEleIndex = asyncImport(() => import( './../container/business/systemManagerSelf/pageEleManager/index.js'));
const PageEleConfig = asyncImport(() => import( './../container/business/systemManagerSelf/pageEleManager/config.js'));



/******************************************服务治理*******************************************/
//模块配置
const ModuleSgIndex = asyncImport(() => import( './../container/business/gateway/module/index'));
const ModuleSgDetail = asyncImport(() => import( './../container/business/gateway/module/detail'));
const ModuleSgEdit = asyncImport(() => import( './../container/business/gateway/module/edit'));
const ModuleSgCreate = asyncImport(() => import( './../container/business/gateway/module/create'));

//服务单元配置
const SubModuleSgIndex = asyncImport(() => import( './../container/business/gateway/subModule/index'));
const SubModuleSgCreate = asyncImport(() => import( './../container/business/gateway/subModule/create'));
const SubModuleSgDetail = asyncImport(() => import( './../container/business/gateway/subModule/detail'));
const SubModuleSgEdit = asyncImport(() => import( './../container/business/gateway/subModule/edit'));

//服务配置
const ServiceSgIndex = asyncImport(() => import( './../container/business/gateway/service/index'));
const ServiceSgCreate = asyncImport(() => import( './../container/business/gateway/service/create'));
const ServiceSgDetail = asyncImport(() => import( './../container/business/gateway/service/detail'));
const ServiceSgEdit = asyncImport(() => import( './../container/business/gateway/service/edit'));

//ldc配置
const Ldc = asyncImport(() => import( './../container/business/gateway/ldcConfig/index'));
const Ldccreate = asyncImport(() => import( './../container/business/gateway/ldcConfig/create'));
const Ldcoption = asyncImport(() => import( './../container/business/gateway/ldcConfig/option'));
const Ldcupload = asyncImport(() => import( './../container/business/gateway/ldcConfig/upload'));

//静态注册
const RegisteredNodesManageCreate = asyncImport(() => import( './../container/business/gateway/registeredNodesManage/createNodes'));
const RegisteredNodesManageIndex = asyncImport(() => import( './../container/business/gateway/registeredNodesManage/index'));
const RegisteredNodesManageEdit = asyncImport(() => import( './../container/business/gateway/registeredNodesManage/editNodes'));
const RegisteredNodesManageUpload = asyncImport(() => import( './../container/business/gateway/registeredNodesManage/upload'));
const NodesChange = asyncImport(() => import( './../container/business/gateway/registeredNodesManage/nodesChange'));

//ELK统计管理
const QueryAllLog = asyncImport(() => import( './../container/business/gateway/ELKStatistics/queryAllLog'));
const RegistInfo = asyncImport(() => import( './../container/business/gateway/ELKStatistics/registInfo'));
const SubscribeService = asyncImport(() => import( './../container/business/gateway/ELKStatistics/subscribeService'));
const SubscribeServiceRecord = asyncImport(() => import( './../container/business/gateway/ELKStatistics/subscribeServiceRecord'));
const FaultIsolation = asyncImport(() => import( './../container/business/gateway/ELKStatistics/faultIsolation'));
const FaultIsolationRecord = asyncImport(() => import( './../container/business/gateway/ELKStatistics/faultIsolationRecord'));
const ErrorStatistics = asyncImport(() => import( './../container/business/gateway/ELKStatistics/error'));
const ServiceRelationshipStatistics = asyncImport(() => import( './../container/business/gateway/ELKStatistics/serviceRelationship'));
const ServiceRelationshipRecordStatistics = asyncImport(() => import( './../container/business/gateway/ELKStatistics/serviceRelationshipRecord'));
const RegistRecord = asyncImport(() => import( './../container/business/gateway/ELKStatistics/registRecord'));

/******************************************事件驱动*******************************************/

//模块：messagesend
const MessageSend = asyncImport(() => import( './../container/business/eventDriven/messageSend/index.js'));
const Send = asyncImport(() => import( './../container/business/eventDriven/messageSend/send.js'));
const MessageEdit = asyncImport(() => import( './../container/business/eventDriven/messageSend/edit.js'));

//模块：messageTopology
const MessageTopology = asyncImport(() => import( './../container/business/eventDriven/messageTopology/index.js'));
const BusinessKeyDetail = asyncImport(() => import( './../container/business/eventDriven/messageTopology/detailed.js'));
const AllWayMessage = asyncImport(() => import( './../container/business/eventDriven/messageTopology/allWayMessage.js'));

//模块：MessageTrack
const MessageTrack = asyncImport(() => import( './../container/business/eventDriven/messageTrack/index.js'));
const Single = asyncImport(() => import( './../container/business/eventDriven/messageTrack/single.js'));
const MultipleTrack = asyncImport(() => import( './../container/business/eventDriven/messageTrack/multipleTrack.js'));
const SingleTrack = asyncImport(() => import( './../container/business/eventDriven/messageTrack/singleTrack.js'));
const PositionMessage = asyncImport(() => import( './../container/business/eventDriven/messageTrack/positionMessage.js'));
const QueryPosition = asyncImport(() => import( './../container/business/eventDriven/messageTrack/queryPosition.js'));
const MessageT = asyncImport(() => import( './../container/business/eventDriven/messageTrack/messageTrack.js'));
const QueryMessage = asyncImport(() => import( './../container/business/eventDriven/messageTrack/queryMessage.js'));
const TopicMessage = asyncImport(() => import( './../container/business/eventDriven/messageTrack/topicMessage.js'));
const SendEdaMessage = asyncImport(() => import( './../container/business/eventDriven/messageTrack/sendEdaMessage.js'));
const ConsumeEdaMessage = asyncImport(() => import( './../container/business/eventDriven/messageTrack/consumeEdaMessage.js'));
const ResetSite = asyncImport(() => import( './../container/business/eventDriven/messageTrack/resetSite.js'));

//Approve
const ApproveIndex = asyncImport(() => import( './../container/business/eventDriven/approve/approveIndex.js'));
const ApproveCreate = asyncImport(() => import( './../container/business/eventDriven/approve/approveCreate.js'));
const ApproveRefresh = asyncImport(() => import( './../container/business/eventDriven/approve/approveRefresh.js'));
const ApproveConnect = asyncImport(() => import( './../container/business/eventDriven/approve/approveConnect.js'));
const ApproveList = asyncImport(() => import( './../container/business/eventDriven/approve/approveList.js'));
const ApproveEdit = asyncImport(() => import( './../container/business/eventDriven/approve/approveEdit.js'));

//impower
const ImpowerManage = asyncImport(() => import( './../container/business/eventDriven/impower/impowerManage.js'));
const ImpowerDirect = asyncImport(() => import( './../container/business/eventDriven/impower/impowerDirect.js'));
const ImpowerApply = asyncImport(() => import( './../container/business/eventDriven/impower/impowerApply.js'));
const Approval = asyncImport(() => import( './../container/business/eventDriven/impower/approval.js'));
const CopyApprove = asyncImport(() => import( './../container/business/eventDriven/impower/copyApprove.js'));
const LookLog = asyncImport(() => import( './../container/business/eventDriven/impower/lookLog.js'));

//模块：database
const DatabaseCreate = asyncImport(() => import( '../container/business/eventDriven/database/create'));
const DatabaseIndex = asyncImport(() => import( '../container/business/eventDriven/database/index'));
const DatabaseAttach = asyncImport(() => import( '../container/business/eventDriven/database/attach'));
const DatabaseEdit = asyncImport(() => import( './../container/business/eventDriven/database/edit.js'));

//模块：UpLoad
const UpLoad = asyncImport(() => import( './../container/business/eventDriven/upLoad/index.js'));
const Topic = asyncImport(() => import( './../container/business/eventDriven/upLoad/topic.js'));
const Producer = asyncImport(() => import( './../container/business/eventDriven/upLoad/producer.js'));
const Consumer = asyncImport(() => import( './../container/business/eventDriven/upLoad/consumer.js'));
const Subscribe = asyncImport(() => import( './../container/business/eventDriven/upLoad/subscribe.js'));
const TopicRelation = asyncImport(() => import( './../container/business/eventDriven/upLoad/topicRelation.js'));
const Uploads = asyncImport(() => import( './../container/business/eventDriven/upLoad/upload.js'));


//模块：producer
const IndexEdcproducer = asyncImport(() => import( './../container/business/eventDriven/producer/index.js'));
const DetailEdcproducer = asyncImport(() => import( './../container/business/eventDriven/producer/detail.js'));
const CreateEdcproducer = asyncImport(() => import( './../container/business/eventDriven/producer/create.js'));
const EditEdcproducer = asyncImport(() => import( './../container/business/eventDriven/producer/edit.js'));

//Consumer
const IndexConsumer = asyncImport(() => import( './../container/business/eventDriven/consumer/index.js'));
const DetailConsumer = asyncImport(() => import( './../container/business/eventDriven/consumer/detail.js'));
const CreateConsumer = asyncImport(() => import( './../container/business/eventDriven/consumer/create.js'));
const EditConsumer = asyncImport(() => import( './../container/business/eventDriven/consumer/edit.js'));
const ResetConsumer = asyncImport(() => import( './../container/business/eventDriven/consumer/resetConsumer.js'));

//模块：edamiddleware
const IndexEdamiddleware = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/index.js'));
const DetailEdamiddleware = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/detail.js'));
const DetailsEdamiddleware = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/details.js'));
const CreateEdamiddleware = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/create.js'));
const EditEdamiddleware = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/edit.js'));
const EditsEdamiddleware = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/edits.js'));
const ClusterList = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/clusterList.js'));
const AddClaster = asyncImport(() => import( './../container/business/eventDriven/edamiddleware/addClaster.js'));


//模块：EdaNorm
const EdaNorm = asyncImport(() => import( './../container/business/eventDriven/edaNorm/index.js'));
//模块 onlineProcess
const OnlineProcess = asyncImport(() => import( './../container/business/eventDriven/onlineProcess/onlineProcess.js'));
//模块：EdaTopicrelation
const IndexEdaTopicRelation = asyncImport(() => import( './../container/business/eventDriven/edaTopicRelation/index.js'));
const DetailEdaTopicRelation = asyncImport(() => import( './../container/business/eventDriven/edaTopicRelation/detail.js'));
const CreateEdaTopicRelation = asyncImport(() => import( './../container/business/eventDriven/edaTopicRelation/create.js'));
const EditEdaTopicRelation = asyncImport(() => import( './../container/business/eventDriven/edaTopicRelation/edit.js'));

//集群同步
const ClusterSync = asyncImport(() => import( './../container/business/eventDriven/clusterSync/clusterSync.js'));

//模块：EdaSubscribe
const IndexEdaSubscribe = asyncImport(() => import( './../container/business/eventDriven/edaSubscribe/index.js'));
const DetailEdaSubscribe = asyncImport(() => import( './../container/business/eventDriven/edaSubscribe/detail.js'));
const CreateEdaSubscribe = asyncImport(() => import( './../container/business/eventDriven/edaSubscribe/create.js'));
const EditEdaSubscribe = asyncImport(() => import( './../container/business/eventDriven/edaSubscribe/edit.js'));
const ConsumerTopic = asyncImport(() => import( './../container/business/eventDriven/edaSubscribe/consumerTopic.js'));

//模块：topic
const IndexTopic = asyncImport(() => import( './../container/business/eventDriven/topic/index.js'));
const DetailTopic = asyncImport(() => import( './../container/business/eventDriven/topic/detail.js'));
const CreateTopic = asyncImport(() => import( './../container/business/eventDriven/topic/create.js'));
const EditTopic = asyncImport(() => import( './../container/business/eventDriven/topic/edit.js'));
//应用切换：applySwitch
const ApplySwitch = asyncImport(() => import( './../container/business/eventDriven/clusterSwitch/applySwitch.js'));
//集群切换：clusterSwitch
const ClusterSwitch = asyncImport(() => import( './../container/business/eventDriven/clusterSwitch/clusterSwitch.js'));
//系统配置
const RefreshProperties = asyncImport(() => import( './../container/business/eventDriven/refreshProperties/refreshProperties.js'));
const TotalSwitch = asyncImport(() => import( './../container/business/eventDriven/refreshProperties/totalSwitch.js'));
const ManualSync = asyncImport(() => import( './../container/business/eventDriven/refreshProperties/manualSync.js'));
const OperationRecord = asyncImport(() => import( './../container/business/eventDriven/refreshProperties/operationRecord.js'));


//ZK状态查看
const ZKStatus = asyncImport(() => import( './../container/business/eventDriven/ZKStatus/index.js'));
const ZKVersion = asyncImport(() => import( './../container/business/eventDriven/ZKStatus/queryVersion.js'));
const PathQuery = asyncImport(() => import( './../container/business/eventDriven/ZKStatus/pathQuery.js'));

//待上线管理
const LaunchSetting = asyncImport(() => import( './../container/business/eventDriven/launchSetting/index.js'));

/******************************************服务治理审核*******************************************/

//模块配置v1
const ModuleApproveExamine = asyncImport(() => import( './../container/business/approveConfig/module/examine'));
const ModuleApproveIndex = asyncImport(() => import( './../container/business/approveConfig/module/index'));
const ModuleApproveCreate = asyncImport(() => import( './../container/business/approveConfig/module/create'));
const ModuleApproveUpload = asyncImport(() => import( './../container/business/approveConfig/module/upload'));
const ModuleApproveDetail = asyncImport(() => import( './../container/business/approveConfig/module/detail'));
const ModuleApproveEdit = asyncImport(() => import( './../container/business/approveConfig/module/edit'));
const ModuleVersionHistory = asyncImport(() => import( './../container/business/approveConfig/module/moduleVersionHistory'));

//服务单元配置v1
const SubModuleApproveExamine = asyncImport(() => import( './../container/business/approveConfig/subModule/examine'));
const SubModuleApproveIndex = asyncImport(() => import( './../container/business/approveConfig/subModule/index'));
const SubModuleApproveCreate = asyncImport(() => import( './../container/business/approveConfig/subModule/create'));
const SubModuleApproveUpload = asyncImport(() => import( './../container/business/approveConfig/subModule/upload'));
const SubModuleApproveDetail = asyncImport(() => import( './../container/business/approveConfig/subModule/detail'));
const SubModuleApproveEdit = asyncImport(() => import( './../container/business/approveConfig/subModule/edit'));
const SubModuleVersionHistory = asyncImport(() => import( './../container/business/approveConfig/subModule/subModuleVersionHistory'));

//服务配置v1
const ServiceApproveExamine = asyncImport(() => import( './../container/business/approveConfig/service/examine'));
const ServiceApproveIndex = asyncImport(() => import( './../container/business/approveConfig/service/index'));
const ServiceApproveDetail = asyncImport(() => import( '../container/business/approveConfig/service/detail'));
const ServiceApproveEdit = asyncImport(() => import( '../container/business/approveConfig/service/edit'));
const ServiceApproveCreate = asyncImport(() => import( '../container/business/approveConfig/service/create'));
const ServiceApproveUpload = asyncImport(() => import( './../container/business/approveConfig/service/upload'));
const ServiceVersionHistory = asyncImport(() => import( './../container/business/approveConfig/service/serviceVersionHistory'));

// 注册节点
const NodeManage = asyncImport(() => import( '../container/business/approveConfig/nodeManage/index'));
const NodeManageExamine = asyncImport(() => import( '../container/business/approveConfig/nodeManage/examine'));
const NodeManageDetail = asyncImport(() => import( '../container/business/approveConfig/nodeManage/detail'));
const NodeManageEdit = asyncImport(() => import( '../container/business/approveConfig/nodeManage/edit'));
const NodeManageUpload = asyncImport(() => import( '../container/business/approveConfig/nodeManage/upload'));
const NodeManageCreate = asyncImport(() => import( '../container/business/approveConfig/nodeManage/create'));
// 联系人配置
const ModuleContact = asyncImport(() => import( './../container/business/approveConfig/contact/module'));
const ModuleContactEdit = asyncImport(() => import( './../container/business/approveConfig/contact/moduleContactEdit'));
const SubModuleContact = asyncImport(() => import( './../container/business/approveConfig/contact/subModule'));
const SubModuleContactEdit = asyncImport(() => import( './../container/business/approveConfig/contact/subModuleContactEdit'));
const ServiceContact = asyncImport(() => import( './../container/business/approveConfig/contact/service'));
const ServiceContactEdit = asyncImport(() => import( './../container/business/approveConfig/contact/serviceContactEdit'));

// 统计页面
const StatisticsInfo = asyncImport(() => import( './../container/business/approveConfig/statisticsInfo/index'));
const ApaasStatisticsInfo = asyncImport(() => import( './../container/business/approveConfig/statisticsInfo/apaas'));

// 申请配置信息
const GatewayProfile = asyncImport(() => import( './../container/business/profile/gateway/create'));
const EventDrivenProfile = asyncImport(() => import( './../container/business/profile/eventDriven/create'));

//模块管理
const ModuleManagerCreate = asyncImport(() => import( './../container/business/manager/module/create.js'));
const ModuleManagerIndex = asyncImport(() => import( './../container/business/manager/module/index.js'));
const ModuleManagerEdit = asyncImport(() => import( './../container/business/manager/module/edit.js'));
const ModuleManagerDetail = asyncImport(() => import( './../container/business/manager/module/detail.js'));

//服务单元管理
const SubModuleManagerCreate = asyncImport(() => import( './../container/business/manager/subModule/create.js'));
const SubModuleManagerIndex = asyncImport(() => import( './../container/business/manager/subModule/index.js'));
const SubModuleManagerEdit = asyncImport(() => import( './../container/business/manager/subModule/edit.js'));
const SubModuleManagerDetail = asyncImport(() => import( './../container/business/manager/subModule/detail.js'));

//模块管理审核
const ModuleManagerApproveCreate = asyncImport(() => import( './../container/business/managerApprove/module/create.js'));
const ModuleManagerApproveIndex = asyncImport(() => import( './../container/business/managerApprove/module/index.js'));
const ModuleManagerApproveEdit = asyncImport(() => import( './../container/business/managerApprove/module/edit.js'));
const ModuleManagerApproveDetail = asyncImport(() => import( './../container/business/managerApprove/module/detail.js'));
const ModuleManagerApproveExamine = asyncImport(() => import( './../container/business/managerApprove/module/examine.js'));

//服务单元管理审核
const SubModuleManagerApproveCreate = asyncImport(() => import( './../container/business/managerApprove/subModule/create.js'));
const SubModuleManagerApproveIndex = asyncImport(() => import( './../container/business/managerApprove/subModule/index.js'));
const SubModuleManagerApproveEdit = asyncImport(() => import( './../container/business/managerApprove/subModule/edit.js'));
const SubModuleManagerApproveDetail = asyncImport(() => import( './../container/business/managerApprove/subModule/detail.js'));
const SubModuleManagerApproveExamine = asyncImport(() => import( './../container/business/managerApprove/subModule/examine.js'));

/******************************************事件驱动审核*******************************************/

//主题审核
const TopicApproveCreate = asyncImport(() => import( './../container/business/eventDrivenApprove/topic/create.js'));
const TopicApproveIndex = asyncImport(() => import( './../container/business/eventDrivenApprove/topic/index.js'));
const TopicApproveEdit = asyncImport(() => import( './../container/business/eventDrivenApprove/topic/edit.js'));
const TopicApproveDetail = asyncImport(() => import( './../container/business/eventDrivenApprove/topic/detail.js'));
const TopicApproveExamine = asyncImport(() => import( './../container/business/eventDrivenApprove/topic/examine.js'));

//消费者审核
const ConsumerApproveCreate = asyncImport(() => import( './../container/business/eventDrivenApprove/consumer/create.js'));
const ConsumerApproveIndex = asyncImport(() => import( './../container/business/eventDrivenApprove/consumer/index.js'));
const ConsumerApproveEdit = asyncImport(() => import( './../container/business/eventDrivenApprove/consumer/edit.js'));
const ConsumerApproveDetail = asyncImport(() => import( './../container/business/eventDrivenApprove/consumer/detail.js'));
const ConsumerApproveExamine = asyncImport(() => import( './../container/business/eventDrivenApprove/consumer/examine.js'));

//生产者审核
const ProducerApproveCreate = asyncImport(() => import( './../container/business/eventDrivenApprove/producer/create.js'));
const ProducerApproveIndex = asyncImport(() => import( './../container/business/eventDrivenApprove/producer/index.js'));
const ProducerApproveEdit = asyncImport(() => import( './../container/business/eventDrivenApprove/producer/edit.js'));
const ProducerApproveDetail = asyncImport(() => import( './../container/business/eventDrivenApprove/producer/detail.js'));
const ProducerApproveExamine = asyncImport(() => import( './../container/business/eventDrivenApprove/producer/examine.js'));

//主题生产者审核
const EdaTopicRelationApproveCreate = asyncImport(() => import( './../container/business/eventDrivenApprove/edaTopicRelation/create.js'));
const EdaTopicRelationApproveIndex = asyncImport(() => import( './../container/business/eventDrivenApprove/edaTopicRelation/index.js'));
const EdaTopicRelationApproveEdit = asyncImport(() => import( './../container/business/eventDrivenApprove/edaTopicRelation/edit.js'));
const EdaTopicRelationApproveDetail = asyncImport(() => import( './../container/business/eventDrivenApprove/edaTopicRelation/detail.js'));
const EdaTopicRelationApproveExamine = asyncImport(() => import( './../container/business/eventDrivenApprove/edaTopicRelation/examine.js'));

//订阅者关系审核
const EdaSubscribeApproveCreate = asyncImport(() => import( './../container/business/eventDrivenApprove/edaSubscribe/create.js'));
const EdaSubscribeApproveIndex = asyncImport(() => import( './../container/business/eventDrivenApprove/edaSubscribe/index.js'));
const EdaSubscribeApproveEdit = asyncImport(() => import( './../container/business/eventDrivenApprove/edaSubscribe/edit.js'));
const EdaSubscribeApproveDetail = asyncImport(() => import( './../container/business/eventDrivenApprove/edaSubscribe/detail.js'));
const EdaSubscribeApproveExamine = asyncImport(() => import( './../container/business/eventDrivenApprove/edaSubscribe/examine.js'));

/******************************************数据导入*******************************************/

//数据导入
const ImportBusinessData = asyncImport(() => import( './../container/business/importAndExport/importData/importBusinessData'));
const ImportUnBusinessData = asyncImport(() => import( './../container/business/importAndExport/importData/importUnBusinessData'));
const ImportData = asyncImport(() => import( './../container/business/importAndExport/importData/importData'));
const ExportZKData = asyncImport(() => import( './../container/business/importAndExport/exportData/exportZKData'));
const ExportGateway = asyncImport(() => import( './../container/business/importAndExport/exportData/gateway'));
const ExportEventDriven = asyncImport(() => import( './../container/business/importAndExport/exportData/eventDriven'));

const SubRoute = function () {
    return (
        <CacheSwitch>
            {/* Pandora基线模块 子路由配置-start */}
            // 首页
            <Route path="/home" component={HomePage} />
            // 系统管理-数据字典
            <Route path="/systemManage/dictManage/dictQur" component={DictManage} />
            <Route path="/systemManage/dictManage/dictCreate" component={CreateDict} />
            <Route path="/systemManage/dictManage/dictDetail" component={DictDetail} />
            <Route path="/systemManage/dictManage/dictEdit" component={EditDict} />
            // 系统管理-Function管理
            <Route path="/systemManage/funcManage/funcQur" component={FuncManage} />
            <Route path="/systemManage/funcManage/funcCreate" component={createFunc} />
            <Route path="/systemManage/funcManage/funcDetail" component={funcDetail} />
            <Route path="/systemManage/funcManage/funcEdit" component={editFunc} />
            // 系统管理-菜单管理
            <Route path="/systemManage/menuManage/menuQur" component={menuManage} />
            <Route path="/systemManage/menuManage/menuCreate" component={createMenu} />
            <Route path="/systemManage/menuManage/menuDetail" component={menuDetail} />
            <Route path="/systemManage/menuManage/menuEdit" component={editMenu} />
            // 系统管理-机构管理
            <Route path="/systemManage/organManager/organQur" component={OrganManage} />
            <Route path="/systemManage/organManager/organCreate" component={createOrgan} />
            <Route path="/systemManage/organManager/organDetail" component={OrganDetail} />
            <Route path="/systemManage/organManager/organEdit" component={editOrgan} />
            <Route path="/systemManage/organManager/organUserQur" component={OrganUserQuery} />
            // 系统管理-权限管理
            <Route path="/systemManage/powerManager/powerQur" component={PowerManage} />
            <Route path="/systemManage/powerManager/powerCreate" component={createPower} />
            <Route path="/systemManage/powerManager/powerDetail" component={powerDetail} />
            <Route path="/systemManage/powerManager/powerEdit" component={editPower} />
            <Route path="/systemManage/powerManager/powerConfig" component={configPower} />
            // 系统管理-角色管理
            <Route path="/systemManage/roleManage/index" component={RoleManage} />
            <Route path="/systemManage/roleManage/createRole" component={CreateRole} />
            <Route path="/systemManage/roleManage/detailRole" component={DetailRole} />
            <Route path="/systemManage/roleManage/editRole" component={EditRole} />
            // 系统管理-用户管理
            {/* <Route path="/systemManage/userManager/uerQur" component={UserManage} /> */}
            <Route path="/systemManage/userManager/uerQur" component={UserList} />
            <Route path="/systemManage/userManager/userCreate" component={createUser} />
            <Route path="/systemManage/userManager/userDetail" component={userDetail} />
            <Route path="/systemManage/userManager/userEdit" component={UserEdit} />
            <Route path="/systemManage/userManager/userPasswordUpdate" component={userPasswordUpdate} />

            // 模版管理-属性管理
            <Route path="/tmplManage/attributeDef/queryAttribute" component={AttributeDef} />
            <Route path="/tmplManage/attributeDef/createAttribute" component={CreateAttribute} />
            <Route path="/tmplManage/attributeDef/attributeDetail" component={AttributeDetail} />
            <Route path="/tmplManage/attributeDef/editAttribute" component={EditAttribute} />
            // 模版管理-实体管理
            <Route path="/tmplManage/entityDef/entityQry" component={EntityQry} />
            <Route path="/tmplManage/entityDef/entityCreate" component={EntityCreate} />
            <Route path="/tmplManage/entityDef/entityDetail" component={EntityDetail} />
            <Route path="/tmplManage/entityDef/entityUpdate" component={EntityUpdate} />

            // 流程管理-待签收任务
            <Route path="/processManager/waitPickup/index" component={IndexWaitpickup} />
            <Route path="/processManager/waitPickup/taskDetail" component={CreateWaitpickup} />
            <Route path="/processManager/waitPickup/diagram" component={DetailWaitpickup} />
            // 流程管理-待办任务BusiTodotaskIndex
            <Route path="/processManager/mytodotask/index" component={MyTodoTaskQry} />
            <Route path="/processManager/mytodotask/tdetail" component={MyTodoTaskTDetail} />
            <Route path="/processManager/mytodotask/diagram" component={MyTodoTaskDiagram} />
            // 流程管理-已办任务
            <Route path="/processManager/myResults/index" component={IndexMyresults} />
            <Route path="/processManager/myResults/taskDetail" component={TaskDetailMyresults} />
            <Route path="/processManager/myResults/diagram" component={DiagramMyresults} />
            // 流程管理-部署信息管理
            <Route path="/processManager/myProcess/deployInfoManage/index" component={IndexDeployInfoManage} />
            <Route path="/processManager/myProcess/deployInfoManage/create" component={CreateDeployInfoManage} />
            <Route path="/processManager/myProcess/deployInfoManage/detail" component={DetailDeployInfoManage} />
            <Route path="/processManager/myProcess/deployInfoManage/edit" component={EditDeployInfoManage} />
            // 流程管理-流程定义信息管理
            <Route path="/processManager/myProcess/flowManage/index" component={FlowManage} />
            <Route path="/processManager/myProcess/flowManage/create" component={FlowManageCreate} />
            <Route path="/processManager/myProcess/flowManage/detail" component={FlowManageDetail} />
            <Route path="/processManager/myProcess/flowManage/edit" component={FlowManageUpdate} />
            // 流程管理-业务API配置
            <Route path="/processManager/myProcess/busiAPIManage/index" component={IndexBusiAPIManage} />
            <Route path="/processManager/myProcess/busiAPIManage/create" component={CreateBusiAPIManage} />
            <Route path="/processManager/myProcess/busiAPIManage/detail" component={DetailBusiAPIManage} />
            <Route path="/processManager/myProcess/busiAPIManage/edit" component={EditBusiAPIManage} />
            // 流程管理-流程设计工作区
            <Route path="/processManager/ProcessDesigner/index" component={ProcessModelListPage} />
            <Route path="/processManager/ProcessDesigner/modeler/create" component={ProcessModeler} />
            <Route path="/processManager/ProcessDesigner/modeler/edit" component={ProcessModeler} />
            // 流程管理-业务Demo
            <Route path="/manager/test" component={HomePage} />
            <Route path="/busimanager/index" component={ProcessEntityIndex} />
            <Route path="/busimanager/create" component={ProcessEntityCreate} />
            <Route path="/busimanager/detail" component={ProcessEntityDetail} />
            <Route path="/busimanager/edit" component={ProcessEntityEdit} />
            // 业务待办任务展示字段管理
            <Route path="/processManager/busiProcConf/index" component={BusiProcConfIndex} />
            <Route path="/processManager/busiProcConf/create" component={BusiProcConfCreate} />
            <Route path="/processManager/busiProcConf/detail" component={BusiProcConfDetail} />
            <Route path="/processManager/busiProcConf/edit" component={BusiProcConfEdit} />
            // 流程管理-业务相关的待办任务
            <Route path="/processManager/busiTodotask/index" component={BusiTodotaskIndex} />
            <Route path="/processManager/busiTodotask/indexTask" component={BusiTodotaskIndexTask} />
            // 流程管理-业务相关的已办任务
            <Route path="/processManager/busiDonetask/index" component={BusiDonetaskIndex} />
            <Route path="/processManager/busiDonetask/indexTask" component={BusiDonetaskIndexTask} />

            // 请年假查询
            <Route path="/leavebusi/index" component={LeavebusiIndex} />
            <Route path="/leavebusi/create" component={LeavebusiCreate} />
            <Route path="/leavebusi/edit" component={LeavebusiEdit} />
            <Route path="/leavebusi/detail" component={LeavebusiDetail} />

            // 流程管理-岗位相关的待办任务
            <Route path="/processManager/postTodotask/index" component={PostTodotaskIndex} />
            <Route path="/processManager/postTodotask/indexTask" component={PostTodotaskIndexTask} />
            <Route path="/processManager/postTodoTask/waitPickup/taskDetail" component={WaitPickupCreatePost} />

            // 流程管理-岗位相关的已办任务
            <Route path="/processManager/postDonetask/index" component={PostDonetaskIndex} />
            <Route path="/processManager/postDonetask/indexTask" component={PostDonetaskIndexTask} />

            // 流程管理-角色相关的待办任务
            <Route path="/processManager/roleTodotask/index" component={RoleTodotaskIndex} />
            <Route path="/processManager/roleTodotask/indexTask" component={RoleTodotaskIndexTask} />
            <Route path="/processManager/roleTodoTask/waitPickup/taskDetail" component={WaitPickupCreateRole} />

            // 流程管理-角色相关的已办任务
            <Route path="/processManager/roleDonetask/index" component={RoleDonetaskIndex} />
            <Route path="/processManager/roleDonetask/indexTask" component={RoleDonetaskIndexTask} />

            // 富文本编辑器
            <Route path="/rich/text/editor" component={EditorDemo} />
            {/* Pandora基线模块 子路由配置-end  */}

            { /* 应用系统 子路由配置-start*/}

            //框架外的系统管理
            {/* 用户关联模块及服务单元 */}
            <Route path="/manager/userRelated/module" component={UserRelatedModule} />
            <Route path="/manager/userRelated/subModule" component={UserRelatedSubModule} />
            {/* 模块及服务单元关联用户 */}
            <Route path="/manager/moduleRelatedUser/index" component={ModuleRelatedUserIndex} />
            <Route path="/manager/moduleRelatedUser/related" component={ModuleRelatedUser} />
            <Route path="/manager/subModuleRelatedUser/index" component={SubModuleRelatedUserIndex} />
            <Route path="/manager/subModuleRelatedUser/related" component={SubModuleRelatedUser} />
            {/* 模块及服务单元关联用户 */}
            <Route path="/systemManager/pageEle/index" component={PageEleIndex} />
            <Route path="/systemManager/pageEle/config" component={PageEleConfig} />
            

            //code-generator-router-placeholder-start
          <Route path="/eventDriven/approve/approveIndex" component={ApproveIndex} />
					<Route path="/eventDriven/approve/approveCreate" component={ApproveCreate} />
					<Route path="/eventDriven/approve/approveRefresh" component={ApproveRefresh} />
					<Route path="/eventDriven/approve/approveConnect" component={ApproveConnect} />
					<Route path="/eventDriven/approve/approveList" component={ApproveList} />
					<Route path="/eventDriven/approve/approveEdit" component={ApproveEdit} />


					<Route path="/eventDriven/impower/impowerManage" component={ImpowerManage} />
					<Route path="/eventDriven/impower/impowerDirect" component={ImpowerDirect} />
					<Route path="/eventDriven/impower/impowerApply" component={ImpowerApply} />
					<Route path="/eventDriven/impower/approval" component={Approval} />
					<Route path="/eventDriven/impower/copyApprove" component={CopyApprove} />
					<Route path="/eventDriven/impower/lookLog" component={LookLog} />
            
					//MessageSend
					<Route path="/eventDriven/messageSend/index" component={MessageSend} />
					<Route path="/eventDriven/messageSend/send" component={Send} />
					<Route path="/eventDriven/messageSend/edit/:id" component={MessageEdit} />

					//MessageTopology
					<Route path="/eventDriven/messageTopology/index" component={MessageTopology} />
					<Route path="/eventDriven/messageTopology/detailed/:id" component={BusinessKeyDetail} />
					<Route path="/eventDriven/messageTopology/allWayMessage" component={AllWayMessage} />

					//applySwitch
					<Route path="/eventDriven/clusterSwitch/applySwitch" component={ApplySwitch} />
					//clusterSwitch
					<Route path="/eventDriven/clusterSwitch/clusterSwitch" component={ClusterSwitch} />
					//refreshProperties

					<Route path="/eventDriven/refreshProperties/totalSwitch" component={TotalSwitch} />
					<Route path="/eventDriven/refreshProperties/refreshProperties" component={RefreshProperties} />
          <Route path="/eventDriven/refreshProperties/manualSync" component={ManualSync} />
          <Route path="/eventDriven/refreshProperties/operationRecord" component={OperationRecord} />
					
          
					//MessageTrack

					<Route path="/eventDriven/messageTrack/index" component={MessageTrack} />
					<Route path="/eventDriven/messageTrack/single" component={Single} />
					<Route path="/eventDriven/messageTrack/multipleTrack" component={MultipleTrack} />
					<Route path="/eventDriven/messageTrack/singleTrack" component={SingleTrack} />
					<Route path="/eventDriven/messageTrack/queryPosition" component={QueryPosition} />
					<Route path="/eventDriven/messageTrack/positionMessage" component={PositionMessage} />
					<Route path="/eventDriven/messageTrack/messageTrack"  component={MessageT} />
					<Route path="/eventDriven/messageTrack/queryMessage" component={QueryMessage} />
					<Route path="/eventDriven/messageTrack/topicMessage" component={TopicMessage} />
					<Route path="/eventDriven/messageTrack/sendEdaMessage" component={SendEdaMessage} />
					<Route path="/eventDriven/messageTrack/consumeEdaMessage"  component={ConsumeEdaMessage} />
          <Route path="/eventDriven/messageTrack/resetSite" component={ResetSite} />

					//EdaNorm
					<Route path="/eventDriven/edaNorm/index" component={EdaNorm} />
					//onlineProcess
					<Route path="/eventDriven/onlineProcess/onlineProcess" component={OnlineProcess} />

					//onlineProcess
					<Route path="/eventDriven/clusterSync/clusterSync" component={ClusterSync} />

					//Database

					<Route path="/eventDriven/database/create" component={DatabaseCreate} />
					<Route path="/eventDriven/database/index" component={DatabaseIndex} />
					<Route path="/eventDriven/database/attach" component={DatabaseAttach} />
					<Route path="/eventDriven/database/edit/:id" component={DatabaseEdit} />

					//模块：UpLoad

					<Route path="/eventDriven/upLoad/index" component={UpLoad} />
					<Route path="/eventDriven/upLoad/topic" component={Topic} />
					<Route path="/eventDriven/upLoad/producer" component={Producer} />
					<Route path="/eventDriven/upLoad/consumer" component={Consumer} />
					<Route path="/eventDriven/upLoad/subscribe" component={Subscribe} />
					<Route path="/eventDriven/upLoad/topicRelation" component={TopicRelation} />
					<Route path="/eventDriven/upLoad/upload" component={Uploads} />

					//模块：producer

					<Route path="/eventDriven/producer/index" component={IndexEdcproducer} />
					<Route path="/eventDriven/producer/create" component={CreateEdcproducer} />
					<Route path="/eventDriven/producer/edit" component={EditEdcproducer} />
					<Route path="/eventDriven/producer/detail" component={DetailEdcproducer} />

					//模块：Consumer

					<Route path="/eventDriven/consumer/index" component={IndexConsumer} />
					<Route path="/eventDriven/consumer/create" component={CreateConsumer} />
					<Route path="/eventDriven/consumer/edit" component={EditConsumer} />
					<Route path="/eventDriven/consumer/detail" component={DetailConsumer} />
					<Route path="/eventDriven/consumer/resetConsumer" component={ResetConsumer} />

					//模块：edamiddleware

					<Route path="/eventDriven/edamiddleware/index" component={IndexEdamiddleware} />
					<Route path="/eventDriven/edamiddleware/create" component={CreateEdamiddleware} />
					<Route path="/eventDriven/edamiddleware/edit/:id" component={EditEdamiddleware} />
					<Route path="/eventDriven/edamiddleware/edits/:id" component={EditsEdamiddleware} />
					<Route path="/eventDriven/edamiddleware/detail/:id" component={DetailEdamiddleware} />
					<Route path="/eventDriven/edamiddleware/details/:id" component={DetailsEdamiddleware} />
					<Route path="/eventDriven/edamiddleware/clusterList/:id" component={ClusterList} />
					<Route path="/eventDriven/edamiddleware/addClaster/:id" component={AddClaster} />

					//模块：edaTopicRelation

					<Route path="/eventDriven/edaTopicRelation/index" component={IndexEdaTopicRelation} />
					<Route path="/eventDriven/edaTopicRelation/create" component={CreateEdaTopicRelation} />
					<Route path="/eventDriven/edaTopicRelation/edit" component={EditEdaTopicRelation} />
					<Route path="/eventDriven/edaTopicRelation/detail" component={DetailEdaTopicRelation} />


					//模块：edaSubscribe

					<Route path="/eventDriven/edaSubscribe/index" component={IndexEdaSubscribe} />
					<Route path="/eventDriven/edaSubscribe/create"  component={CreateEdaSubscribe} />
					<Route path="/eventDriven/edaSubscribe/edit" component={EditEdaSubscribe} />
					<Route path="/eventDriven/edaSubscribe/detail" component={DetailEdaSubscribe} />
					<Route path="/eventDriven/edaSubscribe/consumerTopic" component={ConsumerTopic} />


					//模块：topic

					<Route path="/eventDriven/topic/index" component={IndexTopic} />
					<Route path="/eventDriven/topic/create" component={CreateTopic} />
					<Route path="/eventDriven/topic/edit" component={EditTopic} />
					<Route path="/eventDriven/topic/detail" component={DetailTopic} />
          
          {/* ZK使用情况统计 */}
          
          <Route path="/eventDriven/ZKStatus/index" component={ZKStatus} />
					<Route path="/eventDriven/ZKStatus/queryVersion" component={ZKVersion} />
          <Route path="/eventDriven/ZKStatus/pathQuery" component={PathQuery} />

          {/* 查询待上线列表 */}

          <Route path="/eventDriven/launchSetting/index" component={LaunchSetting}/>


					{/* 模块配置 */}
					<Route path="/gateway/module/index" component={ModuleSgIndex} />
					<Route path="/gateway/module/detail" component={ModuleSgDetail} />
					<Route path="/gateway/module/edit" component={ModuleSgEdit} />
					<Route path="/gateway/module/create" component={ModuleSgCreate} />

          {/* 服务单元配置 */}
					<Route path="/gateway/subModule/index" component={SubModuleSgIndex} />
					<Route path="/gateway/subModule/create" component={SubModuleSgCreate} />
					<Route path="/gateway/subModule/detail" component={SubModuleSgDetail} />
					<Route path="/gateway/subModule/edit" component={SubModuleSgEdit} />

          {/* 服务配置 */}
					<Route path="/gateway/service/index" component={ServiceSgIndex} />
					<Route path="/gateway/service/create" component={ServiceSgCreate} />
					<Route path="/gateway/service/detail" component={ServiceSgDetail} />
					<Route path="/gateway/service/edit" component={ServiceSgEdit} />

					{/* ldcConfig */}
					<Route path="/gateway/ldcConfig/index" component={Ldc} />
					<Route path="/gateway/ldcConfig/create" component={Ldccreate} />
					<Route path="/gateway/ldcConfig/option" component={Ldcoption} />
					<Route path="/gateway/ldcConfig/upload" component={Ldcupload} />

          {/* 注册节点管理 */}
					<Route path="/gateway/registeredNodesManage/index" component={RegisteredNodesManageIndex} />
					<Route path="/gateway/registeredNodesManage/createNodes" component={RegisteredNodesManageCreate} />
					<Route path="/gateway/registeredNodesManage/editNodes" component={RegisteredNodesManageEdit} />
					<Route path="/gateway/registeredNodesManage/upload" component={RegisteredNodesManageUpload} />
          <Route path="/gateway/registeredNodesManage/nodesChange" component={NodesChange} />

          {/* ELK统计管理 */}
					<Route path="/gateway/ELKStatistics/queryAllLog" component={QueryAllLog} />
          <Route path="/gateway/ELKStatistics/registInfo" component={RegistInfo} />
          <Route path="/gateway/ELKStatistics/registRecord" component={RegistRecord} />
          <Route path="/gateway/ELKStatistics/subscribeService" component={SubscribeService} />
          <Route path="/gateway/ELKStatistics/subscribeServiceRecord" component={SubscribeServiceRecord} />
          <Route path="/gateway/ELKStatistics/faultIsolation" component={FaultIsolation} />
          <Route path="/gateway/ELKStatistics/faultIsolationRecord" component={FaultIsolationRecord} />
          <Route path="/gateway/ELKStatistics/error" component={ErrorStatistics} />
          <Route path="/gateway/ELKStatistics/serviceRelationship" component={ServiceRelationshipStatistics} />
          <Route path="/gateway/ELKStatistics/serviceRelationshipRecord" component={ServiceRelationshipRecordStatistics} />

					{/* 模块配置v1 */}
					<Route path="/approve/module/examine" component={ModuleApproveExamine} />
					<Route path="/approve/module/create" component={ModuleApproveCreate} />
					<Route path="/approve/module/upload" component={ModuleApproveUpload} />
					<Route path="/approve/module/index" component={ModuleApproveIndex} />
					<Route path="/approve/module/edit" component={ModuleApproveEdit} />
					<Route path="/approve/module/detail" component={ModuleApproveDetail} />
          <Route path="/approve/module/moduleVersionHistory" component={ModuleVersionHistory} />
          <Route path="/approve/module/statisticsInfo" component={ApaasStatisticsInfo} />

					{/* 服务单元配置v1 */}
					<Route path="/approve/subModule/examine" component={SubModuleApproveExamine} />
					<Route path="/approve/subModule/create" component={SubModuleApproveCreate} />
					<Route path="/approve/subModule/upload" component={SubModuleApproveUpload} />
					<Route path="/approve/subModule/index" component={SubModuleApproveIndex} />
					<Route path="/approve/subModule/detail" component={SubModuleApproveDetail} />
					<Route path="/approve/subModule/edit" component={SubModuleApproveEdit} />
          <Route path="/approve/subModule/subModuleVersionHistory" component={SubModuleVersionHistory} />

					{/* 服务配置v1 */}
					<Route path="/approve/service/examine" component={ServiceApproveExamine} />
					<Route path="/approve/service/index" component={ServiceApproveIndex} />
					<Route path="/approve/service/detail" component={ServiceApproveDetail} />
					<Route path="/approve/service/edit" component={ServiceApproveEdit} />
          <Route path="/approve/service/create" component={ServiceApproveCreate} />
					<Route path="/approve/service/upload" component={ServiceApproveUpload} />
          <Route path="/approve/service/serviceVersionHistory" component={ServiceVersionHistory} />
          
          

          {/* 注册节点 */}
					<Route path="/approve/registeredNodesManage/index" component={NodeManage} />
					<Route path="/approve/registeredNodesManage/examine" component={NodeManageExamine} />
					<Route path="/approve/registeredNodesManage/detail" component={NodeManageDetail} />
					<Route path="/approve/registeredNodesManage/edit" component={NodeManageEdit} />
					<Route path="/approve/registeredNodesManage/upload" component={NodeManageUpload} /> 
          <Route path="/approve/registeredNodesManage/create" component={NodeManageCreate} />

					{/* 联系人 */}
					<Route path="/approve/contact/module" component={ModuleContact} />
					<Route path="/approve/contact/moduleContactEdit" component={ModuleContactEdit} />
          <Route path="/approve/contact/subModule" component={SubModuleContact} />
					<Route path="/approve/contact/subModuleContactEdit" component={SubModuleContactEdit} />
          <Route path="/approve/contact/service" component={ServiceContact} />
					<Route path="/approve/contact/serviceContactEdit" component={ServiceContactEdit} />

          {/* 统计信息 */}
          <Route path="/approve/statisticsInfo/index" component={StatisticsInfo} />

          {/* 模块管理 */}
          <Route path="/manager/module/create" component={ModuleManagerCreate} />
          <Route path="/manager/module/index" component={ModuleManagerIndex} />
          <Route path="/manager/module/edit" component={ModuleManagerEdit} />
          <Route path="/manager/module/detail" component={ModuleManagerDetail} />
          {/* 服务单元管理 */}
          <Route path="/manager/subModule/create" component={SubModuleManagerCreate} />
          <Route path="/manager/subModule/index" component={SubModuleManagerIndex} />
          <Route path="/manager/subModule/edit" component={SubModuleManagerEdit} />
          <Route path="/manager/subModule/detail" component={SubModuleManagerDetail} />
          
          {/* 模块管理审核 */}
          <Route path="/managerApprove/module/create" component={ModuleManagerApproveCreate} />
          <Route path="/managerApprove/module/index" component={ModuleManagerApproveIndex} />
          <Route path="/managerApprove/module/edit" component={ModuleManagerApproveEdit} />
          <Route path="/managerApprove/module/detail" component={ModuleManagerApproveDetail} />
          <Route path="/managerApprove/module/examine" component={ModuleManagerApproveExamine} />
          {/* 服务单元管理审核 */}
          <Route path="/managerApprove/subModule/create" component={SubModuleManagerApproveCreate} />
          <Route path="/managerApprove/subModule/index" component={SubModuleManagerApproveIndex} />
          <Route path="/managerApprove/subModule/edit" component={SubModuleManagerApproveEdit} />
          <Route path="/managerApprove/subModule/detail" component={SubModuleManagerApproveDetail} />
          <Route path="/managerApprove/subModule/examine" component={SubModuleManagerApproveExamine} />

          {/* 数据导入 */}
          <Route path="/importAndExport/importData/importBusinessData" component={ImportBusinessData} />
          <Route path="/importAndExport/importData/importUnBusinessData" component={ImportUnBusinessData} />
          <Route path="/importAndExport/importData/importData" component={ImportData} />
          <Route path="/importAndExport/exportData/exportZKData" component={ExportZKData} />
          <Route path="/importAndExport/exportData/gateway" component={ExportGateway} />
          <Route path="/importAndExport/exportData/eventDriven" component={ExportEventDriven} />

          {/* 主题 */}
          <Route path="/eventDrivenApprove/topic/index" component={TopicApproveIndex} />
          <Route path="/eventDrivenApprove/topic/create" component={TopicApproveCreate} />
          <Route path="/eventDrivenApprove/topic/edit" component={TopicApproveEdit} />
          <Route path="/eventDrivenApprove/topic/detail" component={TopicApproveDetail} />
          <Route path="/eventDrivenApprove/topic/examine" component={TopicApproveExamine} />
          {/* 生产者 */}
          <Route path="/eventDrivenApprove/producer/index" component={ProducerApproveIndex} />
					<Route path="/eventDrivenApprove/producer/create" component={ProducerApproveCreate} />
					<Route path="/eventDrivenApprove/producer/edit" component={ProducerApproveEdit} />
					<Route path="/eventDrivenApprove/producer/detail" component={ProducerApproveDetail} />
          <Route path="/eventDrivenApprove/producer/examine" component={ProducerApproveExamine} />
          {/* 消费者 */}
					<Route path="/eventDrivenApprove/consumer/index" component={ConsumerApproveIndex} />
					<Route path="/eventDrivenApprove/consumer/create" component={ConsumerApproveCreate} />
					<Route path="/eventDrivenApprove/consumer/edit" component={ConsumerApproveEdit} />
					<Route path="/eventDrivenApprove/consumer/detail" component={ConsumerApproveDetail} />
          <Route path="/eventDrivenApprove/consumer/examine" component={ConsumerApproveExamine} />
          {/* 生产者关系 */}
					<Route path="/eventDrivenApprove/edaTopicRelation/index" component={EdaTopicRelationApproveIndex} />
					<Route path="/eventDrivenApprove/edaTopicRelation/create" component={EdaTopicRelationApproveCreate} />
					<Route path="/eventDrivenApprove/edaTopicRelation/edit" component={EdaTopicRelationApproveEdit} />
					<Route path="/eventDrivenApprove/edaTopicRelation/detail" component={EdaTopicRelationApproveDetail} />
          <Route path="/eventDrivenApprove/edaTopicRelation/examine" component={EdaTopicRelationApproveExamine} />
          {/* 订阅关系 */}
					<Route path="/eventDrivenApprove/edaSubscribe/index" component={EdaSubscribeApproveIndex} />
					<Route path="/eventDrivenApprove/edaSubscribe/create" component={EdaSubscribeApproveCreate} />
					<Route path="/eventDrivenApprove/edaSubscribe/edit" component={EdaSubscribeApproveEdit} />
					<Route path="/eventDrivenApprove/edaSubscribe/detail" component={EdaSubscribeApproveDetail} />
          <Route path="/eventDrivenApprove/edaSubscribe/examine" component={EdaSubscribeApproveExamine} />
      
          <Route path="/profile/gateway" component={GatewayProfile} />
          <Route path="/profile/eventDriven"  component={EventDrivenProfile} />
            //code-generator-router-placeholder-end
            { /* 应用系统 子路由配置-end*/}
            <Redirect to="/home" component={HomePage} />

        </CacheSwitch>
    )
};

export default SubRoute;
