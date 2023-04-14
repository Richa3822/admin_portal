import SetPasswordForm from '../organisms/SetPasswordForm'
import ImgTag from '../atoms/ImgTag'

function SetPassword(){
return(
    <div className="main-container d-flex">
            <div className="flex-1 d-flex">
                <ImgTag className="w-100" imgUrl="/assets/images/bac_removed_3.png" altText='backgroud img' />
                <img src="" alt="" />
            </div>
    <SetPasswordForm />
    </div>
)
}

export default SetPassword