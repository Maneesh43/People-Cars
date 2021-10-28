import { useQuery } from "@apollo/client";
import { GET_PERSON_CARS, PERSON_WITH_ID } from "../../queries";
import CarCard from "../cards/CarCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useHistory} from 'react-router-dom'
const ShowMore = ({ props }) => {
  const history=useHistory()
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_PERSON_CARS, {
    variables: { id },
  });
  const person = useQuery(PERSON_WITH_ID, { variables: { id } });
  const dataa = {};
  if (data !== undefined || null & !loading) {
    dataa["car"] = data.personCars;
  }
  if (loading || person.loading) return "Working hard to get you the results";
  if (dataa.car.length <= 1)
    return "This is unexpected!!! Person might not exist or He doesn't own any cars "
  return (
    <>
    <div className="top"><ArrowBackIosIcon onClick={()=>{history.push('/')}}/></div>
    <div className="ShowMore" style={{ padding: "1rem", margin: "1rem" }}>
      <div className="info">
        <h2 style={{maxWidth:'80%',margin:'auto',paddingBottom:'1rem'}}>
          Welcome{" "}
          {person.data.person.firstName + " " + person.data.person.lastName}
        </h2>
      </div>
      <div className="showcars">
        <CarCard cars={dataa} />
      </div>
    </div>
    </>
  );
};

export default ShowMore;
