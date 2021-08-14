import React from "react";
import Page from '../../../Page';
import CharacterHeader from '../../CharacterHeader';
import Attributes from './Attibutes';

interface CharacterSheetProps {
  character: any;
}

const Main = ({character}: CharacterSheetProps) => {
  return (
    <Page>
      <div className='characterContainer'>
        <CharacterHeader character={character} />
        <Attributes character={character} />
      </div>
    </Page>
  )
}

export default Main