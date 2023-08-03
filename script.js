window.onload = function()
{

    //if the user tries to access the profile html but user is not logged in
    if(window.location.pathname==" /profile.html" && !localStorage.getItem("accessToken")){
        window.location.href='index.html';
    }

    // //if the user is trying to access the signup page but user is logged in
    // if(window.location.pathname==" /index.html" && !localStorage.getItem("accessToken")){
    //     window.location.href='profile.html';
    // }

    // if the user is not logged in and trying to log in
    if(window.location.pathname=="/index.html"){
        const form = document.getElementById("signupform");
         form.addEventListener("submit",function(e){
            e.preventDefault();

            let username = document.getElementById('username');
            let email = document.getElementById('email');
            let password = document.getElementById('password');
            let confirmpassword = document.getElementById('confirmpassword');
            console.log(username.value,email.value,password.value,confirmpassword.value);
                    
            let array = new Uint8Array(16);
            window.crypto.getRandomValues(array);
            let accessToken = Array.from(array,b=>b.toString(16).padStart(2,"0")).join("");
            console.log(accessToken);
            
            let user = {
                    username:username.value,
                    email:email.value,
                    password:password.value,
                    confirmpassword:confirmpassword.value,
                    accessToken:accessToken
                }

                localStorage.setItem("user",JSON.stringify(user));
                localStorage.setItem("accessToken",JSON.stringify(accessToken));

                setTimeout(function(){
                    window.location.href = "profile.html";
                },1000);
        })
        if(window.location.pathname == "/index.html"){
        }}
        else if(window.location.pathname == "/profile.html"){
            let user = JSON.parse(localStorage.getItem("user"));
            let profiletext=`
            <p id="card-username">Full Name: ${user.username}</p>
            <p id="card-email">Email: ${user.email}</p>
            <p id="card-token">Token: ${user.accessToken}</p>
            <p id="card-Password">Password: ${user.password}</p>`
            document.getElementById("profile-info").innerHTML = profiletext;

            let logoutbtn = document.getElementById('Logout-btn')
            logoutbtn.addEventListener('click',function(){
                localStorage.clear();
                setTimeout(function(){
                    window.location.href = "index.html";
                },1000);
            })
        }
    }