
import React, { useEffect, useMemo, useState } from 'react'
import { MapPin, ArrowRight, ArrowLeft, Sparkles, ExternalLink, Compass } from 'lucide-react'
import { PLACES, Place, PlaceCategory, BASE_ORIGIN } from './data/places'
import { geocodeIfNeeded, haversineMiles, mapsLinkFor } from './lib/geo'
import { STORY_STEPS } from './data/story'
import { svgForScene } from './lib/image'

type Choice = { placeId: string; when: string }
type Geo = { ok: boolean; lat: number; lng: number; source: 'gps'|'camp' }

const START_DATE = new Date('2025-09-09T16:00:00-04:00')
const END_DATE = new Date('2025-09-15T10:00:00-04:00')

const categoryEmoji: Record<PlaceCategory, string> = {
  coffee: '☕', bakery: '🧁', cafe: '🥐', outdoor: '🥾', garden: '🌺', winery: '🍷', brewery: '🍺', music: '🎶', food: '🍽️'
}

function useUserGeo(): Geo {
  const [geo, setGeo] = useState<Geo>({ ok: false, lat: BASE_ORIGIN.lat, lng: BASE_ORIGIN.lng, source: 'camp' })
  useEffect(()=>{
    if (!('geolocation' in navigator)) return
    const id = navigator.geolocation.watchPosition(
      pos => setGeo({ ok: true, lat: pos.coords.latitude, lng: pos.coords.longitude, source: 'gps' }),
      _err => setGeo({ ok: false, lat: BASE_ORIGIN.lat, lng: BASE_ORIGIN.lng, source: 'camp' }),
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 8000 }
    )
    return ()=> navigator.geolocation.clearWatch(id)
  }, [])
  return geo
}

function usePlaceCoords() {
  const [coords, setCoords] = useState<Record<string, {lat:number; lng:number}>>({})
  useEffect(()=>{
    (async ()=>{
      for (const p of PLACES) {
        if (coords[p.id]) continue
        if (p.lat != null && p.lng != null) setCoords(prev => ({ ...prev, [p.id]: {lat: p.lat!, lng: p.lng!} }))
        else {
          const ll = await geocodeIfNeeded(p.address)
          if (ll) setCoords(prev => ({ ...prev, [p.id]: ll }))
        }
      }
    })()
  }, [])
  return coords
}

function Hero({ scene, caption }: { scene: 'arrival'|'morning'|'midday'|'afternoon'|'evening', caption: string }) {
  const svg = useMemo(()=> svgForScene(scene, scene + caption, caption), [scene, caption])
  return <div className="w-full rounded-2xl overflow-hidden shadow-soft border bg-white"><div className="aspect-[16/9] w-full" dangerouslySetInnerHTML={{__html: svg}}/></div>
}

function Card({children, className=''}: {children: React.ReactNode, className?: string}){
  return <div className={`rounded-2xl shadow-soft border bg-white p-4 ${className}`}>{children}</div>
}

type PlaceWithDist = Place & { distMiles?: number }

function ChoiceList({ geo, coords, categories, onPick }:{ geo: Geo, coords: Record<string,{lat:number;lng:number}>, categories: PlaceCategory[], onPick: (p: Place)=>void }){
  const within: PlaceWithDist[] = PLACES
    .filter(p => categories.includes(p.category))
    .map(p => {
      const ll = coords[p.id]
      const dist = ll ? haversineMiles({lat: geo.lat, lng: geo.lng}, ll) : undefined
      return { ...p, distMiles: dist }
    })
    .filter(p => (p.distMiles ?? 0) <= 40 || p.distMiles == null)
    .sort((a,b) => (a.distMiles ?? 999) - (b.distMiles ?? 999))

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {within.map(p => (
        <Card key={p.id}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-100 grid place-content-center text-emerald-700 text-xl">{categoryEmoji[p.category]}</div>
            <div className="flex-1">
              <div className="font-semibold text-lg">{p.name}</div>
              <div className="text-sm text-gray-600">{p.address}</div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 border">
                  <Compass className="w-4 h-4" /> {p.distMiles != null ? `${p.distMiles.toFixed(1)} mi away` : 'distance loading…'}
                </span>
                <a className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 border hover:bg-gray-50" href={mapsLinkFor({ address: p.address, lat: coords[p.id]?.lat, lng: coords[p.id]?.lng })} target="_blank" rel="noreferrer">
                  <MapPin className="w-4 h-4" /> Google Maps <ExternalLink className="w-3 h-3" />
                </a>
                {p.url ? <a className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 border hover:bg-gray-50" href={p.url} target="_blank" rel="noreferrer">Website <ExternalLink className="w-3 h-3" /></a> : null}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button onClick={()=> onPick(p)} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">
              Choose this quest <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      ))}
      {within.length === 0 && <Card>No nearby options found. Try enabling location or expanding categories.</Card>}
    </div>
  )
}

export default function App(){
  const geo = useUserGeo()
  const coords = usePlaceCoords()

  const [history, setHistory] = useState<string[]>(['arrival'])
  const currentId = history[history.length-1]
  const current = STORY_STEPS.find(s => s.id === currentId) ?? STORY_STEPS[0]

  const [choices, setChoices] = useState<Choice[]>([])

  const pushStep = (id: string) => setHistory(h => [...h, id])
  const goBack = () => setHistory(h => h.length > 1 ? h.slice(0, -1) : h)
  const goForward = () => {
    const order = STORY_STEPS.map(s=>s.id)
    const idx = order.indexOf(currentId)
    const next = order[(idx + 1) % order.length]
    pushStep(next)
  }

  const now = new Date()
  const isDuringTrip = now >= START_DATE && now <= END_DATE

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight"><span className="mr-2">📖</span>Bluegrass Fairytale — CYOA</h1>
        <div className="text-sm text-gray-600">{geo.source === 'gps' ? 'Using your current location' : 'Using RV Park as starting point'}</div>
      </header>

      <Hero scene={current.id as any} caption={current.title} />

      <Card>
        <div className="prose max-w-none">
          <h2 className="mt-0">{current.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: current.body.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {current.options.map(opt => (
            <button key={opt.id} onClick={()=> pushStep(pickNextStepId(current.id))} className="rounded-2xl border p-4 text-left hover:shadow-soft transition bg-emerald-50/60">
              <div className="font-semibold">{opt.label}</div>
              <div className="mt-2 text-sm text-gray-600">Tap to browse {opt.categories.join(', ')} nearby ↓</div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-3"><Sparkles className="w-5 h-5 text-emerald-700" /><div className="font-semibold">Nearby quests that match this chapter</div></div>
        <ChoiceList geo={geo} coords={coords} categories={Array.from(new Set(current.options.flatMap(o => o.categories as PlaceCategory[])))} onPick={(p)=>{ setChoices(prev => [...prev, { placeId: p.id, when: new Date().toISOString() }]); goForward(); }} />
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-lg mb-2">Your story so far</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {choices.map((c,i)=>{ const p = PLACES.find(x=>x.id===c.placeId)!; return <li key={i}><span className="font-medium">{p.name}</span> — {new Date(c.when).toLocaleString()}</li> })}
            {choices.length===0 && <li className="text-gray-600">No choices yet. Pick a quest above to weave into your tale.</li>}
          </ol>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg mb-2">Trip window</h3>
          <p className="text-sm text-gray-700">Sep 9, 2025 @ 4:00 pm → Sep 15, 2025 @ 10:00 am (America/New_York)</p>
          <p className="text-sm">{isDuringTrip ? 'You are within the enchanted window—adventure multipliers active!' : 'You are previewing outside the dates. Bookmark this spellbook for your trip.'}</p>
        </Card>
      </section>

      <footer className="flex items-center justify-between pt-2 pb-8">
        <div className="flex gap-2">
          <button onClick={goBack} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border bg-white hover:bg-gray-50"><ArrowLeft className="w-4 h-4"/> Back</button>
          <button onClick={goForward} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700">Next <ArrowRight className="w-4 h-4"/></button>
        </div>
        <div className="text-xs text-gray-500">Distances are line-of-sight. Tap Google Maps for live drive time.</div>
      </footer>
    </div>
  )
}

function pickNextStepId(currentId: string){
  const order = STORY_STEPS.map(s=>s.id)
  const idx = order.indexOf(currentId)
  return order[(idx + 1) % order.length]
}
