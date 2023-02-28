import AddProductForm from '../molecules/AddProductForm'

const AddProduct = () => {
    return (
            <div id="accordion1">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div>
                        <h5 ><strong> Add Product</strong></h5>
                        </div>
                    </div>

                    <div id="collapseOne" className="collapse show" data-parent="#accordion1">
                        <div className="card-body">
                            <AddProductForm />         
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default AddProduct