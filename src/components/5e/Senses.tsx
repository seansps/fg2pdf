import React from "react";

interface SensesProps {
  passivePerception: any;
  senses: any;
  perceptionBonus: number;
}

export const Senses = ({
    passivePerception,
    senses,
    perceptionBonus
}: SensesProps) => {

  const perception = passivePerception ? 
    passivePerception[0]._ : (10 + perceptionBonus);

  const sensesStr: string[] = [];
  if (senses && senses.length) {
    senses.forEach((sense: any) => {
      sensesStr.push(`${sensesStr}${sense._}`);
    });
  }

  sensesStr.push('Passive Perception ' + perception);

  return (
    <div className='listSection'>
      <div className='listLabel'>
        Senses
      </div>
      <div className='sensesList'>
        {sensesStr.map((sense, index) => {
          return (
            <div className='sense' key={`sense${index}`}>{sense}</div>
          )
        })}
      </div>
    </div>
  )
}

export default Senses;