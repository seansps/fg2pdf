import React from "react";
import CharacterHeader from "./CharacterHeader";
import { getLinesFromString, MAX_CHAR_PER_LINE } from './Notes';
import Page from '../Page';

interface AdventureLogProps {
  character: any;
}

const MAX_LOG_LINES = 24;

export const AdventureLog = ({character}: AdventureLogProps) => {
  
  const {
    adventurelist: logList,
    faction
  } = character;

  const allFeatures: string[] = [];

  // Add faction
  if (faction && faction.length > 0) {
    allFeatures.push('TITLE:Faction')
    if (faction && faction.length) {
      allFeatures.push(faction[0]._);
    }
    else {
      allFeatures.push('None');
    }
  }

  // Add log
  if (logList && logList.length > 0) {
    const logs = logList[0];
    const keys = Object.keys(logs);
    let amount = 0;
    allFeatures.push('TITLE:Adventure Log')
    keys.forEach(key => {
      const feature = logs[key][0];
      amount +=1;
      if (feature.name && feature.name.length) {
        const name: string = feature.name[0]._;
        const featureLines = name.split('\\n');
        featureLines.forEach((line) => {
          // Also split by character count
          const moreLines = getLinesFromString(line, MAX_CHAR_PER_LINE);
          moreLines.forEach(nextLine => {
            allFeatures.push(nextLine);
        })
    })
      }
    })
    if (amount === 0) {
      allFeatures.push('None');
    }
  }

  const pages: string[][] = [];
  // Chunk into pages
  for (let i=0; i < allFeatures.length; i += MAX_LOG_LINES) {
      const tempArray = allFeatures.slice(i, i + MAX_LOG_LINES);
      pages.push(tempArray);
  }

  return (
    <>
      {pages.map((page, index) => {

        // Split page out into groups.
        if (page[0].indexOf('TITLE') !== 0) {
          page.unshift('TITLE:(Continued)')
        }

        const groups: string[][] = [[]];
        let curIndex = 0;
        // Split into groups
        for (let i=0; i < page.length; i += 1) {
          const line = page[i];
          if (i !== 0 && line.indexOf('TITLE') === 0) {
            // New group
            groups.push([]);
            curIndex += 1;
          }
          groups[curIndex].push(line);
        }

        return (
          <Page key={`logs-${index}`}>
            <div className = 'characterContainer'>
              <CharacterHeader character={character} />
              {groups.map((group, gindex) => {
                return (
                  <div className='listSection' key={`logsgroup-${gindex}`}>
                    {
                      group.map((string,sindex) => {
                        const isHeader = string.indexOf('TITLE:') === 0;
                        if (isHeader) {
                          return (
                            <div className='listLabel' key={`logsstring-${gindex}${sindex}`}>
                              {string.split('TITLE:')[1]}
                            </div>
                          )
                        }
                        else {
                          return (
                            <div className='listLine' key={`logsstring-${gindex}${sindex}`}>
                              {string}
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                )
              })}
            </div>
          </Page>
        )
      })}
    </>
  )
}

export default AdventureLog;