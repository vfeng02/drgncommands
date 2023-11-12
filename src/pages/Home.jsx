import React from 'react';
import CommandsList from "../components/CommandsList";
import Loading from "../components/Loading";
import useFetch from "../useFetch";

const Home = () => {
  const { error, isPending, data: commands } = useFetch('http://localhost:8000/commands')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <Loading />}
      { commands && <CommandsList commands={commands} /> }
    </div>
  );
}
 
export default Home;