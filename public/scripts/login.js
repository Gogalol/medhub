//создание div уведомления ошибки
function showError({top = 0, right = 0, className, html, color}) {
    let error = document.createElement('div');
    error.className = "error";
    if (className) error.classList.add(className);

    error.style.right = right + 'px';
    error.style.top = top + 'px';
    error.style.position = 'static';
    error.style.backgroundColor = color;
    error.style.boxShadow = '0 11px 17px 0 rgba(23,32,61,.13)';
    error.style.borderRadius = '10px';
    error.style.padding = '8px';
    error.style.fontSize = '0.6em';
    error.style.textAlign = 'left';
    error.style.color = 'white';
    error.style.animationName = 'bounceIn';
    error.style.animationDuration = '600ms';
    error.style.animationIterationCount = '1';

    error.innerHTML = html;

    erdiv.append(error);
    //кнопка входа
    document.getElementById('login-btn').style.display = 'none';
    setTimeout(() => {error.remove()}, 2000);
    setTimeout(() => {document.getElementById('login-btn').style.display = 'block';}, 2000);
    //кнопка регистрации
    document.getElementById('reg-btn').style.display = 'none';
    setTimeout(() => {error.remove()}, 2000);
    setTimeout(() => {document.getElementById('reg-btn').style.display = 'block';}, 2000);
}

//проверка логин-почты
function checkLogEmail(){
    var email = document.getElementById("log-email").value;
    var check = /\S+@\S+\.\S+/;
    if(check.test(email)==true){return email;}else{return false;}
}

//проверка  логин-пароля
function checkLogPass(){
    var pass = document.getElementById("log-password").value
    if(pass.trim().length<8){return false;}else{return pass;}
}

//проверка рег-почты
function checkRegEmail(){
    var email = document.getElementById("reg-email").value;
    var check = /\S+@\S+\.\S+/;
    if(check.test(email)==true){return email;}else{return false;}
}

//проверка рег-пароля
function checkRegPass(){
    var pass = document.getElementById("reg-password").value
    if(pass.trim().length<8){return false;}else{return pass;}
}

//проверка рег-имени
function checkRegName(){
    var name = document.getElementById("reg-name").value
    if(name.trim().length>15){return false;}else{return name;}
}

//логин функция
function loginCheck(){
    if(checkLogEmail()!=false){
      if(checkLogPass()!=false){
      //при правильной почте и пароле

      let userData =
      {
          'type': 'login',
          'email': checkLogEmail(),
          'pass': checkLogPass(),
          'path': '/login',
      }
    asyncData(userData);

  }else{
    //при неправильном пароле
    showError({
        html: 'Неправильный пароль!',
        color: '#c93434',
    });}
  }else{
    //при неправильной почте, пароль
    showError({
      html: 'Неправильный email!',
      color: '#c93434',
  });}
}

function registerCheck(){
  //при неправильной почте
    if(checkRegEmail()==false){showError({
      html: 'Это не email!',
      color: '#c93434',
  });}
  //при неправильном имени
    if(checkRegName()==false){showError({
      html: 'Имя слишком длинное!',
      color: '#c93434',
});}
  //при неправильном пароле
    if(checkRegPass()==false){showError({
      html: 'Пароль слишком короткий!',
      color: '#c93434',
});}
//проверка прошла, создаем обьект для отправки
    if(checkRegPass()&&checkRegName()&&checkRegEmail()!=false){

  let userData =
  {
      'type': 'registration',
      'name': checkRegName(),
      'email': checkRegEmail(),
      'pass': checkRegPass(),
      'path': '/registration',
  }
  asyncData(userData);

}
}
//асинхронный метод отправки
function asyncData(userData) {
    const dataSend = async (userData) => {
          const fetchResp = await fetch(userData.path, {
              method: 'POST',
              body: JSON.stringify(userData)
          });
        return await fetchResp.text();}
//отправка
dataSend(userData)
    .then((response) => {
      checkResponse(response);
    })
}
//ожидание ответа, и в зависимости от него пускаем
function checkResponse(response) {
    if (response == true) {
        location.href = '/home'
    }
    else
    {
      //если пришел false от проверки с бд
        showError({
            html: 'Неверные данные!',
            color: '#c93434',
        });
    }
}
