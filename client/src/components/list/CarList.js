import { Divider} from "@mui/material";
import ListItems from "./ListItems";
const CarList = ({ data }) => {
  console.log(data)
  return (
    <>
      {data.car.map((d) => {
        return (
          <>
            <ListItems item={d.year} last={false} key={d.year}/>
            <ListItems item={d.make} last={false} key={d.make}/>
            <ListItems item={d.model} last={false} key={d.model}/>
            <ListItems item={d.price} last={false} key={d.price}/>
            <ListItems item={d.personId} last={false} key={d.personId}/>
            <Divider />
          </>
        );
      })}
    </>
  );
};

export default CarList;
