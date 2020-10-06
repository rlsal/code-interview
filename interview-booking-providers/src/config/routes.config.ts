import { RSA_NO_PADDING } from "constants";
import { Application, Request, Response } from "express";
import { ResponseStatus } from "../utils/consts";
const providers: Provider[] = require('../assets/providers.json');


const appData: AppData = {}
providers.forEach((p) => {
    if (!appData[p.name]) {
        appData[p.name] = p
        appData[p.name].specialties = appData[p.name].specialties.map(s => s.toLowerCase()) // lower case all specialties
    }
})

export const RoutesConfig = (app: Application) => {
    app
    .get('/appointments', (req: Request, res: Response) => {
        const {specialty, date, minScore} = req.query;
        if (!specialty || !date || !isNumeric(date)) return res.status(ResponseStatus.BadRequest).send()

        const matchProviderList: Provider[] = []
        Object.keys(appData).forEach((k) => {
            const p: Provider = appData[k]

            if (p.specialties.includes(specialty.toLowerCase()) 
                && parseInt(minScore) < p.score
                && isProviderAvailableDate(p, parseInt(date))) {
                    matchProviderList.push(p)
            }
        })
        const matchProviderListOrdered: Provider[] = matchProviderList.sort((a, b) => {
            if (a.score < b.score) return 1
            else return -1
        })
        const matchProviderListOrderedNames: string[] = matchProviderListOrdered.map((p) => p.name)
        return res.status(ResponseStatus.Ok).json(matchProviderListOrderedNames)
    })
    .post('/appointments', (req: Request, res: Response) => {
        const {name, date} = req.body;
        if (!name || !date) return res.status(ResponseStatus.BadRequest).send()

        const result: boolean = appData[name] && isProviderAvailableDate(appData[name], parseInt(date))
        return res.status(result? ResponseStatus.Ok : ResponseStatus.BadRequest).send()
    })
}

function isProviderAvailableDate(provider: Provider, ts: number) {
    return provider.availableDates.some( ad => ad.from <= ts && ts <= ad.to)
}
function isNumeric(str: string) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN((str as any)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
export interface AppData {
    [name: string]: Provider
}
export interface Provider {
    name: string,
    specialties: string[],
    availableDates: AvailableDate[]
    score: number
}

export interface AvailableDate {
    from: number,
    to: number,
}