import ListItem from "@mui/material/ListItem";
import { IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Edit, Delete, ExpandMoreRounded } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import CarCard from "../cards/CarCard";
import { GET_PERSON_CARS } from "../../queries";
import { useQuery } from "@apollo/client";
import { InputLabel,Input,InputAdornment } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const ListItems = ({ item, last,id }) => {
  const [expanded, setExpanded] = useState(false);
  const [editable,seteditable]=useState(false)
  const [deletable,setDeletable]=useState(false)
  
  const {loading,error,data}=useQuery(GET_PERSON_CARS,{variables:{id},skip:!expanded})
  const dataa={}
  if(data!==undefined||null&!loading){
  dataa['car']=data.personCars
  }
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const handleExpandClick = (d) => {
    setExpanded(!expanded);
  };
  return (
    <>
      <ListItem key={item}>

{/* Toggle edit text */}
{!editable?
        <ListItemText primary={item}/>:
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">{item}</InputLabel>
          <Input
            id="standard-adornment-password"
            type={'text'}
            value={item}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>{console.log("saved")}}
                >
                  <SaveAltIcon/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
}
        {/* Toggle edit text */}
        <IconButton>
          <Edit onClick={()=>{seteditable(e=>!e)}}/>
        </IconButton>

        <IconButton>
          <Delete onClick={()=>{console.log(item)}}/>
        </IconButton>




      </ListItem>
      {last && (
        <>
          <ExpandMore
            expand={expanded}
            onClick={() => handleExpandClick()}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreRounded />
          </ExpandMore>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>{/* Add car cards here */}
           {
             (data!==undefined||null&!loading&dataa)?<CarCard cars={dataa}/>:""
           }
            </CardContent>
          </Collapse>
        </>
      )}
    </>
  );
};

export default ListItems;
