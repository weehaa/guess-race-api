import  { ParsedQs } from 'qs'

type Param = string | ParsedQs | string[] | ParsedQs[] | undefined

const parseQueryParamNum = (param: Param, defaultValue: string | undefined): number | undefined => {
    if (typeof param === 'undefined' && typeof defaultValue === 'undefined') {
        throw (`Query parameter doesn't defined and doesn't have default value`)
    }
    if (typeof param !== 'string' && typeof defaultValue !== 'undefined') return parseInt(defaultValue)
    if (typeof param === 'string') return parseInt(param)
}

export default parseQueryParamNum