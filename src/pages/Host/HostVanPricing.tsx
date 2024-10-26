import { useOutletContext } from "react-router-dom"
import { Van } from "../../definitions";  // Import the Van interface

const HostVanPricing = () => {
    const { currentVan } = useOutletContext<{ currentVan: Van }>()
    return (
        <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    )
}

export default HostVanPricing;
