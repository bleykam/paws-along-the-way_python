import './TransportationRequest.scss'
import { convertDate } from "../../utils.jsx";

export default function TransportationRequest({req}){

    return(
        <section>
            <h2 className="animal-page__name">Transportation Request</h2>

            <div className="animal-page__bottom">
                <div className="animal-page__trans-info">
                    <p className="animal-page__trans-info-p"><strong>Driver: </strong></p>
                    <p className="animal-page__trans-info-p animal-page__time"><strong>Time: </strong>{req.time}</p>
                    <p className="animal-page__trans-info-p"><strong>Date: </strong>{convertDate(req.date)}</p>
                </div>

                <div className="animal-page__bottom-address">
                    <div className="animal-page__pickup">
                        <ul className="animal-page__list">
                            <li className="animal-page__list-item"> <strong>Pick-Up:</strong></li>
                            <li className="animal-page__list-item">{req.origin_address.address1}</li>
                            <li className="animal-page__list-item">{req.origin_address.address2}</li>
                            <li className="animal-page__list-item">{req.origin_address.city}, {req.origin_address.state} {req.origin_address.postcode}</li>
                        </ul>
                    </div>

                    <div className="animal-page__dropoff">
                        <ul className="animal-page__list">
                            <li className="animal-page__list-item"> <strong>Drop-Off:</strong></li>
                            <li className="animal-page__list-item">{req.destination_address.address1}</li>
                            <li className="animal-page__list-item">{req.destination_address.address2}</li>
                            <li className="animal-page__list-item">{req.destination_address.city}, {req.destination_address.state} {req.destination_address.postcode}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}