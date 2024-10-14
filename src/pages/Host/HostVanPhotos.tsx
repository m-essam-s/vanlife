import { useOutletContext } from "react-router-dom"
import { Van } from "./HostVanDetail";  // Import the Van interface

const HostVanPhotos = () => {
    const { currentVan } = useOutletContext<{ currentVan: Van }>()
    return (
        <img src={currentVan.imageUrl} className="host-van-detail-image" />
    )
}

export default HostVanPhotos;
