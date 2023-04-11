import { useRecoilValue, useSetRecoilState } from "recoil"
import { erroState, listaDeParticipantesState } from "../atom"

export const useAdicionarParticpante = () => {
    const setLista = useSetRecoilState(listaDeParticipantesState)
    const lista = useRecoilValue(listaDeParticipantesState)
    const setErro = useSetRecoilState(erroState)

    return (nomeParticipante: string) => {
        if (lista.includes(nomeParticipante)) {
            setErro('Nomes duplicados não são permitidos!')
            return 
        }
        return setLista(listaAtual => [...listaAtual, nomeParticipante])
    }
}