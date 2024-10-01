import { toast } from "react-hot-toast";
import { ToasterType } from "../Utils/Constant";

export function showToaster(toaster, message) {
    switch (toaster) {
        case ToasterType.Success:
            toast.success(message);
            break;

        case ToasterType.Error:
            toast.error(message);
            break;

        case ToasterType.Loading:
            toast.loading(message);
            break;

        default:
            break;
    }
}