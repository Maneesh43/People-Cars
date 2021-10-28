import { Divider } from "@mui/material";
import ListItems from "./ListItems";
const CarList = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.car.map((d) => {
        return (
          <>
            <ListItems item={d.year} last={false} key={d.year} dat={d} type={"year"}/>
            <ListItems item={d.make} last={false} key={d.make} dat={d} type={"make"}/>
            <ListItems item={d.model} last={false} key={d.model} dat={d} type={"model"}/>
            <ListItems item={d.price} last={false} key={d.price} dat={d} type={"price"}/>
            <ListItems item={d.personId} last={false} key={d.personId} dat={d} type={"personId"}/>
            <Divider />
          </>
        );
      })}
    </>
  );
};

export default CarList;
