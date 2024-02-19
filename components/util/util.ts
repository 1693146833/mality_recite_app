export function checkInput2CreateCard(input: {
  front: string;
  back: string;
  hint?: string;
  tag: string;
}): boolean {
  if (
    input.front.length === 0 ||
    input.back.length === 0 ||
    input.tag.length === 0
  ) {
    return false;
  }
  return true;
}
export function createdTimeStamp(): number {
  return new Date().getTime();
}
export function createduuid(): string {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString();
}
export function getCardById(cardGroups: any, cardId: string, groupId: string) {
  const cardGroup = cardGroups.find(
    (cardGroup: any) => cardGroup.id === groupId
  );
  const card = cardGroup.cardList.find((card: any) => card.id === cardId);
  const newCard = { ...card, groupName: cardGroup.name };
  return newCard;
}
export function getCardList(cardGroups: any, groupId: string) {
  const cardGroup = cardGroups.find(
    (cardGroup: any) => cardGroup.id === groupId
  );
  return cardGroup.cardList;
}
export function getCardGroup(cardGroups: any, groupId: string) {
  const cardGroup = cardGroups.find(
    (cardGroup: any) => cardGroup.id === groupId
  );
  return cardGroup;
}
export function updateCardTimeStampAccordingToProgress(
  progress: number
): number {
  const timePeriod = [1, 3, 7];
  let now = createdTimeStamp();
  if (progress === 0) {
    return now + 86400 * timePeriod[0] * 1000;
  } else if (progress === 1) {
    return now + 86400 * timePeriod[1] * 1000;
  } else if (progress === 2) {
    return now + 86400 * timePeriod[2] * 1000;
  }
  return now;
}
export function createDaysForHeatmap(startday?:string) {
  const startDate = new Date(startday||new Date().toISOString().split('T')[0]);
const endDate = new Date(startDate.getTime());
endDate.setMonth(startDate.getMonth() + 3);

const commitsData = [];
let currentDate = new Date(startDate.getTime());

while (currentDate <= endDate) {
  commitsData.push({
    date: currentDate.toISOString().split('T')[0],
    count: 0,
  });
  currentDate.setDate(currentDate.getDate() + 1);
}
return commitsData;
}
export function getMonthLabel(commitsData:{ date: string; count: number; }[]){
  let mounth=commitsData.map((item)=>{
    return item.date.split('-')[1];
  })
  mounth=Array.from(new Set(mounth));
  
  return mounth;
}