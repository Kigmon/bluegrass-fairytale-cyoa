
export type PlaceCategory = 'coffee'|'bakery'|'cafe'|'outdoor'|'garden'|'winery'|'brewery'|'music'|'food'
export type Place = { id:string; name:string; category:PlaceCategory; address:string; url?:string; lat?:number; lng?:number }
export const BASE_ORIGIN={ lat:37.89015068, lng:-84.77212067 }
export const PLACES:Place[]=[
  { id:'acup', name:'A Cup of Common Wealth', category:'coffee', address:'105 Eastern Ave, Lexington, KY 40508', url:'https://www.acupofcommonwealth.com', lat:38.0417457, lng:-84.4913757 },
  { id:'northlime', name:'North Lime Coffee & Donuts (Greyline)', category:'bakery', address:'101 W Loudon Ave Suite 160, Lexington, KY 40508', url:'https://northlime.net' },
  { id:'third', name:'Third Street Stuff & Coffee', category:'coffee', address:'257 N Limestone, Lexington, KY 40507', url:'https://www.thirdststuff.com' },
  { id:'lussi', name:'Lussi Brown Coffee Bar', category:'coffee', address:'114 Church St, Lexington, KY 40507', url:'https://www.lussibrowncoffee.com' },
  { id:'midwaybakery', name:'Midway Bakery & Café', category:'bakery', address:'510 S Winter St, Midway, KY 40347', url:'https://www.themidwaybakery.com' },
  { id:'shaker', name:'Shaker Village of Pleasant Hill', category:'outdoor', address:'3501 Lexington Rd, Harrodsburg, KY 40330', url:'https://shakervillageky.org' },
  { id:'ravenrun', name:'Raven Run Nature Sanctuary', category:'outdoor', address:'3885 Raven Run Way, Lexington, KY 40515', url:'https://www.lexingtonky.gov/playing/parks-natural-areas/natural-areas/raven-run-nature-sanctuary' },
  { id:'mcconnell', name:'McConnell Springs Park', category:'outdoor', address:'416 Rebmann Ln, Lexington, KY 40504', url:'https://www.lexingtonky.gov/playing/parks-natural-areas/natural-areas/mcconnell-springs-park' },
  { id:'arboretum', name:'The Arboretum, State Botanical Garden of KY', category:'garden', address:'500 Alumni Dr, Lexington, KY 40503', url:'https://arboretum.ca.uky.edu' },
  { id:'yukoen', name:'Yuko-En on the Elkhorn (Japanese Garden)', category:'garden', address:'700 Cincinnati Pike, Georgetown, KY 40324', url:'https://yukoen.com' },
  { id:'equus', name:'Equus Run Vineyards', category:'winery', address:'1280 Moores Mill Rd, Midway, KY 40347', url:'https://equusrunvineyards.com' },
  { id:'wildside', name:'Wildside Winery', category:'winery', address:'5500 Troy Pike, Versailles, KY 40383', url:'https://www.wildsidewinery.com' },
  { id:'prodigy', name:'Prodigy Vineyards & Winery', category:'winery', address:'4686 Versailles Rd, Frankfort, KY 40601', url:'https://prodigyvineyards.com', lat:38.1406489, lng:-84.784952 },
  { id:'rising', name:'Rising Sons Home Farm Winery', category:'winery', address:'975 Frankfort Rd, Lawrenceburg, KY 40342', url:'https://risingsonswinery.com' },
  { id:'firstvine', name:'First Vineyard Winery (Historic)', category:'winery', address:'5800 Sugar Creek Pike, Nicholasville, KY 40356', url:'https://firstvineyard.net' },
  { id:'talon', name:'Talon Winery & Vineyards', category:'winery', address:'7086 Tates Creek Rd, Lexington, KY 40515', url:'https://www.talonwine.com' },
  { id:'westsixth', name:'West Sixth Brewing (Bread Box)', category:'brewery', address:'501 W 6th St, Lexington, KY 40508', url:'https://www.westsixth.com/lexington' },
  { id:'ethereal', name:'Ethereal Brewing (Distillery District)', category:'brewery', address:'1224 Manchester St, Lexington, KY 40504', url:'https://www.etherealbrew.com' },
  { id:'mirror', name:'Mirror Twin Brewing', category:'brewery', address:'725 National Ave, Lexington, KY 40502', url:'https://www.mirrortwinbrewing.com' },
  { id:'burl', name:'The Burl', category:'music', address:'375 Thompson Rd, Lexington, KY 40508', url:'https://www.theburlky.com' },
  { id:'manchester', name:'Manchester Music Hall', category:'music', address:'899 Manchester St, Lexington, KY 40508', url:'https://www.manchestermusichall.com' },
  { id:'wallace', name:'Wallace Station Deli & Bakery', category:'food', address:'3854 Old Frankfort Pike, Versailles, KY 40383', url:'https://www.wallacestation.com' },
  { id:'heirloom', name:'Heirloom (Midway)', category:'food', address:'125 E Main St, Midway, KY 40347', url:'https://www.heirloommidway.com' },
  { id:'jeffruby', name:"Jeff Ruby's Steakhouse (Lexington)", category:'food', address:'101 W Vine St, Lexington, KY 40507', url:'https://www.jeffruby.com/lexington' },
  { id:'carsons', name:"Carson's Food & Drink (On Main)", category:'food', address:'362 E Main St, Lexington, KY 40507', url:'https://carsonsfoodanddrink.com' },
  { id:'bluedoor', name:'Blue Door Smokehouse', category:'food', address:'819 National Ave Suite 140, Lexington, KY 40502', url:'https://bluedoorsmokehouse.com' },
  { id:'goodfellas', name:'Goodfellas Pizzeria (Distillery District)', category:'food', address:'1228 Manchester St, Lexington, KY 40504', url:'https://www.goodfellaspizzeria.com/locations' }
]
