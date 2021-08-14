import React from "react";
import CharacterHeader from "../CharacterHeader";
import Page from "../../Page";

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

const MAX_ITEMS = 32;

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

  // If there are 24 items or less on last page, add it there, else new page
  if (pages[pages.length - 1].length <= 24) {
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
                      <div className='inventoryHeaderWeight hidden'>
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
                            <div className='inventoryWeight hidden'>
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