import AddProductForm from '../organisms/AddProductForm'

const AddProduct = () => {
    return (
            <div className='container-fluid'>
                <div className="card ">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div>
                        <h5 ><strong> Add Product</strong></h5>
                        </div>
                    </div>

                    <div  className="collapse show " >
                        <div className="card-body ">
                            <AddProductForm />     
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AddProduct