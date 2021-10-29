import { useQuery } from "@apollo/client";
import { GET_CARS_PERSON, GET_PERSON_CARS, PERSON_WITH_ID } from "../../queries";
import CarCard from "../cards/CarCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useHistory} from 'react-router-dom'
const ShowMore = ({ props }) => {
  const history=useHistory()
  const id = props.match.params.id;
 const { loading, error, data } = useQuery(GET_CARS_PERSON,{variables:{id}});
  if (loading) return "Working hard to get you the results";
  if((data.carsperson.car).length===0) return <div>No cars found for the user.</div>
  if (error) return `Error! ${error.message}`;
  return (
    <>
    <div className="top"><ArrowBackIosIcon onClick={()=>{history.push('/')}}/></div>
    <div className="ShowMore" style={{ padding: "1rem", margin: "1rem" }}>
      <div className="info">
        <h2 style={{maxWidth:'80%',margin:'auto',paddingBottom:'1rem'}}>
          Welcome{" "}
          {data.carsperson.person.firstName + " " + data.carsperson.person.lastName}
        </h2>
      </div>
      <div className="showcars">
        <CarCard cars={data.carsperson[0]} />
      </div> 
       </div>
    </>
  );
};

export default ShowMore;
