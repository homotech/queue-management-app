import {
  faClock,
  faMoneyBill1,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

interface serviceProps {
  name: string;
  price: number;
  duration: number;
}
const Services = ({ name, price, duration }: serviceProps) => {
  return (
    <div className="px-4 py-2 bg-gray-100 rounded-xl w-64 ">
      <div>
        <h1 className="text-2xl">{name}</h1>
        <p>
          {" "}
          <FontAwesomeIcon icon={faMoneyBill1} /> {price}
        </p>
        {duration ? (
          <p className="text-sm text-gray-500">
            {" "}
            <FontAwesomeIcon icon={faClock} /> Duration: {duration} minutes
          </p>
        ) : (
          <p className="text-sm text-gray-500">Duration: Not specified</p>
        )}
      </div>
      <div>
        <Button full={true}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button full={true}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </div>
    </div>
  );
};
export default Services;
