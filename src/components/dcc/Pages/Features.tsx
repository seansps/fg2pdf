import React from "react";
import CharacterHeader from "../CharacterHeader";
import Page from '../../Page';

interface FeaturesProps {
  character: any;
}

const MAX_FEATURE_LINES = 24;

export const Features = ({character}: FeaturesProps) => {

  const featureList = character.featurelist;
  const allFeatures: string[] = [];

  // Add features
  if (featureList && featureList.length > 0) {
    const features = featureList[0];
    const keys = Object.keys(features);
    let amount = 0;
    allFeatures.push('TITLE:Features')
    keys.forEach(key => {
      const feature = features[key][0];
      if (feature.name && feature.name.length) {
        allFeatures.push(`${feature.name[0]._}`)
        amount += 1;
      }
    })
    if (amount === 0) {
      allFeatures.push('None');
    }
  }

  const pages: string[][] = [];
  // Chunk into pages
  for (let i=0; i < allFeatures.length; i += MAX_FEATURE_LINES) {
      const tempArray = allFeatures.slice(i, i + MAX_FEATURE_LINES);
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
          <Page key={`features-${index}`}>
            <div className = 'characterContainer'>
              <CharacterHeader character={character} />
              {groups.map((group, gindex) => {
                return (
                  <div className='listSection' key={`group-${gindex}`}>
                    {
                      group.map((string,sindex) => {
                        const isHeader = string.indexOf('TITLE:') === 0;
                        if (isHeader) {
                          return (
                            <div className='listLabel' key={`string-${gindex}${sindex}`}>
                              {string.split('TITLE:')[1]}
                            </div>
                          )
                        }
                        else {
                          return (
                            <div className='listLine' key={`string-${gindex}${sindex}`}>
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

export default Features;