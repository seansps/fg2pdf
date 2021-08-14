import React from "react";
import CharacterHeader from "./CharacterHeader";
import Page from '../Page';

interface FeaturesProps {
  character: any;
}

const MAX_FEATURE_LINES = 30;

export const Features = ({character}: FeaturesProps) => {

  const featList = character.featlist;
  const featureList = character.featurelist;
  const traitList = character.traitlist;
  const proficiencyList = character.proficiencylist;
  const languageList = character.languagelist;

  const allFeatures: string[] = [];

  // Add feats
  if (featList && featList.length > 0) {
    const feats = featList[0];
    const keys = Object.keys(feats);
    let amount = 0;
    allFeatures.push('TITLE:Feats')
    keys.forEach(key => {
      const feat = feats[key][0];
      if (feat.name && feat.name.length) {
        allFeatures.push(`${feat.name[0]._}`)
        amount += 1;
      }
    })
    if (amount === 0) {
      allFeatures.push('None');
    }
  }

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

  // Add traits
  if (traitList && traitList.length > 0) {
    const traits = traitList[0];
    const keys = Object.keys(traits);
    let amount = 0;
    allFeatures.push('TITLE:Traits')
    keys.forEach(key => {
      const trait = traits[key][0];
      if (trait.name && trait.name.length) {
        allFeatures.push(`${trait.name[0]._}`)
        amount++
      }
    })
    if (amount === 0) {
      allFeatures.push('None');
    }
  }

  // Add proficiencies
  if (proficiencyList && proficiencyList.length > 0) {
    const profs = proficiencyList[0];
    const keys = Object.keys(profs);
    let amount = 0;
    allFeatures.push('TITLE:Proficiencies')
    keys.forEach(key => {
      const prof = profs[key][0];
      if (prof.name && prof.name.length) {
        allFeatures.push(`${prof.name[0]._}`)
        amount += 1;
      }
      if (amount === 0) {
        allFeatures.push('None');
      }
    })
  }

  // Add languages
  if (languageList && languageList.length > 0) {
    const langs = languageList[0];
    const keys = Object.keys(langs);
    let amount = 0;
    allFeatures.push('TITLE:Languages')
    keys.forEach(key => {
      const lang = langs[key][0];
      if (lang.name && lang.name.length) {
        allFeatures.push(`${lang.name[0]._}`)
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