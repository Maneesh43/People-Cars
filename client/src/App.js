import "./App.css";
import Carform from "./components/forms/forms/Carform";
import Personform from "./components/forms/forms/Personform";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import PersonCard from "./components/cards/PersonCard";
import CarCard from "./components/cards/CarCard";


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App" style={{
        display:'flex',
        gap:'.5rem'
      }}>
        <div className='forms'>
          <Carform />
          <Personform /></div>
          <div className="cards">
          <PersonCard/>
          <CarCard/>
          </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
