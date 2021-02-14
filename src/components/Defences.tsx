import React from "react";
import shield from "../images/shield.svg";

interface DefensesProps {
    defenses: any;
    hp: any;
    initiative: any;
    speed: any;
}

export const Defenses = ({ 
  defenses, 
  hp,
  initiative,
  speed
}: DefensesProps) => {

  return (
    <div className='defences'>
      <div className='row'>
        <img className='acImage' src={shield} alt='ac'></img>
        <div className='acContainer'>
          <div className='acValue'>17</div>
          <div className='statLabel'>AC</div>
        </div>
      </div>
    </div>
  )
}

export default Defenses;