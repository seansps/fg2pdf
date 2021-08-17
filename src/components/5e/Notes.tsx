import React from "react";
import CharacterHeader from "./CharacterHeader";
import Page from "../Page";

interface NotesProps {
  character: any;
}

const MAX_NOTES_LINES = 33;
export const MAX_CHAR_PER_LINE = 95;

export const getLinesFromString = (str: string, max: number): string[] => {
  let lines:string[] = [];

  let curIndex = 0;

  if (str.length > max) {
    let remaining = str;
    while (remaining.length > max) {
      let curLine = str.substring(curIndex, max+curIndex);
      // Break at last space
      let splitIndex = curLine.lastIndexOf(' ');
      curLine = curLine.substring(0, splitIndex);
      curIndex += curLine.length;
      lines.push(curLine);
      // Push remainin if shorter than max
      remaining = str.substring(curIndex, str.length);
      if (remaining.length <= max) {
        lines.push(remaining);
      }
    }
  }
  else {
    lines.push(str);
  }

  return lines;
}

export const Notes = ({character}: NotesProps) => {
  const deity = character.deity;
  const personalityTraits = character.personalitytraits;
  const ideals = character.ideals;
  const bonds = character.bonds;
  const flaws = character.flaws;
  const appearance = character.appearance;

  const allFeatures: string[] = [];

  const {
    gender,
    age,
    height,
    weight,
    size,
    notes: backstory,
  } = character;

  // Add feats
  allFeatures.push('TITLE:Deity')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  if (deity && deity.length > 0 && deity[0]._) {
    const deityStr = deity[0]._;
    allFeatures.push(deityStr);
  }
  else {
    allFeatures.push('None');
  }

  // Add features
  allFeatures.push('TITLE:Personality Traits')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  if (personalityTraits && personalityTraits.length > 0) {
    const personalityTraitsStr: string = personalityTraits[0]._;
    const traitLines = personalityTraitsStr.split('\\n');
    traitLines.forEach((line) => {
      // Also split by character count
      const moreLines = getLinesFromString(line, MAX_CHAR_PER_LINE);
      moreLines.forEach(nextLine => {
        allFeatures.push(nextLine);
      })
    })
  }
  else {
    allFeatures.push('None');
  }

  // Add ideals
  allFeatures.push('TITLE:Ideals')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  if (ideals && ideals.length > 0) {
    const idealsStr: string = ideals[0]._;
    const idealLines = idealsStr.split('\\n');
    idealLines.forEach((line) => {
      // Also split by character count
      const moreLines = getLinesFromString(line, MAX_CHAR_PER_LINE);
      moreLines.forEach(nextLine => {
        allFeatures.push(nextLine);
      })
    })
  }
  else {
    allFeatures.push('None');
  }

  // Add bonds
  allFeatures.push('TITLE:Bonds')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  if (bonds && bonds.length > 0) {
    const bondsStr: string = bonds[0]._;
    const bondsLines = bondsStr.split('\\n');
    bondsLines.forEach((line) => {
      // Also split by character count
      const moreLines = getLinesFromString(line, MAX_CHAR_PER_LINE);
      moreLines.forEach(nextLine => {
        allFeatures.push(nextLine);
      })
    })
  }
  else {
    allFeatures.push('None');
  }

  // Add flaws
  allFeatures.push('TITLE:Flaws')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  if (flaws && flaws.length > 0) {
    const flawsStr: string = flaws[0]._;
    const flawsLines = flawsStr.split('\\n');
    flawsLines.forEach((line) => {
      // Also split by character count
      const moreLines = getLinesFromString(line, MAX_CHAR_PER_LINE);
      moreLines.forEach(nextLine => {
        allFeatures.push(nextLine);
      })
    })
  }
  else {
    allFeatures.push('None');
  }
  
  // Add appearance
  allFeatures.push('TITLE:Appearance')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  if (appearance && appearance.length > 0) {
    const appearanceStr: string = appearance[0]._;
    const appearanceLines = appearanceStr.split('\\n');
    appearanceLines.forEach((line) => {
      // Also split by character count
      const moreLines = getLinesFromString(line, MAX_CHAR_PER_LINE);
      moreLines.forEach(nextLine => {
        allFeatures.push(nextLine);
      })
    })
  }
  else {
    allFeatures.push('None');
  }

  // Add backstory
  allFeatures.push('TITLE:Backstory')
  allFeatures.push('TITLE:NORENDER')
  allFeatures.push('TITLE:NORENDER')
  if (backstory && backstory.length > 0) {
    const backstoryStr: string = backstory[0]._;
    const backStoryLines = backstoryStr.split('\\n');
    backStoryLines.forEach((line) => {
      // Also split by character count
      const moreLines = getLinesFromString(line, MAX_CHAR_PER_LINE);
      moreLines.forEach(nextLine => {
        allFeatures.push(nextLine);
      })
    })
  }
  else {
    allFeatures.push('None');
  }
  
  const pages: string[][] = [];
  // Chunk into pages
  for (let i=0; i < allFeatures.length; i += MAX_NOTES_LINES) {
      const tempArray = allFeatures.slice(i, i + MAX_NOTES_LINES);
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
          if (i !== 0 && line && line.indexOf('TITLE') === 0 && line.indexOf('NORENDER') === -1) {
            // New group
            groups.push([]);
            curIndex += 1;
          }
          groups[curIndex].push(line);
        }

        return (
          <Page key={`features-${index}`}>
            <div className = 'characterContainer'>
              <CharacterHeader character={character} />

              {index === 0 && (
                <div className='listSection'>
                <div className='listLabel'>
                  Details
                </div>
                <div className='detailsRow'>
                  <div className='detailsLabel'>
                    Gender
                  </div>
                  <div className='detailsValue'>
                    {gender && gender.length && (
                      gender[0]._
                    )}
                  </div>
                  <div className='detailsLabel'>
                    Age
                  </div>
                  <div className='detailsValue'>
                    {age && age.length && (
                      age[0]._
                    )}
                  </div>
                  <div className='detailsLabel'>
                    Height
                  </div>
                  <div className='detailsValue'>
                    {height && height.length && (
                      height[0]._
                    )}
                  </div>
                  <div className='detailsLabel'>
                    Weight
                  </div>
                  <div className='detailsValue'>
                    {weight && weight.length && (
                      weight[0]._
                    )}
                  </div>
                  <div className='detailsLabel'>
                    Size
                  </div>
                  <div className='detailsValue'>
                    {size && size.length && (
                      size[0]._
                    )}
                  </div>
                </div>
              </div>
              )}

              {groups.map((group, gindex) => {
                return (
                  <div className='listSection' key={`group-${gindex}`}>
                    {
                      group.map((string,sindex) => {
                        const isHeader = string && string.indexOf('TITLE:') === 0;
                        if (isHeader) {
                          if (string.indexOf('NORENDER') === -1) {
                            return (
                              <div className='listLabel' key={`string-${gindex}${sindex}`}>
                                {string.split('TITLE:')[1]}
                              </div>
                            )
                          }
                          else {
                            return null;
                          }
                        }
                        else {
                          return (
                            <div className={string && string.length > 0 ? 'listLine' 
                              : 'listLineEmpty'} key={`string-${gindex}${sindex}`}>
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

export default Notes;