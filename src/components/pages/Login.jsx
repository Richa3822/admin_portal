import Login from "../organisms/Login";

function LoginPage(){
    let isNewSeller = JSON.parse(localStorage.getItem('setpwd'));
    if(isNewSeller == null){
        isNewSeller= true;
    }else{
        isNewSeller=false;
    }
return(
    <Login isNewSeller={isNewSeller} />
)
}

export default LoginPage