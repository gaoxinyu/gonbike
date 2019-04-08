
// sessionStorage 
// localStorage

export function saveStorage(key, value) {
  let v = JSON.stringify(value);
  localStorage[key] = v;
}

export function getStorage(key) {
  const v = localStorage[key];
  return v ? JSON.parse(v) : null;
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}

export function signOut() {
  localStorage.removeItem('token');
}

export function isLogin() {
  return !!localStorage.getItem('token');
  // return 1
}

export function isAuthorized(targetPath) {
  // 如果是公共路径
  const publicPath = ['/welcome', '/', '/login', '/password'];
  if (publicPath.indexOf(targetPath) > -1) return true;

  // 获取localStorage中，用户拥有的权限路径
  let token = getStorage('token');
  if (!token) return false;
  let paths = token.modules.map(function(el){return el.path});

  // corner case: 
  // 如果用户拥有/admin/account权限,
  // 那么也拥有/admin/accountadd， 而后者并不存在于api中
  for(let path of paths){
    if(targetPath.indexOf(path) > -1 ) return true;
  }
  return false;
}

export function getLocalLanguage() {
  const localLang = localStorage.getItem('lang') ? localStorage.getItem('lang').toLocaleLowerCase() : 'en';
  return localLang === 'zh-cn' ? 'zh' : localLang === 'zh-tw' ? 'hant' : 'en';
}