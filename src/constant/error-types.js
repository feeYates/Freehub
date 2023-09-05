// 报错相关报错的常量

// 用户名或者密码不能为空
const NAME_OR_PASSWORD_IS_REQUIRED = 'name_or_password_is_required';
// 当前用户名已经存在了
const USER_IS_ALREADY_EXISTS = 'user_is_already_exists';
// 当前用户不存在
const USER_DOSE_NOT_EXISTS = 'user_is_dose_not_exists';
// 用户密码不确定
const PASSWORD_IS_INCORRECT = 'password_is_incorrect'; 
// 当前token无效
const UNAUTHORIZATION = 'unauthorization';
// 没有权限修改
const NO_PERMISSION = 'no_permission';

// 导出
module.exports = {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_IS_ALREADY_EXISTS,
  USER_DOSE_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
  NO_PERMISSION,
}