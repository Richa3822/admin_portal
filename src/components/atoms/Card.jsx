function Card({ heading }) {
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>
                        <strong> {heading}</strong>
                    </h5>
                </div>
            </div>
        </div>)

}
export default Card;