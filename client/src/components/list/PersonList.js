import { Divider} from "@mui/material";
import ListItems from "./ListItems";
const PersonList = ({ data }) => {
  return (
    <>
      {data.people.map((d) => {
        return (
          <>
            <ListItems item={d.firstName} last={false} key={d.id+d.firstName} id={d.id}/>
            <ListItems item={d.lastName} last={true} key={d.id+d.lastName} id={d.id}/>
            <Divider />
          </>
        );
      })}
    </>
  );
};
export default PersonList;
