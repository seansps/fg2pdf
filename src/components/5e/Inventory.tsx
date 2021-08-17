import React from "react";
import CharacterHeader from "./CharacterHeader";
import Page from "../Page";

interface CharacterProps {
  character: any;
}

interface InventoryItem {
  name: string;
  weight: string;
  count: string;
  location: string;
  equipped: boolean;
}

const MAX_ITEMS = 27;

const getMaxEncumberance = (character: any): number => {
  const factor = 15;

  // Goliath's are doubled
  const isGoliath = character.race[0]._.toLowerCase() === 'goliath';

  // Strenght score * 15
  const strenghthScore = parseInt(character.abilities[0].strength[0].score[0]._, 10);

  return isGoliath ? 2 * strenghthScore * factor : strenghthScore * factor;
}

const getMaxLiftPushDrag = (character: any): number => {
  return getMaxEncumberance(character) * 2;
}

const getCurrentEncumberance = (inventory: InventoryItem[]): string => {
  let totalWeight = 0;

  // Total up all items weight with count
  inventory.forEach(item => {
    totalWeight += parseFloat(item.weight) * parseInt(item.count, 10);
  })

  return totalWeight.toFixed(2);
}

export const Inventory = ({character}: CharacterProps) => {

  const inventoryList = character.inventorylist;
  const inventory:InventoryItem[] =[];
  
  // Go through inventory and make a list of items
  if (inventoryList && inventoryList.length) {
    const allItems = inventoryList[0];
    const keys = Object.keys(allItems);
    keys.forEach(key => {
      const item = allItems[key][0];
      const name = item.name ? item.name[0]._ : 'Unknown';
      const weight = item.weight ? item.weight[0]._ : '';
      const count = item.count ? item.count[0]._ : '';
      const location = item.location ? item.location[0]._ : '';
      const equipped = item.carried ? item.carried[0]._ === '2' : false;

      inventory.push({
        name,
        weight,
        count,
        location,
        equipped
      })
    });
  }

  // Sort by Location then Name
  inventory.sort((i1, i2) => {
    if (i1.location < i2.location) {
      return -1;
    }
    else if (i1.location > i2.location) {
      return 1;
    }
    else {
      // Sort name
      if (i1.name < i2.name) {
        return -1;
      }
      else if (i1.name > i2.name) {
        return 1;
      }
      return 0;
    }
  });

  const pages: InventoryItem[][] = [];
  // Chunk into pages
  for (let i=0; i < inventory.length; i += MAX_ITEMS) {
      const tempArray = inventory.slice(i, i + MAX_ITEMS);
      pages.push(tempArray);
  }

  // Add a custom element to render treasure and encumberance
  const treasureAndEncumberance: InventoryItem = {
    name: 'treasureAndEncumberance',
    weight: '0',
    count: '0',
    location: '',
    equipped: false
  }

  // If there are 20 items or less on last page, add it there, else new page
  if (pages[pages.length - 1].length <= 20) {
    pages[pages.length - 1].push(treasureAndEncumberance);
  } 
  else {
    pages.push([treasureAndEncumberance]);
  }

  const coins = character.coins;
  const slot1Name = coins && coins.length 
    && coins[0].slot1 && coins[0].slot1[0].name ? coins[0].slot1[0].name[0]._ : '';
  const slot1Amount = coins && coins.length 
    && coins[0].slot1 && coins[0].slot1[0].amount ? coins[0].slot1[0].amount[0]._ : '';
  const slot2Name = coins && coins.length 
    && coins[0].slot2 && coins[0].slot2[0].name ? coins[0].slot2[0].name[0]._ : '';
  const slot2Amount = coins && coins.length 
    && coins[0].slot2 && coins[0].slot2[0].amount ? coins[0].slot2[0].amount[0]._ : '';
  const slot3Name = coins && coins.length 
    && coins[0].slot3 && coins[0].slot3[0].name ? coins[0].slot3[0].name[0]._ : '';
  const slot3Amount = coins && coins.length 
    && coins[0].slot3 && coins[0].slot3[0].amount ?  coins[0].slot3[0].amount[0]._ : '';
  const slot4Name = coins && coins.length 
    && coins[0].slot4 && coins[0].slot4[0].name ? coins[0].slot4[0].name[0]._ : '';
  const slot4Amount = coins && coins.length 
    && coins[0].slot4 && coins[0].slot4[0].amount ? coins[0].slot4[0].amount[0]._ : '';
  const slot5Name = coins && coins.length 
    && coins[0].slot5 && coins[0].slot5[0].name ? coins[0].slot5[0].name[0]._ : '';
  const slot5Amount = coins && coins.length 
    && coins[0].slot5 && coins[0].slot5[0].amount ?  coins[0].slot5[0].amount[0]._ : '';
  const slot6Name = coins && coins.length 
    && coins[0].slot6 && coins[0].slot6[0].name ? coins[0].slot6[0].name[0]._ : '';
  const slot6Amount = coins && coins.length 
    && coins[0].slot6 && coins[0].slot6[0].amount ? coins[0].slot6[0].amount[0]._ : '';

  const maxEncumberance = getMaxEncumberance(character);
  const maxLift = getMaxLiftPushDrag(character);
  const currentEnc = getCurrentEncumberance(inventory);

  return (
    <>
      {pages.map((page,index) => {
        return (
          <Page key={`inventory-${index}`}>
            <div className='characterContainer'>
              <CharacterHeader character={character}/>
              {page[0].name !== 'treasureAndEncumberance' && (
                <div className='listSection'>
                  <div className='listLabel'>Inventory</div>
                    <div className='inventoryHeader'>
                      <div className='inventoryHeaderCount'>
                        Count
                      </div>
                      <div className='inventoryHeaderName'>
                        Name
                      </div>
                      <div className='inventoryHeaderLocation'>
                        Location
                      </div>
                      <div className='inventoryHeaderWeight'>
                        Weight
                      </div>
                      <div className='inventoryIsEquipped'>
                        Worn?
                      </div>
                    </div>
                    {page.map((inventoryItem, index) => {
                      if (inventoryItem.name !== 'treasureAndEncumberance') {
                        return (
                          <div className='inventoryItem' 
                            key={`inventory-${index}-item-${index}`}>
                            <div className='inventoryCount'>
                              {inventoryItem.count}
                            </div>
                            <div className='inventoryName'>
                              {inventoryItem.name}
                            </div>
                            <div className='inventoryLocation'>
                              {inventoryItem.location}
                            </div>
                            <div className='inventoryWeight'>
                              {inventoryItem.weight}
                            </div>
                            {inventoryItem.equipped && 
                              <div className='inventoryEqipped' />}
                            {!inventoryItem.equipped && 
                              <div className='inventoryNotEqipped' />}
                          </div>
                        )
                      }
                      return null;
                    })}
                </div>
              )}

              {index === pages.length - 1 && (
                <>
                  <div className='listSection' key='treasure'>
                    <div className='listLabel'>Treasure</div>
                    <div className='treasureRow'>
                      <div className='treasureLabel'>
                        {slot1Name}
                      </div>
                      <div className={slot1Amount && slot1Amount !== '0' ? 'treasureAmount' : 'treasureEmpty'}>
                        {slot1Amount !== '0' && slot1Amount}
                      </div>
                      <div className='treasureLabel'>
                        {slot2Name}
                      </div>
                      <div className={slot2Amount && slot2Amount !== '0' ? 'treasureAmount' : 'treasureEmpty'}>
                        {slot2Amount !== '0' && slot2Amount}
                      </div>
                      <div className='treasureLabel'>
                        {slot3Name}
                      </div>
                      <div className={slot3Amount && slot3Amount !== '0' ? 'treasureAmount' : 'treasureEmpty'}>
                        {slot3Amount !== '0' && slot3Amount}
                      </div>
                    </div>
                    <div className='treasureRow'>
                      <div className='treasureLabel'>
                        {slot4Name}
                      </div>
                      <div className={slot4Amount && slot4Amount !== '0' ? 'treasureAmount' : 'treasureEmpty'}>
                        {slot4Amount !== '0' && slot4Amount}
                      </div>
                      <div className='treasureLabel'>
                        {slot5Name}
                      </div>
                      <div className={slot5Amount && slot5Amount !== '0' ? 'treasureAmount' : 'treasureEmpty'}>
                        {slot5Amount !== '0' && slot5Amount}
                      </div>
                      <div className='treasureLabel'>
                        {slot6Name}
                      </div>
                      <div className={slot6Amount && slot6Amount !== '0' ? 'treasureAmount' : 'treasureEmpty'}>
                        {slot6Amount !== '0' && slot6Amount}
                      </div>
                    </div>
                  </div>     

                  <div className='listSection' key='encumberance'>
                    <div className='listLabel'>Encumberance</div>
                    <div className='encRow'>
                      <div className='encLabel'>
                        Maximum
                      </div>
                      <div className='encAmount'>
                        {maxEncumberance}
                      </div>
                      <div className='encLabel'>
                        Lift, Push, Drag
                      </div>
                      <div className='encAmount'>
                        {maxLift}
                      </div>
                      <div className='encLabel'>
                        Current
                      </div>
                      <div className='encAmount'>
                        {currentEnc}
                      </div>
                    </div>
                  </div>
                </>
              )}        
            </div>
          </Page>
        )
      })}
    </>
  )
}

export default Inventory;