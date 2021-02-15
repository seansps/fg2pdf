import React from "react";

interface SensesProps {
  passivePerception: any;
  senses: any;
  wisdomBonus: number;
}

export const Senses = ({
    passivePerception,
    senses,
    wisdomBonus
}: SensesProps) => {

  const perception = passivePerception ? 
    passivePerception[0]._ : (10 + wisdomBonus);

  let sensesStr = '';
  if (senses && senses.length) {
    senses.forEach((sense: any) => {
      sensesStr = `${sensesStr}${sense._}\n`;
    });
  }

  return (
    <div className='senses'>
      <div className='sensesLabel'>
        Senses
      </div>
      <div className='passivePerception'>
        {perception}
        <div className='statLabel'>
          Passive Perception
        </div>
      </div>
      <p className='sensesList'>
        {sensesStr}
      </p>
      <div className='statLabel'>
        Other
      </div>
    </div>
  )
}

export default Senses;