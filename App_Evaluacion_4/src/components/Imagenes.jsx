import image1 from "./img/1.svg";
import image2 from "./img/2.webp";

function Imagenes() {
    return (
        <div>
            <h1 className="text-success fw-bold fst-italic">Imagenes</h1>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-4 mb-1">
                        <div className="card h-100 shadow-lg">
                            <img src={image1} alt="imagen 1" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">1</h5>
                                <p className="card-text text-muted small">imagen</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4 mb-1">
                        <div className="card h-100 shadow-lg">
                            <img src={image2} alt="imagen 2" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">2</h5>
                                <p className="card-text text-muted small">imagen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Imagenes;
