import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import CarList from "../list/CarList";
import List from "@mui/material/List";

function CarCard({cars}) {
  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading....";
  if (error) return "Error has occured in the application";

  return (
    <Card sx={{ maxWidth: '80%',margin:'0 auto 1rem auto' }} style={{height:'80%'}}>
      <CardContent>
        <List component="nav">
          <CarList data={cars?cars:data} />
        </List>
      </CardContent>
    </Card>
  );
}

export default CarCard;
