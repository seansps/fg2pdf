import React from "react";
import { PDFDocument, PDFTextField, StandardFonts } from 'pdf-lib';
import { FontNames } from '@pdf-lib/standard-fonts';

import download from 'downloadjs';

import { getValue } from "../../utils/getValue";

type CharacterSheetParam = {
  root: {
    character: any;
  };
}

const CYBERPUNK_RED_CHARSHEET = "pdf/CyberpunkRed.pdf";

const fillForm = (characterData: CharacterSheetParam) => {
  const character = characterData.root.character[0];

  // Determine if Legacy or Official by checking gearFilter, only exists on Official 
  let gearFilter = getValue(character.gearFilter);

  if (gearFilter === "") {
    fillFormUnofficial(characterData);
  }
  else {
    fillFormOfficial(characterData);
  }
}

const fillFormOfficial =  async (characterData: CharacterSheetParam) => {
  const character = characterData.root.character[0];

  const existingPdfBytes = await fetch(CYBERPUNK_RED_CHARSHEET).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const form = pdfDoc.getForm();

  await pdfDoc.embedStandardFont(StandardFonts.TimesRoman);

  
  // Main Fields
  const nameField = form.getTextField('Handle');
  const roleField = form.getTextField('Role');
  const roleAbilityField = form.getTextField('Role Ability');
  const roleAbilityRankField = form.getTextField('Role Ability Rank');
  const notesField = form.getTextField('Notes');

  // STATs
  const intField = form.getTextField('INT');
  const refField = form.getTextField('REF');
  const dexField = form.getTextField('DEX');
  const techField = form.getTextField('TECH');
  const coolField = form.getTextField('COOL');
  const willField = form.getTextField('WILL');
  const luckCurrentField = form.getTextField('LUCK CURRENT');
  const luckMaxField = form.getTextField('LUCK MAX');
  const moveField = form.getTextField('MOVE');
  const bodyField = form.getTextField('BODY');
  const empCurrentField = form.getTextField('EMP');
  const empMaxField = form.getTextField('EMP MAX');

  // Health
  const humanityCurrentField = form.getTextField('Current Humanity');
  const humanityMaxField = form.getTextField('Max Humanity');
  const hpField = form.getTextField('Current HP');
  const hpMaxField = form.getTextField('Max HP');
  const seriouslyWoundedField = form.getTextField('Seriously Wounded Threshhold')
  const deathSaveField = form.getTextField('Death Save')
  const critInjuryField = form.getTextField('Critical Injuries');
  const addictionsField = form.getTextField('ADDICTIONS');

  // Awareness
  const concentrationField = form.getTextField('Concentration Level');
  const concentrationTotalField = form.getTextField('Concentration Total');
  const concealField = form.getTextField('Conceal/Reveal LVL');
  const concealTotalField = form.getTextField('Conceal/Reveal Total');
  const lipReadingField = form.getTextField('LVLLip Reading INT');
  const lipReadingTotalField = form.getTextField('Lip Reading Total');
  const perceptionField = form.getTextField('LVLPerception INT');
  const perceptionTotalField = form.getTextField('Perception Total');
  const trackingField = form.getTextField('LVLTracking INT');
  const trackingTotalField = form.getTextField('Tracking Total');

  // Body
  const athleticsField = form.getTextField('LVLAthletics DEX');
  const athleticsTotalField = form.getTextField('Athletics Total');
  const contortionistField = form.getTextField('LVLContortionist DEX');
  const contortionistTotalField = form.getTextField('Contortionist Total');
  const danceField = form.getTextField('LVLDance DEX');
  const danceTotalField = form.getTextField('Dance Total');
  const enduranceField = form.getTextField('LVLEndurance WILL');
  const enduranceTotalField = form.getTextField('Endurance Total');
  const resistTortureField = form.getTextField('LVLResist TortureDrugs WILL');
  const resistTortureTotalField = form.getTextField('Resist Total');
  const stealthField = form.getTextField('LVLStealth DEX');
  const stealthTotalField = form.getTextField('Stealth Total');

  // Control
  const driveLandField = form.getTextField('LVLDrive Land Vehicle REF');
  const driveLandTotalField = form.getTextField('Drive Land Total');
  const pilotAirField = form.getTextField('LVLPilor Air Vehicle x2 REF');
  const pilotAirTotalField = form.getTextField('Pilot Air Total');
  const pilotSeaField = form.getTextField('LVLPilot Sea Vehicle REF');
  const pilotSeaTotalField = form.getTextField('Pilot Sea Total');
  const ridingField = form.getTextField('LVLRiding REF');
  const ridingTotalField = form.getTextField('Riding Total');

  // Education
  const accountingField = form.getTextField('LVLAccounting INT');
  const accountingTotalField = form.getTextField('Accounting Total');
  const animalHandlingField = form.getTextField('LVLAnimal Handling INT');
  const animalHandlingTotalField = form.getTextField('Animal Handling Total');
  const bureaucracyField = form.getTextField('LVLBureaucracy INT');
  const bureaucracyTotalField = form.getTextField('Bureaucracy Total');
  const businessField = form.getTextField('LVLBusiness INT');
  const businessTotalField = form.getTextField('Business Total');
  const compositionField = form.getTextField('LVLComposition INT');
  const compositionTotalField = form.getTextField('Composition Total');
  const criminologyField = form.getTextField('LVLCriminology INT');
  const criminologyTotalField = form.getTextField('Criminology Total');
  const cryptographyField = form.getTextField('LVLCryptography INT');
  const cryptographyTotalField = form.getTextField('Cryptography Total');
  const deductionField = form.getTextField('LVLDeduction INT');
  const deductionTotalField = form.getTextField('Deduction Total');
  const educationField = form.getTextField('LVLEducation INT');
  const educationTotalField = form.getTextField('Education Total');
  const gambleField = form.getTextField('Gamble');
  const gambleTotalField = form.getTextField('Gamble Total');
  const librarySearchField = form.getTextField('LVLLibrary Search INT');
  const librarySearchTotalField = form.getTextField('Library Search Total');
  const tacticsField = form.getTextField('LVLTactics INT');
  const tacticsTotalField = form.getTextField('Tactics Total');
  const wildernessSurvivalField = form.getTextField('LVLWilderness Survival INT');
  const wildernessSurvivalTotalField = form.getTextField('Wilderness Survival Total');

  // Language Options
  const streetslangField = form.getTextField('LVLStreetslang');
  const streetslangTotalField = form.getTextField('Lang Street Slang Total');
  const lang1NameField = form.getTextField('Language 2');
  const lang1Field = form.getTextField('LVL');
  const lang1TotalField = form.getTextField('Lang 2 Total');
  const lang2NameField = form.getTextField('Language 3');
  const lang2Field = form.getTextField('LVL_2');
  const lang2TotalField = form.getTextField('Lang 3 Total');
  
  // Local Expert Options
  const yourHomeField = form.getTextField('LVLYour Home');
  const yourHomeTotalField = form.getTextField('Local Expert 1 Total');
  const localExpert1NameField = form.getTextField('Local Expert 2');
  const localExpert1Field = form.getTextField('LVL_3');
  const localExpert1TotalField = form.getTextField('Local Expert 2 Total');
  const localExpert2NameField = form.getTextField('Local Expert 3');
  const localExpert2Field = form.getTextField('LVL_4');
  const localExpert2TotalField = form.getTextField('Local Expert 3 Total');
  
  // Science Options
  const science1NameField = form.getTextField('Science 1');
  const science1Field = form.getTextField('LVL_5');
  const science1TotalField = form.getTextField('Science 1 Total');
  const science2NameField = form.getTextField('Science 2');
  const science2Field = form.getTextField('LVL_6');
  const science2TotalField = form.getTextField('Science 2 Total');

  // Fighting Skill
  const brawlingField = form.getTextField('LVLBrawling DEX');
  const brawlingTotalField = form.getTextField('Brawling Total');
  const evasionField = form.getTextField('LVLEvasion DEX');
  const evasionTotalField = form.getTextField('Evasion Total');
  // Only 1 Martial Arts Field 
  // (Will need to pick the highest of Judo, Taekwondo, Karate, Aikdio)
  const martialArtsField = form.getTextField('LVLMartial Arts x2 DEX');
  const martialArtsTotalField = form.getTextField('Martial Arts Total');
  const meleeWeaponField = form.getTextField('LVLMelee Weapon DEX');
  const meleeWeaponTotalField = form.getTextField('Melee Weapon Total');

  // Performance Options
  const actingField = form.getTextField('LVLActing COOL');
  const actingTotalField = form.getTextField('Acting Total');
  const instrument1NameField = form.getTextField('Instrument 1');
  const instrument1Field = form.getTextField('LVL_7');
  const instrument1TotalField = form.getTextField('Play I 1 Total');
  const instrument2NameField = form.getTextField('Instrument 2');
  const instrument2Field = form.getTextField('LVL_8');
  const instrument2TotalField = form.getTextField('Play I 2 Total');

  // Ranged Weapon
  const archeryField = form.getTextField('LVLArchery REF');
  const archeryTotalField = form.getTextField('Archery Total');
  const autofireField = form.getTextField('LVLAutofire x2 REF');
  const autofireTotalField = form.getTextField('Autofire Total');
  const handgunField = form.getTextField('Handgun');
  const handgunTotalField = form.getTextField('Handgun Total');
  const heavyWeaponsField = form.getTextField('LVLHeavy Weapons x2 REF');
  const heavyWeaponsTotalField = form.getTextField('HW Total');
  const shoulderArmsField = form.getTextField('LVLShoulder Arms REF');
  const shoulderArmsTotalField = form.getTextField('Shoulder Arms Total');

  // Social
  const briberyField = form.getTextField('LVLBribery COOL');
  const briberyTotalField = form.getTextField('Bribery Total');
  const conversationField = form.getTextField('LVLConversation EMP');
  const conversationTotalField = form.getTextField('Conversation Total');
  const humanPerceptionField = form.getTextField('LVLHuman Perception EMP');
  const humanPerceptionTotalField = form.getTextField('Human Perception Total');
  const interrogationField = form.getTextField('LVLInterrogation COOL');
  const interrogationTotalField = form.getTextField('Interrogation Total');
  const persuasionField = form.getTextField('LVLPersuasion COOL');
  const persuasionTotalField = form.getTextField('Persuasion Total');
  const personalGroomingField = form.getTextField('LVLPersonal Grooming COOL');
  const personalGroomingTotalField = form.getTextField('Personal Grooming Total');
  const streetwiseField = form.getTextField('LVLStreetwise COOL');
  const streetwiseTotalField = form.getTextField('Streetwise Total');
  const tradingField = form.getTextField('LVLTrading COOL');
  const tradingTotalField = form.getTextField('Trading Total');
  const wardrobeStyleField = form.getTextField('LVLWardrobe  Style COOL');
  const wardrobeStyleTotalField = form.getTextField('W&S Total');

  // Technique
  const airVehicleTechField = form.getTextField('LVLAir Vehicle Tech TECH');
  const airVehicleTechTotalField = form.getTextField('Air V Tech Total');
  const basicTechField = form.getTextField('LVLBasic Tech TECH');
  const basicTechTotalField = form.getTextField('Basic Tech Total');
  const cybertechField = form.getTextField('LVLCybertech TECH');
  const cybertechTotalField = form.getTextField('Cybertech Total');
  const demolitionsField = form.getTextField('LVLDemolitions x2 TECH');
  const demolitionsTotalField = form.getTextField('Demolitions Total');
  const electronicsSecurityField = form.getTextField('LVLElectronicsSecurity Tech x2 TECH');
  const electronicsSecurityTotalField = form.getTextField('E/S Total');
  const firstAidField = form.getTextField('LVLFirst Aid TECH');
  const firstAidTotalField = form.getTextField('First Aid Total');
  const forgeryField = form.getTextField('LVLForgery TECH');
  const forgeryTotalField = form.getTextField('Forgery Total');
  const landVehicleTechField = form.getTextField('LVLLand Vehicle Tech TECH');
  const landVehicleTechTotalField = form.getTextField('Land Vehicle Tech Total');
  const paintDrawSculptField = form.getTextField('LVLPaintDrawSculpt TECH');
  const paintDrawSculptTotalField = form.getTextField('P/D/S Total');
  const paramedicField = form.getTextField('LVLParamedic x2 TECH');
  const paramedicTotalField = form.getTextField('Paramedic Total');
  const photographyField = form.getTextField('LVLPhotographyFilm TECH');
  const photographyTotalField = form.getTextField('Photograph/Film Total');
  const pickLockField = form.getTextField('LVLPick Lock TECH');
  const pickLockTotalField = form.getTextField('Pick Lock Total');
  const pickPocketField = form.getTextField('LVLPick Pocket TECH');
  const pickPocketTotalField = form.getTextField('Pick Pocket Total');
  const seaVehicleTechField = form.getTextField('LVLSea Vehicle Tech TECH');
  const seaVehicleTechTotalField = form.getTextField('Sea Vehicle Tech Total');
  const weaponstechField = form.getTextField('Weaponstech');
  const weaponstechTotalField = form.getTextField('Weaponstech Total');

  // Armor
  const headArmorField = form.getTextField('Head Armor');
  const headArmorSpField = form.getTextField('SPHead');
  const headArmorPenalityField = form.getTextField('PENALTYHead');
  const bodyArmorField = form.getTextField('Body Armor');
  const bodyArmorSpField = form.getTextField('SPBody');
  const bodyArmorPenalityField = form.getTextField('PENALTYBody');
  const shieldArmorField = form.getTextField('Shield');
  const shieldArmorSpField = form.getTextField('SPShield');
  const shieldArmorPenalityField = form.getTextField('PENALTYShield');

  // Reputation
  const aliasesField = form.getTextField('Aliases');
  // We only track current IP in FG
  const improvementPointsField = form.getTextField('Current IP');
  const improvementPointsMaxField = form.getTextField('Total IP');
  const reputationField = form.getTextField('Reputation');
  const eventsField = form.getTextField('Reputation Events');

  // Lifepath
  const familyBackgroundField = form.getTextField('Family Background');
  familyBackgroundField.disableRichFormatting();
  const culturalOriginsField = form.getTextField('Cultural Origins');
  culturalOriginsField.disableRichFormatting();
  const clothingStyleField = form.getTextField('Clothing Style');
  clothingStyleField.disableRichFormatting();
  const personalityField = form.getTextField('Personality')
  personalityField.disableRichFormatting();
  const hairstyleField = form.getTextField('Hairstyle');
  hairstyleField.disableRichFormatting();
  const valueMostField = form.getTextField('What Value Most');
  valueMostField.disableRichFormatting();
  const whoValueMostField = form.getTextField('Who Value Most');
  whoValueMostField.disableRichFormatting();
  const feelingsAboutPeopleField = form.getTextField('Feelings About People');
  feelingsAboutPeopleField.disableRichFormatting();
  const valuedPossessionField = form.getTextField('Valued Possession');
  valuedPossessionField.disableRichFormatting();
  const childhoodEnvField = form.getTextField('Childhood Env');
  childhoodEnvField.disableRichFormatting();
  const familyCrisisField = form.getTextField('Family Crisis');
  familyCrisisField.disableRichFormatting();
  const lifeGoalsField = form.getTextField('Life Goals');
  lifeGoalsField.disableRichFormatting();

  const fashionField = form.getTextField('FASHION');
  const housingField = form.getTextField('Housing');
  const rentField = form.getTextField('Rent');
  const lifestyleField = form.getTextField('Lifestyle');
  const roleLifepathField = form.getTextField('ROLE SPECIFIC LIFEPATH');
  

  const ammunitionField = form.getTextField('Ammo')
  const cashField = form.getTextField('Cash');

  // Fill in the basic info fields
  const name = character.name ? character.name[0]._ : '';
  nameField.setText(name);
  
  let roleAbilities = '';
  let roleRanks = '';

  // Get Roles
  let rolesCopy = '';
  const roles = character.classes ? character.classes[0] : {};
  const rolesKeys = Object.keys(roles);
  rolesKeys.forEach(key => {
      const item = roles[key][0];
      const name = item.name ? item.name[0]._ : '';
      if (rolesCopy !== '') {
        rolesCopy = `${rolesCopy} / `
      }   
      rolesCopy = `${rolesCopy}${name}` 

      const abilityName = item.abilityNameBase ? item.abilityNameBase[0]._ : '';
      if (roleAbilities !== '') {
        roleAbilities = `${roleAbilities} / `
      }   
      roleAbilities = `${roleAbilities}${abilityName}`

      const abilityRank = item.rank ?  item.rank[0]._ : '';
      if (roleRanks !== '') {
        roleRanks = `${roleRanks} / `
      }   
      roleRanks = `${roleRanks}${abilityRank}`
  });

  roleField.setText(rolesCopy);

  roleAbilityField.setText(roleAbilities);
  roleAbilityRankField.setText(roleRanks);
  notesField.setText(getValue(character.notes).replaceAll("\\n", "\n"));

  critInjuryField.setText(getValue(character.injuriesString));
  addictionsField.setText(getValue(character.addictionsString));

  intField.setText(getValue(character.intCurrent));
  refField.setText(getValue(character.refCurrent));
  dexField.setText(getValue(character.dexCurrent));
  techField.setText(getValue(character.techCurrent));
  coolField.setText(getValue(character.coolCurrent));
  willField.setText(getValue(character.willCurrent));
  luckCurrentField.setText(getValue(character.luckCurrent));
  luckMaxField.setText(getValue(character.luckMax));
  moveField.setText(getValue(character.moveCurrent));
  bodyField.setText(getValue(character.bodyCurrent));
  empCurrentField.setText(getValue(character.empCurrent));
  empMaxField.setText(getValue(character.empMax));
  
  humanityCurrentField.setText(getValue(character.humanityCurrent));
  humanityMaxField.setText(getValue(character.humanityMax));
  hpField.setText(getValue(character.hpCurrent));
  hpMaxField.setText(getValue(character.hpMax));
  seriouslyWoundedField.setText(getValue(character.hpSerious));
  deathSaveField.setText(getValue(character.deathSave));

  concentrationField.setText(getSkill(character, "Concentration").level);
  concentrationTotalField.setText(getSkill(character, "Concentration").total);
  concealField.setText(getSkill(character, "Conceal/Reveal Object").level);
  concealTotalField.setText(getSkill(character, "Conceal/Reveal Object").total);
  lipReadingField.setText(getSkill(character, "Lip Reading").level);
  lipReadingTotalField.setText(getSkill(character, "Lip Reading").total);
  perceptionField.setText(getSkill(character, "Perception").level);
  perceptionTotalField.setText(getSkill(character, "Perception").total);
  trackingField.setText(getSkill(character, "Tracking").level);
  trackingTotalField.setText(getSkill(character, "Tracking").total);
  
  athleticsField.setText(getSkill(character, "Athletics").level);
  athleticsTotalField.setText(getSkill(character, "Athletics").total);
  contortionistField.setText(getSkill(character, "Contortionist").level);
  contortionistTotalField.setText(getSkill(character, "Contortionist").total);
  danceField.setText(getSkill(character, "Dance").level);
  danceTotalField.setText(getSkill(character, "Dance").total);
  enduranceField.setText(getSkill(character, "Endurance").level);
  enduranceTotalField.setText(getSkill(character, "Endurance").total);
  resistTortureField.setText(getSkill(character, "Resist Torture/Drugs").level);
  resistTortureTotalField.setText(getSkill(character, "Resist Torture/Drugs").total);
  stealthField.setText(getSkill(character, "Stealth").level);
  stealthTotalField.setText(getSkill(character, "Stealth").total);
  
  driveLandField.setText(getSkill(character, "Drive Land Vehicle").level);
  driveLandTotalField.setText(getSkill(character, "Drive Land Vehicle").total);
  pilotAirField.setText(getSkill(character, "Pilot Air Vehicle (x2)").level);
  pilotAirTotalField.setText(getSkill(character, "Pilot Air Vehicle (x2)").total);
  pilotSeaField.setText(getSkill(character, "Pilot Sea Vehicle").level);
  pilotSeaTotalField.setText(getSkill(character, "Pilot Sea Vehicle").total);
  ridingField.setText(getSkill(character, "Riding").level);
  ridingTotalField.setText(getSkill(character, "Riding").total);

  accountingField.setText(getSkill(character, "Accounting").level);
  accountingTotalField.setText(getSkill(character, "Accounting").total);
  animalHandlingField.setText(getSkill(character, "Animal Handling").level);
  animalHandlingTotalField.setText(getSkill(character, "Animal Handling").total);
  bureaucracyField.setText(getSkill(character, "Bureaucracy").level);
  bureaucracyTotalField.setText(getSkill(character, "Bureaucracy").total);
  businessField.setText(getSkill(character, "Business").level);
  businessTotalField.setText(getSkill(character, "Business").total);
  compositionField.setText(getSkill(character, "Composition").level);
  compositionTotalField.setText(getSkill(character, "Composition").total);
  criminologyField.setText(getSkill(character, "Criminology").level);
  criminologyTotalField.setText(getSkill(character, "Criminology").total);
  cryptographyField.setText(getSkill(character, "Cryptography").level);
  cryptographyTotalField.setText(getSkill(character, "Cryptography").total);
  deductionField.setText(getSkill(character, "Deduction").level);
  deductionTotalField.setText(getSkill(character, "Deduction").total);
  educationField.setText(getSkill(character, "Education").level);
  educationTotalField.setText(getSkill(character, "Education").total);
  gambleField.setText(getSkill(character, "Gamble").level);
  gambleTotalField.setText(getSkill(character, "Gamble").total);
  librarySearchField.setText(getSkill(character, "Library Search").level);
  librarySearchTotalField.setText(getSkill(character, "Library Search").total);
  tacticsField.setText(getSkill(character, "Tactics").level);
  tacticsTotalField.setText(getSkill(character, "Tactics").total);
  wildernessSurvivalField.setText(getSkill(character, "Wilderness Survival").level);
  wildernessSurvivalTotalField.setText(getSkill(character, "Wilderness Survival").total);

  streetslangField.setText(getSkill(character, "Streetslang").level);
  streetslangTotalField.setText(getSkill(character, "Streetslang").total);
  // Get other languages, if any, set the first 2 found
  setSubSkills(
    character,
    "Language",
    [lang1NameField,lang1Field,lang1TotalField,lang2NameField,lang2Field,lang2TotalField],
    "Streetslang");

  yourHomeField.setText(getSkill(character, "Your Home").level);
  yourHomeTotalField.setText(getSkill(character, "Your Home").total);
  setSubSkills(
    character,
    "Local Expert",
    [localExpert1NameField,localExpert1Field,localExpert1TotalField,localExpert2NameField,localExpert2Field,localExpert2TotalField],
    "Your Home");

  setSubSkills(
    character,
    "Science",
    [science1NameField,science1Field,science1TotalField,science2NameField,science2Field,science2TotalField],
    "");

    brawlingField.setText(getSkill(character, "Brawling").level);
    brawlingTotalField.setText(getSkill(character, "Brawling").total);
    evasionField.setText(getSkill(character, "Evasion").level);
    evasionTotalField.setText(getSkill(character, "Evasion").total);
    meleeWeaponField.setText(getSkill(character, "Melee Weapon").level);
    meleeWeaponTotalField.setText(getSkill(character, "Melee Weapon").total);
    // Determine highest martial arts skill from fighting_martial_arts_skilllist
    let martialArts = parseInt(getSkill(character, "Aikido").level, 10) || 0;
    let martialArtsTotal = parseInt(getSkill(character, "Aikido").total, 10) || 0;
    const judo = parseInt(getSkill(character, "Judo").level, 10) || 0;
    const judoTotal = parseInt(getSkill(character, "Judo").total, 10) || 0;
    const karate = parseInt(getSkill(character, "Karate").level, 10) || 0;
    const karateTotal = parseInt(getSkill(character, "Karate").total, 10) || 0;
    const taekwondo = parseInt(getSkill(character, "Taekwondo").level, 10) || 0;
    const taekwondoTotal = parseInt(getSkill(character, "Taekwondo").total, 10) || 0;
    if (judo > martialArts) {
      martialArts = judo;
      martialArtsTotal = judoTotal;
    }
    if (karate > martialArts) {
      martialArts = karate;
      martialArtsTotal = karateTotal;
    }
    if (taekwondo > martialArts) {
      martialArts = taekwondo;
      martialArtsTotal = taekwondoTotal;
    } 
    martialArtsField.setText(`${martialArts}`);
    martialArtsTotalField.setText(`${martialArtsTotal}`);

  actingField.setText(getSkill(character, "Acting").level);
  actingTotalField.setText(getSkill(character, "Acting").total);
  setSubSkills(
    character,
    "Play Instrument",
    [instrument1NameField,instrument1Field,instrument1TotalField,instrument2NameField,instrument2Field,instrument2TotalField],
    "");

  archeryField.setText(getSkill(character, "Archery").level);
  archeryTotalField.setText(getSkill(character, "Archery").total);
  autofireField.setText(getSkill(character, "Autofire (x2)").level);
  autofireTotalField.setText(getSkill(character, "Autofire (x2)").total);
  handgunField.setText(getSkill(character, "Handgun").level);
  handgunTotalField.setText(getSkill(character, "Handgun").total);
  heavyWeaponsField.setText(getSkill(character, "Heavy Weapons (x2)").level);
  heavyWeaponsTotalField.setText(getSkill(character, "Heavy Weapons (x2)").total);
  shoulderArmsField.setText(getSkill(character, "Shoulder Arms").level);
  shoulderArmsTotalField.setText(getSkill(character, "Shoulder Arms").total);

  briberyField.setText(getSkill(character, "Bribery").level);
  briberyTotalField.setText(getSkill(character, "Bribery").total);
  conversationField.setText(getSkill(character, "Conversation").level);
  conversationTotalField.setText(getSkill(character, "Conversation").total);
  humanPerceptionField.setText(getSkill(character, "Human Perception").level);
  humanPerceptionTotalField.setText(getSkill(character, "Human Perception").total);
  interrogationField.setText(getSkill(character, "Interrogation").level);
  interrogationTotalField.setText(getSkill(character, "Interrogation").total);
  persuasionField.setText(getSkill(character, "Persuasion").level);
  persuasionTotalField.setText(getSkill(character, "Persuasion").total);
  personalGroomingField.setText(getSkill(character, "Personal Grooming").level);
  personalGroomingTotalField.setText(getSkill(character, "Personal Grooming").total);
  streetwiseField.setText(getSkill(character, "Streetwise").level);
  streetwiseTotalField.setText(getSkill(character, "Streetwise").total);
  tradingField.setText(getSkill(character, "Trading").level);
  tradingTotalField.setText(getSkill(character, "Trading").total);
  wardrobeStyleField.setText(getSkill(character, "Wardrobe & Style").level);
  wardrobeStyleTotalField.setText(getSkill(character, "Wardrobe & Style").total);

  airVehicleTechField.setText(getSkill(character, "Air Vehicle Tech").level);
  airVehicleTechTotalField.setText(getSkill(character, "Air Vehicle Tech").total);
  basicTechField.setText(getSkill(character, "Basic Tech").level);
  basicTechTotalField.setText(getSkill(character, "Basic Tech").total);
  cybertechField.setText(getSkill(character, "Cybertech").level);
  cybertechTotalField.setText(getSkill(character, "Cybertech").total);
  demolitionsField.setText(getSkill(character, "Demolitions (x2)").level);
  demolitionsTotalField.setText(getSkill(character, "Demolitions (x2)").total);
  electronicsSecurityField.setText(getSkill(character, "Electronics/Security Tech (x2)").level);
  electronicsSecurityTotalField.setText(getSkill(character, "Electronics/Security Tech (x2)").total);
  firstAidField.setText(getSkill(character, "First Aid").level);
  firstAidTotalField.setText(getSkill(character, "First Aid").total);
  forgeryField.setText(getSkill(character, "Forgery").level);
  forgeryTotalField.setText(getSkill(character, "Forgery").total);
  landVehicleTechField.setText(getSkill(character, "Land Vehicle Tech").level);
  landVehicleTechTotalField.setText(getSkill(character, "Land Vehicle Tech").total);
  paintDrawSculptField.setText(getSkill(character, "Paint/Draw/Sculpt").level);
  paintDrawSculptTotalField.setText(getSkill(character, "Paint/Draw/Sculpt").total);
  paramedicField.setText(getSkill(character, "Paramedic (x2)").level);
  paramedicTotalField.setText(getSkill(character, "Paramedic (x2)").total);
  photographyField.setText(getSkill(character, "Photography/Film").level);
  photographyTotalField.setText(getSkill(character, "Photography/Film").total);
  pickLockField.setText(getSkill(character, "Pick Lock").level);
  pickLockTotalField.setText(getSkill(character, "Pick Lock").total);
  pickPocketField.setText(getSkill(character, "Pick Pocket").level);
  pickPocketTotalField.setText(getSkill(character, "Pick Pocket").total);
  seaVehicleTechField.setText(getSkill(character, "Sea Vehicle Tech").level);
  seaVehicleTechTotalField.setText(getSkill(character, "Sea Vehicle Tech").total);
  weaponstechField.setText(getSkill(character, "Weaponstech").level);
  weaponstechTotalField.setText(getSkill(character, "Weaponstech").total);

  // Set cash
  const coins = character.coins
  let cash = '0eb';
  if (coins && coins.length) {
    // Only supports EB in slot 1
    const slot1 = coins[0].slot1;
    if (slot1 && slot1.length) {
      const amount = getValue(slot1[0].amount);
      const name = getValue(slot1[0].name);
      cash = `${amount}${name}`
    }
  }
  cashField.setText(cash);

  // Go through inventory list and look for:
  // equipped armor: -- Get highest SP for body/head/shield, and record penalty and name of each 
  // equipped weapons: -- Add a max of 6 weapons to the weapons list
  // fashion items: -- Generate a string of fashion items
  // ammo: -- Generate a string of ammo items
  // all other gear: -- Get a max of 18 other items
  // Go through all inventory items
  let bodySp = 0;
  let bodyPen = '';
  let headSp = 0;
  let headPen = '';
  let shieldSp = 0;
  let shieldPen = '';
  let bodyName = '';
  let headName = '';
  let shieldName = '';
  
  let ammo = '';
  let fashion = '';

  const inventorylist = character.inventorylist && character.inventorylist.length 
    ? character.inventorylist[0] : {};
  const inventorylistKeys = Object.keys(inventorylist);
  let gearIndex = 1;
  let weaponIndex = 1;
  if (inventorylistKeys) {
    inventorylistKeys.forEach((key) => {
      const item = inventorylist[key][0];

      const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
      const type = (getValue(item.gearType) || "item_gear").toLocaleLowerCase();
      const notes = typeToValue(type);

      // 0 = Equipped in this system instead of 2
      const isEquipped = getValue(item.carried) === '0';
      const count = getValue(item.count);
      // Gear items (not ammo, not armor, not fashion, not melee, not ranged, not cyberware)
      if (gearIndex < 19 && !type.includes("ammo") && !type.includes("cyberware")
        && !type.includes("armor") && !type.includes("fashion") && !type.includes("melee") && !type.includes("ranged")) {
        const gearField = form.getTextField(`Gear ${gearIndex}`);
        const notesField = form.getTextField(`Gear Notes ${gearIndex}`);
        if (count !== '' && count != '0' && count !== '1') {
          gearField.setText(`${name} (x${count})`);
        }
        else {
          gearField.setText(name);
        }
        notesField.setText(notes);
        
        gearIndex++;
      }
      else if (weaponIndex < 7 && isEquipped && (type.includes("melee") || type.includes("ranged"))) {
        // Add the weapon
        const damage =  getValue(item.dmg);
        const rof =  getValue(item.rof);
        const ammo =  getValue(item.ammo);
        const nameField =  form.getTextField(`WEAPONRow${weaponIndex}`);
        const dmgField = form.getTextField(`DMGRow${weaponIndex}`);
        const ammoField = form.getTextField(`AMMORow${weaponIndex}`);
        const rofField = form.getTextField(`ROFRow${weaponIndex}`);
        const notesField = form.getTextField(`NOTESRow${weaponIndex}`);
        nameField.setText(name);
        dmgField.setText(damage);
        ammoField.setText(ammo);
        rofField.setText(rof);
        notesField.setText(notes);
        weaponIndex++;
      }
      else if (isEquipped && type.includes("armor")) {
          // Get SP , pen, name, location
          const location = getValue(item.armorType);
          const sp = parseInt(getValue(item.sp), 10);
          const penalty = getValue(item.penalty);
          
          if ((location === "Head" || location === "" || location === " ") && sp > headSp) {
            headSp = sp;
            headPen = penalty;
            headName = name;
          }
          else if (location === "Body" && sp > bodySp) {
            bodySp = sp;
            bodyPen = penalty;
            bodyName = name;

          }
          else if (location === "Shield" && sp > shieldSp) {
            shieldSp = sp;
            shieldPen = penalty;
            shieldName = name;
          }
      }
      else if (type.includes("ammo")) {
        // Add to ammo string
        if (ammo !== '') {
          ammo = `${ammo}, `;
        }
        ammo = `${ammo}${name} (x${count})`;
      }
      else if (type.includes("fashion")) {
        // Add to fashion string
        if (fashion !== '') {
          fashion = `${fashion}, `;
        }
        fashion = `${fashion}${name} (x${count})`;
      }
    });
  }

  // Append fashion field to fashion string, too
  if (fashion !== '') {
    fashion = `${fashion}, `;
  }
  fashion = `${fashion}${getValue(character.fashion).replaceAll("\\n", "\n")}`;
  
  // Set ammo field, fashion field and armor fields
  ammunitionField.setText(ammo);
  fashionField.setText(fashion);

  headArmorField.setText(headName.replace(/[^\x00-\x7F]/g, ""));
  headArmorSpField.setText(`${headSp}`);
  headArmorPenalityField.setText(headPen);
  bodyArmorField.setText(bodyName.replace(/[^\x00-\x7F]/g, ""));
  bodyArmorSpField.setText(`${bodySp}`);
  bodyArmorPenalityField.setText(bodyPen);
  shieldArmorField.setText(shieldName.replace(/[^\x00-\x7F]/g, ""));
  shieldArmorSpField.setText(`${shieldSp}`);
  shieldArmorPenalityField.setText(shieldPen);

  // Lifepath fields
  aliasesField.setText(getValue(character.aliases).replaceAll("\\n", "\n"));
  improvementPointsField.setText(getValue(character.impPointsCurr));
  improvementPointsMaxField.setText(getValue(character.impPointsMax));
  reputationField.setText(getValue(character.reputation));
  // Get rep events
  let repEvents = '';
  const repEventsList = character.repEvents && character.repEvents.length 
    ? character.repEvents[0] : {};
  const repEventsListKeys = Object.keys(repEventsList);
  if (repEventsListKeys) {
    repEventsListKeys.forEach((key) => {
      const repEvent = repEventsList[key][0];
      const event = getValue(repEvent.repEvent);
      const level = getValue(repEvent.repLevel);
      if (repEvents !== '') {
        repEvents = `${repEvents}\n`;
      }
      repEvents = `${repEvents}${event} (${level})`;
    });
  }
  eventsField.setText(repEvents);

  culturalOriginsField.setText(getValue(character.culturalOrigins).replaceAll("\\n", "\n"));
  personalityField.setText(getValue(character.personality).replaceAll("\\n", "\n"));
  clothingStyleField.setText(getValue(character.clothingStyle).replaceAll("\\n", "\n"));
  hairstyleField.setText(getValue(character.hairstyle).replaceAll("\\n", "\n"));
  valueMostField.setText(getValue(character.valueMost).replaceAll("\\n", "\n"));
  whoValueMostField.setText(getValue(character.valuedPerson).replaceAll("\\n", "\n"));
  valuedPossessionField.setText(getValue(character.valuedPosession).replaceAll("\\n", "\n"));
  familyBackgroundField.setText(getValue(character.familyBackground).replaceAll("\\n", "\n"));
  childhoodEnvField.setText(getValue(character.childhoodEnv).replaceAll("\\n", "\n"));
  familyCrisisField.setText(getValue(character.familyCrisis).replaceAll("\\n", "\n"));
  lifeGoalsField.setText(getValue(character.lifeGoals).replaceAll("\\n", "\n"));
  feelingsAboutPeopleField.setText(getValue(character.feelingsPeople).replaceAll("\\n", "\n"));
  
  // Set friends, love affairs, enemies based on new lines in the fields
  for (let index = 1; index < 4; index++) {
    let friend = getValue(character.friend1).replaceAll("\\n", "\n");
    if (index == 2) friend = getValue(character.friend2).replaceAll("\\n", "\n");
    if (index == 3) friend = getValue(character.friend3).replaceAll("\\n", "\n");
    const friendField = form.getTextField(`Friend ${index}`);
    friendField.setText(friend);
  }
  for (let index = 1; index < 4; index++) {
    let loveAffair = getValue(character.tragicLove1).replaceAll("\\n", "\n");
    if (index == 2) loveAffair = getValue(character.tragicLove2).replaceAll("\\n", "\n");
    if (index == 3) loveAffair = getValue(character.tragicLove3).replaceAll("\\n", "\n");
    const loveAffairField = form.getTextField(`Love Affair ${index}`);
    loveAffairField.setText(loveAffair);
  }
  for (let index = 1; index < 4; index++) {
    let enemy = getValue(character.enemy1Name).replaceAll("\\n", "\n");
    if (index == 2) enemy = getValue(character.enemy2Name).replaceAll("\\n", "\n");
    if (index == 3) enemy = getValue(character.enemy3Name).replaceAll("\\n", "\n");
    const field = form.getTextField(`Who ${index}`);
    field.setText(enemy);
  }
  for (let index = 1; index < 4; index++) {
    let enemy = getValue(character.enemy1WhoCaused).replaceAll("\\n", "\n");
    if (index == 2) enemy = getValue(character.enemy2WhoCaused).replaceAll("\\n", "\n");
    if (index == 3) enemy = getValue(character.enemy3WhoCaused).replaceAll("\\n", "\n");
    if (index == 1) {
      const field = form.getTextField('What Caused It');
      field.setText(enemy);
    }
    else if (index < 4) {
      const field = form.getTextField(`What Caused it ${index}`);
      field.setText(enemy);
    }
  }
  for (let index = 1; index < 4; index++) {
    let throwAt = getValue(character.enemy1WhatThrow).replaceAll("\\n", "\n");
    if (index == 2) throwAt = getValue(character.enemy2WhatThrow).replaceAll("\\n", "\n");
    if (index == 3) throwAt = getValue(character.enemy3WhatThrow).replaceAll("\\n", "\n");
    const field = form.getTextField(`Throw At You ${index}`);
    field.setText(throwAt);
  }
  for (let index = 1; index < 4; index++) {
    let happens = getValue(character.enemy1WhatHappen).replaceAll("\\n", "\n");
    if (index == 2) happens = getValue(character.enemy2WhatHappen).replaceAll("\\n", "\n");
    if (index == 3) happens = getValue(character.enemy3WhatHappen).replaceAll("\\n", "\n");
    const field = form.getTextField(`Happen ${index}`);
    field.setText(happens);
  }

  housingField.setText(getValue(character.housing));
  rentField.setText(getValue(character.rent));
  lifestyleField.setText(getValue(character.lifestyle));

  roleLifepathField.setText(getValue(character.roleLifepath).replaceAll("\\n", "\n"));

  // Go through cyberware of each type
  const hasAudioSuite = getValue(character.hasAudioSuite) === "1";
  const hasNeuralLink = getValue(character.hasNeuralLink) === "1";
  const hasLCyberarm = getValue(character.hasLCyberarm) === "1" || getValue(character.hasLCyberhand) === "1";
  const hasRCyberarm = getValue(character.hasRCyberarm) === "1" || getValue(character.hasRCyberhand) === "1";
  const hasLCyberleg = getValue(character.hasLCyberleg) === "1" || getValue(character.hasLCyberfoot) === "1";
  const hasRCyberleg = getValue(character.hasRCyberleg) === "1" || getValue(character.hasRCyberfoot) === "1";
  const hasLCybereye = getValue(character.hasLCybereye) === "1";
  const hasRCybereye = getValue(character.hasRCybereye) === "1";

  const audioSuiteField = form.getCheckBox('Audio Box');
  const leftEyeField = form.getCheckBox('L Eye Box');
  const rightEyeField = form.getCheckBox('R Eye Box');
  const leftArmField = form.getCheckBox('L Arm Box');
  const rightArmField = form.getCheckBox('R Arm Box');
  const cyberlinkField = form.getCheckBox('Link Box');
  const leftLegField = form.getCheckBox('L Leg Box');
  const rightLegField = form.getCheckBox('R Leg Box');

  if (hasAudioSuite) {
    audioSuiteField.check();
  }
  if (hasNeuralLink) {
    cyberlinkField.check();
  }
  if (hasLCyberarm) {
    leftArmField.check();
  }
  if (hasRCyberarm) {
    rightArmField.check();
  }
  if (hasLCyberleg) {
    leftLegField.check();
  }
  if (hasRCyberleg) {
    rightLegField.check();
  } 
  if (hasLCybereye) {
    leftEyeField.check();
  }
  if (hasRCybereye) {
    rightEyeField.check();
  } 

  let cyberList = character.audioCyberware && character.audioCyberware.length 
    ? character.audioCyberware[0] : {};
  let cyberListKeys = Object.keys(cyberList);
  let cyberIndex = 1;
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 4) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`Audio ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  cyberIndex = 1;
  cyberList = character.lEyeCyberware && character.lEyeCyberware.length 
    ? character.lEyeCyberware[0] : {};
  cyberListKeys = Object.keys(cyberList);
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 4) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`L Eye ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }


  cyberList = character.rEyeCyberware && character.rEyeCyberware.length 
    ? character.rEyeCyberware[0] : {};
  cyberListKeys = Object.keys(cyberList);
  cyberIndex = 1;
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 4) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`R Eye ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  cyberList = character.lArmCyberware && character.lArmCyberware.length 
    ? character.lArmCyberware[0] : {};
  cyberListKeys = Object.keys(cyberList);
  cyberIndex = 1;
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 5) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`L Arm ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  cyberList = character.rArmCyberware && character.rArmCyberware.length 
    ? character.rArmCyberware[0] : {};
  cyberListKeys = Object.keys(cyberList);
  cyberIndex = 1;
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 5) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`R Arm ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  cyberList = character.neuralCyberware && character.neuralCyberware.length 
    ? character.neuralCyberware[0] : {};
  cyberListKeys = Object.keys(cyberList);
  cyberIndex = 1;
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 6) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`NLink ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  cyberList = character.lLegCyberware && character.lLegCyberware.length 
    ? character.lLegCyberware[0] : {};
  cyberListKeys = Object.keys(cyberList);
  cyberIndex = 1;
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 4) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`L Leg ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  cyberList = character.rLegCyberware && character.rLegCyberware.length 
    ? character.rLegCyberware[0] : {};
  cyberListKeys = Object.keys(cyberList);
  cyberIndex = 1;
  if (cyberListKeys) {
    cyberListKeys.forEach((key) => {
      if (cyberIndex < 4) {
        const item = cyberList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`R Leg ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }
  
  const internalList = character.internalCyberware && character.internalCyberware.length 
    ? character.internalCyberware[0] : {};
  const internalListKeys = Object.keys(internalList);
  cyberIndex = 1;
  if (internalListKeys) {
    internalListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = internalList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`IC ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const externalList = character.externalCyberware && character.externalCyberware.length 
    ? character.externalCyberware[0] : {};
  const externalListKeys = Object.keys(externalList);
  cyberIndex = 1;
  if (externalListKeys) {
    externalListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = externalList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        let cyberField = form.getTextField(`EC 1`);
        if (cyberIndex > 1) {
          cyberField = form.getTextField(`EC${cyberIndex}`);
        }
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const fashionwareList = character.fashionware && character.fashionware.length 
    ? character.fashionware[0] : {};
  const fashionwareListKeys = Object.keys(fashionwareList);
  cyberIndex = 1;
  if (fashionwareListKeys) {
    fashionwareListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = fashionwareList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`FW${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const borgwareList = character.borgware && character.borgware.length 
    ? character.borgware[0] : {};
  const borgwareListKeys = Object.keys(borgwareList);
  cyberIndex = 1;
  if (borgwareListKeys) {
    borgwareListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = borgwareList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`Borg${cyberIndex}`)
        // Replace unicode characters to prevent errors
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const pdfBytes = await pdfDoc.save();

  // Trigger the browser to download the PDF document
  download(pdfBytes, `${name}.pdf`, "application/pdf");
}

const fillFormUnofficial = async (characterData: CharacterSheetParam) => {
  const character = characterData.root.character[0];

  const existingPdfBytes = await fetch(CYBERPUNK_RED_CHARSHEET).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const form = pdfDoc.getForm();

  await pdfDoc.embedStandardFont(StandardFonts.TimesRoman);

  // Get all fields

  // Main Fields
  const nameField = form.getTextField('Handle');
  const roleField = form.getTextField('Role');
  const roleAbilityField = form.getTextField('Role Ability');
  const roleAbilityRankField = form.getTextField('Role Ability Rank');
  const notesField = form.getTextField('Notes');

  // STATs
  const intField = form.getTextField('INT');
  const refField = form.getTextField('REF');
  const dexField = form.getTextField('DEX');
  const techField = form.getTextField('TECH');
  const coolField = form.getTextField('COOL');
  const willField = form.getTextField('WILL');
  const luckCurrentField = form.getTextField('LUCK CURRENT');
  const luckMaxField = form.getTextField('LUCK MAX');
  const moveField = form.getTextField('MOVE');
  const bodyField = form.getTextField('BODY');
  const empCurrentField = form.getTextField('EMP');
  const empMaxField = form.getTextField('EMP MAX');

  // Health
  const humanityCurrentField = form.getTextField('Current Humanity');
  const humanityMaxField = form.getTextField('Max Humanity');
  const hpField = form.getTextField('Current HP');
  const hpMaxField = form.getTextField('Max HP');
  const seriouslyWoundedField = form.getTextField('Seriously Wounded Threshhold')
  const deathSaveField = form.getTextField('Death Save')
  const critInjuryField = form.getTextField('Critical Injuries');
  const addictionsField = form.getTextField('ADDICTIONS');

  // Awareness
  const concentrationField = form.getTextField('Concentration Level');
  const concentrationTotalField = form.getTextField('Concentration Total');
  const concealField = form.getTextField('Conceal/Reveal LVL');
  const concealTotalField = form.getTextField('Conceal/Reveal Total');
  const lipReadingField = form.getTextField('LVLLip Reading INT');
  const lipReadingTotalField = form.getTextField('Lip Reading Total');
  const perceptionField = form.getTextField('LVLPerception INT');
  const perceptionTotalField = form.getTextField('Perception Total');
  const trackingField = form.getTextField('LVLTracking INT');
  const trackingTotalField = form.getTextField('Tracking Total');

  // Body
  const athleticsField = form.getTextField('LVLAthletics DEX');
  const athleticsTotalField = form.getTextField('Athletics Total');
  const contortionistField = form.getTextField('LVLContortionist DEX');
  const contortionistTotalField = form.getTextField('Contortionist Total');
  const danceField = form.getTextField('LVLDance DEX');
  const danceTotalField = form.getTextField('Dance Total');
  const enduranceField = form.getTextField('LVLEndurance WILL');
  const enduranceTotalField = form.getTextField('Endurance Total');
  const resistTortureField = form.getTextField('LVLResist TortureDrugs WILL');
  const resistTortureTotalField = form.getTextField('Resist Total');
  const stealthField = form.getTextField('LVLStealth DEX');
  const stealthTotalField = form.getTextField('Stealth Total');

  // Control
  const driveLandField = form.getTextField('LVLDrive Land Vehicle REF');
  const driveLandTotalField = form.getTextField('Drive Land Total');
  const pilotAirField = form.getTextField('LVLPilor Air Vehicle x2 REF');
  const pilotAirTotalField = form.getTextField('Pilot Air Total');
  const pilotSeaField = form.getTextField('LVLPilot Sea Vehicle REF');
  const pilotSeaTotalField = form.getTextField('Pilot Sea Total');
  const ridingField = form.getTextField('LVLRiding REF');
  const ridingTotalField = form.getTextField('Riding Total');

  // Education
  const accountingField = form.getTextField('LVLAccounting INT');
  const accountingTotalField = form.getTextField('Accounting Total');
  const animalHandlingField = form.getTextField('LVLAnimal Handling INT');
  const animalHandlingTotalField = form.getTextField('Animal Handling Total');
  const bureaucracyField = form.getTextField('LVLBureaucracy INT');
  const bureaucracyTotalField = form.getTextField('Bureaucracy Total');
  const businessField = form.getTextField('LVLBusiness INT');
  const businessTotalField = form.getTextField('Business Total');
  const compositionField = form.getTextField('LVLComposition INT');
  const compositionTotalField = form.getTextField('Composition Total');
  const criminologyField = form.getTextField('LVLCriminology INT');
  const criminologyTotalField = form.getTextField('Criminology Total');
  const cryptographyField = form.getTextField('LVLCryptography INT');
  const cryptographyTotalField = form.getTextField('Cryptography Total');
  const deductionField = form.getTextField('LVLDeduction INT');
  const deductionTotalField = form.getTextField('Deduction Total');
  const educationField = form.getTextField('LVLEducation INT');
  const educationTotalField = form.getTextField('Education Total');
  const gambleField = form.getTextField('Gamble');
  const gambleTotalField = form.getTextField('Gamble Total');
  const librarySearchField = form.getTextField('LVLLibrary Search INT');
  const librarySearchTotalField = form.getTextField('Library Search Total');
  const tacticsField = form.getTextField('LVLTactics INT');
  const tacticsTotalField = form.getTextField('Tactics Total');
  const wildernessSurvivalField = form.getTextField('LVLWilderness Survival INT');
  const wildernessSurvivalTotalField = form.getTextField('Wilderness Survival Total');

  // Language Options
  const streetslangField = form.getTextField('LVLStreetslang');
  const streetslangTotalField = form.getTextField('Lang Street Slang Total');
  const lang1NameField = form.getTextField('Language 2');
  const lang1Field = form.getTextField('LVL');
  const lang1TotalField = form.getTextField('Lang 2 Total');
  const lang2NameField = form.getTextField('Language 3');
  const lang2Field = form.getTextField('LVL_2');
  const lang2TotalField = form.getTextField('Lang 3 Total');
  
  // Local Expert Options
  const yourHomeField = form.getTextField('LVLYour Home');
  const yourHomeTotalField = form.getTextField('Local Expert 1 Total');
  const localExpert1NameField = form.getTextField('Local Expert 2');
  const localExpert1Field = form.getTextField('LVL_3');
  const localExpert1TotalField = form.getTextField('Local Expert 2 Total');
  const localExpert2NameField = form.getTextField('Local Expert 3');
  const localExpert2Field = form.getTextField('LVL_4');
  const localExpert2TotalField = form.getTextField('Local Expert 3 Total');
  
  // Science Options
  const science1NameField = form.getTextField('Science 1');
  const science1Field = form.getTextField('LVL_5');
  const science1TotalField = form.getTextField('Science 1 Total');
  const science2NameField = form.getTextField('Science 2');
  const science2Field = form.getTextField('LVL_6');
  const science2TotalField = form.getTextField('Science 2 Total');

  // Fighting Skill
  const brawlingField = form.getTextField('LVLBrawling DEX');
  const brawlingTotalField = form.getTextField('Brawling Total');
  const evasionField = form.getTextField('LVLEvasion DEX');
  const evasionTotalField = form.getTextField('Evasion Total');
  // Only 1 Martial Arts Field 
  // (Will need to pick the highest of Judo, Taekwondo, Karate, Aikdio)
  const martialArtsField = form.getTextField('LVLMartial Arts x2 DEX');
  const martialArtsTotalField = form.getTextField('Martial Arts Total');
  const meleeWeaponField = form.getTextField('LVLMelee Weapon DEX');
  const meleeWeaponTotalField = form.getTextField('Melee Weapon Total');

  // Performance Options
  const actingField = form.getTextField('LVLActing COOL');
  const actingTotalField = form.getTextField('Acting Total');
  const instrument1NameField = form.getTextField('Instrument 1');
  const instrument1Field = form.getTextField('LVL_7');
  const instrument1TotalField = form.getTextField('Play I 1 Total');
  const instrument2NameField = form.getTextField('Instrument 2');
  const instrument2Field = form.getTextField('LVL_8');
  const instrument2TotalField = form.getTextField('Play I 2 Total');

  // Ranged Weapon
  const archeryField = form.getTextField('LVLArchery REF');
  const archeryTotalField = form.getTextField('Archery Total');
  const autofireField = form.getTextField('LVLAutofire x2 REF');
  const autofireTotalField = form.getTextField('Autofire Total');
  const handgunField = form.getTextField('Handgun');
  const handgunTotalField = form.getTextField('Handgun Total');
  const heavyWeaponsField = form.getTextField('LVLHeavy Weapons x2 REF');
  const heavyWeaponsTotalField = form.getTextField('HW Total');
  const shoulderArmsField = form.getTextField('LVLShoulder Arms REF');
  const shoulderArmsTotalField = form.getTextField('Shoulder Arms Total');

  // Social
  const briberyField = form.getTextField('LVLBribery COOL');
  const briberyTotalField = form.getTextField('Bribery Total');
  const conversationField = form.getTextField('LVLConversation EMP');
  const conversationTotalField = form.getTextField('Conversation Total');
  const humanPerceptionField = form.getTextField('LVLHuman Perception EMP');
  const humanPerceptionTotalField = form.getTextField('Human Perception Total');
  const interrogationField = form.getTextField('LVLInterrogation COOL');
  const interrogationTotalField = form.getTextField('Interrogation Total');
  const persuasionField = form.getTextField('LVLPersuasion COOL');
  const persuasionTotalField = form.getTextField('Persuasion Total');
  const personalGroomingField = form.getTextField('LVLPersonal Grooming COOL');
  const personalGroomingTotalField = form.getTextField('Personal Grooming Total');
  const streetwiseField = form.getTextField('LVLStreetwise COOL');
  const streetwiseTotalField = form.getTextField('Streetwise Total');
  const tradingField = form.getTextField('LVLTrading COOL');
  const tradingTotalField = form.getTextField('Trading Total');
  const wardrobeStyleField = form.getTextField('LVLWardrobe  Style COOL');
  const wardrobeStyleTotalField = form.getTextField('W&S Total');

  // Technique
  const airVehicleTechField = form.getTextField('LVLAir Vehicle Tech TECH');
  const airVehicleTechTotalField = form.getTextField('Air V Tech Total');
  const basicTechField = form.getTextField('LVLBasic Tech TECH');
  const basicTechTotalField = form.getTextField('Basic Tech Total');
  const cybertechField = form.getTextField('LVLCybertech TECH');
  const cybertechTotalField = form.getTextField('Cybertech Total');
  const demolitionsField = form.getTextField('LVLDemolitions x2 TECH');
  const demolitionsTotalField = form.getTextField('Demolitions Total');
  const electronicsSecurityField = form.getTextField('LVLElectronicsSecurity Tech x2 TECH');
  const electronicsSecurityTotalField = form.getTextField('E/S Total');
  const firstAidField = form.getTextField('LVLFirst Aid TECH');
  const firstAidTotalField = form.getTextField('First Aid Total');
  const forgeryField = form.getTextField('LVLForgery TECH');
  const forgeryTotalField = form.getTextField('Forgery Total');
  const landVehicleTechField = form.getTextField('LVLLand Vehicle Tech TECH');
  const landVehicleTechTotalField = form.getTextField('Land Vehicle Tech Total');
  const paintDrawSculptField = form.getTextField('LVLPaintDrawSculpt TECH');
  const paintDrawSculptTotalField = form.getTextField('P/D/S Total');
  const paramedicField = form.getTextField('LVLParamedic x2 TECH');
  const paramedicTotalField = form.getTextField('Paramedic Total');
  const photographyField = form.getTextField('LVLPhotographyFilm TECH');
  const photographyTotalField = form.getTextField('Photograph/Film Total');
  const pickLockField = form.getTextField('LVLPick Lock TECH');
  const pickLockTotalField = form.getTextField('Pick Lock Total');
  const pickPocketField = form.getTextField('LVLPick Pocket TECH');
  const pickPocketTotalField = form.getTextField('Pick Pocket Total');
  const seaVehicleTechField = form.getTextField('LVLSea Vehicle Tech TECH');
  const seaVehicleTechTotalField = form.getTextField('Sea Vehicle Tech Total');
  const weaponstechField = form.getTextField('Weaponstech');
  const weaponstechTotalField = form.getTextField('Weaponstech Total');

  // Armor
  const headArmorField = form.getTextField('Head Armor');
  const headArmorSpField = form.getTextField('SPHead');
  const headArmorPenalityField = form.getTextField('PENALTYHead');
  const bodyArmorField = form.getTextField('Body Armor');
  const bodyArmorSpField = form.getTextField('SPBody');
  const bodyArmorPenalityField = form.getTextField('PENALTYBody');
  const shieldArmorField = form.getTextField('Shield');
  const shieldArmorSpField = form.getTextField('SPShield');
  const shieldArmorPenalityField = form.getTextField('PENALTYShield');

  // Reputation
  const aliasesField = form.getTextField('Aliases');
  // We only track current IP in FG
  const improvementPointsField = form.getTextField('Current IP');
  const reputationField = form.getTextField('Reputation');
  const eventsField = form.getTextField('Reputation Events');

  // Lifepath
  const familyBackgroundField = form.getTextField('Family Background');
  familyBackgroundField.disableRichFormatting();
  const culturalOriginsField = form.getTextField('Cultural Origins');
  culturalOriginsField.disableRichFormatting();
  const clothingStyleField = form.getTextField('Clothing Style');
  clothingStyleField.disableRichFormatting();
  const personalityField = form.getTextField('Personality')
  personalityField.disableRichFormatting();
  const hairstyleField = form.getTextField('Hairstyle');
  hairstyleField.disableRichFormatting();
  const valueMostField = form.getTextField('What Value Most');
  valueMostField.disableRichFormatting();
  const whoValueMostField = form.getTextField('Who Value Most');
  whoValueMostField.disableRichFormatting();
  const feelingsAboutPeopleField = form.getTextField('Feelings About People');
  feelingsAboutPeopleField.disableRichFormatting();
  const valuedPossessionField = form.getTextField('Valued Possession');
  valuedPossessionField.disableRichFormatting();
  const childhoodEnvField = form.getTextField('Childhood Env');
  childhoodEnvField.disableRichFormatting();
  const familyCrisisField = form.getTextField('Family Crisis');
  familyCrisisField.disableRichFormatting();
  const lifeGoalsField = form.getTextField('Life Goals');
  lifeGoalsField.disableRichFormatting();

  const fashionField = form.getTextField('FASHION');
  const housingField = form.getTextField('Housing');
  const rentField = form.getTextField('Rent');
  const lifestyleField = form.getTextField('Lifestyle');
  const roleLifepathField = form.getTextField('ROLE SPECIFIC LIFEPATH');

  const ammunitionField = form.getTextField('Ammo')
  const cashField = form.getTextField('Cash');

  // Fill in the basic info fields
  const name = character.name ? character.name[0]._ : '';
  nameField.setText(name);

  let roleAbilities = '';
  let roleRanks = '';
  const abilities = character.abilities[0] || {};
  const abilityKeys = Object.keys(abilities);
  abilityKeys.forEach(key => {
      const item = abilities[key][0];
      const name = item.name ? item.name[0]._ : '';
      const rank = item.level ? item.level[0]._ : '';
      const isPrimary =  item.is_primary ? item.is_primary[0]._ : '';
      // Only add if it's primary
      if (isPrimary === '1') {
        if (roleAbilities !== '') {
          roleAbilities = `${roleAbilities} / `
          roleRanks = `${roleRanks} / ` 
        }   
        roleAbilities = `${roleAbilities}${name}`
        roleRanks = `${roleRanks}${rank} ` 
      }
  });

  // Get Roles
  let rolesCopy = '';
  const roles = character.roles ? character.roles[0] : {};
  const rolesKeys = Object.keys(roles);
  rolesKeys.forEach(key => {
      const item = roles[key][0];
      const name = item.name ? item.name[0]._ : '';
      if (rolesCopy !== '') {
        rolesCopy = `${rolesCopy} / `
      }   
      rolesCopy = `${rolesCopy}${name}` 
  });

  roleField.setText(rolesCopy);

  roleAbilityField.setText(roleAbilities);
  roleAbilityRankField.setText(roleRanks);
  notesField.setText(getValue(character.notes).replaceAll("\\n", "\n"));
  critInjuryField.setText(getValue(character.injuries_value));
  addictionsField.setText(getValue(character.addictions_value));

  intField.setText(getValue(character.int_current));
  refField.setText(getValue(character.ref_current));
  dexField.setText(getValue(character.dex_current));
  techField.setText(getValue(character.tech_current));
  coolField.setText(getValue(character.cool_current));
  willField.setText(getValue(character.will_current));
  luckCurrentField.setText(getValue(character.luck_current));
  luckMaxField.setText(getValue(character.luck_max));
  moveField.setText(getValue(character.move_current));
  bodyField.setText(getValue(character.body_current));
  empCurrentField.setText(getValue(character.emp_current));
  empMaxField.setText(getValue(character.emp_max));
  
  humanityCurrentField.setText(getValue(character.humanity_current));
  humanityMaxField.setText(getValue(character.humanity_max));
  hpField.setText(getValue(character.hp_current));
  hpMaxField.setText(getValue(character.hp_max));
  seriouslyWoundedField.setText(getValue(character.hp_serious));
  deathSaveField.setText(getValue(character.hp_deathsave));

  concentrationField.setText(getValue(character.awareness_skilllist[0].Concentration[0].level));
  concentrationTotalField.setText(getValue(character.awareness_skilllist[0].Concentration[0].total));
  concealField.setText(getValue(character.awareness_skilllist[0].Conceal_Reveal_Object[0].level));
  concealTotalField.setText(getValue(character.awareness_skilllist[0].Conceal_Reveal_Object[0].total));
  lipReadingField.setText(getValue(character.awareness_skilllist[0].Lip_Reading[0].level));
  lipReadingTotalField.setText(getValue(character.awareness_skilllist[0].Lip_Reading[0].total));
  perceptionField.setText(getValue(character.awareness_skilllist[0].Perception[0].level));
  perceptionTotalField.setText(getValue(character.awareness_skilllist[0].Perception[0].total));
  trackingField.setText(getValue(character.awareness_skilllist[0].Tracking[0].level));
  trackingTotalField.setText(getValue(character.awareness_skilllist[0].Tracking[0].total));
  
  athleticsField.setText(getValue(character.body_skilllist[0].Athletics[0].level));
  athleticsTotalField.setText(getValue(character.body_skilllist[0].Athletics[0].total));
  contortionistField.setText(getValue(character.body_skilllist[0].Contortionist[0].level));
  contortionistTotalField.setText(getValue(character.body_skilllist[0].Contortionist[0].total));
  danceField.setText(getValue(character.body_skilllist[0].Dance[0].level));
  danceTotalField.setText(getValue(character.body_skilllist[0].Dance[0].total));
  enduranceField.setText(getValue(character.body_skilllist[0].Endurance[0].level));
  enduranceTotalField.setText(getValue(character.body_skilllist[0].Endurance[0].total));
  resistTortureField.setText(getValue(character.body_skilllist[0].Resist_Torture_Drugs[0].level));
  resistTortureTotalField.setText(getValue(character.body_skilllist[0].Resist_Torture_Drugs[0].total));
  stealthField.setText(getValue(character.body_skilllist[0].Stealth[0].level));
  stealthTotalField.setText(getValue(character.body_skilllist[0].Stealth[0].total));
  
  driveLandField.setText(getValue(character.control_skilllist[0].Drive_Land_Vehicle[0].level));
  driveLandTotalField.setText(getValue(character.control_skilllist[0].Drive_Land_Vehicle[0].total));
  pilotAirField.setText(getValue(character.control_skilllist[0].Pilot_Air_Vehicle__x2_[0].level));
  pilotAirTotalField.setText(getValue(character.control_skilllist[0].Pilot_Air_Vehicle__x2_[0].total));
  pilotSeaField.setText(getValue(character.control_skilllist[0].Pilot_Sea_Vehicle[0].level));
  pilotSeaTotalField.setText(getValue(character.control_skilllist[0].Pilot_Sea_Vehicle[0].total));
  ridingField.setText(getValue(character.control_skilllist[0].Riding[0].level));
  ridingTotalField.setText(getValue(character.control_skilllist[0].Riding[0].total));

  accountingField.setText(getValue(character.education_skilllist[0].Accounting[0].level));
  accountingTotalField.setText(getValue(character.education_skilllist[0].Accounting[0].total));
  animalHandlingField.setText(getValue(character.education_skilllist[0].Animal_Handling[0].level));
  animalHandlingTotalField.setText(getValue(character.education_skilllist[0].Animal_Handling[0].total));
  bureaucracyField.setText(getValue(character.education_skilllist[0].Bureaucracy[0].level));
  bureaucracyTotalField.setText(getValue(character.education_skilllist[0].Bureaucracy[0].total));
  businessField.setText(getValue(character.education_skilllist[0].Business[0].level));
  businessTotalField.setText(getValue(character.education_skilllist[0].Business[0].total));
  compositionField.setText(getValue(character.education_skilllist[0].Composition[0].level));
  compositionTotalField.setText(getValue(character.education_skilllist[0].Composition[0].total));
  criminologyField.setText(getValue(character.education_skilllist[0].Criminology[0].level));
  criminologyTotalField.setText(getValue(character.education_skilllist[0].Criminology[0].total));
  cryptographyField.setText(getValue(character.education_skilllist[0].Cryptography[0].level));
  cryptographyTotalField.setText(getValue(character.education_skilllist[0].Cryptography[0].total));
  deductionField.setText(getValue(character.education_skilllist[0].Deduction[0].level));
  deductionTotalField.setText(getValue(character.education_skilllist[0].Deduction[0].total));
  educationField.setText(getValue(character.education_skilllist[0].Education[0].level));
  educationTotalField.setText(getValue(character.education_skilllist[0].Education[0].total));
  gambleField.setText(getValue(character.education_skilllist[0].Gamble[0].level));
  gambleTotalField.setText(getValue(character.education_skilllist[0].Gamble[0].total));
  librarySearchField.setText(getValue(character.education_skilllist[0].Library_Search[0].level));
  librarySearchTotalField.setText(getValue(character.education_skilllist[0].Library_Search[0].total));
  tacticsField.setText(getValue(character.education_skilllist[0].Tactics[0].level));
  tacticsTotalField.setText(getValue(character.education_skilllist[0].Tactics[0].total));
  wildernessSurvivalField.setText(getValue(character.education_skilllist[0].Wilderness_Survival[0].level));
  wildernessSurvivalTotalField.setText(getValue(character.education_skilllist[0].Wilderness_Survival[0].total));

  streetslangField.setText(getValue(character.education_language_skilllist[0].Streetslang[0].level));
  streetslangTotalField.setText(getValue(character.education_language_skilllist[0].Streetslang[0].total));
  // Get other languages, if any, set the first 2 found
  const languages = character.education_language_skilllist[0] || {};
  const langKeys = Object.keys(languages);
  if (langKeys.length > 1) {
    langKeys.forEach((key, index) => {
      const item = languages[key][0];
      const name = item.name ? item.name[0]._ : '';
      const level = item.level ? item.level[0]._ : '';
      const total =  item.total ? item.total[0]._ : '';
      // Only add if index < 3 and not Streetslang (since we don't count Streetslang)
      if (index < 3 && key !== 'Streetslang') {
        if (!lang1NameField.getText()) {
          lang1NameField.setText(name);
          lang1Field.setText(level);
          lang1TotalField.setText(total);
        }
        else {
          lang2NameField.setText(name);
          lang2Field.setText(level);
          lang2TotalField.setText(total);
        }
      }
    });
  }

  yourHomeField.setText(getValue(character.education_local_expert_skilllist[0].Your_Home[0].level));
  yourHomeTotalField.setText(getValue(character.education_local_expert_skilllist[0].Your_Home[0].total));
  // Get other languages, if any, set the first 2 found
  const localexpert = character.education_local_expert_skilllist[0] || {};
  const localexpertKeys = Object.keys(localexpert);
  if (localexpertKeys.length > 1) {
    localexpertKeys.forEach((key, index) => {
      const item = localexpert[key][0];
      const name = item.name ? item.name[0]._ : '';
      const level = item.level ? item.level[0]._ : '';
      const total =  item.total ? item.total[0]._ : '';
      // Only add if index < 3 and not Your_Home (since we don't count Your Home)
      if (index < 3 && key !== 'Your_Home') {
        if (!localExpert1NameField.getText()) {
          localExpert1NameField.setText(name);
          localExpert1Field.setText(level);
          localExpert1TotalField.setText(total);
        }
        else {
          localExpert2NameField.setText(name);
          localExpert2Field.setText(level);
          localExpert2TotalField.setText(total);
        }
      }
    });
  }

  // Get sciences but only add 2
  const science = character.education_science_skilllist[0] || {};
  const scienceKey = Object.keys(science);
  if (scienceKey.length) {
    scienceKey.forEach((key, index) => {
      const item = science[key][0];
      const name = item.name ? item.name[0]._ : '';
      const level = item.level ? item.level[0]._ : '';
      const total =  item.total ? item.total[0]._ : '';
      // Only add if index < 2 (only 2 slots in teh sheet)
      if (index < 2) {
        if (!science1NameField.getText()) {
          science1NameField.setText(name);
          science1Field.setText(level);
          science1TotalField.setText(total);
        }
        else {
          science2NameField.setText(name);
          science2Field.setText(level);
          science2TotalField.setText(total);
        }
      }
    });
  }

  brawlingField.setText(getValue(character.fighting_skilllist[0].Brawling[0].level));
  brawlingTotalField.setText(getValue(character.fighting_skilllist[0].Brawling[0].total));
  evasionField.setText(getValue(character.fighting_skilllist[0].Evasion[0].level));
  evasionTotalField.setText(getValue(character.fighting_skilllist[0].Evasion[0].total));
  meleeWeaponField.setText(getValue(character.fighting_skilllist[0].Melee_Weapon[0].level));
  meleeWeaponTotalField.setText(getValue(character.fighting_skilllist[0].Melee_Weapon[0].total));
  // Determine highest martial arts skill from fighting_martial_arts_skilllist
  let martialArts = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Aikido[0].level), 10);
  let martialArtsTotal = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Aikido[0].total), 10);
  const judo = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Judo[0].level), 10);
  const judoTotal = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Judo[0].total), 10);
  const karate = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Karate[0].level), 10);
  const karateTotal = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Karate[0].total), 10);
  const taekwondo = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Taekwondo[0].level), 10);
  const taekwondoTotal = parseInt(getValue(character.fighting_martial_arts_skilllist[0].Taekwondo[0].total), 10);
  if (judo > martialArts) {
    martialArts = judo;
    martialArtsTotal = judoTotal;
  }
  if (karate > martialArts) {
    martialArts = karate;
    martialArtsTotal = karateTotal;
  }
  if (taekwondo > martialArts) {
    martialArts = taekwondo;
    martialArtsTotal = taekwondoTotal;
  } 
  martialArtsField.setText(`${martialArts}`);
  martialArtsTotalField.setText(`${martialArtsTotal}`);

  actingField.setText(getValue(character.performance_skilllist[0].Acting[0].level));
  actingTotalField.setText(getValue(character.performance_skilllist[0].Acting[0].total));
  // Get Play Instrument but only add 2
  const playIntrument = character.performance_play_instrument_skilllist[0] || {};
  const playIntrumentKey = Object.keys(playIntrument);
  if (playIntrumentKey.length) {
    playIntrumentKey.forEach((key, index) => {
      const item = playIntrument[key][0];
      const name = item.name ? item.name[0]._ : '';
      const level = item.level ? item.level[0]._ : '';
      const total =  item.total ? item.total[0]._ : '';
      // Only add if index < 2 (only 2 slots in teh sheet)
      if (index < 2) {
        if (!instrument1NameField.getText()) {
          instrument1NameField.setText(name);
          instrument1Field.setText(level);
          instrument1TotalField.setText(total);
        }
        else {
          instrument2NameField.setText(name);
          instrument2Field.setText(level);
          instrument2TotalField.setText(total);
        }
      }
    });
  }

  archeryField.setText(getValue(character.ranged_weapon_skilllist[0].Archery[0].level));
  archeryTotalField.setText(getValue(character.ranged_weapon_skilllist[0].Archery[0].total));
  autofireField.setText(getValue(character.ranged_weapon_skilllist[0].Autofire__x2_[0].level));
  autofireTotalField.setText(getValue(character.ranged_weapon_skilllist[0].Autofire__x2_[0].total));
  handgunField.setText(getValue(character.ranged_weapon_skilllist[0].Handgun[0].level));
  handgunTotalField.setText(getValue(character.ranged_weapon_skilllist[0].Handgun[0].total));
  heavyWeaponsField.setText(getValue(character.ranged_weapon_skilllist[0].Heavy_Weapons__x2_[0].level));
  heavyWeaponsTotalField.setText(getValue(character.ranged_weapon_skilllist[0].Heavy_Weapons__x2_[0].total));
  shoulderArmsField.setText(getValue(character.ranged_weapon_skilllist[0].Shoulder_Arms[0].level));
  shoulderArmsTotalField.setText(getValue(character.ranged_weapon_skilllist[0].Shoulder_Arms[0].total));

  briberyField.setText(getValue(character.social_skilllist[0].Bribery[0].level));
  briberyTotalField.setText(getValue(character.social_skilllist[0].Bribery[0].total));
  conversationField.setText(getValue(character.social_skilllist[0].Conversation[0].level));
  conversationTotalField.setText(getValue(character.social_skilllist[0].Conversation[0].total));
  humanPerceptionField.setText(getValue(character.social_skilllist[0].Human_Perception[0].level));
  humanPerceptionTotalField.setText(getValue(character.social_skilllist[0].Human_Perception[0].total));
  interrogationField.setText(getValue(character.social_skilllist[0].Interrogation[0].level));
  interrogationTotalField.setText(getValue(character.social_skilllist[0].Interrogation[0].total));
  persuasionField.setText(getValue(character.social_skilllist[0].Persuasion[0].level));
  persuasionTotalField.setText(getValue(character.social_skilllist[0].Persuasion[0].total));
  personalGroomingField.setText(getValue(character.social_skilllist[0].Personal_Grooming[0].level));
  personalGroomingTotalField.setText(getValue(character.social_skilllist[0].Personal_Grooming[0].total));
  streetwiseField.setText(getValue(character.social_skilllist[0].Streetwise[0].level));
  streetwiseTotalField.setText(getValue(character.social_skilllist[0].Streetwise[0].total));
  tradingField.setText(getValue(character.social_skilllist[0].Trading[0].level));
  tradingTotalField.setText(getValue(character.social_skilllist[0].Trading[0].total));
  wardrobeStyleField.setText(getValue(character.social_skilllist[0].Wardrobe___Style[0].level));
  wardrobeStyleTotalField.setText(getValue(character.social_skilllist[0].Wardrobe___Style[0].total));

  airVehicleTechField.setText(getValue(character.technique_skilllist[0].Air_Vehicle_Tech[0].level));
  airVehicleTechTotalField.setText(getValue(character.technique_skilllist[0].Air_Vehicle_Tech[0].total));
  basicTechField.setText(getValue(character.technique_skilllist[0].Basic_Tech[0].level));
  basicTechTotalField.setText(getValue(character.technique_skilllist[0].Basic_Tech[0].total));
  cybertechField.setText(getValue(character.technique_skilllist[0].Cybertech[0].level));
  cybertechTotalField.setText(getValue(character.technique_skilllist[0].Cybertech[0].total));
  demolitionsField.setText(getValue(character.technique_skilllist[0].Demolitions__x2_[0].level));
  demolitionsTotalField.setText(getValue(character.technique_skilllist[0].Demolitions__x2_[0].total));
  electronicsSecurityField.setText(getValue(character.technique_skilllist[0].Electronics_Security_Tech__x2_[0].level));
  electronicsSecurityTotalField.setText(getValue(character.technique_skilllist[0].Electronics_Security_Tech__x2_[0].total));
  firstAidField.setText(getValue(character.technique_skilllist[0].First_Aid[0].level));
  firstAidTotalField.setText(getValue(character.technique_skilllist[0].First_Aid[0].total));
  forgeryField.setText(getValue(character.technique_skilllist[0].Forgery[0].level));
  forgeryTotalField.setText(getValue(character.technique_skilllist[0].Forgery[0].total));
  landVehicleTechField.setText(getValue(character.technique_skilllist[0].Land_Vehicle_Tech[0].level));
  landVehicleTechTotalField.setText(getValue(character.technique_skilllist[0].Land_Vehicle_Tech[0].total));
  paintDrawSculptField.setText(getValue(character.technique_skilllist[0].Paint_Draw_Sculpt[0].level));
  paintDrawSculptTotalField.setText(getValue(character.technique_skilllist[0].Paint_Draw_Sculpt[0].total));
  paramedicField.setText(getValue(character.technique_skilllist[0].Paramedic__x2_[0].level));
  paramedicTotalField.setText(getValue(character.technique_skilllist[0].Paramedic__x2_[0].total));
  photographyField.setText(getValue(character.technique_skilllist[0].Photography_Film[0].level));
  photographyTotalField.setText(getValue(character.technique_skilllist[0].Photography_Film[0].total));
  pickLockField.setText(getValue(character.technique_skilllist[0].Pick_Lock[0].level));
  pickLockTotalField.setText(getValue(character.technique_skilllist[0].Pick_Lock[0].total));
  pickPocketField.setText(getValue(character.technique_skilllist[0].Pick_Pocket[0].level));
  pickPocketTotalField.setText(getValue(character.technique_skilllist[0].Pick_Pocket[0].total));
  seaVehicleTechField.setText(getValue(character.technique_skilllist[0].Sea_Vehicle_Tech[0].level));
  seaVehicleTechTotalField.setText(getValue(character.technique_skilllist[0].Sea_Vehicle_Tech[0].total));
  weaponstechField.setText(getValue(character.technique_skilllist[0].Weaponstech[0].level));
  weaponstechTotalField.setText(getValue(character.technique_skilllist[0].Weaponstech[0].total));

  headArmorField.setText(getValue(character.armor_head_label).replace(/[^\x00-\x7F]/g, ""));
  headArmorSpField.setText(getValue(character.armor_head_sp));
  headArmorPenalityField.setText(getValue(character.armor_head_penalty));
  bodyArmorField.setText(getValue(character.armor_body_label).replace(/[^\x00-\x7F]/g, ""));
  bodyArmorSpField.setText(getValue(character.armor_body_sp));
  bodyArmorPenalityField.setText(getValue(character.armor_body_penalty));
  shieldArmorField.setText(getValue(character.armor_shield_label).replace(/[^\x00-\x7F]/g, ""));
  shieldArmorSpField.setText(getValue(character.armor_shield_hp));

  // Go through attacks and add up to 6 to Weapons
  // Ignore "- Autofire" and "- Supressive Fire" and "- Shell"
  const attacks = character.attacks[0] || {};
  const attacksKeys = Object.keys(attacks);
  let weaponIndex = 1;
  if (attacksKeys) {
    attacksKeys.forEach((key) => {
      const item = attacks[key][0];

      const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
      const ammo = getValue(item.ammo);
      const skill = getValue(item.skill);
      let link = '';
      if (item.link && item.link.length) {
        link = item.link[0].recordname[0] || '';
      }

      // Look in inventory with matchning link for item to get RoF
      let rof = '';
      let damage = '';
      let subtype = '';
      const recordNameMatch = link.match(/(id-\d+)/);
      let recordName = '';
      if (recordNameMatch && recordNameMatch.length) {
        recordName = recordNameMatch[0];
      }
      const inventorylist = character.inventorylist[0];
      if (Object.keys(inventorylist).includes(recordName)) {
        const item = inventorylist[recordName][0];
        rof = getValue(item.rof);
        damage = getValue(item.damage);
        subtype = getValue(item.subtype);
      }
      else {
        // These skills have set RoF
        if (['Brawling', 'Aikido', 'Taekwondo', 'Karate', 'Judo'].includes(skill)) {
          rof = '2';
          const bodyStat = parseInt(getValue(character.body_current), 10);
          if (skill == 'Brawling') {
            let hasCyberArm = false;
            const leftArm = getValue(character.left_cyberarm_name);
            const rightArm = getValue(character.right_cyberarm_name);
            if ((leftArm && leftArm !== '' && !leftArm.includes("Meat"))
              || (rightArm && rightArm !== '' && !rightArm.includes("Meat"))) {
              hasCyberArm = true;
            }
            damage = '1d6';
            if (hasCyberArm || bodyStat >= 5 && bodyStat <= 6) {
              damage = '2d6';
            }
            else if (bodyStat >= 7 && bodyStat <= 10) {
              damage = '3d6';
            }
            else if (bodyStat >= 11) {
              damage = '4d6'
            }
          }
          else {
            damage = '1d6 halfsp';
            if (bodyStat >= 5 && bodyStat <= 6) {
              damage = '2d6 halfsp';
            }
            else if (bodyStat >= 7 && bodyStat <= 10) {
              damage = '3d6 halfsp';
            }
            else if (bodyStat >= 11) {
              damage = '4d6 halfsp'
            }
          }
        }
      }

      // Only add if index < 6 (only 6 slots in teh sheet)
      // Ignore specials / Brawling / Martial Arts
      if (weaponIndex <= 6 && !name.includes(' - ')) {
        const nameField =  form.getTextField(`WEAPONRow${weaponIndex}`);
        const dmgField = form.getTextField(`DMGRow${weaponIndex}`);
        const ammoField = form.getTextField(`AMMORow${weaponIndex}`);
        const rofField = form.getTextField(`ROFRow${weaponIndex}`);
        const notesField = form.getTextField(`NOTESRow${weaponIndex}`);
        nameField.setText(name);
        dmgField.setText(damage);
        ammoField.setText(ammo);
        rofField.setText(rof);
        notesField.setText(subtype);
        weaponIndex++;
      }
    });
  }

  aliasesField.setText(getValue(character.aliases).replaceAll("\\n", "\n"));
  improvementPointsField.setText(getValue(character.improvement_points));
  reputationField.setText(getValue(character.reputation_current));
  eventsField.setText(getValue(character.reputation_events).replaceAll("\\n", "\n"));

  culturalOriginsField.setText(getValue(character.cultural_origins).replaceAll("\\n", "\n"));
  personalityField.setText(getValue(character.personality).replaceAll("\\n", "\n"));
  clothingStyleField.setText(getValue(character.clothing_style).replaceAll("\\n", "\n"));
  hairstyleField.setText(getValue(character.hairstyle).replaceAll("\\n", "\n"));
  valueMostField.setText(getValue(character.values).replaceAll("\\n", "\n"));
  whoValueMostField.setText(getValue(character.valued_person).replaceAll("\\n", "\n"));
  valuedPossessionField.setText(getValue(character.valued_possession).replaceAll("\\n", "\n"));
  familyBackgroundField.setText(getValue(character.family_background).replaceAll("\\n", "\n"));
  childhoodEnvField.setText(getValue(character.childhood_environment).replaceAll("\\n", "\n"));
  familyCrisisField.setText(getValue(character.family_crisis).replaceAll("\\n", "\n"));
  lifeGoalsField.setText(getValue(character.life_goals).replaceAll("\\n", "\n"));
  feelingsAboutPeopleField.setText(getValue(character.disposition).replaceAll("\\n", "\n"));
  
  // Set friends, love affairs, enemies based on new lines in the fields
  const friends = getValue(character.friends).split('\\n');
  friends.forEach((friend, index) => {
    if (index < 3) {
      const friendField = form.getTextField(`Friend ${index+1}`);
      friendField.setText(friend);
    }
  })
  const loveAffairs = getValue(character.love_affairs).split('\\n');
  loveAffairs.forEach((loveAffair, index) => {
    if (index < 3) {
      const loveAffairField = form.getTextField(`Love Affair ${index+1}`);
      loveAffairField.setText(loveAffair);
    }
  })
  const enemies = getValue(character.enemies).split('\\n');
  enemies.forEach((enemy, index) => {
    if (index < 3) {
      const field = form.getTextField(`Who ${index+1}`);
      field.setText(enemy);
    }
  })
  const causes = getValue(character.enemies_causes).split('\\n');
  causes.forEach((enemy, index) => {
    if (index == 0) {
      const field = form.getTextField('What Caused It');
      field.setText(enemy);
    }
    else if (index < 3) {
      const field = form.getTextField(`What Caused it ${index+1}`);
      field.setText(enemy);
    }
  })
  const throws = getValue(character.enemies_throw).split('\\n');
  throws.forEach((enemy, index) => {
    if (index < 3) {
      const field = form.getTextField(`Throw At You ${index+1}`);
      field.setText(enemy);
    }
  })
  const happens = getValue(character.enemies_happen).split('\\n');
  happens.forEach((enemy, index) => {
    if (index < 3) {
      const field = form.getTextField(`Happen ${index+1}`);
      field.setText(enemy);
    }
  })

  housingField.setText(getValue(character.housing));
  rentField.setText(getValue(character.rent));
  lifestyleField.setText(getValue(character.lifestyle));

  roleLifepathField.setText(getValue(character.role_lifepath).replaceAll("\\n", "\n"));

  const coins = character.coins
  let cash = '0eb';
  if (coins && coins.length) {
    // Only supports EB in slot 1
    const slot1 = coins[0].slot1;
    if (slot1 && slot1.length) {
      const amount = getValue(slot1[0].amount);
      const name = getValue(slot1[0].name);
      cash = `${amount}${name}`
    }
  }
  cashField.setText(cash);

  // Go through all inventory items
  // Make one string for ammo
  let ammo = '';
  let fashion = '';
  const inventorylist = character.inventorylist && character.inventorylist.length 
    ? character.inventorylist[0] : {};
  const inventorylistKeys = Object.keys(inventorylist);
  let gearIndex = 1;
  if (inventorylistKeys) {
    inventorylistKeys.forEach((key) => {
      const item = inventorylist[key][0];

      const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
      const type = getValue(item.type);
      const subtype = getValue(item.subtype);
      const isEquipped = getValue(item.carried) === '2';
      const count = getValue(item.count);

      // Only show here if not equipped and not ammo and not fashion and < 19 (only 18 slots)
      if (gearIndex < 19 
          && !isEquipped && !type.includes("Ammo") && !type.includes("Ammunition")
          && !subtype.includes("Fashion")) {
        const gearField = form.getTextField(`Gear ${gearIndex}`);
        const notesField = form.getTextField(`Gear Notes ${gearIndex}`);
        if (count !== '' && count != '0' && count !== '1') {
          gearField.setText(`${name} (x${count})`);
        }
        else {
          gearField.setText(name);
        }
        notesField.setText(`${type} (${subtype})`);
        
        gearIndex++;
      }
      else if (type.includes("Ammo") || type.includes("Ammunition")) {
        // Add to ammo string
        if (ammo !== '') {
          ammo = `${ammo}, `;
        }
        ammo = `${ammo}${name} (x${count})`;
      }
      else if (subtype.includes("Fashion")) {
        // Add to fashion string
        if (fashion !== '') {
          fashion = `${fashion}, `;
        }
        fashion = `${fashion}${name} (x${count})`;
      }
    });
  }

  // Append fashion field to fashion string, too
  if (fashion !== '') {
    fashion = `${fashion}, `;
  }
  fashion = `${fashion}${getValue(character.fashion).replaceAll("\\n", "\n")}`;
  
  ammunitionField.setText(ammo);
  fashionField.setText(fashion);

  // Go through cyberware of each type
  const audioSuiteField = form.getCheckBox('Audio Box');
  const cyberAudio = getValue(character.cyberaudio_suite_name);
  if (cyberAudio && cyberAudio !== '') {
    audioSuiteField.check();
    const cyberList = character.cyberaudio && character.cyberaudio.length 
    ? character.cyberaudio[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 4) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`Audio ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const leftEyeField = form.getCheckBox('L Eye Box');
  const leftEye = getValue(character.left_cybereye_name);
  if (leftEye && leftEye !== '') {
    leftEyeField.check();
    const cyberList = character.left_cyberoptics && character.left_cyberoptics.length 
    ? character.left_cyberoptics[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 4) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`L Eye ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const rightEyeField = form.getCheckBox('R Eye Box');
  const rightEye = getValue(character.right_cybereye_name);
  if (rightEye && rightEye !== '') {
    rightEyeField.check();
    const cyberList = character.right_cyberoptics && character.right_cyberoptics.length 
    ? character.right_cyberoptics[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 4) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`R Eye ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const leftArmField = form.getCheckBox('L Arm Box');
  const leftArm = getValue(character.left_cyberarm_name);
  if (leftArm && leftArm !== '') {
    if (!leftArm.includes("Meat"))
      leftArmField.check();
    const cyberList = character.left_cyberarm && character.left_cyberarm.length 
    ? character.left_cyberarm[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 5) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`L Arm ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const rightArmField = form.getCheckBox('R Arm Box');
  const rightArm = getValue(character.right_cyberarm_name);
  if (rightArm && rightArm !== '') {
    if (!rightArm.includes("Meat"))
      rightArmField.check();
    const cyberList = character.right_cyberarm && character.right_cyberarm.length 
    ? character.right_cyberarm[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 5) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`R Arm ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const cyberlinkField = form.getCheckBox('Link Box');
  const cyberlink = getValue(character.neural_link_name);
  if (cyberlink && cyberlink !== '') {
    cyberlinkField.check();
    const cyberList = character.neuralware && character.neuralware.length 
    ? character.neuralware[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 6) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`NLink ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const leftLegField = form.getCheckBox('L Leg Box');
  const leftLeg = getValue(character.left_cyberleg_name);
  if (leftLeg && leftLeg !== '') {
    if (!leftLeg.includes("Meat"))
      leftLegField.check();
    const cyberList = character.left_cyberleg && character.left_cyberleg.length 
    ? character.left_cyberleg[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 4) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`L Leg ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const rightLegField = form.getCheckBox('R Leg Box');
  const rightLeg = getValue(character.right_cyberleg_name);
  if (rightLeg && rightLeg !== '') {
    if (!rightLeg.includes("Meat"))
      rightLegField.check();
    const cyberList = character.right_cyberleg && character.right_cyberleg.length 
    ? character.right_cyberleg[0] : {};
    const cyberListKeys = Object.keys(cyberList);
    let cyberIndex = 1;
    if (cyberListKeys) {
      cyberListKeys.forEach((key) => {
        if (cyberIndex < 4) {
          const item = cyberList[key][0];
          const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
          const cyberField = form.getTextField(`R Leg ${cyberIndex}`)
          cyberField.setText(name);
          cyberIndex++;
        }
      });
    }
  }

  const internalList = character.internal && character.internal.length 
  ? character.internal[0] : {};
  const internalListKeys = Object.keys(internalList);
  let cyberIndex = 1;
  if (internalListKeys) {
    internalListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = internalList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`IC ${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const externalList = character.external && character.external.length 
  ? character.external[0] : {};
  const externalListKeys = Object.keys(externalList);
  cyberIndex = 1;
  if (externalListKeys) {
    externalListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = externalList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        let cyberField = form.getTextField(`EC 1`);
        if (cyberIndex > 1) {
          cyberField = form.getTextField(`EC${cyberIndex}`);
        }
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const fashionwareList = character.fashionware && character.fashionware.length 
  ? character.fashionware[0] : {};
  const fashionwareListKeys = Object.keys(fashionwareList);
  cyberIndex = 1;
  if (fashionwareListKeys) {
    fashionwareListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = fashionwareList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`FW${cyberIndex}`)
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const borgwareList = character.borgware && character.borgware.length 
  ? character.borgware[0] : {};
  const borgwareListKeys = Object.keys(borgwareList);
  cyberIndex = 1;
  if (borgwareListKeys) {
    borgwareListKeys.forEach((key) => {
      if (cyberIndex < 8) {
        const item = borgwareList[key][0];
        const name = getValue(item.name).replace(/[^\x00-\x7F]/g, "");
        const cyberField = form.getTextField(`Borg${cyberIndex}`)
        // Replace unicode characters to prevent errors
        cyberField.setText(name);
        cyberIndex++;
      }
    });
  }

  const pdfBytes = await pdfDoc.save();

  // Trigger the browser to download the PDF document
  download(pdfBytes, `${name}.pdf`, "application/pdf");
}

const getSkill = (character: any, skillName: string): { level: string, total: string } => {
  const skills = character.skillsCol ? character.skillsCol[0] : {};
  const skillsKeys = Object.keys(skills);
  let levelRes = "";
  let baseRes = "";
  skillsKeys.forEach(key => {
    const skillGroup = skills[key][0];
    const listSkillSpecifics = skillGroup.listSkillSpecifics ? skillGroup.listSkillSpecifics[0] : {};
    const listSkillKeys = Object.keys(listSkillSpecifics);
    listSkillKeys.forEach(skillkey => {
      const skillObj = listSkillSpecifics[skillkey][0];
      const name = skillObj.skillName ? skillObj.skillName[0]._ : '';
      const level = skillObj.skillLvl ? skillObj.skillLvl[0]._ : ''; 
      const base = skillObj.skillBase ? skillObj.skillBase[0]._ : ''; 
      if (name === skillName) {
        levelRes = level;
        baseRes = base;
      }
      // Check subskills
      const listSubSkillSpecifics = skillObj.listSubSkillSpecifics ? skillObj.listSubSkillSpecifics[0] : {};
      const listSubSkillKeys = Object.keys(listSubSkillSpecifics);
      listSubSkillKeys.forEach(subSkillKey => {
        const subSkillObj = listSubSkillSpecifics[subSkillKey][0];
        const subname = subSkillObj.skillName ? subSkillObj.skillName[0]._ : '';
        const sublevel = subSkillObj.skillLvl ? subSkillObj.skillLvl[0]._ : ''; 
        const subbase = subSkillObj.skillBase ? subSkillObj.skillBase[0]._ : ''; 
        if (subname === skillName) {
          levelRes = sublevel;
          baseRes = subbase;
        }
      });
    });
  });

  return { level: levelRes, total: baseRes };
}

const setSubSkills = (character: any, skillName: string, fields: PDFTextField[], ignore:string): void => {
  const skills = character.skillsCol ? character.skillsCol[0] : {};
  const skillsKeys = Object.keys(skills);
  let count = 0;
  let index = 0;
  const max = fields.length / 3;
  skillsKeys.forEach(key => {
    const skillGroup = skills[key][0];
    const listSkillSpecifics = skillGroup.listSkillSpecifics ? skillGroup.listSkillSpecifics[0] : {};
    const listSkillKeys = Object.keys(listSkillSpecifics);
    listSkillKeys.forEach(skillkey => {
      const skillObj = listSkillSpecifics[skillkey][0];
      const name = skillObj.skillName ? skillObj.skillName[0]._ : '';
      if (name === skillName) {
        // Check subskills
        const listSubSkillSpecifics = skillObj.listSubSkillSpecifics ? skillObj.listSubSkillSpecifics[0] : {};
        const listSubSkillKeys = Object.keys(listSubSkillSpecifics);
        listSubSkillKeys.forEach(subSkillKey => {
          const subSkillObj = listSubSkillSpecifics[subSkillKey][0];
          const subname = subSkillObj.skillName ? subSkillObj.skillName[0]._ : '';
          if (subname !== ignore) {
            const sublevel = subSkillObj.skillLvl ? subSkillObj.skillLvl[0]._ : ''; 
            const subbase = subSkillObj.skillBase ? subSkillObj.skillBase[0]._ : ''; 
            
            // Set next field
            let field = fields[index];
            field.setText(subname);
            index = index + 1;
            field = fields[index];
            field.setText(sublevel);
            index = index + 1;
            field = fields[index];
            field.setText(subbase);
            index = index + 1;

            count += 1;

            if (count >= (max - 1)) {
              return;
            }
          }
        });
      }
    });
  });

  return;
}

const typeToValue = (geartype: string): string => {
  if (geartype === "item_ice") return "Black Ice";
  if (geartype === "item_armor") return "Armor";
  if (geartype === "item_ranged") return "Ranged Weapon";
  if (geartype === "item_melee") return "Melee Weapon";
  if (geartype === "item_vehicle") return "Vehicle";
  if (geartype === "item_programsHardware") return "Cyberdeck Program or Hardware";
  if (geartype === "item_cyberware") return "Cyberware";
  if (geartype === "item_cyberdeck") return "Cyberdeck";
  if (geartype === "item_general") return "General Gear";
  if (geartype === "item_gear") return "General Gear";
  if (geartype === "item_demon") return "Demon";
  return "General Gear";
}

export default fillForm;