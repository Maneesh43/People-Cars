import { Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ListItems from "./ListItems";
import { Delete } from "@mui/icons-material";
const PersonList = ({ data }) => {
  return (
    <>
      {data.people.map((d) => {
        return (
          <>
            <ListItems
              item={d.firstName}
              last={false}
              key={d.id + d.firstName}
              id={d.id}
              dat={d}
              type="firstName"
            />
            <ListItems
              item={d.lastName}
              last={true}
              key={d.id + d.lastName}
              id={d.id}
              dat={d}
              type="lastName"
            />
            <div className="links">
            <Link to={`/person/${d.id}`}>Learn more</Link>
       <IconButton>
       <Delete
         onClick={() => {
           console.log("Hello");
         }}
       />
       </IconButton>
            </div>
           
    
            <Divider />
          </>
        );
      })}
    </>
  );
};
export default PersonList;
