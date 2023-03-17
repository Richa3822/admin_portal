import ChangePasswordForm from '../organisms/ChangePasswordForm'
import ImgTag from '../atoms/ImgTag'
function ChangePassword(){
    
return(
    <div className="main-container d-flex">
            <div className="flex-1 d-flex">
                <ImgTag className="w-100" imgUrl="/assets/images/bac_removed_3.png" altText='backgroud img' />
                <img src="" alt="" />
            </div>
    <ChangePasswordForm />
    </div>
)
}

export default ChangePassword