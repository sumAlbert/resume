var xhr=new XMLHttpRequest();
xhr.open("post","http://localhost:8080/Index");
xhr.onreadystatechange=function () {
  console.log(xhr.readyState);
};
xhr.setRequestHeader("content-Type","x-www-form-urlencoded");
xhr.send();