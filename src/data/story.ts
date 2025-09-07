
export type StoryStep={ id:string; title:string; body:string; options:Array<{id:string;label:string;categories:string[]}> }
export const STORY_STEPS:StoryStep[]=[
  { id:'arrival', title:'Arrival at the Riverbend Kingdom', body:`At **Cummings Ferry RV Park**, the Kentucky River curls like a silver ribbon and the hills hum a soft blue. As the sun yawns (around 4pm), a friendly firefly herald whispers: *Welcome, traveler. Six nights of whimsy await.*`, options:[
    { id:'first_dinner', label:'Seek a hearty supper to earn favor with the Evening Elves.', categories:['food'] },
    { id:'golden_hour', label:'Chase the golden hour at a nearby overlook or riverside path.', categories:['outdoor','garden'] },
    { id:'first_sip', label:'Pledge fealty to the Vine & Barley Courts (a winery or brewery).', categories:['winery','brewery'] }
  ]},
  { id:'morning', title:'Dawn of the Bean Knights', body:`Morning mist hovers over the pastures. To unlock the day’s quests, consult the **Bean Knights** and **Pastry Guild**.`, options:[
    { id:'coffee', label:'Swear the Oath of Aroma (find coffee).', categories:['coffee'] },
    { id:'bakery', label:'Petition the Pastry Guild (bakery).', categories:['bakery'] },
    { id:'cafe', label:'Visit a friendly café for light bites.', categories:['cafe','coffee','bakery'] }
  ]},
  { id:'midday', title:'Quests of Meadow & Stone', body:`Trails, springs, and story-soaked sites reveal themselves. Choose your wandering.`, options:[
    { id:'outdoor', label:'Tread the Forest Path (hikes & nature).', categories:['outdoor'] },
    { id:'garden', label:'Seek the Garden Oracles (arboretum & Japanese garden).', categories:['garden'] },
    { id:'winery', label:'Visit a Quiet Vineyard for a tasting flight.', categories:['winery'] }
  ]},
  { id:'afternoon', title:'Afterglow & Toasts', body:`As shadows stretch, the Vine Court and the Barley Council convene.`, options:[
    { id:'winery2', label:'Swirl and sip at a winery.', categories:['winery'] },
    { id:'brewery', label:'Sample a flight at a brewery.', categories:['brewery'] },
    { id:'soft', label:'Stroll a historic lane or riverbank.', categories:['outdoor','garden'] }
  ]},
  { id:'evening', title:'Feasts & Fiddles', body:`Night falls like velvet. Minstrels tune their strings; kitchens warm their hearths.`, options:[
    { id:'dine', label:'Dine like nobles (great restaurants).', categories:['food'] },
    { id:'music', label:'Follow the fireflies to live music.', categories:['music'] },
    { id:'brew2', label:'End with a nightcap at a brewery.', categories:['brewery'] }
  ]}
]
