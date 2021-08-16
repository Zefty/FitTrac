import { createContext } from 'react';
import { fittracbasecontext } from '../../types/types'
const FitTracBaseContext = createContext({} as fittracbasecontext);

export default function FitTracBase(props: any) {
    const fitTracBaseContext = {

    }
    return <FitTracBaseContext.Provider value={fitTracBaseContext}>{props.children}</FitTracBaseContext.Provider>;
}